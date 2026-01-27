// Implement a function that accepts a callback and a number n, which restricts invocation of the 
// callback to at most n times. Subsequent calls of the created function will return the result of the 
// last invocation of the callback function. The callback function is invoked with the this binding 
// and arguments of the created function.

function limit(func, n) {
    let count = 0;
    let lastResult;

    return function (...args) {
        if (count < n) {
            count++;
            lastResult = func.apply(this, args);
        }
        return lastResult;
    };
}

// Example
let i = 1;

function incrementBy(value) {
  i += value;
  return i;
}

const incrementByAtMostThrice = limit(incrementBy, 3);
console.log("incrementByAtMostThrice-2---->", incrementByAtMostThrice(2)); // i is now 3; The function returns 3.
console.log("incrementByAtMostThrice-3---->", incrementByAtMostThrice(3)); // i is now 6; The function returns 6.
console.log("incrementByAtMostThrice-4---->", incrementByAtMostThrice(4)); // i is now 10; The function returns 10.
console.log("incrementByAtMostThrice-5---->", incrementByAtMostThrice(5)); // i is still 10 as this is the 4th invocation; The function returns 10 as it's the result of the last invocation.
i = 4;
console.log("incrementByAtMostThrice-2---->", incrementByAtMostThrice(2)); // i is still 4 as it is not modified. The function still returns 10.
