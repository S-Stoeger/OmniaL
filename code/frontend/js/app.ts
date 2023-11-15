type Reservation = {
    day: string;
    startTime: string;
    endTime: string;
}
// constatnts
const startTimeArray: string[] = ["07:00", "08:00", "08:55", "10:00", "10:55", "11:50", "12:45", "13:40", "14:35", "15:30", "16:25", "17:20", "18:15", "19:10", "20:05", "21:00", "21:55"];
const endTimeArray: string[] = ["07:50", "08:50", "09:45", "10:50", "11:45", "12:40", "13:35", "14:30", "15:25", "16:20", "17:15", "18:10", "19:05", "20:00", "20:50", "21:45", "22:40"];
const dayArray: string[] = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
const allRooms: string[] = ["Fotostudio", "Audiostudie", "Viedeoschnitt", "EDV1", "EDV2", "EDV3", "EDV4", "EDV5", "EDV6", "EDV7", "EDV8", "EDV9", "EDV10", "EDV11", "EDV12", "EDV13", "EDV14", "EDV15", "EDV16", "EDV17", "EDV18"];
const dayDefaultValue: string = "Montag";
const startTimeDefaultValue: string = "-- Startzeit --";
const endTimeDefaultValue: string = "-- Endzeit --";

const urlParams = new URLSearchParams(window.location.search);
const roomValue = urlParams.get('roomValue');
const newUri: string = "../html/index.html?roomValue=Fotostudio";

// no more room null
if (roomValue == null) {
    window.location.href = newUri;
}

let reservations: Reservation[] = [];


loadAllReservations()

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
    function assignColumnIds() {
        const table = document.querySelector("table") as HTMLTableElement;
        const headers = table.querySelectorAll("th");
        const rows = table.querySelectorAll("tr");

        // Reserving room per onlick
        function addReservationPerClick(cellId: string) {
            // get modal
            const modal = document.getElementById("myModal") as HTMLDivElement;

            // show modal
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

        // Iterate through each header and row
        for (let i = 1; i < headers.length; i++) {
            if (!headers[i].classList.contains("hour")) {
                for (let j = 1; j < rows.length; j++) {
                    const cell = (rows[j].children[i] as HTMLTableCellElement);

                    // Generate a unique ID based on the column index and row index
                    cell.id = `cell_${j}_${i}`;
                    cell.addEventListener('click', function() {
                        addReservationPerClick(cell.id);
                    });
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
        const modal = document.getElementById("myModal") as HTMLDivElement;
        modal.style.display = "none";
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
            id.style.backgroundColor = "#cd7f35";
        }
    }
}


// convert ids to the cell id
function toCell(startTimeId: number, dayId: number): string {
    return `cell_${startTimeId}_${dayId}`;
}


// get assigned columns
function getColumn(startTime: string, endTime: string, day: string) {//: String[] {

    const reservation: Reservation = {day: day, startTime: startTime, endTime: endTime}
    reservations.push(reservation)

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
    
}

var isShown = false;

// Function to show or hide the rooms
function showRooms() {
    // Get references to DOM elements
    var box = document.getElementById("rooms");
    var changeRoom = document.getElementById("changeRoom");
    var openPopupButton = document.getElementById("openPopupButton");

    // Check if the rooms are currently shown
    if (isShown) {
        // If shown, animate hiding
        box.style.transform = "translate(100%, -50%)";
        changeRoom.style.transform = "translate(0%, 0%)";
        openPopupButton.style.transform = "translate(0%, 0%)";

        // Delay hiding the box until the animation is complete
        setTimeout(function () {
            box.style.display = "none";
        }, 501);

        isShown = false;
    } else {
        box.style.display = "grid";

        // Delay showing the box until the animation is complete
        setTimeout(function () {
            box.style.transform = "translate(0%, -50%)";
        }, 0);

        // Move other elements off-screen when showing the rooms
        changeRoom.style.transform = "translate(-340%, 0%)";
        openPopupButton.style.transform = "translate(-340%, 0%)";

        isShown = true;
    }
}


displayRooms()
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
        if (checkRoom(allRooms[i])) {
            anchor.style.cssText = "color: #f5b963"; // Matching room
        } else {
            anchor.style.cssText = "color: #fff"; // Non-matching room
        }

        // reload page with correct room
        anchor.href = `../html/index.html?roomValue=${currentRoomId}`;

        
        box.appendChild(anchor);
    }
}

function checkRoom(room: string) {
    return roomValue === room;
}

