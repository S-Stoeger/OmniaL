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
var startTimeArray = ["07:00", "08:00", "08:55", "10:00", "10:55", "11:50", "12:45", "13:40", "14:35", "15:30", "16:25", "17:20", "18:15", "19:10", "20:05", "21:00", "21:55"];
var endTimeArray = ["07:50", "08:50", "09:45", "10:50", "11:45", "12:40", "13:35", "14:30", "15:25", "16:20", "17:15", "18:10", "19:05", "20:00", "20:50", "21:45", "22:40"];
var dayArray = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
var dayAsDateArray = ["2023-11-13", "2023-11-14", "2023-11-15", "2023-11-16", "2023-11-17"];
var allRooms = ["Fotostudio", "Audiostudio", "Viedeoschnitt", "EDV1", "EDV2", "EDV3", "EDV4", "EDV5", "EDV6", "EDV7", "EDV8", "EDV9", "EDV10", "EDV11", "EDV12", "EDV13", "EDV14", "EDV15", "EDV16", "EDV17", "EDV18"];
var dayDefaultValue = "Montag";
var startTimeDefaultValue = "-- Startzeit --";
var endTimeDefaultValue = "-- Endzeit --";
var urlParams = new URLSearchParams(window.location.search);
var roomValue = urlParams.get('roomValue');
var newUri = "../html/index.html?roomValue=Fotostudio";
var url = 'http://localhost:8080/api/reservations';
var isRoomShown = false;
// no more room null
if (roomValue == null) {
    window.location.href = newUri;
}
// MODAL
document.addEventListener("DOMContentLoaded", function () {
    var openPopupButton = document.getElementById("openPopupButton");
    var modal = document.getElementById("myModal");
    var closeIcon = document.querySelector(".close");
    // get dropdowns
    var dropdownDay = document.getElementById("day");
    var dropdownStartTime = document.getElementById("time");
    var dropdownEndTime = document.getElementById("timeE");
    openPopupButton.addEventListener("click", function () {
        modal.style.display = "block";
        // set value at dropdowns
        dropdownDay.value = dayDefaultValue;
        dropdownStartTime.value = startTimeDefaultValue;
        dropdownEndTime.value = endTimeDefaultValue;
    });
    closeIcon === null || closeIcon === void 0 ? void 0 : closeIcon.addEventListener("click", function () {
        modal.style.display = "none";
    });
    window.addEventListener("click", function (event) {
        // Close modal when clicking outside of it
        if (event.target === modal) {
            modal.style.display = "none";
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
    getReservationsFromDatabase();
    displayRooms();
});
// Reserving room per onlick
function openModalWithOnclick(cellId) {
    // get modal
    var modal = document.getElementById("myModal");
    // show modall
    modal.style.display = "block";
    // get dropdown elements
    var dropdownDay = document.getElementById("day");
    var dropdownStartTime = document.getElementById("time");
    var dropdownEndTime = document.getElementById("timeE");
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
}
// get all values from dropdown & do reservation
document.addEventListener("DOMContentLoaded", function () {
    var dropdownDay = document.getElementById("day");
    var dropdownStartTime = document.getElementById("time");
    var dropdownEndTime = document.getElementById("timeE");
    var submitButton = document.getElementById("submitButton");
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
        var modal, startTime, endTime, day, dayId, i, reservation, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    modal = document.getElementById("myModal");
                    modal.style.display = "none";
                    startTime = dropdownStartTime.value;
                    endTime = dropdownEndTime.value;
                    day = dropdownDay.value;
                    if (!(startTime && endTime && day)) return [3 /*break*/, 5];
                    // get day position in array
                    for (i = 0; i < dayArray.length; i++) {
                        if (dayArray[i] === day) {
                            dayId = i;
                        }
                    }
                    reservation = { id: reservations.length + 1, roomId: 1, personId: 1, startTime: parseToLocalDateTimeFormat(dayAsDateArray[dayId], startTime), endTime: parseToLocalDateTimeFormat(dayAsDateArray[dayId], endTime), reservationDate: dayAsDateArray[dayId] };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, addReservationToDatabase(reservation)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error occured while adding reservation to Database!');
                    return [3 /*break*/, 4];
                case 4:
                    getReservationsFromDatabase();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); });
});
function parseToLocalDateTimeFormat(date, time) {
    var localDateTime = date + "T" + time + ":00";
    return localDateTime;
}
// adding color to box
function paintColumnsReservated(array) {
    for (var i = 0; i < array.length; i++) {
        var td = document.getElementById(array[i]);
        if (td) {
            //id.style.backgroundColor = "#cd7f35";
            var imgId = array[i] + "Img";
            td.innerHTML = "<img id=\"".concat(imgId, "\" src=\"../img/test.png\" draggable=\"true\" ondragstart=\"drag(event, ").concat(array[i], ")\">");
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
    // Example usage
    var getUrl = url + '/list';
    fetchDataFromUrl(getUrl)
        .then(function (data) {
        if (data) {
            data.forEach(function (singleReservation) {
                var reservation = { id: singleReservation.id, roomId: singleReservation.roomId, personId: singleReservation.personId, startTime: singleReservation.startTime, endTime: singleReservation.endTime, reservationDate: singleReservation.reservationDate };
                reservations.push(reservation);
                loadReservation(reservation);
            });
        }
    })
        .catch(function (error) { return console.error("Error: ".concat(error.message)); });
}
function loadReservation(reservation) {
    reservation.startTime = reservation.startTime.slice(0, -3);
    reservation.endTime = reservation.endTime.slice(0, -3);
    var columns = getColumnId(reservation);
    paintColumnsReservated(columns);
}
// parse day received from beckand
function parseDay(dateString) {
    var array = dateString.split("T");
    var dateObject = new Date(array[0]);
    var dayIndex = dateObject.getDay();
    // adjust index, becaus getDay() starts and ends with Sunday
    dayIndex = (dayIndex + 6) % 7;
    //console.log(array[0]);
    //console.log(dayArray[dayIndex]);
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
        isRoomShown = true;
    }
}
function displayRooms() {
    var box = document.getElementById("rooms");
    // Clear existing content in the box
    box.innerHTML = '';
    // Assuming allRooms is an array of strings
    for (var i = 0; i < allRooms.length; i++) {
        // Use textContent instead of innerHTML
        var anchor = document.createElement("a");
        anchor.textContent = allRooms[i];
        anchor.id = allRooms[i];
        var currentRoomId = anchor.id;
        // set color for selected room
        if (compareRoom(allRooms[i])) {
            anchor.style.cssText = "color: #f5b963"; // Matching room
        }
        else {
            anchor.style.cssText = "color: #fff"; // Non-matching room
        }
        // reload page with correct room
        anchor.href = "../html/index.html?roomValue=".concat(currentRoomId);
        box.appendChild(anchor);
    }
}
function compareRoom(room) {
    return roomValue === room;
}
function fetchDataFromUrl(url) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_2;
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
                    console.error("Error: Unable to fetch data. Status code: ".concat(response.status));
                    return [2 /*return*/, null];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    // Handle exceptions
                    console.error("Error: ".concat(error_2.message));
                    return [2 /*return*/, null];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function addReservationToDatabase(reservation) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(reservation)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to add reservation');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function updateReservationInDatabase(reservation) {
    return __awaiter(this, void 0, void 0, function () {
        var response, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("".concat(url, "/").concat(reservation.id), {
                            method: 'PUT', // Assuming you use PUT for updates, adjust if necessary
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(reservation),
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to update reservation');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = _a.sent();
                    console.log('Reservation updated successfully:', result);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    // Handle any errors that occurred during the fetch operation
                    console.error('Error updating reservation:', error_3.message);
                    // You may choose to rethrow the error or handle it differently based on your requirements
                    throw error_3;
                case 4: return [2 /*return*/];
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
    console.log(oldReservation);
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev, cell) {
    console.log(checkIfContains(cell.id));
    if (!checkIfContains(cell.id)) {
        updateReservation(oldReservation, cell.id);
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        var draggedElement = document.getElementById(data);
        if (draggedElement) {
            ev.target.appendChild(draggedElement);
        }
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
function reverseParse(arr) {
    var array = [];
    array.push(dayAsDateArray[arr[1] - 1]);
    array.push(parseToLocalDateTimeFormat(dayAsDateArray[arr[1] - 1], startTimeArray[arr[0] - 1]));
    array.push(parseToLocalDateTimeFormat(dayAsDateArray[arr[1] - 1], endTimeArray[arr[0] - 1]));
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
    var arr = reverseParse(extractNumbersFromString(cell));
    reservations.forEach(function (res) {
        if (res === oldReservation) {
            res.startTime = arr[1];
            res.endTime = arr[2];
            res.reservationDate = arr[0];
        }
    });
}
