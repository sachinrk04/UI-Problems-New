// The key requirements are:
// ---------------------------------------------------------

// 1. The callback must run at most once
// 2. All later calls return the first result
// 3. Preserve this binding
// 4. Forward all arguments

// ---------------------------------------------------------
// ---------------------------------------------------------

// How it works (step-by-step)
// ---------------------------------------------------------

// 1. Closure
//    called and result live in the closure and persist across calls

// 2. First invocation
//    called === false
//    fn is executed using:
//          fn.apply(this, args)


//.   Result is stored

// 3. Subsequent invocations
//    called === true
//    Function execution is skipped
//    Previously stored result is returned

// ---------------------------------------------------------
// ---------------------------------------------------------

function once(func) {
    let called = false;
    let result;

    return function (...args) {
        if (!called) {
            called = true;
            result = func.apply(this, args);
        }
        return result;
    }
}

// Example
let i = 1;

function incrementBy(value) {
  i += value;
  return i;
}

const incrementByOnce = once(incrementBy);

console.log("incrementByOnce(2)--->", incrementByOnce(2)); // i = 3, returns 3
console.log("incrementByOnce(3)--->", incrementByOnce(3)); // i still 3, returns 3
i = 4;
console.log("incrementByOnce(2)--->", incrementByOnce(2)); // i still 4, returns 3
// ---------------------------------------------------------