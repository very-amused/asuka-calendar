let template: CanvasImageSource

// Load canvas element
export class CalendarDay {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

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
    const side = Math.max(rect.width, rect.height) * 0.7
    this.canvas.width = side
    this.canvas.height = side
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
    const posY = text.length < 9 ? 18 : 16
    ctx.font = `bold ${text.length < 9 ? posY + 4 : posY + 2}px Impact`
    ctx.textAlign = 'center'
    ctx.fillText(text, posX, posY)
    ctx.strokeText(text, posX, posY)
  }

  writeBottomText(text: string) {
    const { ctx } = this
    const posX = Math.round(this.canvas.width / 2)
    const posY = Math.round(this.canvas.height - 8)
    ctx.font = `bold ${text.length < 9 ? Math.round(this.canvas.width / 6) : Math.round(this.canvas.width / 7)}px Impact`
    ctx.textAlign = 'center'
    ctx.fillText(text, posX, posY)
    ctx.strokeText(text, posX, posY)
  }

  writeDate(date: number) {
    const { ctx } = this
    const posX = Math.round(this.canvas.width - (date < 10 ? 6 : 3))
    const posY = Math.round(this.canvas.height - 6)
    ctx.font = '22px Impact'
    ctx.textAlign = 'right'
    ctx.fillText(date.toString(), posX, posY)
  }
}
