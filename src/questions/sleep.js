// Why this works (step-by-step)
// ---------------------------------------------------------

// 1. setTimeout is non-blocking
//    It schedules a callback and immediately returns.
//    The callback runs later via the event loop.

// 2. Promises represent future completion
//    resolve() marks the Promise as fulfilled.
//    Anything waiting on the Promise continues afterward.

// 3. await pauses only the async function
//    It does not block the main thread.
//    JS continues running other tasks.

// ---------------------------------------------------------
// ---------------------------------------------------------

function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    });
};

// Example
// ---------------------------------------------------------

console.log('Hello!');
sleep(2000).then(() => {
  console.log('Bye.'); // Only logs after 2000 milliseconds (2 seconds)
});

// ---------------------------------------------------------

async function greeting() {
  console.log('Hello!');
  await sleep(2000);
  console.log('Bye.'); // Only logs after 2000 milliseconds (2 seconds)
}

greeting();
// t = 0: Hello!
// t = 2000: Bye.