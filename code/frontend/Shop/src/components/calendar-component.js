const monthYear = document.getElementById("month-year");
const daysContainer = document.getElementById("days-container");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

// Array for month names
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let currentDate = new Date();
let selectedDays = []; // Array to track selected days

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update the header to show current month and year
    monthYear.textContent = `${months[month]} ${year}`;

    // Get the first day and number of days in the current month
    const firstDay = new Date(year, month, 1).getDay(); // Day of the week (0 = Sunday)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Last day of the month

    // Clear the days container
    daysContainer.innerHTML = "";

    // Fill blank days for the start of the week
    const blanks = firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday-starting week
    for (let i = 0; i < blanks; i++) {
        const blankDay = document.createElement("div");
        blankDay.classList.add("day", "disabled");
        daysContainer.appendChild(blankDay);
    }

    // Fill the days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement("div");
        day.textContent = i;
        day.classList.add("day");

        // Highlight weekends (Saturday = 6, Sunday = 0)
        const dayOfWeek = new Date(year, month, i).getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            day.classList.add("weekend");
        }

        // Add click event for selecting a day
        day.addEventListener("click", () => {
            toggleDaySelection(i);
        });

        // Highlight selected days
        if (selectedDays.includes(i)) {
            day.classList.add("selected");
        }

        // Highlight the range between selected days
        if (selectedDays.length === 2 && i > Math.min(...selectedDays) && i < Math.max(...selectedDays)) {
            day.classList.add("highlighted");
        }

        daysContainer.appendChild(day);
    }
}

function toggleDaySelection(day) {
    if (selectedDays.includes(day)) {
        // Deselect the day
        selectedDays = selectedDays.filter((d) => d !== day);
    } else {
        // Add the day if less than 2 are selected
        if (selectedDays.length < 2) {
            selectedDays.push(day);
        } else {
            // Replace the earliest selected day if 2 are already selected
            selectedDays.shift();
            selectedDays.push(day);
        }
    }

    // Re-render the calendar to update the visual selection and range
    renderCalendar();
}

prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Initialize calendar
renderCalendar();
