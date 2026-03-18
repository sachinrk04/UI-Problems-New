# Design: Rate Limiter System (Gateway + Distributed)

**Goal:** protect APIs and downstream services from abuse, spikes, and noisy neighbors while keeping the hot path fast and operationally safe.

**Focus areas:** HLD + request flow · Token bucket / sliding windows · Distributed atomicity (Redis/Lua) · LLD + concurrency · Data/schema/TTL · APIs (REST + gRPC) · Production tradeoffs

---

## Frontend view (what you do on the client)

Backend/gateway rate limiting is the source of truth. On the **frontend**, you add **polite client-side limiting** to:
- reduce accidental bursts (double-clicks, aggressive polling, infinite scroll)
- protect the user experience (avoid spinners + repeated 429s)
- smooth traffic (queue/pace requests) and improve success rate

### What frontend can/can’t guarantee

- **Frontend can**
  - throttle/pace requests per user action
  - dedupe identical requests
  - limit concurrency (e.g., only 4 in-flight requests)
  - implement exponential backoff + jitter on `429/503`
  - coordinate across tabs (best-effort)
- **Frontend can’t**
  - enforce security (attackers can bypass the client)
  - provide strict distributed correctness (multiple devices, spoofed clients)

### Common frontend use cases

- **Search-as-you-type**: debounce input + cancel stale requests
- **OTP / resend code**: strict UI cooldown + disable button
- **Like/follow**: optimistic UI + prevent rapid toggles
- **Bulk uploads**: concurrency cap + per-host pacing
- **Polling**: adaptive polling + stop on background tab

### Where to implement in a web app

- **Fetch/axios wrapper**: central place to throttle + retry + read headers
- **Request queue**: per resource group (e.g., `payments`, `search`, `writes`)
- **React Query / SWR**: dedupe + caching; add retry logic with 429 handling

---

## Frontend patterns (practical)

### Pattern A: Concurrency limiter (simple, high impact)

Limit in-flight requests to avoid saturating network and backend.

```ts
export function createConcurrencyLimiter(maxInFlight: number) {
  let inFlight = 0
  const queue: Array<() => void> = []

  const runNext = () => {
    if (inFlight >= maxInFlight) return
    const next = queue.shift()
    if (!next) return
    inFlight++
    next()
  }

  return async function limit<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      queue.push(async () => {
        try {
          const res = await fn()
          resolve(res)
        } catch (e) {
          reject(e)
        } finally {
          inFlight--
          runNext()
        }
      })
      runNext()
    })
  }
}
```

**Use when**: uploads, feed pagination, background refreshers.

---

### Pattern B: Token bucket in the browser (per tab / per session)

This is **best-effort** and mainly prevents accidental bursts from the UI.

```ts
type TokenBucketConfig = {
  capacity: number
  refillPerSecond: number
}

export function createTokenBucket(config: TokenBucketConfig) {
  const refillPerMs = config.refillPerSecond / 1000
  let tokens = config.capacity
  let last = Date.now()

  function refill(now: number) {
    const delta = now - last
    if (delta <= 0) return
    tokens = Math.min(config.capacity, tokens + delta * refillPerMs)
    last = now
  }

  return {
    tryConsume(cost = 1) {
      const now = Date.now()
      refill(now)
      if (tokens >= cost) {
        tokens -= cost
        return { allowed: true as const, remaining: Math.floor(tokens) }
      }
      const deficit = cost - tokens
      const retryAfterMs = Math.ceil(deficit / refillPerMs)
      return { allowed: false as const, remaining: 0, retryAfterMs }
    },
  }
}
```

**Use when**: “resend OTP”, “create post”, “follow/unfollow” spam prevention.

---

### Pattern C: Handle `429` correctly (use server signals)

Your backend/gateway should return:
- `429`
- `Retry-After` (seconds), or `X-RateLimit-Reset`

Frontend should:
- stop immediate retries
- show UI message (“Try again in 8s”)
- optionally schedule a retry after `Retry-After`

```ts
export function parseRetryAfterMs(headers: Headers): number | undefined {
  const ra = headers.get("retry-after")
  if (!ra) return
  const seconds = Number(ra)
  if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1000
}
```

