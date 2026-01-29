// Implement a function range([start=0], end, [step=1]) that creates an array of numbers
// (positive and/or negative) progressing from start up to, but not including, end.
// A step of -1 is used if a negative start is specified without an end or step. If end is
// not specified, it's set to start with start then set to 0.

// Arguments
//      1. start (Number): The start of the range.
//      2. end (Number): The end of the range.
//      3. step (Number): The value to increment or decrement by.

// Returns
// (Array): Returns the range of numbers.

function range(start = 0, end, step = 1) {
  // only one argument
  if (end === undefined) {
    end = start;
    start = 0;

    // special rule: negative single arg uses step -1
    if (end < 0 && step === 1) {
      step = -1;
    }
  }

  // default step
  if (step === undefined) {
    step = start < end ? 1 : -1;
  }

  // same start & end
  if (start === end) return [];

  let result = [];

  // step === 0 → repeat start
  if (step === 0) {
    if (start < end) {
      const count = end - start;
      for (let i = 0; i < count; i++) {
        result.push(start);
      }
    }
    return result;
  }

  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }

  return result;
}

// Example
console.log("range--->", range(4)); // => [0, 1, 2, 3]

console.log("range--->", range(-4)); // => [0, -1, -2, -3]

console.log("range--->", range(1, 5)); // => [1, 2, 3, 4]

console.log("range--->", range(0, 20, 5)); // => [0, 5, 10, 15]

console.log("range--->", range(0, -4, -1)); // => [0, -1, -2, -3]

console.log("range--->", range(1, 4, 0)); // => [1, 1, 1]

// The function should return an empty array if start is equal to end.
console.log("range--->", range(0)); // => []

console.log("range--->", range(1, 5, 0)); // => []
console.log("range--->", range(-4, -2, 0)); // => []
console.log("range--->", range(-2, -4, 0)); // => []
