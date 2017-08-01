/*

Ejercicio 001__009: 
Realiza las funciones siguientes 

*/


// Esta función recibe un string y devuelve el string inverso
// Por ejemplo: para el string "Hola clase!" debe devolver "!esalc aloH"
function stringInverso(string) {

    return string.split("").reverse().join("");
}

// Esta función debe recibir un string y devolver el mismo string sin espacios
function eliminarEspacios(string) {
    // Con expresión regular
    string = string.replace(/\s/g, '');
    return string;
}

// Esta función debe recinir un string y devolverlo con todas sus letras mayúsculas
function ponerTodasLasLetrasMayusculas(string){
    var cadena = string + "";
    return cadena.toUpperCase();
}

// Esta función debe recibir un string y decir si es un palíndromo (true / false)
// Un palíndromo es una frase que se lee igual al derecho que al revés
// Haz uso de las tres funciones anteriores
function esPalindromo(string) {
    string = eliminarEspacios(string);
    string = ponerTodasLasLetrasMayusculas(string);
    return string === stringInverso(string);
}

//  Ejemplos de palíndromos:

// Arde ya la yedra
// Ana lava lana
// Anita lava la tina

console.log(esPalindromo("Arde ya la yedra"));
console.log(esPalindromo("Ana lava lana"));
console.log(esPalindromo("Anita lava la tina"));