// --------------------- función que imprime las cards -------------------

export function displayCards(events, container) {
  container.innerHTML = "";

  for (let i = 0; i < events.length; i++) {
    let cardContainer = document.createElement("div");

    cardContainer.className = "col";
    let card = document.createElement("div");
    card.className = "principal-cards card h-100 w-100";
    card.innerHTML = `<img
      src=${events[i].image}
      class="image-card card-img-top"
      alt=${events.name}
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
      <span class="text-dark fw-bold">Price: $${events[i].price}</span>
        <a href="../pages/details.html?id=${events[i]._id}" class="btn btn-success">Details</a>
      </div>`;

    container.appendChild(cardContainer);
    cardContainer.appendChild(card);
  }
}

// ------------- función que imprime las card de details -------------

export function detailsCard(event, container) {
  let card = document.createElement("div");
  card.className = "card-details card border-success mb-3";
  card.innerHTML = `<div class="row g-0">
  <div class="col-12 col-md-6">
    <img
      src=${event.image}
      class="card-details-image img-fluid"
      alt=${event.name}
    />
  </div>

  <div class="col-12 col-md-6">
    <div class="card-body">
      <h5 class="card-title details-title">${event.name}</h5>

      <div class="d-flex justify-content-between align-items-center my-2">
      <span class="badge rounded-pill text-bg-danger p-2">${event.category}</span>
      <span class="badge rounded-pill text-bg-secondary p-2">${event.date}</span>
      </div>
      <p class="card-text details-paragraph">
        ${event.description}
      </p>
      <div class="d-flex flex-column justify-content-center align-items-center gap-3">
      <span class="badge rounded-pill text-bg-warning p-2">Place: ${event.place}</span>
      <span class="badge rounded-pill text-bg-success p-2">Price: ${event.price}</span>
      <span class="badge rounded-pill text-bg-info p-2">Capacity: ${event.capacity}</span>
      </div>
    </div>
  </div>
</div>`;

  container.appendChild(card);
}

// --------------- función que muestra mensaje de error al buscar filtros -------------

export function displayMessage(contenedor) {
  let message = document.createElement("h3");
  message.className = "text-dark text-center";
  message.innerText = "No se encontrarón resultados";
  contenedor.appendChild(message);
}
