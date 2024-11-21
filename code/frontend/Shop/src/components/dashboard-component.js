function printChosenProducts() {
    let products;
    let resultstring = "";
    for(let y = 0; y < 2; y++) {
        if (y === 0) {
            products = document.getElementById("dashboard-request");
        } else {
            products = document.getElementById("dashboard-return")
        }
        for (let i = 0; i < 1; i++) {
            resultstring += `
                <div class="dashboard-exchange">
                    <a id="openModalBtn"><i class="fa-solid fa-circle-info"></i></a>
                    <p class="dashboard-exchange-text">Max Mustermann<p>
                    <p class="dashboard-exchange-text">19.02.2024-20.02.2024<p>
                    <div class="dashboard-exchange-status">
                        <i class="fa-solid fa-x"></i><i class="fa-solid fa-check"></i>
                    </div>
                </div>
                `
        }
    
        products.innerHTML = resultstring;
        resultstring = "";
    }
}

function printProducts() {
    const products = document.getElementById("dashboard-equipment");
    let resultstring = "";

    for (let i = 0; i < 3; i++) {
        resultstring += `
            <div>
                <hr>
                <div id="item">
                    <img src="./img/camera.png" width="70vw">
                    <h2>Parasonic GH6</h2>
                    <p>xx.xx.xxxx-zz.zz.zzzz</p>
                </div>
                <hr>
            </div>
            `
    }

    products.innerHTML = resultstring;
}

printProducts();

printChosenProducts();

// Get modal element and buttons
const modal = document.getElementById('myModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementsByClassName('close-btn')[0];

// Open the modal when the button is clicked
openModalBtn.onclick = function() {
    modal.style.display = "block";
}

// Close the modal when the close button is clicked
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// Close the modal if the user clicks outside the modal content
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
