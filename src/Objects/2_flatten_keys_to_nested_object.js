// Unflatten Nested Keys
// Write a function which converts flat object input into a nested object.

// Input: 
// {
//   "a_b_c": 3,
//   "a_b_d": 2,
// }

// Output:
// {
//   a: {
//     b: {
//       c: 3,
//       d: 2
//     }
//   }
// }


// ---------------------------------------------------------
// ---------------------------------------------------------
// Approach Name
// ---------------------------------------------------------
// Iterative Path Construction (Object Path Building)
// (Also known as: Unflatten Object using Path Traversal)

// ---------------------------------------------------------
// ---------------------------------------------------------
// Algorithm Steps
// ---------------------------------------------------------
//  1. Create an empty result object → result = {}
//  2. Loop through each key in the input object
//  3. Split the key using _ → ["a", "b", "c"]
//  4. Keep a reference pointer → current = result
//  5. Traverse through all parts except the last one
//          If the key doesn’t exist → create {}
//          Move current to that nested object
//  6. Assign the value to the last key
//  7. Return result
// ---------------------------------------------------------
// ---------------------------------------------------------

function nestedObject(obj) {
    const result = {};

    for (const key in obj) {
        const keys = key.split("_");
        let current = result;

        for (let i = 0; i < keys.length; i++) {
            if (i === keys.length - 1) {
                current[keys[i]] = obj[key];
            } else {
                current[keys[i]] = current[keys[i]] ||  {};
                current = current[keys[i]];
            }
        }
    }

    return result;
}

// ---------------------------------------------------------
// Example
const input = {
  "a_b_c": 3,
  "a_b_d": 2,
};
// ---------------------------------------------------------
console.log("nestedObject--->", nestedObject(input));
// ---------------------------------------------------------
// ---------------------------------------------------------
// Complexity
// ---------------------------------------------------------
// Time	    O(n × k)
// Space	O(n × k)

// ---------------------------------------------------------
// ---------------------------------------------------------
