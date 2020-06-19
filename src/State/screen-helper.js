import { buildGrid } from "../Lib/Util"
import { SG4 } from "../Common/ScreenModes"

export const getClearScreen = (character) =>
  buildGrid(SG4.columns, SG4.rows, character)

export const getTestCard = () => {
  let char = 0

  const data = buildGrid(SG4.columns, SG4.rows, SG4.defaultCharacter)

  for (let y = 0; y < SG4.rows; y++) {
    for (let x = 0; x < SG4.columns; x++) {
      data[x][y].value = char
      char++
      if (char > 255) char = 0
    }
  }

  return data
}

export const clearScreen = (action) => {
  if (action.options.method === "0") {
    return  getClearScreen(action.options.character)
  } 
  if (action.options.method === "1") {
    return  getClearScreen(action.options.character)
  } 
  if (action.options.method === "2") {
    return  getTestCard()
  }
}
