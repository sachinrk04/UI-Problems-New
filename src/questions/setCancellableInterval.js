function setCancellableInterval(callback, delay, ...args) {
  const id = setInterval(callback, delay, ...args);

  return function cancel() {
    clearInterval(id);
  };
}

// Example

let i = 0;
// t = 0:
const cancel = setCancellableInterval(() => {
  i++;
}, 10);
// t = 10: i is 1
// t = 20: i is 2
// cancel(); // Called at t = 25
setTimeout(() => {
  cancel();
  console.log(i); // stops increasing after this
}, 25);
// t = 30: i is still 2 because cancel() was called and the interval callback has stopped running.
