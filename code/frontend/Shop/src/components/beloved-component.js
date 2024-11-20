function printProductRows() {
    const products = document.getElementById("products");
    let resultstring = "";

    for (let i = 0; i < 1; i++) {
        resultstring += `<div class="product-row">`;

        for (let j = 0; j < 4; j++) {
            resultstring += `
            <div class="product">
                <p>Titel</p>
                <div>
                    <p>Full name</p>
                    <p>Type</p>
                    <img>
                </div>
            </div>`;
        }

        resultstring += `</div>`;
    }
    
    if (products != null) {
        products.innerHTML = resultstring;
    }
}
printProductRows();
