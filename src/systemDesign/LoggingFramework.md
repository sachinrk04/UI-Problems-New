# Design: Scalable Logger / Logging Framework (Distributed Systems)

**Focus areas:** Log levels + filtering · Pluggable sinks · Singleton + lifecycle · Thread safety + performance · Structured JSON logs · Rotation/retention · Extensibility · Async vs sync · Tracing + correlation IDs

---

## 1. Architecture Overview

### 1.1 What we’re building

A **logging SDK / framework** embedded in every service (and optionally in libraries) that:

- emits **structured logs** (JSON) with consistent schema
- supports **dynamic level filtering** and sampling to reduce noise/cost
- routes logs to **pluggable sinks** (console/file/db/cloud/queue)
- is **safe under concurrency**, fast, and resilient under load (backpressure)
- integrates with **distributed tracing** (trace/span IDs) and **correlation IDs**

### 1.2 High-level architecture (SDK + pipeline)

```
Application code
  │
  │  Logger.<level>() / Logger.log()
  ▼
Logger (API façade)
  │  enrich(context) → create LogEvent
  ▼
Pipeline
  ├─ Filters (level, namespace, sampler, privacy/redaction)
  ├─ Enrichers (static + dynamic fields, tracing, env, host, version)
  ├─ Formatter (JSON / text / custom)
  └─ Dispatcher (sync or async)
        ├─ Sink: Console
        ├─ Sink: File (rotation + retention)
        ├─ Sink: Cloud Logging (OTLP / vendor SDK)
        ├─ Sink: Queue (Kafka/PubSub) (for aggregation)
        └─ Sink: DB (rare; typically for audit-only)
```

### 1.3 Key principles

- **Structured by default**: JSON is the canonical internal representation; text is a view.
- **Filtering early**: drop cheap, before formatting and IO.
- **Never block the hot path by default**: prefer async with bounded queue and clear backpressure policy.
- **Context propagation**: correlation IDs and trace context flow through request/task boundaries.
- **Deterministic lifecycle**: predictable init/shutdown/flush for containers, serverless, and CLIs.

---

## 2. Core Components

### 2.1 `Logger` (public façade)

- Exposes `trace/debug/info/warn/error/fatal` APIs.
- Captures user message + fields + error + context.
- Delegates to `LogManager`/`Pipeline` to process and dispatch.

### 2.2 `LogEvent` (immutable record)

Represents a single log entry. Created once, never mutated. Contains:

- **metadata**: timestamp, level, logger name, thread/task id
- **message**: template + args (optional)
- **attributes**: key/value fields
- **error**: exception details + stack
- **tracing**: traceId/spanId/traceFlags

### 2.3 `Filter` (drop/allow/transform decision)

Runs before expensive work:

- **Level filter**: threshold per logger namespace.
- **Attribute filters**: allowlist/denylist of keys.
- **Sampler**: probabilistic or rule-based sampling (especially for debug/trace).
- **PII redaction**: remove/mask fields before leaving process.

### 2.4 `Enricher` (adds context)

Adds structured fields without touching call sites:

- `service.name`, `service.version`, `deployment.environment`
- `host.name`, `pod.name`, `region`, `zone`
- request scoped: `requestId`, `correlationId`, `userId` (if allowed), `tenantId`
- tracing scoped: `traceId`, `spanId`

### 2.5 `Formatter` (output representation)

Transforms `LogEvent` → bytes/strings:

- Default JSON formatter (stable schema; minimal allocations).
- Optional text formatter for local dev.
- Supports custom formatters (e.g., ECS, GELF).

### 2.6 `Sink` (destination)

Pluggable output with a common contract.

Typical sinks:

- **Console sink**: stdout/stderr; container-friendly.
- **File sink**: with rotation/retention.
- **Cloud logging sink**: direct export (vendor SDK or OTLP).
- **Queue sink**: publish to Kafka/PubSub/SQS for downstream processing.
- **DB sink**: only for low-volume audit trails; otherwise expensive.

