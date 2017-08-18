/*var url = "https://ironhack-characters.herokuapp.com/characters";

var headers = new Headers();

let config = {
	method : "GET",
	headers : headers
};

fetch(url, config).then((response) => {
	console.log("RESPONSE");
	console.log(response);
	return response.json();
}).then((data) => {
	 console.log("DATA");
	console.log(data);
	return "prueba";
}).then((resultado) =>{
	console.log("resultado");
	console.log(resultado);
}).catch((error)=>{
	 console.log("ERROR");
	console.log(error);
});

//CRUD de superhéroes
//ver temas de

*/

class Utilidades{
	static removeAllEventListenersToElement(element){
		var newElement = element.cloneNode(true);
		element.parentNode.replaceChild(newElement, element);
		return newElement;
	}

	closeModal(){
		var modal = document.body.querySelector("#contenedorModal");
		if(modal){
			modal.parentElement.removeChild(modal);
		}
	}

	static openModal(title, msjHtml){
		let contenedorModal = document.createElement("div");
		contenedorModal.id = "contenedorModal";
		contenedorModal.innerHTML = `
		<div class="modal fade in" id="myModal" role="dialog" style="display: block; padding-left: 0px;">
		<div class="modal-dialog">

		<!-- Modal content-->
		<div class="modal-content">
		<div class="modal-header">
		<button type="button" class="close" id="close-modal-button">×</button>
		<h4 class="modal-title" id="title">Modal Header</h4>
		</div>
		<div class="modal-body" id="mensaje">
		<p>Some text in the modal.</p>
		</div>
		<div class="modal-footer">
		<button type="button" class="btn btn-default" id="close-modal-button2">Close</button>
		</div>
		</div>

		</div>
		</div>
		<div class="modal-backdrop fade in"></div>
		`;

		let botonCerrar = contenedorModal.querySelector("#close-modal-button");
		botonCerrar.addEventListener("click", () => this.closeModal());

		let botonCerrar2 = contenedorModal.querySelector("#close-modal-button2");
		botonCerrar2.addEventListener("click", () => this.closeModal());

		document.body.appendChild(contenedorModal);
	};
}


class MainController{
	constructor(){
		this._container = null;
		this._divAlmacenSuperHeroes = null;
		this._apiClient = new ApiClient();
		this._superHeroesApiClient = new SuperHeroesApiClient(this._apiClient);
		this._almacenSuperHeroes = new AlmacenSuperHeroes();		
	}

	init(){
		this.pintarEstructura();
		this._almacenSuperHeroes.init(this._divAlmacenSuperHeroes, this._superHeroesApiClient)
	}

	pintarEstructura(){
		this._container = document.createElement("div");
		this._container.className = "container";
		this._divAlmacenSuperHeroes = document.createElement("div");
		this._divAlmacenSuperHeroes.className = "almacen-superheroes";

		this._container.appendChild(this._divAlmacenSuperHeroes);
		document.body.appendChild(this._container);

	}
}

class SuperHeroe{
	constructor(identificador, apodo, arma, trabajo, deuda){
		this._identificador = identificador;
		this._apodo = apodo;
		this._arma = arma;
		this._trabajo = trabajo;
		this._deuda = deuda;
	}
}

class AlmacenSuperHeroes{
	constructor(){
		this._contenedorHtml = null;
		this._superheroes = [];
		this._superHeroesApiClient = null;
	}

	init(contenedorHtml, superHeroesApiClient){
		this._contenedorHtml = contenedorHtml;
		this._superHeroesApiClient = superHeroesApiClient;
		this.pintarEstructura();
		this.getAllSuperHeroesAndPaint();
	}

	//Antiguamente conocido como getAllSuperHeroes
	getAllSuperHeroesAndPaint(){
		this._superHeroesApiClient.getAllSuperHeroes().then((data) => {
			this._superheroes = data;
			this.paintAllSuperHeroes(data);			
		});
	}

	paintAllSuperHeroes(data){
		console.log(data);
		let tbody = this._contenedorHtml.querySelector("tbody");
		tbody.innerHTML = "";
		for (var i = 0; i < data.length; i++) {
			let superHeroe = data[i];
			let row = this.getRowForSuperHeroe(superHeroe);
			tbody.appendChild(row);
		}
	}

