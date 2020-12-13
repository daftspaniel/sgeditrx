import { ACTIONS } from './ScreenActions'
import { buildGrid } from '../Lib/Util'
import { SG4, getScreenModeById } from '../Common/ScreenModes'
import { clearScreen, mirrorScreen, scrollScreen } from './screen-helper'

const transientInitialState = {
  showingClearDialog: false,
  showingExportDialog: false,
}

const initialState = {
  primaryCharacter: 1,
  secondaryCharacter: 2,
  screenData: buildGrid(SG4.columns, SG4.rows, SG4.defaultCharacter),
  activeMode: SG4,
  transient: transientInitialState,
  showingGrid: false,
  brushSize: 2,
}

export const screenReducer = function (state, action) {
  // console.log('********************')
  // console.log(state)
  // console.log(action)
  // console.log('********************')
  switch (action.type) {
    case ACTIONS.SET_CHAR:
      const screenData = state.screenData
      const { data } = action
      for (let x = 0; x < state.brushSize; x++)
        for (let y = 0; y < state.brushSize; y++) {
          if (
            action.data.x + x < state.activeMode.columns &&
            action.data.y + y < state.activeMode.rows
          )
            screenData[action.data.x + x][action.data.y + y].value = data.value
        }
      return save({ ...state, screenData })
    case ACTIONS.SET_BRUSH_SIZE:
      return save({ ...state, brushSize: action.brushSize })
    case ACTIONS.SET_MODE:
      const activeMode = getScreenModeById(action.modeId)
      return save({ ...state, activeMode: activeMode })
    case ACTIONS.SET_PRIMARY_CHAR:
      return save({ ...state, primaryCharacter: action.newCharacter })
    case ACTIONS.SET_SECONDARY_CHAR:
      return save({ ...state, secondaryCharacter: action.newCharacter })
    case ACTIONS.SHOW_CLEAR_DIALOG:
      return { ...state, transient: { showingClearDialog: true } }
    case ACTIONS.HIDE_CLEAR_DIALOG:
      return { ...state, transient: { showingClearDialog: false } }
    case ACTIONS.SHOW_EXPORT_DIALOG:
      return { ...state, transient: { showingExportDialog: true } }
    case ACTIONS.HIDE_EXPORT_DIALOG:
      return { ...state, transient: { showingExportDialog: false } }
    case ACTIONS.SHOW_GRID:
      return save({ ...state, showingGrid: action.flag })
    case ACTIONS.CLEAR_SCREEN:
      return save({ ...state, screenData: clearScreen(action) })
    case ACTIONS.SCROLL:
      return save({
        ...state,
        screenData: [
          ...scrollScreen(action.direction, state.screenData, state.activeMode),
        ],
      })
    case ACTIONS.MIRROR:
      return save({
        ...state,
        screenData: [
          ...mirrorScreen(action.direction, state.screenData, state.activeMode),
        ],
      })
    default:
      const isSavedState = localStorage.sgedit4State
      state = isSavedState
        ? JSON.parse(localStorage.sgedit4State)
        : initialState
      if (isSavedState) {
        state = { ...state, transient: transientInitialState }
      }

      return save(state)
  }
}

const save = (newState) => {
  newState.transient = transientInitialState
  localStorage.sgedit4State = JSON.stringify(newState)
  return newState
}
