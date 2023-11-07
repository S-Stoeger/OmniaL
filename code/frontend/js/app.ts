type Reservation = {
    day: string;
    startTime: string;
    endTime: string;
}

let reservations: Reservation[] = [];

loadAllReservations()

// popup window
document.addEventListener("DOMContentLoaded", () => {
    const openPopupButton = document.getElementById("openPopupButton") as HTMLButtonElement;
    const modal = document.getElementById("myModal") as HTMLDivElement;
    const closeIcon = document.querySelector(".close") as HTMLElement;

    openPopupButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeIcon?.addEventListener("click", () => {
        modal.style.display = "none";
    });

    function    closeModal() {
        modal.style.display = "none";
    }

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

// 
document.addEventListener("DOMContentLoaded", () => {
    // Function to assign unique IDs to the columns
    function assignColumnIds() {
        const table = document.querySelector("table") as HTMLTableElement;
        const headers = table.querySelectorAll("th");
        const rows = table.querySelectorAll("tr");

        // Iterate through each header and row
        for (let i = 0; i < headers.length; i++) {
            if (!headers[i].classList.contains("hour")) {
                for (let j = 1; j < rows.length; j++) {
                    const cell = (rows[j].children[i] as HTMLTableCellElement);
                    // Generate a unique ID based on the column index and row index
                    cell.id = `cell_${j}_${i}`;
                }
            }
        }
    }

    // Call the function to assign IDs
    assignColumnIds();
});

// get all values from dropdown
document.addEventListener("DOMContentLoaded", () => {
    const dropdownDay = document.getElementById("day") as HTMLSelectElement;
    const dropdownStartTime = document.getElementById("time") as HTMLSelectElement;
    const dropdownEndTime = document.getElementById("timeE") as HTMLSelectElement;
    const submitButton = document.getElementById("submitButton");

    submitButton?.addEventListener("click", () => {
        // get values from dropdown
        const startTime = dropdownStartTime.value;
        const endTime = dropdownEndTime.value;
        const day = dropdownDay.value;

        // ceck if all set
        if (startTime && endTime && day) {
            if (endTime > startTime) {
                // get values/convert to id/ make reservation
                getColumn(startTime, endTime, day);
            }
        }
    });
});

// adding color to box
function addReservation(array: string[]) {
    for (let i: number = 0; i < array.length; i++) {
        let id = document.getElementById(array[i]);
        if (id) {
            id.style.backgroundColor = "#eb4258";
        }
    }
}


// convert ids to the cell id
function toCell(startTimeId: number, dayId: number): string {
    return `cell_${startTimeId}_${dayId}`;
}

function saveReservationToLocalStorage(reservation: Reservation) {
    const storedReservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    //console.log(storedReservations)
    storedReservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(storedReservations));
}

// get assigned columns
function getColumn(startTime: string, endTime: string, day: string) {//: String[] {

    const reservation: Reservation = {day: day, startTime: startTime, endTime: endTime}
    reservations.push(reservation)

    saveReservationToLocalStorage(reservation);

    // arrays with the values

    const startTimeArray: string[] = ["07:00", "08:00", "08:55", "10:00", "10:55", "11:50", "12:45", "13:40", "14:35", "15:30", "16:25", "17:20", "18:15", "19:10", "20:05", "21:00", "21:55"];
    const endTimeArray: string[] = ["07:50", "08:50", "09:45", "10:50", "11:45", "12:40", "13:35", "14:30", "15:25", "16:20", "17:15", "18:10", "19:05", "20:00", "20:50", "21:45", "22:40"];
    const dayArray: string[] = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];

    // importatnt variables
    let dayId: number = 0; // id of day
    let units: number = 0; // count uf units reservated
    let startTimeId: number = 0; // reservation start time
    let columnIds: string[] = []; // array of all ids

    // get start id
    for (let i: number = 0; i < startTimeArray.length; i++) {
        if (startTimeArray[i] === startTime) {
            startTimeId = i;

            // get units
            for (let j: number = i; j < endTimeArray.length; j++) {
                units++;
                if (endTimeArray[j] === endTime) {
                    break;
                }
            };
        }
    };

    // get dayId
    for (let i: number = 0; i < dayArray.length; i++) {
        if (dayArray[i] === day) {
            // + 1 because the first column is 1 not 0
            dayId = i + 1;
        }
    }

    // fill array with the ids from html
    for (let i: number = startTimeId; i < startTimeId + units; i++) {
        // + 1 because the first row is 1 not 0
        columnIds.push(toCell(i + 1, dayId));
    }

    // add reservations to calendar
    addReservation(columnIds);
}


function loadAllReservations() {
    const storedReservations = getLocalStorageAsArray();

    console.log("akdbhajhdbajhd")
    console.log(storedReservations)
    for (let i: number = 0; i < storedReservations.length; i++) {


        let reservationsArray = JSON.parse(storedReservations[i]);
        console.log("hier")
        console.log(reservationsArray)
        let day: string = reservationsArray[i].day;
        console.log(day)
        let startTime: string = reservationsArray[i].startTime;
        let endTime: string = reservationsArray[i].endTime;

        getColumn(startTime, endTime, day)
    }
}

function getLocalStorageAsArray(): string[] {
    const localStorageArray: string[] = [];

    // Iterate through all keys in localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = "reservations";
        if (key) {
            const value = localStorage.getItem(key);
            if (value) {
                localStorageArray.push(value);
            }
        }
    }
    return localStorageArray;
}