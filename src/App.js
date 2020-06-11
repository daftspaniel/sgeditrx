import React from "react"
import "./App.css"

const App = () => {
  return (
    <div className="App">
      <canvas
        id="sgscreen"
        width="512"
        height="384"
        className="tcanvas"
        onMouseDown={canvasClickHandler}
      ></canvas>
      <div>
        <img id="41" alt="41" src="img/41.jpg" />
      </div>
    </div>
  )
}

const canvasClickHandler = (e) => {
  const b1 = document.getElementById('41')
  const canvas = document.getElementById('sgscreen')
  const context = canvas.getContext('2d')
  const rect = e.target.getBoundingClientRect()
  const w = 16
  const h = 24
  const mx = Math.floor(e.pageX - rect.x)
  const my = Math.floor(e.pageY - rect.y)
  console.log(Math.floor(mx / w))
  console.log(Math.floor(my / h))
  const x = Math.floor(mx / w) * w
  const y = Math.floor(my / h) * h
  context.drawImage(b1, x, y)
}

export default App
