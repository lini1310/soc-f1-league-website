let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

function createCalendar(events) {
  // Create calendar table
  const table = document.createElement("table");

  // Create table header with month and year
  const headerRow = document.createElement("tr");
  const headerCell = document.createElement("th");
  headerCell.setAttribute("colspan", "7");
  headerCell.textContent = new Date(
    currentYear,
    currentMonth
  ).toLocaleDateString("en-US", { month: "long", year: "numeric" });
  headerRow.appendChild(headerCell);
  table.appendChild(headerRow);
  // Calculate start and end date of the month
  const startDate = new Date(currentYear, currentMonth, 1);
  const endDate = new Date(currentYear, currentMonth + 1, 0);

  // Loop through each date of the month and create table cell
  let date = startDate;
  while (date <= endDate) {
    const row = document.createElement("tr");

    let date = startDate;
    while (date <= endDate) {
      const row = document.createElement("tr");

      for (let i = 0; i < 7; i++) {
        const cell = document.createElement('td');
      
        // Check if the date is within the current month
        if (date.getMonth() === currentMonth) {
          // Highlight today's date
          if (date.toDateString() === new Date().toDateString()) {
            cell.classList.add('today');
          }
      
          // Check if any event occurs on the current date
          const eventsOnDate = events.filter(event => new Date(event.event_date).toDateString() === date.toDateString());
          if (eventsOnDate.length > 0) {
            eventsOnDate.forEach(event => {
              const eventElement = document.createElement('div');
              eventElement.textContent = event.title;
              eventElement.classList.add('event');
              cell.appendChild(eventElement);
            });
          }
      
          // Add date to cell
          const dateElement = document.createElement('div');
          dateElement.textContent = date.getDate();
          cell.appendChild(dateElement);
        } else {
          // Add empty class to cell if date is not within the current month
          cell.classList.add('empty');
        }
      
        row.appendChild(cell);
      
        // Increase date by one day
        date.setDate(date.getDate() + 1);
      }
      

      table.appendChild(row);
    }

    table.appendChild(row);
  }

  // Append table to calendar div
  const calendarDiv = document.getElementById("calendar");
  calendarDiv.innerHTML = "";
  calendarDiv.appendChild(table);
}

// Fetch events from API and create calendar
function fetchEventsAndCreateCalendar() {
  fetch("http://45.145.224.59:3000/events")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((events) => {
      createCalendar(events);
      console.log(events);
    })
    .catch((error) => {
      console.error(error);
      const errorDiv = document.createElement("div");
      errorDiv.textContent = `An error occurred while fetching events: ${error.message}`;
      const calendarDiv = document.getElementById("calendar");
      calendarDiv.innerHTML = "";
      calendarDiv.appendChild(errorDiv);
    });
}
// Fetch events and create calendar on page load
fetchEventsAndCreateCalendar();

// Add event listeners to previous and next month buttons
const prevMonthButton = document.getElementById("prev-month");
prevMonthButton.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  fetchEventsAndCreateCalendar();
});

const nextMonthButton = document.getElementById("next-month");
nextMonthButton.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  fetchEventsAndCreateCalendar();
});
