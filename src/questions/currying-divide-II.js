function divide(...args) {
  let total = args.reduce((a, b) => a / b);

  function inner(...next) {
    if (next.length === 0) return total;

    total = total / next.reduce((a, b) => a / b);

    return inner;
  }

  return inner;
}

console.log(divide(10, 2)(3)()); // (10/2)/3 -> 5/3 = 1.6666666666666667
console.log(divide(100, 2)(5, 3)()); // (100/2)/(5/3)  -> 50/1.6666666666666667 = 30
