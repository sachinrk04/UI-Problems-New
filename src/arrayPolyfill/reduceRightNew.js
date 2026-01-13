Array.prototype.newReduceRight = function(cb, init) {
    let acc = init;
    let startIndex = 0;

    if (init === undefined) {
        acc = this[0];
        startIndex = 1;
    }

    for (let i = startIndex; i >= 0; i--) {
        acc = cb(acc, this[i], i, this);
    }

    return acc;
}


const nums = [1, 2, 3, 4];

const result = nums.newReduceRight((acc, cur) => acc - cur);

console.log(result);