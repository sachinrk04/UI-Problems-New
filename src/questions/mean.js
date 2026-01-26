// Implement a function mean(array) that returns the mean (also known as average) of
// the values inside array, which is an array of numbers.

function mean(array) {
  return array.reduce((a, b) => a + b, 0) / array.length;
}

// Example

console.log("mean--->", mean([4, 2, 8, 6])); // => 5
console.log("mean--->", mean([1, 2, 3, 4])); // => 2.5
console.log("mean--->", mean([1, 2, 2])); // => 1.6666666666666667
console.log("mean--->", mean([])); // => NaN
