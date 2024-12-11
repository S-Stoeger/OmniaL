const equipment = [
    {
        title: "GH4",
        name: "Panasonic Lumix DCM-GH4",
        typ: "Videokamera",
        img: "./img/gh4.jpg"
    },
    {
        title: "GH6",
        name: "Panasonic Lumix DCM-GH6",
        typ: "Videokamera",
        img: "./img/gh6.png"
    },
    {
        title: "Blackmagic",
        name: "Blackmagic Cinema Pocket",
        typ: "Videokamera",
        img: "./img/blackmagic.png"
    },
    {
        title: "Ronin M",
        name: "Dji Ronin M",
        typ: "Zubehör",
        img: "./img/roninM.png"
    },
    {
        title: "Ronin S",
        name: "Dji Ronin S",
        typ: "Zubehör",
        img: "./img/roninS.jpg"
    },
    {
        title: "Kamera",
        name: "Kamera",
        typ: "Videokamera",
        img: "./img/camera.jpeg"
    },
    {
        title: "Ninja Monitor",
        name: "Atomos Ninja Inferno",
        typ: "Zubehör",
        img: "./img/ninjaMonitor.jpg"
    },
    {
        title: "Objektiv",
        name: "Sigma 18-35mm",
        typ: "Zubehör",
        img: "./img/Objektiv.jpeg"
    }
];

function printProductRows() {
    const products = document.getElementById("products");
    let resultstring = "";
    let counter = 0;

    for (let i = 0; i < 1; i++) {
        resultstring += `<div class="product-row">`;

        for (let j = 0; j < 4; j++) {
            resultstring += `
            <a href="detail.html"><div class="product">
                <h3 class="product-title">${equipment[counter].title}</h3>
                <div class="product-info">
                    <h4 class="product-name">${equipment[counter].name}</h4>
                    <p class="product-type">${equipment[counter].typ}</p>
                    <img class="product-img" src="${equipment[counter].img}">
                </div>
            </div></a>`;
            counter++;
        }
        resultstring += `</div>`;
    }
    
    if (products != null) {
        products.innerHTML = resultstring;
    }
}
printProductRows();
