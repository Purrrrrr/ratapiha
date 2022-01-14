import {positionOnTrack} from './track.js'
import {orthogonalVector, makeVector} from './utils.js'
import {CANVAS_HEIGHT, CANVAS_WIDTH} from './canvas.js'


export function makeRenderer(canvas) {
  window.cc = canvas

  function drawTrack(track) {
    for (const segment of track) {
      const {start, end} = segment
      const ov = orthogonalVector(segment, 2)

      const trackProperties = {
        stroke: 'gray',
        strokeWidth: 1,
        strokeLineCap: 'round',
        selectable: false,
      }
      canvas.add(new fabric.Line(
        [
          start.x - ov.x, start.y - ov.y, end.x - ov.x, end.y - ov.y
        ], trackProperties
      ))
      canvas.add(new fabric.Line(
        [
          start.x + ov.x, start.y + ov.y, end.x + ov.x, end.y + ov.y
        ], trackProperties
      ))
    }
    messageObj.bringToFront()
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
          strokeLineCap: cabin.shape,
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
      messageObj.bringToFront()
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
    const obj = getCabinObject(cabin)
    const margin = obj.strokeWidth/2
    const start = positionOnTrack(track, pos + margin)
    const end = positionOnTrack(track, pos + cabin.length - margin)
    const ov = orthogonalVector(makeVector(start, end), 2.5)

    obj.set({
      x1: start.x + ov.x,
      x2: end.x + ov.x,
      y1: start.y + ov.y,
      y2: end.y + ov.y,
    })
    obj.setCoords()
  }

  function removeTrain(train) {
    train.cabins.forEach(cabin => canvas.remove(cabinObjects.get(cabin)))
  }
  
  const messageObj = new fabric.Text('', { 
    top: 0,
    left: 0,
    fill: 'yellow',
    shadow: 'rgba(0,0,0,0.5) 1px 1px 0px',
    selectable: false,
  });
  canvas.add(messageObj);

  function setMessage(msg) {
    if (msg.text === msg) return

    messageObj.set({
      text: msg,
    })
      .viewportCenter()
      .setCoords()
  }

  return {
    drawTrack,
    drawTrain,
    removeTrain,
    setMessage,
  }
}
