// Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order,
// find two numbers such that they add up to a specific target number. Let these two numbers
// be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.

// Return the indices of the two numbers, index1 and index2, added by one as an integer array
// [index1, index2] of length 2.

// The tests are generated such that there is exactly one solution. You may not use the same
// element twice.

// Your solution must use only constant extra space.

// Example 1:
// Input: numbers = [2,7,11,15], target = 9
// Output: [1,2]
// Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].

// Example 2:
// Input: numbers = [2,3,4], target = 6
// Output: [1,3]
// Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].

// Example 3:
// Input: numbers = [-1,0], target = -1
// Output: [1,2]
// Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].

// ---------------------------------------------------------
// ---------------------------------------------------------
// Approach Name
// ---------------------------------------------------------
// Two Pointer Technique (Optimized for Sorted Array)

// ---------------------------------------------------------
// ---------------------------------------------------------
// Algorithm Steps
// ---------------------------------------------------------
//  1. Initialize two pointers:
//      left = 0
//      right = numbers.length - 1
//  2. While left < right:
//          Compute sum = numbers[left] + numbers[right]
//          If sum === target → return [left + 1, right + 1]
//          If sum < target → move left++ (need a bigger sum)
//          If sum > target → move right-- (need a smaller sum)
//  3. Since exactly one solution exists, the loop will always return.
// ---------------------------------------------------------
// ---------------------------------------------------------
function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
}
// ---------------------------------------------------------
// Example
const numbers = [2, 7, 11, 15],
  target = 9;
// ---------------------------------------------------------
// const numbers = [2,3,4], target = 6
// ---------------------------------------------------------
// const numbers = [-1,0], target = -1
// ---------------------------------------------------------
console.log("twoSum--->", twoSum(numbers, target));
// ---------------------------------------------------------
// ---------------------------------------------------------
// Dry Run (Example)
// ---------------------------------------------------------
// numbers = [2,7,11,15], target = 9

// | left | right | sum | action        |
// | ---- | ----- | --- | ------------- |
// | 0(2) | 3(15) | 17  | sum > 9 → r-- |
// | 0(2) | 2(11) | 13  | sum > 9 → r-- |
// | 0(2) | 1(7)  | 9   | return [1,2]  |

// ---------------------------------------------------------
// ---------------------------------------------------------
// Complexity
// ---------------------------------------------------------
// Time	    O(n)
// Space	O(1)

// ---------------------------------------------------------
// ---------------------------------------------------------
