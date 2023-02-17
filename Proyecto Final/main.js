class Cancion{
    constructor(info){
        this.nombre = info.nombre;
        this.duracion = info.duracion;
        this.artista = info.artista;
        this.infoCompleta = info.nombre+" - "+info.artista+" "+info.duracion+"min"
    }
}

const opciones = ["escuchar", "subir", "promedio"];
//Array de objetos
let canciones = [new Cancion({nombre:"Separate Ways", duracion:3, artista:"Journey"}), new Cancion({nombre:"I Have Nothing", duracion:4, artista:"Whitney Houston"}), new Cancion({nombre:"I will survive", duracion:5, artista:"Gloria Gaynor"})];

//Comienzo de ejecucion
let opcion = prompt("Ingrese una opción: Escuchar, Subir, Promedio o Esc para salir");
let cancionEscuchar;

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
    if (!numeroEntero(cancion)){
        return false;
    }
    else if(canciones.length < cancion || cancion == 0) {
        alert("Opción inválida.");
        return false;
    }
    return true;
}

function mostrarCanciones() {
    //for (let cancion in canciones) {
    //    console.log((parseInt(cancion)+1) + "- " + canciones[cancion].infoCompleta);
    //}
    canciones.forEach(cancion => {
        console.log((canciones.indexOf(cancion)+1) + "- " + cancion.infoCompleta);
    })
}

function escucharCancion() {
    mostrarCanciones();
    do { cancionEscuchar = prompt("Elegi el n° de la canción que querés escuchar: "); }
    while (!cancionValida(cancionEscuchar));
    alert("Estás escuchando la canción " + canciones[cancionEscuchar-1].infoCompleta);
}

function subirCancion() {
    nuevaCancionInterprete = prompt("Ingresa el nombre del intérprete de la canción que vas a subir: ");
    nuevaCancionNombre = prompt("Ingresa el nombre de la canción que vas a subir: ");
    do { nuevaCancionDuracion = prompt("Ingresa la duración de la canción que vas a subir: "); }
    while (!numeroEntero(nuevaCancionDuracion));
    canciones.push(new Cancion({nombre: nuevaCancionNombre, artista:nuevaCancionInterprete, duracion:nuevaCancionDuracion}));
    mostrarCanciones();
    alert("Así quedó tu lista de canciones.");
}

const division = (a, b) => a / b;

validarOpcion();
while (opcion.toLowerCase() != "esc") {
    console.clear();
    switch (opcion.toLowerCase()) {
        case "escuchar": {
            escucharCancion();
            break;
        }
        case "subir": {
            subirCancion();
            break;
        }
        case "promedio": {
            let suma = canciones.reduce((total, cancion) => total + parseFloat(cancion.duracion), 0);
            //for(let cancion in canciones){
            //    suma += parseFloat(canciones[cancion].duracion);
            //};
            //let promedio = suma / canciones.length;
            alert("El promedio de la duración de las canciones es de " + division(suma, canciones.length) + ".");
            break;
        }
        case "esc": {
            break;
        }
    }
    opcion = prompt("Ingrese una opción: Escuchar, Subir, Promedio o Esc para salir");
    validarOpcion();
}