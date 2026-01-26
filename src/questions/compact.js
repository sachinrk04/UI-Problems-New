// Implement a function compact(array) that creates an array with all falsey values removed.
// The values false, null, 0, '', undefined, and NaN are falsey (you should know this by heart!).

function compact(array) {
  if (!Array.isArray(array)) return array;
  if (array.length === 0) return [];

  let result = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      result.push(array[i]);
    }
  }

  return result;
}

// Example

console.log("compact--->", compact([0, 1, false, 2, "", 3, null])); // => [1, 2, 3]
console.log("compact--->", compact(["hello", 123, [], {}])); // => ['hello', 123, [], {}]
