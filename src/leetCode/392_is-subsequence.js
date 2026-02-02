// Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

// A subsequence of a string is a new string that is formed from the original string by
// deleting some (can be none) of the characters without disturbing the relative positions of
// the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).

// Example 1:
// Input: s = "abc", t = "ahbgdc"
// Output: true

// Example 2:
// Input: s = "axc", t = "ahbgdc"
// Output: false

// ---------------------------------------------------------
// ---------------------------------------------------------
// Approach Name
// ---------------------------------------------------------
// Two Pointer Technique

// ---------------------------------------------------------
// ---------------------------------------------------------
// Algorithm Steps
// ---------------------------------------------------------
//  1. Initialize two pointers i = 0 for string s and j = 0 for string t.
//  2. While both pointers are within bounds:
//          If s[i] === t[j], move i forward.
//          Always move j forward.
//  3. After the loop, if i === s.length, all characters of s were found in order → return true.
//  4. Otherwise, return false.

// ---------------------------------------------------------
// ---------------------------------------------------------
function isSubsequence(s, t) {
  let left = 0,
    right = 0;

  while (left < s.length && right < t.length) {
    if (s[left] === t[right]) left++;
    right++;
  }

  return left === s.length;
}
// ---------------------------------------------------------
// Example
const s = "abc",
  t = "ahbgdc";
// ---------------------------------------------------------
// const s = "axc", t = "ahbgdc";
// ---------------------------------------------------------
// // console.time("run");
// // console.log("isSubsequence--->", isSubsequence(s, t));
// // console.timeEnd("run");
// console.log(performance.memory.usedJSHeapSize / 1024 / 1024, "MB");

const before = performance.memory.usedJSHeapSize;
console.log("isSubsequence--->", isSubsequence(s, t));
const after = performance.memory.usedJSHeapSize;
console.log((after - before) / 1024, "KB difference");
// ---------------------------------------------------------
// ---------------------------------------------------------
// Dry Run (Example)
// ---------------------------------------------------------

// s = "abc";
// t = "ahbgdc";

// | i (s) | j (t) | s[i] | t[j] | Match | Action   |
// | ----- | ----- | ---- | ---- | ----- | -------- |
// | 0     | 0     | a    | a    | ✔     | i++, j++ |
// | 1     | 1     | b    | h    | ✘     | j++      |
// | 1     | 2     | b    | b    | ✔     | i++, j++ |
// | 2     | 3     | c    | g    | ✘     | j++      |
// | 2     | 4     | c    | d    | ✘     | j++      |
// | 2     | 5     | c    | c    | ✔     | i++, j++ |

// Now i === s.length → true

// ---------------------------------------------------------
// ---------------------------------------------------------
// Complexity
// ---------------------------------------------------------
// Time	    O(n)
// Space	O(1)

// ---------------------------------------------------------
// ---------------------------------------------------------
