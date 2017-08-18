class Utilidades{
	static removeAllEventListenersToElement(element){
		var newElement = element.cloneNode(true);
		element.parentNode.replaceChild(newElement, element);
		return newElement;
	}

	static closeModal(){
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
		<h4 class="modal-title" id="title">${title}</h4>
		</div>
		<div class="modal-body" id="mensaje">
		${msjHtml}
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
		this._divGeneral = null;
		this._gestion = new Gestion();
	}

	init(){
		this.pintarEstructura();
		this._gestion.init(this._divGeneral);

	}

	pintarEstructura(){
		this._container = document.createElement("div");
		this._container.className = "container";
		this._divGeneral = document.createElement("div");
		this._divGeneral.className = "gestion";
		this._divGeneral.setAttribute("id", "gestiongeneral");
		this._container.appendChild(this._divGeneral);
		document.body.appendChild(this._container);

	}
}

class Gestion{
	constructor(){
		this._contenedorHtml = null;
		this._gestionUsuarios = new GestionUsuarios();
		this._gestionPosts = new GestionPosts();
		this._gestionComms = new GestionComms(); 
		this._apiClient = new ApiClient();
		this._usuarioApiClient = null;		
		this._postApiClient = null;		
		this._commApiClient = null;		
	}

	init(contenedorHtml){
		this._contenedorHtml = contenedorHtml;
		this._gestionUsuarios.init(this);
	}

	verUsuarios(){
		this._gestionUsuarios.init(this);
	}

	verPosts(userId){
		this._gestionPosts.init(userId, this);	
	}

	verComentarios(userId, postId){
		this._gestionComms.init(userId, postId, this);	
	}

	getUsuarioApiClient(){
		if(this._usuarioApiClient == null){
			this._usuarioApiClient = new UsuarioApiClient(this._apiClient);
		}
		return this._usuarioApiClient;
	}

	getPostApiClient(){
		if(this._postApiClient == null){
			this._postApiClient = new PostApiClient(this._apiClient);
		}
		return this._postApiClient;
	}

	getCommApiClient(){
		if(this._commApiClient == null){
			this._commApiClient = new CommApiClient(this._apiClient)
		}
		return this._commApiClient;
	}

}

class GestionUsuarios{
	constructor(){
		this._contenedorHtml = null;
		this._usuarioApiClient = null;
		this._gestion =null;
	}

	init(gestion){
		this._gestion = gestion;
		this._contenedorHtml = gestion._contenedorHtml;
		this._usuarioApiClient = gestion.getUsuarioApiClient();		
		this._contenedorHtml.innerHTML = "";
		this.pintarEstructura();
		this.getAllUsuariosAndPaint();
	}

	getAllUsuariosAndPaint(){		
		this._usuarioApiClient.getAllUsuarios().then((data) => {
			this.paintAllUsuarios(data);			
		});
	}

	paintAllUsuarios(data){
		console.log(data);
		let tbody = this._contenedorHtml.querySelector("tbody");
		tbody.innerHTML = "";
		for (var i = 0; i < data.length; i++) {
			let usuario = data[i];
			let row = this.getRowForUsuarios(usuario);
			tbody.appendChild(row);
		}
	}

	getRowForUsuarios(usuario){
		let tr = document.createElement("tr");
		
		let td1 = document.createElement("td");
		td1.innerHTML = usuario._id;
		tr.appendChild(td1);

		let td2 = document.createElement("td");
		td2.innerHTML = usuario._name;
		tr.appendChild(td2);

		let td3 = document.createElement("td");
		let button3 = document.createElement("button");
		button3.innerHTML = usuario._username;
		button3.className = "btn btn-link";
		button3.addEventListener("click", ()=>this._gestion.verPosts(usuario._id));
		td3.appendChild(button3);
		tr.appendChild(td3);

		let td4 = document.createElement("td");
		td4.innerHTML = usuario._email;
		tr.appendChild(td4);

		//direccion
		let td5 = document.createElement("td");
		let button1 = document.createElement("button");
		button1.innerHTML = "Ver";
		button1.className = "btn btn-warning";
		button1.addEventListener("click", ()=>this.verDireccion(usuario._address));
		td5.appendChild(button1);
		tr.appendChild(td5);

		let td6 = document.createElement("td");
		td6.innerHTML = usuario._phone;
		tr.appendChild(td6);

		let td7 = document.createElement("td");
		td7.innerHTML = usuario._website;
		tr.appendChild(td7);

		//compania
		let td8 = document.createElement("td");
		let button2 = document.createElement("button");
		button2.innerHTML = "Ver";
		button2.className = "btn btn-warning";
		button2.addEventListener("click", ()=>this.verCompania(usuario._company));
		td8.appendChild(button2);

		tr.appendChild(td8);

		return tr;
	}

