import React from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

import "../App.css"
import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import { CardHeader } from "@material-ui/core"

import ClearDialogContainer from "../Dialogs/ClearDialogContainer"
import ExportDialogContainer from "../Dialogs/ExportDialogContainer"
import { showClearDialog, showExportDialog } from "../State/ScreenActions"

const LhsPanel = () => {
  const dispatch = useDispatch()

  const displayClearDialog = useSelector(
    (state) => state.transient.showingClearDialog
  )
  const displayExportDialog = useSelector(
    (state) => state.transient.showingExportDialog
  )

  console.log(displayExportDialog)

  return (
    <Card className="LHSPanelContainer" elevation={12}>
      <CardHeader title="SGEDIT v4" subheader="The Retro Screen Designer" />
      <div className="LHSPanel">
        <div className="ButtonColumn">
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(showClearDialog())}
          >
            Clear...
          </Button>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(showExportDialog())}
          >
            Export...
          </Button>
        </div>
        {displayClearDialog && <ClearDialogContainer />}
        {displayExportDialog && <ExportDialogContainer />}
      </div>
    </Card>
  )
}

export default LhsPanel
