class BebidasPage extends InnerPage{
	constructor(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, customPanelController, userservice, bebidaApiClient){
		super(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, customPanelController, userservice);	
		this._bebidaApiClient = bebidaApiClient;		
		
	}	

	init(data){		
		let otherPromise = this.paint();		

		otherPromise.then(() => {
			this._contenido = "bebidas.html";
			this.paintContent();		
		})
	}

	paintContent(){

		let promise = this.leerTemplate(this._contenido);
		promise.then(content => {
				let titulo = this._titulo;
				let templateString = eval('`' + content.content + '`');

				let contenido = this._contenedor.querySelector("#contenido");
                contenido.innerHTML = templateString;  

                this.getAllBebidasAndPaint();
                let btnNuevoBebida = contenido.querySelector("#btnNuevoBebida");			
				btnNuevoBebida.addEventListener("click", ()=>{this.verAgregarBebida()});             
            });         
	}

	getAllBebidasAndPaint(){		
		this._bebidaApiClient.getAllBebidas().then((data) => {
			this.paintAllBebidas(data);			
		});
	}

	paintAllBebidas(data){
		let contenido = this._contenedor.querySelector("#contenido");
		let tbody = contenido.querySelector("tbody");
		tbody.innerHTML = "";
		for (var i = 0; i < data.length; i++) {
			let bebida = data[i];
			let row = this.getRowInfoForBebidas(bebida, i);
			let rowDetalle = this.getRowDetalleForBebidas(bebida, i);
			tbody.appendChild(row);
			tbody.appendChild(rowDetalle);
		}
	}
	
	getRowInfoForBebidas(bebida, num){
		let tr = document.createElement("tr");
		tr.setAttribute("id", "info" + num);
		
		let td1 = document.createElement("td");
		td1.innerHTML = bebida._esAlcoholica==true || bebida._esAlcoholica=='true'?'Sí':'No';
		td1.setAttribute("class", "text-center");
		tr.appendChild(td1);

		let td2 = document.createElement("td");
		td2.innerHTML = bebida._precio;
		td2.setAttribute("class", "text-center");
		tr.appendChild(td2);

		let td4 = document.createElement("td");
		td4.innerHTML = bebida._existencias;
		td4.setAttribute("class", "text-center");
		tr.appendChild(td4);

		let td5 = document.createElement("td");
		td5.innerHTML = bebida._nombre;
		td5.setAttribute("class", "text-center");
		tr.appendChild(td5);

		let td6 = document.createElement("td");
		td6.className ="text-center"
		let button = document.createElement("button");
		button.innerHTML = '<span class="glyphicon glyphicon-eye-open"></span> Ver';
		button.className = "btn btn-info btn-xs";
		button.setAttribute("id", "verdetalle" + num);
		button.addEventListener("click", ()=>this.verDetalle(num));

		let button1 = document.createElement("button");
		button1.innerHTML = '<span class="glyphicon glyphicon-eye-close"></span> Ocultar';
		button1.className = "btn btn-info btn-xs";
		button1.setAttribute("id", "ocultardetalle" + num);
		button1.setAttribute("style", "display:none");
		button1.addEventListener("click", ()=>this.ocultarDetalle(num));

		td6.appendChild(button);
		td6.appendChild(button1);
		tr.appendChild(td6);

		return tr;
	}

	verDetalle(num){
		let contenido = this._contenedor.querySelector("#contenido");
		let tbody = contenido.querySelector("tbody");
		console.log(tbody);
		let detalle = tbody.querySelector("#detalle" + num);
		detalle.setAttribute("style", "");

		let ocultardetalle = tbody.querySelector("#ocultardetalle" + num);
		ocultardetalle.setAttribute("style", "");

		let verdetalle = tbody.querySelector("#verdetalle" + num);
		verdetalle.setAttribute("style", "display:none");
	}

	ocultarDetalle(num){
		let contenido = this._contenedor.querySelector("#contenido");
		let tbody = contenido.querySelector("tbody");		
		let detalle = tbody.querySelector("#detalle" + num);
		detalle.setAttribute("style", "display:none");

		let ocultardetalle = tbody.querySelector("#ocultardetalle" + num);
		ocultardetalle.setAttribute("style", "display:none");

		let verdetalle = tbody.querySelector("#verdetalle" + num);
		verdetalle.setAttribute("style", "");
	}

