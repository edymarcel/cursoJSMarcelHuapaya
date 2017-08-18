//callback funcion X que se usa para ejecutar una funcion cuando haya terminado de ejecutarse (funcion X)

/*function loadCSS(url, callback) {
    var elem = window.document.createElement('link');
    elem.rel = "stylesheet";
m.href = nuurl;
    window.document.head.appendChild(el, miCallBack)m);
    callback();
}
loadCSS('styles.css', function() {
    console.log("Estilos cargados");
});*/ 
/*function numeroAleatorioEntre(minimo, maximo, miCallBack){
	var anchoFranjaNumerica = (maximo-minimo) + 1;
	var numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

	miCallBack(numero);
	return numero;
}

var miCallBack = function (numeroGenerado){
	console.log("He acabado de generar el numero: " + numeroGenerado);
}

var numAleatorio = numeroAleatorioEntre(0, 100, miCallBack);
*/

/*var peticionDeListadoDeUsersHaCambiado = function(event){
	
	var ojetoQueHaHechoLaPeticion = event.target
	if(ojetoQueHaHechoLaPeticion.readyState == 4){
	
		console.log("Ha terminado la peticion HTTP");

		if(ojetoQueHaHechoLaPeticion.status = 200){
			var responseObject = JSON.parse(ojetoQueHaHechoLaPeticion.responseText);	
			tratamientoDeUsuarios(responseObject);
		}
	
	}
	
}

var peticionDeFollowersHaCambiado = function(event){
	
	var ojetoQueHaHechoLaPeticion = event.target
	if(ojetoQueHaHechoLaPeticion.readyState == 4){
		console.log("Ha terminado la peticion HTTP");

		if(ojetoQueHaHechoLaPeticion.status == 200){
			var responseObject = JSON.parse(ojetoQueHaHechoLaPeticion.responseText);	
			console.log("Los folowers son:");
			console.log(responseObject);
		}
	}
	
}

var tratamientoDeUsuarios = function(usuarios){
	var primerUsuario = usuarios[0];
	var nombrePrimerUsuario = primerUsuario.login;
	var urlFollowersPrimerUsuario = primerUsuario.followers_url;

	console.log(nombrePrimerUsuario);
	console.log(urlFollowersPrimerUsuario);

	var peticionObject = new XMLHttpRequest();

	peticionObject.onreadystatechange = peticionDeFollowersHaCambiado;

	peticionObject.open("GET", urlFollowersPrimerUsuario);

	peticionObject.send();

}

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = peticionDeListadoDeUsersHaCambiado;

xhr.open("GET", "https://api.github.com/users");

xhr.send();*/


/*var peticionDeListadoDeUsersHaCambiado = function(event){
	
	var ojetoQueHaHechoLaPeticion = event.target
	if(ojetoQueHaHechoLaPeticion.readyState == 4){
	
		console.log("Ha terminado la peticion HTTP");

		if(ojetoQueHaHechoLaPeticion.status = 200){
			var responseObject = JSON.parse(ojetoQueHaHechoLaPeticion.responseText);	
			tratamientoDeUsuarios(responseObject);
		}
	
	}
	
}

var peticionDeFollowersHaCambiado = function(event){
	
	var ojetoQueHaHechoLaPeticion = event.target
	if(ojetoQueHaHechoLaPeticion.readyState == 4){
		console.log("Ha terminado la peticion HTTP");

		if(ojetoQueHaHechoLaPeticion.status == 200){
			var responseObject = JSON.parse(ojetoQueHaHechoLaPeticion.responseText);	
			console.log("Los folowers son:");
			console.log(responseObject);
		}
	}
	
}*/


var callbackPeticionHaCambiado = function(event, miCallback){
	
	var ojetoQueHaHechoLaPeticion = event.target
	if(ojetoQueHaHechoLaPeticion.readyState == 4){
	
		console.log("Ha terminado la peticion HTTP");

		if(ojetoQueHaHechoLaPeticion.status = 200){
			var responseObject = JSON.parse(ojetoQueHaHechoLaPeticion.responseText);	
			miCallback(responseObject);
		}
	
	}
	
}


var tratamientoDeUsuarios = function(usuarios){
	var primerUsuario = usuarios[0];
	//var nombrePrimerUsuario = primerUsuario.login;
	var urlFollowersPrimerUsuario = primerUsuario.followers_url;

	realizaPeticionDeListadoFollowers(urlFollowersPrimerUsuario);
	//console.log(nombrePrimerUsuario);
	//console.log(urlFollowersPrimerUsuario);	

}

var tratamientoDeFollowers = function(followers){
	console.log("Los folowers son:");
	console.log(followers);
}



//Realiza la peticion del listado de usuarios
var realizaPeticionDeUsers = function(){
	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function(event){
		callbackPeticionHaCambiado(event, tratamientoDeUsuarios);
	};

	xhr.open("GET", "https://api.github.com/users");

	xhr.send();
}

//Realiza la peticion del listado de followers
var realizaPeticionDeListadoFollowers = function(urlFollowers){
	var peticionObject = new XMLHttpRequest();

	peticionObject.onreadystatechange = function(event){
		callbackPeticionHaCambiado(event, tratamientoDeFollowers);
	};

	peticionObject.open("GET", urlFollowers);

	peticionObject.send();
}

realizaPeticionDeUsers();