const sort = (field, arr) => arr.sort((a, b) => a[field] > b[field] ? -1 : 1)

export { sort }
