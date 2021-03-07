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

function getRandomDayNot(...days: WeekDays[]): WeekDays {
  let day: WeekDays
  const possibleDays = Object.values(WeekDays)
    .filter(v => typeof v !== 'string') as WeekDays[]
  do {
    day = possibleDays[Math.floor(Math.random() * possibleDays.length)]
  } while (days.includes(day))
  return day
}

export class CalendarMonth {
  el: HTMLElement
  days: number
  startsOn: WeekDays
  randomDays: { [date: number]: WeekDays } = {}

  constructor(monthEl: HTMLElement, days: number, startsOn: WeekDays) {
    this.el = monthEl
    this.days = days
    this.startsOn = startsOn
  }

  async draw() {
    for (let i = this.startsOn; i < (this.days + this.startsOn); i++) {
      const gridRow = Math.ceil((i + 1) / 7) + 1
      const gridColumn = (i % 7) + 1

      // Create a canvas element for the day
      const canvas = document.createElement('canvas')
      // Position it using the calculated row and column
      canvas.style.gridRow = `${gridRow} / span 1`
      canvas.style.gridColumn = `${gridColumn} / span 1`

      this.el.appendChild(canvas)

      // Find the name of the day of the week
      const dayOfWeek: WeekDays = gridColumn - 1

      const day = new CalendarDay(canvas)
      await day.loadTemplate('./img/template.png')
      day.writeBottomText(WeekDays[dayOfWeek])
      const randomDay = getRandomDayNot(
        this.randomDays[i-1],
        dayOfWeek,
        this.randomDays[i-7]
      )
      this.randomDays[i] = randomDay
      day.writeTopText(WeekDays[randomDay])
      day.writeDate(i + 1 - this.startsOn)
    }
  }
}