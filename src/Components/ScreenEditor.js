import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import Card from "@material-ui/core/Card"
import { CardHeader } from "@material-ui/core"
import { getElementClickXY } from "../Common/ScreenHelpers"
import { setChar } from "../State/ScreenActions"

const mouseState = { leftButtonDown: false, rightButtonDown: false }
let canvas = null
let context = null

const ScreenEditor = () => {
  const primaryCharacter = useSelector((state) => state.primaryCharacter)
  const secondaryCharacter = useSelector((state) => state.secondaryCharacter)
  const screenData = useSelector((state) => state.screenData)
  const modeDescription = useSelector((state) => state.modeDescription)
  const dispatch = useDispatch()

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
              canvasClickHandler(e, dispatch, secondaryCharacter)
            } else if (e.button === 0) {
              mouseState.leftButtonDown = true
              canvasClickHandler(e, dispatch, primaryCharacter)
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
            mouseMoveHandler(e, dispatch, primaryCharacter, secondaryCharacter)
          }
          width={512}
          height={384}
        ></canvas>
      </Card>
    </div>
  )
}

const mouseMoveHandler = (
  e,
  dispatch,
  primaryCharacter,
  secondaryCharacter
) => {
  let image, character
  if (mouseState.leftButtonDown) {
    image = document.getElementById(primaryCharacter)
    character = primaryCharacter
  } else if (mouseState.rightButtonDown) {
    image = document.getElementById(secondaryCharacter)
    character = secondaryCharacter
  }
  if (!image) return
  drawChar(e, dispatch, image, character)
}

const canvasClickHandler = (e, dispatch, character) => {
  const image = document.getElementById(character)
  drawChar(e, dispatch, image, character)
}

const drawChar = (e, dispatch, image, character) => {
  const { pos, cellPos } = getElementClickXY(e, 16, 24)
  if (cellPos.x < 32 && cellPos.y < 16) {
    context.drawImage(image, pos.x, pos.y)
    dispatch(setChar({ x: cellPos.x, y: cellPos.y, value: character }))
  }
}

export default ScreenEditor
