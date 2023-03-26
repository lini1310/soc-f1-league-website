const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const monthYearElement = document.getElementById("month-year");
const calendarDaysElement = document.querySelector(".calendar-days");

function displayCalendar(month, year) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const lastDayOfMonth = new Date(year, month, daysInMonth).getDay();
  
  monthYearElement.textContent = `${getMonthName(month)} ${year}`;
  
  let days = "";
  for (let i = 1; i <= daysInMonth; i++) {
    days += `<div class="${getDateClass(i, month, year)}">${i}</div>`;
  }
  calendarDaysElement.innerHTML = days;
  
  let prevMonthDays = "";
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const date = new Date(year, month, -i).getDate();
    prevMonthDays += `<div class="prev-month">${date}</div>`;
  }
  calendarDaysElement.innerHTML = prevMonthDays + days;
  
  let nextMonthDays = "";
  for (let i = 1; i < 7 - lastDayOfMonth; i++) {
    const date = new Date(year, month + 1, i).getDate();
    nextMonthDays += `<div class="next-month">${date}</div>`;
  }
  calendarDaysElement.innerHTML += nextMonthDays;
}

function getDateClass(day, month, year) {
  const date = new Date(year, month, day);
  if (date.toDateString() === currentDate.toDateString()) {
    return "today";
  }
  return "";
}

function getMonthName(month) {
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
    "December",
  ];
  return months[month];
}

displayCalendar(currentMonth, currentYear);

document.getElementById("prev").addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  displayCalendar(currentMonth, currentYear);
});

document.getElementById("next").addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  displayCalendar(currentMonth, currentYear);
});