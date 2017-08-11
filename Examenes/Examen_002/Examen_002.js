/*

Examen 2

¡Esto es la guerra!

1) Realiza la clase Soldado que tenga lo siguientes atributos:

	- Nombre (aleatorio)
	- Salud (100)
	- Potencia de ataque (0)

Y los siguientes métodos:

	- Ataca(soldado) -> Recibirá un soldado y le quitará salud (la potencia de ataque que tenga).

(si, igual que en los vikingos :P)

2) Realiza las siguientes clases:

SoldadoDeInfanteria que herede de Soldado, y tendrá las siguientes propiedades:
	- Potencia de ataque (Aleatorio 1-25)


SoldadoDeCaballeria que herede de Soldado, y tendrá las siguientes propiedades:
	- Potencia de ataque (Aleatorio 25-50)


SoldadoDeArtilleria que herede de Soldado, y tendrá las siguientes propiedades:
	- Potencia de ataque (Aleatorio 50-75)


SoldadoPilotoF18 que herede de Soldado, y tendrá las siguientes propiedades:
	- Potencia de ataque (Aleatorio 75-100)


3) Realiza la clase Ejercito con los siguientes atributos:

	- Pais (aleatorio)
	- Soldados (array)
	- Bajas (array)

En su creación la clase Ejercito generará 1000 soldados:
	500 de Infanteria
	200 de Caballeria
	200 de Artillería
	100 pilotos de F18

4) Realiza la clase Guerra, que recibirá dos ejercitos en su construcción.

La clase guerra deberá tener los siguientes atributos:
	- Numero de jornadas transcurridas: 0
	- Ejercito 1
	- Ejericto 2

La clase guerra deberá tener los métodos:
	- Iniciar guerra -> hará que empiecen a ejecutarse jornadas de manera consecutiva 
		(1 jornada cada 1000ms hasta que uno de los ejercitos se quede sin soldados)

	- Ejecutar jornada de guerra: en cada jornada de la guerra cada soldado de cada ejercito atacará a un soldado del ejercito contrario. 
		La elección del soldado al que atacará puede ser aleatoria
		Si un soldado muere (salud<=0) pasará al array de bajas de su ejército, y saldrá del array de soldados
		
	- Imprimir estado:
		Será ejecutado en cada jornada de la guerra y mostrará en la consola:
			- Numero de jornadas ejecutadas
			- Numero de soldados vivos en ejercito 1
			- Numero de soldado vivos en ejercito 2
			- Bajas ejército 1
			- Bajas ejército 2

*/

class Utiles{
	static generarNumeroAleatorioEntre(minimo, maximo){
		let anchoFranjaNumerica = (maximo-minimo) + 1;
		let numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

		return numero;
	}

	static generarNombreAleatorio(){
		var nombresNegados = ["Carlos", "Daniel", "Fabian", "Carlos", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
		var indice = this.generarNumeroAleatorioEntre(0, nombresNegados.length-1);

		return nombresNegados[indice];
	}

	static generarPaisAleatorio(nombresPaises){
		
		var indice = this.generarNumeroAleatorioEntre(0, nombresPaises.length-1);

		return nombresPaises[indice];
	}

}


class Soldado{
	constructor(potencia){
		this._nombre = Utiles.generarNombreAleatorio();
		this._salud = 100;
		this._potencia=potencia;
	}

	ataca(soldado){
		soldado._salud = soldado._salud - soldado._potencia;
		if(soldado._salud<0){
			soldado._salud = 0;
		}
	}
}

class SoldadoDeInfanteria extends Soldado{
	constructor(){
		let potencia = Utiles.generarNumeroAleatorioEntre(1,25);
		super(potencia);
	}
}

class SoldadoDeCaballeria extends Soldado{
	constructor(){
		let potencia = Utiles.generarNumeroAleatorioEntre(25,50);
		super(potencia);
	}
}

class SoldadoDeArtilleria extends Soldado{
	constructor(){
		let potencia = Utiles.generarNumeroAleatorioEntre(50,75);
		super(potencia);
	}
}

class SoldadoPilotoF18 extends Soldado{
	constructor(){
		let potencia = Utiles.generarNumeroAleatorioEntre(75,100);
		super(potencia);
	}
}

class Ejercito{
	constructor(pais){
		this._pais = pais; //(aleatorio)
		this._soldados = [];
		this._bajas = [];
		this.crearSoldados();
	}

