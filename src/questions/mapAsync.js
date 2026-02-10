// By now you'd be familiar with mapping of elements in an array. If you aren't, please first do the Array.prototype.map 
// question first.

// What if the mapping function is not a synchronous function i.e. it returns a promise? Array.prototype.map assumes 
// the mapping function is synchronous and will fail to work properly.

// Implement a function mapAsync that accepts an array of items and maps each element with an asynchronous mapping 
// function. The function should return a Promise which resolves to the mapped results.

function mapAsync(iterable, callbackFn) {
  return Promise.all(iterable.map(callbackFn))
}

// Examples

const asyncDouble  = (x) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(Number(x) * 2);
    }, 10);
  });

(async function run() {
    const doubled = await mapAsync([1, 2], asyncDouble);
    console.log("mapAsync--->", doubled); // [2, 4]
})()