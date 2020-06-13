export const buildGrid = (gridWidth, gridHeight, defaultValue) => {
    const data = []

    for (let column = 0; column < gridWidth; column++) {
        data.push([])
        for (let row = 0; row < gridHeight; row++) {
            data[column].push({
                x: column,
                y: row,
                value: defaultValue
            })
        }
    }
    return data
}

export const hexToInt = (dataval) => parseInt(dataval, 16)
export const intToHex = (dataval) => parseInt(dataval).toString(16)
