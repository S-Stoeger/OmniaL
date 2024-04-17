var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// constatnts
var reservations = [];
var persons = [];
var rooms = [];
var startTimeArray = ["07:00", "08:00", "08:55", "10:00", "10:55", "11:50", "12:45", "13:40", "14:35", "15:30", "16:25", "17:20", "18:15", "19:10", "20:05", "21:00", "21:55"];
var endTimeArray = ["07:50", "08:50", "09:45", "10:50", "11:45", "12:40", "13:35", "14:30", "15:25", "16:20", "17:15", "18:10", "19:05", "20:00", "20:50", "21:45", "22:40"];
var dayArray = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
var dayAsDateArray = getCurrentWeek(new Date(localStorage.getItem("date")));
var dayDefaultValue = "Montag";
var startTimeDefaultValue = "-- Startzeit --";
var endTimeDefaultValue = "-- Endzeit --";
var urlParams = new URLSearchParams(window.location.search);
var roomValue = urlParams.get('roomValue');
var newUri = "index.html?roomValue=Fotostudio";
var url = 'http://localhost:8080/api/reservations';
var olderReservation = null;
var isRoomShown = false;
var isCalendarShown = false;
// no more room null
if (roomValue == null) {
    window.location.href = newUri;
}
var promise;
// MODAL
document.addEventListener("DOMContentLoaded", function () {
    var openPopupButton = document.getElementById("openPopupButton");
    var modal = document.getElementById("myModal");
    var closeIcon = document.querySelector(".close");
    var roomTableHeader = document.getElementById("displayRoom");
    var montag = document.getElementById("montag");
    var dienstag = document.getElementById("dienstag");
    var mittwoch = document.getElementById("mittwoch");
    var donnerstag = document.getElementById("donnerstag");
    var freitag = document.getElementById("freitag");
    var submitButton = document.getElementById("submitButton");
    // get dropdowns
    var dropdownDay = document.getElementById("day");
    var dropdownStartTime = document.getElementById("time");
    var dropdownEndTime = document.getElementById("timeE");
    getRoomsFromDatabase();
    //timeTableHeader.innerHTML = `${dayAsDateArray[0]} / ${dayAsDateArray[4]}`;
    roomTableHeader.innerHTML = "<h3>".concat(roomValue, "</h3>");
    montag.innerHTML += "<br>".concat(dayAsDateArray[0]);
    dienstag.innerHTML += "<br>".concat(dayAsDateArray[1]);
    mittwoch.innerHTML += "<br>".concat(dayAsDateArray[2]);
    donnerstag.innerHTML += "<br>".concat(dayAsDateArray[3]);
    freitag.innerHTML += "<br>".concat(dayAsDateArray[4]);
    promise = loadPersonsFromDatabase();
    openPopupButton.addEventListener("click", function () {
        modal.style.display = "block";
        // set value at dropdowns
        dropdownDay.value = dayDefaultValue;
        dropdownStartTime.value = startTimeDefaultValue;
        dropdownEndTime.value = endTimeDefaultValue;
    });
    closeIcon === null || closeIcon === void 0 ? void 0 : closeIcon.addEventListener("click", function () {
        modal.style.display = "none";
        submitButton.innerHTML = "Reserviere";
    });
    window.addEventListener("click", function (event) {
        // Close modal when clicking outside of it
        if (event.target === modal) {
            modal.style.display = "none";
            submitButton.innerHTML = "Reserviere";
        }
    });
});
// 
document.addEventListener("DOMContentLoaded", function () {
    // Function to assign unique IDs to the columns
    var table = document.querySelector("table");
    var headers = table.querySelectorAll("th");
    var rows = table.querySelectorAll("tr");
    // Iterate through each header and row
    for (var i = 1; i < headers.length; i++) {
        if (!headers[i].classList.contains("hour")) {
            var _loop_1 = function (j) {
                var cell = rows[j].children[i];
                // Generate a unique ID based on the column index and row index
                cell.id = "cell_".concat(j, "_").concat(i);
                //set attribute to drag and drop
                cell.setAttribute("ondrop", "drop(event, ".concat(cell.id, ")"));
                cell.setAttribute("ondragover", "allowDrop(event)");
                cell.addEventListener('click', function () {
                    openModalWithOnclick(cell.id);
                });
            };
            for (var j = 1; j < rows.length; j++) {
                _loop_1(j);
            }
        }
    }
    promise.then(function () {
        displayRooms();
        getReservationsFromDatabase();
    });
});
// Reserving room per onlick
function openModalWithOnclick(cellId) {
    // get modal
    closeCalendar();
    var isReservated = reservations.some(function (reservation) {
        var columnAsString = getColumnId(reservation);
        for (var i = 0; i < columnAsString.length; i++) {
            if (columnAsString[i] === cellId) {
                return true;
            }
        }
        return false;
    });
    var submit = document.getElementById("submitButton");
    if (!isReservated || submit.innerHTML === "Speichern") {
        //let email = getPersonFromId(getReservation(cellId).personId).email;
        var email = void 0;
        var reservation = getReservation(cellId);
        if (reservation != null) {
            email = getPersonFromId(reservation.personId).email;
        }
        else {
            email = persons[0].email;
        }
        var modal = document.getElementById("myModal");
        // show modall
        modal.style.display = "block";
        // get dropdown elements
        var dropdownDay = document.getElementById("day");
        var dropdownStartTime = document.getElementById("time");
        var dropdownEndTime = document.getElementById("timeE");
        var dropdrownEmail = document.getElementById("email");
        // split id into row and column
        var array = cellId.split("_");
        // get data from column
        var day = dayArray[Number(array[2]) - 1];
        var startTime = startTimeArray[Number(array[1]) - 1];
        var endTime = endTimeArray[Number(array[1]) - 1];
        7;
        // set value of dropdown in modal
        dropdownDay.value = day;
        dropdownStartTime.value = startTime;
        dropdownEndTime.value = endTime;
        dropdrownEmail.value = email + "";
    }
    else {
        showReservationInfo(getReservation(cellId));
    }
}
// get all values from dropdown & do reservation
document.addEventListener("DOMContentLoaded", function () {
    var dropdownDay = document.getElementById("day");
    var dropdownStartTime = document.getElementById("time");
    var dropdownEndTime = document.getElementById("timeE");
    var dropDownEmails = document.getElementById("email");
    var submitButton = document.getElementById("submitButton");
    submitButton.value = "Reserviere";
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
        var modal, startTime, endTime, day, personId, dayId, i, reservation, error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    modal = document.getElementById("myModal");
                    modal.style.display = "none";
                    startTime = dropdownStartTime.value;
                    endTime = dropdownEndTime.value;
                    day = dropdownDay.value;
                    personId = getPersonFromEmail(dropDownEmails.value).id;
                    if (!(startTime && endTime && day)) return [3 /*break*/, 9];
                    // get day position in array
                    for (i = 0; i < dayArray.length; i++) {
                        if (dayArray[i] === day) {
                            dayId = i;
                        }
                    }
                    reservation = { roomId: getRoomFromName(roomValue).id, personId: personId, startTime: parseToLocalDateTimeFormat(dayAsDateArray[dayId], startTime), endTime: parseToLocalDateTimeFormat(dayAsDateArray[dayId], endTime), reservationDate: dayAsDateArray[dayId] };
                    if (!(submitButton.innerHTML === "Speichern")) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, updateReservationInDatabase(olderReservation, reservation)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    showErrorMessage("Error occured while updating reservation");
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 9];
                case 5:
                    if (!(submitButton.innerHTML === "Reserviere")) return [3 /*break*/, 9];
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, addReservationToDatabase(reservation)];
                case 7:
                    _a.sent();
                    getReservationsFromDatabase();
                    return [3 /*break*/, 9];
                case 8:
                    error_2 = _a.sent();
                    showErrorMessage('Error occured while adding reservation to Database!');
                    return [3 /*break*/, 9];
                case 9:
                    submitButton.innerHTML = "Reserviere";
                    return [2 /*return*/];
            }
        });
    }); });
});
function getPersonFromEmail(email) {
    var result = null;
    persons.forEach(function (person) {
        ;
        if (person.email === email) {
            result = person;
        }
    });
    return result;
}
function getPersonFromId(id) {
    var result = null;
    persons.forEach(function (person) {
        ;
        if (person.id === id) {
            result = person;
        }
    });
    return result;
}
function parseToLocalDateTimeFormat(date, time) {
    var localDateTime = date + "T" + time + ":00";
    return localDateTime;
}
// adding color to box
function paintColumnsReservated(array, isMulti, personId) {
    var person = getPersonFromId(personId);
    for (var i = 0; i < array.length; i++) {
        var td = document.getElementById(array[i]);
        if (td) {
            //id.style.backgroundColor = "#cd7f35";
            var imgId = array[i] + "Img";
            if (person.grade.charAt(0) === "a") {
                td.innerHTML = "<p style=\"position: absolute; color: #000; padding-left: 5.3%; padding-top: 0.75%;\">".concat(person.firstname, " ").concat(person.surname, "</p>\n                                <img id=\"").concat(imgId, "\" src=\"img/farbe0.png\" draggable=\"true\" ondragstart=\"drag(event, ").concat(array[i], ")\" style=\"z-index:1.5; opacity: 0.5;\">");
            }
            else {
                td.innerHTML = "<p style=\"position: absolute; padding-left: 6%; padding-top: 0.75%;\">".concat(person.firstname, " ").concat(person.surname, "</p>\n                                <img id=\"").concat(imgId, "\" src=\"img/farbe").concat(person.grade.charAt(0), ".png\" draggable=\"true\" ondragstart=\"drag(event, ").concat(array[i], ")\" style=\"z-index:1.5; opacity: 0.5;\">");
            }
            if (!isMulti) {
                var img = document.getElementById("".concat(imgId));
                img.style.height = "3.3rem";
            }
        }
    }
}
// convert ids to the cell id
function cellIdToString(startTimeId, dayId) {
    return "cell_".concat(startTimeId, "_").concat(dayId);
}
// get assigned columns
function getColumnId(reservation) {
    var dayId = 0; // id of day
    var units = 0; // count uf units reservated
    var startTimeId = 0; // reservation start time
    var columnIds = []; // array of all ids
    // get startTime position in array
    for (var i = 0; i < startTimeArray.length; i++) {
        if (startTimeArray[i] === parseTime(reservation.startTime)) {
            startTimeId = i;
            // get unit s
            for (var j = i; j < endTimeArray.length; j++) {
                units++;
                if (endTimeArray[j] === parseTime(reservation.endTime)) {
                    break;
                }
            }
            ;
        }
    }
    ;
    // get day position in array
    for (var i = 0; i < dayArray.length; i++) {
        if (dayArray[i] === parseDay(reservation.reservationDate)) {
            // + 1 because the first column is 1 not 0
            dayId = i + 1;
        }
    }
    // fill array with the ids from html
    for (var i = startTimeId; i < startTimeId + units; i++) {
        columnIds.push(cellIdToString(i + 1, dayId));
    }
    return columnIds;
}
function getReservationsFromDatabase() {
    reservations = [];
    var getUrl = url + '/list';
    fetchDataFromUrl(getUrl)
        .then(function (data) {
        if (data) {
            data.forEach(function (singleReservation) {
                if (dayAsDateArray.indexOf(singleReservation.reservationDate) !== -1) {
                    var reservation = {
                        id: singleReservation.id,
                        roomId: singleReservation.roomId,
                        personId: singleReservation.personId,
                        startTime: singleReservation.startTime,
                        endTime: singleReservation.endTime,
                        reservationDate: singleReservation.reservationDate
                    };
                    if (reservation.roomId === getRoomFromName(roomValue).id) {
                        reservations.push(reservation);
                        loadReservation(reservation);
                    }
                }
            });
        }
    })
        .catch(function (error) { return showErrorMessage(error.message); });
}
function loadReservation(reservation) {
    reservation.startTime = reservation.startTime.slice(0, -3);
    reservation.endTime = reservation.endTime.slice(0, -3);
    var columns = getColumnId(reservation);
    var isMulti = false;
    if (columns.length > 1) {
        isMulti = true;
    }
    paintColumnsReservated(columns, isMulti, reservation.personId);
}
// parse day received from beckand
function parseDay(dateString) {
    var array = dateString.split("T");
    var dateObject = new Date(array[0]);
    var dayIndex = dateObject.getDay();
    // adjust index, becaus getDay() starts and ends with Sunday
    dayIndex = (dayIndex + 6) % 7;
    return dayArray[dayIndex];
}
//parse time received from backend
function parseTime(startTime) {
    var array = startTime.split("T");
    return array[1];
}
// Function to show or hide the rooms
function showRooms() {
    // Get references to DOM elements
    var box = document.getElementById("rooms");
    var changeRoom = document.getElementById("changeRoom");
    var openPopupButton = document.getElementById("openPopupButton");
    var openCalendarId = document.getElementById("openCalendar");
    // Check if the rooms are currently shown
    if (isRoomShown) {
        // If shown, animate hiding
        box.style.transform = "translate(100%, -50%)";
        changeRoom.style.transform = "translate(0%, 0%)";
        openPopupButton.style.transform = "translate(0%, 0%)";
        openCalendarId.style.transform = "translate(0%, 0%)";
        // Delay hiding the box until the animation is complete
        setTimeout(function () {
            box.style.display = "none";
        }, 501);
        isRoomShown = false;
    }
    else {
        box.style.display = "grid";
        // Delay showing the box until the animation is complete
        setTimeout(function () {
            box.style.transform = "translate(0%, -50%)";
        }, 0);
        // Move other elements off-screen when showing the rooms
        changeRoom.style.transform = "translate(-340%, 0%)";
        openPopupButton.style.transform = "translate(-340%, 0%)";
        openCalendarId.style.transform = "translate(-340%, 0%)";
        isRoomShown = true;
    }
}
function displayRooms() {
    var box = document.getElementById("rooms");
    // Clear existing content in the box
    box.innerHTML = '';
    // Assuming allRooms is an array of strings
    for (var i = 0; i < rooms.length; i++) {
        // Use textContent instead of innerHTML
        var anchor = document.createElement("a");
        anchor.textContent = rooms[i].name;
        anchor.id = rooms[i].id + "";
        var currentRoomId = anchor.id;
        // set color for selected room
        if (roomValue === rooms[i].name) {
            anchor.style.cssText = "color: #f5b963"; // Matching room
        }
        else {
            anchor.style.cssText = "color: #fff"; // Non-matching room
        }
        // reload page with correct room
        anchor.href = "index.html?roomValue=".concat(rooms[i].name);
        box.appendChild(anchor);
    }
}
function fetchDataFromUrl(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2: 
                // Parse the response JSON and return
                return [2 /*return*/, _a.sent()];
                case 3:
                    // Print an error message if the request was not successful
                    showErrorMessage("Error: Unable to fetch data. Status code: ".concat(response.status));
                    return [2 /*return*/, null];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_3 = _a.sent();
                    // Handle exceptions
                    showErrorMessage("Error: ".concat(error_3.message));
                    return [2 /*return*/, null];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function addReservationToDatabase(reservation) {
    return __awaiter(this, void 0, void 0, function () {
        var infoBox, response, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    infoBox = document.getElementById("InfoBox");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(reservation)
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        showErrorMessage('Failed to add reservation! Please check your Internet connection!' + response);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    showErrorMessage('Failed to add reservation! Please check your Internet connection!' + error_4);
                    return [3 /*break*/, 4];
                case 4:
                    infoBox.style.display = "none";
                    return [2 /*return*/];
            }
        });
    });
}
function removeReservation(reservationId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch(url + "/".concat(reservationId), {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        showErrorMessage("Failed to remove Reservation");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    showErrorMessage("Failed to remove Reservation");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateReservationInDatabase(oldReservation, newReservation) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, _a, _b, error_6;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(url, "/").concat(oldReservation.id), {
                            method: 'PUT', // Assuming you use PUT for updates, adjust if necessary
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(newReservation),
                        })];
                case 1:
                    response = _c.sent();
                    if (!response.ok) {
                        throw new Error('Failed to update reservation');
                    }
                    result = response.ok;
                    if (!!response.ok) return [3 /*break*/, 3];
                    _a = showErrorMessage;
                    _b = "Error updating reservation:";
                    return [4 /*yield*/, response.text()];
                case 2:
                    _a.apply(void 0, [_b + (_c.sent())]);
                    _c.label = 3;
                case 3:
                    location.reload();
                    return [3 /*break*/, 5];
                case 4:
                    error_6 = _c.sent();
                    // Handle any errors that occurred during the fetch operation
                    showErrorMessage('Error updating reservation:' + error_6.message);
                    // You may choose to rethrow the error or handle it differently based on your requirements
                    throw error_6;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function allowDrop(ev) {
    ev.preventDefault();
}
var oldReservation;
function drag(ev, cell) {
    oldReservation = getReservation(cell.id);
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev, cell) {
    try {
        if (!checkIfContains(cell.id)) {
            updateReservation(oldReservation, cell.id);
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            var draggedElement = document.getElementById(data);
            if (draggedElement) {
                ev.target.appendChild(draggedElement);
            }
        }
        else {
            showErrorMessage("Reservation with same date and time already exists!");
        }
    }
    catch (error) {
        showErrorMessage(error);
    }
}
function checkIfContains(cell) {
    var array = [];
    reservations.forEach(function (res) {
        var temp = getColumnId(res);
        temp.forEach(function (t) {
            array.push(t);
        });
    });
    return array.some(function (table) {
        return table === cell;
    });
}
function extractNumbersFromString(inputString) {
    // Use a regular expression to match digits
    var matches = inputString.match(/\d+/g);
    // Convert the matched strings to numbers
    var numbers = matches ? matches.map(function (match) { return parseInt(match, 10); }) : [];
    return numbers;
}
function reverseParse(arr, length) {
    var array = [];
    array.push(dayAsDateArray[arr[1] - 1]);
    array.push(parseToLocalDateTimeFormat(dayAsDateArray[arr[1] - 1], startTimeArray[arr[0] - 1]));
    if (length > 1) {
        array.push(parseToLocalDateTimeFormat(dayAsDateArray[arr[1] - 1], endTimeArray[arr[0] - 2 + length]));
    }
    else {
        array.push(parseToLocalDateTimeFormat(dayAsDateArray[arr[1] - 1], endTimeArray[arr[0] - 1]));
    }
    return array;
}
function getReservation(cellId) {
    for (var _i = 0, reservations_1 = reservations; _i < reservations_1.length; _i++) {
        var reservation = reservations_1[_i];
        var temp = getColumnId(reservation);
        for (var _a = 0, temp_1 = temp; _a < temp_1.length; _a++) {
            var element = temp_1[_a];
            if (element === cellId) {
                return reservation;
            }
        }
    }
    return null;
}
function updateReservation(oldReservation, cell) {
    var arr = reverseParse(extractNumbersFromString(cell), getColumnId(oldReservation).length);
    var temp = {
        roomId: getRoomFromName(roomValue).id,
        personId: oldReservation.personId,
        startTime: arr[1],
        endTime: arr[2],
        reservationDate: arr[0]
    };
    if (isInRange(temp, oldReservation.id)) {
        throw new Error("reservation is in range of an other!");
    }
    reservations.forEach(function (res) {
        if (res === oldReservation) {
            res.startTime = arr[1];
            res.endTime = arr[2];
            res.reservationDate = arr[0];
        }
    });
    updateReservationInDatabase(oldReservation, temp);
}
function showErrorMessage(message) {
    var errorMessageBox = document.getElementById("errorMessageBox");
    var errorMessage = document.getElementById("error_message");
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
            }
            else {
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
function showReservationInfo(reservation) {
    var _this = this;
    var infoBox = document.getElementById("InfoBox");
    var infoMessage = document.getElementById("info_content");
    var columnId = getColumnId(reservation);
    addBorderToReservation(columnId);
    infoMessage.style.color = "#fff";
    document.getElementById("remove").remove();
    document.getElementById("edit").remove();
    var editButton = document.createElement("button");
    var removeButton = document.createElement("button");
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
    removeButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
        var affectedColumns;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    affectedColumns = getColumnId(reservation);
                    affectedColumns.forEach(function (affectedColumn) {
                        var column = document.getElementById("".concat(affectedColumn));
                        column.innerHTML = "";
                    });
                    infoBox.style.display = "none";
                    removeBorderFromReservation(columnId);
                    return [4 /*yield*/, removeReservation(reservation.id)];
                case 1:
                    _a.sent();
                    getReservationsFromDatabase();
                    return [2 /*return*/];
            }
        });
    }); });
    editButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
        var addButton;
        return __generator(this, function (_a) {
            addButton = document.getElementById("submitButton");
            addButton.innerHTML = "Speichern";
            infoBox.style.display = "none";
            removeBorderFromReservation(columnId);
            olderReservation = reservation;
            openModalWithOnclick(columnId[0]);
            return [2 /*return*/];
        });
    }); });
    window.addEventListener("click", function (event) {
        // Close modal when clicking outside of it
        if (event.target === infoBox) {
            infoBox.style.display = "none";
            removeBorderFromReservation(columnId);
        }
    });
}
function addBorderToReservation(columnIds) {
    if (columnIds.length === 1) {
        var resColumn = document.getElementById(columnIds[0]);
        resColumn.style.border = "3px solid #1e444d";
        resColumn.style.transition = ".5s border";
        var imgId = columnIds[0] + "Img";
        var img = document.getElementById(imgId);
        img.style.height = "3.7rem";
    }
    else {
        for (var i = 0; i < columnIds.length; i++) {
            var resColumn = document.getElementById(columnIds[i]);
            resColumn.style.border = "3px solid #1e444d";
            resColumn.style.transition = ".5s border";
            if (i === 0) {
                resColumn.style.borderBottom = "none";
            }
            else if (i < columnIds.length - 1) {
                resColumn.style.borderBottom = "none";
                resColumn.style.borderTop = "none";
            }
            else {
                resColumn.style.borderTop = "none";
            }
        }
    }
}
function removeBorderFromReservation(columnIds) {
    if (columnIds.length === 1) {
        var imgId = columnIds[0] + "Img";
        var img = document.getElementById(imgId);
        img.style.height = "3.3rem";
    }
    for (var i = 0; i < columnIds.length; i++) {
        var resColumn = document.getElementById(columnIds[i]);
        resColumn.style.border = "none";
    }
}
function reservationToString(reservation) {
    var person = getPersonFromId(reservation.personId);
    var result = "\n    <div id=\"flex\">\n        <div class=\"displayInfo\">\n            <h3>".concat(person.surname, " ").concat(person.firstname, "</h3>\n            <h4 style=\"margin-top: 0.5rem\">Klasse: ").concat(person.grade, "</h4>\n        </div>\n        <div class=\"displayInfo\">\n            <h4>Datum: ").concat(reservation.reservationDate, "</h4>\n            <h4 style=\"margin-top: 0.5rem\" >Zeit: ").concat(parseTime(reservation.startTime), "-").concat(parseTime(reservation.endTime), "</h4>\n        </div>\n    </div>\n    <h3 style=\"text-decoration: underline; margin-top: 1rem\">E-Mail: ").concat(person.email, "</h3>");
    return result;
}
function formatDate(date) {
    return date.toISOString().slice(0, 10);
}
function isInRange(update, id) {
    var array = reservations.filter(function (item) { return item.reservationDate === update.reservationDate; });
    var startTimeId = startTimeArray.indexOf(parseTime(update.startTime).slice(0, -3));
    var endTimeId = endTimeArray.indexOf(parseTime(update.endTime).slice(0, -3));
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var element = array_1[_i];
        if (element.id !== id) {
            var elementStartTimeId = startTimeArray.indexOf(parseTime(element.startTime));
            if (elementStartTimeId >= startTimeId && elementStartTimeId <= endTimeId) {
                return true;
            }
        }
    }
    return false;
}
function loadPersonsFromDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var emailSelect, getUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    emailSelect = document.getElementById("email");
                    getUrl = "http://localhost:8080/api/persons/list";
                    return [4 /*yield*/, fetchDataFromUrl(getUrl)
                            .then(function (data) {
                            if (data) {
                                data.forEach(function (singePerson) {
                                    var person = {
                                        id: singePerson.id,
                                        surname: singePerson.surname,
                                        firstname: singePerson.firstname,
                                        email: singePerson.email,
                                        grade: singePerson.grade
                                    };
                                    var option = document.createElement("option");
                                    option.value = person.email + "";
                                    option.text = person.email + "";
                                    persons.push(person);
                                    emailSelect.add(option);
                                });
                            }
                        })
                            .catch(function (error) { return showErrorMessage(error.message); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//##################### Wochen Wechsel ########################
function calcNextWeek() {
    var monday = new Date(localStorage.getItem("date"));
    var nextMonday = getNextMonday(monday);
    localStorage.setItem("date", nextMonday + "");
    location.reload();
}
function calcNowWeek() {
    var nowMonday = getCurrentMonday(new Date);
    localStorage.setItem("date", nowMonday + "");
    location.reload();
}
function calcPrevWeek() {
    var monday = new Date(localStorage.getItem("date"));
    var prevMonday = getPreviousMonday(monday);
    localStorage.setItem("date", prevMonday + "");
    location.reload();
}
function getNextMonday(inputDate) {
    var daysUntilNextMonday = (1 + 7 - inputDate.getDay()) % 7;
    var nextMonday = new Date(inputDate);
    nextMonday.setDate(inputDate.getDate() + daysUntilNextMonday + 7);
    nextMonday.setHours(0, 0, 0, 0);
    return nextMonday;
}
function getCurrentMonday(d) {
    d = new Date(d);
    var day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}
function getPreviousMonday(inputDate) {
    var daysSincePreviousMonday = (inputDate.getDay() + 6) % 7;
    var previousMonday = new Date(inputDate);
    previousMonday.setDate(inputDate.getDate() - daysSincePreviousMonday - 6);
    previousMonday.setHours(0, 0, 0, 0); // Set to the beginning of the day
    return getCurrentMonday(previousMonday);
}
function getCurrentWeek(monday) {
    var weekDates = [];
    // Set the input date to Monday to ensure consistency
    monday.setHours(0, 0, 0, 0);
    var currentDate = new Date(monday);
    // Iterate from Monday to Friday and add each date to the array
    for (var i = 0; i < 5; i++) {
        weekDates.push(parseDateToCalendarFormat(currentDate) + "");
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekDates;
}
function setAndStoreDate() {
    var currentMonday = getCurrentMonday(new Date);
    localStorage.setItem("date", "" + currentMonday);
}
window.onload = function () {
    var storedDate = localStorage.getItem("date");
    if (storedDate) {
        //parse to date object
        var parsedDate = new Date(storedDate);
    }
    else {
        // if no date found => save in local storage
        setAndStoreDate();
    }
};
function pad(value, length) {
    return value.toString().length < length
        ? '0'.repeat(length - value.toString().length) + value
        : value.toString();
}
function parseDateToCalendarFormat(date) {
    var day = pad(date.getDate(), 2);
    var month = pad(date.getMonth() + 1, 2); // Months are 0-based
    var year = pad(date.getFullYear(), 4);
    return "".concat(year, "-").concat(month, "-").concat(day);
}
var header = document.querySelector("#calendar h3");
var dates = document.querySelector(".dates");
var navs = document.querySelectorAll("#prev, #next");
var months = [
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
var selectedDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
};
function renderCalendar() {
    var start = new Date(selectedDate.year, selectedDate.month, 1).getDay();
    var endDate = new Date(selectedDate.year, selectedDate.month + 1, 0).getDate();
    var end = new Date(selectedDate.year, selectedDate.month, endDate).getDay();
    var endDatePrev = new Date(selectedDate.year, selectedDate.month, 0).getDate();
    var datesHtml = "";
    for (var i = start; i > 0; i--) {
        datesHtml += "<li class=\"inactive\" onclick=\"setSelectedDate(".concat(selectedDate.year, ", ").concat(selectedDate.month - 1, ", ").concat(endDatePrev - i + 1, ")\">").concat(endDatePrev - i + 1, "</li>");
    }
    for (var i = 1; i <= endDate; i++) {
        var className = i === selectedDate.day && selectedDate.month === new Date().getMonth() && selectedDate.year === new Date().getFullYear()
            ? ' class="today"'
            : "";
        datesHtml += "<li".concat(className, " onclick=\"setSelectedDate(").concat(selectedDate.year, ", ").concat(selectedDate.month, ", ").concat(i, ")\">").concat(i, "</li>");
    }
    for (var i = end; i < 6; i++) {
        datesHtml += "<li class=\"inactive\" onclick=\"setSelectedDate(".concat(selectedDate.year, ", ").concat(selectedDate.month + 1, ", ").concat(i - end + 1, ")\">").concat(i - end + 1, "</li>");
    }
    if (dates) {
        dates.innerHTML = datesHtml;
    }
    if (header) {
        header.textContent = "".concat(months[selectedDate.month], " ").concat(selectedDate.year);
    }
}
function setSelectedDate(year, month, day) {
    var newWeek = "";
    var lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    if (day > lastDayOfMonth) {
        day = lastDayOfMonth;
    }
    var selectedDateObject = new Date(year, month, day);
    var dayOfWeek = selectedDateObject.getDay();
    var mondayOfTheWeek = new Date(selectedDateObject);
    mondayOfTheWeek.setDate(selectedDateObject.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
    // Update your selectedDate object or perform any other actions as needed
    selectedDate = {
        year: mondayOfTheWeek.getFullYear(),
        month: mondayOfTheWeek.getMonth(),
        day: mondayOfTheWeek.getDate(),
    };
    newWeek = mondayOfTheWeek.toDateString() + " 00:00:00 GMT+0100 (Central European Standard Time)";
    localStorage.setItem("date", newWeek + "");
    location.reload();
    closeCalendar();
}
navs.forEach(function (nav) {
    nav.addEventListener("click", function (e) {
        var btnId = e.target.id;
        if (btnId === "prev" && selectedDate.month === 0) {
            selectedDate.year--;
            selectedDate.month = 11;
        }
        else if (btnId === "next" && selectedDate.month === 11) {
            selectedDate.year++;
            selectedDate.month = 0;
        }
        else {
            selectedDate.month = btnId === "next" ? selectedDate.month + 1 : selectedDate.month - 1;
        }
        renderCalendar();
    });
});
renderCalendar();
function openCalendar() {
    if (isCalendarShown) {
        closeCalendar();
    }
    else {
        isCalendarShown = true;
        var calendarElement = document.getElementById('calendar');
        calendarElement.style.display = 'block';
    }
}
function closeCalendar() {
    isCalendarShown = false;
    var calendarElement = document.getElementById('calendar');
    calendarElement.style.display = 'none';
}
function getRoomsFromDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var getUrl, data, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getUrl = "http://localhost:8080/api/rooms/list";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchDataFromUrl(getUrl)];
                case 2:
                    data = _a.sent();
                    if (data) {
                        data.forEach(function (singeRoom) {
                            var room = {
                                id: singeRoom.id,
                                name: singeRoom.name,
                                description: singeRoom.description
                            };
                            rooms.push(room);
                        });
                    }
                    displayRooms();
                    return [3 /*break*/, 4];
                case 3:
                    error_7 = _a.sent();
                    showErrorMessage(error_7.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getRoomFromName(roomName) {
    var result;
    rooms.forEach(function (room) {
        if (room.name === roomName) {
            result = room;
        }
    });
    return result;
}
