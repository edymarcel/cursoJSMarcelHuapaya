class CustomPanelController{
	/*
	* Esta clase sirve para mostrar/retornar paneles customizados
	* de tipo modal y no modal. En estos "paneles" se cuenta con
	* metodos para recibir como parametro cualquier elemento DOM
	*/

	closeModal(){
		var modal = document.body.querySelector("#contenedorModal");
		if(modal){
			modal.parentElement.removeChild(modal);
		}
	}

	openModal(title, divContenidoModal){
		let contenedorModal = document.createElement("div");
		contenedorModal.id = "contenedorModal";
		contenedorModal.innerHTML = `
		<div class="modal fade in" id="myModal" role="dialog" style="display: block; padding-left: 0px;">
		<div class="modal-dialog">

		<!-- Modal content-->
		<div class="modal-content">
		<div class="modal-header">
		<button type="button" class="close" id="close-modal-button">×</button>
		<h4 class="modal-title" id="title">${title}</h4>
		</div>
		<div class="modal-body" id="contenidomodal">		
		</div>
		<div class="modal-footer">
		<button type="button" class="btn btn-default" id="close-modal-button2">Close</button>
		</div>
		</div>

		</div>
		</div>
		<div class="modal-backdrop fade in"></div>
		`;

		let contenidomodal = contenedorModal.querySelector("#contenidomodal");
		contenidomodal.appendChild(divContenidoModal);

		let botonCerrar = contenedorModal.querySelector("#close-modal-button");
		botonCerrar.addEventListener("click", () => this.closeModal());

		let botonCerrar2 = contenedorModal.querySelector("#close-modal-button2");
		botonCerrar2.addEventListener("click", () => this.closeModal());

		document.body.appendChild(contenedorModal);
	};

	pintarMensajeError(title, divContenidoModal){
		let contenedorModal = document.createElement("div");
		contenedorModal.id = "contenedorModal";
		contenedorModal.innerHTML = `
		<div class="modal fade in" id="myModal" role="dialog" style="display: block; padding-left: 0px;">
			<div class="modal-dialog">				
				<div class="alert alert-danger fade in">
				    <button type="button" class="close" data-dismiss="alert" aria-hidden="true" id="close-modal-button">
	                    ×</button>
	                <span class="glyphicon glyphicon-hand-right"></span> <strong>${title}</strong>
	                <hr class="message-inner-separator">
	                <p>
	                    <span id="contenidomodal"><span></p>
				</div>

			</div>
		</div>
		<div class="modal-backdrop fade in"></div>
		`;

		let contenidomodal = contenedorModal.querySelector("#contenidomodal");
		contenidomodal.appendChild(divContenidoModal);

		let botonCerrar = contenedorModal.querySelector("#close-modal-button");
		botonCerrar.addEventListener("click", () => this.closeModal());
		
		document.body.appendChild(contenedorModal);
	};

	pintarMensajeExito(title, divContenidoModal){
		let contenedorModal = document.createElement("div");
		contenedorModal.id = "contenedorModal";
		contenedorModal.innerHTML = `
		<div class="modal fade in" id="myModal" role="dialog" style="display: block; padding-left: 0px;">
			<div class="modal-dialog">								
				<div class="alert alert-success">
	                <button type="button" class="close"  id="close-modal-button" data-dismiss="alert" aria-hidden="true">
	                    ×</button>
	               <span class="glyphicon glyphicon-ok"></span> <strong>${title}</strong>
	                <hr class="message-inner-separator">
	                <p>
	                   <span id="contenidomodal"><span>
	                </p>
	            </div>
			</div>
		</div>
		<div class="modal-backdrop fade in"></div>
		`;

		let contenidomodal = contenedorModal.querySelector("#contenidomodal");
		contenidomodal.appendChild(divContenidoModal);

		let botonCerrar = contenedorModal.querySelector("#close-modal-button");
		botonCerrar.addEventListener("click", () => this.closeModal());
		
		document.body.appendChild(contenedorModal);
	};

	pintarAdvertencia(title, divContenidoModal){
		let contenedorModal = document.createElement("div");
		contenedorModal.id = "contenedorModal";
		contenedorModal.innerHTML = `
		<div class="modal fade in" id="myModal" role="dialog" style="display: block; padding-left: 0px;">
			<div class="modal-dialog">												
	            <div class="alert alert-warning">
	                <button type="button" class="close"  id="close-modal-button" data-dismiss="alert" aria-hidden="true">
	                    ×</button>
	                <span class="glyphicon glyphicon-record"></span>  <strong>${title}</strong>
	                <hr class="message-inner-separator">
	                <p>
	                   <span id="contenidomodal"><span>
	            </div>
			</div>
		</div>
		<div class="modal-backdrop fade in"></div>
		`;

		let contenidomodal = contenedorModal.querySelector("#contenidomodal");
		contenidomodal.appendChild(divContenidoModal);

		let botonCerrar = contenedorModal.querySelector("#close-modal-button");
		botonCerrar.addEventListener("click", () => this.closeModal());
		
		document.body.appendChild(contenedorModal);
	};

	retornarMensajeExitoNoModal(title, divContenido){
		let contenedorNoModal = document.createElement("div");
		contenedorNoModal.id = "contenedorNoModal";
		contenedorNoModal.innerHTML = `
		<div class="alert alert-success">            
           <span class="glyphicon glyphicon-ok"></span> <strong>${title}</strong>
            <hr class="message-inner-separator">
            <p>
               <span id="contenido"><span>
	    </div>
		
		`;

		let contenido = contenedorNoModal.querySelector("#contenido");
		contenido.appendChild(divContenido);

		return contenedorNoModal;
	};

	retornarMensajeErrorNoModal(title, divContenido){
		let contenedorNoModal = document.createElement("div");
		contenedorNoModal.id = "contenedorNoModal";
		contenedorNoModal.innerHTML = `
		<div class="alert alert-danger fade in">            
           <span class="glyphicon glyphicon-ok"></span> <strong>${title}</strong>
            <hr class="message-inner-separator">
            <p>
               <span id="contenido"><span>
	    </div>
		
		`;

		let contenido = contenedorNoModal.querySelector("#contenido");
		contenido.appendChild(divContenido);
		return contenedorNoModal;
	};
	
}
