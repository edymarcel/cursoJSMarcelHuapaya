/*
Ejercicio 007__001

1) Modela la clase Vehículo, con las siguientes propiedades:

Marca (aleatorio)
Modelo (aleatorio)
VelocidadMaxima (aleatorio entre 100kmh y 200kmh)
Imagen

2) Realiza la clase carrera que recibirá dos vehículos en su consctrucción. La clase carrera tendrá el método iniciarCarrera() que hará que los dos vehículos compitan.

Una carrera consistirá en ver qué vehículo recorre primero 500 metros. Para ser realista deberás hacer que los vehículos avancen cada segundo los metros correspondientes a sus velocidad.

Ganará el que recorra antes los 500 metros. En caso de llegar a la vez, quedarán empatados e irán a penales. 

Naaaaaaaaah, no hay penales. Pero sí que pueden empatar.

3) Pinta en tu html la carrera. Haz uso de funciones de manejo del DOM, y haz uso de CSS para modificar su posición. Los coches deberán desplazarse desde la izquierda de la pantalla hasta la derecha donde se encontrará la meta.

AYUDA:

function getMetrosQueAvanzaCadaSegundo(velocidadEnKmh){
    var metros = velocidadEnKmh*1000/3600;
    return metros;
}

 */

class Utiles{
	static generarNumeroAleatorioEntre(minimo, maximo){
		let anchoFranjaNumerica = (maximo-minimo) + 1;
		let numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

		return numero;
	}

	static generarMarcaAleatorio(){
		let nombres = ["Audi", "FIAT", "Ferrari", "Ford", "Alfa Romeo", "BMW", "BYD", "CITROEN", "HONDA", "IZUSu", "KIA"];
		let indice = this.generarNumeroAleatorioEntre(0, nombres.length-1);

		return nombres[indice];
	}

	static generarModeloAleatorio(){
		let nombres = ["A1", "A3", "A4", "Q2", "Q3", "Q5", "Mito", "Estelvio", "X1", "X3", "X4", "X5", "I3", "I8"];
		let indice = this.generarNumeroAleatorioEntre(0, nombres.length-1);

		return nombres[indice];
	}

	static getMetrosQueAvanzaCadaSegundo(velocidadEnKmh){
	    let metros = velocidadEnKmh*1000/3600;
	    return metros;
	}

	static crearElementoConUnAtributo(tipo, atributo, valorAtributo){
		let elemento = document.createElement(tipo);
		if(typeof atributo !== 'undefined'){
			elemento.setAttribute(atributo, valorAtributo);
		}	
		
		return elemento;
	}

	static getSegundosSegunVelocidadMaxYDistancia(velocidadMax){
		//espacio = velocidad * tiempo;

		velocidadMax = parseFloat(velocidadMax);

		let velocidad = velocidadMax *(1000/3600); 

		//tiempo = espacio (m)/velocidad;

		let tiempoEnSegundos = 500/velocidad
		return tiempoEnSegundos.toFixed(2);
	}

	static getSegundosSegunVelocidadMaxYTramo(velocidadMax){

		let tramo = parseFloat(this.getMetrosQueAvanzaCadaSegundo(velocidadMax));
		velocidadMax = parseFloat(velocidadMax);

		let velocidad = velocidadMax *(1000/3600); 

		let tiempoEnSegundos = tramo/velocidad
		return tiempoEnSegundos;
	}

	static ordenarArrayPor(campo, reversa, primer){

	   let key = primer ? 
	       function(x) {return primer(x[campo])} : 
	       function(x) {return x[campo]};

	   reversa = !reversa ? 1 : -1;

	   return function (a, b) {
	       return a = key(a), b = key(b), reversa * ((a > b) - (b > a));
	     } 
	}	
}

class Vehiculo{
	constructor(marca, modelo, velocidadMax, imagen){
	 	this._marca = marca;
	 	this._modelo = modelo;
	 	this._velocidadMax = velocidadMax;
	 	this._imagen = imagen;
	 	this._avance = 0;
	 	this._segundos = 0; 
	}
}

class Carrera{
	constructor(){
	 	this._vehiculos = [];
	 	this._vehiculosOrdenLlegada = [];
 	}

 	crearVehiculos(numero){
		for(let i = 0 ; i<numero; i++){
			let marca = Utiles.generarMarcaAleatorio();
			let modelo = Utiles.generarModeloAleatorio();
			let velocidadMax = Utiles.generarNumeroAleatorioEntre(100, 200);
			let imagen = "imagenes/vehiculo" + Utiles.generarNumeroAleatorioEntre(1, 10) + ".png";
			let vehiculo = new Vehiculo(marca, modelo, velocidadMax,imagen);
			this._vehiculos.push(vehiculo);
		}
	}

