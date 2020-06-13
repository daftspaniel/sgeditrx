import { ACTIONS } from "./ScreenActions"
import { buildGrid } from "../Lib/Util"

const initialState = {
  primaryCharacter: 1,
  secondaryCharacter: 2,
  mode: "sg4",
  screenData: buildGrid(32, 16, "8f"),
}

export const screenReducer = function (state, action) {
  switch (action.type) {
    case ACTIONS.SET_PRIMARY_CHAR:
      return save({ ...state, primaryCharacter: action.newCharacter })
    case ACTIONS.SET_SECONDARY_CHAR:
      return save({ ...state, secondaryCharacter: action.newCharacter })
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
