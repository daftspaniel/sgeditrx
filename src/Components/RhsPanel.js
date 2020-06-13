import React from "react"

import Card from "@material-ui/core/Card"

import Palette from "./Palette"
import CharacterSelection from "./CharacterSelection"

const RhsPanel = () => {
  return (
    <Card  className="RHSPanel" elevation={12}>
      <div>
        <CharacterSelection />

        <div className="Palettes">
          <Palette range={{ start: 128, end: 256 }} />
          <Palette
            range={{ start: 0, end: 128 }}
            style={{ position: "absolute", top: 10, left: 1024 }}
          />
        </div>
      </div>
    </Card>
  )
}

export default RhsPanel
