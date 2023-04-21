// ---------------------- imports -----------------------------

import { displayCards, displayMessage } from "./js/functions.js";

// ------------------------ DOM -----------------------------

let containerGridHome = document.querySelector(".container-grid-home");

let categoriesChecks = document.querySelector("#categories-checks");

let inputFilter = document.querySelector(".input-filter");

let containerMessage = document.querySelector("#container-message");

// ---------------------------- fetch data ----------------------------------

let dataGlob = {}; // objeto global donde se guarda toda la data de la api

const dataUrl = "https://mindhub-xj03.onrender.com/api/amazing";

const fetchData = async () => {
  await fetch(dataUrl)
    .then((response) => response.json())
    .then((data) => {
      dataGlob = data;
      displayCards(dataGlob.events, containerGridHome);

      let categories = extractCategories(dataGlob.events);
      checks(categories);
    })
    .catch((error) => console.log(error));
};

// -------------------- función que maneja los input checkbox --------------------

const extractCategories = (events) => {
  let categories = Array.from(new Set(events.map((item) => item.category)));

  return categories;
};

const checks = (categories) => {
  for (let i = 0; i < categories.length; i++) {
    let formCheck = document.createElement("div");
    formCheck.className = "form-check";
    formCheck.innerHTML = `<input
        class="checkbox-category form-check-input"
        type="checkbox"
        value=${categories[i]}
        id="checkbox-entertainment"
        />
        <label class="form-check-label" for="checkbox-entertainment">
        ${categories[i]}
        </label>`;

    formCheck.addEventListener("change", () => {
      let checkboxs = document.querySelectorAll("input[type=checkbox]:checked");

      let checkedCategories = Array.from(checkboxs).map(
        (checkbox) => checkbox.value
      );

      dobleFilter(checkedCategories);
    });
    categoriesChecks.appendChild(formCheck);
  }
};

// ---- función que hace el doble filtro para filtrar por categoria y por titulo ----

const dobleFilter = (checkedCategories) => {
  let eventosFiltroInput = dataGlob.events.filter((event) =>
    event.name.toLowerCase().includes(inputFilter.value.toLowerCase())
  );

  let eventosFiltradrosCategories = eventosFiltroInput.filter((event) =>
    checkedCategories.includes(event.category)
  );

  if (!eventosFiltroInput.length) {
    // console.log("no hay resultados");
    displayMessage(containerMessage);
  }

  if (checkedCategories.length === 0) {
    displayCards(eventosFiltroInput, containerGridHome);
  } else {
    displayCards(eventosFiltradrosCategories, containerGridHome);
  }

  // console.log(eventosFiltradros);
};

// ------------- función para filtrar por el titulo del evento -------------

inputFilter.addEventListener("keyup", () => {
  let checkboxs = document.querySelectorAll("input[type=checkbox]:checked");

  let checkedCategories = Array.from(checkboxs).map(
    (checkbox) => checkbox.value
  );

  dobleFilter(checkedCategories);
});

// -----------------------------------------------------------------------------

fetchData();
