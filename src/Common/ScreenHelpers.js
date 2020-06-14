export const getElementClickXY = (e, cellWidth, cellHeight) => {
  const pos = {}
  const rect = e.target.getBoundingClientRect()
  const mx = e.clientX - rect.left
  const my = e.clientY - rect.top
  const cellPos = {
    x: Math.floor(mx / cellWidth),
    y: Math.floor(my / cellHeight),
  }
  pos.x = Math.floor(mx / cellWidth) * cellWidth
  pos.y = Math.floor(my / cellHeight) * cellHeight
  return { pos, cellPos }
}
