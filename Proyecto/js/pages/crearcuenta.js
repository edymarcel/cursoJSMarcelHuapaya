class CrearCuenta extends Page{
	constructor(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, customPanelController, userservice){
		super(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, customPanelController);
		this._userservice = userservice;		
	}

	init(data){
		this.paint();
	}

	registrarUsuario(){
		Loader.activaLoading();
		let username = this._contenedor.querySelector("#user").value;
		let password = this._contenedor.querySelector("#pass").value;
		let email = this._contenedor.querySelector("#email").value;
		let apellidos = this._contenedor.querySelector("#apellidos").value;
		let nombre = this._contenedor.querySelector("#nombre").value;
		//console.log(chkRecordar);
		let promise = this._userservice.registrarUsuario(username, password, email, apellidos, nombre);
		promise.then(
				(data) => {
					this.resultadoRegistro(data);	
					Loader.desactivaLoading();			
				}
			);
	}

	resultadoRegistro(data){
		if(data){			
			let mensajeCrearCuenta = this._contenedor.querySelector("#mensajeCrearCuenta");
			let formCrearCuenta = this._contenedor.querySelector("#formCrearCuenta");
			mensajeCrearCuenta.setAttribute("style","");
			formCrearCuenta.setAttribute("style","display:none");
			mensajeCrearCuenta.innerHTML=`
				<label>El usuario ha sido creado correctamente</label>
                <div>Para ir al login hacer clic en el siguiente enlace</div>
                <div class="login-help">
                    <button type="button" id="lnkIrLogin" class="btn btn-sm btn-link">
                                        Ir a Login
                    </button>
                </div>
			`;

			let lnkIrLogin = mensajeCrearCuenta.querySelector("#lnkIrLogin");
				lnkIrLogin.addEventListener("click", () => this._navigation.navigateToUrl(Constantes.URL_LOGIN, null)); 
		}else{
			let mensajeCrearCuenta = this._contenedor.querySelector("#mensajeCrearCuenta");
			let formCrearCuenta = this._contenedor.querySelector("#formCrearCuenta");
			mensajeCrearCuenta.setAttribute("style","");
			mensajeCrearCuenta.innerHTML=``;

			let mensaje = document.createElement("div");
			mensaje.innerHTML = `
				<p id="mensaje" class="text-danger">Ocurrió un error al registrar usuario</p>
			`;
			this._customPanelController.pintarMensajeError("Error", mensaje);
		}
	}

	paint(){

		let promise = this.leerTemplate(this._html);
		promise.then(content => {
				let titulo = this._titulo;
				let templateString = eval('`' + content + '`');
				this._contenedor.innerHTML = templateString;

				let btnRegistrar = this._contenedor.querySelector("#btnRegistrar");
				btnRegistrar.addEventListener("click", () => this.registrarUsuario()); 
				let lnkIrLogin = this._contenedor.querySelector("#lnkIrLogin");
				lnkIrLogin.addEventListener("click", () => this._navigation.navigateToUrl(Constantes.URL_LOGIN, null)); 
            });
	}
}