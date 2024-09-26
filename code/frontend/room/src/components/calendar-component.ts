import { SelectedDate } from "Model/model";

document.getElementById("openCalendar").addEventListener("click", openCalendar)

const header: HTMLElement | null = document.querySelector("#calendar h3");
const dates: HTMLElement | null = document.querySelector(".dates");
const navs: NodeListOf<Element> = document.querySelectorAll("#prev, #next");

var isCalendarShown = false;

const months: string[] = [
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

let selectedDate: SelectedDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
};

function renderCalendar(): void {
    const start: number = new Date(selectedDate.year, selectedDate.month, 1).getDay();
    const endDate: number = new Date(selectedDate.year, selectedDate.month + 1, 0).getDate();
    const end: number = new Date(selectedDate.year, selectedDate.month, endDate).getDay();
    const endDatePrev: number = new Date(selectedDate.year, selectedDate.month, 0).getDate();
    let datesHtml: string = "";

    for (let i = start; i > 0; i--) {
      datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
    }

    for (let i = 1; i <= endDate; i++) {
      let className: string =
        i === selectedDate.day && selectedDate.month === new Date().getMonth() && selectedDate.year === new Date().getFullYear()
          ? ' class="today"'
          : "";
      datesHtml += `<li ${className}>${i}</li>`;
    }

    for (let i = end; i < 6; i++) {
      datesHtml += `<li class="inactive">${i - end + 1}</li>`;
    }

    if (dates) {
      dates.innerHTML = datesHtml;

      // Select all li elements inside the dates element
      const dateItems = dates.querySelectorAll("li");

      // Add event listener to each date item
      dateItems.forEach((item, index) => {
        if (index < start || index >= start + endDate) {
          return; // Skip inactive dates
        }

        item.addEventListener("click", () => {
          setSelectedDate(selectedDate.year, selectedDate.month, index - start + 1);
        });
      });
    }

    if (header) {
      header.textContent = `${months[selectedDate.month]} ${selectedDate.year}`;
    }
}


function setSelectedDate(year: number, month: number, day: number): void {
    let newWeek: String = "";
    const lastDayOfMonth: number = new Date(year, month + 1, 0).getDate();
   
    if (day > lastDayOfMonth) {
      day = lastDayOfMonth;
    }

    const selectedDateObject: Date = new Date(year, month, day);
    const dayOfWeek: number = selectedDateObject.getDay();
    const mondayOfTheWeek: Date = new Date(selectedDateObject);
    mondayOfTheWeek.setDate(selectedDateObject.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));

    // Update your selectedDate object or perform any other actions as needed
    selectedDate = {
      year: mondayOfTheWeek.getFullYear(),
      month: mondayOfTheWeek.getMonth(),
      day: mondayOfTheWeek.getDate(),
    };

    newWeek = mondayOfTheWeek.toDateString() + " 00:00:00 GMT+0100 (Central European Standard Time)";

    localStorage.setItem("date", newWeek +"");
    location.reload();

    closeCalendar();
}


navs.forEach((nav) => {
    nav.addEventListener("click", (e) => {
      const btnId: string = (e.target as HTMLElement).id;

      if (btnId === "prev" && selectedDate.month === 0) {
        selectedDate.year--;
        selectedDate.month = 11;
      } else if (btnId === "next" && selectedDate.month === 11) {
        selectedDate.year++;
        selectedDate.month = 0;
      } else {
        selectedDate.month = btnId === "next" ? selectedDate.month + 1 : selectedDate.month - 1;
      }

      renderCalendar();
    });
});

renderCalendar();

  function openCalendar() {
    if(isCalendarShown) {
        closeCalendar()
    } else {
        isCalendarShown = true;
        let calendarElement = document.getElementById('calendar');  
        calendarElement.style.display = 'block';
    }  
}

export function closeCalendar() {
    isCalendarShown = false;
    let calendarElement = document.getElementById('calendar');  
    calendarElement.style.display = 'none';
}