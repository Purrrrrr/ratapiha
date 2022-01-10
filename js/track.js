import {makeVector} from './utils.js'

export function trackSegment(start, end) {
  return makeVector(start, end)
}

export function makeTrack(firstPos, ...positions) {
  let curPos, nextPos
  let curSegment, prevSegment
  const track = []

  curPos = parsePos(firstPos)
  for (const p of positions) {
    nextPos = parsePos(p, curPos)
    curSegment = trackSegment(curPos, nextPos)
    if (prevSegment) {
      prevSegment.next = curSegment
      curSegment.previous = prevSegment 
    }

    track.push(curSegment)
    curPos = nextPos
    prevSegment = curSegment
  }

  return track
}

function parsePos({x, y, dx = 0, dy = 0}, relativeTo = {x: 0, y: 0}) {
  return {
    x: x ?? relativeTo.x + dx,
    y: y ?? relativeTo.y + dy,
  }  
}

export function positionOnTrack(track, pos) {
  let segment = track[0]
  while(pos > segment.length && segment.next) {
    pos -= segment.length
    segment = segment.next
  }
  const { start, dx, dy, length } = segment
  const progress = pos/length
  
  return {
    x: start.x + dx * progress,
    y: start.y + dy * progress,
    segment,
  }
}

export function trackLength(track) {
  return track.map(seg => seg.length).reduce((a,b) => a+b, 0)
}
