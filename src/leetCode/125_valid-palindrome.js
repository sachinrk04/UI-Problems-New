// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters
// and removing all non-alphanumeric characters, it reads the same forward and backward.
// Alphanumeric characters include letters and numbers.

// Given a string s, return true if it is a palindrome, or false otherwise.

// Example 1:
// Input: s = "A man, a plan, a canal: Panama"
// Output: true
// Explanation: "amanaplanacanalpanama" is a palindrome.

// Example 2:
// Input: s = "race a car"
// Output: false
// Explanation: "raceacar" is not a palindrome.

// Example 3:
// Input: s = " "
// Output: true
// Explanation: s is an empty string "" after removing non-alphanumeric characters.
// Since an empty string reads the same forward and backward, it is a palindrome.
// ---------------------------------------------------------
// ---------------------------------------------------------
// Approach Name
// ---------------------------------------------------------
// Two Pointer Technique with Character Filtering
// ---------------------------------------------------------
// ---------------------------------------------------------
// Algorithm Steps
// ---------------------------------------------------------
//  1. Initialize two pointers:
//      left = 0
//      right = s.length - 1
//
//  2. While left < right:
//      Move left forward until it points to an alphanumeric character.
//      Move right backward until it points to an alphanumeric character.
//      Compare s[left].toLowerCase() and s[right].toLowerCase()
//          If they are not equal → return false
//      Move both pointers inward:
//          left++, right--
//
//  3. If the loop finishes without mismatch → return true
// ---------------------------------------------------------
// ---------------------------------------------------------
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  const isAlpha = (ch) => {
    return (
      (ch >= "a" && ch <= "z") ||
      (ch >= "A" && ch <= "Z") ||
      (ch >= "0" && ch <= "9")
    );
  };

  while (left < right) {
    while (left < right && !isAlpha(s[left])) left++;
    while (left < right && !isAlpha(s[right])) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}
// ---------------------------------------------------------
// Example
const s = "A man, a plan, a canal: Panama";
// ---------------------------------------------------------
// const s = "race a car"
// ---------------------------------------------------------
// const Input: s = " "
// ---------------------------------------------------------
console.time("run");
console.log("isPalindrome--->", isPalindrome(s));
console.timeEnd("run");
console.log(performance.memory.usedJSHeapSize / 1024 / 1024, "MB");

// ---------------------------------------------------------
// Dry Run (Example)
// ---------------------------------------------------------
//      s = "A man, a plan, a canal: Panama"
//
//      | Left | Right | Char L | Char R | Compare | Result          |
//      | ---- | ----- | ------ | ------ | ------- | --------------- |
//      | 0    | 29    | A      | a      | a == a  | OK              |
//      | 2    | 27    | m      | m      | m == m  | OK              |
//      | 4    | 25    | a      | a      | a == a  | OK              |
//      | 6    | 23    | n      | n      | n == n  | OK              |
//      | ...  | ...   | ...    | ...    | ...     | ...             |
//      | End  | End   |        |        |         | Return **true** |
//
// ---------------------------------------------------------
// ---------------------------------------------------------
// Complexity
// ---------------------------------------------------------
// Time	    O(n): Each character is visited at most once.
// Space	O(1): No extra array/string is used.
//
// ---------------------------------------------------------
// ---------------------------------------------------------
