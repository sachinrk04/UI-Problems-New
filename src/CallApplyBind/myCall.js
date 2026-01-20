// In JavaScript, call usually refers to the Function.prototype.call() method.

// call() is used to invoke (run) a function immediately while explicitly setting the value of this.

// Key idea
// ---------------------------------------------------------
// 1. call works by temporarily attaching the function to the given object
// 2. Invoking it so that this points to that object
// 3. Then cleaning up after execution


// ---------------------------------------------------------
// ---------------------------------------------------------

Function.prototype.myCall = function(thisArg, ...args) {
    thisArg = thisArg ?? globalThis; //   // If thisArg is null or undefined, default to global object

    thisArg = Object(thisArg); // Ensure thisArg is an object (handles primitives like number, string)

    const fnSymbol = Symbol("fn"); // Create a unique property to avoid collisions

    thisArg[fnSymbol] = this; // Assign function to thisArg

    const result = thisArg[fnSymbol](...args);  // Call the function

    delete thisArg[fnSymbol]; // Cleanup
    
    return result;
}

// Example

function multiplyAge(multiplier = 1) {
    return this.age * multiplier;
}

const mary = { age: 21 };
const john = { age: 42 };

console.log("Mary--->", multiplyAge.myCall(mary));
console.log("John--->", multiplyAge.myCall(john, 2));
