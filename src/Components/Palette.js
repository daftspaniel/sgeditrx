import React from "react"
import { getCellDimensions } from "../Common/getCellDimensions"
import { setPrimaryChar} from "../State/ScreenActions"

const Palette = (props) => {
  const { w, h } = getCellDimensions()
  let chars = []
  for (let i = props.range.start; i < props.range.end; i++) {
    chars.push(i)
  }
  return (
    <div className="Palette">
      {chars.map((char) => (
        <img
          id={char}
          alt={char}
          key={char}
          style={{width:w,height:h}}
          src={`img/${parseInt(char).toString(16)}.jpg`}
          onClick={()=>setPrimaryChar(char)}
        />
      ))}
    </div>
  )
}

export default Palette
