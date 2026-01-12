function deepCloneII(value) {
    if (value === null || typeof value !== "object") return value;

    if (Array.isArray(value)) {
        const result = [];
        for (let i = 0; i < value.length; i++) {
            result[i] = deepCloneII(value[i])
        }

        return result;
    }

    const result = {};
    for (let key in value) {
        result[key] = deepCloneII(value(key))
    }

    return result;
}