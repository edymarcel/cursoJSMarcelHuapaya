class BebidaApiClient{
	constructor(apiClient){
		this._baseUrl = "http://formacion-indra-franlindebl.com/api/bebidas";
		this._apiClient = apiClient;
	}

	registrarBebida(bebida){
		let completeUrl = this._baseUrl;
		
		let objeto = bebida.createObjectFromBebida();
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

	editarBebida(bebida){
		let completeUrl = this._baseUrl + "/" + bebida._id;
		console.log(completeUrl);	
		let response = null;
		let objeto = bebida.createObjectFromBebida();
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

	obtenerBebida(id){
		let completeUrl = this._baseUrl + "/" + id;
		console.log(completeUrl);
		let response = null;
		let promise = this._apiClient.get(completeUrl, null);
		var anotherPromise = promise.then((data)=>{			
			let bebida = new Bebida();
			bebida.createBebidaFromObject(data);
			response = new RespuestaServicio(bebida, true, "OK", null)
			return response;
		});

		return anotherPromise;
	}

	getAllBebidas(){
		let completeUrl = this._baseUrl;
		let promise = this._apiClient.get(completeUrl, null);
		var anotherPromise = promise.then((data)=>{
			let bebidas = [];
			for (var i = 0; i < data.length; i++) {
				let elemento = data[i];
				let bebida = new Bebida();
				bebida.createBebidaFromObject(elemento);
				bebidas.push(bebida)
			}
			return bebidas;
		});

		return anotherPromise;
	}

	borrarBebida(id){
		let completeUrl = this._baseUrl + "/" + id;
		console.log(completeUrl);
		let response = null;
		let promise = this._apiClient.delete(completeUrl, null);
		var anotherPromise = promise.then((data)=>{			
			response = new RespuestaServicio(null, true, "Bebida eliminada", null)
			return response;
		}).catch((reason)=> {
			console.log(reason);
		    response = new RespuestaServicio(null, false, "Ocurrió un error al eliminar", null)
			return response;
		});

		return anotherPromise;
	}
}

class Bebida {
	constructor(grados, esAlcoholica, precio, calorias, existencias, nombre, id){
		this._id = id; 
		this._grados = grados;
		this._esAlcoholica = esAlcoholica;
		this._precio = precio;
		this._calorias = calorias;
		this._existencias = existencias;
		this._nombre = nombre;
	}

	createObjectFromBebida(){
        let objeto = {
        	"_id":this._id,
            "grados": this._grados,
            "esAlcoholica": this._esAlcoholica,
            "precio": this._precio,
            "calorias": this._calorias,
            "existencias": this._existencias,
            "nombre": this._nombre
        }
        return objeto;
    }

    createBebidaFromObject(objeto){
        this._grados = objeto.grados;
		this._esAlcoholica = objeto.esAlcoholica;
		this._precio = objeto.precio;
        this._calorias = objeto.calorias;
        this._existencias = objeto.existencias;
        this._nombre = objeto.nombre;
        this._id = objeto._id;        
    }
}