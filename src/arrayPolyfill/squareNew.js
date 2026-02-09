// Implement a custom Array function, Array.prototype.square() which creates a new array with the results of squaring 
// every element within the array the .square() method is called on.

Array.prototype.mySquare = function() {
    const result = [];

    for (let i = 0; i < this.length; i++) {
        if (i in this) {
            result[i] = this[i] * this[i]
        }
    }

    return result;
}

// Example
console.log("mySquare--->", [-2].mySquare())
console.log("mySquare--->", [1, 2, 3, 4].mySquare())