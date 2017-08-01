function validarArray(array){

		//var resultado = {};
		var resultado = 0;
		var indMasLargo = 0;
		for (var indFrase=0; indFrase<array.length; indFrase++){			
			if (array[indMasLargo].length<array[indFrase].length){
				indMasLargo = indFrase;
			}
		}

		//resultado.largo = array[indMasLargo].length;
		//resultado.cadena = array[indMasLargo];
		resultado  = array[indMasLargo].length;
		return resultado;

}

//var array1 = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga"];
//console.log(validarArray(array1));

var media = function (arrResultados){

	var suma = 0;
	var resultado = 0;

	if (arrResultados.length>0){

		var sumaTotal = function (elem){
			suma = suma + elem;
		}

		arrResultados. forEach(sumaTotal); 
		
		/*for (var i = 0; i<arrResultados.length; i++){
			suma = suma + arrResultados[i];
		}*/
	
		resultado =  suma/arrResultados.length;
	}
	return resultado;
}

var resultados = [];

var arrayDeTest1 = ["Richie", "Joanie", "Greg", "Marcia", "Bobby"];
var arrayDeTest2 = ["Blanka", "Zangief", "Chun Li", "Guile"];
var arrayDeTest3 = ["Red", "Blue", "Green"];
var arrayDeTest4 = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga"];


resultados.push(validarArray(arrayDeTest1));
resultados.push(validarArray(arrayDeTest2));
resultados.push(validarArray(arrayDeTest3));
resultados.push(validarArray(arrayDeTest4));

console.log(resultados);

// resultados = [6, 7, 5, 19];
console.log(media(resultados));