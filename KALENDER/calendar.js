// Replace with your iCloud calendar's public URL
const ICLOUD_CALENDAR_URL = 'https://pXX-calendars.icloud.com/published/2/your_unique_calendar_id_here';

// Generate the calendar structure
function createCalendar(year, month) {
  const firstDay = new Date(year, month).getDay();
  const daysInMonth = 32 - new Date(year, month, 32).getDate();

  let calendarHTML = '<table id="calendar"><thead><tr>';

  // Weekdays
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  for (let day of days) {
    calendarHTML += `<th>${day}</th>`;
  }

  calendarHTML += '</tr></thead><tbody><tr>';

  // Fill in the days
  for (let i = 1; i <= 42; i++) {
    const day = i - firstDay;
    if (i % 7 === 1) {
      calendarHTML += '</tr><tr>';
    }

    if (day < 1 || day > daysInMonth) {
      calendarHTML += '<td></td>';
    } else {
      calendarHTML += `<td data-date="${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}">${day}</td>`;
    }
  }

  calendarHTML += '</tr></tbody></table>';
  document.getElementById('calendar').innerHTML = calendarHTML;
}

// Fetch events from the iCloud calendar
async function fetchEvents() {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const response = await fetch(proxyUrl + ICLOUD_CALENDAR_URL);
  const data = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data, 'text/xml');
  const events = xmlDoc.getElementsByTagName('VEVENT');

  for (const event of events) {
    const summary = event.querySelector('SUMMARY').textContent;
    const startDate = event.querySelector('DTSTART').textContent.slice(0, 8);
    const formattedDate = `${startDate.slice(0, 4)}-${startDate.slice(4, 6)}-${startDate.slice(6, 8)}`;

    const eventElement = document.querySelector(`[data-date="${formattedDate}"]`);
    if (eventElement) {
      eventElement.classList.add('event');
      eventElement.setAttribute('title', summary);

      // Create a tooltip for the event
      const tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      const tooltipText = document.createElement('span');
      tooltipText.classList.add('tooltip-text');
      tooltipText.textContent = summary;
      tooltip.appendChild(tooltipText);
      eventElement.appendChild(tooltip);
    }
  }
}

// Initialize the calendar
const today = new Date();
createCalendar(today.getFullYear(), today.getMonth());
fetchEvents();

// Add navigation controls
const prevMonthBtn = document.createElement('button');
prevMonthBtn.textContent = 'Previous Month';
const nextMonthBtn = document.createElement('button');
nextMonthBtn.textContent = 'Next Month';
const btnGroup = document.createElement('div');
btnGroup.classList.add('btn-group');
btnGroup.appendChild(prevMonthBtn);
btnGroup.appendChild(nextMonthBtn);
document.getElementById('calendar').insertAdjacentElement('afterend', btnGroup);

let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
prevMonthBtn.addEventListener('click', () => {
  if (currentMonth === 0) {
    currentYear--;
    currentMonth = 11;
  } else {
    currentMonth--;
  }
// Update the calendar when navigating
nextMonthBtn.addEventListener('click', () => {
    if (currentMonth === 11) {
    currentYear++;
    currentMonth = 0;
    } else {
    currentMonth++;
    }
    
    createCalendar(currentYear, currentMonth);
    fetchEvents();
    });
    
    // Update the calendar when navigating
    prevMonthBtn.addEventListener('click', () => {
    if (currentMonth === 0) {
    currentYear--;
    currentMonth = 11;
    } else {
    currentMonth--;
    }
    
    createCalendar(currentYear, currentMonth);
    fetchEvents();
    });