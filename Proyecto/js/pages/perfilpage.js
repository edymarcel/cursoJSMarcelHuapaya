class PerfilPage extends InnerPage{
	constructor(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, customPanelController, userservice){
		super(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, customPanelController, userservice);		
	}	

	init(data){
		let otherPromise = this.paint();		

		otherPromise.then(() => {
			this._contenido = "perfil.html";
			this.paintContent();		
		})
	}

	
	paintContent(){
		Loader.activaLoading();
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
						let btnEliminarPerfil = contenido.querySelector("#btnEliminarPerfil");
						btnEliminarPerfil.addEventListener("click", () => this.advertirEliminar(contenido));
						Loader.desactivaLoading();	
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
			//let mensaje = contenido.querySelector("#mensaje");
			//mensaje.innerHTML = response._mensaje;
			if(response._result){
				let nombreUser = this._contenedor.querySelector("#nombreUser");		
				let pass = this._userservice._user._password;				
				this._userservice._user = response._objeto;				
				this._userservice.setUserIntoLocalStorage();
				this._userservice._user._password = pass;//no guardar pw en localstorage
				nombreUser.innerHTML = response._objeto._nombre + " " + response._objeto._apellidos;

				
				let mensaje = document.createElement("div");
				mensaje.innerHTML = response._mensaje;
				this._customPanelController.pintarMensajeExito("Ok", mensaje);
			}else{
				let mensaje = document.createElement("div");
				mensaje.innerHTML =response._mensaje;
				this._customPanelController.pintarMensajeError("Error", mensaje);
			}
			Loader.desactivaLoading();
		}).catch((reason)=> {
			console.log(reason);
			let mensaje = document.createElement("div");
			mensaje.innerHTML = `Ocurrió un error interno`;
			this._customPanelController.pintarMensajeError("Error", mensaje);
		});	
	}

	advertirEliminar(contenido){
		let mensaje = document.createElement("div");
		mensaje.innerHTML = `¿Está seguro que desea eliminar al usuario?
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
			this.eliminarPerfil(contenido);			
		});
		
	}

	eliminarPerfil(contenido){		
		Loader.activaLoading();
		let username = contenido.querySelector("#username").value;
		let nombre = contenido.querySelector("#nombre").value;
		let apellidos = contenido.querySelector("#apellidos").value;
		let email = contenido.querySelector("#email").value;
		let id = contenido.querySelector("#id").value;
		let password = this._userservice._user._password;
		this._userservice.eliminarUsuario(username, password, email, apellidos, nombre, id).then((response)=>{
			let mensaje = contenido.querySelector("#mensaje");
			this._userservice.removeUserAndRecordarInLocalStorage();
			Loader.desactivaLoading();			
			this._navigation.navigateToUrl(Constantes.URL_LOGIN, null);			
		}).catch((reason)=> {
			console.log(reason);
			Loader.desactivaLoading();	
			let mensaje = document.createElement("div");
			mensaje.innerHTML = `Ocurrió un error interno`;
			this._customPanelController.pintarMensajeError("Error", mensaje);
		});
	}

}