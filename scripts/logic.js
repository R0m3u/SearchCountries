import { HomePage, DetailsOfCountry } from "./components.js";

//UTILS
const selector = (data) => {
    let query = document.querySelector(data);
    return query;
};


//LOAD APP AT THE HOME PAGE
selector("body").innerHTML = HomePage();

//
let showRegions = false;
let toggleThemeIsOn = false;

/*
LOAD THE ELEMENTS AND THE EVENT WHEN 
PAGES ARE SWITCHED
*/
loadElements();

//LOAD THE JSON FILE
export async function Data() {
    const request = await fetch("data.json");
    const response = await request.json();

    return response
}

//STRUCTURE OF THE COUNTRY CARD
function Card(info) {
    return `
    <div class="countrie-box ${info.name}">
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
    `;
}

//RESULT BASED OF THE USER INPUT
async function FilterByCountrie() {
    const countries = await Data();
    const input = selector("input");
    const query = input.value.trim().toLowerCase();

    const countriesFiltered = countries.filter(country =>
        country.name.toLowerCase().includes(query)
    );

    RemoveAndAddCard(countriesFiltered);
}

//TOGGLE VISIBILITY OF REGIONS CONTAINER
function Toggle() {
    const regions = selector(".region-options");

    showRegions = !showRegions;
    regions.style.display = showRegions ? "block" : "none";
}


//RESULT BASED ON REGION
async function Region(element) {
    let region = element.target.textContent;

    const countries = await Data();
    const countriesFiltered = countries.filter(country =>
        country.region === region
    );   

    RemoveAndAddCard(countriesFiltered);
}


//TOGGLE LIGHT AND DARK THEME
function toggleTheme() {
    const backgroundColor = "light-background";
    const lightTheme = "light-theme";
    const lightDetails = "light-details";
    const lightButton = "light-button";
    const lightButtonIcon = "light-button-icon";

    const generalStyles = `
    .search-countries > ::-webkit-input-placeholder {
        color: #909090;
        font-weight: 500;
    }

    .search-countries > .icon > svg {
        fill: #909090;
    }

    .select-button > .icon > svg {
        stroke: #909090;
    }
    `;

    let placeholderStyles = selector(".placeholder-styles");

    if(!placeholderStyles) {
        placeholderStyles = document.createElement("style");
        placeholderStyles.className = "placeholder-styles";
        document.head.appendChild(placeholderStyles);
    }

    const elementsToToggle = [
        {selector: "body", className: backgroundColor},
        {selector: "header", className: lightTheme},
        {selector: ".search-by-region", className: lightTheme},
        {selector: ".region", className: lightTheme},
        {selector: ".region-options", className: lightTheme},
        {selector: ".select-button", className: lightTheme},
        {selector: "input", className: lightTheme, isInput: true},
        {selector: ".search-countries", className: lightTheme},
        {selector: ".informations > .title", className: lightDetails},
        {selector: ".box", className: lightTheme, multipleElement: true},
        {selector: ".info-page", className: lightDetails, multipleElement: true},
        {selector: ".countries-aside", className: lightDetails},
        {selector: ".countries-aside > button", className: lightButton},
        {selector: ".back-to-home", className: lightButton},
        {selector: ".back-to-home > .icon > svg", className: lightButtonIcon},
        {selector: ".border-details", className: lightButton, multipleElement: true}
    ];

    elementsToToggle.forEach(item => {
        if(toggleThemeIsOn) {
            if(selector(item.selector)) { 
                if(item.multipleElement) {
                    const boxCards = document.querySelectorAll(item.selector);
                    boxCards.forEach(card => {
                        card.classList.add(item.className);
                    });
                }
                else {
                    const element = selector(item.selector);
                    element.classList.add(item.className);
        
                    if(item.isInput)
                        if(element.classList.contains(lightTheme))
                            placeholderStyles.innerHTML = generalStyles;
                }
            }
        }

        else {
            if(selector(item.selector)) { 
                if(item.multipleElement) {
                    const boxCards = document.querySelectorAll(item.selector);
                    boxCards.forEach(card => {
                        card.classList.remove(item.className);
                    });
                }
    
                else {
                    const element = selector(item.selector);
                    element.classList.remove(item.className);
        
                    if(item.isInput)
                        selector(".placeholder-styles").remove();
                }
            }
        }        
    });
}


//ADD AND REMOVE THE CARDS
function RemoveAndAddCard(countries) {
    const container = selector(".countries-flags");

    container.innerHTML = countries.map(Card).join('');

    ShowMoreDetails(countries);
    if(toggleThemeIsOn)
        toggleTheme();
}

//SWICTH PAGES
function ShowMoreDetails(cardName) {
    const cards = document.querySelectorAll(".box");
    const buttons = document.querySelectorAll(".border-details");

    console.log(buttons);

    cards.forEach(card => 
        card.addEventListener("click", () => {
            let countryName = card.querySelector(".title").innerText;
            let countryDetails = cardName.filter(name => name.name == countryName);
            let countryBorderCodes = countryDetails[0].borders;
            
            const countryBorderNames = cardName.filter(str1 => 
                countryBorderCodes.some(str2 => str1.alpha3Code.includes(str2))
            );
        

            console.log(buttons);
            SwicthPages(countryDetails, countryBorderNames);  
        }
    ));
}

//SWITCH PAGES TOO
async function SwicthPages(data, borders) {
    const body = selector("body");
    const container = selector(".container");
    const temp = await Data();

    body.innerHTML = DetailsOfCountry(data[0], borders);

    const backButton = selector(".back-to-home");
    backButton.addEventListener("click", BackToHome);
    
    loadElements();
    
    if(toggleThemeIsOn)
        toggleTheme();
}

async function BackToHome() {
    selector("body").innerHTML = HomePage();
    ShowAll();
    loadElements();
    toggleTheme();
}

function loadElements() {
    const elements = [
        "input",
        ".select-button",
        ".region",
        ".change-theme"
    ];

    elements.forEach(el => {
        if(selector(el))
        {
            switch (el) {
                case "input":
                    selector(el).addEventListener("keyup", FilterByCountrie);
                    break;
            
                case ".select-button":
                    selector(el).addEventListener("click", Toggle);
                    break;
    
                case ".region":
                    document.querySelectorAll(".region").forEach(element => element.addEventListener("click", Region));
                    
                    break;
    
                case ".change-theme":
                    selector(el).addEventListener("click", () => {
                        toggleThemeIsOn = !toggleThemeIsOn;
                        if(toggleThemeIsOn) 
                            toggleTheme();
                        else
                            toggleTheme();
                    });
                    break;
            }
        }
    });
}

async function ShowAll() {
    const countries = await Data();
    RemoveAndAddCard(countries);    
}

ShowAll();
/*
licoes aprendidas com esse projeto

-estudar mais sobre funcoes, principalmente sobre seus escopos
-aprendi a utilizar metodos de array para deixar codigo mais legivel
-aprendi sobre redundancia de codigo, isso inclui redundancia de logica e de syntax
-


falta fazer 

-toggle theme da pagina de detalhes ok
-juntar os filtros do input e do selec button para gerar um resultado em comum 3
-fazer os paises que fazem fronteira aparecerem no border countries 1 



bug do tema: ao trocar de tema, quando o elementos sao renderizados
novamente com as informacoes atualizadas, os tema nao e adcionado 
a tais elementos, isso quando o tema light esta ativado


1-pegar os dados dos paises bordas
2-passar por todo os array comparando os paises das bordas com o alphacode3 de todos o paises
3-filtra paises e retornar o nome que corresponder os dados do pais orderm

*/ 