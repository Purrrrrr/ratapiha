export const CANVAS_WIDTH = 250;
export const CANVAS_HEIGHT = 200;

export function createCanvas() {
  const canvasEl = document.createElement('canvas')
  document.body.appendChild(canvasEl)

  const canvas = new fabric.Canvas(canvasEl, {
    backgroundColor: 'green',
    selection: false,
    hoverCursor: 'default',
  })
  canvas.absolutePan(new fabric.Point(0.5,0.5))

  function sizeCanvas()
  {
    const winWidth = Math.max(document.documentElement.clientWidth,  window.innerWidth  || 0);
    const winHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    let width = winWidth, height = winHeight
    const ratio = CANVAS_WIDTH/CANVAS_HEIGHT
    
    if (width > height * ratio) {
      width = height * ratio
    } else {
      height = width / ratio
    }
 
    canvas.setHeight( height )
    canvas.setWidth( width )
    canvas.setZoom( width/CANVAS_WIDTH )
  }
  sizeCanvas()

  window.addEventListener('resize', sizeCanvas, false);
  return canvas
}
