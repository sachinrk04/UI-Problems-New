// Implement a function fill(array, value, [start=0], [end=array.length]) that fills an array with
// values from start up to, but not including, end.

// Note: This method mutates array.

// Arguments
//      1. array (Array): The array to fill.
//      2. value (*): The value to fill array with.
//      3. [start=0] (number): The start position.
//      4. [end=array.length] (number): The end position.

// Returns
// (Array): Returns array.

function fill(array, value, start = 0, end = array.length) {
  const len = array.length;

  start = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
  end = end < 0 ? Math.max(len + end, 0) : Math.min(end, len);

  for (let i = 0; i < len; i++) {
    if (i >= start && i < end) {
      array[i] = value;
    }
  }

  return array;
}

// Example

console.log("fill--->", fill([1, 2, 3], "a")); // ['a', 'a', 'a']
console.log("fill--->", fill([4, 6, 8, 10], "*", 1, 3)); // [4, '*', '*', 10]

// out of bounds indices
console.log("fill--->", fill([4, 6, 8, 10, 12], "*", 1, 8)); // [4, '*', '*', '*', '*']
console.log("fill--->", fill([4, 6, 8, 10, 12], "*", 8, 10)); // [4, 6, 8, 10, 12]

// negative but within bounds indices
console.log("fill-negative--->", fill([4, 6, 8, 10, 12], "*", -3, -1)); // [4, 6, '*', '*', 12]

// negative out of bounds indices
console.log("fill--->", fill([4, 6, 8, 10, 12], "*", -10, 2)); // ['*', '*', 8, 10, 12]
console.log("fill--->", fill([4, 6, 8, 10, 12], "*", -10, -8)); // [4, 6, 8, 10, 12]
