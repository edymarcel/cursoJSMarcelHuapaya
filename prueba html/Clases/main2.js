//EMPIEZA EL JS

//console.log("Hola en la consola");
//alert("Soy una 'alerta'")

/*var variable1 = 100;
var variable2 = 222;
var resultado = variable1 * variable2;

var mensaje = "El resultado es " + resultado;

alert(mensaje);*/
/*
var cadena = "3";
var numero = 3;
var tienenMismoValor = cadena == numero;
var tienenMismoValorYTipo = cadena === numero;

console.log("tienenMismoValor");
console.log(tienenMismoValor);

console.log("tienenMismoValorYTipo");
console.log(tienenMismoValorYTipo);*/

function saludo(nombreDeLaPersona, momentoDelDia){
	var mensajeSaludo = "";
	momentoDelDia = momentoDelDia.toLowerCase();
	switch (momentoDelDia){
		case "mañana":
			mensajeSaludo = "Buenos días " + nombreDeLaPersona;
		break;			
		case "tarde":
			mensajeSaludo = "Buenas tardes " + nombreDeLaPersona;
		break;
		case "noche":
			mensajeSaludo = "Buenas noches " + nombreDeLaPersona;
		break;
		default:
			mensajeSaludo = "Hola " + nombreDeLaPersona;
		break;
	} 

	alert(mensajeSaludo);
}

var nombreDeLaPersona = "Juan";
var momentoDelDia = "Noche";

saludo(nombreDeLaPersona,momentoDelDia);


//ACABA EL JS