Array.prototype.newFilter = function(cb) {
    const result = [];

    for (let i = 0; i < this.length; i++) {
        if (i in this && cb(this[i], i, this)) result.push(this[i]);
    }

    return result;
}

const numbers = [1, 2, 3, 4];

const filtered = numbers.filter((number) => number !== 1);

console.log("filtered---->", filtered);