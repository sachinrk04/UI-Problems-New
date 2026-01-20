Function.prototype.myBind = function(thisArg, ...args) {
    const originalFn = this;

    return function (...callArg) {
        return originalFn.apply(thisArg, [...args, ...callArg]);
    }
};

// Example

const john = {
  age: 42,
  getAge: function () {
    return this.age;
  },
};

const unboundGetAge = john.getAge;
console.log("unboundGetAge--->",unboundGetAge()); // undefined

const boundGetAge = john.getAge.myBind(john);
console.log("boundGetAge--->",boundGetAge()); // 42