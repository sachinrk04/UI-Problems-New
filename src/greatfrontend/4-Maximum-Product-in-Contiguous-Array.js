function maxProductSubArray(numbers) {
  if (numbers.length === 0) return 0;

  let max = numbers[0];
  let min = numbers[0];
  let result = numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    const current = numbers[i];

    if (current < 0) {
      [max, min] = [min, max]
    }

    max = Math.max(current, max * current)
    min = Math.min(current, min * current)

    result = Math.max(result, max);
  }

  return result;
}

console.log(maxProductSubArray([1, 2, -3, 5, 1])); // 5
console.log(maxProductSubArray([9])); // 9
console.log(maxProductSubArray([1, 2, 0, -1, 8, -4])); // 32
console.log(maxProductSubArray([0])); // 0
console.log(maxProductSubArray([])); // 0
