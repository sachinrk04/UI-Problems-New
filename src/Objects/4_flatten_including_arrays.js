// Flatten Including Arrays

// Input: { a: [1, 2, { b: 3 }] }

// Output: { "a_0": 1, "a_1": 2, "a_2_b": 3 }

// ---------------------------------------------------------
// ---------------------------------------------------------
// Approach Name
// ---------------------------------------------------------
// Recursive DFS (Depth-First Search) with Key Path Accumulation

// ---------------------------------------------------------
// ---------------------------------------------------------
// Algorithm Steps
// ---------------------------------------------------------
//  1. Create an empty result object res = {}.
//  2. Define a recursive function flatten(value, currentKey).
//  3. If the value is:
//         I. Primitive → Store it in res[currentKey].
//        II. Array → Iterate using index and call recursion with currentKey + "_" + index
//       III. Object → Iterate keys and call recursion with currentKey + "_" + key
//  4. Start recursion with each top-level key.
//  5. Return res.
// ---------------------------------------------------------
// ---------------------------------------------------------
function flattenObjectArray(obj) {
    const result = {};

    function helper(value, currentKey = "") {
        if (Array.isArray(value)) {
            const newKey = value.forEach((item, index) => {
                const newKey = currentKey ? `${currentKey}_${index}`: `${index}`;
                helper(item, newKey);
            })
        } else if (value !== null && typeof value === "object") {
            Object.keys(value).forEach((key) => {
                const newKey = currentKey ? `${currentKey}_${key}`: key;
                helper(value[key], newKey);
            })
        } else {
            result[currentKey] = value;
        }
    }

    helper(obj);
    return result;
}
// ---------------------------------------------------------
// Example
const obj = { a: [1, 2, { b: 3 }] }
// ---------------------------------------------------------
console.log("flattenObjectArray--->", flattenObjectArray(obj));
// ---------------------------------------------------------
// ---------------------------------------------------------
// Dry Run (Example)
// ---------------------------------------------------------
// Input: { a: [1, 2, { b: 3 }] }

// Step-by-step:
//   1. Call → flatten(obj, "")
//   2. Key = "a" → value is array → call
//           flatten([1,2,{b:3}], "a")
//   3. Index 0 → value = 1
//           Store → "a_0": 1
//   4. Index 1 → value = 2
//           Store → "a_1": 2
//   5. Index 2 → value = { b: 3 }
//           Call → flatten({b:3}, "a_2")
//   6. Key "b" → value 3
//            Store → "a_2_b": 3

// Output: { "a_0": 1, "a_1": 2, "a_2_b": 3 }
// ---------------------------------------------------------
// ---------------------------------------------------------
// Complexity
// ---------------------------------------------------------
// Time	    O(n)
// Space	O(n)

// ---------------------------------------------------------
// ---------------------------------------------------------
