/*

Refactoriza el código realizado en el ejercicio 001__011:

Todos los objetos usados en nuestro zoo (area, recinto, animal, enfermería...) 
deberán pasar a ser clases que definamos mediante function y luego instanciemos mediante new.

Añade todas las funciones de cada clase (por ejemplo en animal: modificarSalud, ejecutarCicloAnimal, alimentar... etc)
al prototype de la clase, para no repetir las funciones en cada instancia de dicha clase

No olvides realizar este proceso con todas las clases que haya en nuestro Zoo.

*/

function Utiles(){
	this._descripcion = "";
}

Utiles.prototype.generarNumeroAleatorioEntre = function(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

	return numero;
}

Utiles.prototype.generarNombreAleatorio = function(){
	var nombresNegados = ["Carlos", "Daniel", "Fabian", "Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
	var indice = this.generarNumeroAleatorioEntre(0, nombresNegados.length-1);

	return nombresNegados[indice];
}

Utiles.prototype.generarNombreArticuloAleatorio = function(){
	var articulos = ["Llavero", "Polo", "Jirafa de Peluche", "taza", "Lapicero", "Gorra M", "Billetera", "Oso de peluche", "Gorra Y"];
	var indice = this.generarNumeroAleatorioEntre(0, articulos.length-1);
	return articulos[indice];
}

Utiles.prototype.posibilidadDeCompra = function(probabilidad){
	var resultado = false;
	var numero = this.generarNumeroAleatorioEntre(1, 100);
	if(probabilidad>=numero){
		resultado = true;
	}

	return resultado;
}


function Zoo(nombre, ubicacion, aforo, caja, utiles){
	this._utiles = new Utiles();
	this._nombre = nombre;
	this._ubicacion = ubicacion;
	this._areas = [];
	this._aforo = aforo;
	this._caja = caja;
	this._animalesEnEnfermeria = [];
	this._tienda =  this.insertarArticulosATiendaAleatorio(20);
	this._ciclo = 0;	
}

Zoo.prototype.dameListaDeAnimalesConRecinto = function(){
	var recinto = null;	
	var animalesEnMiZoo = [];

	for(var indiceArea=0; indiceArea<this._areas.length; indiceArea++){
		var area = this._areas[indiceArea];
		for(var indiceRecintos=0; indiceRecintos<area._recintos.length; indiceRecintos++){
			var recinto = area._recintos[indiceRecintos];
			for(var indiceAnimales=0; indiceAnimales<recinto._animales.length; indiceAnimales++){
				var animal = recinto._animales[indiceAnimales];
				var animalConRecinto = new AnimalConRecinto(animal, recinto);
				animalesEnMiZoo.push(animalConRecinto);
			}
			
		}
	}
	
	return animalesEnMiZoo;
}

Zoo.prototype.cerrarZoo = function (intervalID){
	window.clearInterval(intervalID);
	for(var indAreas = this._areas.length - 1 ; indAreas>=0; indAreas --){
		var area = this._areas[indAreas];
		for(var indRecinto = area._recintos.length - 1 ; indRecinto>=0; indRecinto --){
			var recinto = area._recintos[indRecinto];
			recinto._personas.splice(0,recinto._personas.length);
		}	
	}	
}

Zoo.prototype.agregarArea = function(area){
	this._areas.push(area);
	this._aforo = this._aforo + area._aforo;
}

Zoo.prototype.insertarArticulosATiendaAleatorio = function(numeroDeArticulos){
	var tienda = [];
	for(var i = 0; i<numeroDeArticulos;i++){
		var nombre = this._utiles.generarNombreArticuloAleatorio() + "" + i;
		var precio = this._utiles.generarNumeroAleatorioEntre(30, 250);
		var articulo = new Articulo(nombre, precio);
		tienda.push(articulo);
	}
	return tienda;
}

Zoo.prototype.compraArticulo = function(persona){
	tienda = this._tienda;
	//Verificar que hay articulos en la tienda
	if(tienda.length>0){
		var indiceArticuloElegido = this._utiles.generarNumeroAleatorioEntre(0, tienda.length-1);
		if(this._utiles.posibilidadDeCompra(15)){
			if((persona._dinero - tienda[indiceArticuloElegido]._precio)>0){
				//reducir precio a dinero de la persona		
				persona._dinero = persona._dinero - tienda[indiceArticuloElegido]._precio;	
				//Retirar articulo de tienda
				tienda.splice(indiceArticuloElegido, 1);
				
			}else{
				console.log("Persona: " + persona._nombre + " no tiene dinero suficiente para comprar articulo " + tienda[indiceArticuloElegido]._nombre);
			}
			
		}
	}
}

Zoo.prototype.dameRecintoAleatorio = function(){
	var recinto = null;
	var recintosEnMiZoo = [];

	for(var indiceArea=0; indiceArea<this._areas.length; indiceArea++){
		var area = this._areas[indiceArea];
		for(var indiceRecintos=0; indiceRecintos<area._recintos.length; indiceRecintos++){
			var recinto = area._recintos[indiceRecintos];
			//validamos que el recinto pueda recibir personas todavia
			if(recinto._aforoMaximoPersonas>recinto._personas.length){
				recintosEnMiZoo.push(recinto);
			}
		}
	}

	if(recintosEnMiZoo.length>0){
		var indiceAleatorio = this._utiles.generarNumeroAleatorioEntre(0, recintosEnMiZoo.length-1);
		recinto = recintosEnMiZoo[indiceAleatorio];
	}
	return recinto;
}

Zoo.prototype.dameListaDeRecintosEnMiZoo = function(){
	var recinto = null;
	var recintosEnMiZoo = [];

	for(var indiceArea=0; indiceArea<this._areas.length; indiceArea++){
		var area = this._areas[indiceArea];
		for(var indiceRecintos=0; indiceRecintos<area._recintos.length; indiceRecintos++){
			var recinto = area._recintos[indiceRecintos];
			//validamos que el recinto pueda recibir personas todavia
			if(recinto._aforoMaximoPersonas>recinto._personas.length){
				recintosEnMiZoo.push(recinto);
			}
		}
	}
	
	return recintosEnMiZoo;
}

Zoo.prototype.crearPersonaAleatoria = function(){
	var edadAleatoria = this._utiles.generarNumeroAleatorioEntre(1, 90);
	var condicion = "Resto";
	
	if (edadAleatoria < 14) {
	    condicion = "Niño";
	} else if ( edadAleatoria > 65) {
	    condicion = "Mayor";
	}

	var nombre = this._utiles.generarNombreAleatorio();
	var nombre = this._utiles.generarNombreAleatorio();
	var edad = edadAleatoria;
	var estudiante = this._utiles.generarNumeroAleatorioEntre(0, 1);
	var condicion = condicion;
	var dinero = this._utiles.generarNumeroAleatorioEntre(0, 1000);

	var persona = new Persona(nombre, edad, estudiante, condicion, dinero);

	return persona;
}

// Añade personas de forma aleatoria
Zoo.prototype.insertarPersonasAleatoriamente = function(numeroPersonas){
	for(var i=0; i<numeroPersonas; i++){
		var persona = this.crearPersonaAleatoria();
		
		var recintoAleatorio = null;

		recintoAleatorio = this.dameRecintoAleatorio();
		if(recintoAleatorio != null)	{
			if(recintoAleatorio._aforoMaximoPersonas>recintoAleatorio._personas.length){
				var precio = 5;
				if(persona._condicion == "Niño"){
					precio = 0;
				}else if(persona._condicion == "Mayor"){
					precio = 0;
				}else if(persona._estudiante == 1){
					precio = 3;
				}

				if(persona._dinero - precio>0){
					persona._dinero = persona._dinero - precio;
					this._caja = this._caja + precio; 
					recintoAleatorio._personas.push(persona);
					this.compraArticulo(persona);
					//persona.dinero.
					console.log (persona._nombre + " agregado a recinto " + recintoAleatorio._nombre);
				}else{
					console.error (persona._nombre + " no tiene dinero y no puede ser agregado a recinto "  + recintoAleatorio._nombre );
				}
				
			}else{
				console.error(persona._nombre + " no cabe en el recinto " + recintoAleatorio._nombre);
			}
		}		
	}
}


//mueve persona a otro recinto:
Zoo.prototype.muevePersonaDeRecinto =  function(recintoActual, recintoNuevo, persona){
	
	var indicePersonaEnRecintoActual = recintoActual._personas.indexOf(persona);
	//retiramos del recinto actual
	if(indicePersonaEnRecintoActual != -1){
		recintoActual._personas.splice(indicePersonaEnRecintoActual, 1);	
	}
	
	//Lo agregamos en el siguiente recinto, si esta lleno no se agrega y visitante se va
	if(recintoNuevo._aforoMaximoPersonas>recintoNuevo._personas.length){
		this.compraArticulo(zoo._tienda, persona);
		recintoNuevo._personas.push(persona);
	}
	
}

Zoo.prototype.mueveTodasLasPersonasDeSusRecintos = function(){
	var listaRecintos = this.dameListaDeRecintosEnMiZoo();

	if(listaRecintos.length>0){//valida si hay recintos con espacio
		//recorremos todos los recintos desde el ultimo al primero
		for(var indRecinto = listaRecintos.length-1 ; indRecinto>=0 ; indRecinto--){

			var recinto = listaRecintos[indRecinto];
			if (indRecinto == (listaRecintos.length-1)){
				//Si es el ultimo recinto borramos todas las personas (las personas se van del zoo)
				recinto._personas.splice(0,recinto._personas.length);
			}else{
				var indiceSiguienteRecinto = indRecinto+1;
				var recintoSiguiente = listaRecintos[indiceSiguienteRecinto];
				for(var indicePersona = recinto._personas.length-1; indicePersona>=0; indicePersona--){
					var persona = recinto._personas[indicePersona];
					this.muevePersonaDeRecinto(recinto, recintoSiguiente , persona);
				}
			}
		}
	}

	//log para validar
	/*listaRecintos = this.dameListaDeRecintosEnMiZoo();

	for(var x = 0; x<listaRecintos.length ; x++){
		var recintov = listaRecintos[x];
		console.log("recinto: " + recintov._nombre + ", Numero de personas: " + recintov._personas.length + "-> ");
		var texto = "";
		for (var i =0 ; i<recintov._personas.length; i++ ){
			var per = recintov._personas[i];
			texto = texto + ", "+ per._nombre;
		}
		console.log(texto);
	}*/
	
}


Zoo.prototype.actualizarSaludDeAnimalesEnfermeria =  function(){

	var animalesEnEnfermeria = this._animalesEnEnfermeria;

	//aumenta salud de animal en efermeria
	for (var indiceAnimalEnfermo = animalesEnEnfermeria.length-1; indiceAnimalEnfermo>=0; indiceAnimalEnfermo--){
		var animalConRecintoYEnfermo = animalesEnEnfermeria[indiceAnimalEnfermo];
		var animal = animalConRecintoYEnfermo._animal;
		var recinto = animalConRecintoYEnfermo._recinto;

		animal._salud = animal._salud + 10;

		if(animal._salud>=100){//Si ya esta sano lo sacamos de enfermeria y lo devolvemos al recinto;
			animalesEnEnfermeria.splice(indiceAnimalEnfermo, 1);
			recinto._animales.push(animal);
		}
	}
}

//funciones de operaciones

Zoo.prototype.imprimirLog =  function(){
	console.clear();
	var tab = "    "; 
	
	console.log("%c///////////////////////IMPRIMIR ESTADO ZOO////////////////////////////", "color: blue; font-size: 14; font-weight: bold");

	console.log("%cAREAS", "color: blue; font-size: 12; font-weight: bold; text-decoration: underline");
	for (var indAreas = 0 ; indAreas<this._areas.length; indAreas ++){
		var area = this._areas[indAreas];
		console.log("%c" + indAreas + ". Area " + area._nombre, "color: #2E64FE;" );

		for(var indRecinto = 0 ; indRecinto<area._recintos.length; indRecinto++){
			var recinto = area._recintos[indRecinto];
			console.log(tab + ">> " + indRecinto + ". Recinto " + recinto._nombre );

			for(indAnimal = 0 ; indAnimal< recinto._animales.length; indAnimal++){
				var animal = recinto._animales[indAnimal];
				console.log(tab + tab + ">> " + indAnimal + ". Animal " + animal._nombre + " " + animal._emoji + " (Salud: " + animal._salud + ")");				

			}
			console.log("%c" + tab + tab + "  Total de visitantes en recinto: " + recinto._personas.length, "color: #5F4C0B;");
		}
	}

	console.log("%cENFERMERIA", "color: blue; font-size: 12; font-weight: bold; text-decoration: underline");
	for (var indiceAnimalEnfermo = 0 ; indiceAnimalEnfermo<this._animalesEnEnfermeria.length; indiceAnimalEnfermo ++){
		var animalEnfermo = this._animalesEnEnfermeria[indiceAnimalEnfermo];
		console.log("%c" + indiceAnimalEnfermo + ". Animal " + animalEnfermo._animal._nombre + " " + animalEnfermo._animal._emoji + " (Salud: " + animalEnfermo._animal._salud + ")", "color:#2E64FE;");		
	}

	if(this._animalesEnEnfermeria.length==0){
		console.log("%cNo hay animales enfermos", "color: #6E6E6E;font-style: italic;");
	}
	
	console.log("%cTIENDA", "color: blue; font-size: 12; font-weight: bold; text-decoration: underline");
	console.log("%cCantidad de Articulos en Tienda: " + this._tienda.length, "color:#2E64FE;");

	console.log("%cCAJA", "color: blue; font-size: 12; font-weight: bold; text-decoration: underline");
	console.log("%cImporte en caja: $" + this._caja + ".00", "color:#2E64FE;");
	console.log("%c///////////////////////FIN IMPRIMIR ESTADO ZOO////////////////////////", "color: blue; font-size: 14; font-weight: bold");
}

Zoo.prototype.alimentarAnimal = function(recinto, animal){
	var indiceAnimalAleatorio = 0;
	if((this._caja - 1000) > 0){
		this._caja = this._caja - 1000;
		animal._hambre = 0;
		//console.log(animal._nombre + " con hambre cero, alimentado por el Zoo");
	} else if(recinto._personas.length>0){
		//console.log("animal.hambre " + animal._hambre);
		if(animal._hambre>=150 && animal._hambre<300 ){
			var indiceAleatorio = this._utiles.generarNumeroAleatorioEntre(0, recinto._personas.length-1);
			var persona = recinto._personas[indiceAleatorio];
			this._caja = this._caja + persona._dinero;
			//console.log(animal._nombre + " se come a persona " + persona.nombre);
			recinto._personas.splice(indiceAleatorio,1);
			animal._hambre = 0;
			//console.log(animal._nombre + " con hambre cero, se comio una persona");
		}else if(animal._hambre>300){

			if(recinto._animales.length>1){//Solo si hay mas de 1 animal, para que no se coma asi mismo
				//console.log("Se come otro animal");
				indiceAnimalAleatorio = this._utiles.generarNumeroAleatorioEntre(0, recinto._animales.length-1);
				do{
					var otroAnimal = recinto._animales[indiceAnimalAleatorio];	
					if(animal != otroAnimal){//no se puede comer asi mismo
						recinto._animales.splice(indiceAnimalAleatorio,1);
					}
					
				}while (animal == otroAnimal);	
			}
						
		}
	}	

}

Zoo.prototype.actualizarEstadoAnimal = function (recinto, animal){
	
	animal.ejecutarCiclo();

	if (animal._hambre>=100){
		//console.log(animal.nombre + " debe ser alimentado, alimentando...");		

		this.alimentarAnimal(recinto, animal);
	}

	if (animal._salud<50){
		//console.log(animal.nombre + " debe ir a Enfermeria");
		//lo mandamos a enfermeria y lo scamos del recinto
		var animalConRecinto = new AnimalConRecinto(animal, recinto);

		this._animalesEnEnfermeria.push(animalConRecinto);
		
		var animales = recinto._animales;
		var indDeAnimalEnRecinto = animales.indexOf(animal);
		if(indDeAnimalEnRecinto>-1){
			animales.splice(indDeAnimalEnRecinto,1);
		}
	}
	
}


Zoo.prototype.ejecutarCiclo = function (){
	/*this._areas.forEach(function (area){
		area.ejecutarCiclo();
	});*/

	this.ejecutarCicloAnimales();

	//Actualizamos salud de animales en enfermeria
	this.actualizarSaludDeAnimalesEnfermeria();

	this.mueveTodasLasPersonasDeSusRecintos();

	this.insertarPersonasAleatoriamente(10);

	
	this._ciclo = this._ciclo + 1;

	if(this._ciclo>100){
		this.cerrarZoo(intervalID);
		console.log("zoológico cerró");
	}	

	this.imprimirLog();


}

Zoo.prototype.ejecutarCicloAnimales = function(){
	//Actualizamos estado de todos los animales
	var listaAnimalesZoo = this.dameListaDeAnimalesConRecinto();
	for(var indiceAnimales=0; indiceAnimales<listaAnimalesZoo.length; indiceAnimales++){
		var animalConRecinto = listaAnimalesZoo[indiceAnimales];
		
		var animal = animalConRecinto._animal;
		var recinto = animalConRecinto._recinto;
		
		this.actualizarEstadoAnimal(recinto, animal);
	}
	
}


function Ubicacion (direccion, ciudad, pais, telefono) {
	this._direccion = direccion;
	this._ciudad = ciudad;
	this._pais = pais;
	this._telefono = telefono;
}

function Articulo(nombre, precio){
	this._nombre = nombre;
	this._precio = precio;
} 

function Area(nombre){
	this._nombre = nombre;
	this._aforo = 0;
	this._recintos = [];
}

Area.prototype.ejecutarCiclo = function (){
	this._recintos.forEach(function (recinto){
		recinto.ejecutarCiclo();
	});
}

Area.prototype.agregarRecinto = function(recinto){
	this._recintos.push(recinto);
	this._aforo = this._aforo + recinto._aforoMaximoPersonas;
}

function Recinto(nombre, aforoMaximoPersonas, aforoMaximoAnimales, detalle){
	this._nombre= nombre;
	this._animales= [];
	this._personas= [];
	this._aforoMaximoPersonas= aforoMaximoPersonas;
	this._aforoMaximoAnimales= aforoMaximoAnimales;
	this._detalle= detalle;	
}

Recinto.prototype.ejecutarCiclo = function (){
	this._animales.forEach(function (animal){
		animal.ejecutarCiclo();
	});
}


function Animal(nombre, especie, salud, hambre, pais, emoji, utiles){
	this._nombre= nombre;
	this._especie= especie;
	this._salud= salud;
	this._hambre= hambre;
	this._pais= pais;
	this._emoji=emoji;
	this._utiles=utiles;
}

Animal.prototype.ganarPerderSaludAleatorio = function(){
	var factorDeSalud = 10;
	if(this._utiles.generarNumeroAleatorioEntre(0, 1)==0){
		factorDeSalud = -10
	}

	this._salud = this._salud + factorDeSalud;

	if(this._salud>100){ this._salud = 100;}
	if(this._salud<0){ this._salud = 0;}
	
}

Animal.prototype.aumentarHambre = function(){			

	var factorDeHambre = 10;
	
	this._hambre = this._hambre + factorDeHambre;			
}

Animal.prototype.ejecutarCiclo= function (){
	//var animal = animalConRecinto.animal;
	//var recinto = animalConRecinto.recinto;
	
	this.aumentarHambre();

	this.ganarPerderSaludAleatorio();	
	
}

function Persona(nombre, edad, estudiante, condicion, dinero){
	this._nombre = nombre;
	this._edad = edad;
	this._estudiante = estudiante;
	this._condicion = condicion;
	this._dinero = dinero;
}

function AnimalConRecinto(animal, recinto){
	this._animal = animal;
	this._recinto =recinto;
} 

var ubicacion = new Ubicacion("Calle de los animalitos 123", "Ciudad de México", "México", 999888777);

var utiles = new Utiles();

var zoo = new Zoo("El último zoológico", ubicacion, 0, 0, utiles);

// Creo animales
var tigreBlanco = new Animal("Tigre Blanco", "Felino", 100, 80, "Egipto", "😺", utiles);
var tigreNormal = new Animal("Tigre Normal", "Felino", 90, 60, "Africa", "🐯", utiles);
var avestruz = new Animal("Avestruz", "Avis Chilensis", 100, 100, "Chile","🐤", utiles);
var flamenco = new Animal("Flamenco", "Phoenicopteridae", 5, 100, "Colombia", "🐔", utiles);
var ballena = new Animal("Ballena", "ballena blanca", 5, 100, "Colombia", "🐳", utiles);
var tiburon = new Animal("Tiburón", "Tiburón Blanco", 50, 100, "Perú", "🐬", utiles);

// Creo recintos 
var recintoTigres = new Recinto("Jaula de tigres", 135, 30, "Jaula super reforzada con titanium");
var recintoAves = new Recinto("Jaula para aves no voladoras", 100, 80, "Algunas aves se pelean mucho");
var recintoPeces = new Recinto("Peces de Mar", 250, 80, "Algunos peces son grandes");

// Creo areas
var areaMamiferos = new Area("Mamíferos");
var areaAves = new Area("Aves");
var areaPeces = new Area("Peces");

// Añado los animales a los recintos
recintoTigres._animales.push(tigreBlanco, tigreNormal);
recintoAves._animales.push(avestruz, flamenco);
recintoPeces._animales.push(ballena, tiburon);


// Añado los recintos a las áreas
areaMamiferos.agregarRecinto(recintoTigres);
areaAves.agregarRecinto(recintoAves);
areaPeces.agregarRecinto(recintoPeces);

//Añado las áreas al zoo
zoo.agregarArea(areaMamiferos);
zoo.agregarArea(areaAves);
zoo.agregarArea(areaPeces);

function ciclo(){
	zoo.ejecutarCiclo();
};

var intervalID =  window.setInterval(ciclo, 10000);