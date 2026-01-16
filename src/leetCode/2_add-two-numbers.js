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

function arrayToList(arr) {
  let node = new ListNode(0);
  let current = node;

  for (let val of arr) {
    current.next = new ListNode(val);
    current = current.next;
  }

  return node.next;
}

function listToArray(head) {
  let result = [];
  let current = head;

  while (current) {
    result.push(current.value);
    current = current.next;
  }

  return result;
}

function ListNode(value, next = null) {
  this.value = value;
  this.next = next;
}

function addTwoNumbers(l1, l2) {
  let node = new ListNode(0);
  let current = node;
  let carry = 0;

  while (l1 || l2 || carry) {
    const value1 = l1 ? l1.value : 0;
    const value2 = l2 ? l2.value : 0;

    const sum = value1 + value2 + carry;
    carry = Math.floor(sum / 10);

    current.next = new ListNode(sum % 10);
    current = current.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return node.next;
}

const l1 = [9, 9, 9, 9, 9, 9, 9],
  l2 = [9, 9, 9, 9];

const result = addTwoNumbers(arrayToList(l1), arrayToList(l2));
console.log("Result--->", listToArray(result));
