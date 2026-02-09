// In classnames, we implemented classnames, a commonly-used utility in modern front end applications to conditionally
// join CSS class names together. However, there are some cases that the library does not do:

//-------------------------------------------------------------------------------------------------------------
//      Case	                    Example	                                    Original	      Improved
//-------------------------------------------------------------------------------------------------------------
//      De-duplicate classnames	    classNames('foo', 'foo)	                    'foo foo'	       'foo'
//      Turn off classnames	        classNames('foo', 'bar', { foo: false })	'foo bar'	        'bar'
//      Function values	            classNames(() => 'foo')	                    Unsupported	        'foo'
//-------------------------------------------------------------------------------------------------------------

// Implement an improved version of the classnames function that handles the above cases.

function classNames(...args) {
  const map = new Map();

  const helper = (value) => {
    if (!value) return "";

    if (typeof value === "function") {
      helper(value());
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(helper);
      return;
    }

    if (typeof value === "object") {
      for (const key in value) {
        if (map[key] === undefined && value[key] === true) {
          map.set(String(key), Boolean(value[key]));
        } else if (map.has(key) && value[key] === false) {
          map.delete(key);
        } else {
          map.set(String(key), Boolean(value[key]));
        }
      }
      return;
    }

    const key = String(value);
    map.set(key, true);
  };

  args.forEach(helper);

  return [...map]
    .filter(([, enabled]) => enabled)
    .map(([cls]) => cls)
    .join(" ");
}

// Examples

console.log("classNameII---->", classNames("foo", "foo")); // 'foo'
console.log("classNameII---->", classNames({ foo: true }, { foo: true })); // 'foo'
console.log(
  "classNameII---->",
  classNames({ foo: true, bar: true }, { foo: false }),
); // 'bar'
console.log(
  "classNameII---->",
  classNames("foo", () => "bar"),
); // 'foo bar'
console.log(
  "classNameII---->",
  classNames("foo", () => "foo"),
); // 'foo'
console.log("classNameII---->", classNames([])); // ''
console.log(
  "classNameII---->",
  classNames(() => "foo", "bar", { foo: false }, "foo"),
); // ''