### 2.7 `Dispatcher` (sync/async + batching + backpressure)

Responsible for:

- writing to sinks
- batching events for throughput
- bounding memory usage
- defining what happens when overloaded (drop, block, sample, spill-to-disk)

### 2.8 `LogManager` (singleton + lifecycle)

Owns global configuration and resources:

- creates named loggers
- maintains level rules
- starts/stops async workers
- handles `flush()` and `shutdown()`

**Singleton intent (why + constraints):**

- **One process-wide logging pipeline**: avoids duplicated queues/workers, inconsistent levels, and multiple writers contending for the same sink.
- **Safe defaults**: if `init()` is never called, log to console at `INFO` with minimal schema (so libraries can log safely).
- **Init is idempotent**: repeated `init()` is either a no-op or an explicit `reconfigure()` (pick one policy and enforce it).
- **Lifecycle-aware**: `shutdown()` must flush buffered events, stop workers, and close sinks deterministically.

---

## 3. Class Design

### 3.1 Conceptual class diagram

```
┌─────────────────┐        uses          ┌────────────────────────┐
│ Logger          │─────────────────────▶│ LogManager (Singleton) │
│ - name          │                      │ - config               │
│ - context       │                      │ - pipeline             │
└───────┬─────────┘                      │ - dispatcher           │
        │ creates                        └───────────┬────────────┘
        ▼                                            │ owns
┌─────────────────┐   flows through    ┌─────────────▼──────────────┐
│ LogEvent        │───────────────────▶│ Pipeline                   │
│ (immutable)     │                    │ - filters[]                │
└─────────────────┘                    │ - enrichers[]              │
                                       │ - formatter                │
                                       └─────────────┬──────────────┘
                                                     │ dispatches
                                                     ▼
                                      ┌────────────────────────────┐
                                      │ Dispatcher                 │
                                      │ - mode: sync|async         │
                                      │ - queue (bounded)          │
                                      │ - workers                  │
                                      └─────────────┬──────────────┘
                                                    │ writes to
                                                    ▼
                            ┌────────────────────────────────────────────┐
                            │ Sink (interface)                           │
                            │ + write(batch) + flush() + close()         │
                            └───────┬─────────┬─────────┬─────────┬──────┘
                                    ▼         ▼         ▼         ▼
                               Console      File      Cloud     Queue
```

### 3.2 Log levels + filtering model

#### Levels

Ordered severity: `TRACE < DEBUG < INFO < WARN < ERROR < FATAL`

- **TRACE**: ultra-verbose, for stepping through internals
- **DEBUG**: diagnostic, for dev/staging and targeted prod debugging
- **INFO**: business-as-usual events
- **WARN**: unexpected but recoverable
- **ERROR**: failed operation; requires investigation
- **FATAL**: process cannot continue (often followed by exit/panic)

#### Filtering rules (recommended)

1. **Global minimum level** (e.g., `INFO` in prod).
2. **Namespace overrides** (logger name patterns).
3. **Per-sink threshold** (e.g., file keeps `DEBUG`, cloud keeps `INFO+`).
4. **Sampling** (primarily for `TRACE/DEBUG`).

Example matching:

- `root=INFO`
- `payments.*=DEBUG`
- `db.driver=ERROR`

Effective level:

```
effectiveLevel(loggerName) =
  most-specific rule match; otherwise root level
```

Decision is made **before** formatting and sink IO.

### 3.3 Singleton pattern (global logger) — recommended implementation

**Goal:** cheap reads (logging) + safe writes (reconfigure/shutdown) under concurrency.

**Approach:** keep `Logger` instances lightweight; store pipeline/config behind an atomically-swapped reference.

