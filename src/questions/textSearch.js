// In browsers, we are able to find specific words or phrases within a webpage by using Ctrl + F (Windows, Linux)
// or ⌘ + F (Mac) and entering the search term. Matches which appear will be highlighted in yellow.

// Let's implement a simple version of a browser's in-webpage search with the difference being we're given a string
// (as opposed to HTML) and search matches appear bolded.

// Given a content string and a query string, implement a function textSearch that finds all case-insensitive
// matches with the query string, wrapping the matches in <b>...</b> tags.

function textSearch(text, query) {
  if (!query) return text;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const queryLength = query.length;

  const ranges = [];
  let i = 0;

  while (i <= text.length - queryLength) {
    if (lowerText.slice(i, i + queryLength) === lowerQuery) {
      ranges.push([i, i + queryLength]);
      i += queryLength;
    } else {
      i++;
    }
  }

  if (!ranges.length) return text;

  const merged = [ranges[0]];
  for (let j = 1; j < ranges.length; j++) {
    const [prevStart, prevEnd] = merged[merged.length - 1];
    const [currStart, currEnd] = ranges[j];

    if (currStart === prevEnd) {
      merged[merged.length - 1][1] = currEnd;
    } else {
      merged.push([currStart, currEnd]);
    }
  }

  let result = "";
  let lastIndex = 0;

  for (const [start, end] of merged) {
    result += text.slice(lastIndex, start);
    result += `<b>${text.slice(start, end)}</b>`;
    lastIndex = end;
  }

  result += text.slice(lastIndex);
  return result;
}

// Examples

console.log(
  "textSearch---->",
  textSearch("The Quick Brown Fox Jumps Over The Lazy Dog", "fox"),
);
// 'The Quick Brown <b>Fox</b> Jumps Over The Lazy Dog'
console.log(
  "textSearch---->",
  textSearch("The hardworking Dog overtakes the lazy dog", "dog"),
);
// 'The hardworking <b>Dog</b> overtakes the lazy <b>dog</b>'
// A character will not match the same query more than once, with letters appearing earlier taking priority.

console.log("textSearch---->", textSearch("aaa", "aa"));
// '<b>aa</b>a'
// This is because the second character cannot be used as a match again.
// Consecutive matches should be combined into a single <b> tag.

console.log("textSearch---->", textSearch("aaaa", "aa"));
// Correct: '<b>aaaa</b>'
// Wrong: '<b>aa</b><b>aa</b>'
