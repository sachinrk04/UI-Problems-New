// classnames is a commonly-used utility in modern front end applications to conditionally join CSS class names together. 
// If you've written React applications, you likely have used a similar library.

// Implement the classnames function.

function classNames(...args) {
    const result = [];
    const helper = (value) => {
        if (!value) return;

        if (typeof value === 'number') {
            result.push(value);
            return;
        }

        if (typeof value === 'string') {
            result.push(value);
            return;
        }

        if (Array.isArray(value)) {
            value.forEach(helper);
            return;
        }

        if (typeof value === 'object') {
            for (const key in value) {
                if (value[key]) {
                    result.push(key);
                }
            }
        }
    };

    args.forEach(helper);

    return result.join(' ')
}

// Examples

console.log("className--->", classNames('foo', 'bar')); // 'foo bar'
console.log("className--->", classNames('foo', { bar: true })); // 'foo bar'
console.log("className--->", classNames({ 'foo-bar': true })); // 'foo-bar'
console.log("className--->", classNames({ 'foo-bar': false })); // ''
console.log("className--->", classNames({ foo: true }, { bar: true })); // 'foo bar'
console.log("className--->", classNames({ foo: true, bar: true })); // 'foo bar'
console.log("className--->", classNames({ foo: true, bar: false, qux: true })); // 'foo qux'

// Arrays will be recursively flattened as per the rules above.

console.log("className--->", classNames('a', ['b', { c: true, d: false }])); // 'a b c'

// Values can be mixed.

console.log("className--->", classNames(
  'foo',
  {
    bar: true,
    duck: false,
  },
  'baz',
  { quux: true },
)); // 'foo bar baz quux'

// Falsey values are ignored.

console.log("className--->", classNames(null, false, 'bar', undefined, { baz: null }, '')); // 'bar'
console.log("className--->", classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '')); // 'bar 1'