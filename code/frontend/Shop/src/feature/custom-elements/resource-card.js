class ResourceCard extends HTMLElement {
    constructor() {
        super()

        const wrapper = document.createElement('div')
        
        const href = this.getAttribute('href')
        wrapper.setAttribute('href', href);
        wrapper.classList.add('card-link')

        wrapper.innerHTML = `
            <div class="product">
                <p class="card-title"></p>
                <div>
                    <p class="card-name"></p>
                    <p class="card-type"></p>
                    <img src="" class="card-img" width="100vw">
                </div>
            </div>
        `

        this.appendChild(wrapper)
    }

    setContent(title, name, type, imgPath, href) {
        const wrapper = this.querySelector('.product');
        wrapper.querySelector('.card-title').textContent = title;
        wrapper.querySelector('.card-name').textContent = name;
        wrapper.querySelector('.card-type').textContent = type;
        wrapper.querySelector('.card-img').setAttribute('src', imgPath);
        wrapper.querySelector('.card-link').setAttribute('href', href);
    }
}

customElements.define('resource-card', ResourceCard)