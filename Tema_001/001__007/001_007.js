var buscarParejas = function(array) {

    var resultado = '[';
    var objeto = {};
    for (var i = 0; i < array.length; i++) {        

        for (var j = i; j < array.length; j++) {
            if((array[i] + array[j]) == 0){
                resultado = resultado  + '"' + i + "," + j + '"';

                /*if (i == (array.length - 2)){
                    resultado = resultado + "";
                }else{
                    resultado = resultado + ",";
                }*/

                if (!(i == (array.length - 2))){
                    resultado = resultado + ",";
                }
            }

        }

        if (i == array.length-1){
            resultado = resultado + "]";                        
        }
        
    }
    return resultado;

}

// Tests

var miArray = [2, -5, 10, 5, 4, -10, 0, -5];
console.log(buscarParejas(miArray));

// Debe imprimir [ "1,3" , "2,5" , "3,7", "6,6" ]