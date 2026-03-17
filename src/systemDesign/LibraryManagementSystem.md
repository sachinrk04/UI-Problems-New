# Design: Library Management System

**Focus areas:** Books · Members · Borrowing · Fines

---

## 1. Requirements (Clarifying Questions)

| Area | Questions |
|------|-----------|
| **Scale** | Single branch or multi-branch? Physical only or digital/ebooks too? |
| **Books** | Catalog only (title, author, ISBN) or copies per title? Reservations / hold queue? |
| **Members** | Guest browse vs registered members only? Membership tiers / limits? |
| **Borrowing** | Max items per member? Loan period? Renewals? Overdue rules? |
| **Fines** | Per-day overdue? Max cap? Waivers? Payment at return or separate? |

**Assumptions for this design:** Single library; physical books with multiple copies per title; registered members borrow; fixed loan period with renewals; per-day overdue fines with optional cap; pay fines at return or separately.

---

## 2. Core Entities & Relationships

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                      LIBRARY MANAGEMENT SYSTEM                               │
├──────────────────────────────────────────────────────────────────────────────┤
│  Library                                                                     │
│    ├── catalog: BookTitle[] (catalog entries)                                │
│    ├── copies: BookCopy[] (physical copies)                                  │
│    ├── members: Member[]                                                     │
│    └── borrowService, fineService, catalogService                            │
├──────────────────────────────────────────────────────────────────────────────┤
│  BookTitle (catalog entry)                                                   │
│    ├── isbn: string                                                          │
│    ├── title: string                                                         │
│    ├── authors: string[]                                                     │
│    ├── category: string                                                      │
│    └── copyIds: string[]  (references BookCopy)                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  BookCopy (physical copy)                                                    │
│    ├── copyId: string                                                        │
│    ├── bookTitleId: string                                                   │
│    ├── status: CopyStatus (AVAILABLE, BORROWED, RESERVED, MAINTENANCE)       │
│    └── currentLoanId: string | null                                          │
├──────────────────────────────────────────────────────────────────────────────┤
│  Member                                                                      │
│    ├── memberId: string                                                      │
│    ├── name: string                                                          │
│    ├── email: string                                                         │
│    ├── membershipType: MembershipType (STANDARD, PREMIUM)                    │
│    ├── status: MemberStatus (ACTIVE, SUSPENDED, EXPIRED)                     │
│    └── maxBorrowLimit: int                                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│  Loan (borrowing record)                                                     │
│    ├── loanId: string                                                        │
│    ├── memberId: string                                                      │
│    ├── copyId: string                                                        │
│    ├── borrowedAt: DateTime                                                  │
│    ├── dueDate: DateTime                                                     │
│    ├── returnedAt: DateTime | null                                           │
│    └── status: LoanStatus (ACTIVE, RETURNED, OVERDUE)                        │
├──────────────────────────────────────────────────────────────────────────────┤
│  Fine                                                                        │
│    ├── fineId: string                                                        │
│    ├── loanId: string                                                        │
│    ├── memberId: string                                                      │
│    ├── amount: decimal                                                       │
│    ├── reason: FineReason (OVERDUE, DAMAGED, LOST)                           │
│    ├── status: FineStatus (PENDING, PAID, WAIVED)                            │
│    └── paidAt: DateTime | null                                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Schema (JSON)

**Enums**

```json
{
  "CopyStatus": ["AVAILABLE", "BORROWED", "RESERVED", "MAINTENANCE"],
  "MembershipType": ["STANDARD", "PREMIUM"],
  "MemberStatus": ["ACTIVE", "SUSPENDED", "EXPIRED"],
  "LoanStatus": ["ACTIVE", "RETURNED", "OVERDUE"],
  "FineReason": ["OVERDUE", "DAMAGED", "LOST"],
  "FineStatus": ["PENDING", "PAID", "WAIVED"]
}
```

**Entity schemas**

```json
{
  "BookTitle": {
    "bookTitleId": "string",
    "isbn": "string",
    "title": "string",
    "authors": ["string"],
    "category": "string",
    "copyIds": ["string"]
  },
  "BookCopy": {
    "copyId": "string",
    "bookTitleId": "string",
    "status": "CopyStatus",
    "currentLoanId": "string | null"
  },
  "Member": {
    "memberId": "string",
    "name": "string",
    "email": "string",
    "membershipType": "MembershipType",
    "status": "MemberStatus",
    "maxBorrowLimit": "number",
    "joinedAt": "string"
  },
  "Loan": {
    "loanId": "string",
    "memberId": "string",
    "copyId": "string",
    "borrowedAt": "string",
    "dueDate": "string",
    "returnedAt": "string | null",
    "status": "LoanStatus",
    "renewalCount": "number"
  },
  "Fine": {
    "fineId": "string",
    "loanId": "string",
    "memberId": "string",
    "amount": "number",
    "reason": "FineReason",
    "status": "FineStatus",
    "paidAt": "string | null",
    "createdAt": "string"
  }
}
```

