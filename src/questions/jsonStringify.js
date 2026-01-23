function jsonStringify(value) {
    // null
    if (value === null) return null;

    // boolean and number
    if (typeof value === "boolean" || typeof value === "number") {
        return String(value);
    }

    // String
    if (typeof value === "string") {
        return `"${value}"`
    }

    // Array
    if (Array.isArray(value)) {
        const items = value.map(item => jsonStringify(item));
        return `[${items.join(",")}]`
    }

    // object
    if (typeof value === "object") {
        const entries = Object.keys(value).map(key => {
            const keyName = `"${key}"`;
            const keyValue = jsonStringify(value[key]);
            return `${keyName}:${keyValue}`;
        })
        return `{${entries.join(",")}}`;
    }
}

// Example


console.log("jsonStringify---->", jsonStringify({ foo: 'bar' })); // '{"foo":"bar"}'
console.log("jsonStringify---->", jsonStringify({ foo: 'bar', bar: [1, 2, 3] })); // '{"foo":"bar","bar":[1,2,3]}'
console.log("jsonStringify---->", jsonStringify({ foo: true, bar: false })); // '{"foo":true,"bar":false}'

console.log("jsonStringify---->", jsonStringify(null)); // 'null'
console.log("jsonStringify---->", jsonStringify(true)); // 'true'
console.log("jsonStringify---->", jsonStringify(false)); // 'false'
console.log("jsonStringify---->", jsonStringify(1)); // '1'
console.log("jsonStringify---->", jsonStringify('foo')); // '"foo"'