import {CalendarDay} from "./day.js";
export var WeekDays;
(function(WeekDays2) {
  WeekDays2[WeekDays2["Sunday"] = 0] = "Sunday";
  WeekDays2[WeekDays2["Monday"] = 1] = "Monday";
  WeekDays2[WeekDays2["Tuesday"] = 2] = "Tuesday";
  WeekDays2[WeekDays2["Wednesday"] = 3] = "Wednesday";
  WeekDays2[WeekDays2["Thursday"] = 4] = "Thursday";
  WeekDays2[WeekDays2["Friday"] = 5] = "Friday";
  WeekDays2[WeekDays2["Saturday"] = 6] = "Saturday";
})(WeekDays || (WeekDays = {}));
function getRandomDayNot(...days) {
  let day;
  const possibleDays = Object.values(WeekDays).filter((v) => typeof v !== "string");
  do {
    day = possibleDays[Math.floor(Math.random() * possibleDays.length)];
  } while (days.includes(day));
  return day;
}
export class CalendarMonth {
  constructor(monthEl, days, startsOn) {
    this.randomDays = {};
    this.el = monthEl;
    this.days = days;
    this.startsOn = startsOn;
  }
  async draw() {
    for (let i = this.startsOn; i < this.days + this.startsOn; i++) {
      const gridRow = Math.ceil((i + 1) / 7) + 1;
      const gridColumn = i % 7 + 1;
      const canvas = document.createElement("canvas");
      canvas.style.gridRow = `${gridRow} / span 1`;
      canvas.style.gridColumn = `${gridColumn} / span 1`;
      this.el.appendChild(canvas);
      const dayOfWeek = gridColumn - 1;
      const day = new CalendarDay(canvas);
      await day.loadTemplate("./img/template.png");
      day.writeBottomText(WeekDays[dayOfWeek]);
      const randomDay = getRandomDayNot(this.randomDays[i - 1], dayOfWeek, this.randomDays[i - 7]);
      this.randomDays[i] = randomDay;
      day.writeTopText(WeekDays[randomDay]);
      day.writeDate(i + 1 - this.startsOn);
    }
  }
}