**Example payloads**

```json
{
  "bookTitle": {
    "bookTitleId": "BT-001",
    "isbn": "978-0-13-468599-1",
    "title": "Clean Code",
    "authors": ["Robert C. Martin"],
    "category": "Programming",
    "copyIds": ["BC-001", "BC-002", "BC-003"]
  },
  "bookCopy": {
    "copyId": "BC-001",
    "bookTitleId": "BT-001",
    "status": "BORROWED",
    "currentLoanId": "LN-2024-001"
  },
  "member": {
    "memberId": "M-001",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "membershipType": "STANDARD",
    "status": "ACTIVE",
    "maxBorrowLimit": 5,
    "joinedAt": "2024-01-15T00:00:00Z"
  },
  "loan": {
    "loanId": "LN-2024-001",
    "memberId": "M-001",
    "copyId": "BC-001",
    "borrowedAt": "2024-03-01T10:00:00Z",
    "dueDate": "2024-03-15T23:59:59Z",
    "returnedAt": null,
    "status": "ACTIVE",
    "renewalCount": 0
  },
  "fine": {
    "fineId": "F-2024-001",
    "loanId": "LN-2024-001",
    "memberId": "M-001",
    "amount": 15.00,
    "reason": "OVERDUE",
    "status": "PENDING",
    "paidAt": null,
    "createdAt": "2024-03-16T00:00:00Z"
  }
}
```

---

## 3. Books

### 3.1 Catalog vs copies

- **BookTitle:** One record per logical book (ISBN/title); holds metadata (title, authors, category).
- **BookCopy:** One record per physical copy; linked to a BookTitle. A title can have many copies (e.g. 3 copies of "Clean Code").

### 3.2 Copy status

| Status | Meaning |
|--------|---------|
| `AVAILABLE` | On shelf, can be borrowed. |
| `BORROWED` | Checked out; linked to an active Loan. |
| `RESERVED` | On hold for a member (optional). |
| `MAINTENANCE` | Damaged or withdrawn; not loanable. |

### 3.3 Borrowable copy selection

- When a member borrows “a book” (by title or ISBN), system picks any **AVAILABLE** copy of that title (e.g. first by copyId).
- If none available, can show “all copies borrowed” or offer **reservation** (hold queue).

### 3.4 Optional: reservations

- Member can place a hold on a title; when a copy is returned, first member in queue is notified and copy may be held for N days.
- Copy status can become RESERVED for that member until pickup or timeout.

---

## 4. Members

### 4.1 Member lifecycle

- **Register:** Create Member (name, email, membership type) → status ACTIVE.
- **Borrow:** Must be ACTIVE and under `maxBorrowLimit`; optional: block if unpaid fines above threshold.
- **Suspend:** status SUSPENDED (e.g. too many overdues or policy violation) → cannot borrow until cleared.
- **Expire:** status EXPIRED when membership lapses; renew to ACTIVE.

### 4.2 Membership types (example)

| Type | Max borrow | Loan period | Renewals |
|------|------------|-------------|----------|
| STANDARD | 5 | 14 days | 2 |
| PREMIUM | 10 | 21 days | 3 |

### 4.3 Borrow eligibility

Before creating a Loan, check:

1. `member.status === ACTIVE`
2. `activeLoans(member).length < member.maxBorrowLimit`
3. Optional: `totalUnpaidFines(member) <= maxAllowed` or must pay first.

---

## 5. Borrowing

### 5.1 Loan lifecycle

1. **Checkout**  
   - Member requests a book (by title/ISBN or copyId).  
   - Find an AVAILABLE copy of that title (or use specified copy).  
   - Validate member eligibility.  
   - Create **Loan** (memberId, copyId, borrowedAt, dueDate = borrowedAt + loanPeriod, status ACTIVE).  
   - Set copy status BORROWED, copy.currentLoanId = loanId.

2. **During loan**  
   - Loan is ACTIVE; dueDate drives overdue logic.  
   - Optional: nightly job sets status to OVERDUE when `now > dueDate` and not returned.

3. **Return**  
   - Member returns copy (scan copyId or loanId).  
   - Load Loan → set returnedAt, status RETURNED.  
   - Set copy status AVAILABLE, copy.currentLoanId = null.  
   - If returned after dueDate → **Fine** creation (see Fines).

### 5.2 Renewal

- Member requests renewal before dueDate (and within renewal policy).
- If allowed: `dueDate = dueDate + loanPeriod`, increment `renewalCount`.
- Optional: no renewal if someone has reserved this copy.

### 5.3 Loan data

- `loanId`, `memberId`, `copyId`
- `borrowedAt`, `dueDate`, `returnedAt`
- `status`: ACTIVE, RETURNED, OVERDUE
- `renewalCount` (for enforcing max renewals)

