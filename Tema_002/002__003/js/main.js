/*

Ejercicio 002__003

Xanxo Whatsapp

Partiendo de los ficheros entregados...

Orquesta la comunicación entre los dos iPhones

Los mensajes que envíe el iphone1 llegarán al iphone2 y viceversa.

No olvides pintar también los mensajes enviados por el propio usuario.

Para pintar dispones de la función pintarMensaje(idIphone, mensaje, esPropio) 

Para obtener el mensaje que ha escrito un usuario dispones de la función getMensaje(idIphone) 

*/

class MainController{
	constructor(){
		this._pubSub = new PubSub();
		this._gestionMensaje = new GestionMensaje(this._pubSub);
	}

	init(){
		this.pintarEstructura();
		this._gestionMensaje.init();
	}

	pintarEstructura(){
		let cabecera = document.createElement("div");
		cabecera.className = "cabecera";
		cabecera.innerHTML = "<h1>Xanxo Whatsapp (Con Grupos)</h1>";
		document.body.appendChild(cabecera);		
	}	
}


class Iphone{
	constructor(idIphone, pubsub, nombreUsuario){
		this._idIphone = idIphone;
		this._nombreUsuario = nombreUsuario;
		this._pubsub = pubsub;

		//subscribe 
		this.subscribirse();
		
	}

	subscribirse(){
		this._pubsub.sub("TODOS", (objeto)=>this.recibirMensajeTodos(objeto));
		this._pubsub.sub(this._idIphone, (objeto)=>this.recibirMensaje(objeto));
	}

	recibirMensaje(objeto){
		let esPropio = objeto.origen == this._idIphone;	
		if(!esPropio){
			this.pintarMensaje(objeto.destinatario, objeto.mensaje, false, "Usuario " + this._idIphone);
		}
				
	}

	recibirMensajeTodos(objeto){
		let esPropio = objeto.origen == this._idIphone;	
		this.pintarMensaje(this._idIphone, objeto.mensaje, esPropio, "Usuario " + this._idIphone);		
	}

	enviarMensaje(){
		let objeto = this.getMensaje();
		if(objeto.destinatario == "TODOS"){
			this.publicaMensajeTodos(objeto);
		}else{
			this.publicaMensajeDestinatario(objeto);
		}		
	}

	publicaMensajeTodos(objeto){
		this._pubsub.pub("TODOS", objeto);
	}

	publicaMensajeDestinatario(objeto){
		this.pintarMensaje(this._idIphone, objeto.mensaje, true, "Usuario " + objeto.destinatario);
		this._pubsub.pub(objeto.destinatario, objeto);
	}

	pintarMensaje(idIphone, mensaje, esPropio, nombreUsuario) {
		console.log("idIphone: " + this._idIphone);
        var selector = "#iphone" + idIphone + " " + ".messages";
        var misMensajes = document.querySelector(selector);

        var elementMessage = document.createElement("div");

        if (esPropio) {
            elementMessage.className = "message messageOwn";
        } else {
            elementMessage.className = "message";

            // Como no es propio, ponemos nombre de usuario
            var elementUserName = document.createElement("div");
            elementUserName.className = "message__username";
            elementUserName.innerHTML = nombreUsuario;

            // Coloco el nombre de usuario dentro del mensaje
            elementMessage.insertBefore(elementUserName, null);
        }

        // Como no es propio, ponemos nombre de usuario
        var elementText = document.createElement("div");
        elementText.className = "message__text";
        elementText.innerHTML = mensaje;

        // Coloco el nombre de usuario dentro del mensaje
        elementMessage.insertBefore(elementText, null);

        // Inserto el mensaje
        misMensajes.insertBefore(elementMessage, null);

    }

    getMensaje() {
        // COJO EL TEXTO Y LO LIMPIO
        var selector = "#iphone" + this._idIphone + " " + "textarea";
        var miTextarea = document.querySelector(selector);
        var mensaje = miTextarea.value;
        miTextarea.value = "";

        // COJO EL DESTINATARIO
        var selector2 = "#iphone" + this._idIphone + " " + "select";
        var miSelect = document.querySelector(selector2);
        var destinatario = miSelect.options[miSelect.selectedIndex].value;
        
        // DEVUELVO UN OBJETO CON LA INFO
        var objeto = {
            mensaje: mensaje,
            destinatario: destinatario,
            origen: this._idIphone,
        };

        return objeto;
    }

}

class GestionMensaje{
	constructor(pubsub){
		this._iphones = [];
		this._pubsub = pubsub;
	}

	init(){
		this.crearIphones();	
		this.pintarEstructura();	
		this.agregarEventos();
	}

	crearIphones(){
		for (var i = 1; i < 5; i++) {
			let iphone = new Iphone	(i, this._pubsub, "Usuario " + i);
			this._iphones.push(iphone);
		}		
	}

	pintarEstructura(){
		for (var i = 0; i < this._iphones.length; i++) {
			this.pintarIphone(this._iphones[i]);			
		}

	}

	pintarIphone(iphone){
		let num = iphone._idIphone;
		let html = `
		<div class="iphone" id="iphone${num}">
			<div class="messages">
			</div>
			<div class="send-message-bar">
				<div class="send-message-bar__inner">
					<textarea></textarea>
					<select>
						<option value="1">iphone1</option>
						<option value="2">iphone2</option>
						<option value="3">iphone3</option>
						<option value="4">iphone4</option>
						<option value="TODOS">TODOS</option>
					</select>
					<button id = "btnIphone${num}">ENVIAR</button>
				</div>
			</div>
			<div class="identificador">${num}</div>
		</div>`;

		document.body.innerHTML = document.body.innerHTML + html;
	}

	agregarEventos(){
		let body = document.body;
		for (var i = 0; i < this._iphones.length; i++) {
			let iphone = this._iphones[i];

			let btn = body.querySelector("#btnIphone" + iphone._idIphone);
			btn.addEventListener("click", () => {
				iphone.enviarMensaje();
			});			
		}

	}

}

window.onload = () => {
	let mc = new MainController();
	mc.init();
}