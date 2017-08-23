class InnerPage extends Page{
	constructor(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, userservice){
		super(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor);
		this._contenido = null;
		this._userservice = userservice;		
	}

	paint(){
		let promise = this.leerTemplate(this._html);
		Loader.activaLoading();
		promise.then(content => {
				let titulo = this._titulo;	
				let user  = this._userservice.user;
				//let user  = this._userservice.getUserFromLocalStorage();
				let nombre = user._nombre + " " + user._apellidos;				
                let templateString = eval('`' + content + '`');
				this._contenedor.innerHTML = templateString;

                let btnCerrarSesion = this._contenedor.querySelector("#btnCerrarSesion");
				btnCerrarSesion.addEventListener("click", () => this.cerrarSesion());

				let btnPerfilUsuario = this._contenedor.querySelector("#btnPerfilUsuario");
				btnPerfilUsuario.addEventListener("click", () => this._navigation.navigateToUrl(Constantes.URL_PERFIL, null));

                let ulMenu = this._contenedor.querySelector("#menu");
                for (var i = 0; i < this._navigation._pages.length; i++) {
					let pagina = this._navigation._pages[i];
					if(pagina._espartemenu){
						let li = document.createElement("li");
						let a = document.createElement("a");
						a.setAttribute("href", "#");
						a.setAttribute("id", "lnk" + pagina._id);
						a.addEventListener("click", () => this._navigation.navigateToUrl(pagina._url, null));	
						a.innerHTML = pagina._label;
						li.appendChild(a);
						ulMenu.appendChild(li);
					}					
				}
				Loader.desactivaLoading();				
            });
	}

	cerrarSesion(){
		this._userservice.removeUserInLocalStorage();
		this._navigation.navigateToUrl(Constantes.URL_LOGIN, null);
	}
}

class HomePage extends InnerPage{
	constructor(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, userservice){
		super(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, userservice);		
	}	

	init(data){
		this.paint();
		this._contenido = "home.html";
		this.paintContent();
	}

	paintContent(){

		let promise = this.leerTemplate(this._contenido);
		promise.then(content => {
				//console.log(content);
				let titulo = this._titulo;
				let templateString = eval('`' + content + '`');

				let contenido = this._contenedor.querySelector("#contenido");
				if(contenido!=null){
					contenido.innerHTML = templateString;
				}                
            });         
	}

}

class ComidasPage extends InnerPage{
	constructor(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, userservice, comidaApiClient, modalController){
		super(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, userservice);	
		this._comidaApiClient = comidaApiClient;
		this._modalController = modalController;	
	}	

	init(data){
		this.paint();
		this._contenido = "comidas.html";
		this.paintContent();		
	}

	getAllComidasAndPaint(){		
		this._comidaApiClient.getAllComidas().then((data) => {
			this.paintAllComidas(data);			
		});
	}

	paintAllComidas(data){
		let contenido = this._contenedor.querySelector("#contenido");
		let tbody = contenido.querySelector("tbody");
		tbody.innerHTML = "";
		for (var i = 0; i < data.length; i++) {
			let comida = data[i];
			let row = this.getRowForComidas(comida);
			tbody.appendChild(row);
		}
	}
	
	getRowForComidas(comida){
		let tr = document.createElement("tr");
		
		let td1 = document.createElement("td");
		td1.innerHTML = comida._tipo;
		tr.appendChild(td1);

		let td2 = document.createElement("td");
		td2.innerHTML = comida._precio;
		tr.appendChild(td2);

		let td3 = document.createElement("td");
		td3.innerHTML = comida._calorias;
		tr.appendChild(td3);

		let td4 = document.createElement("td");
		td4.innerHTML = comida._existencias;
		tr.appendChild(td4);

		let td5 = document.createElement("td");
		td5.innerHTML = comida._nombre;
		tr.appendChild(td5);

		//compania
		let td6 = document.createElement("td");
		td6.className ="text-center"
		let button = document.createElement("button");
		button.innerHTML = '<span class="glyphicon glyphicon-file"></span> Ver';
		button.className = "btn btn-info btn-xs";
		button.addEventListener("click", ()=>this.verDetalleComida(comida._id));

		let button1 = document.createElement("button");
		button1.innerHTML = '<span class="glyphicon glyphicon-edit"></span> Editar';
		button1.className = "btn btn-info btn-xs";
		button1.addEventListener("click", ()=>this.verEditarComida(comida._id));

		let button2 = document.createElement("button");
		button2.innerHTML = '<span class="glyphicon glyphicon-remove"></span> Eliminar';
		button2.className = "btn btn-danger btn-xs";
		button2.addEventListener("click", ()=>this.eliminarComida(comida._id));

		td6.appendChild(button);
		td6.appendChild(button1);
		td6.appendChild(button2);
		tr.appendChild(td6);

		return tr;
	}

