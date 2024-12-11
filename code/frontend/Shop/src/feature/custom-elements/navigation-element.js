class navigationBar extends HTMLElement {
    constructor() {
        super();

        const wrapper = document.createElement('nav');
        wrapper.classList.add('navigation-bar');

        wrapper.innerHTML = `
            <a id="navigation-profile" href="./profile.html">
                <div>
                    <p>MM</p>
                </div>
                <p  class="navigation">Max Mustermann</p>
            </a>
            <div id="navigation-links">
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
                <a href="./auswahl.html" class="navigation">Warenkorb <i class="fa-solid fa-cart-shopping"></i></a>
            </div>
            <div id="mobile-dropdown">
                <button id="menu-toggle">☰</button>
                <div id="dropdown-menu">
                    
                    <a href="./index.html" class="navigation">Shop</a>
                    <a href="./auswahl.html" class="navigation">Warenkorb <i class="fa-solid fa-cart-shopping"></i></a>
                </div>
            </div>
            <div id="search-handy">
                <div id="searchbar-handy">
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
            </div>    
        `;

        const style = document.createElement('style');
        style.textContent = `
            .navigation-bar {
                color: #fff;
                background-color: var(--dark_blue);
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 9vh;
                padding: 0 1rem;
                flex-wrap: wrap;
            }

            a {
                color: #fff;
                text-decoration: none;
                font-size: 1.4rem;
            }

            .navigation {
                text-align: center;
                padding: 0.5rem;
                background-image: linear-gradient(var(--light_blue), var(--light_blue));
                background-size: 0% 0.2rem;
                background-position: 100% 100%;
                background-repeat: no-repeat;
                transition: background-size 0.5s ease-in-out;
            }
            .navigation:hover, .navigation:focus, .navigation:active {
                background-size: 100% 0.2rem;
                transition: 0.5s;
            }

            #navigation-profile {
                width: 15vw;
                display: flex;
                align-items: center;
                margin-left: 3vw;
            }

            #navigation-profile > div {
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--grey);
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                color: var(--black);
            }

            #navigation-links {
                display: flex;
                gap: 1rem;
                align-items: center;
                width: 75%;
                justify-content: space-evenly;
            }

            #searchbar {
                font-size: 1.1rem;
                background-color: var(--white);
                width: 35vw;
                height: 6vh;
                border-radius: 50rem;
                display: flex;
                align-items: center;
            }

            #searchbar > i {
                margin-right: 5%;
            }

            #search-handy {
                width: 100%;
            }

            #searchbar-handy {
                font-size: 1.1rem;
                background-color: var(--white);
                width: 92vw;
                height: 6vh;
                border-radius: 0.7rem;
                display: flex;
                align-items: center;
                margin-bottom: 3%;
            }

            #searchbar-handy > i {
                margin-right: 5%;
            }

            #searchbar > select {
                font-size: 1rem;
                height: 100%;
                border: 0;
                border-radius: 50rem 0 0 50rem;
                padding-left: 1rem;
            }

            #searchbar-handy > select {
                font-size: 1rem;
                height: 100%;
                border: 0;
                border-radius: 0.7rem 0 0 0.7rem;
                
            }

            #searchbar > p {
                font-size: 0.9rem;
                color: var(--grey);
                margin-left: 1rem;
                flex: 1;
            }

            #searchbar-handy > p {
                font-size: 0.6rem;
                color: var(--grey);
                margin-left: 1rem;
                flex: 1;
            }

            #mobile-dropdown {
                display: none;
                position: relative;
            }

            #menu-toggle {
                background: none;
                border: none;
                color: #fff;
                font-size: 1.5rem;
                cursor: pointer;
            }

            #dropdown-menu {
                display: none;
                position: absolute;
                top: 100%;
                right: 0;
                background: var(--dark_blue);
                border: 1px solid var(--grey);
                border-radius: 0.5rem;
                flex-direction: column;
                padding: 0.5rem;
                width: 90vw;
            }

            #dropdown-menu a { 
                padding: 0.5rem;
                text-align: left;
            }

            #dropdown-searchbar {
                display: flex;
                align-items: center;
                background-color: var(--white);
                border-radius: 10rem;
                padding: 0.5rem 1rem;
                margin-bottom: 0.5rem;
            }

            #dropdown-searchbar select {
                font-size: 1rem;
                border: none;
                border-radius: 20rem 0 0 20rem;
                padding: 0.5rem;
            }

            #dropdown-searchbar input {
                flex: 1;
                border: none;
                font-size: 1rem;
                padding: 0.5rem;
                margin: 0 0.5rem;
            }

            #dropdown-searchbar i {
                font-size: 1.2rem;
                color: var(--grey);
            }

            #mobile-dropdown.active #dropdown-menu {
                display: flex;
            }

            @media (max-width: 700px) {
                #navigation-links {
                    display: none;
                }
                #mobile-dropdown {
                    display: block;
                }
                .navigation-bar {
                    height: 18vh;
                }
                #navigation-profile {
                    width: 70vw;
                }
                a {
                    font-size: 1.2rem;
                }
            }

            @media (min-width: 701px) {
                #search-handy {
                    display: none;
                }
            }
        `;

        // Toggle dropdown menu for mobile
        wrapper.querySelector('#menu-toggle').addEventListener('click', () => {
            const dropdown = wrapper.querySelector('#mobile-dropdown');
            dropdown.classList.toggle('active');
        });

        this.appendChild(style);
        this.appendChild(wrapper);
    }
}

customElements.define("navigation-bar", navigationBar);