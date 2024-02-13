import { Person, Reservation, ReservationDTO } from "Model/model";


// constatnts
let reservations: Reservation[] = [];
let persons: Person[] = [];
const startTimeArray: string[] = ["07:00", "08:00", "08:55", "10:00", "10:55", "11:50", "12:45", "13:40", "14:35", "15:30", "16:25", "17:20", "18:15", "19:10", "20:05", "21:00", "21:55"];
const endTimeArray: string[] = ["07:50", "08:50", "09:45", "10:50", "11:45", "12:40", "13:35", "14:30", "15:25", "16:20", "17:15", "18:10", "19:05", "20:00", "20:50", "21:45", "22:40"];
const dayArray: string[] = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
const dayAsDateArray: string[] = getCurrentWeek(new Date(localStorage.getItem("date")));
const allRooms: string[] = ["Fotostudio", "Streamingraum",  "Audiostudio", "Viedeoschnitt", "Musikraum", "EDV1", "EDV2", "EDV3", "EDV4", "EDV5", "EDV6", "EDV7", "EDV8", "EDV9", "EDV10"];
const dayDefaultValue: string = "Montag";
const startTimeDefaultValue: string = "-- Startzeit --";
const endTimeDefaultValue: string = "-- Endzeit --";

const urlParams = new URLSearchParams(window.location.search);
const roomValue = urlParams.get('roomValue');
const newUri: string = "index.html?roomValue=Fotostudio";

const url: string = 'http://localhost:8080/api/reservations';
var olderReservation: Reservation = null;

var isRoomShown = false;

// no more room null
if (roomValue == null) {
    window.location.href = newUri;
}

let promise: Promise<void>;

