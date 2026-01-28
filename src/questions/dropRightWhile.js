// Given a predicate function and an array, implement a function dropRightWhile(array, predicate). This function 
// should create a slice of array excluding elements dropped from the end. Elements are dropped until predicate 
// returns falsey. Your function should not modify the original array. The array may or may not be in sorted order.

// Arguments
//      1. array (Array): The array to query.
//      2. predicate (Function): The function invoked per iteration.

// Predicate signature: The predicate function is invoked with three arguments: (value, index, array). 
// You must invoke it with all three arguments.
//      1. value: The current element being iterated.
//      2. index: The index of the current element.
//      3 array: The original input array.

// Returns
// (Array): Returns the slice of array containing the kept elements.

function dropRightWhile(array, predicate){
    let end = array.length;

    while( end > 0) {
        const index = end - 1;

        if (!predicate(array[index], index, array)) break;

        end--;
    }

    return array.slice(0, end);
};

// Examples

// Example 1: Basic usage
const Example1 = dropRightWhile([1, 2, 3, 4, 5], (value, _index, _array) => value > 3);
console.log("Example1--->", Example1)
// => [1, 2, 3]
// Explanation: Starts from right (5). 5 > 3 (true, drop). 4 > 3 (true, drop). 3 > 3 (false, stop). Returns [1, 2, 3].

// Example 2: Predicate always true
const Example2 = dropRightWhile([1, 2, 3], (value, _index, _array) => value < 6);
console.log("Example2--->", Example2)
// => []
// Explanation: 3 < 6 (true, drop). 2 < 6 (true, drop). 1 < 6 (true, drop). Returns empty array.

// Example 3: Predicate always false
const Example3 = dropRightWhile([1, 2, 3, 4, 5], (value, _index, _array) => value > 6);
console.log("Example3--->", Example3)
// => [1, 3, 2, 4, 5]
// Explanation: 5 > 6 (false, stop immediately). Returns the original array slice.

// Example 4: Using the `index` argument
const Example4 = dropRightWhile([1, 2, 3, 4, 5], (_value, index, _array) => index > 2);
console.log("Example4--->", Example4)
// => [1, 2, 3]
// Explanation: Starts at index 4. 4 > 2 (true, drop). Index 3. 3 > 2 (true, drop). Index 2. 2 > 2 (false, stop). Returns [1, 2, 3].

// Example 5: Using the `array` argument
const Example5 = dropRightWhile([10, 11, 12, 4, 5], (value, _index, array) => value < array[1]);
console.log("Example5--->", Example5)
// => [1, 2, 3]
// Explanation: array[1] = 11. 5 < 11 (true, drop). 4 < 11 (true, drop). 12 < 11 (false, stop). Returns [10, 11, 12].
