function printChosenProducts() {
    const products = document.getElementById("items");
    let resultstring = "";

    for (let i = 0; i < 3; i++) {
        resultstring += `
            <div>
                <hr>
                <div id="item">
                    <img src="./img/camera.png" width="70vw">
                    <p>Name</p>
                    <p>xx.xx.xxxx-zz.zz.zzzz</p>
                    <i class="fa-solid fa-x"></i>
                </div>
                <hr>
            </div>
            `
    }

    products.innerHTML = resultstring;
}

printChosenProducts();