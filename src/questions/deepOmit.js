// Implement a function deepOmit(obj, keys) that removes specified keys and their corresponding values from an object, including nested objects or arrays. It works recursively to traverse through the entire object structure, ensuring that all occurrences of the specified keys are removed at all levels. The function takes in an object (obj) and an array of string keys (keys).

function deepOmit(values, keys) {
  const setKeys = new Set(keys);

  if (Array.isArray(values)) {
    return values.map((value) => deepOmit(value, keys));
  }

  if (values !== null && typeof values === "object") {
    const result = {};

    for (const [key, value] of Object.entries(values)) {
      if (setKeys.has(key)) continue;

      const newValue = deepOmit(value, keys);

      result[key] = newValue;
    }

    return result;
  }

  return values;
}

// Examples

console.log("deepOmit---->", deepOmit({ a: 1, b: 2, c: 3 }, ["b"])); // { a: 1, c: 3 }
// A more complicated example with nested objects:

const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
  f: [5, 6],
};
console.log("deepOmit---->", deepOmit(obj, ["b", "c", "e"])); // { a: 1, f: [5, 6] }
