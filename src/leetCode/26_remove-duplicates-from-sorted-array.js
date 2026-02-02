// Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place
// such that each unique element appears only once. The relative order of the elements should
// be kept the same.

// Consider the number of unique elements in nums to be k​​​​​​​​​​​​​​. After removing duplicates, return the
// number of unique elements k.

// The first k elements of nums should contain the unique numbers in sorted order. The remaining
// elements beyond index k - 1 can be ignored.

// Custom Judge:

// The judge will test your solution with the following code:

//      int[] nums = [...]; // Input array
//      int[] expectedNums = [...]; // The expected answer with correct length

//      int k = removeDuplicates(nums); // Calls your implementation

//      assert k == expectedNums.length;
//      for (int i = 0; i < k; i++) {
//          assert nums[i] == expectedNums[i];
//      }
// If all assertions pass, then your solution will be accepted.

// Example 1:
// Input: nums = [1,1,2]
// Output: 2, nums = [1,2,_]
// Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).

// Example 2:
// Input: nums = [0,0,1,1,1,2,2,3,3,4]
// Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
// Explanation: Your function should return k = 5, with the first five elements of nums being 0, 1, 2, 3, and 4 respectively.
// It does not matter what you leave beyond the returned k (hence they are underscores).

// ---------------------------------------------------------
// ---------------------------------------------------------
// Approach (Two Pointers)

//      Use one pointer i for the last unique element index
//      Scan with another pointer j from left to right
//      When nums[j] is different from nums[i], move it next to i

// ---------------------------------------------------------
// ---------------------------------------------------------
// Time & Space Complexity
// ---------------------------------------------------------
// Time	    O(n)
// Space	O(1)

// ---------------------------------------------------------
// ---------------------------------------------------------
function removeDuplicates(nums) {
  let n = nums.length;
  if (n < 2) return n;

  let i = 0;

  for (let j = 1; j < n; j++) {
    if (nums[j] != nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }

  return i + 1;
}

// ---------------------------------------------------------
// ---------------------------------------------------------
const nums = [1, 1, 2];
// ---------------------------------------------------------
// const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
// ---------------------------------------------------------
console.log("removeDuplicates--->", removeDuplicates(nums));
// ---------------------------------------------------------
// ---------------------------------------------------------
// nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
// Steps
// ---------------------------------------------------------
// j	nums[j]	nums[i]	    Action	    Array
// 1	    0	    0	    same	    [0,0,1,1,1,2,2,3,3,4]
// 2	    1	    0	    new → i=1	[0,1,1,1,1,2,2,3,3,4]
// 3	    1	    1	    same	    ...
// 5	    2	    1	    new → i=2	[0,1,2,1,1,2,2,3,3,4]
// 7	    3	    2	    new → i=3	[0,1,2,3,1,2,2,3,3,4]
// 9	    4	    3	    new → i=4	[0,1,2,3,4,...]

// ---------------------------------------------------------
// ---------------------------------------------------------
