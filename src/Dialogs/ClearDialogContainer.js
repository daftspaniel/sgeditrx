import React from "react"
import { useDispatch } from "react-redux"

import ClearDialog from "../Dialogs/ClearDialog"
import { hideClearDialog, clearScreen } from "../State/ScreenActions"

const ClearDialogContainer = () => {
  const dispatch = useDispatch()

  return (
    <ClearDialog
      closeHandler={() => dispatch(hideClearDialog())}
      actionHandler={(options) => {
        dispatch(clearScreen(options))
        dispatch(hideClearDialog())
      }}
    />
  )
}

export default ClearDialogContainer
