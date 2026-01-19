// How It Works (Step-by-Step)
// ---------------------------------------------------------

// 1. Wrap everything in a new Promise
//    promiseRace returns a new Promise
//    This outer promise represents the “race” result

// 2. Empty array case
//    If the input array is empty:
//      Do nothing
//      Neither resolve nor reject is called
//    The promise stays pending forever
//    This matches native Promise.race([])

// 3. Loop through all values
//    Iterate over every item in the array
//    All promises start competing in parallel

// 4. Promise.resolve(value)
//    Converts each value into a promise
//    Ensures consistent behavior for:
//      Pending promises
//      Already-resolved promises
//      Already-rejected promises
//      Non-promise values
// (This is exactly how native Promise.race works internally)

// 5. Attach settlement handlers
//    .then(resolve) → fulfills the outer promise
//    .catch(reject) → rejects the outer promise
//    Each promise attempts to settle the outer promise

// 6. First settled promise wins
//    The first promise to settle (resolve or reject):
//      Immediately settles the outer promise
//    Later settlements are ignored automatically
// (Promises are immutable once settled — no guards needed)

// 7. Remaining promises are ignored
//    Even if other promises later resolve or reject:
//      Their results are discarded
//    The race is already over

// 8. Final outcome
//    Resolved with the value of the first fulfilled promise
//                          OR
//    Rejected with the reason of the first rejected promise

// ---------------------------------------------------------
// ---------------------------------------------------------

// Time & Space Complexity
// ---------------------------------------------------------

// Time: O(n) — all promises are registered once
// Space: O(1) — no extra structures used

// ---------------------------------------------------------
// ---------------------------------------------------------

function promiseRace(promises) {
    return new Promise((resolve, reject) => {
        
        if (promises.length === 0) return;

        promises.forEach((promise) => {
            Promise.resolve(promise)
                .then(resolve, reject)
        });
    });
};

// Example 

// ---------------------------------------------------------
// Example - 1
// ---------------------------------------------------------

// const p0 = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve(42);
//   }, 1000);
// });
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject('Err!');
//   }, 400);
// });

// ---------------------------------------------------------
// Example - 2
// ---------------------------------------------------------

// const p0 = Promise.resolve(42);
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(21);
//   }, 100);
// });

// ---------------------------------------------------------
// Example - 3
// ---------------------------------------------------------

// const p0 = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve(42);
//   }, 400);
// });
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject('Err!');
//   }, 100);
// });

// ---------------------------------------------------------
// Example - 4
// ---------------------------------------------------------

const p0 = Promise.reject(42);
const p1 = Promise.resolve(2);
// ---------------------------------------------------------
// ---------------------------------------------------------

promiseRace([p0, p1]).then((res) => {
    console.log("Then--->", res)
}).catch((error) => {
    console.log("Catch--->", error)
})