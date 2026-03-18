# Design: Hotel Booking System

**Focus areas:** Rooms · Reservations · Availability · Pricing

---

## 1. Requirements (Clarifying Questions)

| Area | Questions |
|------|-----------|
| **Scale** | Single hotel or multi-property chain? How many rooms / room types? Global or per-country? |
| **Inventory model** | Are rooms uniquely bookable (specific room numbers) or pooled by room type (like most OTAs)? Support connecting rooms? |
| **Availability** | Do we need real-time availability with “holds” during checkout? Hold TTL? What happens on payment failure? |
| **Reservations** | Support modifications/cancellations? Cancellation policy per rate plan? Multi-room booking in one reservation? |
| **Pricing** | Per-night pricing? Seasonal pricing? Weekend rules? Discounts/coupons? Taxes/fees included or added? |
| **Guests** | Guest profiles? Loyalty tiers? Guest count (adults/children) constraints per room type? |
| **Payments** | Pay now vs pay at property? Partial preauth/guarantee? Refunds? |
| **Edge cases** | Overbooking policy? Walk-ins? No-shows? Day-use rooms? Time zones / check-in/out cutoffs? |

**Assumptions for this design:** Multi-property; inventory is **pooled by room type** (not specific room numbers) for online booking; bookings are nightly; supports multi-room reservations; availability uses **temporary holds** during checkout; pricing is computed via **rate plans** + per-night rules + taxes/fees; focus on core booking (search → quote → hold → confirm).

---

## 2. Core Entities & Relationships

