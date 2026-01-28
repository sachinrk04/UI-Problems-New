// Implement a function findIndex(array, predicate, [fromIndex=0]) that takes an array of values, a function 
// predicate, and an optional fromIndex number argument, and returns the index of the first element in the array 
// that satisfies the provided testing function predicate.

// findIndex(array, predicate, [(fromIndex = 0)]);

// Arguments
//      1. array (Array): The array to inspect.
//      2. predicate (Function): The function invoked per iteration.
//      3. [fromIndex=0] (number): The index to search from.

// Predicate signature: The predicate function is invoked with three arguments: (value, index, array).
//      1. value: The current element being iterated.
//      2. index: The index of the current element.
//      3. array: The original input array.

// Returns
// (number): Returns the index of the found element, else -1.


// Edge cases

// Your function should handle negative and out of bound indices, as demonstrated in the examples below.
//      1. Negative: negative integers count back from the last item in the array. -1 means the last element in 
//         the array, -2 means the second last element, and so on.
//      2. Out of bound: if index < -(array.length), start searching from index 0. If index >= array.length, no 
//         search will take place and you should return -1.

function findIndex(array, predicate, fromIndex = 0) {
  if (!Array.isArray(array) || typeof predicate !== "function") return -1;

  const length = array.length;

  if (length === 0) return -1;

  let index = fromIndex;

  if (index < 0) {
    index = length + index;
    if (index < 0) index = 0;
  }

  if (index >= length) return -1;

  for (let i = index; i < length; i++) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }

  return -1;

}

// Example
const arr = [1, 2, 3, 4, 5];

// Search for the first value in the array that is greater than 3.
console.log("findIndex--->", findIndex(arr, (num) => num > 3)); // => 3

// Start searching from index 4 (inclusive).
console.log("findIndex--->", findIndex(arr, (num) => num > 3, 4)); // => 4

// No such element exists.
console.log("findIndex--->", findIndex(arr, (num) => num > 10, 3)); // => -1

// Start searching from index 2 (inclusive).
console.log("findIndex--->", findIndex(arr, (num) => num > 2, -3)); // => 2

console.log("findIndex--->", findIndex(arr, (num) => num % 2 === 0, -3)); // => 3

// Start from 0 if fromIndex < -(array.length)
console.log("findIndex--->", findIndex(arr, (num) => num > 2, -10)); // => 2

// Search rightwards from index that's already out of bounds,
// which will always result in -1.
console.log("findIndex--->", findIndex(arr, (num) => num > 2, 10)); // => -1

