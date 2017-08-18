/*

1)	Define	una	clase	Persona	que	tenga	los	siguientes	atributos:
	Nombre:	
	Edad:
	Nacionalidad:
	Altura:	
	Peso:
	Enfermo:	true/false
	
2)	Definir	la	clase	Jugador	que	herede	de	persona	y	tenga	los	siguientes	atributos:
	Posición:	(portero/defensa/mediocentro/delantero)
	Numero:	
	Calidad:	(0-100)
La	posición	de	cada	jugador	es	completamente	aleatoria
El	estar	enfermo	o	no,	es	aleatorio	(10%	de	probabilidad	de	estar	enfermo)
3)	Definir	la	clase	Equipo	que	tenga:
	- Array	de	jugadores
	- Entrenador	
Un	equipo	tendrá	22	jugadores	creados	aleatoriamente
4)	Definir	la	clase	Entrenador	que	herede	de	Persona	y	tenga	los	siguientes	métodos:
	- elegirPlantillaParaPartido()	que	elegirá	de	sus	jugadores	a	los	mejores	para	un	
partido:
				1	portero
				4	defensas
				4	mediocentros
				2	delanteros
5)	Define	la	clase	partido	que	se	cree	a	partir	de	dos	equipos.
La	clase	partido	tendrá	el	método	jugarPartido	que	hará	que	se	dispute.
Lógica	del	partido:
Cada	equipo	hará	10	ataques	que	funcionarán	de	la	siguiente	manera

Por	ejemplo:

Si	ataca	el	equipo	1	se	calculará:
A	=	(Suma	de	calidad	de	medio	centros	equipo	1)	- (Suma	de	calidad	de	medio	centros	
equipo	2)
B	=	(Suma	de	calidad	de	delanteros	1)	- (Suma	de	calidad	de	defensas	equipo	2)
C	=	A	+	B	- (Suma	de	calidad	de	portero	equipo	2)
Fortuna	=	numero	aleatorio	entre	200	y	300
Para	cada	jugador	que	no	esté	en	su	puesto	del	equipo	1:	
C	=	C	- 10
Para	cada	jugador	que	no	esté	en	su	puesto	del	equipo	2:	
C	=	C	+	10
TOTAL	=	C	+	Fortuna
Si	total	es	mayor	que	cero	->	GOOOOOOOL
Si	total	es	igual	a	cero	->	PALO	!!!
Si	total	es	menor	que	cero	->	Ná	de	ná
AL	finalizar	el	partido	deberá	mostrarse	el	resultado

*/



class Utiles{
	static generarNumeroAleatorioEntre(minimo, maximo){
		let anchoFranjaNumerica = (maximo-minimo) + 1;
		let numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

		return numero;
	}

	static generarPosicionAleatorio(){
		let posicion = ["portero","defensa","mediocentro","delantero"];
		let indice = this.generarNumeroAleatorioEntre(0, posicion.length-1);

		return posicion[indice];
	}

	static verificarProbabilidad(numero){
		let valor = this.generarNumeroAleatorioEntre(1, 100);
		let probabilidad = false;
		if(valor<=numero){
			probabilidad = true;
		}

		return probabilidad;
	}

