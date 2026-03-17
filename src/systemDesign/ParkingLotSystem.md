# Design: Parking Lot System

**Focus areas:** Slots · Vehicle types · Ticketing · Payment

---

## 1. Requirements (Clarifying Questions)

| Area | Questions |
|------|-----------|
| **Scale** | Single lot or multiple floors? Single entrance/exit or multiple? |
| **Vehicles** | Car, bike, truck, bus? Any EV/reserved spots? |
| **Ticketing** | Physical ticket, QR, license-plate recognition, or app-only? |
| **Payment** | Pay at exit, prepay, subscription, card/cash/digital? |
| **Rules** | First-come-first-serve or reserved slots? Max stay? |

**Assumptions for this design:** One lot with multiple floors, multiple vehicle types, ticket at entry (printed/QR), pay at exit (card/cash/digital), FCFS slot assignment with optional reservations.

---

## 2. Core Entities & Relationships

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         PARKING LOT SYSTEM                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│  ParkingLot                                                                  │
│    ├── floors: Floor[]                                                       │
│    ├── entrances: Entrance[]                                                 │
│    ├── exits: Exit[]                                                         │
│    └── ticketService, paymentService                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│  Floor                                                                       │
│    ├── floorNumber: int                                                      │
│    └── slots: Slot[]                                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│  Slot                                                                        │
│    ├── slotId: string                                                        │
│    ├── type: SlotType (SMALL, MEDIUM, LARGE)                                 │
│    ├── status: SlotStatus (AVAILABLE, OCCUPIED, RESERVED, MAINTENANCE)       │
│    └── vehicle: Vehicle | null                                               │
├──────────────────────────────────────────────────────────────────────────────┤
│  Vehicle (type hierarchy)                                                    │
│    ├── vehicleNumber: string                                                 │
│    ├── type: VehicleType (BIKE, CAR, TRUCK, BUS)                             │
│    └── (Bike, Car, Truck, Bus extend Vehicle)                                │
├──────────────────────────────────────────────────────────────────────────────┤
│  Ticket                                                                      │
│    ├── ticketId: string                                                      │
│    ├── vehicle: Vehicle                                                      │
│    ├── slot: Slot                                                            │
│    ├── entryTime: DateTime                                                   │
│    └── entryGate: Entrance                                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│  Payment                                                                     │
│    ├── paymentId: string                                                     │
│    ├── ticket: Ticket                                                        │
│    ├── amount: decimal                                                       │
│    ├── method: PaymentMethod (CASH, CARD, UPI, WALLET)                       │
│    └── status: PaymentStatus (PENDING, COMPLETED, FAILED, REFUNDED)          │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Schema (JSON)

**Enums**

```json
{
  "SlotType": ["SMALL", "MEDIUM", "LARGE"],
  "SlotStatus": ["AVAILABLE", "OCCUPIED", "RESERVED", "MAINTENANCE"],
  "VehicleType": ["BIKE", "CAR", "TRUCK", "BUS"],
  "PaymentMethod": ["CASH", "CARD", "UPI", "WALLET"],
  "PaymentStatus": ["PENDING", "COMPLETED", "FAILED", "REFUNDED"],
  "TicketStatus": ["ACTIVE", "PAID", "LOST"]
}
```

**Entity schemas**

```json
{
  "ParkingLot": {
    "lotId": "string",
    "name": "string",
    "floorIds": ["string"],
    "entranceIds": ["string"],
    "exitIds": ["string"]
  },
  "Floor": {
    "floorId": "string",
    "floorNumber": "number",
    "slotIds": ["string"]
  },
  "Slot": {
    "slotId": "string",
    "floorId": "string",
    "type": "SlotType",
    "status": "SlotStatus",
    "vehicleId": "string | null"
  },
  "Vehicle": {
    "vehicleId": "string",
    "vehicleNumber": "string",
    "type": "VehicleType"
  },
  "Ticket": {
    "ticketId": "string",
    "vehicleId": "string",
    "slotId": "string",
    "entryTime": "string",
    "entryGateId": "string",
    "exitTime": "string | null",
    "status": "TicketStatus"
  },
  "Payment": {
    "paymentId": "string",
    "ticketId": "string",
    "amount": "number",
    "method": "PaymentMethod",
    "status": "PaymentStatus",
    "completedAt": "string | null"
  }
}
```

