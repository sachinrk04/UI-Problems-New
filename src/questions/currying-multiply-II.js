function multiply(...args) {
    let total = args.reduce((a, b) => a * b, 1);

    function inner(...next) {
        if (next.length === 0) return total;

        total *= next.reduce((a, b) => a * b, 1);

        return inner;
    }

    return inner;
}

console.log(multiply(2)(3)(4)());       // 2 * 3 * 4 = 24
console.log(multiply(2, 3)(4, 5)());    // 2 * 3 * 4 * 5 = 120
console.log(multiply(1, 2, 3)());       // 1 * 2 * 3 = 6