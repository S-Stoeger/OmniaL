function printChosenProducts() {
    const products = document.getElementById("profile-equipment");
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

printChosenProducts();