	getRowDetalleForBebidas(bebida, num){
		let tr = document.createElement("tr");
		tr.setAttribute("id", "detalle" + num);
		tr.setAttribute("style", "display:none");
		let checked = bebida._esAlcoholica==true || bebida._esAlcoholica=='true'?'checked':'';
		let td1 = document.createElement("td");
		td1.innerHTML = `
			<div class="col-md-12">
                <p id="mensajedet" class="text-danger"></p>
                <div align="right" id="contieneBoton">
                    <button class="btn btn-info btn-xs" id="btnEditarBebida${num}"><span class="glyphicon glyphicon-floppy-disk"></span> Guardar</button>
                    <button class="btn btn-danger btn-xs" id="btnEliminarBebida${num}"><span class="glyphicon glyphicon-trash"></span> Eliminar</button>
                </div>
                <label>Bebida Alcoholica :
                    <input type="checkbox" id="chkAlcoholica" ${checked}>
                </label>
                <br/>
                <label>Grados (0-100):</label>
                <input type='text' class='form-control' id="txtGrados" value='${bebida._grados}'>
                <label>Precio (0-10000): </label>
                <input type='text' class='form-control' id="txtPrecio" value='${bebida._precio}'>
                <label>Calorías (0-5000): </label>
                <input type='text' class='form-control' id="txtCalorias" value='${bebida._calorias}'>
                <label>Existencias (0-1000): </label>
                <input type='text' class='form-control' id="txtExistencias" value='${bebida._existencias}'>
                <label>Nombre :</label>
                <input type='text' class='form-control' id="txtNombre" value='${bebida._nombre}'>
                <input type='hidden' class='form-control' id="txtId" value='${bebida._id}'>
            </div>
		`;

		//validaciones
		let txtGrados = td1.querySelector("#txtGrados");
		txtGrados.setAttribute("onkeypress", "return Utiles.isNumber(event)");
		txtGrados.setAttribute("onkeyup", "Utiles.validaValorMaxMin(this, 100, 0)");
		let txtPrecio = td1.querySelector("#txtPrecio");
		txtPrecio.setAttribute("onkeypress", "return Utiles.isNumber(event)");
		txtPrecio.setAttribute("onkeyup", "Utiles.validaValorMaxMin(this, 10000, 0)");
		let txtCalorias = td1.querySelector("#txtCalorias");
		txtCalorias.setAttribute("onkeypress", "return Utiles.isNumber(event)");
		txtCalorias.setAttribute("onkeyup", "Utiles.validaValorMaxMin(this, 5000, 0)");
		let txtExistencias = td1.querySelector("#txtExistencias");
		txtExistencias.setAttribute("onkeypress", "return Utiles.isNumber(event)");
		txtExistencias.setAttribute("onkeyup", "Utiles.validaValorMaxMin(this, 1000, 0)");
		let txtNombre = td1.querySelector("#txtNombre");
		txtNombre.setAttribute("onkeypress", "return Utiles.validaTamanoMaxMin(event,this, 100, 4)");

		let btnEditarBebida = td1.querySelector("#btnEditarBebida" + num);
		btnEditarBebida.addEventListener("click", ()=>this.editarBebida(td1));

		let btnEliminarBebida = td1.querySelector("#btnEliminarBebida" + num);
		btnEliminarBebida.addEventListener("click", ()=>this.advertirEliminarBebida(td1));

		td1.setAttribute("class", "col-md-12");
		td1.setAttribute("colspan", "5");
		tr.appendChild(td1);
		return tr;
	}

