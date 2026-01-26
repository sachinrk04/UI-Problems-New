// Implement a function minBy(array, iteratee) that finds the element inside array with the
// minimum value after going through iteratee.

// Arguments
//      1. array (Array): The array to iterate over.
//      2. iteratee (Function): The iteratee invoked per element, which is a function that a
//         ccepts one argument: (value).

// Returns
// (*): Returns the minimum value.

function minBy(array, iteratee) {
  let result;
  let minValue;

  for (let i = 0; i < array.length; i++) {
    const value = iteratee(array[i]);

    if (value == null) continue;

    if (minValue === undefined || value < minValue) {
      minValue = value;
      result = array[i];
    }
  }

  return result;
}

// Example
console.log(
  "minBy--->",
  minBy([2, 3, 1, 4], (num) => num),
); // => 1

console.log(
  "minBy--->",
  minBy([{ n: 1 }, { n: 2 }], (o) => o.n),
); // => { n: 1 }

console.log(
  "minBy--->",
  minBy([{ n: 1 }, { n: 2 }, { n: 3 }], (o) => o.m),
); // => undefined
