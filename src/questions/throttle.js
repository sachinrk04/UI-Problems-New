function throttle(func, wait) {
  let timeoutId;

  return function (...args) {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        func(...args);
        timeoutId = null;
      }, wait);
    }
  };
}

function sum(a, b) {
  console.log(a + b);
}

const throttledIncrement = throttle(sum, 100);

throttledIncrement(1, 2); // t=0   → i = 1
throttledIncrement(1, 3); // t=50  → ignored → i = 1
throttledIncrement(1, 4); // t=101 → allowed → i = 2
