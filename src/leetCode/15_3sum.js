// Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such
// that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

// Notice that the solution set must not contain duplicate triplets.

// Example 1:
// Input: nums = [-1,0,1,2,-1,-4]
// Output: [[-1,-1,2],[-1,0,1]]
// Explanation:
// nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
// nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
// nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
// The distinct triplets are [-1,0,1] and [-1,-1,2].
// Notice that the order of the output and the order of the triplets does not matter.

// Example 2:
// Input: nums = [0,1,1]
// Output: []
// Explanation: The only possible triplet does not sum up to 0.

// Example 3:
// Input: nums = [0,0,0]
// Output: [[0,0,0]]
// Explanation: The only possible triplet sums up to 0.

// ---------------------------------------------------------
// ---------------------------------------------------------
// Approach Name
// ---------------------------------------------------------
// Sort + Two Pointers

// We sort the array and then fix one number.
// For the remaining part, we use two pointers to find pairs whose sum equals -fixed.

// ---------------------------------------------------------
// ---------------------------------------------------------
// Algorithm Steps
// ---------------------------------------------------------
//  1. Sort the array in ascending order.
//  2. Loop i from 0 to n-3.
//  3. Skip duplicate values of nums[i].
//  4. Set two pointers:
//          left = i + 1
//          right = n - 1
//  5. While left < right:
//          Compute sum = nums[i] + nums[left] + nums[right]
//          If sum === 0 → store triplet
//              Move both pointers
//              Skip duplicates
//          If sum < 0 → move left++
//          If sum > 0 → move right--
//  6. Return all unique triplets.
// ---------------------------------------------------------
// ---------------------------------------------------------
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;

        while (left < right && nums[left] === nums[left - 1]) left++;
        while (left < right && nums[right] === nums[right + 1]) right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}
// ---------------------------------------------------------
// Example
const nums = [-1, 0, 1, 2, -1, -4];
// ---------------------------------------------------------
// const nums = [0,1,1];
// ---------------------------------------------------------
// const nums = [0,0,0]
// ---------------------------------------------------------
console.log("threeSum--->", threeSum(nums));
// ---------------------------------------------------------
// ---------------------------------------------------------
// Dry Run (Example)
// ---------------------------------------------------------

// Sorted → [-4,-1,-1,0,1,2]
// | i | nums[i] | left                               | right | sum | Action          |
// | - | ------- | ---------------------------------- | ----- | --- | --------------- |
// | 0 | -4      | 1(-1)                              | 5(2)  | -3  | left++          |
// | 0 | -4      | 2(-1)                              | 5(2)  | -3  | left++          |
// | 0 | -4      | 3(0)                               | 5(2)  | -2  | left++          |
// | 0 | -4      | 4(1)                               | 5(2)  | -1  | left++          |
// | 1 | -1      | 2(-1)                              | 5(2)  | 0   | store [-1,-1,2] |
// | 1 | -1      | 3(0)                               | 4(1)  | 0   | store [-1,0,1]  |
// | 2 | -1      | skip duplicate                     |       |     |                 |
// | 3 | 0       | left=4 right=5 → sum > 0 → right-- |       |     |                 |
// Output → [[-1,-1,2],[-1,0,1]]

// ---------------------------------------------------------
// ---------------------------------------------------------
// Complexity
// ---------------------------------------------------------
// Time	    O(n²)
// Space	O(1)(ignoring output storage)

// ---------------------------------------------------------
// ---------------------------------------------------------
