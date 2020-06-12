import { ACTIONS } from "./ScreenActions"
const initialState = { primaryCharacter: 1, secondaryCharacter: 2 }

export const screenReducer = function (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_PRIMARY_CHAR:
      return { ...state, primaryCharacter: action.newCharacter }
    case ACTIONS.SET_SECONDARY_CHAR:
      return { ...state, secondaryCharacter: action.newCharacter }
    default:
      return state
  }
}
