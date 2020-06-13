import React from "react"
import "../App.css"

import Card from "@material-ui/core/Card"
import Button from "@material-ui/core/Button"
import { CardHeader } from "@material-ui/core"

const LhsPanel = () => {
  return (
    <Card className="LHSPanelContainer" elevation={12}>
      <CardHeader title="SGEDIT v4" subheader="The Retro Screen Designer" />
      <div className="LHSPanel">
        <div className="ButtonColumn">
          <Button variant="contained" color="primary">
            Clear...
          </Button>
          <br/>
          <Button variant="contained" color="primary">
            Export...
          </Button>
        </div>

        {/* <div className="AppTitle">
          <img src="img/13.jpg" alt="S" />
          <img src="img/7.jpg" alt="G" />
          <img src="img/5.jpg" alt="E" />
          <img src="img/4.jpg" alt="D" />
          <img src="img/9.jpg" alt="I" />
          <img src="img/14.jpg" alt="T" />
        </div> */}
      </div>
    </Card>
  )
}

export default LhsPanel
