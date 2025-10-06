// function isBalancedBrackets(str) {
//     const stack = [];
//     const openingBrackets = ['(', '[', '{'];
//     const closingBrackets = [')', ']', '}'];

//     for (let i = 0; i < str.length; i++) {
//         if (openingBrackets.includes(str[i])) {
//             stack.push(str[i]);
//         }
//         if (closingBrackets.includes(str[i])) {
//             if (stack.length === 0) {
//                 return false;
//             }
//             const lastOpeningBracket = stack.pop();
//             if (lastOpeningBracket !== str[i]) {
//                 return false;
//             }
//         }
//     }
//     return stack.length === 0;
// }

function isBalancedBrackets(str) {
  const stack = [];
  const mapData = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (let char of str) {
    if (mapData[char]) {
      if (stack.pop() !== mapData[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}
console.log(isBalancedBrackets("{[()]}")); // true
console.log(isBalancedBrackets("{[(])}")); // false
console.log(isBalancedBrackets("{{[[(())]]}}")); // true
console.log(isBalancedBrackets("{[(])}")); // false
