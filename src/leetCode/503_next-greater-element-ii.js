// Given a circular integer array nums (i.e., the next element of nums[nums.length - 1] is nums[0]), return the next greater number for every element in nums.

// The next greater number of a number x is the first greater number to its traversing-order next
// in the array, which means you could search circularly to find its next greater number. If it doesn't exist, return -1 for this number.

// Example 1:

// Input: nums = [1,2,1]
// Output: [2,-1,2]
// Explanation: The first 1's next greater number is 2;
// The number 2 can't find next greater number.
// The second 1's next greater number needs to search circularly, which is also 2.
// Example 2:

// Input: nums = [1,2,3,4,3]
// Output: [2,3,4,-1,4]

function nextGreterNumber(nums) {
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums.includes(nums[i] + 1)) {
      result.push(nums[i] + 1);
    } else {
      result.push(-1);
    }
  }

  return result;
}

const input1 = [1, 2, 1];
const input2 = [1, 2, 3, 4, 3];
const input3 = [5, 4, 3, 2, 1];

const output = nextGreterNumber(input3);

console.log("output--->", output);
