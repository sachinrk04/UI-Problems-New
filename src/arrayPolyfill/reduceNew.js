Array.prototype.newReduce = function(cb, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;

    if (initialValue === undefined) {
        accumulator = this[0];
        startIndex = 1;
    }

    for (let i = startIndex; i < this.length; i++) {
        accumulator = cb(accumulator, this[i], i, this);
    }

    return accumulator;
}

const nums = [1, 2, 3, 4];

const sum = nums.newReduce((acc, curr) => acc + curr, 0);
console.log("sum---->", sum);

const product = nums.newReduce((acc, curr) => acc * curr);
console.log("product---->", product);