```ts
class LogManager {
  private static _instance: LogManager | null = null

  // Immutable snapshot object: levels rules, pipeline, dispatcher, sinks.
  private state: AtomicRef<LogState>

  static instance(): LogManager {
    // Option A (languages with safe static init): use static holder.
    // Option B (common): double-checked locking.
    if (this._instance) return this._instance
    synchronized(LogManager) {
      if (!this._instance) this._instance = new LogManager(defaultState())
      return this._instance
    }
  }

  static init(config: LogConfig): void {
    const mgr = LogManager.instance()
    mgr.state.set(buildState(config)) // atomic swap
  }

  static reconfigure(patch: Partial<LogConfig>): void {
    const mgr = LogManager.instance()
    const current = mgr.state.get()
    mgr.state.set(buildState(applyPatch(current.config, patch)))
  }

  static getLogger(name: string): Logger {
    return new Logger(name, LogManager.instance().state) // logger reads state per call
  }

  static async flush(timeoutMs?: number) { await LogManager.instance().state.get().dispatcher.flush(timeoutMs) }
  static async shutdown(timeoutMs?: number) { await LogManager.instance().state.get().dispatcher.shutdown(timeoutMs) }
}
```

---

## 4. API Design (with signatures)

Below is a language-agnostic API (TypeScript-like signatures) suitable for JS/TS, Java/Kotlin, Go, etc.

### 4.1 Public APIs

#### Initialization and lifecycle

```ts
// One-time, early in process startup.
LogManager.init(config: LogConfig): void

// Replace config at runtime (atomic swap); optional.
LogManager.reconfigure(config: Partial<LogConfig>): void

// Obtain a named logger (usually by module/class name).
LogManager.getLogger(name: string): Logger

// Ensure buffered logs are written (important on shutdown).
LogManager.flush(timeoutMs?: number): Promise<void>

// Flush + stop workers + close sinks.
LogManager.shutdown(timeoutMs?: number): Promise<void>
```

#### Logger APIs

```ts
interface Logger {
  with(fields: Record<string, unknown>): Logger
  withContext(ctx: LogContext): Logger

  isEnabled(level: LogLevel): boolean

  trace(message: string, fields?: Fields): void
  debug(message: string, fields?: Fields): void
  info(message: string, fields?: Fields): void
  warn(message: string, fields?: Fields): void
  error(message: string, err?: Error, fields?: Fields): void
  fatal(message: string, err?: Error, fields?: Fields): void

  // Template-style structured logging (optional)
  log(level: LogLevel, message: string, fields?: Fields, err?: Error): void
}
```

#### Context propagation (distributed tracing + correlation)

```ts
// Framework adapters (HTTP/RPC) set these per request.
Context.set(values: Partial<LogContext>): void
Context.get(): LogContext

interface LogContext {
  correlationId?: string         // app-level id for request/job
  requestId?: string             // edge-generated id (ingress)
  traceId?: string               // tracing system id
  spanId?: string
  userId?: string                // optional; consider privacy policy
  tenantId?: string
}
```

### 4.2 Config options

