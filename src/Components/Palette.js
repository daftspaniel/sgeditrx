import React from "react"
import { useDispatch } from "react-redux"
import { SG4 } from "../Common/ScreenModes"
import { setPrimaryChar, setSecondaryChar } from "../State/ScreenActions"
import { intToHex } from "../Lib/Util"
import CharacterSet from "../Common/CharacterSet"

const Palette = (props) => {
  const w = SG4.width
  const h = SG4.height
  const chars = []
  const dispatch = useDispatch()

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
          src={CharacterSet[intToHex(char)]}
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