**Example payloads**

```json
{
  "parkingLot": {
    "lotId": "PL-001",
    "name": "Central Mall Parking",
    "floorIds": ["F1", "F2", "F3"],
    "entranceIds": ["E1", "E2"],
    "exitIds": ["X1", "X2"]
  },
  "floor": {
    "floorId": "F1",
    "floorNumber": 1,
    "slotIds": ["S1-001", "S1-002", "S1-003"]
  },
  "slot": {
    "slotId": "S1-001",
    "floorId": "F1",
    "type": "MEDIUM",
    "status": "OCCUPIED",
    "vehicleId": "V-ABC123"
  },
  "vehicle": {
    "vehicleId": "V-ABC123",
    "vehicleNumber": "DL01AB1234",
    "type": "CAR"
  },
  "ticket": {
    "ticketId": "TKT-2024-001",
    "vehicleId": "V-ABC123",
    "slotId": "S1-001",
    "entryTime": "2024-03-17T09:30:00Z",
    "entryGateId": "E1",
    "exitTime": null,
    "status": "ACTIVE"
  },
  "payment": {
    "paymentId": "PAY-2024-001",
    "ticketId": "TKT-2024-001",
    "amount": 150.00,
    "method": "UPI",
    "status": "COMPLETED",
    "completedAt": "2024-03-17T12:45:00Z"
  }
}
```

---

## 3. Slots

### 3.1 Slot Types (by vehicle size)

| SlotType | Fits vehicles | Typical use |
|----------|----------------|-------------|
| `SMALL`  | Bike          | Motorcycle / scooter |
| `MEDIUM` | Car           | Sedan, SUV (default) |
| `LARGE`  | Truck, Bus    | Commercial / oversized |

- **Rule:** A slot can accommodate a vehicle of its type or smaller (e.g. MEDIUM can take CAR or BIKE).  
- **Assignment:** Prefer smallest compatible slot to maximize utilization.

### 3.2 Slot States

- `AVAILABLE` – free, can be assigned.
- `OCCUPIED` – has a vehicle (linked to a Ticket).
- `RESERVED` – held for a booking (optional feature).
- `MAINTENANCE` – temporarily unavailable.

### 3.3 Slot Assignment Strategy

1. On entry, determine `VehicleType` → map to allowed `SlotType(s)`.
2. Find first `AVAILABLE` slot of compatible type (e.g. by floor order, then slot id).
3. If none, reject entry (“Lot full”) or queue.
4. Assign slot to vehicle, create Ticket, set slot to OCCUPIED.

---

## 4. Vehicle Types

### 4.1 Enum: VehicleType

```text
BIKE  → SlotType: SMALL
CAR   → SlotType: MEDIUM (can use SMALL if policy allows)
TRUCK → SlotType: LARGE
BUS   → SlotType: LARGE
```

### 4.2 Vehicle → Slot compatibility

| VehicleType | Allowed slot types |
|-------------|--------------------|
| BIKE        | SMALL              |
| CAR         | SMALL, MEDIUM      |
| TRUCK       | LARGE              |
| BUS         | LARGE              |

### 4.3 Optional extensions

- **EV slots:** Add `SlotType.ELECTRIC` or a flag `isChargingSlot`; same size rules apply.
- **Reserved / accessible:** Add flags on `Slot` (e.g. `isReserved`, `isAccessible`).

---

## 5. Ticketing

### 5.1 Ticket lifecycle

1. **Issue (entry)**  
   - Vehicle arrives at entrance.  
   - System finds compatible available slot → assigns slot → creates **Ticket** (ticketId, vehicle, slot, entryTime, entrance).  
   - Slot → OCCUPIED.  
   - Return ticket (printed/QR/app) to driver.

2. **During stay**  
   - Ticket is the reference for the parked vehicle and slot (e.g. for “find my car” or lost ticket handling).

3. **Exit**  
   - Driver presents ticket at exit (scan QR / enter ticket id / LPR).  
   - System loads Ticket → computes duration → calculates fee → runs **Payment** flow.  
   - On success: release slot (AVAILABLE), mark ticket as used/closed, open gate.

