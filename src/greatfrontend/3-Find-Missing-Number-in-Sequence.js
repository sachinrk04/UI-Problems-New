function findMissingNumberInSequence(numbers) {
  let missings;

  for (let i = 0; i <= numbers.length; i++) {
    if (!numbers.includes(i)) {
      missings = i;
      break;
    }
  }

  return missings;
}

console.log(findMissingNumberInSequence([1, 3, 0])); // 2
console.log(findMissingNumberInSequence([1])); // 0
console.log(findMissingNumberInSequence([3, 0, 4, 2, 1])); // 5
