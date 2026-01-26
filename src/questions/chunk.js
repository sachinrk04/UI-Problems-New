function chunk(array, size) {
  let result = [];
  let tempAns = [];

  for (let i = 0; i < array.length; i++) {
    tempAns.push(array[i]);

    if (tempAns.length === size || i === array.length - 1) {
      result.push([...tempAns]);
      tempAns.length = 0;
    }
  }

  return result;
}

const arr = [1, 2, 3, 4, 5];
const size = 2;

const chunked = chunk(arr, size);
console.log("chunkSize---->", chunked);
