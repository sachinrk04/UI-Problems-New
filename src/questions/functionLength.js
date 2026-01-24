function functionLength(fn) {
  return fn.length;
}

function foo() {}
function bar(a) {}
function baz(a, b) {}

console.log("foo--->", functionLength(foo)); // 0
console.log("foo--->", functionLength(bar)); // 1
console.log("foo--->", functionLength(baz)); // 2
