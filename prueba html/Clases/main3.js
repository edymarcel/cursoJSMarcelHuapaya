/*var cadena1 = "Soy la cadena 1";
var cadena2 = "Soy la cadena 2";

var cadena3 = cadena1;


console.log(cadena3 == cadena1);
cadena3 = "Ahora soy cadena 3";
console.log(cadena3 == cadena1);*/

/*var objeto1 = {
	texto:"Soy la cadena 1"
};

var objeto3 = objeto1; //Se almacena una referencia a un mismo espacio de memoria


console.log(objeto3 == objeto1);
objeto3.texto = "Ahora soy cadena 3";
console.log(objeto3 == objeto1);

objeto3.numero = 100;
objeto3.buleano= true;*/

/*var persona1 = {
	nombre : "Fran",
	apellido: "Linde"
} 

var persona2 = {
	nombre : "Marcel",
	apellido: "Huapaya"	
}

var ordenadorMac = {
	marca : "Apple",
	memoriaRam : "4GB",
	pulgadas : 15
}

//persona1.ordenador = ordenadorMac;
//persona2.ordenador = ordenadorMac;

persona1.ordenador = clonar(ordenadorMac);
persona2.ordenador = clonar(ordenadorMac);*/

//permite clonar objetos con estructura json, no funciones, funcioones como atributos lo obvia.

function clonar(objetoQueVamosAClonar){
	var nuevoObjeto = null;

	var cadenaJSON = JSON.stringify(objetoQueVamosAClonar);
	nuevoObjeto = JSON.parse(cadenaJSON);

	return nuevoObjeto;
}

