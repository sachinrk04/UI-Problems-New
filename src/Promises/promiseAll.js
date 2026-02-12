// Explanation (step-by-step)
// ---------------------------------------------------------

// 1. Wrap everything in a new Promise
//    This lets us control when to resolve or reject.

// 2. Handle non-promises
//    Promise.resolve(promise) converts values like 42 into resolved promises.

// 3. Preserve order
//    Results are stored using the original index, not completion order.

// 4. Resolve only when all finish
//    A counter tracks how many promises have resolved.

// 5. Fail fast
//    The first rejection immediately rejects the outer promise.

// 6. Edge case
//    Empty array resolves immediately with [].

// ---------------------------------------------------------
// ---------------------------------------------------------

// Time & Behavior
// ---------------------------------------------------------

// 1. Concurrency: All promises run in parallel
// 2. Time Complexity: O(n)
// 3. Matches native Promise.all behavior

// ---------------------------------------------------------
// ---------------------------------------------------------

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value; // preserve order
          completed++;

          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err); // reject immediately on first failure
        });
    });
  });
}

// Resolved example.
const p0 = Promise.resolve(5);
const p1 = 42;
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 100);
});

// const output = await promiseAll([p0, p1, p2]); // [3, 42, 'foo']
// console.log("output--->",  output);

promiseAll([p0, p1, p2])
  .then((output) => console.log("output--->", output))
  .catch ((err) => console.log("error--->", err))

async function run() {
  try {
    const output = await promiseAll([p0, p1, p2]);
    console.log("output-run-->", output);
  } catch (err) {
    console.log("error--->", err);
  }
}

run();
