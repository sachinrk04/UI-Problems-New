// How it works:
// ---------------------------------------------------------

// 1. Return a new function that wraps the original callback-based function.

// 2. When the returned function is called, collect all arguments except the callback using rest parameters (...args).

// 3. Create and return a new Promise — this Promise will replace the callback.

// 4. Call the original function with:
//    - the original arguments
//    - plus an injected callback as the last argument.

// 5. The injected callback follows the Node.js error-first convention:
//    (err, value) => { ... }

// 6. If `err` is not null or undefined, immediately reject the Promise with `err`.

// 7. If `err` is null, resolve the Promise with the returned `value`.

// 8. Use fn.call(this, ...) to preserve the original `this` context, so object methods continue to work correctly.

// 9. Once resolve or reject is called, the Promise is settled, and `await` resumes execution.


// Time & Space Complexity
// ---------------------------------------------------------
// ---------------------------------------------------------

// Time Complexity: O(1)
// ---------------------------------------------------------
// Why?
// ---------------------------------------------------------
// 1. promisify(fn) returns a function → constant work
// 2. Each call to the promisified function:
//    Creates one Promise
//    Attaches one callback
//    Makes one function call
// 3. No loops
// 4. No recursion
// 5. No iteration over input data

// 📌 The execution time of the original async function is not counted, since it’s external.


// Space Complexity: O(1)
// ---------------------------------------------------------
// Whu?
// ---------------------------------------------------------
// 1. One Promise object
// 2. ne callback function
// 3. A small closure capturing:
//    fn
//    resolve
//    reject
// 4. No growing data structures

// Memory usage does not scale with input size

// ---------------------------------------------------------
// Summary Table
// ---------------------------------------------------------
// | Metric | Complexity | Explanation                   |
// | ------ | ---------- | ----------------------------- |
// | Time   | **O(1)**   | Fixed amount of wrapper logic |
// | Space  | **O(1)**   | Single Promise + callback     |

// ---------------------------------------------------------
// Interview-ready one-liner
// ---------------------------------------------------------
// promisify runs in constant time and space because it only wraps a function call without iterating over inputs or storing results.

// ---------------------------------------------------------
// ---------------------------------------------------------

function promisify(func) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            func.call(this, ...args, (error, value) => {
                if (error) reject(error);
                else resolve(value);
            });
        }) ;
    };
};

// Example function with callback as last argument
// The callback has the signature `(err, value) => any`

function apiCall(url, options) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url} with ${JSON.stringify(options)}`);
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
}

function foo(url, options, callback) {
  apiCall(url, options)
    .then((data) => callback(null, data))
    .catch((err) => callback(err));
}

const promisifiedFoo = promisify(foo);
promisifiedFoo('example.com', { foo: 1 })
    .then((res) => {
    console.log("promisify---->", res)
    })
    .catch((error) => {
        console.log("error--->", error)
    })