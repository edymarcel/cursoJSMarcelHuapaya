/*

Haciendo uso del zoo que definimos en el ejercicio anterior,
vamos a añadirle funcionalidad:

1) Haz una función que añada un visitante nuevo:
	Si el zoo está lleno no podrá entrar.
	Para entrar deberá pagar la entrada que dependerá de:
		Niños <14 años: gratis
		Personas mayores >65 gratis
		Resto: 5$
		Estudiantes: 3$
	Este importe deberá ser restado del dinero del visitante y añadido a la caja del zoo

	El visitante irá a un área y a un recinto aleatorio,
	si esta está llena, deberá buscar otro lugar

2) Crea una función que se llame ejecutarCiclo() que simule el paso de 1 hora en el zoo, deberá:
	- Añadir visitantes al parque y también los retire del parque
	- Deberá quedar reflejado que ha pasado un ciclo en el importe de las personas (tendrán menos dinero) y en la caja del parque (habrá ganado dinero)

	(El ciclo simula ser una hora del parque, pero lo ejecutamos cada 3seg)

3) Crea una funcionalidad que simule el paso de un ciclo en un animal:
	- Su salud se verá afectada disminuyendo o aumentando 10 (de forma aleatoria).
	- Si la salud del animal descience por debajo de 50, este debéra ir a la enfermería.
	- También el animal tendrá más hambre cada hora que pase (+10) cuando llegue a 100 deberá ser alimentado y pasará a tener hambre 0.

4) Asocia la funcionalidad anterior a la función de ejecutarCiclo() de manera que los animales vayan variando su salud y su hambre.
De vez en cuando algunos animales deberán ir a la enfermería (salud menor de 50) donde recuperarán 10 de salud hasta llegar a 100. 
Al llegar a 100 deberán volver a su recinto.

BONUS:

1) Haz que en cada ciclo una persona tenga una probabilidad del 15% de comprar un prodcuto de la tienda.
Añade una propiedad tienda en ZOO que tenga un array de artículos de regalo (añade 20 artículos).
Un artículo de regalo tendrá un nombre y un precio.
Las personas que deseen comprar eligirán un artículo aleatorio y se lo llevarán (ya no estará en la tienda)

2)  Crear función cerrar zoo, encargada de:
	- Parar el intervalo
	- Sacar a todas las personas del zoo
Cierra el zoo una vez hayan pasado 100 ciclos

3) Cuando el hambre de un animale llegue a 100 el animal estará muy hambriento y deberá ser alimentado.
Al alimentar un animal su hambre pasa a 0 y al zoo le cuesta 1000$

4) Si el zoo no tiene dinero para alimentar a los animales, no podrá hacerlo.
Cuando un animal tenga más de 150 de hambre, se comerá a un visitante de su recinto.
El zoo se quedará con su cartera.

5) Realiza una función imprimirEstadoZoo() que muestre por consola el estado del zoo.
Deberán mostrarse:

- las áreas:
	- los recintos de ese área:
		- los animales de ese recinto
		- el número de visitantes de ese recinto
- la enfermería:
	- los animales dentro de la enfermería
- la tienda
	- el número de productos de la tienda
- la caja del zoo

6) Si el hambre del animal supera 300, se comerá otro animal de su recinto.

7) Añade a cada animal una propiedad con un emoji que lo represente. 
Puedes coger los emojis de http://getemoji.com/

*/



// Funciones auxiliares
function validaExisteArea(area, areas){
	var result = false;

	if(zoo.areas.indexOf(area) != -1){
		result = true;
	}

	return result;
}
function agregarRecintoAAreaValidaZoo(recinto, area, zoo){
	area.recintos.push(recinto);
	area.aforoMaximo = area.aforoMaximo + recinto.aforoMaximoPersonas;
	//if(validaExisteArea(area,zoo.areas)){
	if(validaExisteArea(area,zoo.areas)){
		zoo.aforo = zoo.aforo + area.aforoMaximo;
	}
	
}

