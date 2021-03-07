import { CalendarMonth }  from './month.js'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const year = new Date().getFullYear()

// Generate calendars for each month
const rootEl = document.getElementById('calendars')!


async function render() {
  for (let i = 0; i < months.length; i++){
    const el = document.createElement('div')
    el.classList.add('month')
    el.id = months[i]

    // Add header
    const header = document.createElement('header')
    header.textContent = months[i]
    header.classList.add('title')
    el.appendChild(header)

    // Calculate start day and length
    const startsOn = new Date(year, i, 1).getDay()
    const days = new Date(year, i+1, 0).getDate()

    rootEl.appendChild(el)

    // Render canvas
    const month = new CalendarMonth(el, days, startsOn)
    await month.draw()
  }
}

render()