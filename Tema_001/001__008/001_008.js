/*

Escribe una función que reciba un string de números separados por dos puntos,
cree un array a partir del string y devuelva la media de todos lo valores

*/

function calculaMediaDeStringSeparadoPorPuntos(cadena){
    var arrayCadena = cadena.split(":");
    arrayCadena.splice();
    var objeto = {};
    var suma = 0;
    var contador = 0;

    //eliminamos repetidos:
    for(var i = 0; i< arrayCadena.length; i++){
        objeto[arrayCadena[i]] = arrayCadena[i];        
    }

    for(var propiedad in objeto){
        suma = suma + +propiedad;
        contador = contador + 1;
    }

    return suma/contador;

}

// Tests

var stringDeNumeros = '80:70:90:100';

console.log(calculaMediaDeStringSeparadoPorPuntos(stringDeNumeros));
// La función debe devolver 85

// Bonus

// Misma funcionalidad pero eliminando los repetidos
stringDeNumeros = '80:70:90:100:100:100:100';
// también deberá devolver 85
console.log(calculaMediaDeStringSeparadoPorPuntos(stringDeNumeros));