import React from "react"

import { useSelector } from "react-redux"

const CharacterSelection = () => {
  const primaryCharacter = useSelector((state) => state.primaryCharacter)
  return (
    <div>
      <img
        id={primaryCharacter}
        alt={primaryCharacter}
        key={primaryCharacter}
        style={{ width: 16, height: 24 }}
        src={`img/${parseInt(primaryCharacter).toString(16)}.jpg`}
      />
    </div>
  )
}
    
export default CharacterSelection
