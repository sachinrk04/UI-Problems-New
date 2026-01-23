function cycle(...values) {
  let i = 0;

  return function () {
    const val = values[i];
    console.log("val---->", val);
    i = (i + 1) % values.length;
    console.log("i---->", i);
    return val;
  };
}

// const helloFn = cycle("hello");
// console.log("helloFn--->", helloFn()); // "hello"
// console.log("helloFn--->", helloFn()); // "hello"

const onOffFn = cycle("on", "off", "NO", "TEST");
console.log("onOffFn--->", onOffFn()); // "on"
console.log("onOffFn--->", onOffFn()); // "off"
console.log("onOffFn--->", onOffFn()); // "NO"
console.log("onOffFn--->", onOffFn()); // "TEST"
