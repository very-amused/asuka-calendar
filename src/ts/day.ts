let template: CanvasImageSource

// Load canvas element
export class CalendarDay {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor(canvasID: string) {
    this.canvas = document.getElementById(canvasID) as HTMLCanvasElement
    console.log(this.canvas)
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }

  async loadTemplate(imageURL: string) {
    // If the template hasn't been cached, load from imageURL
    if (!template) {
      const res = await fetch(imageURL)
      template = await createImageBitmap(await res.blob())
    }
    // Grow the canvas to the size of the template
    this.canvas.width = template.width as number / 2
    this.canvas.height = template.height as number / 2

    const { ctx } = this
    ctx.drawImage(template, 0, 0, this.canvas.width, this.canvas.height)
  }

  writeTopText(text: string) {
    const { ctx } = this
    const posX = this.canvas.width / 6
    const posY = 20
    ctx.font = '24px Impact'
    ctx.fillStyle = 'white'
    ctx.fillText(text, posX, posY)
  }
}
