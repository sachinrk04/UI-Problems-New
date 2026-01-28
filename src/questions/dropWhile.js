// Given a predicate function and an array, implement a function dropWhile(array, predicate). This function should 
// create a slice of array excluding elements dropped from the start of the list. Elements are dropped until 
// predicate returns falsey. Your function should not modify the original array. The array may or may not be 
// in sorted order.

// Arguments
//      1. array (Array): The array to query.
//      2. predicate (Function): The function invoked per iteration.

// Predicate signature: The predicate function is invoked with three arguments: (value, index, array). You must i
// nvoke it with all three arguments.
//      1. value: The current element being iterated.
//      2. index: The index of the current element.
//      3. array: The original input array.

// Returns
// (Array): Returns the slice of array containing the kept elements.

function dropWhile(array, predicate){
    let index = 0;

    while (index < array.length && predicate(array[index], index, array)) {
        index++;
    }

    return array.slice(index);
}

// Example
const example1 = dropWhile([1, 2, 3, 4, 5], (value, _index, _array) => value < 3);
console.log("example1--->", example1)
// => [1, 2, 3]
// Explanation: Starts from left (1). 1 < 3 (true, drop). 2 < 3 (true, drop). 3 < 3 (false, stop). Returns [3, 4, 5].

const example2 = dropWhile([1, 2, 3], (value, _index, _array) => value < 6);
console.log("example2--->", example2)
// => []
// Explanation: Starts from left (1). 1 < 6 (true, drop). 2 < 6 (true, drop). 3 < 6 (true, drop). Reaches end. Returns [].

const example3 = dropWhile([1, 2, 3, 4, 5], (value, _index, _array) => value > 6);
console.log("example3--->", example3)
// => [1, 2, 3, 4, 5]
// Explanation: Starts from left (1). 1 > 6 (false, stop immediately). Returns [1, 2, 3, 4, 5].

const example4 = dropWhile([1, 2, 3, 4, 5], (_value, index, _array) => index < 3);
console.log("example4--->", example4)
// => [4, 5]
// Explanation: Starts at index 0. 0 < 3 (true, drop). Index 1. 1 < 3 (true, drop). Index 2. 2 < 3 (true, drop). 
// Index 3. 3 < 3 (false, stop). Returns [4, 5].

const example5 = dropWhile([4, 5, 12, 10, 11], (value, _index, array) => value < array[2]);
console.log("example5--->", example5)
// => [12, 10, 11]
// Explanation: array[2] is 12. Starts from left (4). 4 < 12 (true, drop). Index 1 (5). 5 < 12 (true, drop). 
// Index 2 (12). 12 < 12 (false, stop). Returns [12, 10, 11].
