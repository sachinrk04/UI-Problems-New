// In browsers, we are able to find specific words or phrases within a webpage by using Ctrl + F (Windows, Linux)
// or ⌘ + F (Mac) and entering the search term. Matches which appear will be highlighted in yellow.

// Let's implement a simple version of a browser's in-webpage search with the difference being we're given a string
// (as opposed to HTML) and search matches appear bolded.

// Given a string and an array of queries, implement a function textSearch that finds all case-insensitive matches
// from the queries array within the string, wrapping the matches in <b>...</b> tags.

function textSearchII(text, queries) {
  if (text.length === 0) return "";
  if (queries.length === 0 || queries[0].length === 0) return text;

  const lowerText = text.toLowerCase();
  const ranges = [];

  // 1. Collect all match ranges
  for (const query of queries) {
    const lowerQuery = query.toLowerCase();
    let startIndex = 0;

    while (true) {
      const index = lowerText.indexOf(lowerQuery, startIndex);
      if (index === -1) break;

      ranges.push([index, index + lowerQuery.length]);
      startIndex = index + lowerQuery.length; // no reuse for same query
    }
  }

  if (ranges.length === 0) return text;

  // 2. Sort and merge ranges
  ranges.sort((a, b) => a[0] - b[0]);

  const merged = [];
  for (const [start, end] of ranges) {
    if (merged.length === 0 || start > merged[merged.length - 1][1]) {
      merged.push([start, end]);
    } else {
      merged[merged.length - 1][1] = Math.max(
        merged[merged.length - 1][1],
        end,
      );
    }
  }

  // 3. Build result string
  let result = "";
  let lastIndex = 0;

  for (const [start, end] of merged) {
    result += text.slice(lastIndex, start);
    result += "<b>" + text.slice(start, end) + "</b>";
    lastIndex = end;
  }

  result += text.slice(lastIndex);
  return result;
}

// Examples

console.log(
  "textSearchII---->",
  textSearchII("The Quick Brown Fox Jumps Over The Lazy Dog", ["fox"]),
);
// 'The Quick Brown <b>Fox</b> Jumps Over The Lazy Dog'
console.log(
  "textSearchII---->",
  textSearchII("The quick brown fox jumps over the lazy dog", ["fox", "dog"]),
);
// 'The quick brown <b>fox</b> jumps over the lazy <b>dog</b>'

// If two such queries overlap or are consecutive, they should be wrapped in a single pair of <b> tags.

console.log(
  "textSearchII---->",
  textSearchII("This is Uncopyrightable!", ["copy", "right"]),
);
// 'This is Un<b>copyright</b>able!'
console.log(
  "textSearchII---->",
  textSearchII("This is Uncopyrightable!", ["copy", "right", "table"]),
);
// 'This is Un<b>copyrightable</b>!'

// A character will not match the same query more than once, with earlier letters taking priority.

console.log("textSearchII---->", textSearchII("aaa", ["aa"]));
// '<b>aa</b>a'
// This is because the second character cannot be used as a match again.
console.log("textSearchII---->", textSearchII("aaaa", ["aa"]));
// '<b>aaaa</b>'
