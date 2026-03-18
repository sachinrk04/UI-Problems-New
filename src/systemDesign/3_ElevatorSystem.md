# Design: Elevator System

**Focus areas:** Floors · Direction logic · Request scheduling

---

## 1. Requirements (Clarifying Questions)

| Area | Questions |
|------|-----------|
| **Scale** | How many floors? How many elevators (cars) per bank? One building or multiple shafts/banks? |
| **Requests** | Hall calls (UP/DOWN) + car calls (destination) both? Can user request both directions? |
| **Policies** | Should we prioritize minimizing wait time, travel time, or fairness? Any VIP/priority rides? |
| **Constraints** | Capacity limit? Door-open dwell time? Maintenance mode / out-of-service? |
| **Edge cases** | Fire mode / emergency recall? Power failure? Overload? |

**Assumptions for this design:** One building, one elevator bank (N cars), hall calls have a direction (UP/DOWN), car calls are destination floors, no VIP mode, basic safety states omitted, focus on scheduling + direction.

---

## 2. Core Entities & Relationships

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                              ELEVATOR SYSTEM                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│  ElevatorSystem                                                              │
│    ├── floors: Floor[]                                                       │
│    ├── elevators: Elevator[]                                                 │
│    └── dispatcher: Dispatcher                                                │
├──────────────────────────────────────────────────────────────────────────────┤
│  Floor                                                                       │
│    ├── floorNumber: int                                                      │
│    ├── upButton: boolean                                                     │
│    └── downButton: boolean                                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│  Elevator (car)                                                              │
│    ├── elevatorId: string                                                    │
│    ├── currentFloor: int                                                     │
│    ├── direction: Direction (UP, DOWN, IDLE)                                 │
│    ├── state: ElevatorState (MOVING, STOPPED, DOORS_OPEN)                    │
│    ├── upStops: SortedSet<int>                                               │
│    ├── downStops: SortedSet<int>                                             │
│    └── capacity, load, isOperational                                         │
├──────────────────────────────────────────────────────────────────────────────┤
│  Request (events)                                                            │
│    ├── requestId: string                                                     │
│    ├── type: RequestType (HALL_CALL, CAR_CALL)                               │
│    ├── sourceFloor: int                                                      │
│    ├── direction: Direction | null  (hall call only)                         │
│    ├── destinationFloor: int | null (car call only)                          │
│    └── createdAt: DateTime                                                   │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Schema (JSON)

**Enums**

```json
{
  "Direction": ["UP", "DOWN", "IDLE"],
  "ElevatorState": ["MOVING", "STOPPED", "DOORS_OPEN"],
  "RequestType": ["HALL_CALL", "CAR_CALL"]
}
```

**Entity schemas**

```json
{
  "Floor": {
    "floorNumber": "number",
    "upButton": "boolean",
    "downButton": "boolean"
  },
  "Elevator": {
    "elevatorId": "string",
    "currentFloor": "number",
    "direction": "Direction",
    "state": "ElevatorState",
    "upStops": ["number"],
    "downStops": ["number"],
    "capacity": "number",
    "load": "number",
    "isOperational": "boolean"
  },
  "Request": {
    "requestId": "string",
    "type": "RequestType",
    "sourceFloor": "number",
    "direction": "Direction | null",
    "destinationFloor": "number | null",
    "createdAt": "string"
  }
}
```

---

## 4. Floors (Model + Behavior)

### 4.1 Floor buttons

- **Hall call** is always directional:
  - If user presses **UP** at floor \(f\), it means “pick me up at \(f\) going UP”.
  - If user presses **DOWN** at floor \(f\), it means “pick me up at \(f\) going DOWN”.
- Typical building rule:
  - No **DOWN** button on the lowest floor.
  - No **UP** button on the highest floor.

### 4.2 Why direction matters

Two passengers at the same floor might want opposite directions. Treating them as one “floor request” increases stops / reversals.

So we model **hall calls** as \((floor, direction)\) rather than just \(floor\).

---

## 5. Direction Logic (Per Elevator)

### 5.1 Core invariants

Each elevator maintains two ordered stop-sets:

- **`upStops`**: floors \(>\) currentFloor to serve while going UP (ascending order)
- **`downStops`**: floors \(<\) currentFloor to serve while going DOWN (descending order)

### 5.2 Choosing next direction

When an elevator is **IDLE**:

- If it has any pending stops:
  - Choose the direction of the nearest stop (tie-breaker: prefer UP or configured default).
- If no stops:
  - Stay IDLE.

When an elevator is moving **UP**:

- Continue UP while `upStops` has floors above currentFloor.
- Only switch to DOWN after finishing all UP stops (classic “elevator/SCAN” behavior), unless you explicitly allow reversal for SLAs.

When moving **DOWN**:

- Continue DOWN while `downStops` has floors below currentFloor.
- Only switch to UP after finishing all DOWN stops.

### 5.3 Handling same-floor events

If a request targets `currentFloor`:

- If doors are open: merge/serve immediately.
- Else: treat as an immediate stop (insert current floor as next stop) to avoid skipping.