---

### Pattern D: Cross-tab coordination (best-effort)

If you want “per-browser” throttling (not per tab), you can coordinate via:
- `BroadcastChannel` (modern browsers)
- `localStorage` events (fallback)

Approach:
- designate a “leader tab” that runs the limiter
- other tabs request permission via messages

This is optional and adds complexity; for most apps, **per-tab** limiting + backend enforcement is enough.

---

### Pattern E: UI-level guardrails (often the best ROI)

- disable buttons after click until response (prevents double-submit)
- add cooldown timers for sensitive actions (OTP/login)
- cancel stale requests (AbortController) for typeahead/search

---

## 1️⃣ High-Level Design (HLD)

### 1.1 System goals and requirements

- **Functional**
  - **Enforce quotas**: requests per second/minute/hour, burst handling, per-endpoint policies.
  - **Support multi-tenant**: per-tenant limits + per-user limits inside a tenant.
  - **Support multiple subjects**: IP, userId, API key, OAuth client, deviceId.
  - **Return standard responses**: `429 Too Many Requests`, `Retry-After`, and optional `X-RateLimit-*` headers.
  - **Configurable policies**: tier-based (free/pro/enterprise), endpoint-specific overrides, dynamic updates.
- **Non-functional**
  - **Low latency**: typically < 1–3 ms overhead at gateway p99 for the limiter call.
  - **High throughput**: scale to peak QPS with minimal contention.
  - **Correctness**: “strict enough” (no meaningful overshoot) for most endpoints; allow small approximation when needed for cost.
  - **Reliability**: defined behavior under dependency failures (Redis outage, partial partitions).
  - **Operational visibility**: metrics, logs, and tracing.

### 1.2 Use cases

- **API protection**
  - Per API key: “100 rps, burst 200”
  - Per user: “10 write ops/sec” (e.g., posting, checkout)
  - Per endpoint: “/login max 5/min per IP”
- **DDoS / abuse prevention**
  - Per IP or IP+CIDR coarse limits at the edge.
  - Separate “suspicious traffic” policy bucket with stricter limits.
- **Multi-tenant throttling**
  - Tenant-level budget (e.g., 10k rpm) + per-user fair sharing inside tenant.

### 1.3 Architecture diagram (components and request flow)

```
          ┌──────────────────────┐
Client ──▶│  Edge / API Gateway  │
          │  - AuthN/AuthZ       │
          │  - Route matching    │
          │  - Rate limit check  │
          └─────────┬────────────┘
                    │ (decision + headers)
                    ▼
          ┌──────────────────────┐
          │ Downstream services  │
          └──────────────────────┘

Rate limit check is typically:
  subject (apiKey/user/ip/tenant) + resource (method+route) + policy
    └──▶ in-process limiter library ──▶ Redis cluster (atomic script)
```

### 1.4 Distributed vs single-node rate limiting

- **Single-node (in-memory)**
  - **Pros**: fastest, simplest, no external dependency.
  - **Cons**: incorrect with multiple gateway instances (each instance has its own counters), resets on restart, hard to coordinate multi-region.
  - **Use when**: single gateway instance, dev environments, or “best-effort” local protection.
- **Distributed (shared store like Redis)**
  - **Pros**: consistent limits across instances, supports HA scaling.
  - **Cons**: adds dependency and network latency; sharding/atomicity considerations.
  - **Use when**: production gateways, multi-instance, multi-tenant SaaS.

### 1.5 Tradeoffs and scalability considerations

- **Accuracy vs cost**
  - Sliding window log is strict but expensive; counters are cheap but approximate.
- **Per-key hot spots**
  - A single popular key (e.g., one tenant) can overload a single Redis shard.
- **Latency budget**
  - One network round-trip per request is often acceptable at gateway; more than that is risky at high QPS.
- **Partial failure policy**
  - Fail-open improves availability but may overload services; fail-closed protects services but can cause user-visible outages.

---

## 2️⃣ Rate Limiting Algorithms (logic + diagrams + when to use)

### 2.1 Token Bucket (best default for APIs)

