const initialState = { primaryCharacter: 1 }

export const screenReducer = function (state = initialState, action) {
  switch (action.type) {
    case "SET_PRIMARY_CHAR":
      return { ...state, primaryCharacter: action.newCharacter }
    default:
      return state
  }
}
