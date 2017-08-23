class CrearCuenta extends Page{
	constructor(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, userservice){
		super(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor);
		this._userservice = userservice;		
	}

	init(data){
		this.paint();
	}

	registrarUsuario(){
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
				}
			);
	}

	resultadoRegistro(data){
		if(data){			
			this._navigation.navigateToUrl(Constantes.URL_LOGIN, null);
		}
	}

	paint(){

		let promise = Util.leerHtml(this._html);
		promise.then(content => {
				//console.log(content);
				let titulo = this._titulo;
				content=content.replace(/{titulo}/g, titulo);
                this._contenedor.innerHTML = content;    
                let btnRegistrar = this._contenedor.querySelector("#btnRegistrar");
				btnRegistrar.addEventListener("click", () => this.registrarUsuario());           
            });
	}
}