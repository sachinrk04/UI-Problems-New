const memoization = (fun) => {
    const cache = {};

    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) return cache[key];
        const output = fun(...args);
        cache[key] = output;
        return output;
    };
};

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2); 
}

const memoizedFibonacci = memoization(fibonacci)

console.time("fibonacci(10)")
console.log("fibonacci(10)--->", memoizedFibonacci(10))
console.timeEnd("fibonacci(10)")
console.time("fibonacci(20)")
console.log("fibonacci(20)--->", memoizedFibonacci(40))
console.timeEnd("fibonacci(20)")