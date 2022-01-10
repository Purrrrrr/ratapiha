import {trackLength} from './track.js'

const rand = (min, max) => Math.random()*(max-min) + min
const randomBright = () => `hsl(${rand(0, 360)}, ${rand(30, 100)}%, ${rand(20, 70)}%)`
const spaceBetweenCabins = 2

export const makeTrain = (track) => {
  const cabins = []
  const cabinCount = rand(3,6)
  let trainLength = 0
  for (let i = 0; i < cabinCount; i++) {
    const cabin = makeCabin()
    trainLength += cabin.length
    cabins.push(cabin)
  }
  trainLength += (cabins.length - 1) * spaceBetweenCabins

  function tick() {
    train.position += train.speed
  }

  function isOnTrack() {
    if (train.position < 0) return false
    if (train.position - trainLength > trackLength(track)) return false
    return true
  }

  const train = { 
    track,
    speed: rand(1,4),
    position: 0,
    cabins,
    length: trainLength,
    spaceBetweenCabins,
    tick,
    isOnTrack,
  }

  return train
}

function makeCabin() {
  return {
    length: 30,
    color: randomBright(),
    shape: Math.random() > 0.7 ? 'round' : 'square',
  }
}
