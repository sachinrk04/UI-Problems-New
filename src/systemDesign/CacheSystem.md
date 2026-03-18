# Design: Cache System (LRU / LFU) — In-Memory + Distributed

**Goal:** serve hot data with low latency, reduce backend load, and provide predictable eviction behavior under memory pressure.

**Focus areas:** eviction policy (LRU/LFU) · core data structures (HashMap + DLL / freq lists) · TTL + invalidation · thread safety & concurrency · schema + APIs for frontend engineers · production tradeoffs

---

## Frontend view (what you do on the client)

Backend cache is the source of truth (for shared data). On the **frontend**, caching is still extremely valuable, but it’s **per-user/per-device** and has different constraints.

### What frontend can/can’t guarantee

- **Frontend can**
  - cache responses to avoid refetching (memory + persistent)
  - dedupe concurrent identical requests (request coalescing)
  - prefetch next pages / likely navigation
  - use `ETag` / `If-None-Match` and `Cache-Control` correctly
  - partition cache by user/session/tenant to avoid data leaks
- **Frontend can’t**
  - ensure shared/global consistency across users/devices
  - rely on exact TTL (tabs sleep, clocks drift, background throttling)
  - enforce security (sensitive data must be protected server-side)

### Typical frontend cache layers (practical)

- **In-memory (per tab)**: fastest, cleared on reload. Great for “within-session” UX.
- **Persistent (Storage/IndexedDB)**: survives reload; must be versioned + bounded.
- **Service Worker / HTTP cache**: best for static assets and some GET responses.
- **Data library cache (React Query / SWR)**: handles stale-while-revalidate, dedupe, retries.

### Frontend success checklist (the 80/20)

- **Keying**: cache keys must include all inputs (route + params + headers that affect response + user identity).
- **Stale strategy**: prefer **stale-while-revalidate** for read-heavy UI.
- **Invalidation**: on writes, invalidate impacted read keys (or use tags).
- **Stampede protection**: coalesce identical in-flight requests.

---

## 1️⃣ High-Level Design (HLD)

### 1.1 Requirements

- **Functional**
  - `get(key)`, `set(key, value, ttl?)`, `delete(key)`
  - eviction policy: **LRU** and/or **LFU**
  - TTL expiration (lazy + optional active cleanup)
  - invalidation by key and optionally by **tag**
  - stats: hit/miss/evictions/size
- **Non-functional**
  - very low latency (in-memory: microseconds; distributed: single-digit ms)
  - predictable memory bound (max entries / max bytes)
  - thread safety (multi-thread + async callers)
  - observability (hit ratio, p95 latency, hot keys)

### 1.2 Architecture (common patterns)

**A) Local in-process cache (library)**

```
Service
  ├─ Cache (LRU/LFU)  <-- hot path in memory
  └─ DB / downstream
```

**B) Cache-as-a-service (shared, distributed)**

```
Client/Frontend ──▶ API Service ──▶ Cache Cluster ──▶ DB
                          │
                          └─ (optional) local in-process cache
```

**C) Two-tier caching (most real systems)**

```
L1: in-process cache (tiny, very fast)
L2: distributed cache (bigger, shared)
DB: source of truth
```

### 1.3 Cache strategies (where cache sits in the flow)

- **Cache-aside (lazy loading)** (default)
  - `get` cache → if miss → load from DB → `set` cache → return
  - invalidation on writes is required (by key/tag)
- **Read-through**
  - cache itself knows how to load on miss (library wraps loader)
- **Write-through**
  - write to cache and DB in one path (simpler reads, slower writes)
- **Write-back (write-behind)**
  - write to cache first, flush async to DB (fast writes, harder correctness)

---

## 2️⃣ Eviction policies (LRU vs LFU)

### 2.1 LRU (Least Recently Used)

**Evict** the entry that hasn’t been accessed for the longest time.

- **Pros**: simple, works well for temporal locality (typical web traffic)
- **Cons**: scan-resistant workloads can thrash; “one-hit wonders” can evict useful items

### 2.2 LFU (Least Frequently Used)

**Evict** the entry accessed the fewest times (often within an aging window).

- **Pros**: good when some keys are consistently popular over time
- **Cons**: needs frequency tracking; must handle “old popularity” (aging) to avoid cache pollution

### 2.3 What’s used in practice

- **LRU** is a great default (simple + stable).
- **LFU with aging** is common at larger scale (e.g., TinyLFU-style admission + segmented LRU in some systems).
- Many production caches use **approximate** LFU/LRU to reduce lock contention and metadata overhead.

---

## 3️⃣ Low-Level Design (LLD) — LRU with HashMap + DLL