**Idea:** tokens refill continuously; requests consume tokens. Allows burst up to capacity.

```
capacity = 10 tokens, refill = 5 tokens/sec

Tokens
10 |■■■■■■■■■■  (burst allowed)
 5 |■■■■■
 0 |
    time →
```

**State (per key):**
- `tokens` (fixed-point integer recommended)
- `lastRefillMs`

**Working logic**

\[
refilled = min(capacity,\ tokens + (now-last)\cdot refillRate)
\]

- If `refilled >= cost`: **allow**, set `tokens = refilled - cost`
- Else: **deny**, compute `retryAfter` until enough tokens accumulate

**When to use**
- **APIs with bursts** (mobile clients, retries, traffic spikes)
- **Tiered plans**: capacity can represent burst; refill is steady-state rate

**Time complexity**
- O(1) storage and O(1) per request (single atomic update)

**Pseudocode (single-key)**

```pseudo
function tokenBucketConsume(state, nowMs, capacity, refillPerMs, cost):
  if state missing:
    tokens = capacity
    last = nowMs
  else:
    tokens = state.tokens
    last = state.lastRefillMs

  tokens = min(capacity, tokens + (nowMs - last) * refillPerMs)
  last = nowMs

  if tokens >= cost:
    tokens -= cost
    allowed = true
  else:
    allowed = false

  return (allowed, tokens, last)
```

---

### 2.2 Sliding Window Log (strict, expensive)

**Idea:** store each request timestamp in the last window \(W\) and count them.

```
Window W = 10s
now = 100s

events: [91, 93, 95, 98, 99, 100]
keep only >= 90  (now - W)
count = 6
```

**Working logic**
- Remove all timestamps < `now - W`
- Count remaining
- If count < limit: insert current timestamp and allow

**When to use**
- **Security-sensitive endpoints** where strict correctness matters and volume is low
  - e.g., OTP send, password reset, login attempts per IP

**Time complexity**
- Storage O(number of requests in window) per key
- Per request: trim + count + insert (multiple ops), still manageable at low volume

**Redis mapping**
- `ZSET`: score = timestamp ms, member = requestId/random

---

### 2.3 Sliding Window Counter (approx, cheap)

**Idea:** keep counters for current and previous fixed windows and blend them.

```
W = 60s
prev window: [t-60, t)
cur  window: [t, t+60)

approx = prevCount * (1 - elapsed/W) + curCount
```

\[
approx = prevCount\cdot\left(1-\frac{elapsed}{W}\right) + curCount
\]

**When to use**
- **Very high QPS** where per-request storage is not feasible
- You can tolerate small boundary artifacts

**Time complexity**
- O(1) storage (2 counters) per key
- O(1) per request

---

### 2.4 Leaky Bucket (optional comparison)

**Idea:** shape traffic to a fixed outflow rate (like a queue draining steadily).

- **Pros**: smooths bursts (good for downstream stability)
- **Cons**: typically introduces latency/queueing; not always desired at gateways

**When to use**
- You want **rate shaping** (delay/queue) rather than strict rejection

---

## 3️⃣ Low-Level Design (LLD)

### 3.1 Core classes and responsibilities

- **`RateLimiter`**
  - Orchestrates check/consume.
  - Computes keys and selects policies.
  - Returns a decision + headers metadata.
- **`RateLimitPolicy`**
  - Algorithm + parameters (token bucket / sliding windows).
  - Possibly tier-aware and endpoint-aware.
- **`KeyBuilder`**
  - Canonical composite key generation (tenant/user/ip + route + method).
  - Normalizes route templates (`/v1/orders/:id` vs raw `/v1/orders/123`).
- **`StorageAdapter`**
  - `RedisAdapter`, `InMemoryAdapter`.
  - Exposes **atomic** primitives (ideally “check+consume” in one call).
- **`PolicyProvider`**
  - Loads policies from config service / DB / static config.
  - Provides caching + invalidation.
- **`Clock`**
  - Prefer **Redis server time** for distributed correctness.

### 3.2 Interfaces and extensibility

