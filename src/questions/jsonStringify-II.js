function jsonStringifyII(value) {
  const seen = new Set();

  function stringify(val) {
    // BigInt
    if (typeof val === "bigint") {
      throw new TypeError("Do not know how to serialize a BigInt");
    }

    // Primitive types
    if (val === null) return "null";

    if (typeof val === "number") {
      return isFinite(val) ? String(val) : "null";
    }

    if (typeof val === "boolean") {
      return String(val);
    }

    if (typeof val === "string") {
      return `"${escapeString(val)}"`;
    }

    if (
      typeof val === "undefined" ||
      typeof val === "function" ||
      typeof val === "symbol"
    ) {
      return undefined;
    }

    // Objects (including arrays)
    if (typeof val === "object") {
      if (seen.has(val)) {
        throw new TypeError("Converting circular structure to JSON");
      }

      seen.add(val);

      // Array
      if (Array.isArray(val)) {
        const res = val.map((item) => {
          const v = stringify(item);
          return v === undefined ? "null" : v;
        });
        seen.delete(val);
        return `[${res.join(",")}]`;
      }

      // Regular object (Map, Set, RegExp also end up here)
      const keys = Object.keys(val);
      const props = [];

      for (const key of keys) {
        const v = stringify(val[key]);
        if (v !== undefined) {
          props.push(`"${escapeString(key)}":${v}`);
        }
      }

      seen.delete(val);
      return `{${props.join(",")}}`;
    }
  }

  return stringify(value);
}

function escapeString(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t")
    .replace(/\b/g, "\\b")
    .replace(/\f/g, "\\f");
}

console.log("jsonStringify-II--->", jsonStringifyII({ foo: "bar" })); // '{"foo":"bar"}'
console.log(
  "jsonStringify-II--->",
  jsonStringifyII({ foo: "bar", bar: [1, 2, 3] }),
); // '{"foo":"bar",bar:[1,2,3]}'
console.log("jsonStringify-II--->", jsonStringifyII()); // undefined
console.log("jsonStringify-II--->", jsonStringifyII(undefined)); // undefined
console.log("jsonStringify-II--->", jsonStringifyII(null)); // 'null'
console.log("jsonStringify-II--->", jsonStringifyII(true)); // 'true'
console.log("jsonStringify-II--->", jsonStringifyII(false)); // 'false'
console.log("jsonStringify-II--->", jsonStringifyII(1)); // '1'
console.log("jsonStringify-II--->", jsonStringifyII(Infinity)); // 'null'
console.log("jsonStringify-II--->", jsonStringifyII(NaN)); // 'null'
console.log("jsonStringify-II--->", jsonStringifyII("foo")); // '"foo"'
console.log("jsonStringify-II--->", jsonStringifyII('"foo"') === '"\\"foo\\""'); // Double quotes present in the original input are escaped using backslashes
console.log("jsonStringify-II--->", jsonStringifyII(Symbol("foo"))); // undefined
console.log(
  "jsonStringify-II--->",
  jsonStringifyII(() => {}),
); // undefined
console.log("jsonStringify-II--->", jsonStringifyII(["foo", "bar"])); // '["foo","bar"]'
console.log("jsonStringify-II--->", jsonStringifyII(/foo/)); // '{}'
console.log("jsonStringify-II--->", jsonStringifyII(new Map())); // '{}'
console.log("jsonStringify-II--->", jsonStringifyII(new Set())); // '{}'
