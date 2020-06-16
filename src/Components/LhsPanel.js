import React from "react"
import { useSelector } from "react-redux"

import "../App.css"
import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import { CardHeader } from "@material-ui/core"

import ClearDialog from "../Dialogs/ClearDialog"

const LhsPanel = () => {
  const showClearDialog = useSelector((state) => state.transient.showingClearDialog)

  return (
    <Card className="LHSPanelContainer" elevation={12}>
      <CardHeader title="SGEDIT v4" subheader="The Retro Screen Designer" />
      <div className="LHSPanel">
        <div className="ButtonColumn">
          <Button variant="contained" color="primary">
            Clear...
          </Button>
          <br />
          <Button variant="contained" color="primary">
            Export...
          </Button>
        </div>
        {showClearDialog && <ClearDialog />}
      </div>
    </Card>
  )
}

export default LhsPanel
