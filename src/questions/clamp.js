function clamp(value, lower, upper) {
  if (value < lower) return lower;
  if (value > upper) return upper;
  return value;
}

// One-liner version
const clampOne = (value, lower, upper) =>
  Math.min(Math.max(value, lower), upper);

// Example

console.log("clamp--->", clamp(10, 0, 5)); // 5
console.log("clamp--->", clamp(-3, 0, 5)); // 0
console.log("clamp--->", clamp(3, 0, 5)); // 3
