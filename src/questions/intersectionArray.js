// Implement a JavaScript function intersection(arrays) that takes multiple arrays as input and returns a new array 
// containing the unique values that are present in all given arrays SameValueZero for equality comparisons. 
// The order of values in the returned array are determined by the first array.

// intersection(...arrays);

// Arguments
// [arrays] (...Array): The arrays to perform the intersection on.

// Returns
// (Array): Returns a new array containing the unique values present in all given arrays.

function intersectionArray(...arrays) {
    if (arrays.length === 0) return [];
    if (arrays.some(array => array.length === 0)) return [];

    return [...new Set(arrays.reduce((a, b) => {
        return a.filter((x) => new Set(b).has(x));
    }))];
}

const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4];
const arr3 = [3, 4, 5];

console.log("intersectionArray---->", intersectionArray(arr1, arr2, arr3)); // => [3]

const arr4 = [1, 5, 7, 9, 7];
console.log("intersectionArray---->", intersectionArray(arr4)); // [1, 5, 7, 9]

const arr5 = [];
console.log("intersectionArray---->", intersectionArray(arr5)); // []