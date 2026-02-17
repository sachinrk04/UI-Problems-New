// Write a function called collectStrings which accepts an object and returns an array of all
// the values in the object that have a typeof string

function collectStrings(obj) {
  let stringArr = [];

  for (let key in obj) {
    if (typeof obj[key] === "string") {
      stringArr.push(obj[key]);
    } else if (typeof obj[key] === "object") {
      stringArr = stringArr.concat(collectStrings(obj[key]));
    }
  }

  return stringArr;
}

const obj = {
  stuff: "foo",
  data: {
    val: {
      thing: {
        info: "bar",
        moreInfo: {
          evenMoreInfo: {
            weMadeIt: "baz",
          },
        },
      },
    },
  },
};

console.log("collectStrings---->", collectStrings(obj)); // ["foo", "bar", "baz"])
