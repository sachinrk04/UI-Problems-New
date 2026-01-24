const original = {
  name: "Sachin",
  skills: ["React", "JS"],
  address: {
    city: "Bangalore",
    pin: 560001,
  },
};

function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  const result = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    result[key] = deepClone(obj[key]);
  }

  return result;
}

const cloned = deepClone(original);

cloned.name = "Test";
cloned.address.city = "Test city";

console.log("original---->", original);
console.log("cloned---->", cloned);
