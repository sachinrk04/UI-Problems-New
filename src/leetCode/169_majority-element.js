// Given an array nums of size n, return the majority element.

// The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that
// the majority element always exists in the array.

// Example 1:
// Input: nums = [3,2,3]
// Output: 3

// Example 2:
// Input: nums = [2,2,1,1,1,2,2]
// Output: 2
// ---------------------------------------------------------
// ---------------------------------------------------------
// Algorithm Steps
// ---------------------------------------------------------
//      1. Initialize:
//          count = 0
//          candidate = null

//      2. Traverse the array:
//          If count == 0, set candidate = nums[i]
//          If nums[i] == candidate, increment count
//          Else, decrement count

//      3. After traversal, candidate is the majority element.
// ---------------------------------------------------------
// ---------------------------------------------------------
function majorityElement(nums) {
  let n = nums.length;

  let count = 1;
  let result = nums[0];

  for (let i = 1; i < n; i++) {
    if (count === 0) {
      result = nums[i];
    }
    count += nums[i] === result ? 1 : -1;
  }

  return result;
}
// ---------------------------------------------------------
// Example
// const nums = [3, 2, 3];
// ---------------------------------------------------------
const nums = [2, 2, 1, 1, 1, 2, 2];
// ---------------------------------------------------------
console.log("majorityElement--->", majorityElement(nums));

// ---------------------------------------------------------
// ---------------------------------------------------------
// Dry Run (Example)
// ---------------------------------------------------------
//      nums = [2,2,1,1,1,2,2]
//
//      | i | nums[i] | candidate | count |
//      | - | ------- | --------- | ----- |
//      | 0 | 2       | 2         | 1     |
//      | 1 | 2       | 2         | 2     |
//      | 2 | 1       | 2         | 1     |
//      | 3 | 1       | 2         | 0     |
//      | 4 | 1       | 1         | 1     |
//      | 5 | 2       | 1         | 0     |
//      | 6 | 2       | 2         | 1     |

// ---------------------------------------------------------
// ---------------------------------------------------------
// Complexity
// ---------------------------------------------------------
// Time	    O(n)
// Space	O(1)

// ---------------------------------------------------------
// ---------------------------------------------------------
