import React from "react"
import "./App.css"

import LhsPanel from "./Components/LhsPanel"
import RhsPanel from "./Components/RhsPanel"
import ScreenEditor from "./Components/ScreenEditor"


const App = () => {
  return (
    <div className="App">
      <LhsPanel />
      <ScreenEditor/>
      <RhsPanel />
    </div>
  )
}


export default App
