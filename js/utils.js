
export function orthogonalVector(vector, length) {
  return {
    x: -vector.dy / vector.length * length,
    y: vector.dx / vector.length * length,
  }
}

export function makeVector(start, end) {
  const dx = end.x - start.x
  const dy = end.y - start.y
  return {
    start,
    end,
    dx, 
    dy,
    length: Math.sqrt(dx*dx+dy*dy)
  }
}
