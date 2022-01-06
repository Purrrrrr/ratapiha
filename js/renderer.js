import {positionOnTrack} from './track.js'

export function makeRenderer(canvas) {
  window.cc = canvas

  function drawTrack(track) {
    for (const {start, end} of track) {
      const l = new fabric.Line(
        [
          start.x, start.y, end.x, end.y
        ], {
          stroke: 'gray',
          strokeWidth: 2,
          strokeLineCap: 'round',
          selectable: false,
        }
      )
      canvas.add(l)
    }
  }

  const cabinObjects = new WeakMap()
  function getCabinObject(cabin) {
    if (cabinObjects.has(cabin)) {
      return cabinObjects.get(cabin)
    } else {
      const c = new fabric.Line(
        [
          0,0,0,0
        ], {
          stroke: cabin.color,
          strokeWidth: 6,
          selectable: false,
          shadow: new fabric.Shadow({
            color: 'black',
            blur: 5,
            offsetX: 1,
            offsetY: 1,
          }),
        }
      )
      cabinObjects.set(cabin, c)
      canvas.add(c)
      return c
    }
  }

  function drawTrain(train) {
    const { track, spaceBetweenCabins, cabins, length, position } = train
    let curPos = position - length

    for (const cabin of cabins) {
      drawCabin(track, cabin, curPos)
      curPos += cabin.length + spaceBetweenCabins
    }

    canvas.requestRenderAll()
  }

  function drawCabin(track, cabin, pos) {
    const start = positionOnTrack(track, pos)
    const end = positionOnTrack(track, pos + cabin.length)
    const obj = getCabinObject(cabin)
    obj.set({
      x1: start.x,
      x2: end.x,
      y1: start.y,
      y2: end.y,
    })
    obj.setCoords()
  }

  function removeTrain(train) {
    train.cabins.forEach(cabin => canvas.remove(cabinObjects.get(cabin)))
  }

  return {
    drawTrack,
    drawTrain,
    removeTrain,
  }
}
