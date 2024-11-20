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
                    <a><i class="fa-solid fa-circle-info"></i></a>
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

printChosenProducts();