import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Card from '@material-ui/core/Card'
import { CardHeader } from '@material-ui/core'

import { getElementClickXY } from '../Common/ScreenHelpers'
import { setChar } from '../State/ScreenActions'
import { intToHex } from '../Lib/Util'
import { yellow } from '@material-ui/core/colors'

const mouseState = { leftButtonDown: false, rightButtonDown: false }
let canvas = null
let context = null

const ScreenEditor = () => {
  const primaryCharacter = useSelector((state) => state.primaryCharacter)
  const secondaryCharacter = useSelector((state) => state.secondaryCharacter)
  const screenData = useSelector((state) => state.screenData)
  const screenMode = useSelector((state) => state.activeMode)
  const modeDescription = useSelector((state) => state.modeDescription)
  const showGrid = useSelector((state) => state.showingGrid)
  const brushSize = useSelector((state) => state.brushSize)
  const dispatch = useDispatch()

  const drawChar = (screenMode, e, dispatch, image, character, showGrid) => {
    const { pos, cellPos } = getElementClickXY(
      e,
      screenMode.pixelWidth,
      screenMode.pixelHeight
    )
    if (cellPos.x < screenMode.columns && cellPos.y < screenMode.rows) {
      for (let x = 0; x < brushSize; x++)
        for (let y = 0; y < brushSize; y++)
          context.drawImage(
            image,
            pos.x + x * screenMode.pixelWidth,
            pos.y + y * screenMode.pixelHeight
          )

      dispatch(setChar({ x: cellPos.x, y: cellPos.y, value: character }))
    }
    showGrid && drawGrid(screenMode)
  }

  const mouseMoveHandler = (
    screenMode,
    e,
    dispatch,
    primaryCharacter,
    secondaryCharacter,
    showGrid
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
    drawChar(screenMode, e, dispatch, image, character, showGrid)
  }

  const canvasClickHandler = (screenMode, e, dispatch, character, showGrid) => {
    const image = document.getElementById(character)
    drawChar(screenMode, e, dispatch, image, character, showGrid)
  }

  setTimeout(() => {
    if (!canvas) {
      canvas = document.getElementById('sgscreen')
      context = canvas.getContext('2d')
      context.imageSmoothingEnabled = false
      context.strokeStyle = '#000000'
      context.lineWidth = 1
    }

    for (let j = 0; j < screenMode.rows; j++) {
      for (let i = 0; i < screenMode.columns; i++) {
        const x = i * screenMode.pixelWidth
        const y = j * screenMode.pixelHeight
        if (screenData) {
          const ch = screenData[i][j].value
          const hex = intToHex(ch)
          const img = document.getElementById(hex)
          if (img) {
            context.drawImage(img, x, y)
          }
        }
      }
    }

    showGrid && drawGrid(screenMode)
  }, 200)

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
              canvasClickHandler(
                screenMode,
                e,
                dispatch,
                secondaryCharacter,
                showGrid
              )
            } else if (e.button === 0) {
              mouseState.leftButtonDown = true
              canvasClickHandler(
                screenMode,
                e,
                dispatch,
                primaryCharacter,
                showGrid
              )
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
            mouseMoveHandler(
              screenMode,
              e,
              dispatch,
              primaryCharacter,
              secondaryCharacter,
              showGrid
            )
          }
          width={screenMode ? screenMode.columns * screenMode.pixelWidth : 512}
          height={screenMode ? screenMode.rows * screenMode.pixelHeight : 384}
        ></canvas>
      </Card>
    </div>
  )
}

export default ScreenEditor

const drawGrid = (screenMode) => {
  for (let i = 0; i < screenMode.columns; i++) {
    context.beginPath()
    context.moveTo(i * screenMode.pixelWidth, 0)
    context.lineTo(
      i * screenMode.pixelWidth,
      screenMode.rows * screenMode.pixelHeight
    )
    context.stroke()
  }
  for (let i = 0; i < screenMode.rows; i++) {
    context.beginPath()
    context.moveTo(0, i * screenMode.pixelHeight)
    context.lineTo(
      screenMode.columns * screenMode.pixelWidth,
      i * screenMode.pixelHeight
    )
    context.stroke()
  }
}