	verDireccion(address){
		let html = "<p>Calle: " + address._street + "</p>";	
		html = html + "<p>Suite: " + address._suite + "</p>";	
		html = html + "<p>Ciudad: " + address._city + "</p>";	
		html = html + "<p>Zip Code: " + address._zipcode + "</p>";	
		html = html + "<p>Latitud: " + address._geo._lat + "</p>";	
		html = html + "<p>Long: " + address._geo._lng + "</p>";	
		Utilidades.openModal("Dirección", html);

	}

	verCompania(company){
		let html = "<p>Nombre: " + company._name + "</p>";	
		html = html + "<p>catchPhrase: " + company._catchPhrase + "</p>";	
		html = html + "<p>bs: " + company._bs + "</p>";	
		Utilidades.openModal("Compañía", html);
	}

	pintarEstructura(){
		var estructura = `<h1 class="main-title" id="titulo">USUARIOS</h1>
			<div class="button-container">
				<button class="btn btn-primary" id="btnRefrescar">Refrescar</button>				
			</div>

			<table class="table table-striped table-bordered">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nombre</th>
						<th>Usuario</th>
						<th>Email</th>
						<th>Dirección</th>
						<th>Telefono</th>
						<th>Website</th>
						<th>Compañía</th>
					</tr>					
				</thead>
				<tbody>
				</tbody>
			</table>`

		this._contenedorHtml.innerHTML = estructura;

		let botonRefrescar = this._contenedorHtml.querySelector("#btnRefrescar");
		botonRefrescar.addEventListener("click", () => this.getAllUsuariosAndPaint());
	}
	
}

class GestionPosts{
	constructor(){
		this._contenedorHtml = null;
		this._postApiClient = null;
		this._userId = null;
		this._gestion = null
	}

	init(userId, gestion){
		this._gestion = gestion;
		this._contenedorHtml = gestion._contenedorHtml;
		this._postApiClient = gestion.getPostApiClient();	
		this._userId = userId;		
		this._contenedorHtml.innerHTML = "";
		this.pintarEstructura();
		this.getAllPostsAndPaint();
	}

	getAllPostsAndPaint(){		
		this._postApiClient.getAllPosts(this._userId).then((data) => {
			this.paintAllPosts(data);			
		});
	}

	paintAllPosts(data){
		console.log(data);
		let tbody = this._contenedorHtml.querySelector("tbody");
		tbody.innerHTML = "";
		for (var i = 0; i < data.length; i++) {
			let post = data[i];
			let row = this.getRowForposts(post);
			tbody.appendChild(row);
		}
	}

	getRowForposts(post){
		let tr = document.createElement("tr");
		
		let td1 = document.createElement("td");
		td1.innerHTML = post._userId;
		tr.appendChild(td1);

		let td3 = document.createElement("td");
		let button3 = document.createElement("button");
		button3.innerHTML = post._id;
		button3.className = "btn btn-link";
		button3.addEventListener("click", ()=>this._gestion.verComentarios(this._userId, post._id));
		td3.appendChild(button3);
		tr.appendChild(td3);

		let td4 = document.createElement("td");
		td4.innerHTML = post._title;
		tr.appendChild(td4);

		let td6 = document.createElement("td");
		td6.innerHTML = post._body;
		tr.appendChild(td6);
		
		return tr;
	}

