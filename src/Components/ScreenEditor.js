import React from "react"
import { useSelector } from "react-redux"

import Card from "@material-ui/core/Card"
import { CardHeader } from "@material-ui/core"

import { getCellDimensions } from "../Common/getCellDimensions"

const mouseState = { leftButtonDown: false, rightButtonDown: false }

const ScreenEditor = () => {
  const primaryCharacter = useSelector((state) => state.primaryCharacter)
  const secondaryCharacter = useSelector((state) => state.secondaryCharacter)

  return (
    <div>
      <Card className="CenterPanel" elevation={12}>
        <CardHeader title="SG4 - 32 by 16" />
        <canvas
          id="sgscreen"
          className="tcanvas"
          onMouseUp={(e) => {
            console.log(e)
            if (e.button === 2) {
              mouseState.rightButtonDown = false
            } else if (e.button === 0) {
              mouseState.leftButtonDown = false
            }
            console.log(mouseState)
          }}
          onMouseDown={(e) => {
            console.log(e)
            console.log(e.button)
            if (e.button === 2) {
              mouseState.rightButtonDown = true
              canvasClickHandler(e, secondaryCharacter)
            } else if (e.button === 0) {
              mouseState.leftButtonDown = true
              canvasClickHandler(e, primaryCharacter)
            }
            console.log(mouseState)
          }}
          onMouseLeave={(e) => {
            mouseState.rightButtonDown = false
            mouseState.leftButtonDown = false
          }}
          onContextMenu={(e) => {
            e.preventDefault()
          }}
          onMouseMove={mouseMoveHandler}
          width={512}
          height={384}
        ></canvas>
      </Card>
    </div>
  )
}

const mouseMoveHandler = (e) => {
  const rect = e.target.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  //console.log("Moving", mx, my)
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
