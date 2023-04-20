// ------------------------ DOM ------------------------------

let containerTables = document.querySelector("#container-tables");

// -------------------------- Fetch Data ----------------------------

const dataUrl = "https://mindhub-xj03.onrender.com/api/amazing";

const fetchDataTables = async () => {
  let result = await fetch(dataUrl)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
  return result;
};

let dataTables = await fetchDataTables(); // toda la data global

// -------- filter con todos los eventos con fechas pasadas al currentDate -----------

const pastData = dataTables.events.filter(
  (event) => event.date <= dataTables.currentDate
);

// -------- filter con todos los eventos con fechas futuras al currentDate -----------

const upcomingData = dataTables.events.filter(
  (event) => event.date > dataTables.currentDate
);

// ---------- arreglo con las categorias de eventos pasados ----------

let categoriesPastEvents = Array.from(
  new Set(pastData.map((item) => item.category))
);
// console.log(categoriesPastEvents);

// ---------- arreglo con las categorias de eventos futuros ----------

let categoriesUpcomingEvents = Array.from(
  new Set(upcomingData.map((item) => item.category))
);
// console.log(categoriesUpcomingEvents);

// ------------------- Calculo mayor porcentaje asistencia -----------------------------

function calcularMayor(eventos) {
  let acumulador = 0;
  let title = "";
  eventos.forEach((evento) => {
    let numero = (evento.assistance / evento.capacity) * 100;

    if (numero > acumulador) {
      acumulador = numero;
      title = evento.name;
    }
  });

  return `El mayor es ${title} con ${acumulador.toFixed(2)}% de asistencia`;
}

// ------------------- Calculo Menor porcentaje de asistencia ----------------------

function calcularMenor(eventos) {
  let acumulador = 100;
  let title = "";
  eventos.forEach((evento) => {
    let numero = (evento.assistance / evento.capacity) * 100;

    if (numero < acumulador) {
      acumulador = numero;
      title = evento.name;
    }
  });

  return `El menor es ${title} con ${acumulador}% de asistencia`;
}

// ------------------- Calculo mayor Capacidad de personas -----------------------------

function mayorCapacidad(eventos) {
  let acumulador = 0;
  let title = "";
  eventos.forEach((evento) => {
    if (evento.capacity > acumulador) {
      acumulador = evento.capacity;
      title = evento.name;
    }
  });

  return `El mayor es ${title} con ${acumulador}% de asistencia`;
}

// -------------- ingresos y concurrencia por categorias de eventos pasados ----------

function infoPastEventsBycategories(categories, events) {
  let result = [];
  categories.forEach((category) => {
    let catEvents = events.filter((event) => category == event.category);
    let revenues = catEvents.reduce(
      (acum, event) =>
        acum + event.price * (event.estimate || event.assistance),
      0
    );
    let attendance = catEvents.reduce(
      (acum, event) =>
        acum + ((event.assistance || event.estimate) / event.capacity) * 100,
      0
    );
    result.push({
      category,
      revenues,
      attendance: attendance / catEvents.length,
    });
  });
  return result;
}

const infoPastEventsByCats = infoPastEventsBycategories(
  categoriesPastEvents,
  pastData
);
console.log(infoPastEventsByCats);

// -------------- ingresos y concurrencia por categorias de eventos futuros ----------

function infoUpcomingEventsBycategories(categories, events) {
  let result = [];
  categories.forEach((category) => {
    let catEvents = events.filter((event) => category == event.category);
    let revenues = catEvents.reduce(
      (acum, event) =>
        acum + event.price * (event.estimate || event.assistance),
      0
    );
    let attendance = catEvents.reduce(
      (acum, event) =>
        acum + ((event.assistance || event.estimate) / event.capacity) * 100,
      0
    );
    result.push({
      category,
      revenues,
      attendance: attendance / catEvents.length,
    });
  });
  return result;
}

const infoUpcomingEventsByCats = infoUpcomingEventsBycategories(
  categoriesUpcomingEvents,
  upcomingData
);

console.log(infoUpcomingEventsByCats);

// ----------------------- table events stats -----------------------

let table = document.createElement("table");
table.className =
  "table caption-top table-secondary table-bordered border-success";
table.innerHTML = `<caption class="text-dark fw-bold">
  Events statistics
</caption>

<thead>
  <tr>
    <th>event with the highest percentage of attendance</th>
    <th>Events with the lowest percentage of attendance</th>
    <th>Event with larger capacity</th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>${calcularMayor(pastData)}</td>
    <td>${calcularMenor(pastData)}</td>
    <td>${mayorCapacidad(pastData)}</td>
  </tr>
</tbody>`;

// ------------------------- table past events stats ---------------------------

let tablePast = document.createElement("table");
let tbodyTablePast = document.createElement("tbody");
tablePast.className =
  "table caption-top table-secondary table-bordered border-success";
tablePast.innerHTML = `<caption class="text-dark fw-bold">
  Upcoming events statistics
</caption>

<thead>
  <tr>
    <th>Categories</th>
    <th>Revenues</th>
    <th>Attendance</th>
  </tr>
</thead>`;
for (const event of infoPastEventsByCats) {
  let tr = document.createElement("tr");
  tr.innerHTML = `<td>${event.category}</td>
    <td>${event.revenues.toLocaleString("en", {
      style: "currency",
      currency: "USD",
    })}</td>
    <td>${event.attendance.toFixed(2)} %</td>`;
  tbodyTablePast.appendChild(tr);
}
tablePast.appendChild(tbodyTablePast);

// ------------------------ table upcoming events stats --------------------------

let tableUpcoming = document.createElement("table");
let tbodyTableUpcoming = document.createElement("tbody");
tableUpcoming.className =
  "table caption-top table-secondary table-bordered border-success";
tableUpcoming.innerHTML = `<caption class="text-dark fw-bold">
  Upcoming events statistics
</caption>

<thead>
  <tr>
    <th>Categories</th>
    <th>Revenues</th>
    <th>Attendance</th>
  </tr>
</thead>`;

for (const event of infoUpcomingEventsByCats) {
  let tr = document.createElement("tr");
  tr.innerHTML = `<td>${event.category}</td>
      <td>${event.revenues.toLocaleString("en", {
        style: "currency",
        currency: "USD",
      })}</td>
      <td>${event.attendance.toFixed(2)} %</td>`;
  tbodyTableUpcoming.appendChild(tr);
}
tableUpcoming.appendChild(tbodyTableUpcoming);

containerTables.append(table, tablePast, tableUpcoming);

// ---------------------------------------------------------------------------