	static generarNombreAleatorio(){
		let nombresNegados = ["Carlos", "Daniel", "Fabian", "Juan", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
		let indice = this.generarNumeroAleatorioEntre(0, nombresNegados.length-1);

		return nombresNegados[indice];
	}

	static generarPaisAleatorio(){
		let pais = ["Perú", "Colombia", "España"];
		let indice = this.generarNumeroAleatorioEntre(0, pais.length-1);

		return pais[indice];
	}

	static crearTabla(arrColumnas){
		let tabla = Utiles.crearElementoConUnAtributo("table", [new Atributo("id", "tabla")]);
		let trCabecera = Utiles.crearElementoConUnAtributo("tr", [new Atributo("class", "cabecera")]);
		//let arrColumnas = ["Nro. Ataque", "Ataca", "Defiende", "Puntos", "Resultado"];
		
		for (let i = 0; i < arrColumnas.length; i++) {
			let thCabecera = Utiles.crearElementoConUnAtributo("th", [new Atributo("class", "trcabecera")]);
			thCabecera.innerHTML = arrColumnas[i];
			trCabecera.appendChild(thCabecera);
		}

		tabla.appendChild(trCabecera);
		
		return tabla;
	}

	static agregarFilaATabla(tabla, array){
		
		let trCabecera = Utiles.crearElementoConUnAtributo("tr", [new Atributo("class", "valor")]);
	
		for (let i = 0; i < array.length; i++) {
			let tdValor = Utiles.crearElementoConUnAtributo("td", [new Atributo("class", "trvalor")]);
			tdValor.innerHTML = array[i];
			trCabecera.appendChild(tdValor);
		}

		tabla.appendChild(trCabecera);

	}


	static crearElementoConUnAtributo(tipo, atributos){
		let elemento = document.createElement(tipo);
		if(typeof atributos !== 'undefined'){
			for (var i = 0; i < atributos.length; i++) {			
			let atributo = atributos[i]._atributo;
			let valorAtributo = atributos[i]._valor;		
			elemento.setAttribute(atributo, valorAtributo);
			}
		}	
		
		return elemento;
	}

	static ordenarArrayPorCampo(array, campo){
		return array.sort(function (a, b){
		    return (b[campo] - a[campo])
		})
	}


}

class Atributo{
	constructor(atributo, valor){
		this._atributo = atributo;
		this._valor = valor;
	}
}


class Persona {
	constructor(nombre, edad,nacionalidad, altura, peso,enfermo){
		this._nombre = nombre;	
		this._edad = edad;
		this._nacionalidad = nacionalidad;
		this._altura = altura;
		this._peso = peso;
		this._enfermo = enfermo;
	}
}

class Jugador extends Persona{
	constructor(numero){
		let nombre = Utiles.generarNombreAleatorio();
		let edad = Utiles.generarNumeroAleatorioEntre(16,40);
		let nacionalidad = Utiles.generarPaisAleatorio();
		let altura = Utiles.generarNumeroAleatorioEntre(160,200);
		let peso =  Utiles.generarNumeroAleatorioEntre(160,200);
		let enfermo = Utiles.verificarProbabilidad(10);

		super(nombre, edad, nacionalidad, altura, peso, enfermo);
		this._posicion = Utiles.generarPosicionAleatorio();//portero/defensa/mediocentro/delantero
		this._numero = numero;
		this._calidad = Utiles.generarNumeroAleatorioEntre(0,100); //0-100		
	}
}

class Equipo{
	constructor(nombre,entrenador){
		this._nombre = nombre;
		this._jugadores = [];
		this._entrenador = entrenador;
		this.agregarJugadoresAEquipo();
	}

	agregarJugadoresAEquipo(){
		for (var i = 0; i < 22; i++) {
			this._jugadores.push(new Jugador(i));
		}
	}
	
}

class Entrenador extends Persona{
	constructor(){
		let nombre = Utiles.generarNombreAleatorio();
		let edad = Utiles.generarNumeroAleatorioEntre(25,70);
		let nacionalidad = Utiles.generarPaisAleatorio();
		let altura = Utiles.generarNumeroAleatorioEntre(160,200);
		let peso =  Utiles.generarNumeroAleatorioEntre(160,200);
		let enfermo = Utiles.verificarProbabilidad(10);
		super(nombre, edad, nacionalidad, altura, peso, enfermo);	
		//array de jugadores seleccionados
		//0:Portero, 1-4:defensas, 5-8: mediocampos, 9-10: delanteros		
		this._plantilla = [];
	}

	elegirPlantillaParaPartido(equipo){
		let arrayJugadores = equipo._jugadores;
		let porteros = [];
		let defensas = [];
		let mediocentros = [];
		let delanteros = [];

		for (let i = 0; i < arrayJugadores.length; i++) {
			if(arrayJugadores[i]._posicion == "portero"){
				porteros.push(arrayJugadores[i]);
			}else if(arrayJugadores[i]._posicion == "defensa"){
				defensas.push(arrayJugadores[i]);
			}else if(arrayJugadores[i]._posicion == "mediocentro"){
				mediocentros.push(arrayJugadores[i]);
			}else if(arrayJugadores[i]._posicion == "delantero"){
				delanteros.push(arrayJugadores[i]);
			}

		}
		
		//ordenar por calidad
		porteros = Utiles.ordenarArrayPorCampo(porteros, "_calidad");
		defensas = Utiles.ordenarArrayPorCampo(defensas, "_calidad");
		mediocentros = Utiles.ordenarArrayPorCampo(mediocentros, "_calidad");
		delanteros = Utiles.ordenarArrayPorCampo(delanteros, "_calidad");

		this.elegirMejorJugador(porteros, 1, porteros, defensas, mediocentros, delanteros);
		this.elegirMejorJugador(defensas, 4, porteros, defensas, mediocentros, delanteros);
		this.elegirMejorJugador(mediocentros, 4, porteros, defensas, mediocentros, delanteros);
		this.elegirMejorJugador(delanteros, 2, porteros, defensas, mediocentros, delanteros);
		console.log(this._plantilla);
	}

