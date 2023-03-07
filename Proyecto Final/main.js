const dataKey = 'canciones';

class Cancion {
    constructor(info) {
        this.nombre = info.nombre;
        this.duracion = info.duracion;
        this.artista = info.artista;
    }

    getInfoCompleta() {
        return `${info.nombre} - ${info.artista} ${info.duracion}min`;
    }
}

function showInfo(cancion) {

}

const deafulSongs = [
    { nombre: "Separate Ways", duracion: 3, artista: "Journey" },
    { nombre: "I Have Nothing", duracion: 4, artista: "Whitney Houston" },
    { nombre: "I will survive", duracion: 5, artista: "Gloria Gaynor" }
];
let currentSongs = [];

function init() {
    if (!localStorage.getItem(dataKey)) {
        localStorage.setItem(dataKey, JSON.stringify(deafulSongs));
        currentSongs = deafulSongs;
    } else {
        currentSongs = JSON.parse(localStorage.getItem(dataKey));
    }
    renderCanciones();
}

function guardarCanciones() {
    localStorage.setItem(dataKey, JSON.stringify(currentSongs));
}

function renderCanciones() {
    const cancionesContainer = document.getElementById('cancionero')
    const rowsCanciones = currentSongs.map(cs => (
        `<div class="cancion">
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

    cancionesContainer.innerHTML = rowsCanciones.join('');
}



const opciones = ["escuchar", "subir", "promedio"];
//Array de objetos
// let canciones = [new Cancion({ nombre: "Separate Ways", duracion: 3, artista: "Journey" }), new Cancion({ nombre: "I Have Nothing", duracion: 4, artista: "Whitney Houston" }), new Cancion({ nombre: "I will survive", duracion: 5, artista: "Gloria Gaynor" })];

function validarOpcion() {
    while (!opciones.includes(opcion.toLowerCase()) && opcion.toLowerCase() != "esc") {
        opcion = prompt("Elija una opción válida: Escuchar, Subir, Promedio o Esc para salir");
    }
}

function numeroEntero(numero) {
    if (isNaN(parseInt(numero))) {
        alert("Opción inválida.");
        return false;
    }
    return true;
}

function cancionValida(cancion) {
    if (!numeroEntero(cancion)) {
        return false;
    }
    else if (canciones.length < cancion || cancion == 0) {
        alert("Opción inválida.");
        return false;
    }
    return true;
}

function mostrarCanciones() {
    //for (let cancion in canciones) {
    //    console.log((parseInt(cancion)+1) + "- " + canciones[cancion].getInfoCompleta());
    //}
    canciones.forEach(cancion => {
        console.log((canciones.indexOf(cancion) + 1) + "- " + cancion.getInfoCompleta());
    })
}

function escucharCancion() {
    mostrarCanciones();
    do { cancionEscuchar = prompt("Elegi el n° de la canción que querés escuchar: "); }
    while (!cancionValida(cancionEscuchar));
    alert("Estás escuchando la canción " + canciones[cancionEscuchar - 1].getInfoCompleta());
}

function subirCancion() {
    nuevaCancionInterprete = prompt("Ingresa el nombre del intérprete de la canción que vas a subir: ");
    nuevaCancionNombre = prompt("Ingresa el nombre de la canción que vas a subir: ");
    do { nuevaCancionDuracion = prompt("Ingresa la duración de la canción que vas a subir: "); }
    while (!numeroEntero(nuevaCancionDuracion));
    canciones.push(new Cancion({ nombre: nuevaCancionNombre, artista: nuevaCancionInterprete, duracion: nuevaCancionDuracion }));
    mostrarCanciones();
    alert("Así quedó tu lista de canciones.");
}

const division = (a, b) => a / b;

// opcion.toLowerCase()
// validarOpcion();
// while (opcion.toLowerCase() != "esc") {
//     console.clear();
//     switch (opcion.toLowerCase()) {
//         case "escuchar": {
//             escucharCancion();
//             break;
//         }
//         case "subir": {
//             subirCancion();
//             break;
//         }
//         case "promedio": {
//             let suma = canciones.reduce((total, cancion) => total + parseFloat(cancion.duracion), 0);
//             //for(let cancion in canciones){
//             //    suma += parseFloat(canciones[cancion].duracion);
//             //};
//             //let promedio = suma / canciones.length;
//             alert("El promedio de la duración de las canciones es de " + division(suma, canciones.length) + ".");
//             break;
//         }
//         case "esc": {
//             break;
//         }
//     }
//     opcion = prompt("Ingrese una opción: Escuchar, Subir, Promedio o Esc para salir");
//     validarOpcion();
// }

function activarForm() {
    document.getElementById('form').className = 'formulario active';
}

function cerrarForm() {
    document.getElementById('form').className = 'formulario';
}

function guardarCancion(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    currentSongs.push({
        nombre: event.target.children[0].value, duracion: event.target.children[2].value, artista: event.target.children[1].value
    });
    guardarCanciones();
    renderCanciones();
}

function validarTiempo(event) {
    dato = event.target.value;
    if (dato > 60) {
        alert('QUE HACES CAPO?');
        event.target.value = 60;
    }
}

init();