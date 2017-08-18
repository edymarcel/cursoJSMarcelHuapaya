function clonar(objetoQueVamosAClonar){
	var nuevoObjeto = null;

	var cadenaJSON = JSON.stringify(objetoQueVamosAClonar);
	nuevoObjeto = JSON.parse(cadenaJSON);

	return nuevoObjeto;
}

/*
var variable;

console.log("Valor: " + variable + ", Tipo: " + typeof(variable));

variable = 10;

console.log("Valor: " + variable + ", Tipo: " + typeof(variable));

variable = "10";

console.log("Valor: " + variable + ", Tipo: " + typeof(variable));
*/

/*var paises = ["Mexico", "Espana", "Chile", "Peru"];
console.log (paises);
*/

/*var array = [];

array.push("Opel");
array.push("Nissan");
array.push("BMW");

array[0] = 'Ford';//reemplaza la primera posicion
array.unshift("Opel2") ;//agrega en la primera posicion
array.splice(0 , 1); //quitar 1 en el indice cero
array.splice(2 , 0, "Audi"); //insertar en la posicion 2 y no se quita ninguno

ultimo = array.pop();*/


/*var persona = {
	nombre : "Fran",
	apellidos: "Linde"
};

//console.log (persona.nombre);
//console.log (persona["nombre"]);

for (var indice in persona ){
	console.log(indice);
	console.log(typeof(indice));
	console.log(persona[indice]);
}
*/

var array = [];

array.push("Opel");
array.push("Nissan");
array.push("BMW"); 

var miFuncion = function(elemento) {
	console.log("elemento: " + elemento);
} 

array.forEach(miFuncion);