class ApiClient{
	constructor(){

	}
	
	get(url, params){
		//Loader.activaLoading();
		var headers = new Headers();
		headers.append("Content-Type", "application/json");

		let config = {
			method:"GET",
			headers: headers
		};

		let promise = fetch(url, config).then((response)=>{
			return response.json();
		});
		//Loader.desactivaLoading();	
		return promise;
	}

	post(url, data){
		//Loader.activaLoading();
		var headers = new Headers();
		headers.append("Content-Type", "application/json");

		let config = {
			method:"POST",
			headers: headers
		};

		if(data){
			let jsonData = JSON.stringify(data);
			config.body = jsonData; 
		}

		let promise = fetch(url, config).then((response)=>{
			if(response.status>=200 && response.status <300){
				console.log(response);
				return response.json();
			}else{
				console.log(response);
				return Promise.reject("Error: " + response.status);
			}
			
		});
		//Loader.desactivaLoading();
		return promise;
	}

	put(url, data){
		//Loader.activaLoading();
		var headers = new Headers();
		headers.append("Content-Type", "application/json");

		let config = {
			method:"PUT",
			headers: headers
		};

		if(data){
			let jsonData = JSON.stringify(data);
			config.body = jsonData; 
		}

		console.log(url);
		let promise = fetch(url, config).then((response)=>{
			if(response.status>=200 && response.status <300){
				console.log(response);
				return response.json();				
			}else{
				console.log(response);
				return Promise.reject("Error: " + response.status);
			}
			
		});
		//Loader.desactivaLoading();
		return promise;
	}

	delete(url, data){
		//Loader.activaLoading();
		var headers = new Headers();
		headers.append("Content-Type", "application/json");

		let config = {
			method:"DELETE",
			headers: headers
		};

		if(data){
			let jsonData = JSON.stringify(data);
			config.body = jsonData; 
		}
			
		console.log(url);
		let promise = fetch(url, config).then((response)=>{
			if(response.status>=200 && response.status <300){
				return response.text();
			}else{
				return Promise.reject("Error: " + response.text());
			}
			
		});
		//Loader.desactivaLoading();
		return promise;		
	}
}
