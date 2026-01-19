// Explanation
// ---------------------------------------------------------

// 1. Promise.reject(reason) always returns a new Promise
// 2. The promise is immediately rejected with the given reason
// 3. Even if reason itself is a Promise, it is not unwrapped

// ---------------------------------------------------------
// ---------------------------------------------------------

function promiseReject(reason) {
  return new Promise((_, reject) => {
    reject(reason);
  });
}

// Example:
promiseReject("Mayday!").catch((err) => {
  console.log(err); // Mayday!
});
