// Before the optional chaining operator (?.) existed, it was sometimes troublesome to access deeply-nested 
// properties in huge JavaScript objects when some of the intermediate properties might not be present.


const john = {
  profile: {
    name: { firstName: 'John', lastName: 'Doe' },
    age: 20,
    gender: 'Male',
  },
};

const jane = {
  profile: {
    age: 19,
    gender: 'Female',
  },
};

// Doing getFirstName(john) works but getFirstName(jane) will error because the name property doesn't exist for jane.profile.

// Lodash's _.get method
// Lodash's _.get method was created as a solution for such use cases.

// Let's write our own version as a get function. The function gets the value at path of object. If the resolved 
// value is undefined, the defaultValue is returned in its place. The function signature is as such:


// get(object, path, [defaultValue]);
// object: The object to query.
// path: The path of the property to get.
// It can be a single string with . as the separator between object fields (e.g. profile.name.firstName),
// Or it can be an array like this: ['profile', 'name', 'firstName'].
// defaultValue: Optional parameter. The value returned if the resolved value is undefined. If defaultValue is not 
// provided and the resolved value is undefined, simply return undefined.


// Examples
// // Using the `john` and `jane` objects from above
// get(john, 'profile.name.firstName'); // 'John'
// get(john, 'profile.gender'); // 'Male'
// get(jane, 'profile.name.firstName'); // undefined

// // An example where path is provided as an array
// get({ a: { b: 2, c: { foo: 2 } } }, ['a', 'c']); // foo: 2,
// Arrays inside the object can also be accessed if numerical indices are provided in the path. See the examples below.

// get({ a: [{ b: { c: 3 } }] }, 'a.0.b.c'); // 3
// get({ a: [{ b: { c: 3 } }] }, ['a', 0, 'b', 'c']); // 3
// There's no need to support mixed syntax of path such as get(object, 'a[0].b.c').


function get(object, path, defaultValue) {
    if (object == null) return defaultValue;

    const keys = Array.isArray(path) ? path : path.split('.');

    console.log("keys--->", keys)

    let result = object;

    for (let key of keys) {
        if (result == null) {
            return defaultValue;
        }

        result = result[key]
    }

    return result === undefined ? defaultValue : result;
}

// const result = get(john, 'profile.name.firstName');
const result = get({ a: [{ b: { c: 3 } }] }, 'a.0.b.c');
console.log("Result--->", result);