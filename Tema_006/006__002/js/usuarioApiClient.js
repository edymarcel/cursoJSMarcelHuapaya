class UsuarioApiClient{
	constructor(apiClient){
		this._baseUrl = "https://jsonplaceholder.typicode.com/users";
		this._apiClient = apiClient;
	}

	//Este metodo devuelve una promesa
	getAllUsuarios(){
		let completeUrl = this._baseUrl;
		let promise = this._apiClient.get(completeUrl, null);
		var anotherPromise = promise.then((data)=>{
			let usuarios = [];
			for (var i = 0; i < data.length; i++) {
				let elemento = data[i];
				
				let geo = new Geo(elemento.address.geo.lat, elemento.address.geo.lng);

				let address = new Address(
					elemento.address.street,
					elemento.address.suite,
					elemento.address.city,elemento.address.zipcode,
					geo
				);

				let company = new Company(
					elemento.company.name, 
					elemento.company.catchPhrase, 
					elemento.company.bs
				);

				let usuario = new Usuario(
					elemento.id, 
					elemento.name, 
					elemento.username, 
					elemento.email, 
					address,
					elemento.phone,
					elemento.website,
					company
				);
				usuarios.push(usuario)
			}
			return usuarios;
		});

		return anotherPromise;
	}
}