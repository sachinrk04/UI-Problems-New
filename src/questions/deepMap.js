// Implement a function deepMap(value, fn) to return a new value containing the results
// of calling a provided function on every non-Array and non-Object element in the value input,
// including elements within nested Arrays and Objects. The function fn is called with a
// single argument, the element that is being mapped/transformed.

function deepMap(value, fn) {
  const root = value;

  function helper(val) {
    if (val === null) {
      return fn.call(root, val);
    }

    if (Array.isArray(val)) {
      return val.map(helper);
    }

    if (typeof val === "object" && val.constructor === Object) {
      const result = {};
      for (const key in val) {
        if (Object.prototype.hasOwnProperty.call(val, key)) {
          result[key] = helper(val[key]);
        }
      }
      return result;
    }

    return fn.call(root, val);
  }

  return helper(value);
}

// Example
const double = (x) => x * 2;

console.log("deepMap--->", deepMap(2, double)); // 4
console.log("deepMap--->", deepMap([1, 2, 3], double)); // [4, 5, 6]
console.log("deepMap--->", deepMap({ a: 1, b: 2, c: 3 }, double)); // { a: 2, b: 4, c: 6 }
console.log(
  "deepMap--->",
  deepMap(
    {
      foo: 1,
      bar: [2, 3, 4],
      qux: { a: 5, b: 6 },
    },
    double,
  ),
); // => { foo: 2, bar: [4, 6, 8], qux: { a: 10, b: 12 } }
