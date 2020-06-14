import React, { useEffect } from "react"
import { useSelector } from "react-redux"

import Card from "@material-ui/core/Card"
import { CardHeader } from "@material-ui/core"

import { getElementClickXY } from "../Common/ScreenHelpers"

const mouseState = { leftButtonDown: false, rightButtonDown: false }
let canvas = null
let context = null

const ScreenEditor = () => {
  const primaryCharacter = useSelector((state) => state.primaryCharacter)
  const secondaryCharacter = useSelector((state) => state.secondaryCharacter)
  const screenData = useSelector((state) => state.screenData)
  const modeDescription = useSelector((state) => state.modeDescription)

  useEffect(() => {
    if (!screenData) return
    if (!canvas) {
      canvas = document.getElementById("sgscreen")
      context = canvas.getContext("2d")
      context.imageSmoothingEnabled = false
    }
    
    for (let j = 0; j < 16; j++) {
      for (let i = 0; i < 32; i++) {
        const x = i * 16
        const y = j * 24
        if (screenData) {
          const ch = screenData[i][j].value
          if (document.getElementById(ch))
            context.drawImage(document.getElementById(ch), x, y)
        }
      }
    }
  }, [screenData])

  return (
    <div>
      <Card className="CenterPanel" elevation={12}>
        <CardHeader title={modeDescription} />
        <canvas
          id="sgscreen"
          className="tcanvas"
          onMouseUp={(e) => {
            if (e.button === 2) {
              mouseState.rightButtonDown = false
            } else if (e.button === 0) {
              mouseState.leftButtonDown = false
            }
          }}
          onMouseDown={(e) => {
            if (e.button === 2) {
              mouseState.rightButtonDown = true
              canvasClickHandler(e, secondaryCharacter)
            } else if (e.button === 0) {
              mouseState.leftButtonDown = true
              canvasClickHandler(e, primaryCharacter)
            }
          }}
          onMouseLeave={(e) => {
            mouseState.rightButtonDown = false
            mouseState.leftButtonDown = false
          }}
          onContextMenu={(e) => {
            e.preventDefault()
          }}
          onMouseMove={(e) =>
            mouseMoveHandler(e, primaryCharacter, secondaryCharacter)
          }
          width={512}
          height={384}
        ></canvas>
      </Card>
    </div>
  )
}

const mouseMoveHandler = (e, primaryCharacter, secondaryCharacter) => {
  let selectedChar
  if (mouseState.leftButtonDown) {
    selectedChar = document.getElementById(primaryCharacter)
  } else if (mouseState.rightButtonDown) {
    selectedChar = document.getElementById(secondaryCharacter)
  }
  if (!selectedChar) return
  const pos = getElementClickXY(e, 16, 24)
  context.drawImage(selectedChar, pos.x, pos.y)
}

const canvasClickHandler = (e, primaryCharacter) => {
  const selectedChar = document.getElementById(primaryCharacter)
  const pos = getElementClickXY(e, 16, 24)
  context.drawImage(selectedChar, pos.x, pos.y)
}

export default ScreenEditor
