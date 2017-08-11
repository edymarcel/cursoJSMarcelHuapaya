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

function Utiles(){
	this._descripcion = "";
}

Utiles.prototype.generarNumeroAleatorioEntre = function(minimo, maximo){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

	return numero;
}

Utiles.prototype.generarMarcaAleatorio = function(){
	var nombres = ["Audi", "FIAT", "Ferrari", "Ford", "Alfa Romeo", "BMW", "BYD", "CITROEN", "HONDA", "IZUSu", "KIA"];
	var indice = this.generarNumeroAleatorioEntre(0, nombres.length-1);

	return nombres[indice];
}

Utiles.prototype.generarModeloAleatorio = function(){
	var nombres = ["A1", "A3", "A4", "Q2", "Q3", "Q5", "Mito", "Estelvio", "X1", "X3", "X4", "X5", "I3", "I8"];
	var indice = this.generarNumeroAleatorioEntre(0, nombres.length-1);

	return nombres[indice];
}

Utiles.prototype.getMetrosQueAvanzaCadaSegundo = function(velocidadEnKmh){
    var metros = velocidadEnKmh*1000/3600;
    return metros;
}

Utiles.prototype.crearElementoConUnAtributo = function(tipo, atributo, valorAtributo){
	var elemento = document.createElement(tipo);
	if(typeof atributo !== 'undefined'){
		elemento.setAttribute(atributo, valorAtributo);
	}	
	
	return elemento;
}

Utiles.prototype.getSegundosSegunVelocidadMaxYDistancia = function (velocidadMax){
	//espacio = velocidad * tiempo;

	var velocidadMax = parseFloat(velocidadMax);

	var velocidad = velocidadMax *(1000/3600); 

	//tiempo = espacio (m)/velocidad;

	var tiempoEnSegundos = 500/velocidad
	return tiempoEnSegundos.toFixed(2);
}

Utiles.prototype.getSegundosSegunVelocidadMaxYTramo = function (velocidadMax){

	var tramo = parseFloat(this.getMetrosQueAvanzaCadaSegundo(velocidadMax));
	var velocidadMax = parseFloat(velocidadMax);

	var velocidad = velocidadMax *(1000/3600); 

	var tiempoEnSegundos = tramo/velocidad
	return tiempoEnSegundos;
}

Utiles.prototype.ordenarArrayPor = function(campo, reversa, primer){

   var key = primer ? 
       function(x) {return primer(x[campo])} : 
       function(x) {return x[campo]};

   reversa = !reversa ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reversa * ((a > b) - (b > a));
     } 
}

function Vehiculo(marca, modelo, velocidadMax, imagen){
 	this._marca = marca;
 	this._modelo = modelo;
 	this._velocidadMax = velocidadMax;
 	this._imagen = imagen;
 	this._avance = 0;
 	this._segundos = 0; 
}

function Carrera(){
 	this._vehiculos = [];
 	this._vehiculosOrdenLlegada = [];

}

var utiles = new Utiles();
var carrera = new Carrera();

Carrera.prototype.crearVehiculos = function(numero){
	for(var i = 0 ; i<numero; i++){
		var marca = utiles.generarMarcaAleatorio();
		var modelo = utiles.generarModeloAleatorio();
		var velocidadMax = utiles.generarNumeroAleatorioEntre(100, 200);
		var imagen = "imagenes/vehiculo" + utiles.generarNumeroAleatorioEntre(1, 10) + ".png";
		var vehiculo = new Vehiculo(marca, modelo, velocidadMax,imagen);
		this._vehiculos.push(vehiculo);
	}
}

