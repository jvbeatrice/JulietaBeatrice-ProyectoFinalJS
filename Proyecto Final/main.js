const dataKey = "canciones";
let hiddenForm = 0;
let idCancionSeleccionada;
let ids;

const defaultSongs = [
  { id: 1, nombre: "Separate Ways", duracion: 3, artista: "Journey" },
  { id: 2, nombre: "I Have Nothing", duracion: 4, artista: "Whitney Houston" },
  { id: 3, nombre: "I will survive", duracion: 5, artista: "Gloria Gaynor" },
];
let currentSongs = [];

function init() {
  if (!localStorage.getItem(dataKey)) {
    localStorage.setItem(dataKey, JSON.stringify(defaultSongs));
    currentSongs = defaultSongs;
  } else {
    currentSongs = JSON.parse(localStorage.getItem(dataKey));
  }
  renderCanciones();
}

function guardarCanciones() {
  localStorage.setItem(dataKey, JSON.stringify(currentSongs));
}

function renderCanciones() {
  const cancionesContainer = document.getElementById("cancionero");
  let rowsCanciones;
  if (currentSongs.length != 0) {
    rowsCanciones = currentSongs.map(
      (cs) =>
        `<div id=song-${cs.id} class="cancion" onclick="menuOpcionesCancion(${cs.id})">
            <div class="info-cancion">
                <span>${cs.nombre}</span>
                <span>${cs.artista}</span>
            </div>
            <div class="duracion">
                <span>${cs.duracion}</span>
            </div>
        </div>
        `
    );
    ids = currentSongs.map((cancion) => cancion.id);
    cancionesContainer.innerHTML = rowsCanciones.join("");
  } else {
    rowsCanciones = [
      `<div class="cancion">

            <div class="info-cancion">
              <span>Cancion y Artista</span>
            </div>
      
            <div class="duracion">
              <span>Duracion</span>
            </div>
      
          </div>
          
          
          
          
          `,
    ];
    ids = [0];
  }
  cancionesContainer.innerHTML = rowsCanciones.join("");
}

function nuevaCancionForm() {
  if (hiddenForm == 0 || hiddenForm == 2) {
    document.getElementById("formCancion").placeholder = "Nombre de cancion";
    document.getElementById("formArtista").placeholder = "Artista";
    document.getElementById("formDuracion").placeholder = "Duracion(minutos)";
    ocultarReproductor();
    clearSeleccionPanelesCanciones();
    mostrarForm();
    hiddenForm = 1;
  } else {
    ocultarForm();
  }
}

function mostrarForm() {
  document.getElementById("form").className = "formulario active";
}

function ocultarForm() {
  document.getElementById("form").className = "formulario";
  hiddenForm = 0;
}

function guardarCancion(event) {
  //agregar cancion
  let newId = Math.max(...ids) + 1;
  const data = new FormData(event.target);
  currentSongs.push({
    id: newId,
    nombre: event.target.children[0].value,
    duracion: event.target.children[2].value,
    artista: event.target.children[1].value,
  });
  guardarCanciones();
  renderCanciones();
}

function validarTiempo(event) {
  dato = event.target.value;
  if (dato > 60) {
    alert("El tiempo no puede superar 60 ");
    event.target.value = 60;
  }
}

function menuOpcionesCancion(id) {
  clearSeleccionPanelesCanciones(id);
  let panelSeleccionado = document.getElementById("song-" + id);
  if (panelSeleccionado.classList.contains("cancionSeleccionada")) {
    panelSeleccionado.className = "cancion";
    idCancionSeleccionada = null;
    ocultarReproductor();
  } else {
    panelSeleccionado.className = "cancion cancionSeleccionada";
    idCancionSeleccionada = id;
    hiddenForm = hiddenForm == 1 ? 2 : 0;
    mostrarReproductor();
    updatePlaceholder();
  }
}

function clearSeleccionPanelesCanciones(id) {
  currentSongs.forEach((song) => {
    id != song.id
      ? (document.getElementById("song-" + song.id).className = "cancion")
      : "";
  });
}

function mostrarReproductor() {
  document.getElementById("reproductor").className = "show";
}

function ocultarReproductor() {
  document.getElementById("reproductor").className = "hidden";
  ocultarForm();
}

function eliminarCancion() {
  let posCancion = obtenerPosicionCancion(idCancionSeleccionada);
  currentSongs.splice(posCancion, 1);
  ocultarReproductor();
  guardarCanciones();
  renderCanciones();
}

function updatePlaceholder() {
  let posCancion = obtenerPosicionCancion(idCancionSeleccionada);
  document.getElementById("formCancion").placeholder =
    currentSongs[posCancion].nombre;
  document.getElementById("formArtista").placeholder =
    currentSongs[posCancion].artista;
  document.getElementById("formDuracion").placeholder =
    currentSongs[posCancion].duracion;
}

function editarCancion() {
  if (hiddenForm == 0 || hiddenForm == 1) {
    //cargar datos en form de cancion
    updatePlaceholder();
    mostrarForm();
    hiddenForm = 2;
  } else {
    ocultarForm();
  }
}

function actualizarCancion(event) {
  //editar cancion
  const data = new FormData(event.target);
  let posCancion = obtenerPosicionCancion(idCancionSeleccionada);
  currentSongs[posCancion].nombre = event.target.children[0].value;
  currentSongs[posCancion].duracion = event.target.children[2].value;
  currentSongs[posCancion].artista = event.target.children[1].value;
  ocultarForm();
  ocultarReproductor();
  guardarCanciones();
  renderCanciones();
}

function obtenerPosicionCancion(id) {
  for (song = 0; song < currentSongs.length; song++) {
    if (currentSongs[song].id == idCancionSeleccionada) {
      return song;
    }
  }
}

function modificarCanciones(event) {
  event.preventDefault();
  if (hiddenForm == 1) {
    guardarCancion(event);
  }
  if (hiddenForm == 2) {
    actualizarCancion(event);
  }
}

function reproducirCancion() {}

init();
