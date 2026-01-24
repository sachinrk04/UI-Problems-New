function numberOfArguments(...args) {
  return args.length;
}

console.log("numberOfArguments--->", numberOfArguments()); // 0
console.log("numberOfArguments--->", numberOfArguments(1)); // 1
console.log("numberOfArguments--->", numberOfArguments(2, 3)); // 2
console.log("numberOfArguments--->", numberOfArguments("a", "b", "c")); // 3