### 5.2 Ticket data

- `ticketId` (unique)
- `vehicle` (plate + type)
- `slot` (floor + slot id)
- `entryTime`
- `entryGate`
- `exitTime` (set at exit)
- `status` (ACTIVE, PAID, LOST, etc.)

### 5.3 Edge cases

- **Lost ticket:** Policy (e.g. max fee or full-day charge); still use vehicle/slot if identified (e.g. by plate).
- **Duplicate exit:** Idempotent exit by ticketId; if already paid, deny or allow re-print of receipt only.

---

## 6. Payment

### 6.1 When payment happens

- **Pay-at-exit (assumed):** Amount computed at exit from `entryTime` and `exitTime` (and vehicle/slot type if pricing differs).

### 6.2 Pricing model (simplified)

- Rate can be **per hour** or **slab-based** (e.g. first 2h = X, next 3h = Y, then Z per hour).
- Different rates for VehicleType or SlotType if needed (e.g. bike cheaper than car).
- Optional: flat fee for lost ticket.

### 6.3 Payment flow

1. At exit: get Ticket → `duration = exitTime - entryTime` → `amount = pricingService.calculate(duration, vehicleType)`.
2. Driver chooses payment method (CASH, CARD, UPI, WALLET).
3. Execute payment (mock or real gateway); on success set Payment status COMPLETED.
4. Link Payment to Ticket; mark Ticket as PAID; release Slot; open gate.

### 6.4 Payment methods & status

- **Methods:** CASH, CARD, UPI, WALLET (extensible).
- **Status:** PENDING, COMPLETED, FAILED, REFUNDED (for overpay or dispute).

### 6.5 Optional features

- **Prepay / advance:** Pay for estimated time; at exit reconcile (refund or top-up).
- **Subscription / monthly pass:** Skip per-ticket payment for valid pass (check at entry and exit).

---

## 7. Class Diagram (Summary)

| Component      | Responsibility |
|----------------|----------------|
| **ParkingLot** | Holds floors, entrances, exits; delegates to services. |
| **Floor**      | Contains slots; list by type/status. |
| **Slot**       | Identity, type, status, optional vehicle reference. |
| **Vehicle**    | Plate, type; used in Ticket and pricing. |
| **Ticket**     | Links vehicle + slot + entry time; used for pricing and exit. |
| **TicketService** | Issue ticket (assign slot), resolve ticket at exit. |
| **PricingService** | Calculate fee from duration + vehicle/slot type. |
| **PaymentService** | Process payment, update status, trigger slot release. |

---

## 8. Key Flows

### Entry flow

1. Vehicle arrives at **Entrance**.
2. **TicketService** gets vehicle type → asks **SlotService** (or Floor/Slot layer) for first available compatible slot.
3. If found: create **Ticket**, assign vehicle to **Slot**, set slot OCCUPIED, return ticket.
4. If not found: return “Parking full”.

### Exit flow

1. Driver presents ticket at **Exit**.
2. **TicketService** loads Ticket, sets exitTime.
3. **PricingService** computes amount.
4. **PaymentService** processes payment; on success → release Slot, mark Ticket PAID, open gate.

---

## 9. Extension Points

- **Multiple floors:** Floor has many slots; assignment can prefer same floor for entry gate.
- **Reservations:** Slot status RESERVED; reservation holds slot until ETA or timeout.
- **EV charging:** Slot flag + optional charging session and extra fee.
- **Pricing tiers:** Peak/off-peak, weekday/weekend in PricingService.

---

## 10. Testing Focus

- Slot assignment: correct type compatibility; no double assignment.
- Ticket: one active ticket per vehicle/slot; exit only after payment.
- Payment: amount calculation for boundaries (e.g. 0–1 min, 1h, 24h); idempotent completion.
- Concurrency: two entries at same time don’t get the same slot (atomic assign).

This design gives you a clear model for **slots** (types and states), **vehicle types** (and compatibility), **ticketing** (issue at entry, resolve at exit), and **payment** (at exit, methods and status), and leaves room to extend with reservations, EV, and richer pricing.
