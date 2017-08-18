class PokemonApiClient{
	constructor(apiClient){
		this._baseUrl = "http://pokeapi.co/api/v2/pokemon/?offset=";
		this._apiClient = apiClient;
	}

	//Este metodo devuelve una promesa
	getPokemonsAtPage(numPagina){
		let offset = (numPagina-1)*20;
		let completeUrl = this._baseUrl + offset;
		let promise = this._apiClient.get(completeUrl, null);
		//nombre, urlDetalle, peso, altura, urlImagen
		var anotherPromise = promise.then((data)=>{
			let listaPokemons = [];
			for (var i = 0; i < data.results.length; i++) {
				let elemento = data.results[i];
				let pokemon = new Pokemon(
					elemento.name, 
					elemento.url,
					null,
					null,
					null
				);
				listaPokemons.push(pokemon)
			}

			let paginainfo = {
				totalregistros : data.count,
				lista: listaPokemons
			}
			return paginainfo;
		});

		return anotherPromise;
	}

	getPokemonByUrl(urlDePokemon){
		//http:\/\/pokeapi.co\/api\/v2\/pokemon\/20\/
		let promise = this._apiClient.get(urlDePokemon, null);
		var anotherPromise = promise.then((data)=>{
			let pokemon = new Pokemon(
					data.name, 
					data.urlDePokemon,					
					data.weight,
					data.height,
					data.sprites.back_default
			);
			
			return pokemon;
		});

		return anotherPromise;
	}
}