```ts
type LogLevel = "TRACE"|"DEBUG"|"INFO"|"WARN"|"ERROR"|"FATAL"
type SinkType = "console"|"file"|"cloud"|"queue"|"db"

interface LogConfig {
  service: {
    name: string
    version?: string
    environment?: "local"|"dev"|"staging"|"prod" | string
    instanceId?: string          // pod/container id
  }

  // Global + namespace log levels
  levels: {
    root: LogLevel
    rules?: Array<{ pattern: string; level: LogLevel }> // e.g. "payments.*"
  }

  // Structured schema/versioning
  schema: {
    version: string              // e.g. "1.0"
    timestampFormat?: "iso8601"|"unix_ms"
  }

  // Pipeline
  filters?: FilterConfig[]
  enrichers?: EnricherConfig[]
  formatter?: FormatterConfig

  // Dispatch
  dispatch: {
    mode: "sync" | "async"
    queueSize?: number           // bounded, for async
    batchSize?: number
    flushIntervalMs?: number
    overflowPolicy?: "drop_new"|"drop_old"|"block"|"sample"|"spill_to_disk"
  }

  // Sinks
  sinks: SinkConfig[]

  // Redaction / privacy
  redaction?: {
    denyKeys?: string[]          // keys to remove, e.g. ["password", "token"]
    maskKeys?: string[]          // keys to mask, e.g. ["email", "phone"]
    maskPattern?: string         // e.g. "****"
  }
}

type SinkConfig =
  | { type: "console"; level?: LogLevel; json?: boolean }
  | { type: "file"; level?: LogLevel; path: string; rotation: RotationConfig; retention: RetentionConfig }
  | { type: "cloud"; level?: LogLevel; provider: "otlp"|"datadog"|"splunk"|"gcp"|"aws" | string; options?: Record<string, unknown> }
  | { type: "queue"; level?: LogLevel; broker: "kafka"|"pubsub"|"sqs" | string; topic: string; options?: Record<string, unknown> }
  | { type: "db"; level?: LogLevel; table: string; options?: Record<string, unknown> }

interface RotationConfig {
  policy: "size" | "time"
  maxBytes?: number             // size-based
  interval?: "hourly"|"daily"   // time-based
  compress?: boolean
}

interface RetentionConfig {
  maxFiles?: number
  maxAgeDays?: number
}
```

### 4.4 Sink contract + sink registry (plugin model)

**Why this matters:** sinks are the “output boundary” (IO). Treat them like plugins so you can add destinations without changing core logger logic.

```ts
type LogBatch = Array<LogEvent>

interface Sink {
  // Called by dispatcher. Must be thread-safe OR documented as single-threaded.
  write(batch: LogBatch): Promise<void> | void

  // Called during flush/shutdown.
  flush?(): Promise<void> | void
  close?(): Promise<void> | void

  // Optional: per-sink filtering (common) or health.
  minLevel?: LogLevel
  isHealthy?(): boolean
}

type SinkFactory = (config: SinkConfig) => Sink

class SinkRegistry {
  private factories: Map<SinkType | string, SinkFactory>
  register(type: SinkType | string, factory: SinkFactory): void
  create(config: SinkConfig): Sink
}
```

**Per-sink thresholds (common rule):**

- The pipeline applies **global + namespace** filtering first.
- The dispatcher applies **sink.minLevel** next, so a file sink can keep `DEBUG` while cloud only gets `INFO+`.

### 4.3 Initialization pattern (recommended)

- **Initialize once** at process start (before app handles traffic).
- Provide a **safe default config** if `init()` is not called (console + INFO).
- Ensure **signal hooks** in the host app call `shutdown()` (SIGTERM/SIGINT) to flush async buffers.

---

## 5. Log Schema

### 5.1 JSON schema definition (canonical)

**Design goal:** stable, index-friendly, tracing-ready, and compatible with log backends.

#### Required fields

- `ts`
- `level`
- `logger`
- `msg`
- `service.name`
- `service.environment`

#### Optional but strongly recommended

- `trace.trace_id`, `trace.span_id`
- `correlation_id`, `request_id`
- `host.*` / `runtime.*`
- `error.*`

### 5.2 Schema (logical)

```json
{
  "schema_version": "1.0",
  "ts": "2026-03-18T10:15:30.123Z",
  "level": "INFO",
  "logger": "payments.charge",
  "msg": "Charge succeeded",

  "service": {
    "name": "payments-service",
    "version": "2.8.1",
    "environment": "prod",
    "instance_id": "pod-7f9c6d8b7f-2k9zq"
  },

  "trace": {
    "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
    "span_id": "00f067aa0ba902b7",
    "sampled": true
  },

  "correlation_id": "corr_01J7W2E8YV7N1NQ0F8M2",
  "request_id": "req_9f3c3e1c0b",

  "context": {
    "tenant_id": "t_123",
    "user_id": "u_456"
  },

  "attrs": {
    "order_id": "o_789",
    "amount": 1999,
    "currency": "INR",
    "latency_ms": 83
  },

  "error": {
    "type": "string",
    "message": "string",
    "stack": "string",
    "code": "string"
  }
}
```

