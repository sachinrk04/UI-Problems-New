// Implement a function deepMerge(objA, objB) to takes in two objects and returns a new object after
// deep merging them:

//      1. The resulting object should contain a union of the keys/values of both objects.
//      2. If the same key is present on both objects, the merged value will be from objB, unless:
//            I. Both values are arrays: the elements from objB will be appended behind objA's.
//           II. Both values are objects: merge the objects as per the same rules for deepMerge.
//      3. Arrays and objects within the merged object should be new instances.

// The input objects should not be modified.

function deepMerge(valA, valB) {
  if (!isObject(valA)) return clone(valB);
  if (!isObject(valB)) return clone(valB);

  const result = {};

  const keys = new Set([...Object.keys(valA), ...Object.keys(valB)]);

  for (const key of keys) {
    const aValue = valA[key];
    const bValue = valB[key];

    // Key only in A
    if (!(key in valB)) {
      result[key] = clone(aValue);
      continue;
    }

    // Key only in B
    if (!(key in valA)) {
      result[key] = clone(bValue);
      continue;
    }

    // Both arrays → append
    if (Array.isArray(aValue) && Array.isArray(bValue)) {
      result[key] = [...clone(aValue), ...clone(bValue)];
      continue;
    }

    // Both objects → deep merge
    if (isObject(aValue) && isObject(bValue)) {
      result[key] = deepMerge(aValue, bValue);
      continue;
    }

    // Otherwise → B overrides
    result[key] = clone(bValue);
  }

  return result;
}

function isObject(val) {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

function clone(val) {
  if (Array.isArray(val)) return val.map(clone);
  if (isObject(val)) return deepMerge({}, val);
  return val;
}

// Examples

console.log("deepMerge--->", deepMerge({ a: 1 }, { b: 2 })); // { a: 1, b: 2 }
console.log("deepMerge--->", deepMerge({ a: 1 }, { a: 2 })); // { a: 2 }
console.log("deepMerge--->", deepMerge({ a: 1, b: [2] }, { b: [3, 4] })); // { a: 1, b: [2, 3, 4] }
