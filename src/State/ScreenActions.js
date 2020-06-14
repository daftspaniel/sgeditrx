export const ACTIONS = {
  SET_PRIMARY_CHAR: "SET_PRIMARY_CHAR",
  SET_SECONDARY_CHAR: "SET_SECONDARY_CHAR",
  SET_CHAR: "SET_CHAR",
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

export const setChar = (data) => _setChar( data)

export const setPrimaryChar = (character) => _setPrimaryChar(character)

export const setSecondaryChar = (character) => _setSecondaryChar(character)
