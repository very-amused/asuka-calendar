import {CalendarMonth} from "./month.js";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const year = new Date().getFullYear();
const rootEl = document.getElementById("calendars");
async function render() {
  for (let i = 0; i < months.length; i++) {
    const el = document.createElement("div");
    el.classList.add("month");
    el.id = months[i];
    const header = document.createElement("header");
    header.textContent = months[i];
    header.classList.add("title");
    el.appendChild(header);
    const startsOn = new Date(year, i, 1).getDay();
    const days = new Date(year, i + 1, 0).getDate();
    rootEl.appendChild(el);
    const month = new CalendarMonth(el, days, startsOn);
    await month.draw();
  }
}
render();
