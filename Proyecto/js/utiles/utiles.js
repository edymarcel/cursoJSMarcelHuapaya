class Utiles{
	static generarNumeroAleatorioEntre(minimo, maximo){
		let anchoFranjaNumerica = (maximo-minimo) + 1;
		let numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

		return numero;
	}

	static isNumber(evt) {
	    evt = (evt) ? evt : window.event;
	    var charCode = (evt.which) ? evt.which : evt.keyCode;
	    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
	        return false;
	    }
	    return true;
	}

	static isText (event) {
	    var regex = new RegExp("^[a-zA-Z ]+$");
	    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
	    if (!regex.test(key)) {
	        event.preventDefault();
	        return false;
	    }
	}

	static validaValorMaxMin(elem, valMax, valMin) {    
	    if(elem.value>valMax || elem.value<valMin){
			elem.value = '';
			this.pintarMensajeValidacion(elem, "El valor no puede ser menor a " + valMin + " ni mayor a " + valMax)
		}else{
			this.quitarMensajeValidacion(elem);
		}
	    
	}

	static pintarMensajeValidacion(elem, mensaje){
		var spnValidacion = document.getElementById("spnValidacion");
		if(spnValidacion!=null){
			spnValidacion.parentNode.removeChild(spnValidacion);
		}
		let msj = document.createElement("span");
		msj.setAttribute("id", "spnValidacion");
		msj.setAttribute("class", "spnValidacion");
		msj.innerHTML = mensaje;
		//elem.parentNode.appendChild(msj);
		elem.parentNode.insertBefore(msj,elem);
	}

	static quitarMensajeValidacion(elem){
		var spnValidacion = document.getElementById("spnValidacion");
		if(spnValidacion!=null){
			spnValidacion.parentNode.removeChild(spnValidacion);
		}		
	}

	static validaTamanoMaxMin(evt, elem, valMax, valMin) {  
		let tamano = elem.value.length  + 1;
		if(tamano>valMax || tamano<valMin){
	    	this.pintarMensajeValidacion(elem, "No se puede ingresar menos de " + valMin + " ni más de " + valMax + " caracteres")
	    	if(tamano>valMax){
	    		return false;
	    	}			
		}else{
			this.quitarMensajeValidacion(elem);
		}
		return true;
	}	
}