### 3.1 Data structures

- **HashMap**: `key -> Node*` for O(1) lookup
- **Doubly Linked List (DLL)**: maintains recency order
  - head = **most recently used**
  - tail = **least recently used**

Node stores:
- `key`, `value`
- `prev`, `next`
- `expiresAtMs` (optional)
- `sizeBytes` (optional, if using max-bytes eviction)

### 3.2 Operations (O(1))

- **get(key)**
  - map lookup → if missing: miss
  - if expired: treat as miss (delete)
  - move node to head (most recently used)
  - return value
- **set(key, value, ttl?)**
  - if exists: update value + expiresAt, move to head
  - else: insert new node at head + add to map
  - if over capacity: evict from tail until within limits
- **delete(key)**
  - remove node from DLL and map

### 3.3 Common eviction triggers

- max entries (`capacity`)
- max bytes (`maxBytes`) (requires tracking per-entry size)
- TTL expiration (often lazy; optionally active cleanup)

---

## 4️⃣ Low-Level Design (LLD) — LFU (frequency lists) in O(1)

### 4.1 Core idea

Track:
- `key -> Node`
- `freq -> DLL of nodes with that freq`
- `minFreq` pointer (current minimum frequency in cache)

Node stores:
- `key`, `value`
- `freq`
- pointers for its DLL (within a frequency bucket)
- `expiresAtMs` (optional)

### 4.2 Operations (O(1))

- **get(key)**
  - if missing/expired: miss
  - increment node’s freq: remove from old freq DLL → add to new freq DLL
  - if old freq DLL becomes empty and was `minFreq`, increment `minFreq`
- **set(key, value)**
  - if exists: update value + treat as access (freq++)
  - else:
    - if at capacity: evict from `minFreq` DLL’s tail (LRU within the lowest frequency)
    - insert new node with `freq = 1`
    - set `minFreq = 1`

### 4.3 LFU gotcha: aging

Without aging, a key that was popular “long ago” can become immortal.

Common fixes:
- **Time-decayed frequency** (periodically halve frequencies)
- **Windowed LFU** (reset counts per window)
- **Admission policy** (e.g., TinyLFU) + LRU segments (more complex but powerful)

---

## 5️⃣ Thread safety & concurrency (interview-critical)

### 5.1 What can race

Even for an in-memory cache, concurrent calls can corrupt:
- DLL pointers (broken list)
- map/node lifecycle (use-after-free in lower-level languages)
- counters (hit/miss/eviction stats)
- TTL checks + deletion

### 5.2 Simple, correct approach (coarse lock)

- One `mutex` around all cache operations
- **Pros**: easiest to reason about, correctness first
- **Cons**: contention under high QPS, tail latency for hot keys

### 5.3 Better approach (striped locks / sharding)

Partition the key-space into \(N\) shards:
- each shard has its own map + DLL(s) + lock
- choose shard by `hash(key) % N`

Benefits:
- reduces contention
- parallelism across shards

Tradeoff:
- eviction is per-shard unless you add a global coordinator (usually fine)

### 5.4 Read/write locks (careful)

For LRU/LFU, reads often **mutate** (recency/frequency updates), so RWLocks don’t help much unless:
- you allow approximate updates (e.g., sample 1/N gets) or
- you separate “value read” from “metadata update” asynchronously

### 5.5 Stampede protection (load coalescing)

Cache miss + many concurrent requests → DB spike.

Pattern:
- store “in-flight promise” per key (singleflight)
- first miss triggers load; others await same result

### 5.6 TTL cleanup strategy

- **Lazy expiration**: check TTL on access; delete if expired (cheap, common)
- **Active cleanup**: background sweeper (periodic) or time wheel (more complex)

### 5.7 Distributed cache correctness note

In a distributed cache (Redis/Memcached-like), thread safety is handled server-side.
Your app still needs:
- request coalescing (to protect DB)
- timeouts/circuit breakers
- consistent keying + invalidation

---

## 6️⃣ Data layer / schema (for a Cache Service)

### 6.1 Key model

Strong keying prevents accidental collisions and makes invalidation manageable.

Recommended:

```
cache:{env}:{tenant}:{namespace}:{version}:{key}
```

Examples:
- `cache:prod:t_42:users:v3:user_123`
- `cache:prod:t_42:search:v1:q=shoes&page=2&sort=pop`

### 6.2 Value envelope schema (JSON)

If you’re exposing cache via an API, wrap values with metadata.

```json
{
  "key": "cache:prod:t_42:users:v3:user_123",
  "value": { "id": "123", "name": "Asha" },
  "contentType": "application/json",
  "createdAtMs": 1763456000000,
  "expiresAtMs": 1763456060000,
  "tags": ["user:123", "tenant:t_42"]
}
```

