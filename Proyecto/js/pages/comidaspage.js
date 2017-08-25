class ComidasPage extends InnerPage{
	constructor(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, customPanelController, userservice, comidaApiClient){
		super(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, customPanelController, userservice);	
		this._comidaApiClient = comidaApiClient;	
	}	

	init(data){
		let otherPromise = this.paint();		

		otherPromise.then(() => {
			this._contenido = "comidas.html";
			this.paintContent();		
		})
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
		button1.className = "btn btn-warning btn-xs";
		button1.addEventListener("click", ()=>this.verEditarComida(comida._id));

		let button2 = document.createElement("button");
		button2.innerHTML = '<span class="glyphicon glyphicon-remove"></span> Eliminar';
		button2.className = "btn btn-danger btn-xs";
		button2.addEventListener("click", ()=>this.advertirEliminarComida(comida._id));

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
		Loader.activaLoading();
		this._comidaApiClient.editarComida(comida).then((data) => {
			this.getAllComidasAndPaint();

			Loader.desactivaLoading();	
			let mensaje = divContenidoModal.querySelector("#mensaje");
			mensaje.innerHTML = "";
			
			let contenidoMensaje = document.createElement("div");
			contenidoMensaje.innerHTML = data._mensaje;
			if(data._result){
				let msj = this._customPanelController.retornarMensajeExitoNoModal("Éxito", contenidoMensaje);
				mensaje.appendChild(msj);
			}else{
				let msj = this._customPanelController.retornarMensajeErrorNoModal("Error", contenidoMensaje);
				mensaje.appendChild(msj);
			}
		});
	}

	eliminarComida(id){
		Loader.activaLoading();
		this._comidaApiClient.borrarComida(id).then((data) => {
			//let mensaje = this._contenedor.querySelector("#mensajeTabla");	
			//mensaje.innerHTML = data._mensaje;
			Loader.desactivaLoading();
			this.getAllComidasAndPaint();
			let mensaje = document.createElement("div");
			mensaje.innerHTML = data._mensaje;
			if(data._result){				
				this._customPanelController.pintarMensajeExito("Éxito", mensaje);
			}else{
				this._customPanelController.pintarMensajeError("Error", mensaje);
			}
		});
	}

	advertirEliminarComida(id){
		let mensaje = document.createElement("div");
		mensaje.innerHTML = `¿Está seguro que desea eliminar esta comida?
			<br/>
			<button class="btn btn-warning" type="button"
                    id="btnSi"><span class="glyphicon glyphicon-ok"></span> Sí</button>
            <button class="btn btn-warning" type="button"
                    id="btnNo"><span class="glyphicon glyphicon-remove"></span> No</button>
		`;
		this._customPanelController.pintarAdvertencia("Advertencia", mensaje);
		let btnNo = contenedorModal.querySelector("#btnNo");
		btnNo.addEventListener("click", () => this._customPanelController.closeModal());

		let btnSi = contenedorModal.querySelector("#btnSi");
		btnSi.addEventListener("click", () => {
			this._customPanelController.closeModal();
			this.eliminarComida(id);			
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
		Loader.activaLoading();
		this._comidaApiClient.registrarComida(comida).then((data) => {
			this.getAllComidasAndPaint();
			Loader.desactivaLoading();	
			let mensaje = divContenidoModal.querySelector("#mensaje");
			mensaje.innerHTML = "";
			
			let contenidoMensaje = document.createElement("div");
			contenidoMensaje.innerHTML = data._mensaje;
			if(data._result){
				let msj = this._customPanelController.retornarMensajeExitoNoModal("Éxito", contenidoMensaje);
				mensaje.appendChild(msj);
			}else{
				let msj = this._customPanelController.retornarMensajeErrorNoModal("Error", contenidoMensaje);
				mensaje.appendChild(msj);
			}
		});
	}

	verEditarComida(id){
		Loader.activaLoading();
		this._comidaApiClient.obtenerComida(id).then((data) => {
			if(data._result){
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
					<label>Precio (0-10000): </label>
					<input type='text' class='form-control' id="txtPrecio" value='${comida._precio}'>
					<label>Calorías (0-5000): </label>
					<input type='text' class='form-control' id="txtCalorias" value='${comida._calorias}'>
					<label>Existencias (0-1000): </label>
					<input type='text' class='form-control' id="txtExistencias" value='${comida._existencias}'>
					<label>Nombre :</label>
					<input type='text' class='form-control' id="txtNombre" value='${comida._nombre}'>				
				`;	
				divContenidoModal.innerHTML = html;
				//validaciones
				let txtPrecio = divContenidoModal.querySelector("#txtPrecio");
				txtPrecio.setAttribute("onkeypress", "return Utiles.isNumber(event)");
				txtPrecio.setAttribute("onkeyup", "Utiles.validaValorMaxMin(this, 10000, 0)");
				let txtCalorias = divContenidoModal.querySelector("#txtCalorias");
				txtCalorias.setAttribute("onkeypress", "return Utiles.isNumber(event)");
				txtCalorias.setAttribute("onkeyup", "Utiles.validaValorMaxMin(this, 5000, 0)");
				let txtExistencias = divContenidoModal.querySelector("#txtExistencias");
				txtExistencias.setAttribute("onkeypress", "return Utiles.isNumber(event)");
				txtExistencias.setAttribute("onkeyup", "Utiles.validaValorMaxMin(this, 1000, 0)");
				let txtNombre = divContenidoModal.querySelector("#txtNombre");
				txtNombre.setAttribute("onkeypress", "return Utiles.validaTamanoMaxMin(event,this, 100, 4)");
				
				let btnEditarComida = divContenidoModal.querySelector("#btnEditarComida");
				let cmbTipo = divContenidoModal.querySelector("#cmbTipo");
				cmbTipo.options.namedItem("" + comida._tipo).selected = true;
				btnEditarComida.addEventListener("click", ()=>{this.editarComida(divContenidoModal, id)});
				
				this._customPanelController.openModal("Editar Comida", divContenidoModal);
			}else{
				let mensaje = document.createElement("div");
				mensaje.innerHTML = data._mensaje;
				this._customPanelController.pintarMensajeError("Error", mensaje);
			}
			Loader.desactivaLoading();	
			
		});			
	}

	verDetalleComida(id){
		Loader.activaLoading();
		this._comidaApiClient.obtenerComida(id).then((data) => {
			if(data._result){
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
				
				this._customPanelController.openModal("Detalle Comida", divContenidoModal);
			}else{
				let mensaje = document.createElement("div");
				mensaje.innerHTML = data._mensaje;
				this._customPanelController.pintarMensajeError("Error", mensaje);
			}
			Loader.desactivaLoading();	
			
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
				<label>Precio (0-10000): </label>
				<input type='text' class='form-control' id="txtPrecio" value=''>
				<label>Calorías (0-5000) : </label>
				<input type='text' class='form-control' id="txtCalorias" value=''>
				<label>Existencias (0-1000): </label>
				<input type='text' class='form-control' id="txtExistencias" value=''>
				<label>Nombre :</label>
				<input type='text' class='form-control' id="txtNombre" value=''>				
			`;
		divContenidoModal.innerHTML = html;
		///validaciones
		let txtPrecio = divContenidoModal.querySelector("#txtPrecio");
		txtPrecio.setAttribute("onkeypress", "return Utiles.isNumber(event)");
		txtPrecio.setAttribute("onkeyup", "Utiles.validaValorMaxMin(this, 10000, 0)");
		let txtCalorias = divContenidoModal.querySelector("#txtCalorias");
		txtCalorias.setAttribute("onkeypress", "return Utiles.isNumber(event)");
		txtCalorias.setAttribute("onkeyup", "Utiles.validaValorMaxMin(this, 5000, 0)");
		let txtExistencias = divContenidoModal.querySelector("#txtExistencias");
		txtExistencias.setAttribute("onkeypress", "return Utiles.isNumber(event)");
		txtExistencias.setAttribute("onkeyup", "Utiles.validaValorMaxMin(this, 1000, 0)");
		let txtNombre = divContenidoModal.querySelector("#txtNombre");
		txtNombre.setAttribute("onkeypress", "return Utiles.validaTamanoMaxMin(event,this, 100, 4)");

		let btnAgregarComida = divContenidoModal.querySelector("#btnAgregarComida");
		btnAgregarComida.addEventListener("click", () => { this.agregarComida(divContenidoModal) });
		this._customPanelController.openModal("Nueva Comida", divContenidoModal);		
	}

	paintContent(){
		let promise = this.leerTemplate(this._contenido);
		promise.then(content => {
				let titulo = this._titulo;
				let templateString = eval('`' + content.content + '`');

				let contenido = this._contenedor.querySelector("#contenido");

                contenido.innerHTML = templateString;                 
                let btnNuevoComida = contenido.querySelector("#btnNuevoComida");			
				btnNuevoComida.addEventListener("click", ()=>{this.verAgregarComida()});
				this.getAllComidasAndPaint();
            });        
	}

}