class ComidaApiClient{
	constructor(apiClient){
		this._baseUrl = "http://formacion-indra-franlindebl.com/api/comidas";
		this._apiClient = apiClient;
	}

	registrarComida(comida){
		let completeUrl = this._baseUrl;
		
		let objeto = comida.createObjectFromComida();
		let promise = this._apiClient.post(completeUrl, objeto);
		var anotherPromise = promise.then((data)=>{
			console.log(data);			
			let response = new RespuestaServicio(null, true, data.message, null)
			return response;
		}).catch((reason)=> {
			console.log(reason);
			let response = new RespuestaServicio(null, false, "Ocurrió un error al grabar", null)
			return response;
		});

		return anotherPromise;
	}	

	editarComida(comida){
		let completeUrl = this._baseUrl + "/" + comida._id;
		console.log(completeUrl);	
		let response = null;
		let objeto = comida.createObjectFromComida();
		console.log(objeto);	
		let promise = this._apiClient.put(completeUrl, objeto);
		var anotherPromise = promise.then((data)=>{
			response = new RespuestaServicio(null, true, data.message, null)
			return response;			
		}).catch((reason)=> {
			console.log(reason);
		    response = new RespuestaServicio(null, false, "Ocurrió un error al grabar", null)
			return response;
		});

		return anotherPromise;
	}

	obtenerComida(id){
		let completeUrl = this._baseUrl + "/" + id;
		console.log(completeUrl);
		let response = null;
		let promise = this._apiClient.get(completeUrl, null);
		var anotherPromise = promise.then((data)=>{			
			let comida = new Comida();
			comida.createComidaFromObject(data);
			response = new RespuestaServicio(comida, true, "OK", null)
			return response;
		});

		return anotherPromise;
	}

	getAllComidas(){
		let completeUrl = this._baseUrl;
		let promise = this._apiClient.get(completeUrl, null);
		var anotherPromise = promise.then((data)=>{
			let comidas = [];
			for (var i = 0; i < data.length; i++) {
				let elemento = data[i];
				let comida = new Comida();
				comida.createComidaFromObject(elemento);
				comidas.push(comida)
			}
			return comidas;
		});

		return anotherPromise;
	}

	borrarComida(id){
		let completeUrl = this._baseUrl + "/" + id;
		console.log(completeUrl);
		let response = null;
		let promise = this._apiClient.delete(completeUrl, null);
		var anotherPromise = promise.then((data)=>{			
			response = new RespuestaServicio(null, true, "Comida eliminada", null)
			return response;
		}).catch((reason)=> {
			console.log(reason);
		    response = new RespuestaServicio(null, false, "Ocurrió un error al eliminar", null)
			return response;
		});

		return anotherPromise;
	}
}

class Comida {
	constructor(tipo, precio, calorias, existencias, nombre, id){
		this._id = id; 
		this._tipo = tipo;
		this._precio = precio;
		this._calorias = calorias;
		this._existencias = existencias;
		this._nombre = nombre;
	}

	createObjectFromComida(){
        let objeto = {
        	"id":this._id,
            "tipo": this._tipo,
            "precio": this._precio,
            "calorias": this._calorias,
            "existencias": this._existencias,
            "nombre": this._nombre
        }
        return objeto;
    }

    createComidaFromObject(objeto){
        this._tipo = objeto.tipo;
        this._precio = objeto.precio;
        this._calorias = objeto.calorias;
        this._existencias = objeto.existencias;
        this._nombre = objeto.nombre;
        this._id = objeto._id;        
    }
}