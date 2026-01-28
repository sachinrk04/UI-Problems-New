// Implement a function fromPairs(pairs) that transforms a list of key-value pairs into an object.

// fromPairs(pairs);

// Arguments
//      pairs (Array): An array of key-value pairs.

// Returns
//      (Object): Returns the object composed from the key-value pairs.

function fromPairs(pairs) {
  let result = {};

  for (let i = 0; i < pairs.length; i++) {
    result[pairs[i][0]] = pairs[i][1];
  }

  return result;
}

// Example

const pairs = [
  ["a", 1],
  ["b", 2],
  ["c", 3],
];

console.log("fromPairs--->", fromPairs(pairs)); // => { a: 1, b: 2, c: 3 }
