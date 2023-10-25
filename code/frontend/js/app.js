// popup window
document.addEventListener("DOMContentLoaded", function () {
    var openPopupButton = document.getElementById("openPopupButton");
    var modal = document.getElementById("myModal");
    var closeIcon = document.querySelector(".close");
    openPopupButton.addEventListener("click", function () {
        modal.style.display = "block";
    });
    closeIcon === null || closeIcon === void 0 ? void 0 : closeIcon.addEventListener("click", function () {
        modal.style.display = "none";
    });
    function closeModal() {
        modal.style.display = "none";
    }
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
// 
document.addEventListener("DOMContentLoaded", function () {
    // Function to assign unique IDs to the columns
    function assignColumnIds() {
        var table = document.querySelector("table");
        var headers = table.querySelectorAll("th");
        var rows = table.querySelectorAll("tr");
        // Iterate through each header and row
        for (var i = 0; i < headers.length; i++) {
            if (!headers[i].classList.contains("hour")) {
                for (var j = 1; j < rows.length; j++) {
                    var cell = rows[j].children[i];
                    // Generate a unique ID based on the column index and row index
                    cell.id = "cell_".concat(j, "_").concat(i);
                }
            }
        }
    }
    // Call the function to assign IDs
    assignColumnIds();
});
// get all values from dropdown
document.addEventListener("DOMContentLoaded", function () {
    var dropdownDay = document.getElementById("day");
    var dropdownStartTime = document.getElementById("time");
    var dropdownEndTime = document.getElementById("timeE");
    var submitButton = document.getElementById("submitButton");
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", function () {
        // get values from dropdown
        var startTime = dropdownStartTime.value;
        var endTime = dropdownEndTime.value;
        var day = dropdownDay.value;
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
function addReservation(array) {
    for (var i = 0; i < array.length; i++) {
        var id = document.getElementById(array[i]);
        if (id) {
            id.style.backgroundColor = "#eb4258";
        }
    }
}
// convert ids to the cell id
function toCell(startTimeId, dayId) {
    return "cell_".concat(startTimeId, "_").concat(dayId);
}
// get assigned columns
function getColumn(startTime, endTime, day) {
    // arrays with the values
    var startTimeArray = ["07:00", "08:00", "08:55", "10:00", "10:55", "11:50", "12:45", "13:40", "14:35", "15:30", "16:25", "17:20", "18:15", "19:10", "20:05", "21:00", "21:55"];
    var endTimeArray = ["07:50", "08:50", "09:45", "10:50", "11:45", "12:40", "13:35", "14:30", "15:25", "16:20", "17:15", "18:10", "19:05", "20:00", "20:50", "21:45", "22:40"];
    var dayArray = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
    // importatnt variables
    var dayId = 0; // id of day
    var units = 0; // count uf units reservated
    var startTimeId = 0; // reservation start time
    var columnIds = []; // array of all ids
    // get start id
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
    // get dayId
    for (var i = 0; i < dayArray.length; i++) {
        if (dayArray[i] === day) {
            dayId = i + 1;
        }
    }
    // fill array with the ids from html
    for (var i = startTimeId; i < startTimeId + units; i++) {
        columnIds.push(toCell(i + 1, dayId));
    }
    // add reservations to calendar
    addReservation(columnIds);
}
