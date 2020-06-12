import React from "react"

import { useSelector } from "react-redux"

const characterStyle = { width: 32, height: 48 }

const CharacterSelection = () => {
  const primaryCharacter = useSelector((state) => state.primaryCharacter)
  const secondaryCharacter = useSelector((state) => state.secondaryCharacter)

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
    </div>
  )
}

export default CharacterSelection
