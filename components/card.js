export default function Card() {
    return {

        selector: document.querySelector(".countries-flags"),
        card: document.querySelector(".countrie-box"),

        mount(info) {
    
            this.selector.innerHTML = `<div class="countrie-box ${info.name}">
            <div class="box">
                <div class="flag">
                    <img src="${info.flags.png}" alt="" srcset="">
                </div>
                <div class="info">
                    <p class="title">${info.name}</p>
                    <div class="add-info">
                        <p>Population: <span class="pop-info">${info.population}</span></p>
                        <p>Region: <span class="region-info">${info.region}</span></p>
                        <p>Capital: <span class="cap-info">${info.capital}</span></p>
                    </div>
                </div>
            </div>   
        </div>
        `
        return this;
        },

        onClick() {
            this.card?.addEventListener("click", () => console.log("teste"));
            return this;
        }

        
    }
}