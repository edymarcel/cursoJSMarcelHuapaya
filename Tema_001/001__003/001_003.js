function validarArray(array){

		var resultado = {};
		var indMasLargo = 0;
		for (var indFrase=0; indFrase<array.length; indFrase++){			
			if (array[indMasLargo].length<array[indFrase].length){
				indMasLargo = indFrase;
			}
		}

		resultado.cadena = array[indMasLargo].length;
		resultado.String = array[indMasLargo];

		return resultado;

}

var array1 = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga"];
console.log(validarArray(array1));