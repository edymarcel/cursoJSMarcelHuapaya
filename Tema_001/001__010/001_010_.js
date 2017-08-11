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

var zoo = {
	nombre: "El último zoológico",
	ubicacion: {},
	areas: [],
	aforo: 120
	// COMPLETAR
};

zoo.ubicacion = {
	direccion: "Calle de los animales 5",
	ciudad: "París",
	pais: "Francia",
	// COMPLETAR
}

var area1 = {
	nombre: "Reptiles",
	aforoMaximoZona: 30,
	recintos: [], // son como jaulas
	// COMPLETAR
}

var area2 = {
	nombre: "Aves",
	aforoMaximoZona: 30,
	recintos: [], // son como jaulas
	// COMPLETAR
}

var area3 = {
	nombre: "Mamiferos",
	aforoMaximoZona: 30,
	recintos: [], // son como jaulas
	// COMPLETAR
}

var recintoSerpientes = {
	nombre: "Serpientes",
	capacidadMaxAnimales: 10,
	aforoMaximoPersonas: 20,
	animales:[],
	personas: []
}

var recintoLagartos = {
	nombre: "Lagartos",
	capacidadMaxAnimales: 5,
	aforoMaximoPersonas: 15,
	animales:[],
	personas: []
}

var recintoAvesPequenas = {
	nombre: "Aves Pequeñas",
	capacidadMaxAnimales: 50,
	aforoMaximoPersonas: 30,
	animales:[],
	personas: []
}

var recintoAvesGrandes = {
	nombre: "Aves Grandes",
	capacidadMaxAnimales: 20,
	aforoMaximoPersonas: 26,
	animales:[],
	personas: []
}

var recintoMamiferosMarinos = {
	nombre: "Mamiferos Marinos",
	capacidadMaxAnimales: 20,
	aforoMaximoPersonas: 26,
	animales:[],
	personas: []
}

var recintoMamiferosTerrestres = {
	nombre: "Mamiferos Terrestres",
	capacidadMaxAnimales: 20,
	aforoMaximoPersonas: 26,
	animales:[],
	personas: []
}

function agregarAnimalARecinto(objetoRecinto,nombreS, razaS, colorS, edadS){
	var animal = {
		nombre: nombreS,
		raza : razaS,
		color:colorS,
		edad: edadS
	}
	objetoRecinto.animales.push(animal);
}

var arrayNombres = ["Pedro","Juan", "Alberto", "Julian", "Carlos", "Maria", "Fabiola", "Marco", "Javier", "Milagros"];
var arrayEdad = [21, 23,54,13,64,23,75, 25, 18, 10];

function agregarPersonaARecinto(objetoRecinto,nombreS, edadS){
	var i = Math.floor(Math.random() * 9)
	var persona = {
		nombre: nombreS[i],
		edad: edadS[i]
	}
	objetoRecinto.personas.push(persona);
}

agregarAnimalARecinto(recintoSerpientes, "Serpiente 1", "", "verde", "2");
agregarAnimalARecinto(recintoSerpientes, "Serpiente 2", "", "rojo", "1");
agregarAnimalARecinto(recintoSerpientes, "Serpiente 3", "", "negro", "6");

agregarAnimalARecinto(recintoLagartos, "Lagarto1", "Africano", "negro", "6");
agregarAnimalARecinto(recintoLagartos, "Lagarto2", "Americano", "negro", "5");

agregarAnimalARecinto(recintoAvesPequenas, "Ave1", "Colibri de la montaña", "negro", "5");
agregarAnimalARecinto(recintoAvesPequenas, "Ave2", "Loro", "verde", "5");
agregarAnimalARecinto(recintoAvesPequenas, "Ave2", "Alondra", "plomo", "5");

agregarAnimalARecinto(recintoAvesGrandes, "Ave Grande 1", "Condor andino", "negro", "5");
agregarAnimalARecinto(recintoAvesGrandes, "Ave Grande 2", "Aguila Americana", "negro", "5");

agregarAnimalARecinto(recintoMamiferosMarinos, "Mamifero Marino 1", "Lobo de Mar", "negro", "5");
agregarAnimalARecinto(recintoMamiferosMarinos, "Mamifero Marino 2", "Foca", "negro", "5");

agregarAnimalARecinto(recintoMamiferosTerrestres, "Mamifero Terrestre 1", "Vaca", "negro", "5");
agregarAnimalARecinto(recintoMamiferosTerrestres, "Mamifero Terrestre 2", "Cebra", "negro", "5");

agregarPersonaARecinto(recintoSerpientes,arrayNombres,arrayEdad);
agregarPersonaARecinto(recintoSerpientes,arrayNombres,arrayEdad);
agregarPersonaARecinto(recintoSerpientes,arrayNombres,arrayEdad);

agregarPersonaARecinto(recintoLagartos,arrayNombres,arrayEdad);
agregarPersonaARecinto(recintoLagartos,arrayNombres,arrayEdad);
agregarPersonaARecinto(recintoLagartos,arrayNombres,arrayEdad);

agregarPersonaARecinto(recintoAvesPequenas,arrayNombres,arrayEdad);
agregarPersonaARecinto(recintoAvesPequenas,arrayNombres,arrayEdad);

agregarPersonaARecinto(recintoAvesGrandes,arrayNombres,arrayEdad);

agregarPersonaARecinto(recintoMamiferosMarinos,arrayNombres,arrayEdad);
agregarPersonaARecinto(recintoMamiferosMarinos,arrayNombres,arrayEdad);

agregarPersonaARecinto(recintoMamiferosTerrestres,arrayNombres,arrayEdad);
agregarPersonaARecinto(recintoMamiferosTerrestres,arrayNombres,arrayEdad);

area1.recintos.push(recintoSerpientes);
area1.recintos.push(recintoLagartos);

area2.recintos.push(recintoAvesPequenas);
area2.recintos.push(recintoAvesGrandes);

area3.recintos.push(recintoMamiferosMarinos);
area3.recintos.push(recintoMamiferosTerrestres);

zoo.areas.push(area1);
zoo.areas.push(area2);
zoo.areas.push(area3);

// COMPLETAR