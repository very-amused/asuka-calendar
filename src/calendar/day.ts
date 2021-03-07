let template: CanvasImageSource

// Load canvas element
export class CalendarDay {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }

  async loadTemplate(imageURL: string) {
    // If the template hasn't been cached, load from imageURL
    if (!template) {
      const res = await fetch(imageURL)
      template = await createImageBitmap(await res.blob())
    }
    // Grow the canvas to the size of the box its filling
    const rect = this.canvas.getBoundingClientRect()
    this.canvas.width = rect.width
    this.canvas.height = rect.height

    this.canvas.width = 

    this.canvas.height = template.height as number / 3

    const { ctx } = this
    ctx.drawImage(template, 0, 0, this.canvas.width, this.canvas.height)

    // Load impact font
    const impact = await new FontFace('Impact', 'url(./fonts/impact.ttf)').load()
    document.fonts.add(impact)
  }

  writeTopText(text: string) {
    const { ctx } = this
    const posX = this.canvas.width / 7
    const posY = 24
    ctx.font = 'bold 27px Impact'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'left'
    ctx.fillText(text, posX, posY)
  }

  writeBottomText(text: string) {
    const { ctx } = this
    const posX = this.canvas.width / 2
    const posY = this.canvas.height - 12
    ctx.font = 'bold 40px Impact'
    ctx.fillStyle = 'white'
    ctx.textAlign = 'center'
    ctx.fillText(text, posX, posY)
  }
}
