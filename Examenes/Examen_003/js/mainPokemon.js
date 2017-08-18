class MainController{
	constructor(){
		this._container = null;
		this._divListaPokemons = null;
		this._divDetallePokemon = null;
		this._spanPagina = null;
		this._gestionPaginador = new GestionPaginador();		
	}

	init(){
		this.pintarEstructura();
		this._gestionPaginador.init(this._divListaPokemons, this._divDetallePokemon, this._spanPagina);
	}

	pintarEstructura(){
		this._container = document.createElement("div");
		this._container.className = "container";		

		let html = `<div class="panel panel-default panel-table">
            <div class="panel-heading">
                <div class="row">
                    <div class="col col-xs-12">
                        <h2 >LA POKEDEX XANXA</h2>
                    </div>
                    <div class="col col-xs-12 text-left">
                        <button type="button" id="atras" class="btn btn-sm btn-primary btn-create">
                            <span class="glyphicon glyphicon-menu-left"></span>Atrás
                        </button>
                        <span class = "pagina" id="pagina">Página Actual: 1</span>
                        <button type="button" id="siguiente" class="btn btn-sm btn-primary btn-create">
                            Siguiente <span class="glyphicon glyphicon-menu-right"></span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="listado col-xs-6" id="listado">
                        
                    </div>
                    <div class="col-xs-5 detalle" id="detalle">
                        
                    </div>
                </div>    
            </div>            
        </div>`;

        this._container.innerHTML = html;
		this._divListaPokemons = this._container.querySelector("#listado");
		this._divDetallePokemon = this._container.querySelector("#detalle");
		this._spanPagina = this._container.querySelector("#pagina");

		let btnAtras = this._container.querySelector("#atras");
		btnAtras.addEventListener("click", () => this._gestionPaginador.irPaginaAnterior());

		let btnSiguiente = this._container.querySelector("#siguiente");
		btnSiguiente.addEventListener("click", () => this._gestionPaginador.irPaginaSiguiente());

		document.body.appendChild(this._container);
	}
	
}

class GestionPaginador{
	constructor(){
		this._pokemonApiClient = null;
		this._apiClient = new ApiClient();
		this._pokedex = new Pokedex();
		this._divListaPokemons = null;
		this._divDetallePokemon = null;
		this._spanPagina = null;
	}	

	init(divListaPokemons, divDetallePokemon, spanPagina){
		this._divListaPokemons = divListaPokemons;
		this._divDetallePokemon = divDetallePokemon;
		this._spanPagina = spanPagina;
		this._pokemonApiClient = this.getPokemonApiClient();
		this._pokedex._paginaActual = 1;
		this.pintarListado();
		this.getAllPokemosAndPaint();
	}

	getPokemonApiClient(){
		if(this._pokemonApiClient == null){
			this._pokemonApiClient = new PokemonApiClient(this._apiClient);
		}
		return this._pokemonApiClient;
	}

	irPaginaSiguiente(){
		let total = this._pokedex._numTotalPokemons;
		let pagina = this._pokedex._paginaActual;
		let offset = (pagina-1)*20;
		if(offset<total){
			pagina = pagina + 1;	
		}
		this._pokedex._paginaActual = pagina;
		this._spanPagina.innerHTML = "Página Actual: " + pagina;
		this.getAllPokemosAndPaint();
		this._divDetallePokemon.innerHTML = "";
	}

	irPaginaAnterior(){
		let pagina = this._pokedex._paginaActual;
		pagina = pagina - 1;
		if(pagina<1){
			pagina = 1;
		}	
		this._pokedex._paginaActual = pagina;
		this._spanPagina.innerHTML = "Página Actual: " + pagina;
		this.getAllPokemosAndPaint();
		this._divDetallePokemon.innerHTML = "";
	}	

	getAllPokemosAndPaint(){	
		let pagina = this._pokedex._paginaActual;	
		this._pokemonApiClient.getPokemonsAtPage(pagina).then((data) => {
			this.paintAllPokemons(data);			
		});
	}

	paintAllPokemons(data){
		this._pokedex._numTotalPokemons = data.totalregistros;
		let lista = data.lista;
		let tbody = this._divListaPokemons.querySelector("tbody");
		tbody.innerHTML = "";
		for (var i = 0; i < lista.length; i++) {
			let pokemon = lista[i];
			let row = this.getRowForPokemon(pokemon);
			tbody.appendChild(row);
		}
	}

	getRowForPokemon(pokemon){
		let tr = document.createElement("tr");
		
		let td1 = document.createElement("td");
		td1.innerHTML = pokemon._nombre;
		tr.appendChild(td1);

		let td3 = document.createElement("td");
		let button3 = document.createElement("button");
		button3.innerHTML = '<span class="glyphicon glyphicon-list-alt"></span> Ver Detalles';
		button3.className = "btn btn-warning";
		button3.addEventListener("click", ()=>this.getDetallePokemonAndPaint(pokemon._urlDetalle));
		td3.appendChild(button3);
		tr.appendChild(td3);		
		return tr;
	}

	getDetallePokemonAndPaint(urlDetalle){
		this._pokemonApiClient.getPokemonByUrl(urlDetalle).then((data) => {
			this.pintarDetalle(data);			
		});
	}

	pintarListado(){
		let html = `<h3>LISTADO POKEMON</h3>
                <table class="table table-striped table-bordered table-list">
                    <thead>
                        <tr>
                            <th class="text-center">Nombre</th>
                            <th class="text-center">Acciones</th >                                    
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John Doe</td>
                            <td align="center">
                                <button class="btn btn-warning"><span class="glyphicon glyphicon-list-alt"></span> Ver Detalles</button>
                            </td>                                    
                        </tr>
                    </tbody>
                </table>`;
        this._divListaPokemons.innerHTML = html;
	}

	pintarDetalle(pokemon){
		let imagen = pokemon._urlImagen;
		let nombre = pokemon._nombre;
		let peso = pokemon._peso;
		let altura = pokemon._altura;
		let html = `<div class="row">
                        <div class="col col-xs-12"><h3>DETALLE POKEMON
                        </h3></div>
                        <div class="col col-xs-12">
                            <p><img src="${imagen}"></p>
                            <p><span class="negrita">Nombre:</span> ${nombre} </p>
                            <p><span class="negrita">Peso:</span> ${peso}</p>
                            <p><span class="negrita">Altura:</span> ${altura}</p>
                        </div>
                    </div>`;
        this._divDetallePokemon.innerHTML = html;
	}
}

class Pokedex{
	constructor(){
		this._pokemons = [];
		this._paginaActual = 1;
		this._numTotalPokemons = 0;
	}	
}

class Pokemon{
	constructor(nombre, urlDetalle, peso, altura, urlImagen){
		this._nombre = nombre;
		this._urlDetalle = urlDetalle;
		this._peso = peso;
		this._altura = altura;
		this._urlImagen = urlImagen;
	}
}

window.onload = () => {
	let mc = new MainController();
	mc.init();
}