### 5.4 Schema versioning + evolution rules

- **Version every event** via `schema_version` so parsers can evolve safely.
- **Prefer additive changes**: add new fields; avoid renames/removals that break dashboards/alerts.
- **Keep high-cardinality fields controlled** (e.g., avoid unbounded unique values in top-level indexed fields).
- **Stabilize field names**: e.g., keep `trace.trace_id`, `correlation_id`, `service.name` consistent across services.

### 5.3 Example log entries

#### Debug with sampling + redaction

```json
{
  "schema_version": "1.0",
  "ts": "2026-03-18T10:15:30.456Z",
  "level": "DEBUG",
  "logger": "auth.middleware",
  "msg": "JWT verified",
  "service": { "name": "api-gateway", "environment": "prod" },
  "correlation_id": "corr_01J7W2E8YV7N1NQ0F8M2",
  "trace": { "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736", "span_id": "b7ad6b7169203331", "sampled": false },
  "attrs": { "user_id": "u_456", "token": "****", "scopes": ["read:orders"] }
}
```

#### Error with exception

```json
{
  "schema_version": "1.0",
  "ts": "2026-03-18T10:15:31.002Z",
  "level": "ERROR",
  "logger": "db.client",
  "msg": "Query failed",
  "service": { "name": "orders-service", "environment": "prod" },
  "trace": { "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736", "span_id": "7c3a1a65c2c1d3f1", "sampled": true },
  "attrs": { "query": "SELECT ...", "latency_ms": 412, "retries": 2 },
  "error": { "type": "TimeoutError", "message": "deadline exceeded", "code": "DB_TIMEOUT", "stack": "..." }
}
```

---

## 6. Example Usage

### 6.1 Configure + initialize

```ts
import { LogManager } from "acme-logger"

LogManager.init({
  service: { name: "orders-service", version: "1.12.0", environment: "prod" },
  levels: {
    root: "INFO",
    rules: [
      { pattern: "orders.*", level: "DEBUG" },
      { pattern: "db.*", level: "WARN" }
    ]
  },
  schema: { version: "1.0", timestampFormat: "iso8601" },
  dispatch: {
    mode: "async",
    queueSize: 100_000,
    batchSize: 200,
    flushIntervalMs: 200,
    overflowPolicy: "sample"
  },
  redaction: { denyKeys: ["password", "accessToken"], maskKeys: ["token"], maskPattern: "****" },
  sinks: [
    { type: "console", level: "INFO", json: true },
    {
      type: "file",
      level: "DEBUG",
      path: "/var/log/orders/app.log",
      rotation: { policy: "size", maxBytes: 128_000_000, compress: true },
      retention: { maxFiles: 50, maxAgeDays: 14 }
    },
    { type: "cloud", level: "INFO", provider: "otlp", options: { endpoint: "collector:4317" } }
  ]
})
```

### 6.2 In application code

```ts
const log = LogManager.getLogger("orders.create")

export async function createOrder(req) {
  // Typically set by a request middleware:
  // Context.set({ correlationId, requestId, traceId, spanId })

  log.info("Create order request", { customerId: req.customerId, itemsCount: req.items.length })

  try {
    const order = await placeOrder(req)
    log.info("Order created", { orderId: order.id, amount: order.total })
    return order
  } catch (err) {
    log.error("Create order failed", err, { customerId: req.customerId })
    throw err
  }
}
```

### 6.3 Example logging flow (end-to-end)

1. App calls `log.info("Order created", { orderId })`.
2. Logger checks `isEnabled(INFO)` based on namespace rules (cheap).
3. Pipeline runs filters (level, sampling, redaction), then enrichers add service/host/trace context.
4. Formatter emits JSON.
5. Dispatcher batches and sends to sinks:
   - console (stdout)
   - file (with rotation)
   - OTLP exporter to collector

