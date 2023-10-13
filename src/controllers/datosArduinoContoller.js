// Variables
const tbody = document.querySelector("tbody");
const prevBtn = document.querySelector("#prevButton");
const nextBtn = document.querySelector("#nextButton");
const divImg = document.querySelector(".div-img");
const btnFlujo = document.querySelector("#flujo");
const btnEstado = document.querySelector("#estado");
let currentPage = 1;

// EventListeners
document.addEventListener("DOMContentLoaded", () => {
  eventListeners();
  mostrarDatos();
  mapear();
});

function eventListeners() {
  prevBtn.disabled = true;
  //paginado
  //pagina anterior
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      getRegistros(currentPage);
      prevBtn.disabled = false;
      console.log(currentPage);
    }
    if (currentPage <= 1) {
      prevBtn.disabled = true;
    }
  });

  //pagina siguiente
  nextBtn.addEventListener("click", () => {
    currentPage++;
    getRegistros(currentPage);
    prevBtn.disabled = false;
    console.log(currentPage);
  });
}

// Funciones
// Consume la API y mapea el JSON
//GET REGISTROS
function getRegistros(page) {
  return fetch(`http://localhost/ard/getRegistros.php?page=${page}`)
    .then((response) => response.json())
    .catch((er) => console.log(er));
}

//GET ULTIMO REGISTRO
function getUltimoRegistro() {
  return fetch("http://localhost/ard/getUltimoRegistro.php")
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return console.log(err);
    });
}

// Crea el tr para el body y pintar los datos de la api
function crearTrBody(objInfo) {
  const {
    bombaAgua,
    estadoError,
    estadoSensor,
    estadoSistema,
    fechaRegistro,
    flujoAgua,
    idRegistro,
    nivelAgua,
    numeroSerie,
  } = objInfo;
  const tr = document.createElement("TR");
  tr.innerHTML = `
    <th>${idRegistro}</th>
    <th>${numeroSerie}</th>
    <th>${fechaRegistro}</th>
    <th>${nivelAgua}</th>
    <th>${flujoAgua}</th>
    <th>${bombaAgua}</th>
    <th>${estadoError}</th>
    <th>${estadoSensor}</th>
    <th>${estadoSistema}</th>
  `;
  return tr;
}

// Función para mapear datos y realizar chequeos periódicos
function mapear() {
  function realizarChequeo() {
    getRegistros(currentPage).then((data) => {
      // Borra el contenido actual de tbody
      tbody.innerHTML = "";

      // Mapea y agrega los nuevos datos a tbody
      data.forEach((dt) => {
        const trBody = crearTrBody(dt);
        tbody.appendChild(trBody);
      });

      // Espera un tiempo y realiza un nuevo chequeo
      setTimeout(realizarChequeo, 5000);
    });
  }

  realizarChequeo();
}

//muestra datos del ultimo registro(estado actual de la bomba) con chequeos periodicos
function mostrarDatos() {
  function realizarChequeo() {
    getUltimoRegistro().then((data) => {
      //limpiar datos
      while (divImg.firstChild) {
        divImg.removeChild(divImg.firstChild);
      }
      //recorrer el arreglo para obtener los datos
      data.forEach((dato) => {
        //  console.log(dato);
        const div = document.createElement("DIV");

        switch (dato.estadoSensor) {
          case "00000000":
            div.innerHTML = `
            <h2>Estado actual</h2>
              <p>Fecha ${dato.fechaRegistro}</p>
              <img src="../assets/images/00000000.png" alt="" />
            `;
            divImg.appendChild(div);
            break;
          case "00000001":
            div.innerHTML = `
            <h2>Estado actual</h2>
                <p>Fecha ${dato.fechaRegistro}</p>
                <img src="../assets/images/00000001.png" alt="" />
              `;
            divImg.appendChild(div);
            break;
          case "00000011":
            div.innerHTML = `
            <h2>Estado actual</h2>
              <p>Fecha ${dato.fechaRegistro}</p>
              <img src="../assets/images/00000011.png" alt="" />
            `;
            divImg.appendChild(div);
            break;
          case "00000111":
            div.innerHTML = `
            <h2>Estado actual</h2>
              <p>Fecha ${dato.fechaRegistro}</p>
              <img src="../assets/images/00000111.png" alt="" />
            `;
            divImg.appendChild(div);
            break;
          case "00001111":
            div.innerHTML = `
            <h2>Estado actual</h2>
              <p>Fecha ${dato.fechaRegistro}</p>
              <img src="../assets/images/00001111.png" alt="" />
            `;
            divImg.appendChild(div);
            break;
          case "00011111":
            div.innerHTML = `
            <h2>Estado actual</h2>
              <p>Fecha ${dato.fechaRegistro}</p>
              <img src="../assets/images/00011111.png" alt="" />
            `;
            divImg.appendChild(div);
            break;
          case "00111111":
            div.innerHTML = `
            <h2>Estado actual</h2>
              <p>Fecha ${dato.fechaRegistro}</p>
              <img src="../assets/images/00111111.png" alt="" />
            `;
            divImg.appendChild(div);
            break;
          case "01111111":
            div.innerHTML = `
            <h2>Estado actual</h2>
              <p>Fecha ${dato.fechaRegistro}</p>
              <img src="../assets/images/01111111.png" alt="" />
            `;
            divImg.appendChild(div);
            break;
          case "11111111":
            div.innerHTML = `
            <h2>Estado actual</h2>
              <p>Fecha ${dato.fechaRegistro}</p>
              <img src="../assets/images/11111111.png" alt="" />
            `;
            divImg.appendChild(div);
            break;
          default:
            break;
        }

        if(dato.flujoAgua !== "No Detectado"  ){
          btnFlujo.innerHTML = `<img src="../assets/images/conFlujo.png" alt="">`
        }else{
          btnFlujo.innerHTML = `<img src="../assets/images/sinFlujo.png" alt="">`
        }

        if(dato.bombaAgua !== "Apagada"  ){
          btnEstado.innerHTML = `<img src="../assets/images/bombaEncendida.png" alt="">`
        }else{
          btnEstado.innerHTML = `<img src="../assets/images/bombaApagada.png" alt="">`
        }
      });
      setTimeout(realizarChequeo, 5000);
    });
  }

  realizarChequeo();
}
