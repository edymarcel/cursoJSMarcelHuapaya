/*

Realiza la modelización de un Zoológico

El zoológico deberá tener un nombre, una ubicación, un aforo máximo, un horario... ¡y todo lo que se te pueda ocurrir!

El zoológico deberá tener varias áreas:

- Reptiles
- Aves
- Mamíferos
- Peces

con distintos recintos, por ejemplo:

- Reptiles
	- Serpientes
	- Lagartos
- Aves
	- Aves pequeñas
	- Aves tropicales

	... etcétera

Cada recinto debe tener un nombre, una capacidad máxima de animales, aforo maximo de personas y un conjunto de animales.

Modeliza el zoológico lo más completo que puedas.

*/

// Funciones auxiliares
function validaExisteArea(area, areas){
	var result = false;
	/*for(var i = 0; i< areas.length; i++){
		if(areas[i].nombre == area.nombre){
			result = true;
		}
	}*/

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
	var nombresNegados = ["Carlos", "Daniel", "Fabian", "Juan Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
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
			recintosEnMiZoo.push(recinto);
		}
	}

	var indiceAleatorio = generarNumeroAleatorioEntre(0, recintosEnMiZoo.length-1);
	recinto = recintosEnMiZoo[indiceAleatorio];

	return recinto;
}

// Añade personas de forma aleatoria
function insertarPersonasAleatoriamente(numeroPersonas){
	for(var i=0; i<numeroPersonas; i++){
		var persona = crearPersonaAleatoria();
		var recintoAleatorio = dameRecintoAleatorio();

		if(recintoAleatorio.aforoMaximoPersonas>recintoAleatorio.personas.length){
			recintoAleatorio.personas.push(persona);
		}else{
			console.error(persona.nombre + " no cabe en el recinto " + recintoAleatorio.nombre);
		}
	}
}


var zoo = {
	nombre: "El último zoológico",
	ubicacion: {},
	areas: [],
	aforo: 0,
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

function crearAnimal(nombre, especie, salud, hambre, pais){
	return {
		nombre: nombre,
		especie: especie,
		salud: salud,
		hambre: hambre,
		pais: pais
	};
}

function crearPersonaAleatoria(){
	return {
		nombre: generarNombreAleatorio(),
		edad: generarNumeroAleatorioEntre(1, 90),
		dinero: generarNumeroAleatorioEntre(0, 1000)
	}
}

// Creo animales
var tigreBlanco = crearAnimal("Tigre Blanco", "Felino", 100, 80, "Egipto");
var tigreNormal = crearAnimal("Tigre", "Felino", 90, 60, "Africa");
var avestruz = crearAnimal("Avestruz", "Avis Chilensis", 100, 100, "Chile");
var flamenco = crearAnimal("Flamenco", "Phoenicopteridae", 5, 100, "Colombia");
var ballena = crearAnimal("Ballena", "ballena blanca", 5, 100, "Colombia");
var tiburon = crearAnimal("Tiburón", "Tiburón Blanco", 50, 100, "Perú");

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

// Añado 100 personas
insertarPersonasAleatoriamente(100);

console.log(zoo);