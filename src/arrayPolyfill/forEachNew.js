Array.prototype.newForEach = function(cb) {
    for( let i = 0; i < this.length; i++) {
        if (i in this) {
            cb(this[i], i, this)
        }
    }
}

const numbers = [1, 2, 3, 4];

let sum = 0

numbers.newForEach((number) => {
    sum = sum + number
});

console.log("output--->", sum)