	iniciarCarrera(){	
		for(let i = 0; i<this._vehiculos.length;i++){
			let vehiculo = this._vehiculos[i];

			let velocidadMax = vehiculo._velocidadMax + Utiles.generarNumeroAleatorioEntre(-100,100);
			//console.log(velocidadMax);
			vehiculo._avance = vehiculo._avance + Utiles.getMetrosQueAvanzaCadaSegundo(velocidadMax);		

			if(vehiculo._avance>=500){
				if(this._vehiculosOrdenLlegada.indexOf(vehiculo)==-1){
					this._vehiculosOrdenLlegada.push(vehiculo);
				}
				vehiculo._avance = 500;
			}else{
				vehiculo._segundos = vehiculo._segundos + Utiles.getSegundosSegunVelocidadMaxYTramo(velocidadMax);
			}

			console.log("VelocidadTramo: " + velocidadMax + ", Marca " + vehiculo._marca + ", Modelo: " + vehiculo._modelo + ", segundos: " + vehiculo._segundos + ", velocidadMax: " + vehiculo._velocidadMax);

			//console.log(vehiculo);

			this.mueveVehiculo(vehiculo._avance, "imagen" + i);		
		}

		console.log("Fin tramo");
		if(this.verificarTerminoCarrera()){
				
			window.clearInterval(intervalID);

		}
		
	}
	
	verificarTerminoCarrera(){
		let divMensaje = document.getElementById("mensaje");

		let terminoCarrera = false;


		if(this._vehiculos.length==this._vehiculosOrdenLlegada.length){
			terminoCarrera = true;
		}

		if(terminoCarrera){
			let tabla = this.crearTablaDePosiciones();
			for (let x = 0; x < this._vehiculosOrdenLlegada.length; x++) {
				let vehiculo = this._vehiculosOrdenLlegada[x];
				let posicion = x+1;
				this.agregarFilaATabla(tabla, posicion, vehiculo._segundos, vehiculo._imagen, vehiculo._marca, vehiculo._modelo, vehiculo._velocidadMax);
			}

			divMensaje.appendChild(tabla);
		}


		return terminoCarrera;
	}

	crearTablaDePosiciones(){
		let tabla = Utiles.crearElementoConUnAtributo("table", "id", "tabla");
		let trCabecera = Utiles.crearElementoConUnAtributo("tr", "class", "cabecera");
		let arrColumnas = ["Posición", "Tiempo (s)", "Imagen", "Marca", "Modelo", "Velocidad"];
		
		for (let i = 0; i < arrColumnas.length; i++) {
			let thCabecera = Utiles.crearElementoConUnAtributo("th", "class", "trcabecera");
			thCabecera.innerHTML = arrColumnas[i];
			trCabecera.appendChild(thCabecera);
		}

		tabla.appendChild(trCabecera);
		
		return tabla;
	}

	agregarFilaATabla(tabla, posicion, tiempo, imagen, marca, modelo, velocidad){
		
		let trCabecera = Utiles.crearElementoConUnAtributo("tr", "class", "valor");
		let array = [];
		array.push(posicion);
		array.push(tiempo);
		let img = '<img class = "imagenpequena" src = "' + imagen + '"></img>';;
		array.push(img);
		array.push(marca);
		array.push(modelo);
		array.push(velocidad);

		for (let i = 0; i < array.length; i++) {
			let tdValor = Utiles.crearElementoConUnAtributo("td", "class", "trvalor");
			tdValor.innerHTML = array[i];
			trCabecera.appendChild(tdValor);
		}

		tabla.appendChild(trCabecera);

	}


	crearCarriles(){

		let body = document.body;
		
		let divMensaje = Utiles.crearElementoConUnAtributo("div", "id", "mensaje");
		body.appendChild(divMensaje);

		let divCarrera = Utiles.crearElementoConUnAtributo("div", "class", "carrera");
		body.appendChild(divCarrera);

		for (let i = 0; i < this._vehiculos.length; i++) {		
			let divRow = Utiles.crearElementoConUnAtributo("div", "class","menu-sup row" + i);
			let img = Utiles.crearElementoConUnAtributo("img", "src", this._vehiculos[i]._imagen);
			img.setAttribute("id", "imagen" + i);
			divRow.appendChild(img);

			divCarrera.appendChild(divRow);
		}	
	}

	mueveVehiculo(avance, id){
		let medida = (1000/500)*avance;	

		let elemento = document.getElementById(id);
		
		elemento.setAttribute("style", "margin-left:" + medida + "px");
		
		//elemento.setAttribute(atributo, valorAtributo);

	}
}

var carrera = new Carrera();



var intervalID;

window.onload = function (){

	
	function delayed() {
	  intervalID = window.setInterval(crearIntervaloDeUnSegundo, 1000);
	}

	carrera.crearVehiculos(4);
	carrera.crearCarriles();

	function crearIntervaloDeUnSegundo(){

		carrera.iniciarCarrera();
	}

	delayed();
}