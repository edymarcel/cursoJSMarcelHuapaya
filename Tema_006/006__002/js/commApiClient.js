class CommApiClient{
	constructor(apiClient){
		this._baseUrl = "https://jsonplaceholder.typicode.com/posts/";
		this._apiClient = apiClient;
	}

	//Este metodo devuelve una promesa
	//que se resuelve con un array de ojetos posts
	getAllComms(userId){
		let completeUrl = this._baseUrl + userId + "/comments";
		let promise = this._apiClient.get(completeUrl, null);
		var anotherPromise = promise.then((data)=>{
			let comentarios = [];
			for (var i = 0; i < data.length; i++) {
				let elemento = data[i];
				let comentario = new Comentario(
					elemento.postId, 
					elemento.id, 
					elemento.name, 
					elemento.email, 
					elemento.body
					);
				comentarios.push(comentario)
			}
			return comentarios;
		});

		return anotherPromise;
	}
}