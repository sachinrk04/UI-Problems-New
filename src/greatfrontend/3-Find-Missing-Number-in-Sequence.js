function findMissingNumberInSequence(numbers) {
  const maxNo = Math.max(numbers);
  const missings = [];

  for (let i = 0; i <= maxNo; i++) {
    if (!numbers.includes(i)) missings[missings.length] = i;
  }

  return missings;
}
