import { CalendarDay } from './day.js'

export enum WeekDays {
  Sunday = 0,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

export class CalendarMonth {
  el: HTMLElement
  days: number
  startsOn: WeekDays

  constructor(monthID: string) {
    this.el = document.getElementById(monthID) as HTMLElement
    this.days = 28
    this.startsOn = WeekDays.Monday
  }

  async draw() {
    for (let i = 0; i < (this.days + this.startsOn); i++) {
      const gridRow = Math.ceil(i / 7) + 1
      const gridColumn = (i - ((gridRow - 1) * 7)) + 1
      const dayOfWeek = WeekDays[i - (gridColumn - 1)]
      if (i < this.startsOn) {
        continue
      }

      // Create a canvas element for the day
      const canvas = document.createElement('canvas')
      // Position it using the calculated row and column
      canvas.style.gridRow = gridRow.toString()
      canvas.style.gridColumn = gridColumn.toString()

      this.el.appendChild(canvas)

      const day = new CalendarDay(canvas)
      await day.loadTemplate('./img/template.png')
      day.writeBottomText(dayOfWeek)
    }
  }
}