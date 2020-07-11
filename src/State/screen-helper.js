import { buildGrid } from "../Lib/Util"
import { SG4, getScreenModeById } from "../Common/ScreenModes"

export const getClearScreen = (modeId, character) =>{
  const screenMode = getScreenModeById(modeId)
  buildGrid(screenMode.columns, screenMode.rows, character)
}

export const getTestCard = (modeId) => {
  let char = 0
  const screenMode = getScreenModeById(modeId)
  const data = buildGrid(screenMode.columns, screenMode.rows, screenMode.defaultCharacter)

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
  const {modeId, character} = action.options
  if (action.options.method === "0") {
    return getClearScreen(modeId, character)
  }
  if (action.options.method === "1") {
    return getClearScreen(modeId, character)
  }
  if (action.options.method === "2") {
    return getTestCard(modeId)
  }
}

export const importCsvData = (action) => {
  const rows = SG4.rows
  const columns = SG4.columns
  const data = buildGrid(SG4.columns, SG4.rows, SG4.defaultCharacter)
  let csvdata = action.data
  let index = 0
  let newdata = csvdata.replace("\r\n", "").replace("\n", "").replace("\r", "")
  newdata = newdata.split(",")

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < columns; i++) {
      data[i][j].value = newdata[index]
      index++
    }
  }

  return data
}
