let containerGridPast = document.querySelector(".container-grid-past");

const dataUrl = "https://mindhub-xj03.onrender.com/api/amazing";

fetch(dataUrl)
  .then((response) => response.json())
  .then((results) => {
    cardsPastEvents(results);
    // console.log(results);
  })
  .catch((error) => console.log(error));

//   -------------------------------------------------------------------

const cardsPastEvents = (data) => {
  const events = data.events;
  const currentDate = data.currentDate;

  //   console.log(currentDate);

  for (let i = 0; i < events.length; i++) {
    if (currentDate > events[i].date) {
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

      containerGridPast.appendChild(cardContainer);
      cardContainer.appendChild(card);
    }
  }
};