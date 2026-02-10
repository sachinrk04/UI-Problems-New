// Given a list of strings, implement a function listFormat that returns the items concatenated into a single string. 
// A common use case would be in summarizing the reactions for social media posts.

// The function should support a few options as the second parameter:

//    1. sorted: Sorts the items by alphabetical order.
//    2. length: Show only the first length items, using "and X other(s)" for the remaining. Ignore invalid values (negative, 0, etc).
//    3. unique: Remove duplicate items.

function listFormat(items, options) {
  const { sorted = false, length, unique = false } = options || {};
  
  items = items.filter((item) => typeof item === "string" && item.trim() !== "")

  if (unique) {
    items = [...new Set(items)];
  }

  if (sorted) {
    items = [...items].sort((a, b) => a.localeCompare(b));
  }

  const total = items.length;
  let viewItems = items;
  let remainingItem = 0;

  if (length && length > 0 &&  total > length) {
    viewItems = items.slice(0, length);
    remainingItem = total - length;
  }

  if (viewItems.length === 0) return '';
  if (viewItems.length === 1) return viewItems[0];

  if (remainingItem > 0) {
    const othersText = remainingItem === 1 ? "1 other" : `${remainingItem} others`
    return `${viewItems.join(", ")} and ${othersText}`;
  }

  return `${viewItems.slice(0, -1).join(", ")} and ${viewItems[viewItems.length - 1]}`
}

// Examples

console.log("listFormat--->", listFormat([])); // ''

console.log("listFormat--->", listFormat(['Bob'])); // 'Bob'
console.log("listFormat--->",listFormat(['Bob', 'Alice']));  // 'Bob and Alice'

console.log("listFormat--->", listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John']));
// 'Bob, Ben, Tim, Jane and John'

console.log("listFormat--->", listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
  length: 3,
})); // 'Bob, Ben, Tim and 2 others'

console.log("listFormat--->", listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
  length: 4,
})); // 'Bob, Ben, Tim, Jane and 1 other'

console.log("listFormat--->", listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
  length: 3,
  sorted: true,
})); // 'Ben, Bob, Jane and 2 others'

console.log("listFormat--->", listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John', 'Bob'], {
  length: 3,
  unique: true,
})); // 'Bob, Ben, Tim and 2 others'

console.log("listFormat--->", listFormat(['Bob', 'Ben', 'Tim', 'Jane', 'John'], {
  length: 3,
  unique: true,
})); // 'Bob, Ben, Tim and 2 others'

console.log("listFormat--->", listFormat(['Bob', 'Ben', '', '', 'John'])); // 'Bob, Ben and John'