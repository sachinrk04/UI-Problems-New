function flattenArray(arr) {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result.push(...flattenArray(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }

    return result;
}

// Example usage:
const nestedArray = [1, [2, [3, 4]], 5, [6, [7, [8]]]];
console.log("nestedArray--->", flattenArray(nestedArray)); // Output: [1, 2, 3, 4, 5, 6, 7, 8]

// Another example with mixed content:
const mixedArray = [1, 'a', [2, ['b', 3]], [4], 'c'];
console.log("mixedArray--->", flattenArray(mixedArray)); // Output: [1, 'a', 2, 'b', 3, 4, 'c']