	getRowForSuperHeroe(superHeroe){
		let tr = document.createElement("tr");
		
		let td1 = document.createElement("td");
		td1.innerHTML = superHeroe._identificador;
		tr.appendChild(td1);

		let td2 = document.createElement("td");
		td2.innerHTML = superHeroe._apodo;
		tr.appendChild(td2);

		let td3 = document.createElement("td");
		td3.innerHTML = superHeroe._arma;
		tr.appendChild(td3);

		let td4 = document.createElement("td");
		td4.innerHTML = superHeroe._trabajo;
		tr.appendChild(td4);

		let td5 = document.createElement("td");
		td5.innerHTML = superHeroe._deuda;
		tr.appendChild(td5);

		let td6 = document.createElement("td");
		//td6.innerHTML = superHeroe._deuda;
		//botones
		let button1 = document.createElement("button");
		button1.innerHTML = "Editar";
		button1.className = "btn btn-warning";
		button1.addEventListener("click", ()=>this.editarSuperHeroe(superHeroe));
		td6.appendChild(button1);

		let button2 = document.createElement("button");
		button2.innerHTML = "Borrar";
		button2.className = "btn btn-danger";
		button2.addEventListener("click", ()=>this.borrarSuperHeroe(superHeroe));
		td6.appendChild(button2);

		tr.appendChild(td6);

		return tr;
	}

	editarSuperHeroe(superHeroe){
		console.log("EDITAR SUPERHEROE");
		console.log(superHeroe);

		let txtNombre = this._contenedorHtml.querySelector("#nombre");
		let txtArma = this._contenedorHtml.querySelector("#arma");
		let txtProfesion = this._contenedorHtml.querySelector("#profesion");
		let chkDeuda = this._contenedorHtml.querySelector("#deuda");
		txtNombre.value = superHeroe._apodo;
		txtArma.value = superHeroe._arma;
		txtProfesion.value = superHeroe._trabajo;
		chkDeuda.checked=superHeroe._deuda;
		
		let btnEditar = this._contenedorHtml.querySelector("#btnEditar");
		btnEditar.setAttribute("style", "");		
		btnEditar = Utilidades.removeAllEventListenersToElement(btnEditar);
		btnEditar.addEventListener("click", () => this.editarHeroe(superHeroe._identificador));

		let botonCrear = this._contenedorHtml.querySelector("#btnCrear");
		botonCrear.setAttribute("style", "display:none;");
	}

	editarHeroe(id){
		console.log("editar...");
		let txtNombre = this._contenedorHtml.querySelector("#nombre");
		let txtArma = this._contenedorHtml.querySelector("#arma");
		let txtProfesion = this._contenedorHtml.querySelector("#profesion");
		let chkDeuda = this._contenedorHtml.querySelector("#deuda");
		let nombre = txtNombre.value;
		let arma = txtArma.value;
		let profesion = txtProfesion.value;
		let deuda = chkDeuda.checked;

		let superHeroe = new SuperHeroe(
					id, 
					nombre, 
					arma, 
					profesion, 
					deuda);
		this._superHeroesApiClient.editSuperHeroe(superHeroe).then((data)=>{
			console.log(data);
		});

		let btnEditar = this._contenedorHtml.querySelector("#btnEditar");
		btnEditar.setAttribute("style", "display:none;");		
		
		let botonCrear = this._contenedorHtml.querySelector("#btnCrear");
		botonCrear.setAttribute("style", "");

		this.getAllSuperHeroesAndPaint();
	}

	borrarSuperHeroe(superHeroe){
		console.log("BORRAR SUPERHEROE");
		console.log(superHeroe);

		this._superHeroesApiClient.deleteSuperHeroe(superHeroe).then((data)=>{
			console.log(data);
		});

		this.getAllSuperHeroesAndPaint();
	}

