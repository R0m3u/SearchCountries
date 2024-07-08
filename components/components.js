export function DetailsOfCountry(details, borderNames) {
    return `
    <header>
            <p class="title">Where in the world?</p>
            <div class="change-theme">
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="#f0f2f3"><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg>
                </span>
                <span>Dark Mode</span>
            </div>
        </header>
    <main>
            <div class="countrie-page">
                <section class="back-to-home">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
                    </span>
                    <span>
                        Back
                    </span>
                </section>
                <section class="countrie-information">
                    <div class="flag">
                        <img src="${details.flag}" alt="">
                    </div>
                    <div class="informations">
                        <p class="title">${details.name}</p>
                        <div class="information-container">
                            <div>
                                <p class="info-page">Native Name: 
                                    <span>${details.nativeName}</span>
                                </p>
                                <p class="info-page">Population: 
                                    <span>${details.population}</span>
                                </p>
                                <p class="info-page">Region: 
                                    <span>${details.region}</span>
                                </p>
                                <p class="info-page">Sub Region: 
                                    <span>${details.subregion}</span>
                                </p>
                                <p class="info-page">Capital: 
                                    <span>${details.capital}</span>
                                </p>
                            </div>
                            <div>
                                <p class="info-page">Top Level Domain: 
                                    <span>${details.topLevelDomain.toString()}</span>
                                </p>
                                <p class="info-page">Currencies:
                                    <span>${details.currencies[0].name}</span>
                                </p>
                                <p class="info-page">Languages: 
                                    <span>${details.languages.map(language => language.name).join(", ")}</span>
                                </p>
                            </div>
                        </div>
                        <div class="countries-aside">
                            <span>Border Countries: </span>
                            ${borderNames.map(item => `<button class="border-details">${item.name}</button>`).join("")}      
                        </div>
                    </div>
                </section>
            </div>
        </main>
    `
}