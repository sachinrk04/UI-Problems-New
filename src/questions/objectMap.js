// Implement a function objectMap(obj, fn) to return a new object containing the results
// of calling a provided function on every value in the object. The function fn is called
// with a single argument, the value that is being mapped/transformed.

function objectMap(obj, fn) {
  let result = {};

  for (let key in obj) {
    result[key] = fn.call(obj, obj[key]);
  }

  return result;
}

// Example
const double = (x) => x * 2;
console.log("objectMap---->", objectMap({ foo: 1, bar: 2 }, double)); // => { foo: 2, bar: 4}
