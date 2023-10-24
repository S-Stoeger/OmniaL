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

    function closeModal() {
        modal.style.display = "none";
    }

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

// main.ts
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
                    cell.id = `cell_${i}_${j}`;
                }
            }
        }
    }

    // Call the function to assign IDs
    assignColumnIds();
});

// script.ts
// script.ts
document.addEventListener("DOMContentLoaded", () => {
    const dropdownD = document.getElementById("day") as HTMLSelectElement;
    const dropdown = document.getElementById("time") as HTMLSelectElement;
    const dropdownE = document.getElementById("timeE") as HTMLSelectElement;
    const submitButton = document.getElementById("submitButton");

    submitButton?.addEventListener("click", () => {
        const selectedValue = dropdown.value;
        const selectedValueE = dropdownE.value;
        const selectedValueD = dropdownD.value;

        if (selectedValue) {
            console.log(selectedValue);
            console.log(selectedValueE);
            console.log(selectedValueD);
        }
    });
});
