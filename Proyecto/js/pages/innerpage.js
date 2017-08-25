class InnerPage extends Page{
	constructor(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, customPanelController, userservice){
		super(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, customPanelController);
		this._contenido = null;
		this._userservice = userservice;		
	}

	paint(){
		let promise = this.leerTemplate(this._html);
		Loader.activaLoading();
		let otherPromise = promise.then(content => {
				console.log(content.resultado);
				
					let titulo = this._titulo;	
					let user  = this._userservice.user;
					let nombre = user._nombre + " " + user._apellidos;				
	                let templateString = eval('`' + content.content + '`');
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
            }).catch((reason)=> {
            	console.log(reason);
								
			});
		return otherPromise;
	}

	cerrarSesion(){
		this._userservice.removeUserAndRecordarInLocalStorage();
		this._navigation.navigateToUrl(Constantes.URL_LOGIN, null);
	}
}

