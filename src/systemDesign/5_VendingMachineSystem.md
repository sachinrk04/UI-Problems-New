# Design: Vending Machine

**Focus areas:** State machine pattern · Inventory · Payments

---

## 1. Requirements (Clarifying Questions)

| Area | Questions |
|------|-----------|
| **Products** | How are products stored: per-slot (A1, A2) or pooled by SKU? Can slots contain mixed SKUs? |
| **Inventory** | Do we track counts only, or also expiry/batches? Need low-stock alerts? |
| **Pricing** | Fixed price per selection? Support promos, multi-buy, dynamic pricing? |
| **Payments** | Cash only, card only, or both? Need offline/stand-in mode for card? Support refunds? |
| **Change** | Must return exact change? What happens if machine can’t make change? |
| **Hardware** | Assume sensors for coin accept, bill accept, card reader, vend motor, item-drop sensor, coin dispenser? |
| **Failure modes** | Item jam, drop sensor failure, coin dispenser jam, payment timeout, power loss mid-transaction? |
| **Operations** | Admin restock/pricing updates? Audit logs? Reconciliation of cashbox/coin tubes? |

**Assumptions for this design:** Classic snack vending machine; **per-slot inventory** (slotId → product + count); supports **cash + card**; must return **change for cash**; card payments are captured/authorized externally; if vend fails after card authorization we issue a refund/void; focus is on **transaction state machine**, **inventory accounting**, and **payment flows**.

---

## 2. Core Entities & Relationships

```
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 VENDING MACHINE SYSTEM                                       │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  VendingMachine                                                                              │
│    ├── machineId: string                                                                     │
│    ├── state: MachineState                                                                   │
│    ├── inventory: Inventory                                                                  │
│    ├── payment: PaymentModule                                                                │
│    ├── dispenser: Dispenser                                                                  │
│    └── session: Session | null  (active transaction)                                         │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  Inventory                                                                                   │
│    ├── slots: Map<slotId, Slot>                                                              │
│    └── catalog: Map<skuId, Product>                                                          │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  Slot                                                                                        │
│    ├── slotId: string  (e.g., "A1")                                                          │
│    ├── skuId: string                                                                         │
│    ├── price: Money                                                                          │
│    ├── count: number                                                                         │
│    └── isEnabled: boolean                                                                    │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  Session (transaction state)                                                                 │
│    ├── sessionId: string                                                                     │
│    ├── selectedSlotId: string | null                                                         │
│    ├── status: SessionStatus                                                                 │
│    ├── insertedCash: Money                                                                   │
│    ├── paymentIntent: PaymentIntent | null                                                   │
│    ├── startedAt: DateTime                                                                   │
│    └── lastActivityAt: DateTime                                                              │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  PaymentModule                                                                               │
│    ├── cashAcceptor: CashAcceptor                                                            │
│    ├── coinChanger: CoinChanger                                                              │
│    └── cardReader: CardReader                                                                │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  Dispenser                                                                                   │
│    ├── vend(slotId): VendResult                                                              │
│    └── dropSensor: boolean                                                                   │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Schema (JSON)

**Enums**

```json
{
  "MachineState": [
    "IDLE",
    "AWAITING_SELECTION",
    "AWAITING_PAYMENT",
    "PAYMENT_IN_PROGRESS",
    "DISPENSING",
    "RETURNING_CHANGE",
    "COMPLETING",
    "OUT_OF_SERVICE"
  ],
  "SessionStatus": [
    "ACTIVE",
    "CANCELLED",
    "EXPIRED",
    "FAILED",
    "COMPLETED"
  ],
  "PaymentMethod": ["CASH", "CARD"],
  "PaymentStatus": [
    "NOT_STARTED",
    "PENDING",
    "AUTHORIZED",
    "CAPTURED",
    "DECLINED",
    "REFUNDED",
    "VOIDED",
    "FAILED"
  ]
}
```

**Entity schemas**

```json
{
  "Product": {
    "skuId": "string",
    "name": "string"
  },
  "Slot": {
    "slotId": "string",
    "skuId": "string",
    "price": { "amount": "number", "currency": "string" },
    "count": "number",
    "isEnabled": "boolean"
  },
  "Session": {
    "sessionId": "string",
    "selectedSlotId": "string | null",
    "status": "SessionStatus",
    "insertedCash": { "amount": "number", "currency": "string" },
    "paymentIntent": {
      "paymentIntentId": "string",
      "method": "PaymentMethod",
      "status": "PaymentStatus",
      "amount": { "amount": "number", "currency": "string" }
    },
    "startedAt": "string",
    "lastActivityAt": "string"
  }
}
```

---

## 4. State Machine (Core Pattern)

This design treats the vending machine as a **finite state machine** with explicit transitions driven by events (button press, coin inserted, card tap, vend result, timeout).

### 4.1 States (intent)

- **IDLE**: No active session; display catalog/ready.
- **AWAITING_SELECTION**: Session started; user can select slot; may have partial cash inserted.
- **AWAITING_PAYMENT**: Slot selected; waiting for sufficient cash OR card start.
- **PAYMENT_IN_PROGRESS**: Card flow ongoing (authorization/capture).
- **DISPENSING**: Motor running, waiting for drop sensor result.
- **RETURNING_CHANGE**: Return remaining credit (cash) or refund/void (card) if needed.
- **COMPLETING**: Finalize session, clear UI, persist audit/reconciliation records.
- **OUT_OF_SERVICE**: Critical hardware fault (e.g., changer jam) prevents safe vending.

### 4.2 Events

- **User events**: `Start`, `SelectSlot(slotId)`, `InsertCoin(value)`, `InsertBill(value)`, `TapCard()`, `Cancel`
- **System events**: `PaymentAuthorized`, `PaymentDeclined`, `PaymentCaptured`, `VendSucceeded`, `VendFailed`, `Timeout`, `HardwareFault`

### 4.3 Transition sketch (high-signal)

```
IDLE
  └─ Start → AWAITING_SELECTION

