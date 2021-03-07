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
    this.canvas.width = Math.max(rect.width, rect.height) 
    this.canvas.height = Math.max(rect.width, rect.height)
    const { ctx } = this
    ctx.drawImage(template, 0, 0, this.canvas.width, this.canvas.height)

    // Load impact font
    const impact = await new FontFace('Impact', 'url(./fonts/impact.ttf)').load()
    document.fonts.add(impact)

    // Set up text drawing params
    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'
  }

  writeTopText(text: string) {
    const { ctx } = this
    const posX = Math.round(this.canvas.width / 3 + (this.canvas.width / 50))
    const posY = 24
    ctx.font = `bold ${text.length >= 9 ? posY + 2 : posY + 6}px Impact`
    ctx.textAlign = 'center'
    ctx.fillText(text, posX, posY)
    ctx.strokeText(text, posX, posY)
  }

  writeBottomText(text: string) {
    const { ctx } = this
    const posX = Math.round(this.canvas.width / 2)
    const posY = Math.round(this.canvas.height - 12)
    ctx.font = `bold ${text.length < 9 ? Math.round(this.canvas.width / 6) : Math.round(this.canvas.width / 7)}px Impact`
    ctx.textAlign = 'center'
    ctx.fillText(text, posX, posY)
    ctx.strokeText(text, posX, posY)
  }

  writeDate(date: number) {
    const { ctx } = this
    const posX = Math.round(this.canvas.width - 6)
    const posY = Math.round(this.canvas.height - 6)
    ctx.font = 'light 24px sans'
    ctx.textAlign = 'right'
    ctx.fillText(date.toString(), posX, posY)
  }
}
