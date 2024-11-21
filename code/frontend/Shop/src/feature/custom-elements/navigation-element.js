class navigationBar extends HTMLElement {
    constructor() {
        super()
    
        const shadow = this.attachShadow({mode: "open"})

        const wrapper = document.createElement('nav')
        wrapper.classList.add('navigation-bar')

        wrapper.innerHTML = `
        <div id="navigation">
            <a id="navigation-profile" href="./profile.html">
                <div>
                    <p>MM</p>
                </div>
                <p class="navigation">Max Mustermann</p>
            </a>

            <div id="searchbar">
                <select>
                    <option>Alle</option>
                    <option>Kamera</option>
                    <option>Mikrofon</option>
                    <option>Zubeh&ouml;r</option>
                    <option>Raum</option>
                </select>
                <p>Suche nach Equipment bzw. R&auml;ume</p>
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>

            <a href="./index.html" class="navigation">Shop</a>
            <a href="./auswahl.html" class="navigation">Auswahl<i class="fa-solid fa-basket-shopping"></i></a>
        </div>`
        
        const style = document.createElement('style')
        style.textContent = `
            #navigation{
                color: #fff;
                background-color: var(--dark_blue);
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 8vh;
                display: flex;
            }

            #navigation > :first-child {
                margin-left: 2vw;
            }

            #navigation > :last-child {
                margin-right: 7vw;
            }

            #navigation, a {
                color: #fff;
                text-decoration: none;
                font-size: 1.2rem;
                text-decoration: none;
            }
            .navigation {
                text-align: center;
                padding-left: 0.5vw;
                padding-right: 0.5vw;
                background-image: linear-gradient(var(--light_blue), var(--light_blue));
                background-size: 0% 0.2rem;
                background-position-y: 100%;
                background-position-x: 0%;
                background-repeat: no-repeat;
                transition: background-size 0.5s ease-in-out;
            }
            .navigation:hover, .navigation:focus, .navigation:active {
                background-size: 100% 0.2rem;
                transition: 0.5s;
            }

            #navigation-profile {
                width: 13vw;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            #navigation-profile > div {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--grey);
                width: 3vw;
                height: 3vw;
                border-radius: 10rem;
                color: var(--black)
            }

            #searchbar {
                background-color: var(--white);
                width:35vw;
                height: 5vh;
                border-radius: 10rem;
                display: flex;
                align-items: center;
            }

            #searchbar > select {
                height: 5vh;
                border-top-left-radius: 10rem;
                border-bottom-left-radius: 10rem;
                border: 0;
                padding-left: 1vw;
            }

            #searchbar > p {
                font-size: small;
                color: var(--grey);
                margin-left: 1vw;
            }
            `
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }
}


customElements.define("navigation-bar", navigationBar);