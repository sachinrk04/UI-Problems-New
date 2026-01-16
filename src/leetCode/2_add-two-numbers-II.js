// You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse
//  order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Example 1:
// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.

// Example 2:
// Input: l1 = [0], l2 = [0]
// Output: [0]

// Example 3:
// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8, 9, 9, 9, 0, 0, 0, 1]

// ---------------------------------------------------------
// ---------------------------------------------------------
// Approach: Two-Pointer Digit-by-Digit Addition (Array Simulation)
// ---------------------------------------------------------

// Treat both arrays as reversed numbers (least significant digit first).
// Use two pointers i and j to traverse l1 and l2 simultaneously.
// Maintain a carry to handle sums ≥ 10.
// In each iteration:
//    Read current digits from both arrays (use 0 if index is out of bounds).
//    Add digits + carry.
//    Push sum % 10 to the result array.
//    Update carry = Math.floor(sum / 10).
// Continue until both arrays are fully processed and no carry remains.

// ---------------------------------------------------------

// This simulates manual addition and works correctly for arrays representing numbers in reverse order.

// ---------------------------------------------------------
// ---------------------------------------------------------

function addTwoNumbers(l1, l2) {
  let i = 0,
    j = 0,
    carry = 0;
  let result = [];

  while (i < l1.length || j < l2.length || carry) {
    const v1 = i < l1.length ? l1[i] : 0;
    const v2 = j < l2.length ? l2[j] : 0;

    const sum = v1 + v2 + carry;
    carry = Math.floor(sum / 10);

    result.push(sum % 10);

    i++;
    j++;
  }

  return result;
}

const l1 = [2, 4, 3],
  l2 = [5, 6, 4];

const result = addTwoNumbers(l1, l2);
console.log("Result--->", result);

// ---------------------------------------------------------
// ---------------------------------------------------------

// ⏱ Time Complexity: O(max(n, m))
// 📦 Space Complexity: O(max(n, m))

// ---------------------------------------------------------
// ---------------------------------------------------------