```ts
export type Subject =
  | { type: "apiKey"; id: string }
  | { type: "user"; id: string }
  | { type: "ip"; id: string }
  | { type: "tenant"; id: string }

export type Resource = { method: string; route: string }

export type RateLimitPolicy =
  | { kind: "token_bucket"; capacity: number; refillPerSecond: number }
  | { kind: "sliding_window_counter"; limit: number; windowMs: number }
  | { kind: "sliding_window_log"; limit: number; windowMs: number }

export type RateLimitDecision = {
  allowed: boolean
  limit: number
  remaining: number
  resetMs: number
  retryAfterMs?: number
  reason?: string
}

export interface RateLimiter {
  checkAndConsume(args: {
    subject: Subject
    resource: Resource
    cost?: number
    policies?: RateLimitPolicy[] // for multi-dimension enforcement
  }): Promise<RateLimitDecision>
}
```

### 3.3 Thread-safe design

- **In-process concurrency**
  - Gateways are multi-threaded / async: multiple requests may compute the same key concurrently.
  - **Do not rely on in-process locks** for correctness in distributed mode.
- **Distributed correctness**
  - Make the hot path a **single atomic operation** per key (Lua script in Redis).
  - If enforcing multiple limits (IP + user + tenant), aim for **all-or-nothing** in one script to avoid partial consumption.

### 3.4 Handling concurrency and race conditions

Common race if not atomic:

```
Req A reads tokens=1
Req B reads tokens=1
Both allow and write tokens=0  => overshoot by 1
```

Fix: atomic check+update (Lua / transactions).

### 3.5 Locking vs lock-free approaches

- **Locking (in-process)**
  - Can protect an in-memory limiter.
  - Doesn’t help across gateway instances.
  - Adds contention and tail latency for hot keys.
- **Lock-free (preferred in distributed limiter)**
  - Use atomic operations in Redis (Lua script) and avoid explicit locks.
  - Optimistic concurrency with CAS is possible but usually more expensive than Lua.

### 3.6 Time complexity summary

- **Token bucket**: O(1) state, O(1) per request
- **Sliding window counter**: O(1) state, O(1) per request
- **Sliding window log**: O(R) state where R = requests in window; per request includes trim/count/add

---

## 4️⃣ Data Layer / Schema Design

### 4.1 Storage choices

- **Redis (recommended)**
  - Atomic Lua scripts, TTL cleanup, mature ops tooling.
- **In-memory**
  - Only correct per-instance; use as a best-effort fallback or for dev.
- **DB (SQL/NoSQL)**
  - Usually too slow for per-request hot path; may store **policies/config**, not counters.

### 4.2 Key design (canonical)

```
rl:{env}:{algo}:{subjectType}:{subjectId}:{resourceId}
```

Examples:
- `rl:prod:tb:apiKey:k_123:GET_/v1/orders`
- `rl:prod:swc:ip:203.0.113.42:POST_/v1/login`

### 4.3 TTL strategy

- TTL should ensure **inactive keys expire** (avoid unbounded growth).
- **Token bucket TTL**: time-to-full-refill + buffer
  - \(ttl \approx \lceil capacity / refillRate \rceil + 60s\)
- **Sliding window log TTL**: window + buffer (and/or use periodic trim inside script)
- **Sliding window counter TTL**: \(2 \cdot window + buffer\)

### 4.4 Sample schema / key-value structures

**Token bucket (HASH)**

- Key: `rl:{env}:tb:{subjectType}:{subjectId}:{resourceId}`
- Fields:
  - `t`: remaining tokens (fixed-point integer string)
  - `ts`: last refill time (ms)

**Sliding window log (ZSET)**

- Key: `rl:{env}:swlog:{subjectType}:{subjectId}:{resourceId}`
- Score: request timestamp ms
- Member: request id (or `<ts>:<random>` to avoid collisions)

**Sliding window counter (STRING)**

- Key: `rl:{env}:swc:{subjectType}:{subjectId}:{resourceId}:{windowStartMs}`
- Value: integer count

---

## 5️⃣ APIs Design (REST + gRPC)

### 5.1 REST: Check limit API (decision only)

