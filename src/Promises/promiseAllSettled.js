// How it works:
// ---------------------------------------------------------

// 1. Wrap every element in Promise.resolve() so even non-promises (like 42) are treated as promises.

// 2. Track results in the same order as the input array.

// 3. Use a completedCount counter to know when all promises have settled.

// 4. Immediately resolve with an empty array if the input is empty.

// 5. Each result object has the form:
//    { status: 'fulfilled', value: ... }
//    { status: 'rejected', reason: ... }

// Time & Space Complexity
// ---------------------------------------------------------
// ---------------------------------------------------------

// Time Complexity
// ---------------------------------------------------------
// We have an array of length n (let’s call it promises.length = n).

// 1. forEach iterates over all n elements → O(n)`.
// 2. For each element, we call Promise.resolve(p) and attach .then/.catch/.finally callbacks.
//    Wrapping a value in Promise.resolve is O(1).
//    Attaching callbacks is O(1).

// The actual asynchronous operation may take longer, but in terms of scheduling the callbacks, it is still O(n) for the array.

// ✅ So the total time complexity is:
// O(n) for scheduling + time taken by the original promises (depends on what the promises do, but that’s outside our control).

// Space Complexity
// ---------------------------------------------------------
// We store:

// 1. results array of length n → O(n).
// 2. Counter completedCount → O(1).
// 3. Temporary promise wrappers (from Promise.resolve) → negligible (just pointers).

// ✅ So the total space complexity is: O(n)

// ---------------------------------------------------------
// ---------------------------------------------------------

function promiseAllSettled(promises) {
    return new Promise((resolve) => {
        if (promises.length === 0) {
            resolve([]);
            return;
        } 

        const results = [];
        let completed = 0;

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then((value) => {
                    results[index] = { status: 'fulfilled', value: value };
                })
                .catch((error) => {
                    results[index] = { status: 'rejected', reason: error };
                })
                .finally(() => {
                    completed++;
                    // When all promises have settled, resolve the main promise
                    if (promises.length === completed) {
                        resolve(results);
                    }
                });
        });
    });
};

// Example

const p0 = Promise.resolve(3);
const p1 = 42;
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('foo');
  }, 100);
});

promiseAllSettled([p0, p1, p2]).then((res) => {
    console.log("promiseAllSettled--->", res)
})