// Write a function which convert all object keys (deep) to camelCase
// Input:
// {
//   user_name: "Sachin",
//   user_profile: {
//     first_name: "Sachin",
//     last_name: "Singh",
//   },
//   order_items: [
//     { product_id: 1, product_name: "Apple" }
//   ]
// };

// Output:
// {
//   userName: "Sachin",
//   userProfile: {
//     firstName: "Sachin",
//     lastName: "Singh"
//   },
//   orderItems: [
//     { productId: 1, productName: "Apple" }
//   ]
// }

function toCamel(str) {
  let toKey = "";
  let upperNext = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (char === "_" || char === "-") {
      upperNext = true;
    } else {
      toKey += upperNext ? char.toUpperCase() : char;
      upperNext = false;
    }
  }

  return toKey;
}

function keysToCamel(obj) {
  if (Array.isArray(obj)) {
    return obj.map(keysToCamel);
  }

  if (obj !== null && typeof obj === "object") {
    const output = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        output[toCamel(key)] = keysToCamel(obj[key]);
      }
    }

    return output;
  }

  return obj;
}

const input = {
  user_name: "Sachin",
  user_profile: {
    first_name: "Sachin",
    last_name: "Singh",
  },
  order_items: [{ product_id: 1, product_name: "Apple" }],
};

console.log("keysToCamel--->", keysToCamel(input));
