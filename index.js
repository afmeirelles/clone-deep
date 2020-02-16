const isObject = value => typeof value === 'object' && value !== null
const isDate = value => value instanceof Date

const cloneDeep = input => {
    // if input is not an object, simply return
    if (!isObject(input)) return input
    // if it's a Date, return a new instance
    if (isDate(input)) return new Date(input)
    // the new object or array to be returned
    const obj = Array.isArray(input) ? [] : {}
    // iterates over properties
    for (key in input) {
        const value = input[key]
        // if input[key] is a nested object, recusively call cloneDeep
        obj[key] = isObject(value) ? cloneDeep(value) : value
    }
    return obj
}

module.exports = cloneDeep
