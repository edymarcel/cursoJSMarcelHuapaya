/*function contadorDeCaracteres(cadena){

	var arrayDeCaracteres = cadena.split("");
	var objeto = {};

	arrayDeCaracteres.forEach(function (elemento){
			objeto[elemento] = 0;
		}
	);

	arrayDeCaracteres.forEach(function (elemento){
			objeto[elemento] ++;
		}
	)
	

	return objeto;

}*/

function contadorDeCaracteres(cadena){

	var arrayDeCaracteres = cadena.split("");
	var objeto = {};

	arrayDeCaracteres.forEach(function (elemento){
			if(!objeto[elemento]){
				objeto[elemento] = 0;
			}
			objeto[elemento] = objeto[elemento] + 1;			
		}
	);

	

	return objeto;

}

resultadoContador = contadorDeCaracteres("abbabcbdbabdbdbabababcbcbab");
console.log( resultadoContador['a'] === 7);
console.log( resultadoContador.b === 14);
console.log( resultadoContador['c'] === 3);

resultadoContador = contadorDeCaracteres("xyyyxyxyxzyxyzyxyxyasdfz");
console.log( resultadoContador.x === 7 );
console.log( resultadoContador['y'] === 10 );
console.log( resultadoContador.z === 3 );
console.log( resultadoContador['a'] === 1 );
console.log( resultadoContador['s'] === 1 );
console.log( resultadoContador.d === 1 );
console.log( resultadoContador['f'] === 1 );