function subtract(...args) {
    let total = args.reduce((a, b) => a - b);

    function inner(...next) {
        if (next.length === 0) return total;

        total = total - next.reduce((a, b) => a - b);

        return inner;
    }

    return inner;
};

console.log(subtract(1)(1, 2)(2, 3)()); // 3
console.log(subtract(1)(1, 2)(2, 3)(4, 5)()); // 4