import { selectAll } from "../utils/selector.js";
import selector from "../utils/selector.js";
import DetailsOfCountry from "../components/DetailsOfCountry.js";
import Data from "../utils/data.js";

const info = await Data();

export default function HomePage() {
  return {
    onMount() {
      selector("body").innerHTML = `
    <div class="container">
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
        <section class="search-box">
            <div class="search-countries">
                <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#f0f2f3"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                </span>
                <input type="text" placeholder="Search for a country">
            </div>
            <div class="search-by-region">
                <div class="select-button">
                    <p>Filter by Region</p>
                    <span class="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            >
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </span>
                    <!-- <div class="option">option</div> -->
                </div>
                <div class="region-options none">
                    <p class="region">Africa</p>
                    <p class="region">Americas</p>
                    <p class="region">Asia</p>
                    <p class="region">Europe</p>
                    <p class="region">Oceania</p>
                </div>
            </div>
        </section>
        <section class="countries-flags">
            ${Array(250)
              .fill()
              .map(
                (_, i) =>
                  `<div class="countrie-box ${info[i].name}">
                        <div class="box">
                        <div class="flag">
                    <img src="${info[i].flags.png}" alt="" srcset="">
                </div>
                <div class="info">
                    <p class="title">${info[i].name}</p>
                    <div class="add-info">
                        <p>Population: <span class="pop-info">${info[i].population}</span></p>
                        <p>Region: <span class="region-info">${info[i].region}</span></p>
                        <p>Capital: <span class="cap-info">${info[i].capital}</span></p>
                    </div>
                </div>
            </div>   
        </div>
        `
              )
              .join("")}
        </section>
    </main>
</div>
    `;
              
      this.getMoreInfo();
      this.filterByRegion();
      this.onKeyPress();
      this.switchMode();
      return this;
    },

    getMoreInfo() {
      selectAll(".countrie-box").forEach((element, i) =>
        element.addEventListener("click", () => {
          let nameCountry = info.filter((str) =>
            str.name.includes(element.className.split(" ")[1])
          );
          let borderCountry = nameCountry[0]?.borders;
          const names = info?.filter?.((el) =>
            borderCountry?.some?.((x) => x.includes?.(el.alpha3Code))
          );
          DetailsOfCountry?.(nameCountry[0], names)?.onMount()?.onClick();
        })
      );
      return this;
    },

    filterByRegion() {
      selector(".select-button").addEventListener("click", (e) => {
        selector(".region-options").classList.toggle("none");
        selectAll(".region").forEach((el) => {
          el.addEventListener("click", () => {
            const countriesFiltered = info.filter(
              (country) => country.region === el.textContent
            );

            this.card(countriesFiltered);
            this.getMoreInfo();
          });
        });
      });
      return this;
    },

    onKeyPress() {
      selector("body").addEventListener("keyup", (e) => {
        let inputValue = selector("input")?.value?.trim()?.toLowerCase();
        let countries = info.filter((country) =>
          country.name.toLowerCase().includes(inputValue)
        );
        this.card(countries);
        this.getMoreInfo();
      });
      return this;
    },

    switchMode() {
      selector(".change-theme").addEventListener("click", () => {
        //
      });
    },

    card(countries) {
      selector(".countries-flags").innerHTML = countries
          ?.map(
            (_, i) =>
              `<div class="countrie-box ${_.name}">
                        <div class="box">
                        <div class="flag">
                    <img src="${_.flags.png}" alt="" srcset="">
                </div>
                <div class="info">
                    <p class="title">${_.name}</p>
                    <div class="add-info">
                        <p>Population: <span class="pop-info">${_.population}</span></p>
                        <p>Region: <span class="region-info">${_.region}</span></p>
                        <p>Capital: <span class="cap-info">${_.capital}</span></p>
                    </div>
                </div>
            </div>   
        </div>
        `
          )
          .join("");
    }
  };
}
