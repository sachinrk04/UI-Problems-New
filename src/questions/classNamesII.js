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
    console.log(args)
    if (args.length === 0) return "";

    let result = new Map();

    const helper = (value) => {
        if (!value) return "";

        if (typeof value === "number") {
            value.set(value, true);
            return;
        }

        if (typeof value === "string") {
            result.set(value, true);
            return;
        }

        if (Array.isArray(value)) {
            helper(value);
            return;
        }

        if (typeof value === "object") {
            for (const [key, enabled] of Object.entries(value)) {
                result.set(key, Boolean(enabled));
            }
        }

        if (typeof value === "function") {
            result.set(value(), true)
        }
    }

    args.forEach(helper);

    return [...result.entries()].filter(([, enabled]) => enabled).map(([cls]) => cls).join(" ");
}

// Examples

// console.log("classNameII---->", classNames('foo', 'foo')); // 'foo'
// console.log("classNameII---->", classNames({ foo: true }, { foo: true })); // 'foo'
// console.log("classNameII---->", classNames({ foo: true, bar: true }, { foo: false })); // 'bar'
// console.log("classNameII---->", classNames('foo', () => 'bar')); // 'foo bar'
// console.log("classNameII---->", classNames('foo', () => 'foo')); // 'foo'
// console.log("classNameII---->", classNames([])); // ''