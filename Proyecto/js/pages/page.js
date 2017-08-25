class Page {
	constructor(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, customPanelController){
		this._id = id;
		this._label = label;
		this._espartemenu = espartemenu;
		this._titulo = titulo;
		this._url = url;
		this._autenticado = autenticado;
		this._html =html;
		this._navigation =navigation;
		this._contenedor =contenedor;	
		this._customPanelController = customPanelController;	
	}

	leerTemplate(html) {
    	html = "./js/pages/html/" + html;
    	
        let promise = fetch(html)
            .then(res => res.text())
            .then(content => {
            	if(content.indexOf("Error")<0){

            		return {content:content,
            			resultado:true
            		};
            	} else{
            		return ({
	                    content:"No se pudo leer la plantilla",
            			resultado:false
	                });
            	}               
            }).catch((reason)=> {
				return ({
                    message:"No se pudo leer la plantilla",
            			resultado:false
                });
			});

		
        return promise;
    }	
}