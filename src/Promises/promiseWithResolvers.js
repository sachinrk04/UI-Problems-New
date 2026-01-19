// How it works (brief)
// ---------------------------------------------------------

// 1. Creates a new Promise
// 2. Captures its internal resolve and reject functions
// 3. Returns all three so the promise can be settled externally

// ---------------------------------------------------------
// ---------------------------------------------------------

function promiseWithResolvers() {
  let resolve;
  let reject;

  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

// Example
// ---------------------------------------------------------
// ---------------------------------------------------------

// Success case:
// ---------------------------------------------------------
const { promise, resolve, reject } = promiseWithResolvers();
resolve("Success!");
promise.then((result) => console.log("Success---->", result)); // Success!
// ---------------------------------------------------------

// Timeout example:
// ---------------------------------------------------------
function timeoutPromise(duration) {
  const { promise, resolve, reject } = promiseWithResolvers();

  setTimeout(() => reject(new Error("Timeout")), duration);
  return promise;
}

timeoutPromise(2000).catch((error) =>
  console.log("Timeout--->", error.message),
);

// ---------------------------------------------------------
