let containerGridHome = document.querySelector(".container-grid-home");

let categoriesChecks = document.querySelector("#categories-checks");

let checkboxs = document.querySelectorAll("input[type=checkbox]:checked");

let inputFilter = document.querySelector(".input-filter");

// ---------------------------- fetch data ----------------------------------

let dataGlob = {}; // objeto global donde se guarda toda la data de la api

const dataUrl = "https://mindhub-xj03.onrender.com/api/amazing";

const fetchData = async () => {
  await fetch(dataUrl)
    .then((response) => response.json())
    .then((results) => {
      dataGlob = results;
      cardsHome("");

      let categories = extractCategories(dataGlob.events);
      checks(categories);
    })
    .catch((error) => console.log(error));
};

// ------------------------- checkbox function -----------------------

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
        value=""
        id="checkbox-entertainment"
        />
        <label class="form-check-label" for="checkbox-entertainment">
        ${categories[i]}
        </label>`;
    categoriesChecks.appendChild(formCheck);
  }
};

// -------------------------------- filter function ----------------------------

inputFilter.addEventListener("keyup", () => {
  cardsHome(inputFilter.value.toLowerCase());
});

const cardsHome = (filtro) => {
  let events = [];

  if (filtro.length === 0) {
    events = dataGlob.events;
  } else {
    events = dataGlob.events.filter((item) =>
      item.name.toLowerCase().includes(filtro)
    );
    console.log(events);
  }

  // -------------------------------- Cards Home ------------------------------

  containerGridHome.innerHTML = "";

  for (let i = 0; i < events.length; i++) {
    let cardContainer = document.createElement("div");

    cardContainer.className = "col";
    let card = document.createElement("div");
    card.className = "card w-100";
    card.innerHTML = `<img
    src=${events[i].image}
    class="image-card card-img-top"
    alt="imagen de concierto de musica"
    />
    <div class="card-body">
    <h5 class="card-title text-center">${events[i].name}</h5>
    <div class="d-flex justify-content-between align-items-center my-2">
    <span class="badge rounded-pill text-bg-danger p-2">${events[i].category}</span>
    <span class="badge rounded-pill text-bg-secondary p-2">${events[i].date}</span>
    </div>
    <p class="card-text text-center">
    ${events[i].description}
    </p>
    <div class="d-flex justify-content-between align-items-center">
    <span class="text-dark fw-bold">Price: ${events[i].price}</span>
      <a href="#" class="btn btn-success">Details</a>
    </div>`;

    containerGridHome.appendChild(cardContainer);
    cardContainer.appendChild(card);
  }
};

// --------------------------------------------------------------------------

fetchData();
