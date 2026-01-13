// Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

// A subarray is a contiguous non-empty sequence of elements within an array.


// Example 1:
// Input: nums = [1,1,1], k = 2
// Output: 2


// Example 2:
// Input: nums = [1,2,3], k = 3
// Output: 2


function subarraySum(nums, k) {
    let map = new Map();
    let count = 0;
    let sum  = 0;

    map.set(0, 1);

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];

        if (map.has(sum - k)) {
            count += map.get(sum - k);
        }

        map.set(sum, (map.get(sum) || 0) + 1);
    }

    return count;
}
// ---------------------------------------------------------
// Core Idea (High Level)
// ---------------------------------------------------------

// We use:
//  . Prefix Sum
//  . Frequency Map (HashMap)

// The key identity is:
// sum(i → j) = prefixSum[j] - prefixSum[i - 1]

// So if:
// prefixSum[j] - prefixSum[i - 1] = k

// Then:
// prefixSum[i - 1] = prefixSum[j] - k

// 👉 That means:
// For every index j, we just need to know how many times
// prefixSum[j] - k has occurred before.

// ---------------------------------------------------------
// 🧪 Full Dry Run Example
// ---------------------------------------------------------

// nums = [1, 2, 3]
// k = 3

// | i | nums[i] | sum | sum - k | map before    | count |
// | - | ------- | --- | ------- | ------------- | ----- |
// | - | -       | 0   | -       | {0:1}         | 0     |
// | 0 | 1       | 1   | -2      | {0:1}         | 0     |
// | 1 | 2       | 3   | 0       | {0:1,1:1}     | 1     |
// | 2 | 3       | 6   | 3       | {0:1,1:1,3:1} | 2     |
// ---------------------------------------------------------
// ---------------------------------------------------------


// ---------------------------------------------------------
// ---------------------------------------------------------


// ---------------------------------------------------------
// ---------------------------------------------------------
// Brute Force (For Comparison)
// ---------------------------------------------------------

function bruteForce_SubarraySum(nums, k) {
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j];
      if (sum === k) count++;
    }
  }

  return count;
};

// ---------------------------------------------------------

// Time: O(n²) → ❌ TLE for large inputs

// ---------------------------------------------------------
// ---------------------------------------------------------