AWAITING_SELECTION
  ├─ InsertCash → AWAITING_SELECTION
  ├─ SelectSlot(in stock) → AWAITING_PAYMENT
  ├─ Cancel/Timeout → RETURNING_CHANGE
  └─ HardwareFault → OUT_OF_SERVICE

AWAITING_PAYMENT
  ├─ InsertCash (credit >= price AND canMakeChangeIfNeeded) → DISPENSING
  ├─ TapCard → PAYMENT_IN_PROGRESS
  ├─ SelectSlot(other) → AWAITING_PAYMENT  (re-price / re-check stock)
  ├─ Cancel/Timeout → RETURNING_CHANGE
  └─ HardwareFault → OUT_OF_SERVICE

PAYMENT_IN_PROGRESS
  ├─ PaymentAuthorized(or Captured) → DISPENSING
  ├─ PaymentDeclined/Failed/Timeout → AWAITING_PAYMENT (or RETURNING_CHANGE if cancel)
  └─ HardwareFault → OUT_OF_SERVICE

DISPENSING
  ├─ VendSucceeded → RETURNING_CHANGE
  ├─ VendFailed → RETURNING_CHANGE  (refund/void for card)
  └─ HardwareFault → OUT_OF_SERVICE

RETURNING_CHANGE
  └─ ChangeReturned(or none) → COMPLETING

COMPLETING
  └─ Done → IDLE
