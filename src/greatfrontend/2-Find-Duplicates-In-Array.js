function findDuplicates(arr) {
  const seen = {};
  const duplicates = {};

  for (let i = 0; i < arr.length; i++) {
    if (seen[arr[i]]) {
      duplicates[arr[i]] = arr[i];
    } else {
      seen[arr[i]] = true;
    }
  }

  return Object.keys(duplicates).length > 0 ? true : false;
}

console.log(findDuplicates([1, 1, 2, 3, 4, 5, 6, 2, 7, 8, 9, 10])); // true
console.log(findDuplicates([10, 7, 0, 0, 9])); // true
