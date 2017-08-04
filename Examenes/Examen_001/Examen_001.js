/*

Vamos a realizar una biblioteca (Yujuuuuu!!)

1) Crea la clase Biblioteca, la cual deberá tener:
	- Nombre (String)
	- Secciones (Array)
	- Socios (Array)

2) Crea la clase Libro, la cual deberá tener:
	- Nombre (String)
	- Número de páginas (Number)
	- Autor (String)
	- Temática (String) (Puede ser Amor, Aventuras, Naturaleza, Historia o Viajes)

3) Crea la clase Sección (para la biblioteca) que tendrá:
	- Nombre (String)
	- Libros (Array)

5) Crea la clase Socio que tendrá:
	- Nombre (String)
	- Numero de socio (Number)
	- Libros (Array)

6) Instancia una nueva biblioteca
Añade 5 seciones a la biblioteca: Amor, Aventuras, Naturaleza, Historia, Viajes
Añade 100 socios aleatorios a la biblioteca
Genera 1000 libros aleatoriamente y añádelos a la biblioteca.
Para ello haz uso de una función añadirLibro(libro) que deberá estar en el objeto biblioteca.
Los libros deberán colocarse en la sección apropiada según su temática.

7) Añade el método ejecutarCiclo() dentro de un socio
En cada ciclo un socio dejará los libros que tenía alquilados y cogerá varios (aleatorio entre 1-3) de forma aleatoria.
Para coger libros deberá hacer uso de una funcion de Biblioteca llamada dameLibroAleatorio();
Para dejar libros deberá hacer uso de una función de Biblioteca llamada devolverLibro(libro);

8) Realiza la función ejecutarCiclo para la biblioteca
La función ejecutarCiclo de biblioteca, llamará a ejecutar ciclo de todos sus socios

8) Crea un intervalo que se encargue de llamar a ejecutarCiclo de biblioteca cada segundo
Crea una función imprimirEstado en biblioteca, que se encargue de imprimir el estado de toda la biblioteca.

Por ejemplo:

Biblioteca Municipal:

Sección Amor
	Numero de libros: 80
Sección Aventuras
	Numero de libros: 80
Sección Naturaleza
	Numero de libros: 80
Sección Historia
	Numero de libros: 80
Sección Viajes
	Numero de libros: 80

Total de libros en la biblioteca: 400
Total de libros prestados a los socios: 600

*/

