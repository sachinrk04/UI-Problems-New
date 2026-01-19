// Key rules to implement
// ---------------------------------------------------------

// 1. If the value is already a native Promise → return it

// 2. If the value is not thenable → return a fulfilled Promise

// 3. If the value is a thenable → call its then method
//    Pass resolve/reject functions
//    Adopt the thenable’s eventual state
//    Ensure resolve/reject is only called once

// ---------------------------------------------------------
// Comparison with the FULL spec algorithm
// ---------------------------------------------------------
// ---------------------------------------------------------
// What the ECMAScript spec actually does (high level)

// The real algorithm is called Promise Resolution Procedure.

// Spec-level steps (simplified English)

// 1. If x is the same promise → reject (cycle protection)

// 2. If x is a Promise → adopt its state

// 3. If x is an object or function:
//    Safely get then
//    If then is a function:
//      Call it with resolve and reject
//      Ensure only the first call wins
//      Catch synchronous errors

// 4. Otherwise → resolve with x

// ---------------------------------------------------------
// ---------------------------------------------------------

function promiseResolve(value) {
    if (value instanceof Promise) return value;


    if (value !== null && typeof value === "object" && typeof value.then === "function") {
        return new Promise((resolve, reject) => {
            value.then(resolve, reject)
        })
    }

    return Promise.resolve(value);
}

// Examples

promiseResolve(42).then((res) => {
    console.log("Res-1--->", res)
})

const original = new Promise((resolve) => resolve(42));
promiseResolve(original).then((res) => {
    console.log("Res-2--->", res)
})

const resolvedThenable = promiseResolve({
  then(resolve, reject) {
    resolve(42);
  },
});
resolvedThenable.then((res) => {
    console.log("Res-3--->", res)
}) 
