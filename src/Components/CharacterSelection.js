import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { MenuItem, Select } from '@material-ui/core'
import { setBrushSize } from '../State/ScreenActions'

const characterStyle = { width: 32, height: 48 }
const brushDimensions = [1, 2, 3, 4, 5, 6, 7, 8]

const CharacterSelection = () => {
  const dispatch = useDispatch()
  const primaryCharacter = useSelector((state) => state.primaryCharacter)
  const secondaryCharacter = useSelector((state) => state.secondaryCharacter)
  let brushSize = useSelector((state) => state.brushSize)
  if (brushSize === undefined) brushSize = 1
  return (
    <div className="CharacterChoices">
      <div className="CharacterSelection">
        <img
          id={primaryCharacter}
          alt={primaryCharacter}
          key={primaryCharacter}
          style={characterStyle}
          src={`img/${parseInt(primaryCharacter).toString(16)}.jpg`}
        />
      </div>
      <div className="CharacterSelection">
        <img
          id={secondaryCharacter}
          alt={secondaryCharacter}
          key={secondaryCharacter}
          style={characterStyle}
          src={`img/${parseInt(secondaryCharacter).toString(16)}.jpg`}
        />
      </div>
      <div className="BrushSize">
        <Select
          value={brushSize}
          onChange={(e) => {
            dispatch(setBrushSize(e.target.value))
          }}
        >
          {brushDimensions.map((val) => (
            <MenuItem key={val} value={val}>
              {val} x {val}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  )
}

export default CharacterSelection
