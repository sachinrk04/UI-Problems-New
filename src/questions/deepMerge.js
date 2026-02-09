// Implement a function deepMerge(objA, objB) to takes in two objects and returns a new object after
// deep merging them:

//      1. The resulting object should contain a union of the keys/values of both objects.
//      2. If the same key is present on both objects, the merged value will be from objB, unless:
//            I. Both values are arrays: the elements from objB will be appended behind objA's.
//           II. Both values are objects: merge the objects as per the same rules for deepMerge.
//      3. Arrays and objects within the merged object should be new instances.

// The input objects should not be modified.

function deepMerge(valA, valB) {
  throw "Not implemented";
}

// Examples

console.log("deepMerge--->", deepMerge({ a: 1 }, { b: 2 })); // { a: 1, b: 2 }
console.log("deepMerge--->", deepMerge({ a: 1 }, { a: 2 })); // { a: 2 }
console.log("deepMerge--->", deepMerge({ a: 1, b: [2] }, { b: [3, 4] })); // { a: 1, b: [2, 3, 4] }
