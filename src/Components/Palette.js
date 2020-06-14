import React from "react"
import { useDispatch } from "react-redux"
import { getCellDimensions } from "../Common/getCellDimensions"
import { setPrimaryChar, setSecondaryChar } from "../State/ScreenActions"
import { intToHex } from "../Lib/Util"

const Palette = (props) => {
  const { w, h } = getCellDimensions()
  const dispatch = useDispatch()

  let chars = []
  for (let i = props.range.start; i < props.range.end; i++) {
    chars.push(i)
  }

  return (
    <div
      className="Palette"
      onContextMenu={(e) => {
        e.preventDefault()
      }}
    >
      {chars.map((char) => (
        <img
          id={intToHex(char)}
          alt={char}
          key={char}
          style={{ width: w, height: h, marginRight: 3 }}
          src={`img/${intToHex(char)}.jpg`}
          onClick={() => dispatch(setPrimaryChar(char))}
          onContextMenu={(e) => {
            e.preventDefault()
            dispatch(setSecondaryChar(char))
          }}
        />
      ))}
    </div>
  )
}

export default Palette