	pintarEstructura(){
		var estructura = `<h1 class="main-title" id="titulo">POSTS</h1>
			<div class="button-container">
				<button class="btn btn-primary" id="btnRetornarPost">Retornar</button>				
			</div>

			<table class="table table-striped table-bordered">
				<thead>
					<tr>
						<th>UserID</th>
						<th>Id</th>
						<th>Titulo</th>
						<th>Body</th>						
					</tr>					
				</thead>
				<tbody>					
				</tbody>
			</table>`

		this._contenedorHtml.innerHTML = estructura;

		let btnRetornarPost = this._contenedorHtml.querySelector("#btnRetornarPost");
		btnRetornarPost.addEventListener("click", () => this._gestion.verUsuarios());
	}
	
}

class GestionComms{
	constructor(){
		this._contenedorHtml = null;
		this._commApiClient = null;
		this._userId = null;
		this._gestion = null;
		this._postId = null;
	}

	init(userId, postId, gestion){
		this._gestion = gestion;
		this._contenedorHtml = gestion._contenedorHtml;
		this._commApiClient = gestion.getCommApiClient();
		this._postId = postId;
		this._userId = userId;		
		this._contenedorHtml.innerHTML = "";
		this.pintarEstructura();
		this.getAllCommsAndPaint();
	}

	getAllCommsAndPaint(){		
		this._commApiClient.getAllComms(this._postId).then((data) => {
			this.paintAllComms(data);			
		});
	}

	paintAllComms(data){
		console.log(data);
		let tbody = this._contenedorHtml.querySelector("tbody");
		tbody.innerHTML = "";
		for (var i = 0; i < data.length; i++) {
			let comm = data[i];
			let row = this.getRowForComms(comm);
			tbody.appendChild(row);
		}
	}

	getRowForComms(comm){
		let tr = document.createElement("tr");
		
		let td1 = document.createElement("td");
		td1.innerHTML = comm._postId;
		tr.appendChild(td1);

		let td2 = document.createElement("td");
		td2.innerHTML = comm._id;
		tr.appendChild(td2);

		let td3 = document.createElement("td");
		td3.innerHTML = comm._name;
		tr.appendChild(td3);

		let td4 = document.createElement("td");
		td4.innerHTML = comm._email;
		tr.appendChild(td4);

		let td6 = document.createElement("td");
		td6.innerHTML = comm._body;
		tr.appendChild(td6);
		
		return tr;
	}

	pintarEstructura(){
		var estructura = `<h1 class="main-title" id="titulo">COMENTARIOS</h1>
			<div class="button-container">
				<button class="btn btn-primary" id="btnRetornarComm">Retornar</button>				
			</div>

			<table class="table table-striped table-bordered">
				<thead>
					<tr>
						<th>postID</th>
						<th>Id</th>
						<th>Nombre</th>
						<th>Email</th>	
						<th>Body</th>						
					</tr>					
				</thead>
				<tbody>
				</tbody>
			</table>`

		this._contenedorHtml.innerHTML = estructura;

		let btnRetornarcomm = this._contenedorHtml.querySelector("#btnRetornarComm");
		btnRetornarcomm.addEventListener("click", () => this._gestion.verPosts(this._userId));
	}
	
}

class Usuario{
	constructor(id, name, username, email, address, phone, website, company){
		this._id = id;
		this._name = name;
		this._username = username;
		this._email = email;
		this._address = address;
		this._phone = phone;
		this._website = website;
		this._company = company;
	}
}

class Company{
	constructor(name, catchPhrase, bs){
		this._name = name;
		this._catchPhrase = catchPhrase;
		this._bs = bs;
	}
}

class Address{
	constructor(street, suite, city, zipcode, geo){
		this._street = street;
		this._suite = suite;
		this._city = city;
		this._zipcode = zipcode;
		this._geo = geo; 
	}
}

class Geo{
	constructor(lat, lng){
		this._lat = lat;
		this._lng = lng;
	}
}

class Post{
	constructor(userId, id, title, body){
		this._userId = userId;
		this._id = id;
		this._title = title;
		this._body = body;
	}
}

class Comentario{
	constructor(postId, id, name, email, body){
		this._postId = postId;
		this._id = id;
		this._name = name;
		this._email = email;
		this._body = body;
	}
}

window.onload = () => {
	let mc = new MainController();
	mc.init();
}