Array.prototype.mapNew = function(callback) {
    const result = []

    for (let i = 0; i < this.length; i++) {
        if (i in this) {
            result.push(callback(this[i], i, this));
            // result[i] = callback(this[i], i, this)
        }
    }

    return result;
}

const numbers = [1, 2, 3, 4];

const doubled = numbers.mapNew((num) => num * 2);

console.log("mapNew--->", doubled)