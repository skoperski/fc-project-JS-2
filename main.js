"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const qs = (selector) => document.querySelector(selector);

  const inputDOM = qs("#sectionInput");
  const selectDOM = qs("#sectionSelect");
  const btnDOM = qs("#sectionBtn");
  const spanDOM = qs("#sectionSpan");
  const sectionDOM = qs("#section");

  btnDOM.addEventListener("click", () => {
    const loaderDOM = document.createElement("div");
    loaderDOM.id = "loader";
    loaderDOM.classList.add("loader");
    sectionDOM.appendChild(loaderDOM);
    axios
      .get("https://api.nbp.pl/api/exchangerates/tables/a/?format=json")
      .then((response) => {
        loaderDOM.classList.add("hide-loader");
        const currency = response.data[0].rates.filter((el) => {
          return el.code === selectDOM.value;
        });
        const calcResult = (currency[0].mid * inputDOM.value).toFixed(2);
        spanDOM.innerText = calcResult + " PLN";
      })
      .catch((err) => {
        console.error(err);
      });
  });
});
