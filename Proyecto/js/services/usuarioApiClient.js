class UserApiClient{
	constructor(apiClient){
		this._baseLoginUrl = "http://formacion-indra-franlindebl.com/api/users/login";
		this._baseUrl = "http://formacion-indra-franlindebl.com/api/users";

		this._apiClient = apiClient;
	}

	validateLogin(user){
		let completeUrl = this._baseLoginUrl;
		let response = null;
		let objeto = user.createObjectFromUser();
		let promise = this._apiClient.post(completeUrl, objeto);
		var anotherPromise = promise.then((data)=>{			
			let userObject = new Usuario();
			userObject.createUserFromObject(data);			
			userObject._password = user._password;
			user = userObject;			
			response = {
				"user":userObject,
				"result":true,
				"mensaje":"OK"
			}
			return response;
		}).catch((reason)=> {
			console.log(reason);
			response = {
				"user":user,
				"result":false,
				"mensaje":reason.message
			}
		    return response;
		});

		return anotherPromise;
	}

	//register user
	registrarUsuario(user){
		let completeUrl = this._baseUrl;
		console.log(user);
		let objeto = user.createObjectFromUser();
		let promise = this._apiClient.post(completeUrl, objeto);
		var anotherPromise = promise.then((data)=>{
			console.log(data);			
			return true;
		}).catch((reason)=> {
			console.log(reason);
		    return false;
		});

		return anotherPromise;
	}	

	editarUsuario(user){
		console.log(user);
		let completeUrl = this._baseUrl + "/" + user._id;
		let response = null;
		let objeto = user.createObjectFromUser();
		let promise = this._apiClient.put(completeUrl, objeto);
		var anotherPromise = promise.then((data)=>{			
			let userObject = new Usuario();
			userObject.createUserFromObject(data);			
			userObject._password = user._password;
			user = userObject;
			//console.log(user);
			let response = new RespuestaServicio(user, true, "Grabado con éxito", null)
			return response;			
		}).catch((reason)=> {
			console.log(reason);
		    let response = new RespuestaServicio(null, false, "Ocurrió un error al grabar", null)
			return response;
		});

		return anotherPromise;
	}

	obtenerUsuario(id){
		let completeUrl = this._baseUrl + "/" + id;
		console.log(completeUrl);
		let response = null;
		let promise = this._apiClient.get(completeUrl, null);
		var anotherPromise = promise.then((data)=>{			
			let user = new Usuario();
			user.createUserFromObject(data);
			response = {
				"user":user,
				"result":true,
				"mensaje":"OK"
			}
			return response;
		}).catch((reason)=> {
			console.log(reason);
			response = {
				"user":null,
				"result":false,
				"mensaje":reason.message
			}
		    return response;
		});

		return anotherPromise;
	}

	eliminarUsuario(user){
		let completeUrl = this._baseUrl + "/" + user._id;
		let response = null;
		let objeto = user.createObjectFromUser();
		let promise = this._apiClient.delete(completeUrl, objeto);
		var anotherPromise = promise.then((data)=>{
			let user = new Usuario();
			user.createUserFromObject(data);
			let response = new RespuestaServicio(user, true, "Eliminado con éxito", null)
			return response;			
		}).catch((reason)=> {
			console.log(reason);
		    let response = new RespuestaServicio(null, false, "Ocurrió un error al eliminar", null)
			return response;
		});

		return anotherPromise;
	}	
}