	elegirJugadorAleatorio(porteros, defensas, mediocentros, delanteros){
		let arrayJugadores = porteros.concat(defensas).concat(mediocentros).concat(delanteros);

		let numero = Utiles.generarNumeroAleatorioEntre(0,arrayJugadores.length-1);
		let seleccionado = arrayJugadores[numero];		
		this._plantilla.push(seleccionado);
		if(porteros.indexOf(seleccionado)!=-1){
			porteros.splice(porteros.indexOf(seleccionado), 1);
		}
		if(defensas.indexOf(seleccionado)!=-1){
			defensas.splice(defensas.indexOf(seleccionado), 1);
		}
		if(mediocentros.indexOf(seleccionado)!=-1){
			mediocentros.splice(mediocentros.indexOf(seleccionado), 1);
		}
		if(delanteros.indexOf(seleccionado)!=-1){
			delanteros.splice(delanteros.indexOf(seleccionado), 1);
		}

	}

	elegirMejorJugador(arrayDeJugadores, cantidad, porteros, defensas, mediocentros, delanteros){
		let cont = 0
		while(arrayDeJugadores.length>0 && (cont<cantidad)){
			this._plantilla.push(arrayDeJugadores[0]);
			arrayDeJugadores.splice(0, 1);
			cont = cont +1;
		}
		if(cont<cantidad){
			for (var i = 0; i < cantidad-cont; i++) {
				this.elegirJugadorAleatorio(porteros, defensas, mediocentros, delanteros);				
			}
		}

		//console.log(this._plantilla.length);

	}

}


class Partido{
	constructor(equipo1, equipo2){
		this._equipo1 = equipo1;
		this._equipo2 = equipo2;
		this._resultadosAtaques = [];
	}

	sumaCalidad(desde, hasta, equipo){
		let jugadores = equipo._entrenador._plantilla;
		let resultado = 0;
		for (let i = desde; i <= hasta; i++) {			
			resultado = resultado + jugadores[i]._calidad;
		}		
		return resultado;
	}

	obtenerPenalidadPorJugadorEnPuestoIncorrecto(equipo){
		let jugadores = equipo._entrenador._plantilla;
		let resultado = 0;
		for (let i = 0; i < jugadores.length; i++) {
			if(i == 0){//verificar portero
				if(jugadores[i]._posicion != "portero"){
					resultado = resultado + 10;
				}
			}else if(i>=1 && i<=4){
				if(jugadores[i]._posicion != "defensa"){
					resultado = resultado + 10;
				}
			}else if(i>=5 && i<=8){
				if(jugadores[i]._posicion != "mediocentro"){
					resultado = resultado + 10;
				}
			}else if(i>=9 && i<=10){
				if(jugadores[i]._posicion != "delantero"){
					resultado = resultado + 10;
				}
			}			
		}
		return resultado;
	}


	atacar(equipo1, equipo2){
		let sumaCalidadMediosCentrosEq1 = this.sumaCalidad(5,8, equipo1);
		let sumaCalidadMediosCentrosEq2 = this.sumaCalidad(5,8, equipo2);

		let sumaCalidadDelanterosEq1 = this.sumaCalidad(9,10, equipo1);
		let sumaCalidadDefensasEq2 = this.sumaCalidad(1,4, equipo2);
		
		let sumaCalidadPorteroEq2 = this.sumaCalidad(0,0, equipo2);

		let fortuna = Utiles.generarNumeroAleatorioEntre(200, 300);

		let a = sumaCalidadMediosCentrosEq1 - sumaCalidadMediosCentrosEq2;
		let b = sumaCalidadDelanterosEq1 - sumaCalidadDefensasEq2;
		let c = a + b - sumaCalidadPorteroEq2;
		c = c - this.obtenerPenalidadPorJugadorEnPuestoIncorrecto( equipo1);
		c = c + this.obtenerPenalidadPorJugadorEnPuestoIncorrecto( equipo2);
		c = c + fortuna;
		return c;
	}

