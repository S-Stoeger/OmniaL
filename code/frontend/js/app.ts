interface Reservation {
    id: number;
    roomId: number;
    personId: number;
    startTime: string;
    endTime: string;
    reservationDate: string;
}

interface ReservationDTO {
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
const dayAsDateArray: string[] = getFormattedDatesFromMondayToFriday();
const allRooms: string[] = ["Fotostudio", "Audiostudio", "Viedeoschnitt", "EDV1", "EDV2", "EDV3", "EDV4", "EDV5", "EDV6", "EDV7", "EDV8", "EDV9", "EDV10", "EDV11", "EDV12", "EDV13", "EDV14", "EDV15", "EDV16", "EDV17", "EDV18"];
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
    const timeTableHeader = document.getElementById("week");
    const montag = document.getElementById("montag");
    const dienstag = document.getElementById("dienstag");
    const mittwoch = document.getElementById("mittwoch");
    const donnerstag = document.getElementById("donnerstag");
    const freitag = document.getElementById("freitag");

    // get dropdowns
    const dropdownDay = document.getElementById("day") as HTMLSelectElement;
    const dropdownStartTime = document.getElementById("time") as HTMLSelectElement;
    const dropdownEndTime = document.getElementById("timeE") as HTMLSelectElement;

    //timeTableHeader.innerHTML = `${dayAsDateArray[0]} / ${dayAsDateArray[4]}`;
    timeTableHeader.innerHTML = `${roomValue}`;
    montag.innerHTML += `<br>${dayAsDateArray[0]}`;
    dienstag.innerHTML += `<br>${dayAsDateArray[1]}`;
    mittwoch.innerHTML += `<br>${dayAsDateArray[2]}`;
    donnerstag.innerHTML += `<br>${dayAsDateArray[3]}`;
    freitag.innerHTML += `<br>${dayAsDateArray[4]}`;


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

                //set attribute to drag and drop
                cell.setAttribute(`ondrop`, `drop(event, ${cell.id})`);
                cell.setAttribute(`ondragover`, `allowDrop(event)`);


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
    // get modal
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

    if (!isReservated) {
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
    else if (isReservated) {
        showReservationInfo(getReservation(cellId));
    }
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
            const reservation: ReservationDTO = {roomId: 1, personId: 1, startTime: parseToLocalDateTimeFormat(dayAsDateArray[dayId], startTime), endTime: parseToLocalDateTimeFormat(dayAsDateArray[dayId], endTime), reservationDate: dayAsDateArray[dayId]};

            try {
                await addReservationToDatabase(reservation);
            } catch (error) {
                showErrorMessage('Error occured while adding reservation to Database!');
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
        let td = document.getElementById(array[i]);
        if (td) {
            //id.style.backgroundColor = "#cd7f35";
            let imgId: string = array[i] + "Img";
            
            td.innerHTML = `<img id="${imgId}" src="../img/test.png" draggable="true" ondragstart="drag(event, ${array[i]})">`
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

            // get unit s
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
    reservations = [];

    const getUrl = url + '/list';
    fetchDataFromUrl(getUrl)
        .then(data => {
            if (data) {
                data.forEach(singleReservation => {
                    if (dayAsDateArray.indexOf(singleReservation.reservationDate) !== -1) {
                        const reservation: Reservation = {
                            id: singleReservation.id,
                            roomId: singleReservation.roomId,
                            personId: singleReservation.personId,
                            startTime: singleReservation.startTime,
                            endTime: singleReservation.endTime,
                            reservationDate: singleReservation.reservationDate
                        };
                        reservations.push(reservation);
                        loadReservation(reservation);
                    }
                });
            }
        })
        .catch(error => showErrorMessage(error.message));
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
            showErrorMessage(`Error: Unable to fetch data. Status code: ${response.status}`);
            return null;
        }
    } catch (error) {
        // Handle exceptions
        showErrorMessage(`Error: ${error.message}`);
        return null;
    }
}

async function addReservationToDatabase(reservation: ReservationDTO) {
    const infoBox = document.getElementById("InfoBox");
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservation)
        });
        if (!response.ok) {
            showErrorMessage('Failed to add reservation! Please check your Internet connection!');
        }
    } catch (error) {
        showErrorMessage('Failed to add reservation! Please check your Internet connection!');
    }
    infoBox.style.display = "none";
} 

