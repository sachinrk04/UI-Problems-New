# Design: Snake and Ladder Game

**Focus areas:** Board · Dice · Players · Win condition

---

## 1. Requirements (Clarifying Questions)

| Area | Questions |
|------|-----------|
| **Board** | Board size (classic 100)? Any custom sizes? How are snakes/ladders configured (fixed vs random)? |
| **Dice** | 1 die or 2 dice? Dice sides (6)? Any rule for rolling again on 6? |
| **Movement** | Must land exactly on final cell to win? If overshoot, do we bounce back or stay? |
| **Snakes/Ladders** | Can a snake/ladder chain (land on ladder then another ladder)? Allow cycles? |
| **Players** | Number of players, turn order, AI players? Simultaneous games? |
| **Game end** | First to reach end wins? Track rank for multiple winners (1st/2nd/3rd)? |

**Assumptions for this design:** Classic board of **1..100**, **1 dice (1..6)**, **N players** (2+). If a move overshoots 100, the player **does not move** (common rule). Snakes and ladders are a **static mapping** `start -> end` where `start != end`. If player lands on a start cell, they teleport to end cell (snake down, ladder up). We allow **single jump per move** (no chaining) to keep rules simple; chaining can be an extension.

---

## 2. Core Entities & Relationships

```
┌───────────────────────────────────────────────────────────────────────────────────────────────┐
│                                   SNAKE & LADDER GAME                                         │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│  Game                                                                                         │
│    ├── id: string                                                                             │
│    ├── status: GameStatus                                                                     │
│    ├── board: Board                                                                           │
│    ├── dice: Dice                                                                             │
│    ├── players: Player[]                                                                      │
│    ├── turnIndex: number                                                                      │
│    ├── winner: Player | null                                                                  │
│    └── history: MoveRecord[]                                                                  │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│  Board                                                                                        │
│    ├── size: number (e.g., 100)                                                               │
│    ├── jumps: Map<number, number>  // snakes + ladders combined                               │
│    └── methods: resolve(position), isValidCell(cell)                                          │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│  Dice                                                                                         │
│    ├── sides: number (e.g., 6)                                                                │
│    └── roll(): number                                                                         │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│  Player                                                                                       │
│    ├── id: string                                                                             │
│    ├── name: string                                                                           │
│    └── position: number  // 0 (off-board) .. board.size                                       │
├───────────────────────────────────────────────────────────────────────────────────────────────┤
│  RulesEngine                                                                                  │
│    ├── computeNextPosition(board, from, roll): NextPositionResult                             │
│    └── isWinningPosition(board, position): boolean                                            │
└───────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Schema (JSON)

**Enums**

```json
{
  "GameStatus": ["NOT_STARTED", "ONGOING", "FINISHED"]
}
```

**Game state (engine-friendly)**

```json
{
  "Game": {
    "id": "string",
    "status": "GameStatus",
    "board": {
      "size": "number",
      "jumps": { "number": "number" }
    },
    "dice": {
      "sides": "number"
    },
    "players": [
      {
        "id": "string",
        "name": "string",
        "position": "number"
      }
    ],
    "turnIndex": "number",
    "winner": "string | null",
    "history": [
      {
        "playerId": "string",
        "roll": "number",
        "from": "number",
        "to": "number",
        "jumpFrom": "number | null",
        "jumpTo": "number | null",
        "didMove": "boolean",
        "isWin": "boolean",
        "createdAt": "string"
      }
    ]
  }
}
```

---

## 4. Board Design

### 4.1 Cells

- Cells are numbered `1..size` (classic `size=100`)
- A player's `position` starts at `0` meaning "not yet on the board"

### 4.2 Snakes + ladders as a jump map

We unify snakes and ladders as:

- `jumps[startCell] = endCell`
- Ladder: `endCell > startCell`
- Snake: `endCell < startCell`

**Invariants**

- `startCell` and `endCell` must both be in `1..size`
- `startCell != endCell`
- A `startCell` should be unique (no two jumps from same start)
- (Optional) avoid cycles if you allow chaining

### 4.3 Resolving a landing cell

When a player lands on a cell `x`:

- If `x` is a key in `jumps`, final becomes `jumps[x]`
- Else final remains `x`

We keep it **single-step resolution** (no chaining) to match the assumption.

---

## 5. Dice Design

### 5.1 Interface

- `Dice.sides` (default 6)
- `roll()` returns an integer in `[1, sides]`

### 5.2 Extensibility

You can support multiple dice with:

- `DiceSet` that returns `{ rolls: number[], total: number }`

But for the core problem, one die is enough.

---

## 6. Player Design

### 6.1 State

Each `Player` only needs:

- `id`, `name`
- `position` (0..board.size)

### 6.2 Turn order

Maintain `turnIndex` into `players[]`.

- Next player is `(turnIndex + 1) % players.length`

---

## 7. Win Condition (and move validation)

### 7.1 Win condition

A player wins when `position == board.size` after applying:

- normal movement from dice roll
- jump resolution (snake/ladder)

### 7.2 Overshoot rule (assumption)

If `from + roll > board.size`, the player **does not move**.

Alternative rules (extensions):

- **Bounce back**: if overshoot by `k`, final is `board.size - k`
- **Exact only**: same as "do not move" (what we used)

### 7.3 Start position rule

Player begins at `0`.

- If `0 + roll` is within board, they move to that cell
- Jump resolution applies if they land on a jump start

---

## 8. Core Algorithm (Game loop)

### 8.1 `takeTurn()`

High-level:

1. Identify current player `p = players[turnIndex]`
2. Roll dice: `r = dice.roll()`
3. Compute tentative: `tentative = p.position + r`
4. If `tentative > board.size` → no move (`didMove=false`)
5. Else:
   - `landed = tentative`
   - `resolved = board.resolve(landed)` (single jump)
   - Set `p.position = resolved`
6. If `p.position == board.size` → `status=FINISHED`, set `winner=p`
7. Append `MoveRecord` (from/to, jump info, win)
8. If not finished: advance `turnIndex`

---

## 9. Key APIs / Methods (Minimal)

- `Game.start(): void` (sets status to ONGOING)
- `Game.takeTurn(): MoveRecord` (single turn advance)
- `Game.getCurrentPlayer(): Player`
- `Board.resolve(cell: number): { final: number, jumpFrom?: number, jumpTo?: number }`
- `RulesEngine.computeNextPosition(board, from, roll): NextPositionResult`

---

## 10. Edge Cases to Call Out

- **Multiple players on same cell**: allowed (no collision rules in classic game)
- **Bad board config**: jumps outside range, duplicate start cells, start=end
- **Instant win**: small boards (size < dice sides) still works
- **Chaining**: if you enable it, guard against cycles (e.g., via visited set in resolve)

This keeps the LLD crisp: `Board` owns topology (jumps), `Dice` owns randomness, `Player` owns position, and `Game/RulesEngine` owns turn progression + win detection.

