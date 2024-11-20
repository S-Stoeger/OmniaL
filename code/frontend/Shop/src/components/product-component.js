function printProductRows() {
    const products = document.getElementById("products");
    let resultstring = "";

    for (let i = 0; i < 3; i++) {
        resultstring += `<div class="product-row">`;

        for (let j = 0; j < 4; j++) {
            resultstring += `
            <a href="detail.html"><div class="product">
                <p>Titel</p>
                <div>
                    <p>Name</p>
                    <p>Typ</p>
                    <img>
                </div>
            </div></a>`;
        }

        resultstring += `</div>`;
    }
    
    if (products != null) {
        products.innerHTML = resultstring;
    }
}
printProductRows();
