interface Reservation {
    id: number;
    roomId: number;
    personId: number;
    startTime: string;
    endTime: string;
    reservationDate: string;
}

// constatnts
let reservations: Reservation[] = [];
const startTimeArray: string[] = ["07:00", "08:00", "08:55", "10:00", "10:55", "11:50", "12:45", "13:40", "14:35", "15:30", "16:25", "17:20", "18:15", "19:10", "20:05", "21:00", "21:55"];
const endTimeArray: string[] = ["07:50", "08:50", "09:45", "10:50", "11:45", "12:40", "13:35", "14:30", "15:25", "16:20", "17:15", "18:10", "19:05", "20:00", "20:50", "21:45", "22:40"];
const dayArray: string[] = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
const dayAsDateArray: string[] = ["2023-11-13", "2023-11-14", "2023-11-15", "2023-11-16", "2023-11-17"];
const allRooms: string[] = ["Fotostudio", "Audiostudio", "Videoschnitt", "EDV1", "EDV2", "EDV3", "EDV4", "EDV5", "EDV6", "EDV7", "EDV8", "EDV9", "EDV10", "EDV11", "EDV12", "EDV13", "EDV14", "EDV15", "EDV16", "EDV17", "EDV18"];
const dayDefaultValue: string = "Montag";
const startTimeDefaultValue: string = "-- Startzeit --";
const endTimeDefaultValue: string = "-- Endzeit --";

const urlParams = new URLSearchParams(window.location.search);
const roomValue = urlParams.get('roomValue');
const newUri: string = "../html/index.html?roomValue=Fotostudio";

const url: string = 'http://localhost:8080/api/reservations'

var isRoomShown = false;

// no more room null
if (roomValue == null) {
    window.location.href = newUri;
}