---

## 6. Request Types

### 6.1 Hall calls (external)

- Input: \((sourceFloor, direction)\)
- Output effect:
  - A dispatcher assigns this hall call to one elevator.
  - The assigned elevator adds `sourceFloor` into its stop-set (up or down) according to how it will approach/serve it.

### 6.2 Car calls (internal)

- Input: \((destinationFloor)\) from inside a specific elevator.
- Output effect:
  - Goes directly into that elevator’s stop-set:
    - If destination > currentFloor → `upStops`
    - Else if destination < currentFloor → `downStops`
    - Else immediate stop

---

## 7. Scheduling / Dispatching (Assigning Hall Calls to Elevators)

This is the core of “request scheduling”. We’ll use a **cost function** + **direction-aware eligibility** to pick the best elevator for a new hall call.

### 7.1 Eligibility rules (direction-aware)

Given a hall call \((f, dir)\), an elevator is a strong candidate if:

- **Same direction, on the way**:
  - Elevator direction == UP and `currentFloor <= f` and it will pass through \(f\)
  - Elevator direction == DOWN and `currentFloor >= f` and it will pass through \(f\)
- **IDLE**: can serve any request

It can still be a candidate if it would need a reversal, but that should have a higher cost.

### 7.2 Cost function (simple but effective)

Compute estimated “time to pickup” for each elevator and choose min:

\[
cost(e, f, dir) =
\begin{cases}
|f - e.currentFloor| & e.direction = IDLE \\
|f - e.currentFloor| & e.direction = dir \ \text{and on the way} \\
remainingRun(e) + distanceAfterReversal(e, f) & \text{otherwise}
\end{cases}
\]

Where:
- **`remainingRun(e)`**: distance to finish current direction’s queued stops.
- **`distanceAfterReversal(e, f)`**: distance from reversal point to \(f\).

Add optional penalties:
- overload penalty if `load/capacity` high
- out-of-service → infinite cost
- fairness penalty if elevator has been starved or has too many assigned hall calls

### 7.3 Scheduler behavior (SCAN/LOOK style)

Inside each elevator, we use a SCAN-like policy:

- While going UP: serve stops in increasing order (like disk scheduling SCAN/LOOK)
- While going DOWN: serve stops in decreasing order

**LOOK optimization:** rather than going to extremes, reverse direction at the last pending stop in that direction.

This reduces direction thrashing and is easy to reason about.

### 7.4 Batching and merging requests

When multiple hall calls come in:

- Merge duplicates: \((f, dir)\) should be idempotent.
- If elevator is already scheduled to stop at \(f\), don’t add it again.
- Optional: “door dwell batching”: keep doors open briefly to collect last-moment car calls for nearby floors.

---

## 8. Key Flows

### Hall call flow (press UP/DOWN on floor)

1. User presses **UP** or **DOWN** on floor \(f\) → create `Request(HALL_CALL, sourceFloor=f, direction=dir)`.
2. `Dispatcher` selects best `Elevator` using eligibility + cost.
3. Dispatcher assigns request:
   - Elevator inserts stop \(f\) into the appropriate stop-set (depending on how it will approach).
4. Elevator eventually arrives at \(f\), opens doors, boards passengers.
5. Passenger presses destination(s) inside → car calls added to that elevator’s stop-sets.

### Car call flow (press destination inside elevator)

1. Passenger presses destination \(d\) in elevator \(e\) → create `Request(CAR_CALL, destinationFloor=d)`.
2. \(d\) goes to `upStops` or `downStops` based on relative position.
3. Elevator continues SCAN/LOOK execution to serve stops.

---

## 9. Class Diagram (Summary)

| Component | Responsibility |
|-----------|----------------|
| **ElevatorSystem** | Owns floors + elevators; routes incoming requests to Dispatcher. |
| **Floor** | Generates hall calls (UP/DOWN). |
| **Elevator** | Maintains direction/state and ordered stop-sets; executes movement and door cycles. |
| **Dispatcher** | Assigns hall calls to elevators using direction-aware cost. |
| **Request** | Captures hall/call intent with direction/destination. |

---

## 10. Testing Focus

- **Direction correctness**: elevator doesn’t thrash directions; reverses only when current-direction stops are complete (LOOK/SCAN).
- **Hall call modeling**: \((floor, UP)\) and \((floor, DOWN)\) are distinct; duplicates are idempotent.
- **Dispatcher**: on-the-way elevator beats reversal elevator; IDLE elevator chosen reasonably.
- **Stop ordering**: `upStops` strictly increasing, `downStops` strictly decreasing; inserts don’t break ordering.
- **Edge floors**: no DOWN at bottom, no UP at top; requests to currentFloor served immediately.
- **Concurrency**: two hall calls at same time don’t assign the same physical pickup twice; stop-set updates are atomic.

This design emphasizes **floor modeling** (directional hall calls), robust **direction logic** (SCAN/LOOK style), and practical **request scheduling** (eligibility + cost function) used in real elevator dispatchers.