**Endpoint:** `POST /v1/ratelimit/check`

**Request**

```json
{
  "subject": { "type": "apiKey", "id": "k_123" },
  "resource": { "method": "GET", "route": "/v1/orders" },
  "cost": 1,
  "policy": { "kind": "token_bucket", "capacity": 200, "refillPerSecond": 100 }
}
```

**Response (allowed) — 200**

```json
{
  "allowed": true,
  "limit": 200,
  "remaining": 143,
  "resetMs": 1763456789123
}
```

**Response (denied) — 429**

```json
{
  "allowed": false,
  "limit": 200,
  "remaining": 0,
  "resetMs": 1763456789123,
  "retryAfterMs": 850,
  "error": { "code": "RATE_LIMITED", "message": "Too many requests" }
}
```

**Status codes**
- `200`: decision returned (allowed)
- `429`: rate limited (denied)
- `400`: invalid request/policy
- `503`: limiter dependency unavailable (if you choose to surface it)

---

### 5.2 REST: Consume token API (check + consume)

**Endpoint:** `POST /v1/ratelimit/consume`

Same request as `/check`, but **always** consumes on allow.

**Headers to include on deny**
- `Retry-After: <seconds>`
- `X-RateLimit-Limit: <limit>`
- `X-RateLimit-Remaining: <remaining>`
- `X-RateLimit-Reset: <epochSeconds>`

---

### 5.3 REST: Admin configuration API

**Create/update policy**

- `PUT /v1/ratelimit/policies/{policyId}`

```json
{
  "policyId": "tier_pro_orders_read",
  "match": {
    "subjectType": "apiKey",
    "tier": "pro",
    "resource": { "method": "GET", "routeTemplate": "/v1/orders" }
  },
  "policy": { "kind": "token_bucket", "capacity": 200, "refillPerSecond": 100 },
  "enabled": true
}
```

**Fetch policies**
- `GET /v1/ratelimit/policies?subjectType=apiKey&tier=pro&resource=GET_/v1/orders`

**Error handling (admin)**
- `409`: conflicting overlapping policy (optional validation)
- `422`: invalid parameters (capacity/refill/window)

---

### 5.4 gRPC API (example)

```proto
syntax = "proto3";
package ratelimit.v1;

message Subject { string type = 1; string id = 2; }
message Resource { string method = 1; string route = 2; }

message TokenBucketPolicy { uint32 capacity = 1; double refill_per_second = 2; }
message SlidingWindowCounterPolicy { uint32 limit = 1; uint64 window_ms = 2; }
message SlidingWindowLogPolicy { uint32 limit = 1; uint64 window_ms = 2; }

message Policy {
  oneof kind {
    TokenBucketPolicy token_bucket = 1;
    SlidingWindowCounterPolicy sliding_window_counter = 2;
    SlidingWindowLogPolicy sliding_window_log = 3;
  }
}

message CheckRequest {
  Subject subject = 1;
  Resource resource = 2;
  uint32 cost = 3;
  Policy policy = 4;
}

message CheckResponse {
  bool allowed = 1;
  uint64 reset_ms = 2;
  uint32 remaining = 3;
  uint32 limit = 4;
  uint64 retry_after_ms = 5;
  string reason = 6;
}

service RateLimitService {
  rpc Check(CheckRequest) returns (CheckResponse);
  rpc Consume(CheckRequest) returns (CheckResponse);
}
```

---

## 6️⃣ Concurrency & Distributed Systems

### 6.1 Atomic operations

- Use a **single Lua script** per decision (check + update + TTL).
- Avoid “GET then SET” sequences (race-prone).

### 6.2 Horizontal scaling

- Gateways scale statelessly; limiter state lives in Redis.
- Keep rate limiting logic in-process; Redis call is the only shared dependency.

### 6.3 Sharding strategy

- Redis Cluster shards by key hash slot.
- **Key design matters**:
  - If you use `{hashTag}` you can force related keys to a shard.
  - For multi-dimension “all-or-nothing” in one script, keys must be on the **same shard**.

