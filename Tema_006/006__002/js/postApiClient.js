class PostApiClient{
	constructor(apiClient){
		this._baseUrl = "https://jsonplaceholder.typicode.com/posts?userId=";
		this._apiClient = apiClient;
	}

	//Este metodo devuelve una promesa
	//que se resuelve con un array de ojetos posts
	getAllPosts(userId){
		let completeUrl = this._baseUrl + userId;
		let promise = this._apiClient.get(completeUrl, null);
		var anotherPromise = promise.then((data)=>{
			let posts = [];
			for (var i = 0; i < data.length; i++) {
				let elemento = data[i];
				let post = new Post(
					elemento.userId, 
					elemento.id, 
					elemento.title, 
					elemento.body
					);
				posts.push(post)
			}
			return posts;
		});

		return anotherPromise;
	}
}