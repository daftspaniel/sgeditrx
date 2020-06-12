import {dispatch} from 'react-redux'
export const SET_PRIMARY_CHAR = "SET_PRIMARY_CHAR"

const _setPrimaryChar = (character) => {
  return { type: SET_PRIMARY_CHAR, newCharacter: character }
}

export const setPrimaryChar = (character) => dispatch(_setPrimaryChar(character))