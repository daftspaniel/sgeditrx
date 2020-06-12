import React from "react"

import Palette from "./Palette"
import CharacterSelection from "./CharacterSelection"

const RhsPanel = () => {
  return (
    <div className="RHSPanel">
    <CharacterSelection />

    <div className="Palettes">
      <Palette range={{ start: 128, end: 256 }} />
      <Palette
        range={{ start: 0, end: 128 }}
        style={{ position: "absolute", top: 10, left: 1024 }}
      />
    </div>
  </div>
  )
}

export default RhsPanel