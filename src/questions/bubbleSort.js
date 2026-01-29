// Implement a function that performs a bubble sort. The function should take in an array of integers and return an 
// array with the integers sorted in ascending order. The input array is modified.

function bubbleSort(array) {
    let n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        for (let j = 0; j < n - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true;
            }
        }

        if (!swapped) break;
    }

    return array;
}

// Examples

console.log("bubbleSort--->", bubbleSort([9, 3, 6, 2, 1, 11])); // [1, 2, 3, 6, 9, 11]
console.log("bubbleSort--->", bubbleSort([12, 16, 14, 1, 2, 3])); // [1, 2, 3, 12, 14, 16]
console.log("bubbleSort--->", bubbleSort([1, 2])); // [1, 2, 3, 12, 14, 16]