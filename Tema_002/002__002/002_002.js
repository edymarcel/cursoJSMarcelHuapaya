/*

1) Haciendo uso de funciones y new, realiza una "clase" Vikingo que almacene la información de un vikingo:

nombre
salud (0 - 100)
potenciaAtaque (1 - 20)
valocidad (0 - 100)

2) Haz uso de prototype y añade un método .ataca(vikingo) a un vikingo para que ataque a su oponente.
el ataque quitara salud al vikingo atacado (la potencia de ataque del atacante)

3) Realiza una clase Batalla() que en su creación reciba dos vikingos.

Batalla tendrá un método iniciarPelea que realizará la pelea entre ambos vikingos.

Una batalla tendrá una serie de asaltos en los que:

atacará primero el que más valocidad tenga,
y quitará de salud al rival su potencia de ataque,
hasta que uno de los dos muera. (salud <= 0)

4) Crear la clase Arma() tenga un tipo: (espada/cuchillo...etc), una potencia (20 - 50) y un ataquesRestantes (0 -10).

5) Añade una propiedad armas a Vikingo para que pueda poseer varias armaspara su batalla.
Añade el método addArma() para añadir armas a los vikingos,

6) Modifica la función ataca del vikingo, para que si tiene armas disponibles ataque con el arma más potente.
Cada vez que se use un arma, debera restar uno a ataquesRestantes de ese arma.
Cuando el arma tenga 0 ataquesRestantes, el vikingo deberá abandonar el arma (añade la función abandonarArma al vikingo).

*/

function Utiles(){
	//this._descripcion = "";
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


var utiles = new Utiles();

function Vikingo (nombre, potenciaAtaque, velocidad, dinero){
	this._nombre = nombre;
	this._salud = 100;
	this._potenciaAtaque = potenciaAtaque;
	this._velocidad = velocidad; 
	this._armas = [];
	this.dinero = dinero;
}

Vikingo.prototype.ataca = function (atacado){
	if (this._armas.length>0){

		//Buscar arma con mas potencia
		var potenciaArmaMasPotente = 0;
		var idArmaMasPotente = 0;
		var armaMasPotente = null;

		for (var i = 0; i < this._armas.length; i++) {
			if(potenciaArmaMasPotente < this._armas[i]._potencia){
				potenciaArmaMasPotente = this._armas[i]._potencia;
				armaMasPotente = this._armas[i];
			}
		}		

		

		console.log("Ataque con arma: " + armaMasPotente._tipo + ", Potencia de arma: " + armaMasPotente._potencia);

		armaMasPotente._ataquesRestantes = armaMasPotente._ataquesRestantes-1;

		if(armaMasPotente._ataquesRestantes <= 0){
			this.abandonarArma(armaMasPotente);
		}

		atacado._salud = atacado._salud - potenciaArmaMasPotente; 		
	}else{
		atacado._salud = atacado._salud - this._potenciaAtaque; 
		console.log("Ataque sin armas, potencia Ataque: " + this._potenciaAtaque);
	}

	if (atacado._salud < 0){
		atacado._salud = 0;
	}
	
}

Vikingo.prototype.abandonarArma = function(arma){
	var indiceArma = this._armas.indexOf(arma);
	if (indiceArma!= -1){
		this._armas.splice(indiceArma, 1);
	}

}

Vikingo.prototype.addArma = function (){
	var arrayTipos = ["espada", "cuchillo", "piedra"];
	var tipo = arrayTipos[utiles.generarNumeroAleatorioEntre(0,2)];
	var potencia = utiles.generarNumeroAleatorioEntre(20,50);
	var ataquesRestantes = utiles.generarNumeroAleatorioEntre(0,10)
	var arma = new Arma(tipo, potencia, ataquesRestantes);
	this._armas.push(arma);
}

Vikingo.prototype.addArmasAleatoriamente = function (numeroArmas){
	for (var i = 0; i < numeroArmas; i++) {
		this.addArma();
	}
}

Vikingo.prototype.quitarDinero = function (vikingo){
	console.log(this._nombre + " quita dinero a " + vikingo._nombre);
	this._dinero = this._dinero + vikingo._dinero;
	vikingo._dinero = 0;
}

Vikingo.prototype.quitarArmaAOtroVikingo = function (vikingo){
	console.log(this._nombre + " quita armas a " + vikingo._nombre);
	this._armas.concat(vikingo._armas);
	vikingo._armas.splice(0,vikingo._armas.length);
}

function Batalla(vikingo1, vikingo2){
	this._vikingo1 = vikingo1;
	this._vikingo2 = vikingo2;
}

Batalla.prototype.iniciarPelea = function(){
	var atacante = null;
	var atacado = null;
	
	if(this._vikingo1._velocidad>this._vikingo2._velocidad){
		atacante = this._vikingo1;
		atacado = this._vikingo2;
	}else{
		atacante = this._vikingo2;
		atacado = this._vikingo1;
	}

	do{
		atacante.ataca(atacado);
		console.log("Atacante: "+ atacante._nombre + ", Velocidad: " + atacante._velocidad + ", Salud: " + atacante._salud);
		console.log("Atacado: "+ atacado._nombre + ", Velocidad: " + atacado._velocidad  + ", Salud: " + atacado._salud);
		console.log("Fin Ataque");
		cambioDeTurno = atacante;
		atacante = atacado;
		atacado = cambioDeTurno;

	}while(atacante._salud>0 &&  atacado._salud>0);

	if(atacado._salud <= 0){

		atacante.quitarDinero(atacado);
		atacante.quitarArmaAOtroVikingo(atacado);

	}else{
		atacado.quitarDinero(atacante);
		atacado.quitarArmaAOtroVikingo(atacante);
		
	}	

}

Batalla.prototype.crearVikingoAleatorio = function(){
	var potenciaAtaque = utiles.generarNumeroAleatorioEntre(1, 20);
	var nombre = utiles.generarNombreAleatorio();
	var velocidad = utiles.generarNumeroAleatorioEntre(0, 100);
	var dinero = utiles.generarNumeroAleatorioEntre(0, 200);

	var vikingo = new Vikingo(nombre, potenciaAtaque, velocidad);

	vikingo.addArmasAleatoriamente(utiles.generarNumeroAleatorioEntre(0, 3));

	return vikingo;
}

// Añade personas de forma aleatoria
Batalla.prototype.crearVikingos = function(){

	this._vikingo1 = this.crearVikingoAleatorio();	
	this._vikingo2 = this.crearVikingoAleatorio();	
}


function Arma(tipo, potencia, ataquesRestantes){
	this._tipo = tipo;
	this._potencia = potencia;
	this._ataquesRestantes = ataquesRestantes;

}


//seleccionar 
var batalla = new Batalla();

batalla.crearVikingos();

batalla.iniciarPelea();
