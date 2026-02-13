// Flatten Deeply Nested JSON (Performance Optimized)
// Flatten a deeply nested object (10,000+ levels) into underscore notation.
//
// ---------------------------------------------------------
// ---------------------------------------------------------
// Recursive version:
// ---------------------------------------------------------
// ---------------------------------------------------------
function flattenDeepJSON(obj, path = "", result = {}) {
  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = obj[key];
    const newKey = path ? `${path}_${key}` : key;

    if (value !== null && typeof value === "object") {
      flattenDeepJSON(value, newKey, result );
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

// ---------------------------------------------------------
// Example
const input = (depth = 10, key = "a") => {
  let deep = {};
  let temp = deep;
  for (let i = 0; i < depth; i++) {
    temp[`${key}${i}`] = {};
    temp = temp[`${key}${i}`];

    if (i === depth - 1) temp.value = depth;
  }

  return deep;
};
// ---------------------------------------------------------
console.log("output-->", flattenDeepJSON(input()));
// ---------------------------------------------------------
// ---------------------------------------------------------
