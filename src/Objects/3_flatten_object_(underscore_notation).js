// Flatten Object (underscore notation)
// Write a function which converts nested object input into an Flatten Object.

// Input: { a: { b: { c: 3 } } }
// Output: { "a_b_c": 3 }

// ---------------------------------------------------------
// ---------------------------------------------------------
// Approach Name
// ---------------------------------------------------------
// Recursive DFS (Depth First Search)

// ---------------------------------------------------------
// ---------------------------------------------------------
// Algorithm Steps
// ---------------------------------------------------------
//  1. Create an empty result object res = {}.
//  2. Define a recursive function flatten(obj, parentKey).
//  3. Loop through each key in the object.
//  4. Create a new key:
//         I. If parentKey exists → parentKey + "_" + currentKey
//        II. Else → currentKey
//  5. If value is an object (and not null):
//         I. Recursively call flatten(value, newKey)
//  6. Else:
//         I. Add res[newKey] = value
//  7. Return res.

// ---------------------------------------------------------
// ---------------------------------------------------------
function flattenObject(obj) {
  const result = {};

  function helper(currentObj, parentKey = "") {
    for (let key in currentObj) {
      const newKey = parentKey ? `${parentKey}_${key}` : key;

      if (
        typeof currentObj[key] === "object" &&
        currentObj[key] !== null &&
        !Array.isArray(currentObj[key])
      ) {
        helper(currentObj[key], newKey);
      } else {
        result[newKey] = currentObj[key];
      }
    }
  }

  helper(obj);
  return result;
}
// ---------------------------------------------------------
// Example
// const obj = { a: { b: { c: 3 } } }; // Output: { "a_b_c": 3 }
// const obj = { a: { b: { c: 3, d: 2 } } }; // Output: {a_b_c: 3, a_b_d: 2}
const obj = { a: { b: { c: 3, f: 7 }, d: {e: 4} } }; // Output: {a_b_c: 3, a_b_f: 7, a_d_e: 4}
// const obj = [3, 2, 3]; // Output: {0: 3, 1: 2, 2: 3}
// ---------------------------------------------------------
console.log("flattenObject--->", flattenObject(obj));
// ---------------------------------------------------------
// ---------------------------------------------------------
// Dry Run (Example)
// ---------------------------------------------------------
// Input: { a: { b: { c: 3 } } }

// Step-by-step:
//  1. flatten({a:{b:{c:3}}}, "")
//         key = "a"
//         newKey = "a"
//         value is object → recursive call
//  2. flatten({b:{c:3}}, "a")
//         key = "b"
//         newKey = "a_b"
//         value is object → recursive call
//  3. flatten({c:3}, "a_b")
//         key = "c"
//         newKey = "a_b_c"
//         value is primitive → result["a_b_c"] = 3
// Final Result:

// Output: { "a_b_c": 3 }
// ---------------------------------------------------------
// ---------------------------------------------------------
// Complexity
// ---------------------------------------------------------
// Time	    O(n)
// Space	O(n) (recursive call stack + result object)

// ---------------------------------------------------------
// ---------------------------------------------------------
