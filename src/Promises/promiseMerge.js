// Key idea
// ---------------------------------------------------------

// 1. Wait for both promises using Promise.all.
// 2. If any promise rejects, the returned promise rejects automatically with the same reason.
// 3. After both fulfill:
//    Ensure both values have the same supported type
//    Merge based on type
//    Otherwise reject with 'Unsupported data types'

// ---------------------------------------------------------
// ---------------------------------------------------------

function promiseMerge(p1, p2) {
  return Promise.all([p1, p2]).then(([a, b]) => {
    const typeA = Object.prototype.toString.call(a);
    const typeB = Object.prototype.toString.call(b);
    console.log("typeA--->", typeA, typeB);
    if (typeA !== typeB) {
      return Promise.reject("Unsupported data types");
    }

    if (typeof a === "number") {
      return a + b;
    }

    if (typeof a === "string") {
      return a + b;
    }

    if (Array.isArray(a)) {
      return [...a, ...b];
    }

    if (typeA === "[object Object]") {
      return { ...a, ...b };
    }

    return Promise.reject("Unsupported data types");
  });
}

// promiseMerge(Promise.resolve(1), Promise.resolve(2)).then((res) => {
//   console.log("Res-Number-->", res);
// }); // 3

// promiseMerge(Promise.resolve("abc"), Promise.resolve("def")).then((res) => {
//   console.log("Res-String-->", res);
// }); // 'abcdef'

// promiseMerge(Promise.resolve([1, 2, 3]), Promise.resolve([4, 5, 6])).then(
//   (res) => {
//     console.log("Res-Array-->", res);
//   },
// ); // [1, 2, 3, 4, 5, 6]

promiseMerge(Promise.resolve({ foo: 1 }), Promise.resolve({ bar: 2 })).then(
  (res) => {
    console.log("Res-Object-->", res);
  },
); // { foo: 1, bar: 2}

// promiseMerge(Promise.resolve(1), Promise.resolve([])).then((res) => {
//   console.log("Res-Number and Array-->", res);
// }); // Rejected with 'Unsupported data types'

// promiseMerge(Promise.reject(1), Promise.resolve(2)).then((res) => {
//   console.log("Res-Number-->", res);
// }); // Rejected with 1
