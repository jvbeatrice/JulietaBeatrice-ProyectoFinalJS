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
    ocultar("reproductor");
    ocultar("form");
    clearSeleccionPanelesCanciones();
    document.getElementById("accion").textContent = "Agregar";
    mostrar("form");
    hiddenForm = 1;
  } else {
    ocultar("form");
    hiddenForm = 0;
  }
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
    ocultar("reproductor");
    ocultar("form");
  } else {
    panelSeleccionado.className = "cancion cancionSeleccionada";
    idCancionSeleccionada = id;
    hiddenForm = hiddenForm == 1 || hiddenForm == 2 ? 2 : 0;
    mostrar("reproductor");
    updatePlaceholder();
    document.getElementById("accion").textContent = "Editar";
  }
}

function clearSeleccionPanelesCanciones(id) {
  currentSongs.forEach((song) => {
    id != song.id
      ? (document.getElementById("song-" + song.id).className = "cancion")
      : "";
  });
}

function eliminarCancion() {
  let posCancion = obtenerPosicionCancion(idCancionSeleccionada);
  currentSongs.splice(posCancion, 1);
  ocultar("reproductor");
  ocultar("form");
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
    updatePlaceholder();
    document.getElementById("accion").textContent = "Editar";
    mostrar("form");
    hiddenForm = 2;
  } else {
    ocultar("form");
    hiddenForm = 0;
  }
}

function actualizarCancion(event) {
  //editar cancion
  const data = new FormData(event.target);
  let posCancion = obtenerPosicionCancion(idCancionSeleccionada);
  currentSongs[posCancion].nombre = event.target.children[0].value;
  currentSongs[posCancion].duracion = event.target.children[2].value;
  currentSongs[posCancion].artista = event.target.children[1].value;
  ocultar("form");
  ocultar("reproductor");
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

function mostrar(id) {
  document.getElementById(id).className = "show";
}

function ocultar(id) {
  document.getElementById(id).className = "hidden";
}

function reproducirCancion() {
  mostrar("player");
}

init();
