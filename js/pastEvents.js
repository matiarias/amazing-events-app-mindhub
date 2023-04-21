// ---------------------- imports -----------------------------

import { displayCards } from "./functions.js";

// ------------------------ DOM -----------------------------

let containerGridPast = document.querySelector(".container-grid-past");

let categoriesChecksPast = document.querySelector("#categories-checks-past");

let inputFilter = document.querySelector(".input-filter");

// ---------------------------- fetch data ----------------------------------

const dataUrl = "https://mindhub-xj03.onrender.com/api/amazing";

const fetchData = async () => {
  let result = await fetch(dataUrl)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));

  return result;
};

// ------ utilizo esta constante para poder acceder a toda la data globalmente --------

const dataPast = await fetchData();

// ---------- función que filtra los eventos pasados al currentDate -----------

let dataPastEvents = dataPast.events.filter(
  (event) => event.date <= dataPast.currentDate
);

// ----------------- functión que pinta las cards ----------------

displayCards(dataPastEvents, containerGridPast);

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
    categoriesChecksPast.appendChild(formCheck);
  }
};

// ------- funcion que pinta los input checkboxs de categorias -----------------

let categories = extractCategories(dataPastEvents);
checks(categories);

// ---- función que hace el doble filtro para filtrar por categoria y por titulo ----

const dobleFilter = (checkedCategories) => {
  let eventosFiltroInput = dataPastEvents.filter((event) =>
    event.name.toLowerCase().includes(inputFilter.value.toLowerCase())
  );

  let eventosFiltradrosCategories = eventosFiltroInput.filter((event) =>
    checkedCategories.includes(event.category)
  );

  if (checkedCategories.length === 0) {
    displayCards(eventosFiltroInput, containerGridPast);
  } else {
    displayCards(eventosFiltradrosCategories, containerGridPast);
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
