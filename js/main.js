import {makeTrack, positionOnTrack} from './track.js'
import {createCanvas} from './canvas.js'
import {makeRenderer} from './renderer.js'
import {makeTrain} from './trains.js'

const rand = (min, max) => Math.random()*(max-min) + min

function start() {
  const canvas = createCanvas()
  const renderer = makeRenderer(canvas)

  const mTrack = (iX) => makeTrack(
    {x: iX},
    {dy: 50},
    {dx: rand(-5, 5), dy: 50},
    {x: iX, dy: 50},
    {dy: 50},
  )
  let tracks = [
    {
      track: mTrack(30),
      train: null,
    },
    {
      track: mTrack(70),
      train: null,
    },
    {
      track: mTrack(110),
      train: null,
    },
    {
      track: mTrack(150),
      train: null,
    },
    {
      track: mTrack(190),
      train: null,
    },
  ]
  tracks.forEach(track => 
    renderer.drawTrack(track.track)
  )

  function draw() {
    for(const tt of tracks) {
      const { track, train } =  tt
      if (train) {
        renderer.drawTrain(train)
        train.tick()
        if (!train.isOnTrack()) {
          renderer.removeTrain(train)
          tt.train = null
        }
      } else {
        window.setTimeout(() => { tt.train = makeTrain(track)})
      }
    }

    window.requestAnimationFrame(draw)
  }

  window.requestAnimationFrame(draw)
}

start()