### 5.4 Edge cases

- **Return wrong branch (multi-branch):** Accept return, mark returned; copy may need transfer.
- **Lost book:** Mark copy MAINTENANCE or LOST; create Fine (reason LOST) for replacement cost; close Loan when fine paid or waived.

---

## 6. Fines

### 6.1 When fines are created

- **OVERDUE:** When a loan is returned after dueDate (or calculated at return time).  
  `overdueDays = max(0, returnDate - dueDate)` (in days).  
  `amount = overdueDays * dailyRate` (optional: cap at maxFine).
- **DAMAGED:** Staff assesses damage at return; create Fine with reason DAMAGED and set amount.
- **LOST:** Copy not returned; Fine = replacement cost (or fixed amount); copy status LOST/MAINTENANCE.

### 6.2 Fine calculation (overdue)

- Example: $1/day, max $20 per loan.  
  Returned 7 days late → 7 × 1 = $7.  
  Returned 25 days late → min(25, 20) = $20.

### 6.3 Fine status

- **PENDING:** Not yet paid.
- **PAID:** Member paid; paidAt set. Optional: block new borrows until fines paid.
- **WAIVED:** Staff waives (e.g. first-time courtesy); amount can stay for audit.

### 6.4 Payment

- At return: calculate overdue fine (if any) + any damage → create Fine(s) → member pays (cash/card) → mark PAID.
- Or: member can pay outstanding fines separately (e.g. at kiosk or online) before next borrow.

### 6.5 Optional

- Grace period: e.g. first 1–2 days overdue no fine.
- Per-member or per-loan cap; different daily rate by membership type.

---

## 7. Class Diagram (Summary)

| Component | Responsibility |
|-----------|----------------|
| **Library** | Holds catalog, copies, members; delegates to services. |
| **BookTitle** | Catalog entry; metadata; list of copy IDs. |
| **BookCopy** | Physical copy; status; current loan reference. |
| **Member** | Identity, membership type, status, borrow limit. |
| **Loan** | Links member + copy + dates; checkout/return/renewal. |
| **Fine** | Links to loan/member; amount, reason, status. |
| **CatalogService** | Search titles; get available copies by title. |
| **BorrowService** | Checkout (create loan, update copy), return (close loan, update copy), renew. |
| **FineService** | Calculate overdue fine; create fine (overdue/damaged/lost); record payment/waive. |

---

## 8. Key Flows

### Checkout flow

1. Member requests book (title/ISBN or copyId).
2. **CatalogService** (or BorrowService) finds an AVAILABLE copy of that title.
3. **BorrowService** checks member eligibility (ACTIVE, under limit, optional: no block due to fines).
4. Create **Loan** (borrowedAt, dueDate = borrowedAt + loanPeriod); set copy BORROWED and currentLoanId.
5. Return loan details (due date, copy id) to member.

### Return flow

1. Member returns copy (scan copyId or present loanId).
2. **BorrowService** loads Loan, sets returnedAt, status RETURNED; set copy AVAILABLE, currentLoanId = null.
3. If returnedAt > dueDate: **FineService** computes overdue amount, creates **Fine** (OVERDUE, PENDING).
4. Optional: collect payment → mark Fine PAID; or leave PENDING for later payment.

### Fine payment flow

1. Member (or staff) requests pay fines (by memberId).
2. **FineService** lists PENDING fines for member; total amount.
3. Process payment (mock or real); on success set Fine(s) status PAID, paidAt = now.

---

## 9. Extension Points

- **Reservations / hold queue:** Reserve a title when no copy available; notify when copy returned; hold copy for N days.
- **Multi-branch:** Copy belongs to a branch; return at any branch; transfer copies between branches.
- **E-books / digital:** “Copy” as license; concurrent checkout limit per title; no physical return, auto-expiry.
- **Membership tiers:** Different loan periods, limits, and fine rates per MembershipType.
- **Reporting:** Popular titles, overdue reports, fine revenue, member activity.

---

## 10. Testing Focus

- **Books:** Correct copy assignment (only AVAILABLE); no double assignment; copy status in sync with active loans.
- **Members:** Cannot checkout when SUSPENDED/EXPIRED or over limit; unpaid fine block (if implemented).
- **Borrowing:** Due date and renewal count correct; return clears copy and loan; overdue detection.
- **Fines:** Overdue calculation (boundaries: on-time, 1 day, many days, cap); PAY/WAIVE updates status; idempotent payment.
- **Concurrency:** Two checkouts for same copy don’t both succeed (atomic copy assignment).

This design gives a clear model for **books** (catalog + copies), **members** (status and limits), **borrowing** (loans, checkout/return/renewal), and **fines** (overdue/damaged/lost, payment, waive), with room to add reservations, multi-branch, and digital lending.