	editarComida(divContenidoModal, id){
		console.log("editando");
		let cmbTipo = divContenidoModal.querySelector("#cmbTipo");
		var x = cmbTipo.selectedIndex;
    	var y = cmbTipo.options;
    	let txtTipo = y[x].text;
		let txtPrecio = divContenidoModal.querySelector("#txtPrecio").value;
		let txtCalorias = divContenidoModal.querySelector("#txtCalorias").value;
		let txtExistencias = divContenidoModal.querySelector("#txtExistencias").value;
		let txtNombre = divContenidoModal.querySelector("#txtNombre").value;

		let comida = new Comida(txtTipo, txtPrecio, txtCalorias, txtExistencias, txtNombre, id);

		this._comidaApiClient.editarComida(comida).then((data) => {
			let mensaje = divContenidoModal.querySelector("#mensaje");
			mensaje.innerHTML = data._mensaje;
			this.getAllComidasAndPaint();
		});
	}

	eliminarComida(id){
		this._comidaApiClient.borrarComida(id).then((data) => {
			let mensaje = this._contenedor.querySelector("#mensajeTabla");	
			mensaje.innerHTML = data._mensaje;
			this.getAllComidasAndPaint();
		});
	}

	agregarComida(divContenidoModal){
		console.log("nueva comida");
		let cmbTipo = divContenidoModal.querySelector("#cmbTipo");
		var x = cmbTipo.selectedIndex;
    	var y = cmbTipo.options;
    	let txtTipo = y[x].text;
		let txtPrecio = divContenidoModal.querySelector("#txtPrecio").value;
		let txtCalorias = divContenidoModal.querySelector("#txtCalorias").value;
		let txtExistencias = divContenidoModal.querySelector("#txtExistencias").value;
		let txtNombre = divContenidoModal.querySelector("#txtNombre").value;

		let comida = new Comida(txtTipo, txtPrecio, txtCalorias, txtExistencias, txtNombre);

		this._comidaApiClient.registrarComida(comida).then((data) => {
			let mensaje = divContenidoModal.querySelector("#mensaje");
			mensaje.innerHTML = data._mensaje;
			this.getAllComidasAndPaint();
		});
	}

	verEditarComida(id){
		this._comidaApiClient.obtenerComida(id).then((data) => {
			let divContenidoModal = document.createElement("div");
			let comida = data._objeto;
			let html = `
				<p id="mensaje" class="text-danger"></p>
				<div align="right" id="contieneBoton"><button type="button" class="btn btn-info" id="btnEditarComida"><span class='glyphicon glyphicon-pencil'></span> Editar </button></div>
				<label>Tipo</label>
				<select id="cmbTipo" class='form-control' >
				  <option id="Entrante">Entrante</option>
				  <option id="Principal">Principal</option>
				  <option id="Postre">Postre</option>
				</select>
				<label>Precio : </label>
				<input type='text' class='form-control' id="txtPrecio" value='${comida._precio}'>
				<label>Calorías : </label>
				<input type='text' class='form-control' id="txtCalorias" value='${comida._calorias}'>
				<label>Existencias : </label>
				<input type='text' class='form-control' id="txtExistencias" value='${comida._existencias}'>
				<label>Nombre :</label>
				<input type='text' class='form-control' id="txtNombre" value='${comida._nombre}'>				
			`;	
			divContenidoModal.innerHTML = html;
			let btnEditarComida = divContenidoModal.querySelector("#btnEditarComida");
			let cmbTipo = divContenidoModal.querySelector("#cmbTipo");
			cmbTipo.options.namedItem("" + comida._tipo).selected = true;
			btnEditarComida.addEventListener("click", ()=>{this.editarComida(divContenidoModal, id)});
			this._modalController.openModal("Editar Comida", divContenidoModal);
			
		});			
	}

	verDetalleComida(id){
		this._comidaApiClient.obtenerComida(id).then((data) => {
			let divContenidoModal = document.createElement("div");
			let comida = data._objeto;
			let html = `
				<label>Tipo</label>
				<input type='text' class='form-control' value='${comida._tipo}' disabled>
				<label>Precio : </label>
				<input type='text' class='form-control' value='${comida._precio}' disabled>
				<label>Calorías : </label>
				<input type='text' class='form-control' value='${comida._calorias}' disabled>
				<label>Existencias : </label>
				<input type='text' class='form-control' value='${comida._existencias}' disabled>
				<label>Nombre :</label>
				<input type='text' class='form-control' value='${comida._nombre}' disabled>				
			`;	
			divContenidoModal.innerHTML = html;			
			this._modalController.openModal("Detalle Comida", divContenidoModal);
		});			
	}