### 6.3 Tag index (optional but useful)

If supporting `invalidateByTag(tag)`:
- maintain `tag -> set(keys)` index
- TTL for tag sets should be >= max TTL of entries (or cleaned on delete)

Tradeoff:
- extra write amplification (every set touches tag sets)
- but makes invalidation easy and frontend-friendly

---

## 7️⃣ APIs (frontend-friendly) — Cache Service

> In many systems, the frontend doesn’t call a cache directly; it calls an API that uses cache-aside internally.  
> Still, these APIs are useful for **internal platforms**, **edge caching**, or **BFFs**.

### 7.1 Read

**GET** `/v1/cache/entry`

Query:
- `key` (required)
- `allowStale` (optional, default false)

Response (hit) — 200:

```json
{
  "hit": true,
  "entry": {
    "key": "cache:prod:t_42:users:v3:user_123",
    "value": { "id": "123", "name": "Asha" },
    "expiresAtMs": 1763456060000,
    "tags": ["user:123", "tenant:t_42"]
  }
}
```

Response (miss) — 200:

```json
{ "hit": false }
```

### 7.2 Write

**PUT** `/v1/cache/entry`

```json
{
  "key": "cache:prod:t_42:users:v3:user_123",
  "value": { "id": "123", "name": "Asha" },
  "ttlMs": 60000,
  "tags": ["user:123", "tenant:t_42"]
}
```

Response — 200:

```json
{ "ok": true }
```

### 7.3 Delete

**DELETE** `/v1/cache/entry?key=...`

Response — 200:

```json
{ "ok": true, "deleted": true }
```

### 7.4 Batch get/set (important for UI)

**POST** `/v1/cache/batchGet`

```json
{ "keys": ["k1", "k2", "k3"] }
```

**POST** `/v1/cache/batchSet`

```json
{
  "items": [
    { "key": "k1", "value": "v1", "ttlMs": 60000, "tags": ["t1"] },
    { "key": "k2", "value": "v2", "ttlMs": 60000, "tags": ["t1"] }
  ]
}
```

### 7.5 Invalidate (key + tag)

**POST** `/v1/cache/invalidate`

```json
{
  "keys": ["k1", "k2"],
  "tags": ["user:123"]
}
```

Response:

```json
{ "ok": true, "deletedKeys": 12 }
```

### 7.6 Stats (for debugging + dashboards)

**GET** `/v1/cache/stats?namespace=users`

```json
{
  "capacity": 100000,
  "size": 73512,
  "hits": 1234567,
  "misses": 234567,
  "hitRate": 0.84,
  "evictions": 4567,
  "policy": "LRU",
  "p95GetMs": 1.2
}
```

---

## 8️⃣ Production concerns (what interviewers look for)

### 8.1 Preventing cache stampede (thundering herd)

- request coalescing (singleflight)
- “soft TTL”: serve stale for a short time while one request refreshes
- jitter TTLs to avoid synchronized expirations

### 8.2 Hot keys

- shard by key hash
- add local L1 caches to reduce distributed cache pressure
- consider per-key rate limiting if a key is abused

### 8.3 Negative caching

Cache “not found” for short TTLs to protect DB from repeated misses.

### 8.4 Consistency and invalidation strategy

- **Write invalidation**: after updating DB, invalidate affected cache keys/tags
- **Versioned keys**: bump `:vN:` to invalidate a whole namespace instantly
- **Event-driven invalidation**: publish `UserUpdated(userId)` → consumers invalidate tags

### 8.5 Multi-tenant isolation (security)

Never allow keys to collide across tenants/users:
- include `tenantId` and `userId` where appropriate
- avoid caching sensitive responses in shared layers unless encrypted/scoped

---

## 9️⃣ LLD snippets (interfaces you can discuss)

```ts
export type CachePolicy = "LRU" | "LFU"

export type CacheEntry<V> = {
  key: string
  value: V
  expiresAtMs?: number
  tags?: string[]
  sizeBytes?: number
}

export interface Cache<K, V> {
  get(key: K): V | undefined
  set(key: K, value: V, ttlMs?: number, tags?: string[]): void
  delete(key: K): boolean
  size(): number
  stats(): {
    hits: number
    misses: number
    evictions: number
    hitRate: number
  }
}
```

---

## Appendix: Complexity summary (quick)

- **LRU (HashMap + DLL)**: `get/set/delete` O(1)
- **LFU (key->node, freq->DLL, minFreq)**: `get/set/delete` O(1)
- **Thread safety**: easiest = coarse lock; scalable = sharded caches + per-shard locks

