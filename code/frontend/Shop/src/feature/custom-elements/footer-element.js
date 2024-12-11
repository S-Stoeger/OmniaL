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
            <div style="width: 60%;">
                <h4 style="margin: 0; padding: 0; font-size: 25px">Bei Fragen wenden sie sich an:</h4>
                <div style="display: flex; align-items: center; justify-content: flex-start; padding: 0;margin: 0">
                    <p><span style="font-weight: bold">Audio: </span><a href="mailto:e.baar@htl-leonding.ac.at" style="text-decoration-line: underline">e.baar@htl-leonding.ac.at</a>
                        <span style="font-weight: bold">Videoequipment: </span> <a href="mailto:m.riepler@htl-leonding.ac.at" style="text-decoration-line: underline">m.riepler@htl-leonding.ac.at</a>
                        <span style="font-weight: bold">Fotografie: </span><a href="mailto:p.engleitner@htl-leonding.ac.at" style="text-decoration-line: underline">p.engleitner@htl-leonding.ac.at</a></p>
                </div>
            </div>


        </div>
    
            `;


        const style = document.createElement('style')
        style.textContent = `
                        
            footer{
                display: flex;
                flex-direction: row;
                background-color: #1e444d;
                padding: 1% 2%;
                color: white;
                font-size: 20px;
                font-weight: normal;
                justify-content: space-between;
                align-items: center;
                margin-top: 4%;
            }
            
            footer h1{
                font-weight: normal;
            }
            
            footer > div {
                width: 50%;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
            }
        `;
        this.appendChild(style);
        this.appendChild(wrapper);
    }
}


customElements.define("footer-element", footerElement);