function agregarRecintoAArea(recinto, area){
	area.recintos.push(recinto);
	area.aforoMaximo = area.aforoMaximo + recinto.aforoMaximoPersonas;
}

function agregarAreaAZoo(area, zoo){
	zoo.areas.push(area);
	zoo.aforo = zoo.aforo + area.aforoMaximo;
}

function generarNumeroAleatorioEntre(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

	return numero;
}

function generarNombreAleatorio(){
	var nombresNegados = ["Carlos", "Daniel", "Fabian", "Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
	var indice = generarNumeroAleatorioEntre(0, nombresNegados.length-1);

	return nombresNegados[indice];
}

function dameRecintoAleatorio(){
	var recinto = null;
	var recintosEnMiZoo = [];

	for(var indiceArea=0; indiceArea<zoo.areas.length; indiceArea++){
		var area = zoo.areas[indiceArea];
		for(var indiceRecintos=0; indiceRecintos<area.recintos.length; indiceRecintos++){
			var recinto = area.recintos[indiceRecintos];
			//validamos que el recinto pueda recibir personas todavia
			if(recinto.aforoMaximoPersonas>recinto.personas.length){
				recintosEnMiZoo.push(recinto);
			}
		}
	}

	if(recintosEnMiZoo.length>0){
		var indiceAleatorio = generarNumeroAleatorioEntre(0, recintosEnMiZoo.length-1);
		recinto = recintosEnMiZoo[indiceAleatorio];
	}
	return recinto;
}

function dameListaDeRecintosEnMiZoo(){
	var recinto = null;
	var recintosEnMiZoo = [];

	for(var indiceArea=0; indiceArea<zoo.areas.length; indiceArea++){
		var area = zoo.areas[indiceArea];
		for(var indiceRecintos=0; indiceRecintos<area.recintos.length; indiceRecintos++){
			var recinto = area.recintos[indiceRecintos];
			//validamos que el recinto pueda recibir personas todavia
			if(recinto.aforoMaximoPersonas>recinto.personas.length){
				recintosEnMiZoo.push(recinto);
			}
		}
	}
	
	return recintosEnMiZoo;
}

function dameListaDeAnimalesConRecinto(){
	var recinto = null;	
	var animalesEnMiZoo = [];

	for(var indiceArea=0; indiceArea<zoo.areas.length; indiceArea++){
		var area = zoo.areas[indiceArea];
		for(var indiceRecintos=0; indiceRecintos<area.recintos.length; indiceRecintos++){
			var recinto = area.recintos[indiceRecintos];
			for(var indiceAnimales=0; indiceAnimales<recinto.animales.length; indiceAnimales++){
				var animal = recinto.animales[indiceAnimales];
				var animalConRecinto = {
					animal: animal,
					recinto:recinto
				} 
				animalesEnMiZoo.push(animalConRecinto);
			}
			
		}
	}

	
	return animalesEnMiZoo;
}

function generarNombreArticuloAleatorio(){
	var articulos = ["Llavero", "Polo", "Jirafa de Peluche", "taza", "Lapicero", "Gorra M", "Billetera", "Oso de peluche", "Gorra Y"];
	var indice = generarNumeroAleatorioEntre(0, articulos.length-1);

	return articulos[indice];
}

function crearArticulo( nombre, precio){
	return {
		nombre: nombre,
		precio: precio
	}
}

function insertarArticulosATiendaAleatorio(zoo, numeroDeArticulos){
	for(var i = 0; i<numeroDeArticulos;i++){
		var nombre = generarNombreArticuloAleatorio() + "" + i;
		var precio = generarNumeroAleatorioEntre(30, 250);
		zoo.tienda.push(crearArticulo(nombre, precio));
	}
}

function posibilidadDeCompra(probabilidad){
	var resultado = false;
	var numero = generarNumeroAleatorioEntre(1, 100);
	if(probabilidad>=numero){
		resultado = true;
	}

	return resultado;
}

function compraArticulo(tienda, persona){
	//Verificar que hay articulos en la tienda
	if(tienda.length>0){
		var indiceArticuloElegido = generarNumeroAleatorioEntre(0, tienda.length-1);
		if(posibilidadDeCompra(15)){
			if((persona.dinero - tienda[indiceArticuloElegido].precio)>0){
				//reducir precio a dinero de la persona		
				persona.dinero = persona.dinero - tienda[indiceArticuloElegido].precio;	
				//Retirar articulo de tienda
				tienda.splice(indiceArticuloElegido, 1);
				
			}else{
				console.log("Persona: " + persona.nombre + " no tiene dinero suficiente para comprar articulo " + tienda[indiceArticuloElegido].nombre);
			}
			
		}
	}
}

// Añade personas de forma aleatoria
function insertarPersonasAleatoriamente(numeroPersonas){
	for(var i=0; i<numeroPersonas; i++){
		var persona = crearPersonaAleatoria();
		
		var recintoAleatorio = null;

		recintoAleatorio = dameRecintoAleatorio();
		if(recintoAleatorio != null)	{
			if(recintoAleatorio.aforoMaximoPersonas>recintoAleatorio.personas.length){
				var precio = 5;
				if(persona.condicion == "Niño"){
					precio = 0;
				}else if(persona.condicion == "Mayor"){
					precio = 0;
				}else if(persona.estudiante == 1){
					precio = 3;
				}

				if(persona.dinero - precio>0){
					persona.dinero = persona.dinero - precio;
					zoo.caja = zoo.caja + precio; 
					recintoAleatorio.personas.push(persona);
					compraArticulo(zoo.tienda, persona);
					//persona.dinero.
					console.log (persona.nombre + " agregado a recinto " + recintoAleatorio.nombre);
				}else{
					console.error (persona.nombre + " no tiene dinero y no puede ser agregado a recinto "  + recintoAleatorio.nombre );
				}
				
			}else{
				console.error(persona.nombre + " no cabe en el recinto " + recintoAleatorio.nombre);
			}
		}		
	}
}

//mueve persona a otro recinto:
function muevePersonaDeRecinto(recintoActual, recintoNuevo, persona){
	
	var indicePersonaEnRecintoActual = recintoActual.personas.indexOf(persona);
	//retiramos del recinto actual
	if(indicePersonaEnRecintoActual != -1){
		recintoActual.personas.splice(indicePersonaEnRecintoActual, 1);	
	}
	
	//Lo agregamos en el siguiente recinto, si esta lleno no se agrega y visitante se va
	if(recintoNuevo.aforoMaximoPersonas>recintoNuevo.personas.length){
		compraArticulo(zoo.tienda, persona);
		recintoNuevo.personas.push(persona);
	}
	
}

function mueveTodasLasPersonasDeSusRecintos(){
	var listaRecintos = dameListaDeRecintosEnMiZoo();

	if(listaRecintos.length>0){//valida si hay recintos con espacio
		//recorremos todos los recintos desde el ultimo al primero
		for(var indRecinto = listaRecintos.length-1 ; indRecinto>=0 ; indRecinto--){

			var recinto = listaRecintos[indRecinto];
			if (indRecinto == (listaRecintos.length-1)){
				//Si es el ultimo recinto borramos todas las personas (las personas se van del zoo)
				recinto.personas.splice(0,recinto.personas.length);
			}else{
				var indiceSiguienteRecinto = indRecinto+1;
				var recintoSiguiente = listaRecintos[indiceSiguienteRecinto];
				for(var indicePersona = recinto.personas.length-1; indicePersona>=0; indicePersona--){
					var persona = recinto.personas[indicePersona];
					muevePersonaDeRecinto(recinto, recintoSiguiente , persona);
				}
			}
		}
	}

	//log para validar
	listaRecintos = dameListaDeRecintosEnMiZoo();

	for(var x = 0; x<listaRecintos.length ; x++){
		var recintov = listaRecintos[x];
		console.log("recinto: " + recintov.nombre + ", Numero de personas: " + recintov.personas.length + "-> ");
		var texto = "";
		for (var i =0 ; i<recintov.personas.length; i++ ){
			var per = recintov.personas[i];
			texto = texto + ", "+ per.nombre;
		}
		console.log(texto);
	}
	
}


function actualizarEstadoAnimal(animalConRecinto, zoo){
	var animal = animalConRecinto.animal;
	var recinto = animalConRecinto.recinto;
	var factorDeSalud = 10;
	if(generarNumeroAleatorioEntre(0, 1)==0){
		factorDeSalud = -10
	}

	var factorDeHambre = 10;
	
	animal.hambre = animal.hambre + factorDeHambre;
	if (animal.hambre>=100){
		console.log(animal.nombre + " debe ser alimentado, alimentando...");		

		alimentarAnimal(zoo, animal, recinto);
	}

	if((animal.salud + factorDeSalud) <= 100){

		animal.salud = animal.salud + factorDeSalud;

		if (animal.salud<50){
			console.log(animal.nombre + " debe ir a Enfermeria");
			//lo mandamos a enfermeria y lo scamos del recinto
			zoo.animalesEnEnfermeria.push(animalConRecinto);
			var animales = recinto.animales;
			var indDeAnimalEnRecinto = animales.indexOf(animal);
			if(indDeAnimalEnRecinto>-1){
				animales.splice(indDeAnimalEnRecinto,1);
			}
		}
	}

	
}

function alimentarAnimal(zoo, animal, recinto){
	var indiceAnimalAleatorio = 0;
	if((zoo.caja - 1000) > 0){
		zoo.caja = zoo.caja - 1000;
		animal.hambre = 0;
		console.log(animal.nombre + " con hambre cero, alimentado por el Zoo");
	} else if(recinto.personas.length>0){
		console.log("animal.hambre " + animal.hambre);
		if(animal.hambre>=150 && animal.hambre<300 ){
			var indiceAleatorio = generarNumeroAleatorioEntre(0, recinto.personas.length-1);
			var persona = recinto.personas[indiceAleatorio];
			zoo.caja = zoo.caja + persona.dinero;
			console.log(animal.nombre + " se come a persona " + persona.nombre);
			recinto.personas.splice(indiceAleatorio,1);
			animal.hambre = 0;
			console.log(animal.nombre + " con hambre cero, se comio una persona");
		}else if(animal.hambre>300){

			if(recinto.animales.length>1){//Solo si hay mas de 1 animal, para que no se coma asi mismo
				console.log("Se come otro animal");
				indiceAnimalAleatorio = generarNumeroAleatorioEntre(0, recinto.animales.length-1);
				do{
					var otroAnimal = recinto.animales[indiceAnimalAleatorio];	
					if(animal != otroAnimal){//no se puede comer asi mismo
						recinto.animales.splice(indiceAnimalAleatorio,1);
					}
					
				}while (animal == otroAnimal);	
			}
						
		}
	}	

}

function actualizarSaludDeAnimalesEnfermeria(zoo){

	var animalesEnEnfermeria = zoo.animalesEnEnfermeria;

	//aumenta salud de animal en efermeria
	for (var indiceAnimalEnfermo = animalesEnEnfermeria.length-1; indiceAnimalEnfermo>=0; indiceAnimalEnfermo--){
		var animalConRecintoYEnfermo = animalesEnEnfermeria[indiceAnimalEnfermo];
		var animal = animalConRecintoYEnfermo.animal;
		var recinto = animalConRecintoYEnfermo.recinto;

		animal.salud = animal.salud + 10;

		if(animal.salud>=100){//Si ya esta sano lo sacamos de enfermeria y lo devolvemos al recinto;
			animalesEnEnfermeria.splice(indiceAnimalEnfermo, 1);
			recinto.animales.push(animal);
		}
	}
}

//funciones de operaciones

function imprimirLog(){
	console.clear();
	var tab = "    "; 
	
	console.log("%c///////////////////////IMPRIMIR ESTADO ZOO////////////////////////////", "color: blue; font-size: 14; font-weight: bold");

	console.log("%cAREAS", "color: blue; font-size: 12; font-weight: bold; text-decoration: underline");
	for (var indAreas = 0 ; indAreas<zoo.areas.length; indAreas ++){
		var area = zoo.areas[indAreas];
		console.log("%c" + indAreas + ". Area " + area.nombre, "color: #2E64FE;" );

		for(var indRecinto = 0 ; indRecinto<area.recintos.length; indRecinto++){
			var recinto = area.recintos[indRecinto];
			console.log(tab + ">> " + indRecinto + ". Recinto " + recinto.nombre );

			for(indAnimal = 0 ; indAnimal< recinto.animales.length; indAnimal++){
				var animal = recinto.animales[indAnimal];
				console.log(tab + tab + ">> " + indAnimal + ". Animal " + animal.nombre + " " + animal.emoji);				

			}
			console.log("%c" + tab + tab + "  Total de visitantes en recinto: " + recinto.personas.length, "color: #5F4C0B;");
		}
	}

	console.log("%cENFERMERIA", "color: blue; font-size: 12; font-weight: bold; text-decoration: underline");
	for (var indiceAnimalEnfermo = 0 ; indiceAnimalEnfermo<zoo.animalesEnEnfermeria.length; indiceAnimalEnfermo ++){
		var animalEnfermo = zoo.animalesEnEnfermeria[indiceAnimalEnfermo];
		console.log("%c" + indiceAnimalEnfermo + ". Animal " + animalEnfermo.animal.nombre + " " + animalEnfermo.animal.emoji + " (Salud: " + animalEnfermo.animal.salud + ")", "color:#2E64FE;");		
	}

	if(zoo.animalesEnEnfermeria.length==0){
		console.log("%cNo hay animales enfermos", "color: #6E6E6E;font-style: italic;");
	}
	
	console.log("%cTIENDA", "color: blue; font-size: 12; font-weight: bold; text-decoration: underline");
	console.log("%cCantidad de Articulos en Tienda: " + zoo.tienda.length, "color:#2E64FE;");

	console.log("%cCAJA", "color: blue; font-size: 12; font-weight: bold; text-decoration: underline");
	console.log("%cImporte en caja: $" + zoo.caja + ".00", "color:#2E64FE;");
	console.log("%c///////////////////////FIN IMPRIMIR ESTADO ZOO////////////////////////", "color: blue; font-size: 14; font-weight: bold");
}

function cerrarZoo(){
	window.clearInterval(intervalID);
	for(var indAreas = zoo.areas.length - 1 ; indAreas>=0; indAreas --){
		var area = zoo.areas[indAreas];
		for(var indRecinto = area.recintos.length - 1 ; indRecinto>=0; indRecinto --){
			var recinto = area.recintos[indRecinto];
			recinto.personas.splice(0,recinto.personas.length);
		}	
	}

	window.clearInterval(intervalID);
}

function ejecutarCicloAnimal(){
	//Actualizamos estado de todos los animales
	var listaAnimalesZoo = dameListaDeAnimalesConRecinto();
	for(var indiceAnimales=0; indiceAnimales<listaAnimalesZoo.length; indiceAnimales++){
		var animalConRecinto = listaAnimalesZoo[indiceAnimales];
		actualizarEstadoAnimal(animalConRecinto, zoo);
	}

	//Actualizamos salud de animales en enfermeria
	actualizarSaludDeAnimalesEnfermeria(zoo);
}

function ejecutarCicloZoo(){
	//Añadir personas cada 3 segundos
	//intervalID =  window.setInterval(insertarPersonasAleatoriamente(1), 3000);
	ejecutarCicloAnimal();

	mueveTodasLasPersonasDeSusRecintos();

	insertarPersonasAleatoriamente(10);

	
	zoo.ciclo = zoo.ciclo + 1;

	if(zoo.ciclo>100){
		cerrarZoo();
		console.log("zoológico cerró");
	}	

	imprimirLog();
	
}

function ejecutarCiclo(){
	//Añadir personas cada 3 segundos
	intervalID =  window.setInterval(ejecutarCicloZoo, 10000);
	
}

var intervalID = 0;


var zoo = {
	nombre: "El último zoológico",
	ubicacion: {},
	areas: [],
	aforo: 0,
	caja:0,
	animalesEnEnfermeria: [],
	tienda: [],
	ciclo:0
};

var ubicacion = {
	direccion: "Calle de los animalitos 123",
	ciudad: "Ciudad de México",
	pais: "México",
	telefono: 999888777
}

// Seteamos la ubicacion
zoo.ubicacion = ubicacion;

function crearArea(nombre){
	var area = {
		nombre: nombre,
		aforoMaximo: 0,
		recintos: [],
	};

	return area;
}

function crearRecinto(nombre, aforoMaximoPersonas, aforoMaximoAnimales, detalle){
	return {
		nombre: nombre,
		animales: [],
		personas: [],
		aforoMaximoPersonas: aforoMaximoPersonas,
		aforoMaximoAnimales: aforoMaximoAnimales,
		detalle: detalle
	};
}

function crearAnimal(nombre, especie, salud, hambre, pais, emoji){
	return {
		nombre: nombre,
		especie: especie,
		salud: salud,
		hambre: hambre,
		pais: pais,
		emoji:emoji
	};
}

function crearPersonaAleatoria(){
	var edadAleatoria = generarNumeroAleatorioEntre(1, 90);
	var condicion = "Resto";
	
	if (edadAleatoria < 14) {
	    condicion = "Niño";
	} else if ( edadAleatoria > 65) {
	    condicion = "Mayor";
	}

	return {
		nombre: generarNombreAleatorio(),
		edad: edadAleatoria,
		estudiante: generarNumeroAleatorioEntre(0, 1),
		condicion: condicion,
		dinero: generarNumeroAleatorioEntre(0, 1000)
	}
}

// Creo animales
var tigreBlanco = crearAnimal("Tigre Blanco", "Felino", 100, 80, "Egipto", "😺");
var tigreNormal = crearAnimal("Tigre Normal", "Felino", 90, 60, "Africa", "🐱");
var avestruz = crearAnimal("Avestruz", "Avis Chilensis", 100, 100, "Chile","🐤");
var flamenco = crearAnimal("Flamenco", "Phoenicopteridae", 5, 100, "Colombia", "🐔");
var ballena = crearAnimal("Ballena", "ballena blanca", 5, 100, "Colombia", "🐳");
var tiburon = crearAnimal("Tiburón", "Tiburón Blanco", 50, 100, "Perú", "🐬");

// Creo recintos 
var recintoTigres = crearRecinto("Jaula de tigres", 135, 30, "Jaula super reforzada con titanium");
var recintoAves = crearRecinto("Jaula para aves no voladoras", 100, 80, "Algunas aves se pelean mucho");
var recintoPeces = crearRecinto("Peces de Mar", 250, 80, "Algunos peces son grandes");

// Creo areas
var areaMamiferos = crearArea("Mamíferos");
var areaAves = crearArea("Aves");
var areaPeces = crearArea("Peces");

// Añado los animales a los recintos
recintoTigres.animales.push(tigreBlanco, tigreNormal);
recintoAves.animales.push(avestruz, flamenco);
recintoPeces.animales.push(ballena, tiburon);

// Añado los recintos a las áreas
agregarRecintoAArea(recintoTigres, areaMamiferos);
agregarRecintoAArea(recintoAves, areaAves);
//agregarRecintoAArea(recintoPeces, areaPeces);
//areaMamiferos.recintos.push(recintoTigres);
//areaAves.recintos.push(recintoAves);


//Añado las áreas al zoo
agregarAreaAZoo(areaMamiferos, zoo);
agregarAreaAZoo(areaAves, zoo);
agregarAreaAZoo(areaPeces, zoo);
//zoo.areas.push(areaMamiferos, areaAves);

//añado un recinto al final
agregarRecintoAAreaValidaZoo(recintoPeces, areaPeces, zoo);

//lleno 5 articulos
insertarArticulosATiendaAleatorio(zoo, 20);
// Ejecuto Ciclo
ejecutarCiclo();

//console.log(zoo);