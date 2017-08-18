function miConcat(separador){
	var resultado = "";

	//Iterar a traves de los otros argumentos enviados
	for (var i = 1; i < arguments.length; i++) {
		resultado += arguments[i] + separador;
	}

	//convertir a array
	//var args = Array.prototype.slice.call(arguments);
	console.log(typeof(arguments));
	return resultado;
}

//Devuelve "rojo", "naranja", "azul"
console.log(miConcat(", ", "rojo", "naranja", "azul"));


//Devuelve "salvia", "albahaca", "oregano", "pimienta", "perejil"
console.log(miConcat(". ", "salvia", "albahaca", "oregano", "pimienta", "perejil"));