Practical approach for multi-policy enforcement:
- Keep **one key per policy** and accept small inconsistencies, or
- Use a **single composite key** that tracks multiple counters/tokens in one HASH (single shard), or
- Use **two-level limiting**:
  - Local per-gateway best-effort + global distributed (reduces Redis load)

### 6.4 Consistency vs availability tradeoffs

- With Redis as the source of truth, decisions are consistent per key **as long as Redis is reachable**.
- During partitions/outages:
  - **Fail-open**: availability > protection (risk downstream overload)
  - **Fail-closed**: protection > availability (risk user-visible outage)
  - **Hybrid**: per-route choice; plus “brownout” modes (serve cached reads, reject writes)

### 6.5 Handling clock drift

- Prefer Redis server time inside Lua (use `TIME`) to avoid gateway clock skew.
- If multi-region: do not rely on client clocks; either:
  - Use region-local limiter, or
  - Use globally consistent time source per region cluster

---

## 7️⃣ Production Concerns

### 7.1 Fault tolerance

- Redis cluster with replicas + automatic failover.
- Timeouts + circuit breaker at gateway.
- Backpressure: cap concurrent limiter requests to avoid self-DDoS.

### 7.2 Fail-open vs fail-closed strategy

- **Fail-open** examples: read-only endpoints, non-critical analytics.
- **Fail-closed** examples: login/OTP, password reset, payment, expensive writes.

### 7.3 Observability (metrics to track)

- **Limiter outcomes**
  - `rate_limiter_allowed_total`, `rate_limiter_denied_total`
  - Breakdown by subjectType, endpoint, tenant, region
- **Latency**
  - p50/p95/p99 limiter call time; Redis script duration
- **Redis health**
  - timeouts, errors, cluster rebalances, keyspace size, evictions
- **Top offenders**
  - hottest keys (subject/resource) and deny rates
- **Policy correctness signals**
  - overshoot detection (optional sampling), unexpected spikes on a key

### 7.4 Rate limit per user vs IP vs API key

- **IP**
  - Good for unauthenticated traffic and abuse filtering
  - Beware NAT / mobile carriers causing false positives
- **UserId**
  - Best after auth; fair per user
  - Attackers can create many users (need tenant/global caps too)
- **API key / client id**
  - Best for SaaS usage tiers, B2B clients
  - Easy to communicate in developer docs and enforce contractually

---

## 8️⃣ Interview-Ready Additions

### 8.1 Bottlenecks

- Redis QPS saturation (especially with per-request scripts)
- Hot keys (one tenant or one API key dominating)
- Network tail latency between gateway and Redis
- Large number of unique keys (memory growth)

### 8.2 Edge cases

- Bursts right after deploy (cold caches, thundering herd)
- Retries (client retries can amplify traffic; integrate with idempotency semantics carefully)
- Streaming/long-lived connections (WebSockets): limit connection attempts vs messages
- Route normalization mistakes (`/orders/123` vs `/orders/:id`) causing key explosion
- Multi-policy partial consumption if not atomic across keys

### 8.3 Follow-up questions interviewers ask

- How do you enforce multiple limits at once (IP + user + tenant) without partial consumption?
- How do you design keys to avoid hot shards in Redis Cluster?
- What happens when Redis is down? Which endpoints fail-open vs fail-closed?
- How do you handle multi-region (regional limiters vs global)?
- How do you prevent “noisy neighbor” tenants from impacting others?

### 8.4 How big companies implement it (patterns)

- **Edge + centralized**
  - CDN/WAF for coarse IP throttling
  - Gateway-level distributed limiter for API keys/users
- **Hierarchical throttling**
  - Global tenant budgets + per-user budgets
  - Often token bucket for burst + fairness
- **Policy as data**
  - Central config service with caching in gateways
  - Fast rollout + emergency overrides (“kill switches”)

---

## Appendix: Atomic Redis Lua (Token Bucket) — canonical hot path

**One script call should:**
- Read bucket state (or init)
- Compute refill using Redis `TIME`
- Decide allow/deny
- Update state + TTL
- Return: allowed, remaining, reset/retryAfter

**Why it’s interview-great:** shows concurrency correctness, predictable latency, and operational simplicity (single network hop).

