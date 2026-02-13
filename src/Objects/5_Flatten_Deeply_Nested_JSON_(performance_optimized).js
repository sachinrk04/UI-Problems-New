// Flatten Deeply Nested JSON (Performance Optimized)
// Flatten a deeply nested object (10,000+ levels) into underscore notation.
//
// ---------------------------------------------------------
// ---------------------------------------------------------
// Approach Name
// ---------------------------------------------------------
// Iterative DFS using Explicit Stack

// ---------------------------------------------------------
// ---------------------------------------------------------
// Algorithm Steps
// ---------------------------------------------------------
// 1. Create empty result object.
// 2. Initialize a stack with:
//         [{ currentObj: input, path: "" }]
// 3. While stack is not empty:
//         Pop top item
//         Iterate its keys
//         Build newKey using underscore
//         If value is object → push to stack
//         Else → store in result
// 4. Return result
// ---------------------------------------------------------
// ---------------------------------------------------------

function flattenDeepJSON(obj) {
    const result = {};
    const stack = [{current: obj, path: ""}];

    while (stack.length) {
        const {current, path} = stack.pop();

        const keys = Object.keys(current);
        
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const value = current[key];
            const newKey = path ? `${path}_${key}` : key;

            if (value !== null && typeof value === "object") {
                stack.push({current: value, path: newKey});
            } else {
                result[newKey] = value;
            }
        }
    }

    return result;
}

// ---------------------------------------------------------
// Example
const input = (depth = 100000, key = "a") => {
    let deep = {};
    let temp = deep;
    for (let i = 0; i < depth; i++) {
        temp[key] = {};
        temp = temp[key];

        if (i === depth - 1) temp.value = depth;
    }

    return deep;
}
// ---------------------------------------------------------
console.time("run");
console.log("output-->", flattenDeepJSON(input()));
console.timeEnd("run")

// ---------------------------------------------------------
// ---------------------------------------------------------
// Dry Run (Example)
// ---------------------------------------------------------

// ---------------------------------------------------------
// ---------------------------------------------------------
// Complexity
// ---------------------------------------------------------
// Time	    O(n)
// Space	O(n)

// ---------------------------------------------------------
// ---------------------------------------------------------
