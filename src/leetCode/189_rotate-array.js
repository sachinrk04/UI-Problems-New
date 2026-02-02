// Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

// Example 1:
// Input: nums = [1,2,3,4,5,6,7], k = 3
// Output: [5,6,7,1,2,3,4]
// Explanation:
// rotate 1 steps to the right: [7,1,2,3,4,5,6]
// rotate 2 steps to the right: [6,7,1,2,3,4,5]
// rotate 3 steps to the right: [5,6,7,1,2,3,4]

// Example 2:
// Input: nums = [-1,-100,3,99], k = 2
// Output: [3,99,-1,-100]
// Explanation:
// rotate 1 steps to the right: [99,-1,-100,3]
// rotate 2 steps to the right: [3,99,-1,-100]
// ---------------------------------------------------------
// ---------------------------------------------------------
// Algorithm Steps
// ---------------------------------------------------------
//  1. Let n = nums.length
//  2. Set k = k % n (to handle large k)
//  3. Reverse the entire array
//  4. Reverse the first k elements
//  5. Reverse the remaining n - k elements
// ---------------------------------------------------------
// ---------------------------------------------------------
function rotate(nums, k) {
  let n = nums.length;
  k = k % n;

  reverse(nums, 0, n - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, n - 1);
}

function reverse(arr, left, right) {
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
}
// ---------------------------------------------------------
// Example
// ---------------------------------------------------------
// const nums = [1, 2, 3, 4, 5, 6, 7],
//   k = 3;
// ---------------------------------------------------------
const nums = [-1, -100, 3, 99],
  k = 2;
// ---------------------------------------------------------
rotate(nums, k);
console.log("rotate--->", nums);

// ---------------------------------------------------------
// ---------------------------------------------------------
// Dry Run (Example)
// ---------------------------------------------------------
//      nums = [1,2,3,4,5,6,7], k = 3
//
//      | Step | Operation                   | Array State               |
//      | ---- | --------------------------- | ------------------------- |
//      | 0    | Initial                     | [1, 2, 3, 4, 5, 6, 7]     |
//      | 1    | k = k % n → 3 % 7 = 3       | [1, 2, 3, 4, 5, 6, 7]     |
//      | 2    | Reverse entire array        | [7, 6, 5, 4, 3, 2, 1]     |
//      | 3    | Reverse first k (0–2)       | [5, 6, 7, 4, 3, 2, 1]     |
//      | 4    | Reverse from k to end (3–6) | **[5, 6, 7, 1, 2, 3, 4]** |

// ---------------------------------------------------------
// ---------------------------------------------------------
// Complexity
// ---------------------------------------------------------
// Time	    O(n)
// Space	O(1)

// ---------------------------------------------------------
// ---------------------------------------------------------
