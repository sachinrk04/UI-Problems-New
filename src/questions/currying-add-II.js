function sum(...args) {
    let total = args.reduce((a, b) => a + b, 0);

    function inner(...next) {
        if (next.length === 0) {
            return total;
        }

        total = total + next.reduce((a, b) => a + b, 0);
        return inner;
    }

    return inner;
}

console.log(sum(1)(1, 2)(2, 3)()); // 9
console.log(sum(1)(1, 2)(2, 3)(4, 5)()); // 18