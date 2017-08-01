function vaciarPapelera(array) {
    // Esta función debe recibir un array y devolverlo habiéndole quitado los elementos que sean un asterisco (*)
    // Por ejeplo:
    // vaciarPapelera(['a',1,'*',5]) 
    // debe devolver:
    // ['a',1,5]

    for(var i = 0; i< array.length; i++){
        var elemento = array[i];
        if(elemento=='*'){

            array.splice(i , 1); //quitar 1
        }
    }
    
    //console.log(array);
    return array;

}

function agruparElementos(array) {
    // Esta función debbe recibir un array con números y letras y devolverlo habiendo agrupado los elementos
    // En primer lugar se deben encontrar números, depués letras. El orden dentro de cada grupo no importa.
    // Por ejemplo: 
    // agruparElementos(['B', 'a', 4 , 23, 'J']) 
    // debe devolver:
    // [23, 4, 'B', 'a', 'J']

    /*var arrayNumeros = [];
    var arrayLetras = [];
    for(var i = 0; i< array.length; i++){
        if(typeof(array[i]) == 'number'){
            arrayNumeros.push(array[i]);
        }else if(typeof(array[i]) == 'string'){
            arrayLetras.push(array[i]);
        }
    }*/

    //console.log(array);
    //console.log (arrayNumeros.concat(arrayLetras));
    
    //arrayNumeros = arrayNumeros.sort();
    //arrayLetras = arrayLetras.sort();

    //return arrayNumeros.concat(arrayLetras);

    return array.sort();
}

function ponerBonitasLasLetras(array) {
    // Esta función debe recixbir un array de números y letras y devolverlo con las letras vocales en mayúsculas 
    // y las consonantes en minúsculas. Los números no deben ser tratados.
    // Por ejemplo:
    // ponerBonitasLasLetras([1,5,7,'a','J','p','E'])
    // debe devolver:
    // [1,5,7,'A','j','p','E']

    //console.log(array);

    var vocales = ['a','e','i','o','u'];

    for(var i = 0; i< array.length; i++){
        if(typeof(array[i]) == 'string'){
            for(var j = 0; j < vocales.length; j++){
                if (array[i].toLowerCase() == vocales[j]){
                    array[i] = array[i].toUpperCase(); 
                    break;
                }else{
                    array[i] = array[i].toLowerCase(); 
                    break;
                }
            }
        }
    }
    //console.log(array);
    return array;

}


function ponerBonitosLosNumeros(array) {
    // Esta función debe recibbir un array de números y letras, y devolverlo con los números "bonitos". 
    // Las letras no deben cambiar. 
    // Para poner bonito número debemos sumar todas sus cifras.
    // en caso de que el número resultante tenga más de una cifra, se petirá el proceso con este.
    // 123 se convertirá en 6 porque 1+2+3 = 6
    // 9 se convertirá en 9
    // 9956 se convertirá en 2 porque 9+9+5+6 = 29, 2+9 = 11 y 1+1 = 2
    // 793 se convertirá en 1 porque 7+9+3 = 19, 1+9 = 10 y 1+0 = 1
    // Este proceso debemos realizarlo sobre un array de elementos y aplicarlo solo a los números.


    //console.log(array);
    //var arrayNumeros = [];

    var sumaDigitos = function (numeroString){
        
        var sumaNumeros = 0;
        var sumaNumerosString = "";        

        var arrayNumeros = numeroString.split("");

        do {

            sumaNumeros = 0;

            for (var x = 0; x < arrayNumeros.length; x++){
                sumaNumeros = +arrayNumeros[x] + +sumaNumeros;                
            }

            numeroString = sumaNumeros + "";
            arrayNumeros = numeroString.split("");

            //console.log(numeroString);
            //console.log(arrayNumeros);
            //console.log(arrayNumeros.length);
            //break;
        }
        while (arrayNumeros.length>1);
            
        
        return sumaNumeros;


    }

    //console.log(sumaDigitos("9956"));

    var numeroACadena = '';
    
    for(var i = 0; i< array.length; i++){
       if(typeof(array[i]) == 'number'){
            numeroACadena = array[i] + "";
            array[i] = sumaDigitos(numeroACadena);

       } 
    }
    //console.log(array);

    return array;
}

function arrayToString(array) {
    //Esta función debe recibir un array y devolver un string con todos sus elementos
    //Ejemplo: arrayToString([1, 4, 5, 5, 'A', 'b', 'E', 'j']) dee devolver "1455AbEj"
    console.log(array.join(''));
    return array.join('');
    
}

// Tests

function transformacionCompletaDelArray(array) {
    array = vaciarPapelera(array);
    array = agruparElementos(array);
    array = ponerBonitasLasLetras(array);
    array = ponerBonitosLosNumeros(array);
    array = arrayToString(array);

    return array;
}

console.log(transformacionCompletaDelArray(["a", 6, "B", "F", "*", 8, 78, "J"]) === "668bfjA");
console.log(transformacionCompletaDelArray(["*", "j", 6, "A", "F", "*", 8, "C", "b", "a", 78, "J", 43523, 1111, "r", "q", "y"]) === "48668AcfjAbjqry");
