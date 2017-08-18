class SuperHeroesApiClient{
	constructor(apiClient){
		this._baseUrl = "https://ironhack-characters.herokuapp.com/characters";
		this._apiClient = apiClient;
	}

	//Este metodo devuelve una promesa
	//que se resuelve con un array de ojetos SuperHeroe
	getAllSuperHeroes(){
		let completeUrl = this._baseUrl;
		let promise = this._apiClient.get(completeUrl, null);
		var anotherPromise = promise.then((data)=>{
			console.log(data);
			let superHeroes = [];
			for (var i = 0; i < data.length; i++) {
				let elemento = data[i];
				let superHeroe = new SuperHeroe(
					elemento.id, 
					elemento.name, 
					elemento.weapon, 
					elemento.occupation, 
					elemento.debt);
				superHeroes.push(superHeroe)
			}
			return superHeroes;
		});

		return anotherPromise;
	}

	createSuperHeroe(superHeroe){
		let completeUrl = this._baseUrl;
		let superHeroeObjeto = {
			id : superHeroe._identificador,
			name: superHeroe._apodo,
			weapon: superHeroe._arma,
			occupation: superHeroe._trabajo,
			debt: superHeroe._deuda
		}

		let promise = this._apiClient.post(completeUrl, superHeroeObjeto);

		let anotherPromise = promise.then((data)=>{
			console.log("DATA: " + data);
			return true;
		});

		return anotherPromise;
	}

	editSuperHeroe(superHeroe){
		let completeUrl = this._baseUrl + "/" + superHeroe._identificador;
		let superHeroeObjeto = {
			id : superHeroe._identificador,
			name: superHeroe._apodo,
			weapon: superHeroe._arma,
			occupation: superHeroe._trabajo,
			debt: superHeroe._deuda
		}

		let promise = this._apiClient.put(completeUrl, superHeroeObjeto);

		let anotherPromise = promise.then((data)=>{
			console.log("DATA: " + data);
			return true;
		});

		return anotherPromise;
	}

	deleteSuperHeroe(superHeroe){
		let completeUrl = this._baseUrl + "/" + superHeroe._identificador;
		
		let promise = this._apiClient.delete(completeUrl, null);

		let anotherPromise = promise.then(()=>{
			console.log("Borrado" );
			return true;
		});

		return anotherPromise;
	}
}