# Design: Chess Game

**Focus areas:** Pieces · Moves · Board · Turn logic

---

## 1. Requirements (Clarifying Questions)

| Area | Questions |
|------|-----------|
| **Rules** | Standard chess only? (castling, en passant, promotion, draw rules) Any chess variants? |
| **Players** | Human vs human only? Human vs engine? Time controls (clock)? |
| **State** | Need undo/redo? Need move history in algebraic notation (SAN/PGN)? |
| **Validation** | Must enforce legal moves only (no self-check)? Need “show legal moves” highlighting? |
| **Draws** | Support threefold repetition, 50-move rule, insufficient material, stalemate? |
| **I/O** | Board represented as FEN? Export/import? |

**Assumptions for this design:** Standard chess. Enforces **legal moves** (cannot leave own king in check). Supports **castling**, **en passant**, **promotion**. Detects **check**, **checkmate**, **stalemate**, and basic draw by **insufficient material**; tracks **move history** and enough state for repetition/50-move later (optional extension).

---

## 2. Core Entities & Relationships

```
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│                                        CHESS GAME                                            │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  Game                                                                                        │
│    ├── id: string                                                                            │
│    ├── status: GameStatus                                                                    │
│    ├── board: Board                                                                          │
│    ├── turn: Color (WHITE/BLACK)                                                             │
│    ├── castlingRights: CastlingRights                                                        │
│    ├── enPassantTarget: Square | null                                                        │
│    ├── halfmoveClock: number (for 50-move rule)                                              │
│    ├── fullmoveNumber: number                                                                │
│    └── history: MoveRecord[]                                                                 │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  Board                                                                                       │
│    ├── grid: Piece? [8][8]                                                                   │
│    └── methods: getPiece, setPiece, movePiece, clone                                         │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  Piece (base)                                                                                │
│    ├── id: string                                                                            │
│    ├── type: PieceType                                                                       │
│    ├── color: Color                                                                          │
│    └── hasMoved: boolean                                                                     │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  Move (intent)                                                                               │
│    ├── from: Square                                                                          │
│    ├── to: Square                                                                            │
│    ├── promotion: PieceType?                                                                 │
│    └── meta: MoveMeta (computed)                                                             │
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│  MoveValidator / RulesEngine                                                                 │
│    ├── generatePseudoLegalMoves(board, color): Move[]                                        │
│    ├── isLegalMove(game, move): boolean                                                      │
│    ├── applyMove(game, move): Game (new state)                                               │
│    └── isInCheck(board, color): boolean                                                      │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Schema (JSON)

**Enums**

```json
{
  "Color": ["WHITE", "BLACK"],
  "PieceType": ["KING", "QUEEN", "ROOK", "BISHOP", "KNIGHT", "PAWN"],
  "GameStatus": ["ONGOING", "CHECKMATE", "STALEMATE", "DRAW", "RESIGNED"]
}
```

**State snapshot (engine-friendly)**

```json
{
  "Game": {
    "id": "string",
    "status": "GameStatus",
    "turn": "Color",
    "board": {
      "grid": [["Piece|null"]]
    },
    "castlingRights": {
      "whiteKingSide": "boolean",
      "whiteQueenSide": "boolean",
      "blackKingSide": "boolean",
      "blackQueenSide": "boolean"
    },
    "enPassantTarget": { "file": "number", "rank": "number" },
    "halfmoveClock": "number",
    "fullmoveNumber": "number",
    "history": ["MoveRecord"]
  },
  "Piece": {
    "id": "string",
    "type": "PieceType",
    "color": "Color",
    "hasMoved": "boolean"
  },
  "Move": {
    "from": { "file": "number", "rank": "number" },
    "to": { "file": "number", "rank": "number" },
    "promotion": "PieceType | null"
  },
  "MoveRecord": {
    "move": "Move",
    "captured": "Piece | null",
    "isCheck": "boolean",
    "isCheckmate": "boolean",
    "isCastle": "boolean",
    "isEnPassant": "boolean",
    "isPromotion": "boolean",
    "notation": "string | null",
    "createdAt": "string"
  }
}
```

---

## 4. Board Representation

### 4.1 Coordinate system

Use 0-based indices for a compact engine representation:

- `file` \(0..7\) = a..h
- `rank` \(0..7\) = 1..8

Convention (common in engines): rank 0 is White’s back rank (rank “1” in chess notation).

### 4.2 Data structure choice

For LLD + UI, an `8x8` grid is easiest:

- `grid[rank][file] -> Piece | null`

Alternative (more engine-like): bitboards. Not needed unless performance is critical.

### 4.3 Immutability (recommended)

To validate moves safely:

- clone board → apply move → test legality (king safety) → commit

This avoids partial mutations during rule checks (especially for castling/en passant).

---

## 5. Pieces & Move Generation (Pseudo-legal)

We separate:

- **Pseudo-legal moves**: piece movement rules + board occupancy (but may leave king in check)
- **Legal moves**: pseudo-legal + king safety constraints

### 5.1 Sliding pieces (rook, bishop, queen)

Generate rays until blocked:

- rook: N/S/E/W
- bishop: diagonals
- queen: rook + bishop

Stop when:

- square has own piece → stop (not includable)
- square has enemy piece → include capture square and stop

### 5.2 Knight

Fixed 8 offsets; include destination if inside board and not occupied by own piece.

### 5.3 King

- One-step in 8 directions
- Castling is handled as a special move (section 6.2)

### 5.4 Pawn

For a pawn of `color`:

- **Forward**: one square forward if empty
- **Double**: two squares forward if on start rank and both squares empty
- **Captures**: one step diagonally forward if enemy piece
- **En passant**: capture diagonally into empty square if `enPassantTarget` matches (section 6.3)
- **Promotion**: if reaching last rank; requires promotion piece type (default often QUEEN)

---

## 6. Special Moves

### 6.1 Promotion

When a pawn moves to last rank:

- The move is only complete if `promotion` is provided (or default to QUEEN)
- Replace pawn with new piece of `promotion` type, same color

### 6.2 Castling

Castling is a king move with rook movement.

Rules to allow:

- King and rook have not moved (tracked via `castlingRights` and/or `hasMoved`)
- Squares between king and rook are empty
- King is not currently in check
- Squares the king crosses (and destination) are not attacked

Implementation:

- Represent as a `Move` from king’s `from` to `to` (g-file for king-side, c-file for queen-side)
- In `applyMove`, also move rook to f-file or d-file accordingly

### 6.3 En passant

When a pawn moves two squares forward, set:

- `enPassantTarget = square behind the pawn` (the square it “passed over”)

On the next move only, an opposing pawn adjacent to the destination file may capture:

- Move pawn diagonally into `enPassantTarget`
- Remove the pawn that performed the double-step (captured pawn is not on `to`)

After any move:

- reset `enPassantTarget = null` unless a double-step just happened

---

## 7. Turn Logic & Game State Machine

### 7.1 Turn invariant

At any point:

- Only the player whose `color == game.turn` may move
- After a successful legal move, toggle turn

### 7.2 Applying a move (high-level)

1. Validate `move.from` contains a piece of `game.turn`
2. Generate pseudo-legal moves for that piece (or for all pieces) and ensure `move` is included
3. Apply move to a cloned board (including special move side effects)
4. Reject if own king is in check in the resulting position
5. Commit new state:
   - update castling rights
   - update enPassantTarget
   - update halfmoveClock/fullmoveNumber
   - append MoveRecord
6. Recompute status for the next player:
   - if next player has **no legal moves**:
     - if next player is in check → CHECKMATE
     - else → STALEMATE
   - else ONGOING

### 7.3 Halfmove / fullmove counters

- `halfmoveClock`: reset to 0 on pawn move or capture; else increment
- `fullmoveNumber`: increment after Black makes a move

---

## 8. Core Algorithms

### 8.1 Attack detection: `isSquareAttacked(board, square, byColor)`

Needed for:

- king safety (check)
- castling path safety

Approach:

- For each piece type of `byColor`, check if it attacks `square`
- Optimized approach: generate attacks directly (not full legal moves) to avoid recursion

### 8.2 Check detection: `isInCheck(board, color)`

1. Find king square of `color`
2. Return `isSquareAttacked(board, kingSquare, opposite(color))`

### 8.3 Legal move generation

To get all legal moves for a player:

1. Generate all pseudo-legal moves
2. Filter moves where applying them leaves own king in check

This is simple and correct; it’s the common approach for LLD and many engines.

---

## 9. Key APIs / Methods (Minimal)

### Engine methods

- `Game.makeMove(move: Move): Game`
- `Game.getLegalMoves(from?: Square): Move[]`
- `Game.getStatus(): GameStatus`
- `Game.isInCheck(color: Color): boolean`

### UI-friendly helpers

- `Board.toFEN(): string` (optional)
- `Board.fromFEN(fen: string): Board` (optional)
- `Move.toSAN(gameBeforeMove): string` (optional extension)

---

## 10. Testing Focus

- **Basic movement**: each piece movement and blocking/captures
- **King safety**: illegal moves that expose own king are rejected
- **Castling**: blocked squares, in-check, through-check, rook moved/king moved
- **En passant**: only immediately after double-step; correct captured pawn removal
- **Promotion**: correct replacement and continued legality checks
- **End states**: checkmate vs stalemate; no-move detection correctness
- **Turn enforcement**: cannot move opponent piece; turn toggles only on success

This design keeps responsibilities crisp: `Board` stores state, `RulesEngine` reasons about movement + legality, and `Game` owns turn/state transitions and history.

