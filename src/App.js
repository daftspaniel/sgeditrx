import React from "react"
import { useSelector } from "react-redux"
import "./App.css"

import Palette from "./Components/Palette"
import CharacterSelection from "./Components/CharacterSelection"
import { getCellDimensions } from "./Common/getCellDimensions"

const App = () => {
  const primaryCharacter = useSelector((state) => state.primaryCharacter)
  const secondaryCharacter = useSelector((state) => state.secondaryCharacter)
  return (
    <div className="App">
      <div className="LHSPanel"></div>

      <div>
        <canvas
          id="sgscreen"
          className="tcanvas"
          onMouseUp={(e) => {
            console.log(e)
          }}
          onMouseDown={(e) => {
            console.log(e)
            console.log(e.button)
            if (e.button === 2) canvasClickHandler(e, secondaryCharacter)
            else if (e.button === 0) canvasClickHandler(e, primaryCharacter)
          }}
          onContextMenu={(e) => {
            e.preventDefault()
          }}
          onMouseMove={mouseMoveHandler}
          width={512}
          height={384}
        ></canvas>
      </div>

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
    </div>
  )
}

const mouseMoveHandler = (e) => {
  const rect = e.target.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  console.log("Moving", mx, my)
}

const canvasClickHandler = (e, primaryCharacter) => {
  const b1 = document.getElementById(primaryCharacter)
  const canvas = document.getElementById("sgscreen")
  const context = canvas.getContext("2d")
  context.imageSmoothingEnabled = false
  const rect = e.target.getBoundingClientRect()
  const { w, h } = getCellDimensions()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  console.log(rect)

  const x = Math.floor(mx / w) * w
  const y = Math.floor(my / h) * h

  console.log("-----------------")
  console.log("MP", mx, my)
  console.log("RC", mx / w, my / h)
  console.log("XY", x, y)
  console.log("-----------------")

  context.drawImage(b1, x, y)
  //context.fillRect(mx, my, 2, 2)
}

export default App
