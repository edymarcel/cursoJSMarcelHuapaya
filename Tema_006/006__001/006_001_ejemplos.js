var url = "https://ironhack-characters.herokuapp.com/characters";

var headers = new Headers();

let config = {
	method : "GET",
	headers : headers
};

fetch(url, config).then(function(response) {
	console.log("RESPONSE");
	console.log(response);

	response.json().then(function(data) {
		console.log("DATA");
		console.log(data);
	});
});

fetch(url, config).then(function(response) {
	console.log("RESPONSE");
	console.log(response);
	return response.json();
}).then(function(data) {
	console.log("DATA");
	console.log(data);
	return "prueba";
}).then(function(resultado){
	console.log("resultado");
	console.log(resultado);
}).catch(function(error){
	console.log("ERROR");
	console.log(error);
});

//con arrow function

fetch(url, config).then((response) => {
	console.log("RESPONSE");
	console.log(response);
	return response.json();
}).then((data) => {
	 console.log("DATA");
	console.log(data);
	return "prueba";
}).then((resultado) =>{
	console.log("resultado");
	console.log(resultado);
}).catch((error)=>{
	 console.log("ERROR");
	console.log(error);
});


//NOTA: Es importante saber temas de CORS, que se manejan por temas de seguridad
