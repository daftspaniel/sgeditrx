import React from "react"
import { useSelector } from "react-redux"

import { getCellDimensions } from "../Common/getCellDimensions"

const ScreenEditor = () => {
  const primaryCharacter = useSelector((state) => state.primaryCharacter)
  const secondaryCharacter = useSelector((state) => state.secondaryCharacter)
  
  return (
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

export default ScreenEditor
