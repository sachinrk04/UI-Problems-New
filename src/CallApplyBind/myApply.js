Function.prototype.myApply = function (thisArg, args) {
    if (typeof this !== "function") {
        throw new TypeError(this + " is not a function");
    }

    thisArg = thisArg ?? globalThis;
    
    thisArg = Object(thisArg);


    if (args !== undefined && !Array.isArray(args)) {
        throw new TypeError(args + " is not a Array")
    }

    const fnSymbol = Symbol("fn");

    thisArg[fnSymbol] = this;

    const result = args ? thisArg[fnSymbol](...args) : thisArg[fnSymbol]();

    delete thisArg[fnSymbol];

    return result;
};

// Example

function multiplyAge(multiplier = 1) {
    return this.age * multiplier;
}

const mary = { age: 21 };
const john = { age: 42 };

console.log("Mary--->", multiplyAge.myApply(mary));
console.log("John--->", multiplyAge.myApply(john, [2]));
