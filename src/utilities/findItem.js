const findItem = (items, searchBy, value) => {
    const item = items.find((data) => data && data[searchBy].toLowerCase() === value.toLowerCase())

    return item
}

export default findItem