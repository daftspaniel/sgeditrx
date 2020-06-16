import { ACTIONS } from "./ScreenActions"
import { buildGrid } from "../Lib/Util"
import { SG4 } from "../Common/ScreenModes"

const transientInitialState = {
  showingClearDialog: false,
}

const initialState = {
  primaryCharacter: 1,
  secondaryCharacter: 2,
  screenData: buildGrid(SG4.columns, SG4.rows, SG4.defaultCharacter),
  ...SG4,
  transient: transientInitialState,
}

export const screenReducer = function (state, action) {
  switch (action.type) {
    case ACTIONS.SET_CHAR:
      const screenData = state.screenData
      const { data } = action
      screenData[action.data.x][action.data.y].value = data.value
      return save({ ...state, screenData })
    case ACTIONS.SET_PRIMARY_CHAR:
      return save({ ...state, primaryCharacter: action.newCharacter })
    case ACTIONS.SET_SECONDARY_CHAR:
      return save({ ...state, secondaryCharacter: action.newCharacter })
    case ACTIONS.SHOW_CLEAR_DIALOG:
      return { ...state, transient: { showingClearDialog: true } }
    case ACTIONS.HIDE_CLEAR_DIALOG:
      return { ...state, transient: { showingClearDialog: false } }
    case ACTIONS.CLEAR_SCREEN:
      return save({ ...state, screenData: getTestCard(state) })
    default:
      const isSavedState = localStorage.sgedit4State
      state = isSavedState
        ? JSON.parse(localStorage.sgedit4State)
        : initialState

      return state
  }
}

const save = (newState) => {
  localStorage.sgedit4State = JSON.stringify(newState)
  return newState
}

const getTestCard = (state) => {
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
