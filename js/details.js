// -------------------------- imports ------------------------------

import { detailsCard } from "./functions.js";

// ----------------------- DOM ----------------------------

let containerDetails = document.querySelector("#container-details");

// ---------------------------- fetch data details ----------------------------------

const dataUrl = "https://mindhub-xj03.onrender.com/api/amazing";

const fetchDataDetails = async () => {
  await fetch(dataUrl)
    .then((response) => response.json())
    .then((data) => {
      // ---- obtener la data a partir del id que llega mediante la URL ------
      let queryString = window.location.search;
      let param = new URLSearchParams(queryString);

      let eventId = param.get("id");
      let selectedEvent = data.events.find((event) => event._id == eventId);

      detailsCard(selectedEvent, containerDetails);
    })
    .catch((error) => console.log(error));
};

fetchDataDetails();
