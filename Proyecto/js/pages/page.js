class Page {
	constructor(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor){
		this._id = id;
		this._label = label;
		this._espartemenu = espartemenu;
		this._titulo = titulo;
		this._url = url;
		this._autenticado = autenticado;
		this._html =html;
		this._navigation =navigation;
		this._contenedor =contenedor;		
	}

	leerTemplate(html) {
    	html = "./js/pages/html/" + html;
    	
        let promise = fetch(html)
            .then(res => res.text())
            .then(content => {
                return content;
            });
        return promise;
    }

	
}