---

## 7. Scaling & Performance

### 7.1 Thread safety & concurrency

- **Immutability**: `LogEvent` is immutable; context snapshots are copied once per event.
- **Atomic config swap**: `reconfigure()` swaps a pointer to config/rules; reads are lock-free.
- **Async queue**: MPSC (multi-producer, single/multi-consumer) bounded queue for fast enqueues.
- **Avoid global locks**: no per-log synchronized IO on hot path (unless sync mode is selected).

### 7.2 Performance tactics (high ROI)

- **Early level check**: `if (!logger.isEnabled(DEBUG)) return` avoids allocations.
- **Lazy fields** (optional): support `fields: () => Fields` to compute only if enabled.
- **Batching**: amortize IO with `batchSize` and `flushIntervalMs`.
- **String/template handling**: keep `msg` as already-rendered string for simplicity, or support templates but avoid heavy formatting when disabled.
- **Backpressure policy**: explicitly choose behavior under overload:
  - `drop_new`: preserve old queued logs; lose newest
  - `drop_old`: preserve recent context; lose backlog
  - `block`: increases tail latency; safest for audit logs but risky in hot path
  - `sample`: dynamically reduce debug/trace volume
  - `spill_to_disk`: local durability at cost of complexity and disk pressure

### 7.3 Log rotation + retention

**For files (local disk)**:

- Rotate by **size** (common) or **time** (daily).
- Compress rotated files (`.gz`) to save space.
- Retention policy: `maxFiles` and/or `maxAgeDays`.

**For containers / Kubernetes**:

- Prefer writing JSON to **stdout/stderr** and let the platform handle rotation.
- Use file sink only when required (e.g., air-gapped or special audit needs).

### 7.4 Multi-sink strategy (practical)

- **Console**: always on, `INFO+`, structured JSON.
- **Cloud**: `INFO+` (or `WARN+` for cost control) + add sampling for `INFO` if needed.
- **File**: optional for debugging; `DEBUG+` with aggressive retention.
- **Queue**: use when you want centralized enrichment/routing/replay.

### 7.5 Distributed tracing integration

Recommended behavior:

- The logger reads **current trace context** from the tracing SDK (OpenTelemetry, etc.).
- Always include `trace_id` and `span_id` when present.
- Ensure **correlation_id** is present even when traces are not sampled.
- Provide middleware adapters for HTTP/gRPC/message consumers to populate `Context`.

---

## 8. Trade-offs & Alternatives

### 8.1 Async vs sync logging

- **Async (default)**:
  - **Pros**: low latency impact; high throughput; batching
  - **Cons**: possible loss on crash; needs flush on shutdown; backpressure complexity
  - **Best for**: most application logs in distributed systems

- **Sync**:
  - **Pros**: simplest; logs are written before continuing; good for tiny CLIs
  - **Cons**: adds latency; can amplify outages (slow disk/network → slow requests)
  - **Best for**: short-lived processes, critical audit logs (or when combined with durable local sink)

### 8.2 Direct-to-cloud vs queue-first

- **Direct-to-cloud**:
  - simpler ops, fewer moving parts
  - risk of request path stalls if exporter misconfigured (mitigated via async + timeouts)

- **Queue-first**:
  - **Pros**: replay, centralized processing, fan-out to multiple backends
  - **Cons**: added infra cost, operational complexity, ordering/duplication concerns

### 8.3 DB sink as a caution

Writing all logs to a database is usually a scaling anti-pattern:

- high write amplification
- expensive indexing
- poor for append-only high-volume streams

Use a DB sink only for **low-volume** compliance/audit records (and keep it separate from general logs).

### 8.4 Alternatives

- **Adopt an existing library**: SLF4J + Logback (Java), Log4j2, Zap (Go), Serilog (.NET), Pino/Winston (Node).
- **Adopt OpenTelemetry Logs (OTLP)**: unify logs + traces + metrics export; use collector for routing and vendor independence.

