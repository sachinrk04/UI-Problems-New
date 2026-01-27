// Implement a function makeCounter that accepts an optional integer value (defaults to 0) and returns an object
// that contains the following methods:

//      get(): returns the current value.
//      increment(): increments the current value and returns it.
//      decrement(): decrements the current value and returns it.
//      reset(): resets the current value to the initial value.

function makeCounter(initialValue = 0) {
  let current = initialValue;

  return {
    get() {
      return current;
    },

    increment() {
      current += 1;
      return current;
    },

    decrement() {
      current -= 1;
      return current;
    },

    reset() {
      current = initialValue;
      return current;
    },
  };
}

const counter = makeCounter();
console.log("counter-get--->", counter.get()); // 0
console.log("counter-increment--->", counter.increment()); // 1
console.log("counter-increment--->", counter.increment()); // 2
console.log("counter-get--->", counter.get()); // 2
console.log("counter-reset--->", counter.reset()); // 0
console.log("counter-decrement--->", counter.decrement()); // -1

console.log('-----------------------------------------------------------')

const counterCustom = makeCounter(5);
console.log("counterCustom-get--->", counterCustom.get()); // 0
console.log("counterCustom-increment--->", counterCustom.increment()); // 1
console.log("counterCustom-increment--->", counterCustom.increment()); // 2
console.log("counterCustom-get--->", counterCustom.get()); // 2
console.log("counterCustom-reset--->", counterCustom.reset()); // 0
console.log("counterCustom-decrement--->", counterCustom.decrement()); // -1
