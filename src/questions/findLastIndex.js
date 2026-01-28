// Implement a function findLastIndex(array, predicate, [fromIndex=array.length-1]) that takes an array of values,
// a function predicate, and an optional fromIndex number argument. findLastIndex iterates over elements of the
// array from right to left.

// The function returns the index of the first element that satisfies the predicate when iterating backwards from fromIndex.

// Arguments
//      1. array (Array): The array to inspect.
//      2. predicate (Function): The function invoked per iteration.
//      3. [fromIndex=array.length-1] (number): The index to start searching from (towards the left).

// Predicate signature: The predicate function is invoked with three arguments: (value, index, array).
//      1. value: The current element being iterated.
//      2. index: The index of the current element.
//      3. array: The original input array.

// Returns
// (number): Returns the index of the found element, else -1.

// Edge cases
// Your function should handle negative and out-of-bound fromIndex values.
//      1. Negative fromIndex: negative integers count back from the last item in the array. -1 means the last element
//         in the array, -2 means the second last element, and so on.
//      2. Negative out of Bounds: if the resolved index from a negative fromIndex is less than 0 (e.g., fromIndex
//         is -10 for an array of length 5), the search starts from index 0.
//      3. Positive and out of Bounds: If fromIndex >= array.length, the search starts from the last index (array.length - 1).

function findLastIndex(array, predicate, fromIndex = array.length - 1) {
  if (!Array.isArray(array) || typeof predicate !== "function") return -1;

  const length = array.length;

  if (length === 0) return -1;

  let index = fromIndex;

  if (index >= length) index = length - 1;

  if (index < 0) {
    index = length + index;
    if (index < 0) index = 0;
  }

  for (let i = index; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }

  return -1;
}

// Example
const arr = [5, 4, 3, 2, 1]; // Indices: 0, 1, 2, 3, 4

// Search for the element > 3, starting from the end (index 4).
console.log(
  "findLastIndex--->",
  findLastIndex(arr, (num) => num > 3)
); // => 1

// Start searching backwards from index 3.
// Check index 3: 2 > 1 is true. Stop.
console.log(
  "findLastIndex--->",
  findLastIndex(arr, (num) => num > 1, 3)
); // => 3

// Start searching backwards from index 3.
// Check index 3: 2 < 1 is false.
// Check index 2: 3 < 1 is false.
// Check index 1: 4 < 1 is false.
// Check index 0: 5 < 1 is false. Reached start and no element found.
console.log(
  "findLastIndex--->",
  findLastIndex(arr, (num) => num < 1, 3)
); // => -1

// fromIndex = -3 resolves to index 2.
// Check index 2: 3 > 2 is true. Stop.
console.log(
  "findLastIndex--->",
  findLastIndex(arr, (num) => num > 2, -3)
); // => 2

// fromIndex = -3 resolves to index 2.
// Check index 2: 3 % 2 === 0 is false.
// Check index 1: 4 % 2 === 0 is true. Stop.
console.log(
  "findLastIndex--->",
  findLastIndex(arr, (num) => num % 2 === 0, -3)
); // => 1

// Start from the last index if fromIndex >= array.length.
console.log(
  "findLastIndex--->",
  findLastIndex(arr, (num) => num > 0, 10)
); // => 4

// Negative and out of bounds, start searching from the first item in the array.
// Check index 0: 5 > 2 is true
console.log(
  "findLastIndex--->",
  findLastIndex(arr, (num) => num > 0, -10)
); // => 0
