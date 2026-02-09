// The Array.prototype.concat method on JavaScript arrays is used to merge two or more arrays. This method does not 
// change the existing arrays, but instead returns a new array.

// Implement Array.prototype.concat. To avoid overwriting the actual Array.prototype.concat which is being used by 
// the autograder, we shall instead implement it as Array.prototype.myConcat.

Array.prototype.myConcat = function(...items) {
    const result = [...this];

    const helperFunc = (values) => {
        for (let i = 0; i < values.length; i++) {
            let value = values[i];
    
            if( Array.isArray(value)) {
                helperFunc(value)
            } else {
                result.push(value);
            }
        }
    }

    helperFunc(items);

    return result;
}

// Examples

console.log("myConcat--->", [1, 2, 3].myConcat([4, 5, 6])); // [1, 2, 3, 4, 5, 6]
console.log("myConcat--->", [1, 2, 3].myConcat(4, 5, 6)); // [1, 2, 3, 4, 5, 6]
console.log("myConcat--->", [1, 2, 3].myConcat(4, [5, 6])); // [1, 2, 3, 4, 5, 6]