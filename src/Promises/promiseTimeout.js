// How promiseTimeout Works (Step-by-Step)
// ---------------------------------------------------------

// 1. Wrap everything in a new Promise
//    This outer promise will be returned to the caller.
//    Its resolution depends on either the input promise settling or the timeout expiring.

// 2. Start a timer
//    Use setTimeout with the provided duration.
//    If the timer fires first, reject the outer promise with "Promise timeout".

// 3. Normalize the input
//    Promise.resolve(promise) ensures the input works whether it’s a promise, thenable, or plain value.

// 4. Handle fulfillment
//    .then((value) => { ... }) resolves the outer promise immediately if the input promise resolves before the timeout.
//    Clear the timeout to avoid unnecessary rejection later.

// 5. Handle rejection
//    .catch((error) => { ... }) rejects the outer promise with the same error if the input promise rejects before the timeout.
//    Clear the timeout to prevent the timeout from firing afterward.

// 6. Race behavior
//    Only the first settled event wins.
//    If the timeout fires first, the outer promise rejects and any later resolution/rejection of the input promise is ignored.
//    If the input promise settles first, the timeout is cleared and never fires.

// 7. Final outcome
//    Input resolves before timeout → outer promise resolves with value.
//    Input rejects before timeout → outer promise rejects with input error.
//    Timeout expires first → outer promise rejects "Promise timeout".

// ---------------------------------------------------------
// ---------------------------------------------------------

// Time & Space Complexity
// ---------------------------------------------------------
// ---------------------------------------------------------

// Time Complexity
// ---------------------------------------------------------
// Best case: The input promise settles immediately
//      Only the wrapper promise, .then/.catch, and the timer are set → O(1)

// Worst case: Timeout occurs or promise takes long to settle
//      The timer waits for timeout milliseconds → still considered O(1) in terms of operations, because JS timers don’t scale with input size
//      The outer promise just wraps one input promise → no loops or extra work

// Overall: O(1)
//      Independent of the value/content of the promise

// Space Complexity
// ---------------------------------------------------------
// Stores only a single timer ID and references to the input promise → O(1)
// No additional arrays, objects, or recursive calls
// Overall: O(1)

// ---------------------------------------------------------
// ---------------------------------------------------------

function promiseTimeout(promise, duration) {
    return new Promise((resolve, reject) => {
        const timerId = setTimeout(() => {
            reject("Promise timeout");
        }, duration);

        Promise.resolve(promise)
            .then((value) => {
                clearTimeout(timerId);
                resolve(value);
            })
            .catch((error) => {
                clearTimeout(timerId);
                reject(error);
            });
    });
};

// Example

function fakeFetch(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data successfully fetched!")
        }, duration);
    });
};

// Resolves before timeout
async function run() {
    const responseBeforeTimeout = await promiseTimeout(fakeFetch(1000), 2000);
    console.log(responseBeforeTimeout);
    // → Data successfully fetched!

    // Times out
    const responseTimeout = await promiseTimeout(fakeFetch(5000), 2000);
    console.log(responseTimeout);
    // → throws "Promise timeout"
};
run()



// ---------------------------------------------------------
// ---------------------------------------------------------

// Interview Insight (Bonus)
// ---------------------------------------------------------

// This is essentially a manual implementation of Promise.race, but with better clarity and cleanup.


// Alternative using Promise.race (also valid)
// ---------------------------------------------------------
function promiseTimeoutII(promise, timeout) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject("Promise timeout"), timeout)
    });

    return Promise.race([promise], timeoutPromise)
}
// ---------------------------------------------------------