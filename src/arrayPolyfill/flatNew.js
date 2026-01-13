Array.prototype.newFlat = function(depth = 0) {
    if (depth < 1) return this.slice(); // return copy, not same reference

    let result = [];

    for (let i = 0; i < this.length; i++) {
        if (Array.isArray(this[i])) {
            result.push(...this[i].newFlat(depth - 1))
        } else {
            result.push(this[i])
        }
    }

    return result;
    
}

const arr = [1, [2, [3, [4]]]];

console.log(JSON.stringify(arr.newFlat())); // [1, [2, [3, [4]]]]
console.log(arr.newFlat(1)); // [1, 2, [3, [4]]]
console.log(arr.newFlat(2)); // [1, 2, 3, [4]]
console.log(arr.newFlat(Infinity)); // [1, 2, 3, 4]