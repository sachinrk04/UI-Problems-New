// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

// Example 1:
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

// Example 2:
// Input: nums = [3,2,4], target = 6
// Output: [1,2]

// Example 3:
// Input: nums = [3,3], target = 6
// Output: [0,1]

// ---------------------------------------------------------
// ---------------------------------------------------------
// Algorithm Steps
// ---------------------------------------------------------
//      1. Create an empty map seen
//      2. Loop through the array
//      3. For each number:
//          i.   Compute complement = target - nums[i]
//          ii.  If complement exists in map → return indices
//          iii. Otherwise, store current number with its index

// ---------------------------------------------------------
// ---------------------------------------------------------

// ---------------------------------------------------------
// Hash Map (One-Pass Lookup) Approach
// ---------------------------------------------------------
function twoSum_I(nums, target) {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];

    if (map.has(diff)) {
      return [map.get(diff), i];
    }

    map.set(nums[i], i);
  }

  return [];
}

// ---------------------------------------------------------
const nums = [2, 7, 11, 15],
  target = 9;
// ---------------------------------------------------------
// const nums = [3, 2, 4], target = 6;
// ---------------------------------------------------------
// const nums = [3, 3], target = 6;

const result = twoSum_I(nums, target);
console.log("Result--->", result);

// ---------------------------------------------------------
// ---------------------------------------------------------

// ---------------------------------------------------------
// ---------------------------------------------------------

// ---------------------------------------------------------
// ---------------------------------------------------------
// Time & Space Complexity
// ---------------------------------------------------------
// Time	    O(n)
// Space	O(n)

// ---------------------------------------------------------
// ---------------------------------------------------------
// Brute Force (For Comparison)
// ---------------------------------------------------------

function bruteForce_twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}

const resultBruteForce = bruteForce_twoSum(nums, target);
console.log("resultBruteForce--->", result);
// ---------------------------------------------------------

// Time: O(n²) → ❌ TLE for large inputs

// ---------------------------------------------------------
// ---------------------------------------------------------

// ---------------------------------------------------------
// ---------------------------------------------------------

// ---------------------------------------------------------
// ---------------------------------------------------------
// Two Pointer Approach (Sorted Array)
// ---------------------------------------------------------

function twoPointer_twoSum(nums, target) {
  const arr = nums.map((value, index) => ({
    value,
    index,
  }));
  arr.sort((a, b) => a.value - b.value);

  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const sum = arr[left].value + arr[right].value;

    if (sum === target) {
      return [arr[left].index, arr[right].index];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}

const Result_Two_Pointer = twoPointer_twoSum(nums, target);
console.log("Result_Two_Pointer--->", Result_Two_Pointer);