Carrera.prototype.iniciarCarrera =  function(){	
	for(var i = 0; i<this._vehiculos.length;i++){
		var vehiculo = this._vehiculos[i];

		var velocidadMax = vehiculo._velocidadMax + utiles.generarNumeroAleatorioEntre(-100,100);
		//console.log(velocidadMax);
		vehiculo._avance = vehiculo._avance + utiles.getMetrosQueAvanzaCadaSegundo(velocidadMax);		

		if(vehiculo._avance>=500){
			if(this._vehiculosOrdenLlegada.indexOf(vehiculo)==-1){
				this._vehiculosOrdenLlegada.push(vehiculo);
			}
			vehiculo._avance = 500;
		}else{
			vehiculo._segundos = vehiculo._segundos + utiles.getSegundosSegunVelocidadMaxYTramo(velocidadMax);
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
Carrera.prototype.verificarTerminoCarrera = function(){
	var divMensaje = document.getElementById("mensaje");

	var mensaje = "";
	mensaje.innerHTML = mensaje;

	var terminoCarrera = false;

	/*for (var i = 0; i < this._vehiculos.length; i++) {
		//Verificar que todos hayan llegado
		if(this._vehiculos[i]._avance != 500){
			terminoCarrera = false;
		}
		
	}*/

	if(this._vehiculos.length==this._vehiculosOrdenLlegada.length){
		terminoCarrera = true;
	}

	if(terminoCarrera){
		var tabla = this.crearTablaDePosiciones();
		for (var x = 0; x < this._vehiculosOrdenLlegada.length; x++) {
			var vehiculo = this._vehiculosOrdenLlegada[x];
			var posicion = x+1;
			this.agregarFilaATabla(tabla, posicion, vehiculo._segundos, vehiculo._imagen, vehiculo._marca, vehiculo._modelo, vehiculo._velocidadMax);
		}

		divMensaje.appendChild(tabla);
	}


	return terminoCarrera;
}

Carrera.prototype.crearTablaDePosiciones = function(){
	var tabla = utiles.crearElementoConUnAtributo("table", "id", "tabla");
	var trCabecera = utiles.crearElementoConUnAtributo("tr", "class", "cabecera");
	var arrColumnas = ["Posición", "Tiempo (s)", "Imagen", "Marca", "Modelo", "Velocidad"];
	
	for (var i = 0; i < arrColumnas.length; i++) {
		var thCabecera = utiles.crearElementoConUnAtributo("th", "class", "trcabecera");
		thCabecera.innerHTML = arrColumnas[i];
		trCabecera.appendChild(thCabecera);
	}

	tabla.appendChild(trCabecera);
	
	return tabla;
}

Carrera.prototype.agregarFilaATabla = function(tabla, posicion, tiempo, imagen, marca, modelo, velocidad){
	
	var trCabecera = utiles.crearElementoConUnAtributo("tr", "class", "valor");
	var array = [];
	array.push(posicion);
	array.push(tiempo);
	var img = '<img class = "imagenpequena" src = "' + imagen + '"></img>';;
	array.push(img);
	array.push(marca);
	array.push(modelo);
	array.push(velocidad);

	for (var i = 0; i < array.length; i++) {
		var tdValor = utiles.crearElementoConUnAtributo("td", "class", "trvalor");
		tdValor.innerHTML = array[i];
		trCabecera.appendChild(tdValor);
	}

	tabla.appendChild(trCabecera);

}


Carrera.prototype.crearCarriles = function(){

	var body = document.body;
	
	var divMensaje = utiles.crearElementoConUnAtributo("div", "id", "mensaje");
	body.appendChild(divMensaje);

	var divCarrera = utiles.crearElementoConUnAtributo("div", "class", "carrera");
	body.appendChild(divCarrera);

	for (var i = 0; i < this._vehiculos.length; i++) {		
		var divRow = utiles.crearElementoConUnAtributo("div", "class","menu-sup row" + i);
		var img = utiles.crearElementoConUnAtributo("img", "src", this._vehiculos[i]._imagen);
		img.setAttribute("id", "imagen" + i);
		divRow.appendChild(img);

		divCarrera.appendChild(divRow);
	}	
}

Carrera.prototype.mueveVehiculo = function(avance, id){
	medida = (1000/500)*avance;	

	var elemento = document.getElementById(id);
	
	elemento.setAttribute("style", "margin-left:" + medida + "px");
	
	//elemento.setAttribute(atributo, valorAtributo);

}

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