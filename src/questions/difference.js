// Implement a function difference(array, values) that creates an array of array values not
//  included in the other given arrays using SameValueZero for equality comparisons. The order
// and references of result values are determined by the first array.

// Arguments
//      1. array (Array): The array to inspect.
//      2. values (Array): The values to exclude.
// Returns
//      (Array): Returns the new array of filtered values.

function difference(array, values) {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    if (i in array && !values.includes(array[i])) {
      result.push(array[i]);
    }
  }

  return result;
}

console.log("difference--->", difference([1, 2, 3], [2, 3])); // => [1]
console.log("difference--->", difference([1, 2, 3, 4], [2, 3, 1])); // => [4]
console.log("difference--->", difference([1, 2, 3], [2, 3, 1, 4])); // => []
console.log("difference--->", difference([1, , 3], [1])); // => [3] (case of a sparse array)
console.log("difference--->", difference([1, 2, 3], [])); // => [1, 2, 3]
