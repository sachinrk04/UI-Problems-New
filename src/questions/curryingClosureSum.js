function sum(value) {
  function inner(total) {
    return function next(value2 = 0) {
      if (arguments.length === 0) {
        return total;
      }

      return inner(total + value2);
    };
  }

  return inner(value);
}

console.log("1--->", sum(1)()); // 1
console.log("2--->", sum(1)(2)()); // 3
console.log("3--->", sum(1)(2)(-3)()); // 0
console.log("4--->", sum(5)(10)(15)()); // 30

// https://codesandbox.io/p/sandbox/react-snake-game-o11ou?file=%2Fsrc%2FApp.js
