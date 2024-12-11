class footerElement extends HTMLElement {
    constructor() {
        super()

        const wrapper = document.createElement('footer')
        wrapper.classList.add('footer-element')

        wrapper.innerHTML = `
        
        <div>
            <img src="./img/Logo-OmniaL-rund.png" style="width: 20%">
        </div>

        <div style="padding: 0;">
            <div style="width: 80%;">
                <h4>Bei Fragen wenden sie sich an:</h4>
                <div id="footer-ask">
                    <span style="font-weight: bold">Audio: </span><a href="mailto:e.baar@htl-leonding.ac.at">e.baar@htl-leonding.ac.at</a>
                    <span style="font-weight: bold">Videoequipment: </span> <a href="mailto:m.riepler@htl-leonding.ac.at">m.riepler@htl-leonding.ac.at</a>
                    <span style="font-weight: bold">Fotografie: </span><a href="mailto:p.engleitner@htl-leonding.ac.at">p.engleitner@htl-leonding.ac.at</a>
                </div>
                <br>
            </div>
        </div>
        
        `;


        const style = document.createElement('style')
        style.textContent = ` 
            footer {
                display: flex;
                flex-direction: row;
                background-color: #1e444d;
                padding: 1% 2%;
                color: white;
                font-size: 20px;
                font-weight: normal;
                justify-content: space-between;
                align-items: center;
            }
            
            footer h1 {
                font-weight: normal;
                margin: 0;
            }

            footer h4 {
                font-size: 1.5rem;
            }
            
            footer > div {
                width: 50%;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
            }

            #footer-ask {
                display: flex; 
                flex-direction: column; 
                align-items: left;
            }

            a {
                font-size: 1rem;
                text-decoration-line: underline
            }

            @media screen and (max-width: 768px) {
                footer {
                    flex-direction: column; /* Elemente stapeln sich vertikal */
                    padding: 2% 5%; /* Mehr Polsterung für kleinere Geräte */
                    font-size: 16px; /* Kleinere Schriftgröße */
                    text-align: center; /* Zentrierter Text */
                    width: 90%;
                }
            
                footer > div {
                    width: 100%; /* Volle Breite für die Inhalte */
                    margin-bottom: 2%; /* Abstand zwischen den Abschnitten */
                }
            
                footer h1 {
                    font-size: 18px; /* Kleinere Schriftgröße für Überschriften */
                }
            }
        `;
        this.appendChild(style);
        this.appendChild(wrapper);
    }
}


customElements.define("footer-element", footerElement);