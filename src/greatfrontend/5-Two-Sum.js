const twoSum_Method_I = (array, target) => {
    const map = {};

    for (let i = 0; i < array.length; i++) {
        const diff = target - array[i];

        if (map.hasOwnProperty(diff)) {
            return [map[diff], i]
        }

        map[array[i]] = i
    }

    return []
}

const twoSum_Method_II = (array, target) => {
    const map = new Map();

    for (let i = 0; i < array.length; i++) {
        const diff = target - array[i];

        if (map.has(diff)) {
            return [map.get(diff), i]
        }

        map.set(array[i], i);
    }

    return []
}

// Input: 
const numbers = [0,7,1,9], target = 7
// const numbers = [4,9,2,1,7], target = 5
// const numbers = [4, 4], target = 8
// const numbers = [4, 4], target = 7


const result = twoSum_Method_I(numbers, target);
console.log("result--->", result)