// MODAL
document.addEventListener("DOMContentLoaded", () => {
    const openPopupButton = document.getElementById("openPopupButton") as HTMLButtonElement;
    const modal = document.getElementById("myModal") as HTMLDivElement;
    const closeIcon = document.querySelector(".close") as HTMLElement;

    // get dropdowns
    const dropdownDay = document.getElementById("day") as HTMLSelectElement;
    const dropdownStartTime = document.getElementById("time") as HTMLSelectElement;
    const dropdownEndTime = document.getElementById("timeE") as HTMLSelectElement;

    openPopupButton.addEventListener("click", () => {
        modal.style.display = "block";

        // set value at dropdowns
        dropdownDay.value = dayDefaultValue;
        dropdownStartTime.value = startTimeDefaultValue;
        dropdownEndTime.value = endTimeDefaultValue;
    });

    closeIcon?.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        // Close modal when clicking outside of it
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

// 
document.addEventListener("DOMContentLoaded", () => {
    // Function to assign unique IDs to the columns
    const table = document.querySelector("table") as HTMLTableElement;
    const headers = table.querySelectorAll("th");
    const rows = table.querySelectorAll("tr");

    // Iterate through each header and row
    for (let i = 1; i < headers.length; i++) {
        if (!headers[i].classList.contains("hour")) {
            for (let j = 1; j < rows.length; j++) {
                const cell = (rows[j].children[i] as HTMLTableCellElement);

                // Generate a unique ID based on the column index and row index
                cell.id = `cell_${j}_${i}`;
                cell.addEventListener('click', function() {
                    openModalWithOnclick(cell.id);
                });
            }
        }
    }

    getReservationsFromDatabase();
    displayRooms();
});

// Reserving room per onlick
    function openModalWithOnclick(cellId: string) {
    const isReservated = reservations.some(function (reservation) {
        let columnAsString = getColumnId(reservation);

        for (let i = 0; i < columnAsString.length; i++) {
            if (columnAsString[i] === cellId) {
                showReservationInfo(reservation);
                return true;
            }
        }

        return false;
    });
    
    if(!isReservated) {
        // get modal
        const modal = document.getElementById("myModal") as HTMLDivElement;

        // show modall
        modal.style.display = "block";

        // get dropdown elements
        const dropdownDay = document.getElementById("day") as HTMLSelectElement;
        const dropdownStartTime = document.getElementById("time") as HTMLSelectElement;
        const dropdownEndTime = document.getElementById("timeE") as HTMLSelectElement;

        // split id into row and column
        let array:string[] = cellId.split("_");
        
        // get data from column
        const day: string = dayArray[Number(array[2]) - 1];
        const startTime: string = startTimeArray[Number(array[1]) -1];
        const endTime: string = endTimeArray[Number(array[1]) - 1];7
        
        // set value of dropdown in modal
        dropdownDay.value = day;
        dropdownStartTime.value = startTime;
        dropdownEndTime.value = endTime;
    }
}

function showErrorMessage(message: string) {
    const errorMessageBox = document.getElementById("errorMessageBox") as HTMLDivElement;
    const errorMessage = document.getElementById("error_message") as HTMLParagraphElement;
    errorMessageBox.style.display = "block";
    errorMessage.innerHTML = message;
    var i = 100;
    if (i == 100) {
        i = 99;
        var elem = document.getElementById("progressBar");
        var width = 99;
        var id = setInterval(frame, -10);
        function frame() {
          if (width <= 0) {
            clearInterval(id);
            i = 100;
          } else {
            width -= 0.09;
            elem.style.width = width + "%";
          }
        }
      }

    setTimeout(function () {
        errorMessageBox.style.display = "none";
        errorMessage.innerHTML = "";
    }, 4800);
}

// get all values from dropdown & do reservation
document.addEventListener("DOMContentLoaded", () => {
    const dropdownDay = document.getElementById("day") as HTMLSelectElement;
    const dropdownStartTime = document.getElementById("time") as HTMLSelectElement;
    const dropdownEndTime = document.getElementById("timeE") as HTMLSelectElement;
    const submitButton = document.getElementById("submitButton");

    submitButton?.addEventListener("click", async () => {
        const modal = document.getElementById("myModal") as HTMLDivElement;
        modal.style.display = "none";
        // get values from dropdown
        const startTime = dropdownStartTime.value;
        const endTime = dropdownEndTime.value;
        const day = dropdownDay.value;
        let dayId;

        // ceck if all set
        if (startTime && endTime && day) {
            // get day position in array
            for (let i: number = 0; i < dayArray.length; i++) {
                if (dayArray[i] === day) {
                    dayId = i;
                }
            }
            const reservation: Reservation = {id: reservations.length + 1, roomId: 1, personId: 1, startTime: parseToLocalDateTimeFormat(dayAsDateArray[dayId], startTime), endTime: parseToLocalDateTimeFormat(dayAsDateArray[dayId], endTime), reservationDate: dayAsDateArray[dayId]};

            try {
                await addReservationToDatabase(reservation);
            } catch (error) {
                showErrorMessage("Reservation already exists! \n Can't overwrite existing reservation!");
            } 

            getReservationsFromDatabase();
        }
    });
});

function parseToLocalDateTimeFormat(date, time) {
    const localDateTime = date +"T"+ time +":00";
    return localDateTime;
}

// adding color to box
function paintColumnsReservated(array: string[]) {
    for (let i: number = 0; i < array.length; i++) {
        let id = document.getElementById(array[i]);
        if (id) {
            id.style.backgroundColor = "#cd7f35";
        }
    }
}

// convert ids to the cell id
function cellIdToString(startTimeId: number, dayId: number): string {
    return `cell_${startTimeId}_${dayId}`;
}

// get assigned columns
function getColumnId(reservation: Reservation) {    
    let dayId: number = 0; // id of day
    let units: number = 0; // count uf units reservated
    let startTimeId: number = 0; // reservation start time
    let columnIds: string[] = []; // array of all ids

    // get startTime position in array
    for (let i: number = 0; i < startTimeArray.length; i++) {
        if (startTimeArray[i] === parseTime(reservation.startTime)) {
            startTimeId = i;

            // get units
            for (let j: number = i; j < endTimeArray.length; j++) {
                units++;
                if (endTimeArray[j] === parseTime(reservation.endTime)) {
                    break;
                }
            };
        }
    };

    // get day position in array
    for (let i: number = 0; i < dayArray.length; i++) {
        if (dayArray[i] === parseDay(reservation.reservationDate)) {
            // + 1 because the first column is 1 not 0
            dayId = i + 1;
        }
    }

    // fill array with the ids from html
    for (let i: number = startTimeId; i < startTimeId + units; i++) {
        columnIds.push(cellIdToString(i + 1, dayId));
    }

    return columnIds;
}

function getReservationsFromDatabase() {
// Example usage
    const getUrl = url + '/list';
    try {
        fetchDataFromUrl(getUrl)
            .then(data => {
                if (data) {
                    reservations.length = 0;
                    data.forEach(singleReservation => {
                        const reservation: Reservation = {id: singleReservation.id, roomId: singleReservation.roomId, personId: singleReservation.personId, startTime: singleReservation.startTime, endTime: singleReservation.endTime, reservationDate: singleReservation.reservationDate }
                        reservations.push(reservation);
                        loadReservation(reservation);
                    });
                }
            })
    }
    catch(error) {
        showErrorMessage('Failed to fetch data from server! \n Pleas check your internet connection!');
    }
}

function loadReservation(reservation: Reservation) {
    reservation.startTime = reservation.startTime.slice(0, -3);
    reservation.endTime = reservation.endTime.slice(0, -3);

    let columns = getColumnId(reservation);

    paintColumnsReservated(columns);
}

// parse day received from beckand
function parseDay(dateString) {
    let array = dateString.split("T");
    const dateObject = new Date(array[0]);
    let dayIndex = dateObject.getDay();

    // adjust index, becaus getDay() starts and ends with Sunday
    dayIndex = (dayIndex + 6) % 7;

    //console.log(array[0]);
    //console.log(dayArray[dayIndex]);

    return dayArray[dayIndex];
}

//parse time received from backend
function parseTime(startTime: string) {
    let array = startTime.split("T");
    return array[1];
}

// Function to show or hide the rooms
function showRooms() {
    // Get references to DOM elements
    var box = document.getElementById("rooms");
    var changeRoom = document.getElementById("changeRoom");
    var openPopupButton = document.getElementById("openPopupButton");

    // Check if the rooms are currently shown
    if (isRoomShown) {
        // If shown, animate hiding
        box.style.transform = "translate(100%, -50%)";
        changeRoom.style.transform = "translate(0%, 0%)";
        openPopupButton.style.transform = "translate(0%, 0%)";

        // Delay hiding the box until the animation is complete
        setTimeout(function () {
            box.style.display = "none";
        }, 501);

        isRoomShown = false;
    } else {
        box.style.display = "grid";

        // Delay showing the box until the animation is complete
        setTimeout(function () {
            box.style.transform = "translate(0%, -50%)";
        }, 0);

        // Move other elements off-screen when showing the rooms
        changeRoom.style.transform = "translate(-340%, 0%)";
        openPopupButton.style.transform = "translate(-340%, 0%)";

        isRoomShown = true;
    }
}

function displayRooms() {
    var box = document.getElementById("rooms");

    // Clear existing content in the box
    box.innerHTML = '';

    // Assuming allRooms is an array of strings
    for (let i = 0; i < allRooms.length; i++) {
        // Use textContent instead of innerHTML
        var anchor = document.createElement("a");
        anchor.textContent = allRooms[i];
        anchor.id = allRooms[i];

        let currentRoomId: string = anchor.id;

        // set color for selected room
        if (compareRoom(allRooms[i])) {
            anchor.style.cssText = "color: #f5b963"; // Matching room
        } else {
            anchor.style.cssText = "color: #fff"; // Non-matching room
        }

        // reload page with correct room
        anchor.href = `../html/index.html?roomValue=${currentRoomId}`;

        box.appendChild(anchor);
    }
}

function compareRoom(room: string) {
    return roomValue === room;
}

async function fetchDataFromUrl(url: string): Promise<any | null> {
    try {
        const response = await fetch(url);

        // Check if the request was successful (status code 200)
        if (response.ok) {
            // Parse the response JSON and return
            return await response.json();
        } else {
            // Print an error message if the request was not successful
            console.error(`Error: Unable to fetch data. Status code: ${response.status}`);
            return null;
        }
    } catch (error) {
        showErrorMessage('Failed to fetch the data from server! Check your internet connection!');
    }
}

async function addReservationToDatabase(reservation: Reservation) {
    const response = await fetch(url, {
        method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(reservation)
    });

    if (!response.ok) {
        throw new Error('Failed to add reservation');
    }
}

function showReservationInfo(reservation: Reservation) {
    const infoBox = document.getElementById("InfoBox");
    const infoMessage = document.getElementById("info_content");
    infoBox.style.display = "block";
    infoMessage.innerHTML = reservationToString(reservation);
    

    window.addEventListener("click", (event) => {
        // Close modal when clicking outside of it
        if (event.target === infoBox) {
            infoBox.style.display = "none";
        }
    });
}

function reservationToString(reservation: Reservation): string {
    let result: string = `Name(id): ${reservation.personId} \n Date: ${reservation.reservationDate} \n Start: ${parseTime(reservation.startTime)}, End: ${parseTime(reservation.endTime)}`;
    return result;
  }  