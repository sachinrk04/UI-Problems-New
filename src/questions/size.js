function size(collection) {
  if (collection == null) return 0;

  // String or Array
  if (typeof collection === "string" || Array.isArray(collection)) {
    return collection.length;
  }

  // Map or Set
  if (collection instanceof Map || collection instanceof Set) {
    return collection.size;
  }

  // Plain Object
  if (typeof collection === "object") {
    return Object.keys(collection).length;
  }
}

// Example
console.log("String--->", size("peanut")); // 6
console.log("Array--->", size([1, 2, 3, 4, 5])); // 5
console.log(
  "Maps--->",
  size(
    new Map([
      [1, 2],
      [3, 4],
    ]),
  ),
); // 2
console.log("Sets--->", size(new Set([1, 2, 3]))); // 3
console.log("Object--->", size({ a: 1, b: 2 })); // 2