```
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                                HOTEL BOOKING SYSTEM                                          │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  Property                                                                                    │
│    ├── propertyId: string                                                                    │
│    ├── name, timezone, address                                                               │
│    └── roomTypes: RoomType[]                                                                 │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  RoomType (inventory pool)                                                                   │
│    ├── roomTypeId: string                                                                    │
│    ├── propertyId: string                                                                    │
│    ├── name, capacityAdults, capacityChildren                                                │
│    ├── baseAmenities: string[]                                                               │
│    └── totalUnits: number  (physical rooms in this type)                                     │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  AvailabilityCalendar (derived / cached view)                                                │
│    ├── roomTypeId: string                                                                    │
│    ├── date: LocalDate                                                                       │
│    ├── totalUnits: number                                                                    │
│    ├── bookedUnits: number                                                                   │
│    ├── heldUnits: number                                                                     │
│    └── availableUnits: number (= total - booked - held)                                      │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  RatePlan                                                                                    │
│    ├── ratePlanId: string                                                                    │
│    ├── propertyId: string                                                                    │
│    ├── roomTypeId: string                                                                    │
│    ├── name, refundability: Refundability                                                    │
│    ├── cancellationPolicy: string                                                            │
│    └── pricingRules: PricingRule[]                                                           │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  Quote (priced offer, ephemeral)                                                             │
│    ├── quoteId: string                                                                       │
│    ├── propertyId, roomTypeId, ratePlanId                                                    │
│    ├── checkIn: LocalDate, checkOut: LocalDate                                               │
│    ├── rooms: number                                                                         │
│    ├── guestCounts: { adults, children }                                                     │
│    ├── nightly: NightlyPrice[]                                                               │
│    ├── taxesAndFees: Money                                                                   │
│    ├── total: Money                                                                          │
│    ├── currency: string                                                                      │
│    └── expiresAt: DateTime                                                                   │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  Hold (inventory lock, short-lived)                                                          │
│    ├── holdId: string                                                                        │
│    ├── quoteId: string                                                                       │
│    ├── roomTypeId: string                                                                    │
│    ├── checkIn, checkOut: LocalDate                                                          │
│    ├── rooms: number                                                                         │
│    ├── status: HoldStatus (ACTIVE, EXPIRED, RELEASED, CONVERTED)                             │
│    └── expiresAt: DateTime                                                                   │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  Reservation (source of truth)                                                               │
│    ├── reservationId: string                                                                 │
│    ├── propertyId: string                                                                    │
│    ├── status: ReservationStatus (PENDING, CONFIRMED, CANCELLED)                             │
│    ├── guest: Guest                                                                          │
│    ├── checkIn, checkOut: LocalDate                                                          │
│    ├── rooms: ReservationRoom[] (roomType + ratePlan + count + pricing snapshot)             │
│    ├── priceSnapshot: PriceSnapshot                                                          │
│    ├── payment: PaymentSummary                                                               │
│    └── createdAt, updatedAt                                                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Schema (JSON)

**Enums**

```json
{
  "Refundability": ["REFUNDABLE", "NON_REFUNDABLE"],
  "HoldStatus": ["ACTIVE", "EXPIRED", "RELEASED", "CONVERTED"],
  "ReservationStatus": ["PENDING", "CONFIRMED", "CANCELLED"]
}
```

**Entity schemas**

```json
{
  "Property": {
    "propertyId": "string",
    "name": "string",
    "timezone": "string",
    "address": "string"
  },
  "RoomType": {
    "roomTypeId": "string",
    "propertyId": "string",
    "name": "string",
    "capacityAdults": "number",
    "capacityChildren": "number",
    "baseAmenities": ["string"],
    "totalUnits": "number"
  },
  "RatePlan": {
    "ratePlanId": "string",
    "propertyId": "string",
    "roomTypeId": "string",
    "name": "string",
    "refundability": "Refundability",
    "cancellationPolicy": "string",
    "pricingRules": ["PricingRule"]
  },
  "PricingRule": {
    "type": "string",
    "startDate": "string",
    "endDate": "string",
    "daysOfWeek": ["string"],
    "basePrice": "number",
    "priceMultiplier": "number",
    "minNights": "number | null",
    "maxNights": "number | null"
  },
  "Quote": {
    "quoteId": "string",
    "propertyId": "string",
    "roomTypeId": "string",
    "ratePlanId": "string",
    "checkIn": "string",
    "checkOut": "string",
    "rooms": "number",
    "guestCounts": { "adults": "number", "children": "number" },
    "nightly": [{ "date": "string", "base": "number", "taxesAndFees": "number", "total": "number" }],
    "taxesAndFees": "number",
    "total": "number",
    "currency": "string",
    "expiresAt": "string"
  },
  "Hold": {
    "holdId": "string",
    "quoteId": "string",
    "roomTypeId": "string",
    "checkIn": "string",
    "checkOut": "string",
    "rooms": "number",
    "status": "HoldStatus",
    "expiresAt": "string"
  },
  "Reservation": {
    "reservationId": "string",
    "propertyId": "string",
    "status": "ReservationStatus",
    "guest": {
      "guestId": "string",
      "fullName": "string",
      "email": "string",
      "phone": "string | null"
    },
    "checkIn": "string",
    "checkOut": "string",
    "rooms": [{
      "roomTypeId": "string",
      "ratePlanId": "string",
      "count": "number",
      "pricing": {
        "nightly": [{ "date": "string", "total": "number" }],
        "total": "number",
        "currency": "string"
      }
    }],
    "priceSnapshot": {
      "subtotal": "number",
      "taxesAndFees": "number",
      "total": "number",
      "currency": "string"
    },
    "payment": {
      "paymentMode": "string",
      "paymentStatus": "string",
      "paidAmount": "number"
    },
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

---

## 4. Rooms (Model + Constraints)

### 4.1 Why we separate RoomType vs physical Room

Online bookings usually sell **an inventory pool** (e.g. “Deluxe King”) rather than a specific room number. The system must ensure we never sell more units than physically exist, per night.

- **RoomType**: the sellable product (capacity, amenities, totalUnits).
- **Physical rooms**: assigned later (check-in), not needed for core availability logic here.

### 4.2 Occupancy constraints

At quote time:

- Validate \(adults \le capacityAdults\), \(children \le capacityChildren\) per room (or per booking if you model rollaways).
- For multi-room booking, validate per-room distribution (simplify by assuming same occupancy per room, or require room-by-room guest splits).

---

## 5. Availability (Search + Holds + Confirmation)

Availability is per \((propertyId, roomTypeId, date)\) for each night in \([checkIn, checkOut)\).

### 5.1 Core invariant

For each night:

\[
availableUnits = totalUnits - bookedUnits - heldUnits
\]

To sell \(rooms = k\), we require \(availableUnits \ge k\) for **every** night in the stay.

### 5.2 Booking window representation

A reservation consumes inventory for each night:

- Check-in: 2026-04-01
- Check-out: 2026-04-04
- Nights: 2026-04-01, 2026-04-02, 2026-04-03

### 5.3 Holds (preventing race conditions)

When the user clicks “Reserve” (or enters checkout), create a **Hold** with TTL (e.g. 10 minutes):

- Increment `heldUnits += rooms` for each date in the stay (atomically).
- If payment succeeds → convert hold to reservation (held becomes booked).
- If payment fails or TTL expires → release hold (held decremented).

**Idempotency:** `createHold(quoteId)` should be idempotent to tolerate retries.

### 5.4 Concurrency strategies (pick one)

- **Approach A — Per-day row locking (SQL)**: one row per \((roomTypeId, date)\). Update with transaction + `SELECT ... FOR UPDATE`.
- **Approach B — Optimistic concurrency**: version column on inventory rows; retry on conflict.
- **Approach C — Redis atomic counters (fast path)**: `held` and `booked` tracked in Redis with periodic reconciliation from DB (more complex).

For a first pass, **Approach A** is simplest and reliable.

---

## 6. Pricing (Rate Plans + Quotes)

### 6.1 Quote vs Reservation pricing

- **Quote**: ephemeral priced offer (can expire; subject to change).
- **Reservation**: stores a **price snapshot** used for billing and refunds even if rules change later.

### 6.2 Pricing inputs

- Date range and nights
- Room count
- Guest counts
- RatePlan rules (base per-night pricing, seasonality, day-of-week, min/max stay)
- Taxes/fees rules (property-level, jurisdiction-level)

### 6.3 Pricing model (practical)

Compute nightly price per room, then multiply by number of rooms:

\[
nightlyTotal = nightlyRate + nightlyTaxesAndFees
\]

Reservation total:

\[
total = \sum nightlyTotal \times rooms
\]

Common rule types:

- **Seasonal**: different base for date ranges
- **Day-of-week**: weekend uplift
- **Length of stay**: discount for \(n \ge X\)
- **Promos**: coupon applied to subtotal (before taxes) or total (after taxes), but keep it consistent

### 6.4 Price change boundaries

Use these guards to reduce “price changed” surprises:

- Quote carries `expiresAt` and a `pricingVersion`.
- Hold creation requires a still-valid quote (or re-price and prompt).
- Reservation stores `priceSnapshot`.

---

## 7. Key APIs (Minimal)

### Search availability

- `GET /properties/{propertyId}/availability?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD&adults=2&children=0&rooms=1`
  - Returns eligible roomTypes + availableUnits + cheapest ratePlans

### Get quote

- `POST /quotes`
  - Body: propertyId, roomTypeId, ratePlanId, dates, rooms, guestCounts, currency
  - Returns quote with nightly breakdown and total

### Create hold

- `POST /holds`
  - Body: quoteId
  - Returns holdId + expiresAt

### Confirm reservation

- `POST /reservations`
  - Body: holdId, guest details, payment token (optional)
  - Returns reservationId + status CONFIRMED

### Cancel reservation

- `POST /reservations/{reservationId}/cancel`
  - Applies cancellation policy; releases inventory; may trigger refund

---

## 8. Key Flows

### 8.1 Search → Quote → Hold → Confirm

1. User searches for dates + occupancy.
2. System checks availability per roomType for all nights.
3. User selects roomType + ratePlan → create Quote.
4. User begins checkout → create Hold (locks inventory).
5. User completes payment (if pay now) → convert Hold to Reservation (bookedUnits increases).
6. Reservation is CONFIRMED; return confirmation details.

### 8.2 Hold expiry

1. Hold reaches `expiresAt` with no confirmation.
2. Background job marks hold EXPIRED.
3. System releases inventory for each night (decrement heldUnits).

### 8.3 Modification (simplified)

Treat modification as:

- Create a new hold for the new stay.
- If success, cancel old reservation (or partial adjust) and confirm new one.

This avoids complex partial inventory mutations in v1.

---

## 9. Data Model Notes (Inventory Table)

For Approach A, a common relational schema:

- `inventory(room_type_id, date, total_units, booked_units, held_units, version, updated_at)`
  - Unique key on `(room_type_id, date)`

Atomic hold acquisition:

- For each date in stay:
  - lock inventory row
  - verify `total_units - booked_units - held_units >= rooms`
  - increment `held_units += rooms`

---

## 10. Testing Focus

- **Availability math**: correct handling of \([checkIn, checkOut)\) nights; never consume checkOut day.
- **Concurrency**: two users attempting last unit → only one hold succeeds; retries are safe (idempotent hold creation).
- **Hold expiry**: inventory is released reliably; no leaks; double-expire doesn’t double-release.
- **Pricing correctness**: nightly breakdown sums to total; taxes/fees applied consistently; min/max stay enforced.
- **Price snapshot**: reservation uses stored price even if pricing rules change later.
- **Cancellation**: inventory restored; refundability and policy respected.

This design emphasizes correct **inventory accounting** (availability + holds), clear **reservation lifecycle**, and robust **pricing via quotes** with stable reservation snapshots.

