// Implement a function deepEqual that performs a deep comparison between two values.
// It returns true if two input values are deemed equal, and returns false if not.

//      1. You can assume there are only JSON-serializable values (numbers, strings,
//         boolean, null, objects, arrays).
//      2. There wouldn't be cyclic objects, i.e. objects with circular references.

function deepEqual(valueA, valueB) {
  return JSON.stringify(valueA) === JSON.stringify(valueB);
}

// Examples

console.log("deepEqual--->", deepEqual("foo", "foo")); // true
console.log("deepEqual--->", deepEqual({ id: 1 }, { id: 1 })); // true
console.log("deepEqual--->", deepEqual([1, 2, 3], [1, 2, 3])); // true
console.log("deepEqual--->", deepEqual([{ id: "1" }], [{ id: "2" }])); // false
