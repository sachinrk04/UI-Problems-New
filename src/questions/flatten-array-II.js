// Implement a function flatten that returns a newly-created array with all sub-array elements concatenated recursively 
// into a single level.

// ---------------------------------------------------------
// ---------------------------------------------------------
// use concat
// ---------------------------------------------------------
function flatten(values) {
    return values.reduce((acc, curr) => {
        return acc.concat(Array.isArray(curr) ? flatten(curr) : curr)
    }, []);
}

const result1 = flatten([1, 2, 3]); // [1, 2, 3]
console.log("result1--->", result1)
const result2 = flatten([1, [2, 3]]); // [1, 2, 3]
console.log("result2--->", result1)
const result3 = flatten([
  [1, 2],
  [3, 4],
]); // [1, 2, 3, 4]

console.log("result3--->", result3)
const result4 = flatten([1, [2, [3, [4, [5]]]]]); // [1, 2, 3, 4, 5]
console.log("result4--->", result4)
// ---------------------------------------------------------
// ---------------------------------------------------------


// ---------------------------------------------------------
// ---------------------------------------------------------


// ---------------------------------------------------------
// ---------------------------------------------------------
// use push
// ---------------------------------------------------------
function flattenPush(values) {
    return values.reduce((acc, curr) => {
        return Array.isArray(curr) ? acc.push(...flattenPush(curr)) : acc.push(curr), acc
    }, []);
}

const resultPush1 = flattenPush([1, 2, 3]); // [1, 2, 3]
console.log("resultPush1--->", resultPush1)
const resultPush2 = flattenPush([1, [2, 3]]); // [1, 2, 3]
console.log("resultPush2--->", resultPush1)
const resultPush3 = flattenPush([
  [1, 2],
  [3, 4],
]); // [1, 2, 3, 4]

console.log("resultPush3--->", resultPush3)
const resultPush4 = flattenPush([1, [2, [3, [4, [5]]]]]); // [1, 2, 3, 4, 5]
console.log("resultPush4--->", resultPush4)

// ---------------------------------------------------------
// ---------------------------------------------------------