	editarBebida(elemento){
		console.log("editando");
		let txtId = elemento.querySelector("#txtId").value;
		let txtGrados = elemento.querySelector("#txtGrados").value;
		let chkAlcoholica = elemento.querySelector("#chkAlcoholica").checked
		let txtPrecio = elemento.querySelector("#txtPrecio").value;
		let txtCalorias = elemento.querySelector("#txtCalorias").value;
		let txtExistencias = elemento.querySelector("#txtExistencias").value;
		let txtNombre = elemento.querySelector("#txtNombre").value;

		let bebida = new Bebida(txtGrados, chkAlcoholica, txtPrecio, txtCalorias, txtExistencias, txtNombre, txtId);
		Loader.activaLoading();
		this._bebidaApiClient.editarBebida(bebida).then((data) => {
			let mensaje = document.createElement("div");
			mensaje.innerHTML = data._mensaje;
			if(data._result){
				this._customPanelController.pintarMensajeExito("Éxito", mensaje);
				this.getAllBebidasAndPaint();
			}else{
				this._customPanelController.pintarMensajeError("Error", mensaje);
			}						
			Loader.desactivaLoading();
		});
	}

	eliminarBebida(elemento){
		Loader.activaLoading();
		let txtId = elemento.querySelector("#txtId").value;
		this._bebidaApiClient.borrarBebida(txtId).then((data) => {
			let mensaje = document.createElement("div");
			mensaje.innerHTML = data._mensaje;
			if(data._result){
				this._customPanelController.pintarMensajeExito("Éxito", mensaje);
				this.getAllBebidasAndPaint();
			}else{
				this._customPanelController.pintarMensajeError("Error", mensaje);
			}
			Loader.desactivaLoading();
		});
	}

	advertirEliminarBebida(elemento){
		let mensaje = document.createElement("div");
		mensaje.innerHTML = `¿Está seguro que desea eliminar esta bebida?
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
			this.eliminarBebida(elemento);			
		});
	}

	agregarBebida(divContenidoModal){
		console.log("nueva bebida");
		let txtGrados = divContenidoModal.querySelector("#txtGrados").value;
		let chkAlcoholica = divContenidoModal.querySelector("#chkAlcoholica").checked
		let txtPrecio = divContenidoModal.querySelector("#txtPrecio").value;
		let txtCalorias = divContenidoModal.querySelector("#txtCalorias").value;
		let txtExistencias = divContenidoModal.querySelector("#txtExistencias").value;
		let txtNombre = divContenidoModal.querySelector("#txtNombre").value;

		let bebida = new Bebida(txtGrados, chkAlcoholica, txtPrecio, txtCalorias, txtExistencias, txtNombre);
		Loader.activaLoading();
		this._bebidaApiClient.registrarBebida(bebida).then((data) => {
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

			this.getAllBebidasAndPaint();
			Loader.desactivaLoading();
		});
	}

	verAgregarBebida(){
		let divContenidoModal = document.createElement("div");
		let html = `
				<p id="mensaje" class="text-danger"></p>
				<div align="right" id="contieneBoton">
					<button type="button" class="btn btn-info" id="btnAgregarBebida">
						<span class='glyphicon glyphicon-plus'></span> Agregar 
					</button>
				</div>
				<label>Bebida Alcoholica : <input type="checkbox" id="chkAlcoholica"></label>	<br/>						
				<label>Grados (0-100):</label>
				<input type='text' class='form-control' id="txtGrados" value=''>
				<label>Precio (0-10000): </label>
				<input type='text' class='form-control' id="txtPrecio" value=''>
				<label>Calorías (0-5000): </label>
				<input type='text' class='form-control' id="txtCalorias" value=''>
				<label>Existencias (0-1000): </label>
				<input type='text' class='form-control' id="txtExistencias" value=''>
				<label>Nombre :</label>
				<input type='text' class='form-control' id="txtNombre" value=''>				
			`;
		divContenidoModal.innerHTML = html;

		//validaciones
		let txtGrados = divContenidoModal.querySelector("#txtGrados");
		txtGrados.setAttribute("onkeypress", "return Utiles.isNumber(event)");
		txtGrados.setAttribute("onkeyup", "Utiles.validaValorMaxMin(this, 100, 0)");
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

		let btnAgregarBebida = divContenidoModal.querySelector("#btnAgregarBebida");
		btnAgregarBebida.addEventListener("click", () => { this.agregarBebida(divContenidoModal) });
		this._customPanelController.openModal("Nueva Bebida", divContenidoModal);		
	}

}
