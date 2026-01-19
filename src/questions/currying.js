const sum = (a) => {
  return function (b) {
    return b ? sum(a + b) : a;
  };
};

const curriedSum = sum(1)(2)(3)(4)(5)(6)(7)(8)(9)(10)(); // 55

console.log("curriedSum-->", curriedSum); // 55
