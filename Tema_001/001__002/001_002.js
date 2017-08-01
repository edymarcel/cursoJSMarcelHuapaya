function obtenerLetraSeguridad(dni){

	var dniString = dni + "";

	var array = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
	var posicionLetra = 0;
	var resultado = ""

	if (typeof(dni)!="number"){
		resultado = "Debes introducir un valor numérico.";		
	} else if (dniString.length!= 8){
		resultado = "Debes introducir un número de 8 cifras.";			
	} else if (dni <= 0){
		resultado = "Debes introducir un valor positivo.";			
	} else{
	
		posicionLetra = dni % 23;
		resultado = array[posicionLetra];
	}
	return resultado;
}

console.log(obtenerLetraSeguridad(12312312));
console.log(obtenerLetraSeguridad(-7163312));
console.log(obtenerLetraSeguridad(12345678));
console.log(obtenerLetraSeguridad(3466789245));
console.log(obtenerLetraSeguridad("92234488"));