	jugarPartido(){

		this._equipo1._entrenador.elegirPlantillaParaPartido(this._equipo1);
		this._equipo2._entrenador.elegirPlantillaParaPartido(this._equipo2);
		for (var i = 0; i < 10; i++) {
			let valorAtaque1 = this.atacar(this._equipo1, this._equipo2);
			let resAtaque1 = new ResultadoAtaque(this._equipo1, this._equipo2, valorAtaque1);
			this._resultadosAtaques.push(resAtaque1);

			let valorAtaque2 = this.atacar(this._equipo2, this._equipo1);
			let resAtaque2 = new ResultadoAtaque(this._equipo2, this._equipo1, valorAtaque2);
			this._resultadosAtaques.push(resAtaque2);
		}

		this.pintarResultado();
	}

	pintarResultado(){
		let arrColumnas = ["Nro. Ataque", "Ataca", "Defiende", "Puntos", "Resultado"];
		let tabla = Utiles.crearTabla(arrColumnas);
		let golesEq1 = 0;
		let golesEq2 = 0;
		let ataca = "";
		let defiende = "";
		for (var i = 0; i < this._resultadosAtaques.length; i++) {
			ataca = this._resultadosAtaques[i]._ataca._nombre;
			let nroAtaque = i + 1;
			defiende = this._resultadosAtaques[i]._defiende._nombre;
			let puntos = this._resultadosAtaques[i]._puntos;
			let resultado = puntos>0?"GOOOOOOOL":puntos==0?"PALO":"Ná de ná";
			
			if(i%2 ==0){
				if(puntos>0){
					golesEq1 = golesEq1 + 1;
				}
			}else{
				if(puntos>0){
					golesEq2 = golesEq2 + 1
				}
			}

			let arrayFila = [];
			arrayFila.push(nroAtaque);
			arrayFila.push(ataca);
			arrayFila.push(defiende);
			arrayFila.push(puntos);
			arrayFila.push(resultado);
			
			Utiles.agregarFilaATabla(tabla, arrayFila);
			
		}

		let body = document.body;
		
		let divMensaje = Utiles.crearElementoConUnAtributo("div", [new Atributo("id", "mensaje")]);
		body.appendChild(divMensaje);
		divMensaje.appendChild(tabla);

		let resumenresultado = Utiles.crearElementoConUnAtributo("div", [new Atributo("id", "resumenresultado")]);
		let divequipo1 = Utiles.crearElementoConUnAtributo("div", [new Atributo("class", "resumenresultado")]);
		divequipo1.innerHTML = defiende + ": " + golesEq1 + " goles";
		let divequipo2 = Utiles.crearElementoConUnAtributo("div", [new Atributo("class", "resumenresultado")]);
		divequipo2.innerHTML = ataca + ": " + golesEq2 + " goles";
		let divTotales = Utiles.crearElementoConUnAtributo("div", [new Atributo("class", "resumenresultado")]);
		let gano = (golesEq1>golesEq2)? defiende:(golesEq1==golesEq2)?"Empate":ataca;
		divTotales.innerHTML = "Ganador: " + gano;

		resumenresultado.appendChild(divequipo1);
		resumenresultado.appendChild(divequipo2);
		resumenresultado.appendChild(divTotales);

		body.appendChild(resumenresultado);
	}

}

class ResultadoAtaque{
	constructor(ataca, defiende, puntos){
		this._ataca = ataca;
		this._defiende = defiende;
		this._puntos = puntos
	}
}

class EntrenadorConEstrategia extends Entrenador{
	constructor (tipo){
		super();
		this._tipo = tipo;//0:defensivo, 1: aleatorio, 2: Atacante
		this._estrategia = new Estrategia(tipo);
	}

