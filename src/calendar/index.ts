import { CalendarMonth }  from './month.js'

const month = new CalendarMonth('march')

async function render() {
  await month.draw()
}

render()