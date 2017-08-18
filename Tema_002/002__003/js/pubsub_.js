class PubSub {
    // Este objeto actuará como cola de todos los eventos que se
    // produzcan. Los guardará con el nombre del evento como clave
    // y su valor será un array con todas las funciones callback encoladas.
    constructor(){
    	this._suscriptores = {};    	
    }

    getSuscriptores(){
        if(typeof this._suscriptores=='undefined'){
            this._suscriptores = {};    
        }
        return this._suscriptores;
    }
    

    static subscribe(event, callback) {
        // Si no existe el evento, creamos el objeto y el array de callbacks
        // y lo añadimos
        suscriptores = getSuscriptores();
        if (!suscriptores[event]) {
            var suscriptorArray = [callback];
            suscriptores[event] = suscriptorArray;
            // Si existe, añadimos al array de callbacks la función pasada por
            // parámetro
        } else {
            suscriptores[event].push(callback);
        }
    }

    static publish(event) {
        // Si el evento existe, recorremos su array de callbacks y los
        // ejecutamos en orden.
        suscriptores = getSuscriptores();

        if (suscriptores[event]) {
            suscriptores[event].forEach(function(callback) {
                callback();
            });
        }
    }
    
    getPubSub(){
	    return {
	        // Los métodos públicos que devolvemos serán `pub` y `sub`
	        pub: publish,
	        sub: subscribe
	    };
    }
}