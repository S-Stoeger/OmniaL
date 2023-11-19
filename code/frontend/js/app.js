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
// constatnts
var reservations = [];
var startTimeArray = ["07:00", "08:00", "08:55", "10:00", "10:55", "11:50", "12:45", "13:40", "14:35", "15:30", "16:25", "17:20", "18:15", "19:10", "20:05", "21:00", "21:55"];
var endTimeArray = ["07:50", "08:50", "09:45", "10:50", "11:45", "12:40", "13:35", "14:30", "15:25", "16:20", "17:15", "18:10", "19:05", "20:00", "20:50", "21:45", "22:40"];
var dayArray = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
var allRooms = ["Fotostudio", "Audiostudie", "Viedeoschnitt", "EDV1", "EDV2", "EDV3", "EDV4", "EDV5", "EDV6", "EDV7", "EDV8", "EDV9", "EDV10", "EDV11", "EDV12", "EDV13", "EDV14", "EDV15", "EDV16", "EDV17", "EDV18"];
var dayDefaultValue = "Montag";
var startTimeDefaultValue = "-- Startzeit --";
var endTimeDefaultValue = "-- Endzeit --";
var urlParams = new URLSearchParams(window.location.search);
var roomValue = urlParams.get('roomValue');
var newUri = "../html/index.html?roomValue=Fotostudio";
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
    var columnIds;
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", function () {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
        // get values from dropdown
        var startTime = dropdownStartTime.value;
        var endTime = dropdownEndTime.value;
        var day = dropdownDay.value;
        // ceck if all set
        if (startTime && endTime && day) {
            if (endTime > startTime) {
                // get values/convert to id/ make reservation
                columnIds = getColumnId(startTime, endTime, day);
            }
        }
        // add reservations to calendar
        paintColumnsReservated(columnIds);
    });
});
// adding color to box
function paintColumnsReservated(array) {
    for (var i = 0; i < array.length; i++) {
        var id = document.getElementById(array[i]);
        if (id) {
            id.style.backgroundColor = "#cd7f35";
        }
    }
}
// convert ids to the cell id
function cellIdToString(startTimeId, dayId) {
    return "cell_".concat(startTimeId, "_").concat(dayId);
}
// get assigned columns
function getColumnId(startTime, endTime, day) {
    var reservation = { day: day, startTime: startTime, endTime: endTime };
    reservations.push(reservation);
    var dayId = 0; // id of day
    var units = 0; // count uf units reservated
    var startTimeId = 0; // reservation start time
    var columnIds = []; // array of all ids
    // get startTime position in array
    for (var i = 0; i < startTimeArray.length; i++) {
        if (startTimeArray[i] === startTime) {
            startTimeId = i;
            // get units
            for (var j = i; j < endTimeArray.length; j++) {
                units++;
                if (endTimeArray[j] === endTime) {
                    break;
                }
            }
            ;
        }
    }
    ;
    // get day position in array
    for (var i = 0; i < dayArray.length; i++) {
        if (dayArray[i] === day) {
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
    var url = 'http://localhost:8080/api/reservations/list';
    fetchDataFromUrl(url)
        .then(function (data) {
        if (data) {
            data.forEach(function (singleReservation) {
                var newReservation = { day: parseDay(singleReservation.startTime), startTime: parseTime(singleReservation.startTime), endTime: parseTime(singleReservation.endTime) };
                loadReservation(newReservation);
            });
        }
    })
        .catch(function (error) { return console.error("Error: ".concat(error.message)); });
}
function loadReservation(reservation) {
    reservation.startTime = reservation.startTime.slice(0, -3);
    reservation.endTime = reservation.endTime.slice(0, -3);
    console.log(reservation);
    var columns = getColumnId(reservation.startTime, reservation.endTime, reservation.day);
    paintColumnsReservated(columns);
}
// parse day received from beckand
function parseDay(dateString) {
    var array = dateString.split("T");
    var dateObject = new Date(array[0]);
    var dayIndex = dateObject.getDay();
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
        var response, error_1;
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
                    error_1 = _a.sent();
                    // Handle exceptions
                    console.error("Error: ".concat(error_1.message));
                    return [2 /*return*/, null];
                case 6: return [2 /*return*/];
            }
        });
    });
}
