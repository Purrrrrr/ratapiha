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

  let running = true

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
      } else if (!tt.timeout) {
        tt.timeout = window.setTimeout(() => { 
          tt.train = makeTrain(track)
          tt.timeout = null
        }, rand(1,7)*1000)
      }
    }


    if (running) {
      renderer.setMessage('')
      window.requestAnimationFrame(draw)
    } else {
      renderer.setMessage('Paused')
    }
  }

  window.addEventListener('keyup', (e) => {
    console.log(e.code)
    switch(e.code) {
      case 'Space':
        running = !running
        if (running) draw()
    }
  })

  window.requestAnimationFrame(draw)
}

start()
