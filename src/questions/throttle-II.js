//True throttle (immediate execution)
function throttleII(func, wait) {
  let lastCall = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall < wait) return;
    lastCall = now;
    func(...args);
  };
}

function sumII(a, b) {
  console.log("sumII-->", a + b);
}

const throttledIncrement = throttleII(sumII, 100);

throttledIncrement(1, 2); // t=0   → i = 1
throttledIncrement(1, 3); // t=50  → ignored → i = 1
throttledIncrement(1, 4); // t=101 → allowed → i = 2

// ---------------------------------------------------------
// ---------------------------------------------------------

// If you want both (leading + trailing)
// If you want both (leading + trailing) execution, you can use the following code:

function throttleIII(func, wait) {
  let lastCall = 0;
  let timeoutId;

  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= wait) {
      lastCall = now;
      func(...args);
    } else {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        func(...args);
      }, wait - (now - lastCall));
    }
  };
}

const sumIII = (a, b) => {
  console.log("sumIII-->", a + b);
};

const throttledIncrementIII = throttleIII(sumIII, 100);

throttledIncrementIII(1, 2); // t=0   → i = 1
throttledIncrementIII(1, 3); // t=50  → ignored → i = 1
throttledIncrementIII(1, 4); // t=101 → allowed → i = 2
