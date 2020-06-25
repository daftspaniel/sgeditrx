import React from "react"
import { useDispatch } from "react-redux"

import ExportDialog from "../Dialogs/ExportDialog"
import { hideExportDialog, exportScreen } from "../State/ScreenActions"

const ExportDialogContainer = () => {
  const dispatch = useDispatch()

  return (
    <ExportDialog
      closeHandler={() => dispatch(hideExportDialog())}
      actionHandler={(options) => {
        dispatch(exportScreen(options))
        dispatch(hideExportDialog())
      }}
    />
  )
}

export default ExportDialogContainer