	elegirPlantillaParaPartido(equipo){
		let arrayJugadores = equipo._jugadores;
		let porteros = [];
		let defensas = [];
		let mediocentros = [];
		let delanteros = [];

		arrayJugadores = Utiles.ordenarArrayPorCampo(arrayJugadores, "_calidad");
		for (let i = 0; i < arrayJugadores.length; i++) {
			if(arrayJugadores[i]._posicion == "portero"){
				porteros.push(arrayJugadores[i]);
			}else if(arrayJugadores[i]._posicion == "defensa"){
				defensas.push(arrayJugadores[i]);
			}else if(arrayJugadores[i]._posicion == "mediocentro"){
				mediocentros.push(arrayJugadores[i]);
			}else if(arrayJugadores[i]._posicion == "delantero"){
				delanteros.push(arrayJugadores[i]);
			}

		}
		/*portero:1,
			defensa:0,
			medio:0,
			delantero:0*/
		
		this.elegirMejorJugador(porteros, this._estrategia._formacion.portero, porteros, defensas, mediocentros, delanteros);
		this.elegirMejorJugador(defensas, this._estrategia._formacion.defensa, porteros, defensas, mediocentros, delanteros);
		this.elegirMejorJugador(mediocentros, this._estrategia._formacion.medio, porteros, defensas, mediocentros, delanteros);
		this.elegirMejorJugador(delanteros, this._estrategia._formacion.delantero, porteros, defensas, mediocentros, delanteros);
		console.log(this._plantilla);
	}

	elegirJugadorAleatorio(porteros, defensas, mediocentros, delanteros){
		let arrayJugadores = porteros.concat(defensas).concat(mediocentros).concat(delanteros);

		let numero = Utiles.generarNumeroAleatorioEntre(0,arrayJugadores.length-1);
		let seleccionado = arrayJugadores[numero];		
		this._plantilla.push(seleccionado);
		if(porteros.indexOf(seleccionado)!=-1){
			porteros.splice(porteros.indexOf(seleccionado), 1);
		}
		if(defensas.indexOf(seleccionado)!=-1){
			defensas.splice(defensas.indexOf(seleccionado), 1);
		}
		if(mediocentros.indexOf(seleccionado)!=-1){
			mediocentros.splice(mediocentros.indexOf(seleccionado), 1);
		}
		if(delanteros.indexOf(seleccionado)!=-1){
			delanteros.splice(delanteros.indexOf(seleccionado), 1);
		}

	}

	elegirMejorJugador(arrayDeJugadores, cantidad, porteros, defensas, mediocentros, delanteros){
		let cont = 0
		while(arrayDeJugadores.length>0 && (cont<cantidad)){
			this._plantilla.push(arrayDeJugadores[0]);
			arrayDeJugadores.splice(0, 1);
			cont = cont +1;
		}
		if(cont<cantidad){
			for (var i = 0; i < cantidad-cont; i++) {
				this.elegirJugadorAleatorio(porteros, defensas, mediocentros, delanteros);				
			}
		}

		//console.log(this._plantilla.length);

	}

}

class Estrategia{
	constructor(tipo){
		this.tipo = tipo;////0:defensivo, 1: aleatorio, 2: Atacante
		this._formacion = {
			portero:1,
			defensa:0,
			medio:0,
			delantero:0
		}

		this.devolverEstrategia();
		console.log(this._formacion);
	}

	devolverEstrategia(){
		if(this.tipo == 0){
			this.devolverEstrategiaDefensivo();
		}else if(this.tipo == 1){
			this.devolverEstrategiaAleatorio();
		}else if(this.tipo == 2){
			this.devolverEstrategiaAtacante();
		}
	}

	devolverEstrategiaAtacante(){
		this._formacion.defensa = 3;
		this._formacion.medio = 4;
		this._formacion.delantero = 3;
	}

	devolverEstrategiaDefensivo(){
		this._formacion.defensa = 4;
		this._formacion.medio = 5;
		this._formacion.delantero = 1;
	}

	devolverEstrategiaAleatorio(){
		let falta = 10;
		this._formacion.defensa = Utiles.generarNumeroAleatorioEntre(1,falta);
		falta = falta - this._formacion.defensa;
		if(falta>0){
			this._formacion.medio = Utiles.generarNumeroAleatorioEntre(1,falta);
		}
		falta = falta - this._formacion.medio;
		if(falta>0){
			this._formacion.delantero = falta;
		}
	}
}

var equipo1 = null;
var equipo2 = null;
var partido = null;
window.onload = function (){

	equipo1 = new Equipo("Real Madrid", new EntrenadorConEstrategia(1));
	equipo2 = new Equipo("Barcelona", new EntrenadorConEstrategia(1));
	partido = new Partido(equipo1, equipo2);

	partido.jugarPartido();

}