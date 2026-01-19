// How It Works (Step-by-Step)
// ---------------------------------------------------------

// 1. Wrap everything in a new Promise

// 2. Empty array case
//    Immediately reject with AggregateError([])

// 3. Track rejections
//    errors[] stores rejection reasons
//    rejectedCount tracks how many failed

// 4. Promise.resolve(promise)
//    Ensures non-promise values work correctly (just like native Promise.any)

// 5. First fulfillment wins
//    .then(resolve) resolves outer promise immediately

// 6. All rejected
//    Once rejectedCount === promises.length, reject with AggregateError

// ---------------------------------------------------------
// ---------------------------------------------------------

// Time & Space Complexity
// ---------------------------------------------------------

// 1. Time: O(n)
// 2. Space: O(n) (for errors array)

// ---------------------------------------------------------
// ---------------------------------------------------------

function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    const errors = [];
    let rejectedCount = 0;

    if (promises.length === 0) {
      reject(new AggregateErrors(errors));
      return;
    }
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((error) => {
          errors[index] = error;
          rejectedCount++;

          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors));
          }
        });
    });
  });
}

// Example

// Resolves on first success
const p0 = Promise.resolve(42);
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(21);
  }, 100);
});

promiseAny([p0, p1]).then((res) => {
  console.log("Res-first-->", res);
});

// Ignores rejection if any resolves

promiseAny([
  new Promise((res) => setTimeout(() => res(42), 100)),
  Promise.reject("Err!"),
]).then((res) => {
  console.log("Res-Ignores-->", res);
});
