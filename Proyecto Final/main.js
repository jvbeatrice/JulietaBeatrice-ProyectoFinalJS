const opciones = ["escuchar", "subir", "promedio"];
let canciones = [["Journey - Separate Ways", 3], ["Whitney Houston - I Have Nothing", 4], ["Gloria Gaynor - I will survive", 5]]
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
    for (let cancion = 0; cancion < canciones.length; cancion++) {
        console.log((cancion + 1) + "- " + canciones[cancion][0] + " - " + canciones[cancion][1] + "min");
    }
}

function escucharCancion() {
    mostrarCanciones();
    do { cancionEscuchar = prompt("Elegi el n° de la canción que querés escuchar: "); }
    while (!cancionValida(cancionEscuchar));
    alert("Estás escuchando la canción " + canciones[cancionEscuchar - 1][0]);
}

function subirCancion() {
    nuevaCancionInterprete = prompt("Ingresa el nombre del intérprete de la canción que vas a subir: ");
    nuevaCancionNombre = prompt("Ingresa el nombre de la canción que vas a subir: ");
    do { nuevaCancionDuracion = prompt("Ingresa la duración de la canción que vas a subir: "); }
    while (!numeroEntero(nuevaCancionDuracion));
    canciones.push([nuevaCancionInterprete + " - " + nuevaCancionNombre, parseInt(nuevaCancionDuracion)]);
    mostrarCanciones();
    alert("Así quedó tu lista de canciones.");
}
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
            let suma = 0;
            for(let cancion = 0; cancion < canciones.length; cancion++){
                suma += canciones[cancion][1];
            };
            let promedio = suma / canciones.length;
            alert("El promedio de la duración de las canciones es de " + promedio + ".");
            break;
        }
        case "esc": {
            break;
        }
    }
    opcion = prompt("Ingrese una opción: Escuchar, Subir, Promedio o Esc para salir");
    validarOpcion();
}