	crearSoldados(){
		//creando infanteria 500
		for (var i = 0; i < 500; i++) {
			let soldado = new SoldadoDeInfanteria();
			this._soldados.push(soldado);
		}

		//creando Caballeria 200
		for (var i = 0; i < 200; i++) {
			let soldado = new SoldadoDeCaballeria();
			this._soldados.push(soldado);
		}

		//creando Artillería 200
		for (var i = 0; i < 200; i++) {
			let soldado = new SoldadoDeArtilleria();
			this._soldados.push(soldado);
		}

		//creando pilotos de F18 : 100
		for (var i = 0; i < 100; i++) {
			let soldado = new SoldadoPilotoF18();
			this._soldados.push(soldado);
		}
	}
}


class Guerra{
	constructor(ejercito1, ejercito2){
		this._numerojornadas = 0;
		this._ejercito1 = ejercito1;
		this._ejercito2 = ejercito2;	
		this._intervalID = 0;	
	}

	iniciarGuerra(guerra) {
	  this._intervalID = window.setInterval(function(){guerra.crearIntervaloDeUnSegundo()}, 1000);
	}

	crearIntervaloDeUnSegundo(){
		this.ejecutarJornada();	
	}


	ejecutarJornada(){
		let quienAtacaPrimeroEnJornada = Utiles.generarNumeroAleatorioEntre(1, 2);
		if(quienAtacaPrimeroEnJornada==1){
			this.ataqueDeUnEjercitoAOtro(this._ejercito1, this._ejercito2);
			this.ataqueDeUnEjercitoAOtro(this._ejercito2, this._ejercito1);			
		}else{
			this.ataqueDeUnEjercitoAOtro(this._ejercito2, this._ejercito1);		
			this.ataqueDeUnEjercitoAOtro(this._ejercito1, this._ejercito2);
		}
		console.log(quienAtacaPrimeroEnJornada);

		this._numerojornadas = this._numerojornadas + 1;

		this.imprimirEstado();

		if(this._ejercito1._soldados.length<=0 || this._ejercito2._soldados.length<=0){
			window.clearInterval(this._intervalID);
		}
	}

	//este metodo recibira 2 ejercitos cualquiera
	//permite abstraer una logica comun para cuando un ejercito ataque a otro
	//lo que nos permite no repetir codigo en el metodo ejecutarJornada
	ataqueDeUnEjercitoAOtro(ejercito1, ejercito2){
		for (let i = 0; i < ejercito1._soldados.length; i++) {
			let soldado = ejercito1._soldados[i];
			
			if(ejercito2._soldados.length>0){
				let indOponenteAleatorio = Utiles.generarNumeroAleatorioEntre(0, ejercito2._soldados.length -1);
				let oponente = ejercito2._soldados[indOponenteAleatorio];
				soldado.ataca(oponente);
				if(oponente._salud<=0){
					ejercito2._bajas.push(oponente);
					ejercito2._soldados.splice(indOponenteAleatorio, 1);
				}
			}	
		}
	}

	imprimirEstado(){
		console.clear();
		var tab = "    "; 
		
		console.log("%c///////////////////////IMPRIMIR ESTADO////////////////////////////", "color: blue; font-size: 14; font-weight: bold");

		console.log("%cNro Jornada: " + this._numerojornadas, "color:#2E64FE;");
		console.log("%cNúmero de soldados vivos en ejercito de " + this._ejercito1._pais + ": " + this._ejercito1._soldados.length, "color:#2E64FE;");
		console.log("%cNúmero de soldados vivos en ejercito de " + this._ejercito2._pais + ": "  + this._ejercito2._soldados.length, "color:#2E64FE;");
		console.log("%cBajas en ejercito de " + this._ejercito1._pais + ": "  + this._ejercito1._bajas.length, "color:#2E64FE;");
		console.log("%cBajas en ejercito de " + this._ejercito2._pais + ": "  + this._ejercito2._bajas.length, "color:#2E64FE;");

		console.log("%c///////////////////////FIN IMPRIMIR ESTADO////////////////////////", "color: blue; font-size: 14; font-weight: bold");
	}

}

window.onload = function (){

	let nombresPaises = ["España", "Chile", "Perú", "Colombia"];
	let pais1 = Utiles.generarPaisAleatorio(nombresPaises);
	
	nombresPaises.splice(nombresPaises.indexOf(pais1), 1);
	let pais2 = Utiles.generarPaisAleatorio(nombresPaises);

	let ejercito1 = new Ejercito(pais1);
	let ejercito2 = new Ejercito(pais2);
	let guerra = new Guerra(ejercito1, ejercito2);

	//se pide que el metodo ejecute los ciclos
	guerra.iniciarGuerra(guerra);

}








