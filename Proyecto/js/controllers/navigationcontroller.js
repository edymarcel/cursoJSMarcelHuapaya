class NavigationController{
	constructor(){	
		this._pages = [];	
		this._url = null;		
		this._userservice = null;
	}

	init(pages, url, userservice, data){
		this._pages = pages;		
		this._userservice = userservice;
		if(this._userservice.getUserFromLocalStorage()==null){
			this.navigateToUrl(url, data);
		}else{
			if(this._userservice.getRecordarFromLocalStorage()!=null){
				this.navigateToUrl(Constantes.URL_HOME, data);
			}else{
				this.navigateToUrl(url, data);
			}
		}
		
	}

	navigateToUrl(url, data){
		this._url = url;
		let page = this.getPage();
		window.history.pushState(data, page._titulo, "#" + page._url);

		if(page._autenticado){
			if(this._userservice.getUserFromLocalStorage()==null){
				this.navigateToUrl(Constantes.URL_LOGIN, data);				
			}else{
				//Validar si usuario almacenado en localstorge no ha sido eliminado
				Loader.activaLoading();
				this._userservice.obtenerUsuario().then((response)=>{
					if(response.result){
						page.init(data);	
					}else{
						this.navigateToUrl(Constantes.URL_LOGIN, data);	
					}
					Loader.desactivaLoading();
				});		
			}			
		}else{//no necesita autenticacion
			page.init(data);
		}
		
	}

	getPage(){
		for (var i = 0; i < this._pages.length; i++) {
			let page = this._pages[i];
			if(this._url == page._url){
				return page;
			}
		}
	}
	
}