```

**Key idea:** Every event is handled by a state-specific handler (State pattern), and every transition is explicit and testable.

---

## 5. Inventory (Model + Invariants)

### 5.1 Slot-based inventory (why)

Most real vending machines are **slot-based**: selecting A1 corresponds to a specific spiral/motor. That makes `Slot` the natural unit of inventory and dispensing.

### 5.2 Core invariants

- **Vend requires stock**: for selected `slotId`, must have `count > 0` and `isEnabled = true`.
- **Exactly-once decrement**: decrement `count` **only after** we have high confidence the item was delivered (drop sensor success). If no sensor exists, decrement on motor completion and rely on reconciliation/complaints (less accurate).
- **Idempotency**: repeated `VendSucceeded` signals (sensor bounce) must not decrement inventory twice. Tie vend completion to `sessionId` + a per-session `vendAttemptId`.

### 5.3 Reserving inventory during payment (choice)

Two common approaches:

- **Approach A — Reserve on selection**: temporarily reserve one unit when user selects slot. Prevents “sold out” races but can hold inventory during long payment.
- **Approach B — Check on dispense** (simpler): re-check stock right before `DISPENSING`. Accepts rare race (two simultaneous sessions) — but a single physical machine typically has **one** active session, so this is fine.

**We choose Approach B**: single-user physical UI means one session at a time; we just validate stock at selection and again before dispensing.

---

## 6. Payments (Cash + Card)

### 6.1 Cash model

Maintain `insertedCash` as the current credit.

On vend:

- Required: `insertedCash >= price`
- Change due: `change = insertedCash - price`

### 6.2 Change-making constraints

If the machine must always return change, it needs coin tubes (inventory of denominations).

Model:

- `CoinChanger.tubes[denomination] = count`

Decision rule:

- If `change > 0` and `coinChanger.canMake(change)` is false, block purchase (display “Exact change only” / “No change available”).

Greedy change-making works for common coin systems, but you can model `canMake` as a bounded knapsack for correctness when denominations/tube counts are constrained.

### 6.3 Card model

Use a `PaymentIntent` lifecycle:

- `PENDING` → `AUTHORIZED` → `CAPTURED`
- Failure paths: `DECLINED`, `FAILED`, `VOIDED`, `REFUNDED`

Two practical flows:

- **Authorize then capture after vend success** (best for customer): if vend fails, void authorization.
- **Capture before vend** (simpler with some terminals): if vend fails, refund.

**We prefer authorize → vend → capture** when supported by the payment terminal; else do capture then refund on failure.

### 6.4 Payment idempotency

Card terminals can retry/duplicate callbacks. Make all payment operations idempotent by keying on:

- `sessionId` as idempotency key for `createPaymentIntent`
- `paymentIntentId` for capture/void/refund

---

## 7. Key Flows

### 7.1 Cash purchase (happy path)

1. `Start` → create `Session(ACTIVE)` → `AWAITING_SELECTION`.
2. User inserts cash: update `insertedCash`.
3. User selects slot A1: validate stock + price → `AWAITING_PAYMENT`.
4. If credit sufficient and change possible → `DISPENSING`.
5. `Dispenser.vend(A1)` → drop sensor confirms → `VendSucceeded`.
6. Decrement `Slot.count -= 1`.
7. Return change (if any) → `COMPLETING` → `IDLE`.

### 7.2 Card purchase (authorize → vend → capture)

1. Select slot → `AWAITING_PAYMENT`.
2. `TapCard` → `PAYMENT_IN_PROGRESS` and create `PaymentIntent(PENDING)`.
3. On `AUTHORIZED` → `DISPENSING`.
4. If `VendSucceeded` → capture payment → `RETURNING_CHANGE` (usually none).
5. If `VendFailed` → void authorization (or refund if already captured) → `COMPLETING`.

### 7.3 Cancel / Timeout

If user cancels or there is inactivity for TTL (e.g., 30–60s):

- Move to `RETURNING_CHANGE`
- Return all `insertedCash`
- If card payment pending, cancel/void if possible
- End session

### 7.4 Out of stock

If selected slot is out of stock:

- Reject selection (stay in `AWAITING_SELECTION`/`AWAITING_PAYMENT`)
- Do not accept card payment for that slot
- Allow user to choose another slot or cancel and get money back

---

## 8. Operational/Admin Use Cases (Minimal)

- **Restock**: update `Slot.count`, set `isEnabled`.
- **Price update**: update `Slot.price`.
- **Coin tube refill**: update `coinChanger.tubes`.
- **Diagnostics**: mark `OUT_OF_SERVICE` on critical faults; provide fault codes.
- **Audit logs**: record session start/end, selection, payment status, vend result, cash in/out, tube deltas.

---

## 9. Testing Focus

- **State machine coverage**: every event is valid/invalid depending on state; ensure invalid events don’t mutate state.
- **Cash accounting**: inserted cash, price, and returned change reconcile; cancel always returns full credit.
- **Change constraints**: block purchase when change cannot be made (if policy requires).
- **Card idempotency**: duplicate authorize/capture callbacks don’t double-charge or double-vend.
- **Vend failure handling**: inventory not decremented on failure; card payments are voided/refunded correctly.
- **Timeouts**: session expires safely and returns funds; terminal pending payments are resolved/voided.
- **Out-of-stock races**: stock checked at selection and again before dispense; never vend with `count = 0`.

This design emphasizes an explicit **finite state machine** for correctness, a practical **slot-based inventory model**, and robust **payment handling** (cash + card) with safe failure paths.

