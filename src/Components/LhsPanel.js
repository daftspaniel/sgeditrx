import React from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

import "../App.css"
import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import { CardHeader } from "@material-ui/core"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import ArrowBackwardIcon from "@material-ui/icons/ArrowBack"
import FlipIcon from "@material-ui/icons/Flip"

import ClearDialogContainer from "../Dialogs/ClearDialogContainer"
import ExportDialogContainer from "../Dialogs/ExportDialogContainer"
import {
  showClearDialog,
  showExportDialog,
  scrollScreen,
} from "../State/ScreenActions"

const LhsPanel = () => {
  const dispatch = useDispatch()

  const displayClearDialog = useSelector(
    (state) => state.transient.showingClearDialog
  )
  const displayExportDialog = useSelector(
    (state) => state.transient.showingExportDialog
  )

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
          <br />
          <div className="ScrollPanel">
            <div style={{ width: 65 }}>Scroll</div>
            <ArrowUpwardIcon
              className="Clickable"
              onClick={() => dispatch(scrollScreen("u"))}
            />
            <ArrowDownwardIcon
              className="Clickable"
              onClick={() => dispatch(scrollScreen("d"))}
            />
            <ArrowBackwardIcon
              className="Clickable"
              onClick={() => dispatch(scrollScreen("l"))}
            />
            <ArrowForwardIcon
              className="Clickable"
              onClick={() => dispatch(scrollScreen("r"))}
            />
          </div>
          <div className="MirrorPanel">
            <div style={{ width: 65 }}>Mirror</div>
            <FlipIcon style={{transform: 'rotate(90deg)'}} />
            <FlipIcon style={{transform: 'rotate(180deg)'}} />
            <FlipIcon style={{transform: 'rotate(270deg)'}} />
            <FlipIcon />
          </div>
        </div>
        {displayClearDialog && <ClearDialogContainer />}
        {displayExportDialog && <ExportDialogContainer />}
      </div>
    </Card>
  )
}

export default LhsPanel
