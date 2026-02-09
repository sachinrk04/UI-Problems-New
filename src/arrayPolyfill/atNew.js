// Array.prototype.at takes an integer value and returns the item at that index, allowing for positive and negative integers. 
// Negative integers count back from the last item in the array.

// Implement Array.prototype.at. To avoid overwriting the actual Array.prototype.at, we shall instead implement it as 
// Array.prototype.myAt.

Array.prototype.myAt = function(index) {
    index = Math.trunc(index);


    const length = this.length;

    if (index < 0) {
        index = length + index;
    }

    if (index < 0 || index >= length) {
        return undefined;
    }

    return this[index];
}

// Examples

const arr = [42, 79];
console.log("myAt--->", arr.myAt(0)); // 42
console.log("myAt--->", arr.myAt(1)); // 79
console.log("myAt--->", arr.myAt(2)); // undefined

console.log("myAt--->", arr.myAt(-1)); // 79
console.log("myAt--->", arr.myAt(-2)); // 42
console.log("myAt--->", arr.myAt(-3)); // undefined