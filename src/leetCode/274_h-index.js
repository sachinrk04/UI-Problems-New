// Given an array of integers citations where citations[i] is the number of citations a researcher received for their ith paper,
// return the researcher's h-index.

// According to the definition of h-index on Wikipedia: The h-index is defined as the maximum value of h such that the given
// researcher has published at least h papers that have each been cited at least h times.

// Example 1:
// Input: citations = [3,0,6,1,5]
// Output: 3

// Explanation: [3,0,6,1,5] means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations
// respectively.
// Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each,
//  their h-index is 3.

// Example 2:
// Input: citations = [1,3,1]
// Output: 1

// ---------------------------------------------------------
// ---------------------------------------------------------
// 🔹 Approach

// A clean and common approach is:
//      Sort the citations in descending order
//      Iterate through the sorted list:
//          For index i, check if citations[i] >= i + 1
//          If yes, we can potentially increase h
//          If not, stop — further papers will have even fewer citations

// Why this works:
// After sorting, the first h papers should all have at least h citations.

// ---------------------------------------------------------
// ---------------------------------------------------------

function hIndex(citations) {
  // Sort citations in descending order
  citations.sort((a, b) => b - a);

  let h = 0;

  for (let i = 0; i < citations.length; i++) {
    if (citations[i] >= i + 1) {
      h = i + 1;
    } else {
      break;
    }
  }

  return h;
}

const citations = [3, 0, 6, 1, 5];

const result = hIndex(citations);
console.log("Result--->", result);

// ---------------------------------------------------------
// ---------------------------------------------------------

// ⏱️ Complexity
// ---------------------------------------------------------
// Time: O(n log n) (due to sorting)
// Space: O(1)(ignoring sort internals)

// ---------------------------------------------------------
// ---------------------------------------------------------
