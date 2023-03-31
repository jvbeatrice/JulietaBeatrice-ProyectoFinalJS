const dataKey = 'canciones';
let hiddenForm = 0;
let idCancionSeleccionada;
let ids;

const defaultSongs = [
    { id: 1, nombre: "Separate Ways", duracion: 3, artista: "Journey" },
    { id: 2, nombre: "I Have Nothing", duracion: 4, artista: "Whitney Houston" },
    { id: 3, nombre: "I will survive", duracion: 5, artista: "Gloria Gaynor" }
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
    const cancionesContainer = document.getElementById('cancionero');
    let rowsCanciones;
    if(currentSongs.length != 0){
    rowsCanciones = currentSongs.map(cs => (
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
    ));
    ids = currentSongs.map((cancion) => cancion.id);
    cancionesContainer.innerHTML = rowsCanciones.join('');
        } else{
            rowsCanciones = [`<div class="cancion">

            <div class="info-cancion">
              <span>Cancion y Artista</span>
            </div>
      
            <div class="duracion">
              <span>Duracion</span>
            </div>
      
          </div>
          
          
          
          
          `];
          ids = [0];
        }
        cancionesContainer.innerHTML = rowsCanciones.join('');
}

function nuevaCancionForm() {
    if(hiddenForm == 0){
        document.getElementById('form').className = 'formulario active';
        hiddenForm = 1;
    }
    else{
        document.getElementById('form').className = 'formulario';
        hiddenForm = 0;
    }
}

function guardarCancion(event) {
    event.preventDefault();
    let newId = Math.max(...ids)+1;
    const data = new FormData(event.target);
    currentSongs.push({
        id: newId, nombre: event.target.children[0].value, duracion: event.target.children[2].value, artista: event.target.children[1].value,
    });
    guardarCanciones();
    renderCanciones();
}

function validarTiempo(event) {
    dato = event.target.value;
    if (dato > 60) {
        alert('El tiempo no puede superar 60 ');
        event.target.value = 60;
    }
}

function menuOpcionesCancion(id) {
    clearSeleccionPanelesCanciones(id);
    let panelSeleccionado = document.getElementById("song-"+id);
    if(panelSeleccionado.classList.contains('cancionSeleccionada')){
        panelSeleccionado.className = 'cancion';
        idCancionSeleccionada = null;
        ocultarReproductor();
    }
    else{
        panelSeleccionado.className = 'cancion cancionSeleccionada';
        idCancionSeleccionada = id;
        mostrarReproductor();
    }
};

function clearSeleccionPanelesCanciones(id){
    currentSongs.forEach(song => {
        id!=song.id?document.getElementById("song-"+song.id).className = 'cancion':"";
    });
}

function mostrarReproductor(){
    document.getElementById('reproductor').className = 'show';
}

function ocultarReproductor(){
    document.getElementById('reproductor').className = 'hidden';
}

function eliminarCancion(){//Sigo trabajando en esto, no logro borrar correctamente el objeto
    for(song = 0; song < currentSongs.length; song++){
        if(currentSongs[song].id==idCancionSeleccionada){
            currentSongs.splice(song,1);
            break;
        }
        ocultarReproductor();
    };
    guardarCanciones();
    renderCanciones();
}

function editarCancion(){

}

function reproducirCancion (){

}

init();