async function removeReservation(reservationId: number) {
    try {
        const response = await fetch(url + `/${reservationId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            showErrorMessage("Failed to remove Reservation");
        }
    } catch(error) {
        showErrorMessage("Failed to remove Reservation");
    }
}

async function updateReservationInDatabase(oldReservation: Reservation, newReservation: ReservationDTO) {
    try {
        const response = await fetch(`${url}/${oldReservation.id}`, {
            method: 'PUT', // Assuming you use PUT for updates, adjust if necessary
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReservation),
        });

        if (!response.ok) {
            throw new Error('Failed to update reservation');
        }

        // If the response is OK, you can optionally parse the response JSON
        const result = response.ok;
        if (!response.ok) showErrorMessage("Error updating reservation:"+ await response.text());
        location.reload()
        
    } catch (error) {
        // Handle any errors that occurred during the fetch operation
        showErrorMessage('Error updating reservation:'+ error.message);
        // You may choose to rethrow the error or handle it differently based on your requirements
        throw error;
    }
}


function allowDrop(ev: DragEvent) {
    ev.preventDefault();
}
let oldReservation: Reservation;
function drag(ev: DragEvent, cell: HTMLTableCellElement) {
    oldReservation = getReservation(cell.id)
    
    ev.dataTransfer.setData("text", (ev.target as HTMLElement).id);
}

function drop(ev: DragEvent, cell:  HTMLTableCellElement) {
    try {
        if (!checkIfContains(cell.id)) {
            updateReservation(oldReservation, cell.id);
    
            ev.preventDefault();
            const data = ev.dataTransfer.getData("text");
            const draggedElement = document.getElementById(data);
    
            if (draggedElement) {
                (ev.target as HTMLElement).appendChild(draggedElement);   
            }
        } else {
            showErrorMessage("Reservation with same date and time already exists!")
        }
    } catch(error) {
        showErrorMessage(error);
    }
}

function checkIfContains(cell: string) {
    let array: string[] = [];
    reservations.forEach(res => {
        let temp = getColumnId(res);
        temp.forEach(t => {
            array.push(t);
        });
    });

    return array.some(table => {
        return table === cell;
    });
}

function extractNumbersFromString(inputString: string): number[] {
    // Use a regular expression to match digits
    const matches = inputString.match(/\d+/g);

    // Convert the matched strings to numbers
    const numbers = matches ? matches.map(match => parseInt(match, 10)) : [];

    return numbers;
}

function reverseParse(arr: number[], length: number) {
    let array: string[] = [];

    array.push(dayAsDateArray[arr[1]-1]);
    array.push(parseToLocalDateTimeFormat(dayAsDateArray[arr[1]-1], startTimeArray[arr[0]-1]));
    

    if (length > 1) {
        array.push(parseToLocalDateTimeFormat(dayAsDateArray[arr[1]-1], endTimeArray[arr[0]-2+length]));    
    } else {
        array.push(parseToLocalDateTimeFormat(dayAsDateArray[arr[1]-1], endTimeArray[arr[0]-1]));
    }

    return array;
}

function getReservation(cellId: string) {
    for (const reservation of reservations) {
        const temp = getColumnId(reservation);
        for (const element of temp) {
            if (element === cellId) {
                return reservation;
            }
        }
    }
    return null;
}


function updateReservation(oldReservation: Reservation, cell: string) {
    let arr = reverseParse(extractNumbersFromString(cell), getColumnId(oldReservation).length);
    
    let temp: ReservationDTO = {
        roomId: 1,
        personId: oldReservation.personId,
        startTime: arr[1], 
        endTime: arr[2],
        reservationDate: arr[0]
    };

    if (isInRange(temp, oldReservation.id)) {
        throw new Error("reservation is in range of an other!");
    }

    reservations.forEach(res => {
        if (res === oldReservation) {
            res.startTime = arr[1];
            res.endTime = arr[2];
            res.reservationDate = arr[0];
        }
    });
    
    updateReservationInDatabase(oldReservation, temp);
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

function showReservationInfo(reservation: Reservation) {
    const infoBox = document.getElementById("InfoBox");
    const infoMessage = document.getElementById("info_content");
    infoMessage.style.color = "#fff";
    document.getElementById("remove").remove();
    const removeButton = document.createElement("button");
    removeButton.innerHTML = "L&ouml;schen";
    removeButton.id = "remove";
    document.querySelector("#InfoBox > *:last-child").appendChild(removeButton)

    infoBox.style.display = "block";
    infoMessage.innerHTML = reservationToString(reservation);
    
    removeButton.addEventListener("click", async () => {
        const affectedColumns: string[] = getColumnId(reservation);

        affectedColumns.forEach(affectedColumn => {
            const column = document.getElementById(`${affectedColumn}`) as HTMLTableCellElement;
            column.innerHTML = "";
        })
        infoBox.style.display = "none";

        await removeReservation(reservation.id);
        getReservationsFromDatabase();
    });

    window.addEventListener("click", (event) => {
        // Close modal when clicking outside of it
        if (event.target === infoBox) {
            infoBox.style.display = "none";
        }
    });
}

function reservationToString(reservation: Reservation): string {
    let result: string = `Person(id):${reservation.personId} \n Datum:${reservation.reservationDate} \n Von:${parseTime(reservation.startTime)} \n Bis:${parseTime(reservation.endTime)} \n ${roomValue}`;
    const formattedResult = result.replace(/\n/g, '<br>');
    return formattedResult;
}

function getFormattedDatesFromMondayToFriday(): string[] {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const daysToMonday = currentDay === 0 ? 1 : -currentDay + 1;

    const mondayDate = new Date(currentDate);
    mondayDate.setDate(currentDate.getDate() + daysToMonday);

    const formattedDates: string[] = [formatDate(mondayDate)];

    for (let i = 1; i < 5; i++) {
        const nextDay = new Date(mondayDate);
        nextDay.setDate(mondayDate.getDate() + i);
        formattedDates.push(formatDate(nextDay));
    }

    return formattedDates;
}

function formatDate(date: Date): string {
    return date.toISOString().slice(0, 10);
}

function isInRange(update: ReservationDTO, id: number): boolean {
    let array: Reservation[] = reservations.filter(item => item.reservationDate === update.reservationDate);

    const startTimeId: number = startTimeArray.indexOf(parseTime(update.startTime).slice(0, -3));
    const endTimeId: number = endTimeArray.indexOf(parseTime(update.endTime).slice(0, -3));
    
    for (const element of array) {
        if (element.id !== id) {
            const elementStartTimeId = startTimeArray.indexOf(parseTime(element.startTime));
            if (elementStartTimeId >= startTimeId && elementStartTimeId <= endTimeId) {
                return true;
            }
        }
    }

    return false;
}