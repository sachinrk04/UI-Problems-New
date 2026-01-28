// Implement a function inRange(value, [start=0], end) to check if a number value is between start and up to, but not 
// including, end. If only 2 arguments are specified, the second argument becomes end and start is set to 0. 
// If start is greater than end, the parameters are swapped to support negative ranges.

// Arguments
//      1. value (number): The number to check.
//      2. [start=0] (number): The start of the range.
//      e3. nd (number): The end of the range (not including).

// Returns
// (boolean): Returns true if value is in the range, else false.

function inRange(value, start, end) {
    if (end === undefined) {
        end = start;
        start = 0;
    }

    if (start > end) {
        [start, end] = [end, start];
    }

    return value >= start && value < end;
}

// Example

console.log("inRange--->", inRange(3, 2, 4)); // => true
console.log("inRange--->", inRange(4, 8)); // => true
console.log("inRange--->", inRange(4, 2)); // => false
console.log("inRange--->", inRange(2, 2)); // => false
console.log("inRange--->", inRange(1.2, 2)); // => true
console.log("inRange--->", inRange(5.2, 4)); // => false
console.log("inRange--->", inRange(-3, -2, -6)); // => true
