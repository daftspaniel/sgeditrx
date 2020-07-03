import React from "react"
import { useDispatch } from "react-redux"

import ExportDialog from "../Dialogs/ExportDialog"
import { hideExportDialog, importCsvData } from "../State/ScreenActions"

const ExportDialogContainer = () => {
  const dispatch = useDispatch()
  const downloadHandler = (options) => {
    const downloader = document.createElement("a")
    downloader.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(options.content)
    )
    downloader.setAttribute("download", options.filename)
    downloader.click()
    dispatch(hideExportDialog())
  }

  const importHandler = (data) => dispatch(importCsvData(data))

  return (
    <ExportDialog
      closeHandler={() => dispatch(hideExportDialog())}
      actionHandler={downloadHandler}
      importHandler={importHandler}
    />
  )
}

export default ExportDialogContainer
