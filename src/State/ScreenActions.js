export const ACTIONS = {
  SET_PRIMARY_CHAR: "SET_PRIMARY_CHAR",
  SET_SECONDARY_CHAR: "SET_SECONDARY_CHAR",
  SET_CHAR: "SET_CHAR",
  SHOW_CLEAR_DIALOG: "SHOW_CLEAR_DIALOG",
  HIDE_CLEAR_DIALOG: "HIDE_CLEAR_DIALOG",
  CLEAR_SCREEN: "CLEAR_SCREEN",
}

const _setPrimaryChar = (character) => {
  return { type: ACTIONS.SET_PRIMARY_CHAR, newCharacter: character }
}

const _setSecondaryChar = (character) => {
  return { type: ACTIONS.SET_SECONDARY_CHAR, newCharacter: character }
}

const _setChar = (data) => {
  return { type: ACTIONS.SET_CHAR, data }
}

const _showClearDialog = () => {
  return { type: ACTIONS.SHOW_CLEAR_DIALOG }
}

const _hideClearDialog = () => {
  return { type: ACTIONS.HIDE_CLEAR_DIALOG }
}

const _clearScreen = (options) => {
  return { type: ACTIONS.CLEAR_SCREEN, options }
}

export const setChar = (data) => _setChar(data)

export const setPrimaryChar = (character) => _setPrimaryChar(character)

export const setSecondaryChar = (character) => _setSecondaryChar(character)

export const showClearDialog = () => _showClearDialog()

export const hideClearDialog = () => _hideClearDialog()

export const clearScreen = (options) => _clearScreen(options)
