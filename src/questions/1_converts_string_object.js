// Write a function which converts string input into an object
// Input: ("a.b.c", "someValue");

// Output:
// {
//   a: {
//     b: {
//       c: "someValue"
//     }
//   }
// }

function convertToNestedObject(path, value) {
  let keys = path.split(".");

  let result = {};
  let current = result;

  for (let i = 0; i < keys.length; i++) {
    if (i === keys.length - 1) {
      current[keys[i]] = value;
    } else {
      current[keys[i]] = {};
      current = current[keys[i]];
    }
  }

  return result;
}

const output = convertToNestedObject("a.b.c.d", "someValue");
console.log("OUTPUT--->", output);
