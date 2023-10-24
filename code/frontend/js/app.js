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
// main.ts
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
                    cell.id = "cell_".concat(i, "_").concat(j);
                }
            }
        }
    }
    // Call the function to assign IDs
    assignColumnIds();
});
// script.ts
// script.ts
document.addEventListener("DOMContentLoaded", function () {
    var dropdownD = document.getElementById("day");
    var dropdown = document.getElementById("time");
    var dropdownE = document.getElementById("timeE");
    var submitButton = document.getElementById("submitButton");
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", function () {
        var selectedValue = dropdown.value;
        var selectedValueE = dropdownE.value;
        var selectedValueD = dropdownD.value;
        if (selectedValue) {
            console.log(selectedValue);
            console.log(selectedValueE);
            console.log(selectedValueD);
        }
    });
});