	verAgregarComida(){
		let divContenidoModal = document.createElement("div");
		let html = `
				<p id="mensaje" class="text-danger"></p>
				<div align="right" id="contieneBoton"><button type="button" class="btn btn-info" id="btnAgregarComida"><span class='glyphicon glyphicon-plus'></span> Agregar </button></div>
				<label>Tipo</label>
				<select id="cmbTipo" class='form-control' >
				  <option id="Entrante">Entrante</option>
				  <option id="Principal">Principal</option>
				  <option id="Postre">Postre</option>
				</select>
				<label>Precio : </label>
				<input type='text' class='form-control' id="txtPrecio" value=''>
				<label>Calorías : </label>
				<input type='text' class='form-control' id="txtCalorias" value=''>
				<label>Existencias : </label>
				<input type='text' class='form-control' id="txtExistencias" value=''>
				<label>Nombre :</label>
				<input type='text' class='form-control' id="txtNombre" value=''>				
			`;
		divContenidoModal.innerHTML = html;
		let btnAgregarComida = divContenidoModal.querySelector("#btnAgregarComida");
		btnAgregarComida.addEventListener("click", () => { this.agregarComida(divContenidoModal) });
		this._modalController.openModal("Nueva Comida", divContenidoModal);		
	}

	paintContent(){
		let promise = this.leerTemplate(this._contenido);
		promise.then(content => {
				let titulo = this._titulo;
				let templateString = eval('`' + content + '`');

				let contenido = this._contenedor.querySelector("#contenido");
                contenido.innerHTML = templateString; 
                this.getAllComidasAndPaint();
                let btnNuevoComida = contenido.querySelector("#btnNuevoComida");			
				btnNuevoComida.addEventListener("click", ()=>{this.verAgregarComida()});
            });        
	}

}

class BebidasPage extends InnerPage{
	constructor(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, userservice){
		super(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, userservice);		
	}	

	init(data){
		this.paint();
		this._contenido = "bebidas.html";
		this.paintContent();
	}

	paintContent(){

		let promise = this.leerTemplate(this._contenido);
		promise.then(content => {
				let titulo = this._titulo;
				let templateString = eval('`' + content + '`');

				let contenido = this._contenedor.querySelector("#contenido");
                contenido.innerHTML = templateString;               
            });         
	}

}

class PerfilPage extends InnerPage{
	constructor(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, userservice){
		super(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, userservice);		
	}	

	init(data){
		this.paint();
		this._contenido = "perfil.html";
		this.paintContent();
	}

	
	paintContent(){
		let usuario

		let promise = this.leerTemplate(this._contenido);
		promise.then(content => {
				let titulo = this._titulo;
				//let user  = this._userservice.user;
				let user  = null;
				this._userservice.obtenerUsuario().then((response)=>{
					if(response.result){
						user = response.user;

						let id = user._id;
						let password = "";
						let username = user._username;
						let nombre = user._nombre;
						let apellidos = user._apellidos;
						let email = user._email;
						let templateString = eval('`' + content + '`');
						let contenido = this._contenedor.querySelector("#contenido");
		                contenido.innerHTML = templateString;               
						let btnEditarPerfil = contenido.querySelector("#btnEditarPerfil");
						btnEditarPerfil.addEventListener("click", () => this.vistaEdicion(contenido));
						let btnGuardarPerfil = contenido.querySelector("#btnGuardarPerfil");
						btnGuardarPerfil.addEventListener("click", () => this.guardarPerfil(contenido));
					}					
				});				
            });        
	}

	vistaEdicion(contenido){
		let noEditable = contenido.querySelector("#noEditable");
		let editable = contenido.querySelector("#editable");
		noEditable.setAttribute("style","display:none");
		editable.setAttribute("style","");
		let btnEditarPerfil = contenido.querySelector("#btnEditarPerfil");
		let btnGuardarPerfil = contenido.querySelector("#btnGuardarPerfil");
		btnEditarPerfil.setAttribute("style","display:none");
		btnGuardarPerfil.setAttribute("style","");		
	}

	vistaSoloLectura(contenido){
		let noEditable = contenido.querySelector("#noEditable");
		let editable = contenido.querySelector("#editable");
		noEditable.setAttribute("style","");
		editable.setAttribute("style","display:none");
		let btnEditarPerfil = contenido.querySelector("#btnEditarPerfil");
		let btnGuardarPerfil = contenido.querySelector("#btnGuardarPerfil");
		btnEditarPerfil.setAttribute("style","");
		btnGuardarPerfil.setAttribute("style","display:none");		
	}

	guardarPerfil(contenido){
		let username = contenido.querySelector("#username").value;
		let nombre = contenido.querySelector("#nombre").value;
		let apellidos = contenido.querySelector("#apellidos").value;
		let email = contenido.querySelector("#email").value;
		let id = contenido.querySelector("#id").value;
		let password = this._userservice._user._password;
		Loader.activaLoading();
		this._userservice.editarUsuario(username, password, email, apellidos, nombre, id).then((response)=>{
			let mensaje = contenido.querySelector("#mensaje");
			mensaje.innerHTML = response._mensaje;
			if(response._result){
				let nombreUser = this._contenedor.querySelector("#nombreUser");						
				this._userservice._user = response._user;
				nombreUser.innerHTML = response._objeto._nombre + " " + response._objeto._apellidos;
			}
			Loader.desactivaLoading();
		});	
	}

}