export const ACTIONS = {
  SET_PRIMARY_CHAR: "SET_PRIMARY_CHAR",
  SET_SECONDARY_CHAR: "SET_SECONDARY_CHAR",
  SET_CHAR: "SET_CHAR",
  SET_MODE: "SET_MODE",
  SHOW_CLEAR_DIALOG: "SHOW_CLEAR_DIALOG",
  HIDE_CLEAR_DIALOG: "HIDE_CLEAR_DIALOG",
  CLEAR_SCREEN: "CLEAR_SCREEN",
  SHOW_EXPORT_DIALOG: "SHOW_EXPORT_DIALOG",
  HIDE_EXPORT_DIALOG: "HIDE_EXPORT_DIALOG",
  IMPORT_CSV: "IMPORT_CSV",
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

const _setMode = (modeId) => {
  return { type: ACTIONS.SET_MODE, modeId }
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

const _showExportDialog = () => {
  return { type: ACTIONS.SHOW_EXPORT_DIALOG }
}

const _hideExportDialog = () => {
  return { type: ACTIONS.HIDE_EXPORT_DIALOG }
}

const _importCsvData = (data) => {
  return { type: ACTIONS.IMPORT_CSV, data }
}

export const setChar = (data) => _setChar(data)

export const setMode = (data) => _setMode(data)

export const setPrimaryChar = (character) => _setPrimaryChar(character)

export const setSecondaryChar = (character) => _setSecondaryChar(character)

export const showClearDialog = () => _showClearDialog()

export const hideClearDialog = () => _hideClearDialog()

export const clearScreen = (options) => _clearScreen(options)

export const showExportDialog = () => _showExportDialog()

export const hideExportDialog = () => _hideExportDialog()

export const importCsvData = (data) => _importCsvData(data)
