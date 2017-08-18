/*
1) Realiza la modelización de un parque natural. Empieza con el siguiente código.

Class parqueNatural{
	constructor(){
		this._areas = [];
		this._parqueDeBomberos = null;
}

En cada una de las áreas (añade 10 áreas) encontraremos un array de árboles (100 por área) y un array de visitantes (100 en todo el parque).
En el parque de bomberos (que será una clase también) encontraremos un array de bomberos (10) y posiblemente más propiedades que se te puedan ocurrir.
Los bomberos y los visitantes deberán heredar de la clase Persona.

2) Añade un método ejecutar ciclo que represente el paso de 1h en el parque.
Cada ciclo que pase debemos llamar a ejecutar ciclo de los visitantes que se irán cambiando de recinto de forma aleatorio.
Haz que el método se ejecute cada segundo.

3) En cada paso de un ciclo se puede originar un fuego (probabilidad del 5%) que empezaría quemando un arbol aleatorio dentro del parque.
Cada ciclo que pase el fuego se extenderá al arbol al arbol siguiente, si no hay arbol siguiente, deberá saltar al primer arbol del área siguiente.
Asi sucesivamente hasta expandirse por todo el parque. Cada ciclo que pase el fuego en los arboles, estos estarán un 10% más quemados.
Cuando lleguen al 100% de quemados, se habrá perdido el arbol. (Quitarlo del área).



BONUS para el ejercicio 002__005


1) Añade un objeto viento​ (de clase viento), con el siguiente atributo:

Velocidad: Nula/Media/Alta

En cada ejecución el viento tendrá una velocidad aleatoria

Si la velocidad es nula el incendio se expandirá 1 arbol, si la velocidad es media: dos árboles, si la dirección es alta: 3 árboles.

2) Los incendios ya no se originan de forma aleatoria en cualquier parte del bosque.

Los incendios los pueden originar los visitantes que sean fumadores (2 de cada 10). En cada ciclo hay una probabilidad del 10% de que un
visitante fumador tire una colilla en el área en el que está y provoque un incendio.

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


 class ParqueNatural{
	constructor(){
		this._areas = [];
		this._parqueDeBomberos = null;
		this.agregarAreas(10);
		this._aforo = 100;
	}

	agregarAreas(numero){
		let  visitantesPendientes = this._aforo;
		for(let i = 0; i<numero;i++){
			let area = new Area();

			let numVisitantes = 0;
			numVisitantes = Utiles.generarNumeroAleatorioEntre(0, visitantesPendientes);
			visitantesPendientes = visitantesPendientes - numVisitantes;
			area.llenarVisitantes(numVisitantes);
			this._areas.push(area);
		}
	}

	ejecutarCiclo(){
		for (var i = 0; i < this._areas.length; i++) {
			for (var j = 0; j < this._areas.length; j++) {
				this._areas[i]._visitantes[j].ejecutarCiclo(); 
			}
			
		}
	}
}

class Area{
	constructor(){
		this._arboles = [];
		this._visitantes = [];
		llenarArboles(100);
		//llenarVisitantes(100);
	}

	llenarArboles(numero){
		for (let i = 0; i < numero; i++) {
			let arbol = new Albol();
			this._arboles.push(arbol);
		}
	}
	llenarVisitantes(numero){
		for (let i = 0; i < numero; i++) {
			let visitante = new Visitante();
			this._visitantes.push(visitante);	
		}
	}

	ejecutarCiclo(){
		if(Utiles.verificarProbabilidad(5)){
			this.quemarArbolAleatorio();
		}
	}

	quemarArbolAleatorio(){
		let indice  = Utiles.generarNumeroAleatorioEntre(0, this._arboles.length-1);
		let arbol  = this._arboles[indice];
		arbol._quemado = arbol._quemado + 10;

		if(arbol._quemado>=100){
			this._arboles.splice(indice, 1);	
		}
		
	}
}

class Visitante extends Persona{
	constructor(){
		super();	
	}
	ejecutarCiclo(){

	}

}

class Arbol{
	constructor(){
		this._quemado = 0;
	}
}

class ParqueBomberos{
	constructor(){
		this._bomberos = [];
		llenarBomberos(10);
	}

	llenarBomberos(numero){
		for (let i = 0; i < numero; i++) {
			let bombero = new Bombero();
			this._bomberos.push(bombero);
		}
	}
}

class Persona {
	constructor(){
		let nombre = Utiles.generarNombreAleatorio();
		let edad = Utiles.generarNumeroAleatorioEntre(16,40);
		let nacionalidad = Utiles.generarPaisAleatorio();		
	}
}

class Bombero extends Persona{
	constructor(){
		super();
	}
}