// In Map Async, we wrote a function that accepts an array of items and maps each element with an asynchronous mapping 
// function and returns a Promise which resolves to the mapped results.

// Practically, this can be used for mapping an input array with the results of calling an API where the input element 
// is the argument to the API. However, if your array has a large amount of items, you'd be making that many API calls 
// at the same time which will almost certainly get you rate limited by the API service. We want to execute our tasks 
// concurrently so that it is more efficient while staying within the rate limits of the API.

// Implement a mapAsyncLimit function that takes in an optional parameter size, the maximum number of ongoing async 
// tasks so that the input array can be processed in chunks of size, achieving parallelism while staying within the 
// provided limit. If size is not specified, the chunk size is unlimited.

function mapAsyncLimit(iterable, callbackFn, size) {
  if (!size || size <= 0 || size >= iterable.length) {
    return Promise.all(iterable.map(callbackFn));
  }

  const results = new Array(iterable.length);
  let nextIndex = 0;

  async function helper() {
    while(nextIndex < iterable.length) {
        const currentIndex = nextIndex++;
        results[currentIndex] = await callbackFn(iterable[currentIndex], currentIndex)
    }
  }

  const helpers = Array.from({length: size}, () => helper());

  Promise.all(helpers);

  return results;
}

// Examples

async function fetchUpperCase(q) {
  // Fake API service that converts a string to uppercase.
  const res = await fetch('https://uppercase.com?q=' + encodeURIComponent(q));
  return await res.text();
}

// Only a maximum of 2 pending requests at any one time.
(async function run() {
    const results = await mapAsyncLimit(
      ['foo', 'bar', 'qux', 'quz'],
      fetchUpperCase,
      2,
    );
    console.log(results); // ['FOO', 'BAR', 'QUX', 'QUZ'];
})()