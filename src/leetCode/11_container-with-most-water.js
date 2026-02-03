// You are given an integer array height of length n. There are n vertical lines drawn such that
// the two endpoints of the ith line are (i, 0) and (i, height[i]).

// Find two lines that together with the x-axis form a container, such that the container
// contains the most water.

// Return the maximum amount of water a container can store.

// Notice that you may not slant the container.

// Example 1:
// Input: height = [1,8,6,2,5,4,8,3,7]
// Output: 49
// Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7].
// In this case, the max area of water (blue section) the container can contain is 49.

// Example 2:
// Input: height = [1, 1];
// Output: 1;
//
// ---------------------------------------------------------
// ---------------------------------------------------------
// Approach Name
// ---------------------------------------------------------
// Two Pointers (Greedy Shrinking Window)

// ---------------------------------------------------------
// ---------------------------------------------------------
// Algorithm Steps
// ---------------------------------------------------------
//  1. Initialize two pointers:
//          left = 0
//          right = n - 1
//  2. Initialize maxArea = 0.
//  3. While left < right:
//          Calculate the width:
//              width = right - left
//          Calculate the height of container:
//              minHeight = Math.min(height[left], height[right])
//          Compute area:
//              area = width * minHeight
//          Update maxArea if area is greater.
//  4. Move the pointer pointing to the shorter line:
//          If height[left] < height[right], do left++
//          Else, do right--
//  5. Continue until left >= right.
//  6. Return maxArea.
// ---------------------------------------------------------
// ---------------------------------------------------------
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const area = width * minHeight;

    if (area > maxArea) maxArea = area;

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}
// ---------------------------------------------------------
// Example
const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
// ---------------------------------------------------------
// const height = [1, 1];
// ---------------------------------------------------------
console.log("maxArea--->", maxArea(height));
// ---------------------------------------------------------
// ---------------------------------------------------------
// Dry Run (Example)
// ---------------------------------------------------------
// Input: [1,8,6,2,5,4,8,3,7]

// | Left | Right | h[left] | h[right] | Width | MinHeight | Area | MaxArea |
// | ---- | ----- | ------- | -------- | ----- | --------- | ---- | ------- |
// | 0    | 8     | 1       | 7        | 8     | 1         | 8    | 8       |
// | 1    | 8     | 8       | 7        | 7     | 7         | 49   | 49      |
// | 1    | 7     | 8       | 3        | 6     | 3         | 18   | 49      |
// | 1    | 6     | 8       | 8        | 5     | 8         | 40   | 49      |
// | 1    | 5     | 8       | 4        | 4     | 4         | 16   | 49      |
// | 1    | 4     | 8       | 5        | 3     | 5         | 15   | 49      |
// | 1    | 3     | 8       | 2        | 2     | 2         | 4    | 49      |
// | 1    | 2     | 8       | 6        | 1     | 6         | 6    | 49      |

// Stop when left == right.

// ---------------------------------------------------------
// ---------------------------------------------------------
// Complexity
// ---------------------------------------------------------
// Time	    O(n)
// Space	O(1)

// ---------------------------------------------------------
// ---------------------------------------------------------