function Utiles(){
	this._descripcion = "Herramientas";
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

Utiles.prototype.generarAutorAleatorio = function(){
	var nombresAutores = ["Miguel de Cervantes", "Ciro Alegria", "Ruben Dario", "Adolfo Becker", "Mario Vargas", "Mario Benedetti", "Juan Ribeyro"];
	var indice = this.generarNumeroAleatorioEntre(0, nombresAutores.length-1);

	return nombresAutores[indice];
}

Utiles.prototype.generarTematicaAleatorio = function(){
	var tematicas = ["Amor", "Aventuras", "Naturaleza", "Historia", "Viajes"];
	var indice = this.generarNumeroAleatorioEntre(0, tematicas.length-1);

	return tematicas[indice];
}

function Biblioteca(nombre){	
	this._nombre = nombre;
	this._secciones = []; 
	this._socios = [];
}

Biblioteca.prototype.agregarVariosSociosAleatorio = function(numeroDeSocios){
	for(var i=0; i<numeroDeSocios; i++){
		var socio = this.agregarSocioAleatorio(i);
		this._socios.push(socio);
	}
}

Biblioteca.prototype.agregarSocioAleatorio = function(id){
	var nombre = utiles.generarNombreAleatorio();
	var numero = utiles.generarNumeroAleatorioEntre(0, id);
	
	var socio = new Socio(nombre, numero);
	return socio;	
}


//segun el enunciado
Biblioteca.prototype.anadirLibro = function(libro){
	for(var indSecciones = 0 ; indSecciones<this._secciones.length; indSecciones++){
		var seccion = this._secciones[indSecciones];
		if(seccion._nombre == libro._tematica){
			seccion._libros.push(libro);
			break;
		}
	}
	
}

Biblioteca.prototype.anadirLibrosAleatoriamente = function(numeroLibros){
	for(var i = 0; i<numeroLibros; i++){
		var libro = this.generarLibroAleatorio(i);
		this.anadirLibro(libro);
	}
}

Biblioteca.prototype.generarLibroAleatorio = function(numero){
	var nombre = "El gran Libro " + numero;
	var paginas = utiles.generarNumeroAleatorioEntre(0, 600);
	var autor = utiles.generarAutorAleatorio();
	var tematica = utiles.generarTematicaAleatorio();
	var libro = new Libro(nombre, paginas, autor, tematica);
	return libro;
}

Biblioteca.prototype.obtenerListaDeLibros = function(){

	//array para guardar libros con su respectiva seccion
	var librosBiblioteca = [];
	for (var indSecciones = 0; indSecciones<this._secciones.length; indSecciones++){
		var seccion = this._secciones[indSecciones];
		for(var indLibros = 0; indLibros<seccion._libros.length; indLibros++){
			var libro = seccion._libros[indLibros];
			var libroSeccion = new LibroSeccion(libro, seccion);

			librosBiblioteca.push(libroSeccion);

		}
		
	}
	return librosBiblioteca;
}

Biblioteca.prototype.dameLibroAleatorio = function(){
	
	var librosBiblioteca = this.obtenerListaDeLibros();

	var indLibroAleatorio = utiles.generarNumeroAleatorioEntre(0, librosBiblioteca.length-1);

	var libro = librosBiblioteca[indLibroAleatorio]._libro;
	var seccion = librosBiblioteca[indLibroAleatorio]._seccion;

	//lo quitamos de la seccion
	seccion._libros.splice(seccion._libros.indexOf(libro), 1);

	return libro;
}

Biblioteca.prototype.devolverLibro = function(libro, socio){
	
	//verificar si el socio tiene ese libro
	if (socio._libros.indexOf(libro) != -1){
		//lo saco de lista de libros de Socio
		socio._libros.splice(socio._libros.indexOf(libro), 1);
		//anado a lista de libros de biblioteca en la seccion que corresponda
		this.anadirLibro(libro);
	}
	
}

Biblioteca.prototype.ejecutarCiclo = function(){
	for(var indSocios  = 0; indSocios < this._socios.length; indSocios ++){
		var socio = this._socios[indSocios];
		socio.ejecutarCiclo(this);
	}

	this.imprimirEstado();
}

Biblioteca.prototype.obtenerTotalDeLibrosPrestados = function(){
	
	var resultado = 0;

	for (var indSocios = 0 ; indSocios<this._socios.length; indSocios ++){
		var socio = this._socios[indSocios];
		resultado = resultado + socio._libros.length;
	}

	return resultado;
}

Biblioteca.prototype.imprimirEstado = function(){
	console.clear();
	var tab = "    "; 
	var totalLibrosBiblioteca = this.obtenerListaDeLibros().length;
	var totalLibrosPrestados = this.obtenerTotalDeLibrosPrestados();
	
	console.log("%c///////////////////////IMPRIMIR ESTADO BIBLIOTECA////////////////////////////", "color: blue; font-size: 14; font-weight: bold");

	console.log("%c" + this._nombre + " 📚", "color: #5F4C0B; font-size: 12; font-weight: bold;");
 
	console.log("%cSECCIONES", "color: blue; font-size: 12; font-weight: bold; text-decoration: underline");
	for (var indSecciones = 0 ; indSecciones<this._secciones.length; indSecciones ++){
		var seccion = this._secciones[indSecciones];
		console.log("%c" + indSecciones + ". Seccion " + seccion._nombre, "color: #2E64FE;" );

		console.log(tab + ">> Número de libros: " + seccion._libros.length);

	}

	console.log("%cTotal de libros en la biblioteca: " + totalLibrosBiblioteca, "color:#2E64FE;");
	console.log("%cTotal de libros prestados a los socios: " + totalLibrosPrestados, "color:#2E64FE;");

	console.log("%c///////////////////////FIN IMPRIMIR ESTADO BIBLIOTECA////////////////////////", "color: blue; font-size: 14; font-weight: bold");

}

function Libro(nombre, paginas, autor,tematica){
	this._nombre = nombre;
	this._paginas = paginas;
	this._autor = autor;
	this._tematica = tematica; //(Puede ser Amor, Aventuras, Naturaleza, Historia o Viajes)
}

function Seccion(nombre){
	this._nombre = nombre;
	this._libros = [];
}

function Socio(nombre, numero){
	this._nombre = nombre;
	this._numero = numero; //numero de socio
	this._libros = [];

}

Socio.prototype.ejecutarCiclo = function(biblioteca){
	
	//devolver libros
	if(this._libros.length>0){
		for (indLibros = this._libros.length - 1; indLibros >= 0  ; indLibros--){
			var libro = this._libros[indLibros];
			biblioteca.devolverLibro(libro, this);
		}
	}

	//el socio puede coger entre 1 a 3 libros:
	var numLibrosAleatorio = utiles.generarNumeroAleatorioEntre(1, 3);
	
	//coger libros
	for (var ind = 0; ind < numLibrosAleatorio; ind ++){
		var libroNuevo = biblioteca.dameLibroAleatorio();
		this._libros.push(libroNuevo);
	}

}

//Clase LibroSeccion, servira para guardar informacion de un libro con su respectiva seccion
function LibroSeccion(libro, seccion){
	this._libro = libro;
	this._seccion = seccion;
}


var utiles = new Utiles();
var seccionAmor = new Seccion("Amor");
var seccionAventuras = new Seccion("Aventuras");
var seccionNaturaleza = new Seccion("Naturaleza");
var seccionHistoria  = new Seccion("Historia");
var seccionViajes = new Seccion("Viajes");

var biblioteca = new Biblioteca("Biblioteca Nacional");
biblioteca._secciones.push(seccionAmor);
biblioteca._secciones.push(seccionAventuras);
biblioteca._secciones.push(seccionNaturaleza);
biblioteca._secciones.push(seccionHistoria);
biblioteca._secciones.push(seccionViajes);

//agregar socios
biblioteca.agregarVariosSociosAleatorio(100);

//agregar 1000 libros a Biblioteca;
biblioteca.anadirLibrosAleatoriamente(1000);

function ciclo(){
	biblioteca.ejecutarCiclo();
};

var intervalID =  window.setInterval(ciclo, 1000);
