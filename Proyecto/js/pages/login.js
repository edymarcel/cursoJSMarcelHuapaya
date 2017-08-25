class LoginPage extends Page{
	constructor(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, customPanelController, userservice){
		super(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, customPanelController);
		this._userservice = userservice;
	}

	init(data){
		this.paint();

	}

	validaLogin(){
		Loader.activaLoading();
		let txtUser = this._contenedor.querySelector("#user").value;
		let txtPassword = this._contenedor.querySelector("#pass").value;
		let chkRecordar = this._contenedor.querySelector("#chkRecordar").checked;
		let promise = this._userservice.validaLogin(txtUser, txtPassword);
		promise.then(
				(data) => {
					this.resultadoLogin(data, chkRecordar);		
					Loader.desactivaLoading();	
				}
		);
	}

	resultadoLogin(data, recordar){
		if(data.result){		
			this._userservice._user = data.user;
			this._userservice.setUserIntoLocalStorage();			
			if(recordar){
				this._userservice.setRecordarIntoLocalStorage();
			}

			this._navigation.navigateToUrl(Constantes.URL_HOME, null);
		}else{
			let mensaje = document.createElement("div");
			mensaje.innerHTML = data.mensaje;
			this._customPanelController.pintarMensajeError("Error", mensaje);
		}
	}

	paint(){

		let promise = this.leerTemplate(this._html);
		promise.then(content => {
				let titulo = this._titulo;
				let templateString = eval('`' + content.content + '`');
				this._contenedor.innerHTML = templateString;

                let btnLogin = this._contenedor.querySelector("#btnLogin");
                
				btnLogin.addEventListener("click", () => this.validaLogin());
				let lnkRegister = this._contenedor.querySelector("#lnkRegister");
				lnkRegister.addEventListener("click", 
						() => this._navigation.navigateToUrl(Constantes.URL_CREAR_CUENTA, null)
					);

            });
	}
}
