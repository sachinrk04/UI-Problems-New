// Currying is the technique of converting a function that takes multiple arguments into a sequence of functions
// that each takes a single argument.

// Implement the curry function which accepts a function as the only argument and returns a function that accepts
// single arguments and can be repeatedly called until at least the minimum number of arguments have been
// provided (determined by how many arguments the original function accepts). The initial function argument is then
// invoked with the provided arguments.

function curryingI(func) {
  return function curried(...args) {
    const context = this;

    if (args.length >= func.length) {
      return func.apply(context, args);
    }

    return function (...nextArgs) {
      return curried.apply(context, args.concat(nextArgs));
    };
  };
}

// Examples

function add(a, b) {
  return a + b;
}

const curriedAdd = curryingI(add);
console.log("curriedAdd---->", curriedAdd(3)(4)); // 7

const alreadyAddedThree = curriedAdd(3);
console.log("alreadyAddedThree---->", alreadyAddedThree(4)); // 7

function multiplyThreeNumbers(a, b, c) {
  return a * b * c;
}

const curriedMultiplyThreeNumbers = curryingI(multiplyThreeNumbers);
console.log(
  "curriedMultiplyThreeNumbers---->",
  curriedMultiplyThreeNumbers(4)(5)(6)
); // 120

const containsFour = curriedMultiplyThreeNumbers(4);
const containsFourMulFive = containsFour(5);
console.log("containsFourMulFive---->", containsFourMulFive(6)); // 120
