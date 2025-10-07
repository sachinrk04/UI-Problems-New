function findMissingNumberInSequence(numbers) {
  const maxNo = Math.max(...numbers);
  const missings = [];

  for (let i = 0; i <= maxNo; i++) {
    if (!numbers.includes(i)) missings[missings.length] = i;
  }

  return missings;
}

console.log(findMissingNumberInSequence([1, 3, 0])); // [2]
console.log(findMissingNumberInSequence([1])); // [9]
console.log(findMissingNumberInSequence([3, 0, 4, 2, 1])); // [7]