// MODAL
document.addEventListener("DOMContentLoaded", () => {
    const openPopupButton = document.getElementById("openPopupButton") as HTMLButtonElement;
    const modal = document.getElementById("myModal") as HTMLDivElement;
    const closeIcon = document.querySelector(".close") as HTMLElement;
    const roomTableHeader = document.getElementById("displayRoom");
    const montag = document.getElementById("montag");
    const dienstag = document.getElementById("dienstag");
    const mittwoch = document.getElementById("mittwoch");
    const donnerstag = document.getElementById("donnerstag");
    const freitag = document.getElementById("freitag");
    const submitButton = document.getElementById("submitButton");

    // get dropdowns
    const dropdownDay = document.getElementById("day") as HTMLSelectElement;
    const dropdownStartTime = document.getElementById("time") as HTMLSelectElement;
    const dropdownEndTime = document.getElementById("timeE") as HTMLSelectElement;

    //timeTableHeader.innerHTML = `${dayAsDateArray[0]} / ${dayAsDateArray[4]}`;
    roomTableHeader.innerHTML = `<div class="flex">
    <button class="switchWeek" id="prev" onclick="calcPrevWeek()" style="width:5%;"><i class="fa-solid fa-arrow-left"></i></button>
    <button class="switchWeek" id="now" onclick="calcNowWeek()">${roomValue}</button>
    <button class="switchWeek" id="next" onclick="calcNextWeek()" style="width:5%;"><i class="fa-solid fa-arrow-right"></i></button>
</div>`;
    montag.innerHTML += `<br>${dayAsDateArray[0]}`;
    dienstag.innerHTML += `<br>${dayAsDateArray[1]}`;
    mittwoch.innerHTML += `<br>${dayAsDateArray[2]}`;
    donnerstag.innerHTML += `<br>${dayAsDateArray[3]}`;
    freitag.innerHTML += `<br>${dayAsDateArray[4]}`;

    promise = loadPersonsFromDatabase();

    openPopupButton.addEventListener("click", () => {
        modal.style.display = "block";

        // set value at dropdowns
        dropdownDay.value = dayDefaultValue;
        dropdownStartTime.value = startTimeDefaultValue;
        dropdownEndTime.value = endTimeDefaultValue;
    });

    closeIcon?.addEventListener("click", () => {
        modal.style.display = "none";
        submitButton.innerHTML = "Reserviere";
    });

    window.addEventListener("click", (event) => {
        // Close modal when clicking outside of it
        if (event.target === modal) {
            modal.style.display = "none";
            submitButton.innerHTML = "Reserviere";
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

    promise.then(() => {
        displayRooms();
        getReservationsFromDatabase();
    });
});

// Reserving room per onlick
function openModalWithOnclick(cellId: string) {
    // get modal
    const isReservated = reservations.some(function (reservation) {
        let columnAsString = getColumnId(reservation);
        for (let i = 0; i < columnAsString.length; i++) {
            if (columnAsString[i] === cellId) {
                return true;
            }
        }
        return false;
    });

    const submit = document.getElementById("submitButton") as HTMLButtonElement;

    if (!isReservated || submit.innerHTML === "Speichern") {
        //let email = getPersonFromId(getReservation(cellId).personId).email;
        let email;
        let reservation = getReservation(cellId);
        if (reservation != null) {
            email = getPersonFromId(reservation.personId).email;
        } else {
            email = persons[0].email;
        }
        
        const modal = document.getElementById("myModal") as HTMLDivElement;

        // show modall
        modal.style.display = "block";

        // get dropdown elements
        const dropdownDay = document.getElementById("day") as HTMLSelectElement;
        const dropdownStartTime = document.getElementById("time") as HTMLSelectElement;
        const dropdownEndTime = document.getElementById("timeE") as HTMLSelectElement;
        const dropdrownEmail = document.getElementById("email") as HTMLSelectElement;

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
        dropdrownEmail.value = email +"";
    }
    else {
        showReservationInfo(getReservation(cellId));
    }
}

// get all values from dropdown & do reservation
document.addEventListener("DOMContentLoaded", () => {
    const dropdownDay = document.getElementById("day") as HTMLSelectElement;
    const dropdownStartTime = document.getElementById("time") as HTMLSelectElement;
    const dropdownEndTime = document.getElementById("timeE") as HTMLSelectElement;
    const dropDownEmails = document.getElementById("email") as HTMLSelectElement;
    const submitButton = document.getElementById("submitButton") as HTMLButtonElement;

    submitButton.value = "Reserviere";

    submitButton?.addEventListener("click", async () => {
        const modal = document.getElementById("myModal") as HTMLDivElement;
        modal.style.display = "none";
        // get values from dropdown
        const startTime = dropdownStartTime.value;
        const endTime = dropdownEndTime.value;
        const day = dropdownDay.value;
        const personId = getPersonFromEmail(dropDownEmails.value).id;
        let dayId;

        // ceck if all set
        if (startTime && endTime && day) {
            // get day position in array
            for (let i: number = 0; i < dayArray.length; i++) {
                if (dayArray[i] === day) {
                    dayId = i;
                }
            }
            const reservation: ReservationDTO = {roomId: allRooms.indexOf(roomValue) +1, personId: personId, startTime: parseToLocalDateTimeFormat(dayAsDateArray[dayId], startTime), endTime: parseToLocalDateTimeFormat(dayAsDateArray[dayId], endTime), reservationDate: dayAsDateArray[dayId]};
            
            if (submitButton.innerHTML === "Speichern") {
                try {
                    await updateReservationInDatabase(olderReservation, reservation)
                } catch (error) {
                    showErrorMessage("Error occured while updating reservation");
                }
            }
            else if (submitButton.innerHTML === "Reserviere") {
                try {
                    await addReservationToDatabase(reservation);
                    getReservationsFromDatabase();
                } catch (error) {
                    showErrorMessage('Error occured while adding reservation to Database!');
                } 
            }
        }
        submitButton.innerHTML = "Reserviere";
    });
});

function getPersonFromEmail(email: String) {
    let result: Person = null;
    
    persons.forEach(person => {;
        if(person.email === email) {
            result = person;
        }
    });
    return result;
}

function getPersonFromId(id: number) {
    let result: Person = null;
    
    persons.forEach(person => {;
        if(person.id === id) {
            result = person;
        }
    });
    return result;
}

function parseToLocalDateTimeFormat(date: string, time: string) {
    const localDateTime = date +"T"+ time +":00";
    return localDateTime;
}

// adding color to box
function paintColumnsReservated(array: string[], isMulti: boolean, personId: number) {
    const person = getPersonFromId(personId);
    for (let i: number = 0; i < array.length; i++) {
        let td = document.getElementById(array[i]);
        if (td) {
            //id.style.backgroundColor = "#cd7f35";
            let imgId: string = array[i] + "Img";
            if (person.grade.charAt(0) === "a") {
                td.innerHTML = `<p style="position: absolute; color: #000; padding-left: 5%;">${person.firstname} ${person.surname}</p>
                                <img id="${imgId}" src="img/farbe0.png" draggable="true" ondragstart="drag(event, ${array[i]})" style="z-index:1.5; opacity: 0.5;">`
            } else {
                td.innerHTML = `<p style="position: absolute; padding-left: 6%;">${person.firstname} ${person.surname}</p>
                                <img id="${imgId}" src="img/farbe${person.grade.charAt(0)}.png" draggable="true" ondragstart="drag(event, ${array[i]})" style="z-index:1.5; opacity: 0.5;">`
            }
            
            if (!isMulti) {
                let img = document.getElementById(`${imgId}`);
                img.style.height = "3.3rem";
            }
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

async function getReservationsFromDatabase() { 
    const getUrl = url + '/list';
    const reservations: Reservation[] = await fetchDataFromUrl(getUrl)
    if (reservations) {
        reservations.forEach(singleReservation => {
            if (dayAsDateArray.indexOf(singleReservation.reservationDate) !== -1) {
                const reservation: Reservation = {
                    id: singleReservation.id,
                    roomId: singleReservation.roomId,
                    personId: singleReservation.personId,
                    startTime: singleReservation.startTime,
                    endTime: singleReservation.endTime,
                    reservationDate: singleReservation.reservationDate
                };
                
                if (reservation.roomId === (allRooms.indexOf(roomValue)+1)) {    
                    reservations.push(reservation);
                    loadReservation(reservation);
                }
            }
        })
    }
}


function loadReservation(reservation: Reservation) {
    reservation.startTime = reservation.startTime.slice(0, -3);
    reservation.endTime = reservation.endTime.slice(0, -3);
    let columns = getColumnId(reservation);
    let isMulti: boolean = false;

    if (columns.length > 1) {
        isMulti = true;
    }

    paintColumnsReservated(columns, isMulti, reservation.personId);
}

// parse day received from beckand
function parseDay(dateString: string) {
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
        anchor.href = `index.html?roomValue=${currentRoomId}`;

        box.appendChild(anchor);
    }
}

function compareRoom(room: string) {
    return roomValue === room;
}

async function fetchDataFromUrl<T>(url: string): Promise<T | null> {
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
            showErrorMessage('Failed to add reservation! Please check your Internet connection!' + response);
        }
    } catch (error) {
        showErrorMessage('Failed to add reservation! Please check your Internet connection!' + error);
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
        roomId: allRooms.indexOf(roomValue)+1,
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
    const columnId = getColumnId(reservation);
    infoMessage.style.color = "#fff";

    document.getElementById("remove").remove();
    document.getElementById("edit").remove();

    const editButton = document.createElement("button");
    const removeButton = document.createElement("button");

    removeButton.innerHTML = "L&ouml;schen";
    removeButton.id = "remove";
    editButton.innerHTML = "Bearbeiten";
    editButton.id = "edit";

    removeButton.classList.add("button");
    editButton.classList.add("button");

    document.querySelector("#InfoBox > *:last-child").appendChild(removeButton);
    document.querySelector("#InfoBox > *:last-child").appendChild(editButton);

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

    editButton.addEventListener("click", async () => {
        const addButton = document.getElementById("submitButton") as HTMLButtonElement;
        addButton.innerHTML = "Speichern";

        infoBox.style.display = "none";
        
        olderReservation = reservation;
        openModalWithOnclick(columnId[0]);
    })

    window.addEventListener("click", (event) => {
        // Close modal when clicking outside of it
        if (event.target === infoBox) {
            infoBox.style.display = "none";
        }
    });
}

function reservationToString(reservation: Reservation): string {
    const person: Person = getPersonFromId(reservation.personId);
    let result: string = `Person: ${person.firstname + " " + person.surname} \n Email: ${person.email} \n Grade: ${person.grade} \n Datum: ${reservation.reservationDate} \n Von: ${parseTime(reservation.startTime)} \n Bis: ${parseTime(reservation.endTime)} \n Raum: ${roomValue}`;
    const formattedResult = result.replace(/\n/g, '<br>');
    return formattedResult;
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
async function loadPersonsFromDatabase() {
    const emailSelect = document.getElementById("email") as HTMLSelectElement;
    const getUrl = "http://localhost:8080/api/persons/list"
    const persons: Person[] = await fetchDataFromUrl(getUrl)

    persons.forEach(singePerson => {
        const person: Person = {
            id: singePerson.id,
            surname: singePerson.surname,
            firstname: singePerson.firstname,
            email: singePerson.email,
            grade: singePerson.grade
        }
        
        const option = document.createElement("option");
        option.value = person.email +"";
        option.text = person.email +"";

        persons.push(person);

        emailSelect.add(option);
    });
}

//##################### Wochen Wechsel ########################
function calcNextWeek() {
    const monday = new Date(localStorage.getItem("date"));
    const nextMonday = getNextMonday(monday);
    localStorage.setItem("date", nextMonday +"");
    location.reload();
}

function calcNowWeek() {
    const nowMonday = getCurrentMonday(new Date)
    localStorage.setItem("date", nowMonday +"");
    location.reload();
}

function calcPrevWeek() {
    const monday = new Date(localStorage.getItem("date"));
    const prevMonday = getPreviousMonday(monday);
    localStorage.setItem("date", prevMonday +"");
    location.reload();
}

function getNextMonday(inputDate: Date): Date {
    const daysUntilNextMonday = (1 + 7 - inputDate.getDay()) % 7;
    const nextMonday = new Date(inputDate);
    nextMonday.setDate(inputDate.getDate() + daysUntilNextMonday + 7); 
    nextMonday.setHours(0, 0, 0, 0);
  
    return nextMonday;
}

function getCurrentMonday(d: Date) {
    d = new Date(d);
    var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); 
    return new Date(d.setDate(diff));
}

function getPreviousMonday(inputDate: Date): Date {
    const daysSincePreviousMonday = (inputDate.getDay() + 6) % 7;
    const previousMonday = new Date(inputDate);
    previousMonday.setDate(inputDate.getDate() - daysSincePreviousMonday - 6);
    previousMonday.setHours(0, 0, 0, 0); // Set to the beginning of the day
    
    return getCurrentMonday(previousMonday);
}

function getCurrentWeek(monday: Date) {
    const weekDates: string[] = [];

  // Set the input date to Monday to ensure consistency
  monday.setHours(0, 0, 0, 0);
  const currentDate = new Date(monday);

  // Iterate from Monday to Friday and add each date to the array
  for (let i = 0; i < 5; i++) {
    weekDates.push(parseDateToCalendarFormat(currentDate) +"");
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekDates;
}

function setAndStoreDate() {
    const currentMonday = getCurrentMonday(new Date);
    localStorage.setItem("date", "" + currentMonday);
}

window.onload = function () {
    const storedDate = localStorage.getItem("date");
  
    if (storedDate) {
      //parse to date object
      const parsedDate = new Date(storedDate);
    } else {
      // if no date found => save in local storage
      setAndStoreDate();
    }
};

  function pad(value: number, length: number): string {
    return value.toString().length < length
      ? '0'.repeat(length - value.toString().length) + value
      : value.toString();
  }

  function parseDateToCalendarFormat(date: Date): string {
    const day = pad(date.getDate(), 2);
    const month = pad(date.getMonth() + 1, 2); // Months are 0-based
    const year = pad(date.getFullYear(), 4);
  
    return `${year}-${month}-${day}`;
  }