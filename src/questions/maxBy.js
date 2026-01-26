// Implement a function maxBy(array, iteratee) that finds the element inside array with the
// maximum value after going through iteratee. The iteratee is invoked with one argument: (value).

// Arguments
// array (Array): The array to iterate over.
// iteratee (Function): The iteratee invoked per element.

// Returns
// (*): Returns the maximum value.

function maxBy(array, iteratee) {
  let result;
  let maxValue;

  for (let i = 0; i < array.length; i++) {
    const value = iteratee(array[i]);

    if (value == null) continue;

    if (maxValue === undefined || value > maxValue) {
      maxValue = value;
      result = array[i];
    }
  }

  return result;
}

// Examples
console.log(
  "max By--->",
  maxBy([{ n: 1 }, { n: 2 }], (o) => o.n),
); // => { n: 2 }
console.log(
  "max By--->",
  maxBy([1, 2], (o) => -o),
); // => 1
console.log(
  "max By--->",
  maxBy([{ n: 1 }, { n: 2 }], (o) => o.m),
); // => undefined
