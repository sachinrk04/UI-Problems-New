// Implement the curry function which accepts a function as the only argument and returns a function
// that accepts a variadic number of arguments and returns a function which can be repeatedly called.

// Expected output behavior
// When the returned function is in an expression that suggests the value should be a string or a number,
// the initial function argument is then invoked with the provided arguments and the result is used as the value.

function curryingIII(func) {
  function build(context, collected) {
    function next(...args) {
      if (args.length === 0) return next;
      return build(context, collected.concat(args));
    }

    next.valueOf = () => func.apply(context, collected);
    return next;
  }

  return function curried(...args) {
    return build(this, args);
  };
}

// Example
function multiply(...numbers) {
  return numbers.reduce((a, b) => a * b, 1);
}
const curriedMultiply = curryingIII(multiply);
const multiplyByThree = curriedMultiply(3);
// console.log("multiplyByThree-3-->", +multiplyByThree); // 3
// console.log("multiplyByThree-4-->", +multiplyByThree(4)); // 12

const multiplyByFifteen = multiplyByThree(5);
console.log("multiplyByFifteen-5-->", +multiplyByFifteen); // 15
console.log("multiplyByFifteen-2-->", +multiplyByFifteen(2)); // 30

console.log("curriedMultiply--->", +curriedMultiply(1)(2)(3)(4)); // 24
console.log("curriedMultiply--->", +curriedMultiply(1, 2, 3, 4)); // 24
