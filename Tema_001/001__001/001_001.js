function obtenerLetraSeguridad(dni){

	var dniString = dni + "";

	var array = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
	var posicionLetra = 0;
	var resultado = ""

	posicionLetra = dni % 23;
	resultado = array[posicionLetra];
	return resultado;
}

console.log(obtenerLetraSeguridad(12312312));
console.log(obtenerLetraSeguridad(78163312));
console.log(obtenerLetraSeguridad(12345678));
console.log(obtenerLetraSeguridad(34667892));