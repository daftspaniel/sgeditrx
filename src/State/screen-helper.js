import { buildGrid } from '../Lib/Util'
import { SG4, getScreenModeById } from '../Common/ScreenModes'

export const getClearScreen = (modeId, character) => {
  const screenMode = getScreenModeById(modeId)
  buildGrid(screenMode.columns, screenMode.rows, character)
}

export const getTestCard = (modeId) => {
  let char = 0
  const screenMode = getScreenModeById(modeId)
  const data = buildGrid(
    screenMode.columns,
    screenMode.rows,
    screenMode.defaultCharacter
  )

  for (let y = 0; y < screenMode.rows; y++) {
    for (let x = 0; x < screenMode.columns; x++) {
      data[x][y].value = char
      char++
      if (char > 255) char = 0
    }
  }

  return data
}

export const clearScreen = (action) => {
  const { modeId, character } = action.options
  if (action.options.method === '0') {
    return getClearScreen(modeId, character)
  }
  if (action.options.method === '1') {
    return getClearScreen(modeId, character)
  }
  if (action.options.method === '2') {
    return getTestCard(modeId)
  }
}

export const importCsvData = (action) => {
  const rows = SG4.rows
  const columns = SG4.columns
  const data = buildGrid(SG4.columns, SG4.rows, SG4.defaultCharacter)
  let csvdata = action.data
  let index = 0
  let newdata = csvdata.replace('\r\n', '').replace('\n', '').replace('\r', '')
  newdata = newdata.split(',')

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
      data[i][j].value = newdata[index]
      index++
    }
  }

  return data
}

export const mirrorScreen = (direction, data, mode) => {
  const colMidPoint = mode.columns / 2
  const colEndPoint = mode.columns - 1
  const rowMidPoint = mode.rows / 2
  const rowEndPoint = mode.rows - 1

  console.log(direction, data, mode)

  if (direction === 'LtoR') {
    for (let j = 0; j < mode.rows; j++) {
      for (let i = 0; i < colMidPoint; i++) {
        data[colEndPoint - i][j].value = data[i][j].value
      }
    }
  } else if (direction === 'BtoT') {
    for (let i = 0; i < rowMidPoint; i++) {
      for (let j = 0; j < mode.columns; j++) {
        data[j][i].value = data[j][rowEndPoint - i].value
      }
    }
  } else if (direction === 'TtoB') {
    for (let i = 0; i < rowMidPoint; i++) {
      for (let j = 0; j < mode.columns; j++) {
        data[j][rowEndPoint - i].value = data[j][i].value
      }
    }
  } else if (direction === 'RtoL') {
    for (let j = 0; j < mode.rows; j++) {
      for (let i = 0; i < colMidPoint; i++) {
        data[i][j].value = data[colEndPoint - i][j].value
      }
    }
  }

  return data
}

export const scrollScreen = (direction, data, mode) => {
  let tmp = []

  if (direction === 'u') {
    for (let i = 0; i < mode.columns; i++) {
      tmp.push(data[i][0].value)
    }

    for (let j = 0; j < mode.rows - 1; j++) {
      for (let i = 0; i < mode.columns; i++) {
        data[i][j].value = data[i][j + 1].value
      }
    }

    for (let i = 0; i < mode.columns; i++) {
      data[i][mode.rows - 1].value = tmp[i]
    }
  } else if (direction === 'd') {
    for (let i = 0; i < mode.columns; i++) {
      tmp.push(data[i][mode.rows - 1].value)
    }

    for (let j = mode.rows - 1; j > 0; j--) {
      for (let i = 0; i < mode.columns; i++) {
        data[i][j].value = data[i][j - 1].value
      }
    }

    for (let i = 0; i < mode.columns; i++) {
      data[i][0].value = tmp[i]
    }
  } else if (direction === 'l') {
    for (let j = 0; j < mode.rows; j++) {
      let tmp = data[0][j].value
      for (let i = 1; i < mode.columns; i++) {
        data[i - 1][j].value = data[i][j].value
      }
      data[mode.columns - 1][j].value = tmp
    }
  } else if (direction === 'r') {
    for (let j = 0; j < mode.rows; j++) {
      let tmp = data[mode.columns - 1][j].value
      for (let i = mode.columns - 1; i > 0; i--) {
        data[i][j].value = data[i - 1][j].value
      }
      data[0][j].value = tmp
    }
  }
  return data
}
