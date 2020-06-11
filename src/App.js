import React from "react"
import "./App.css"

import Palette from "./Components/Palette"
import { getCellDimensions } from "./Common/getCellDimensions"

const App = () => {
  return (
    <div className="App">
      <canvas
        id="sgscreen"
        className="tcanvas"
        onMouseDown={canvasClickHandler}
        onMouseMove={mouseMoveHandler}
        width={512}
        height={384}
      ></canvas>
      <Palette range={{ start: 0, end: 128 }} />
      <Palette range={{ start: 128, end: 256 }} />
    </div>
  )
}

const mouseMoveHandler = (e) =>{
  const rect = e.target.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  console.log('Moving',mx,my)
}

const canvasClickHandler = (e) => {
  const b1 = document.getElementById("41")
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
