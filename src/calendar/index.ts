import { CalendarDay } from './day.js'

const day = new CalendarDay('test')

;(async () => {
  await day.loadTemplate('img/template.png')
  day.writeTopText('Wednesday')
})()