	pintarEstructura(){
		var estructura = `<h1 class="main-title">CRUD de Superheroes</h1>
			<div class="well">
				<h2 class="form-title">Formulario</h2>
				<form class="form-inline">
				  <div class="form-group">
				    <label for="nombre">Nombre:</label>
				    <input type="text" class="form-control" id="nombre" placeholder="Han Solo">
				  </div>
				  <div class="form-group">
				    <label for="arma">Arma:</label>
				    <input type="text" class="form-control" id="arma" placeholder="Pistola">
				  </div>
				  <div class="form-group">
				    <label for="profesion">Profesión:</label>
				    <input type="text" class="form-control" id="profesion" placeholder="Asesino">
				  </div>
				  <div class="form-group">
				    <label class = "checkbox-inline">
				    	<input type="checkbox" id = "deuda" value="">
				    	Deuda
				    </label>				    
				  </div>
				  <button type="button" class="btn btn-default" id="btnReset">Reset</button>
				  <button type="button" class="btn btn-success" id="btnCrear">Crear</button>				  
				  <button type="button" class="btn btn-success" style="display:none;" id="btnEditar">Editar</button>				  
				</form>
			</div>
			<div class="alert alert-success" id="mensaje">				
			</div>
			<div class="button-container">
				<button class="btn btn-primary" id="btnRefrescar">Refrescar</button>
			</div>

			<table class="table table-striped table-bordered">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nombre</th>
						<th>Arma</th>
						<th>Profesión</th>
						<th>Deuda</th>
						<th>Acciones</th>
					</tr>					
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Fabian</td>
						<td>Chistes</td>
						<td>Cómico</td>
						<td>true</td>
						<td>
							<button class="btn btn-warning">Editar</button>
							<button class="btn btn-danger">Borrar</button>							
						</td>
					</tr>
				</tbody>
			</table>`

		this._contenedorHtml.innerHTML = estructura;

		let botonRefrescar = this._contenedorHtml.querySelector("#btnRefrescar");
		botonRefrescar.addEventListener("click", () => this.getAllSuperHeroesAndPaint());

		let botonCrear = this._contenedorHtml.querySelector("#btnCrear");
		botonCrear.addEventListener("click", () => this.crearNuevoHeroe());

		let botonReset = this._contenedorHtml.querySelector("#btnReset");
		botonReset.addEventListener("click", () => this.reset());
	}

	reset(){
		console.log("Reset...");
		let txtNombre = this._contenedorHtml.querySelector("#nombre");
		let txtArma = this._contenedorHtml.querySelector("#arma");
		let txtProfesion = this._contenedorHtml.querySelector("#profesion");
		let chkDeuda = this._contenedorHtml.querySelector("#deuda");
		txtNombre.value = "";
		txtArma.value = "";
		txtProfesion.value = "";
		chkDeuda.checked=0;
		let btnEditar = this._contenedorHtml.querySelector("#btnEditar");
		btnEditar.setAttribute("style", "display:none;");		
		
		let botonCrear = this._contenedorHtml.querySelector("#btnCrear");
		botonCrear.setAttribute("style", "");
		this.getAllSuperHeroesAndPaint();		
	} 

	crearNuevoHeroe(){
		console.log("Crear...");
		let txtNombre = this._contenedorHtml.querySelector("#nombre");
		let txtArma = this._contenedorHtml.querySelector("#arma");
		let txtProfesion = this._contenedorHtml.querySelector("#profesion");
		let chkDeuda = this._contenedorHtml.querySelector("#deuda");
		let nombre = txtNombre.value;
		let arma = txtArma.value;
		let profesion = txtProfesion.value;
		let deuda = chkDeuda.checked;

		let divMensaje = this._contenedorHtml.querySelector("#mensaje");

		let superHeroe = new SuperHeroe(
					this._superheroes.length, 
					nombre, 
					arma, 
					profesion, 
					deuda);
		this._superHeroesApiClient.createSuperHeroe(superHeroe).then((data)=>{
			console.log(data);
			divMensaje.innerHTML="Héroe creado con exito!!";
		});

		this.getAllSuperHeroesAndPaint();
	}


}

window.onload = () => {
	let mc = new MainController();
	mc.init();
}