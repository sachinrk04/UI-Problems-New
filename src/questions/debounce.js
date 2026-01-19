function debounce(cb, wait) {
  let timeoutId;

  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      cb.apply(this, args);
    }, wait);
  };
}

const debouncedSum = debounce((a, b) => {
  console.log(a + b);
}, 400);

debouncedSum(1, 2);
debouncedSum(5, 10);
debouncedSum(5, 12);
debouncedSum(5, 1);
