// Implement a function setCancellableTimeout, that acts like setTimeout but instead of
// returning a timer ID, it returns a function that when called, cancels the pending
// callback function. The setCancellableTimeout function should have the exact same signature
// as setTimeout:

// setCancellableTimeout(callback);
// setCancellableTimeout(callback, delay);
// setCancellableTimeout(callback, delay, param1);
// setCancellableTimeout(callback, delay, param1, param2);
// setCancellableTimeout(callback, delay, param1, param2, /* … ,*/ paramN);

function setCancellableTimeout(callback, delay, ...args) {
  const timerId = setTimeout(callback, delay, ...args);

  return function cancel() {
    clearTimeout(timerId);
  };
}

// Examples

// let i = 0;
// // t = 0:
// const cancel = setCancellableTimeout(
//   (msg) => console.log(msg),
//   i,
//   "Hello World",
// );
// // t = 50:
// cancel("msg");
// // t = 100: i is still 0 because cancel() was called.

setCancellableTimeout(() => console.log("Hi"), 2000);
