class Main {
	constructor(homeUrl){
		this._homePage = null;
		this._divGeneral = null;	
		this._navigation = new NavigationController();	
		this._apiClient = new ApiClient()
		this._userservice = new UserService(this._apiClient);
		this._comidaApiClient = new ComidaApiClient(this._apiClient);
		this._modalController = new ModalController();
		this._pages = [];	
	}

	init(){
		this.pintarEstructura();
		this.crearPaginas();
		this._homePage = Constantes.URL_LOGIN;		
		this._navigation.init(this._pages, this._homePage, this._userservice, null);
	}

	crearPaginas(){		
		let login = new LoginPage("1", "Login", false, "Login", Constantes.URL_LOGIN, false, "login.html", this._navigation, this._divGeneral, this._userservice);
		this._pages.push(login);

		let crearCuenta = new CrearCuenta("2","Crear Cuenta", false, "Crear Cuenta", Constantes.URL_CREAR_CUENTA, false, "crearcuenta.html", this._navigation, this._divGeneral, this._userservice);
		this._pages.push(crearCuenta);

		let home = new HomePage("3", "Inicio", true, "Pagina Principal", Constantes.URL_HOME, true, "template.html", this._navigation, this._divGeneral, this._userservice);
		this._pages.push(home);

		let comidas = new ComidasPage("4", "Comidas", true, "Gestión de Comidas", Constantes.URL_COMIDAS, true, "template.html", this._navigation, this._divGeneral, this._userservice, this._comidaApiClient, this._modalController);
		this._pages.push(comidas);

		let bebidas = new BebidasPage("5", "Bebidas", true, "Gestión de Bebidas", Constantes.URL_BEBIDAS, true, "template.html", this._navigation, this._divGeneral, this._userservice);
		this._pages.push(bebidas);

		let perfil = new PerfilPage("6", "Perfil", false, "Perfil de usuario", Constantes.URL_PERFIL, true, "template.html", this._navigation, this._divGeneral, this._userservice);
		this._pages.push(perfil);
	}

	pintarEstructura(){
		let loading = document.createElement("div");
		loading.setAttribute("id", "loading");
		loading.setAttribute("style", "display:none");
		let loadingimg = document.createElement("img");
		loadingimg.setAttribute("id", "loading-image");
		loadingimg.setAttribute("src", "img/loader.gif");
		loadingimg.setAttribute("alt", "Loading...");
		loading.appendChild(loadingimg);
		document.body.appendChild(loading);
		let container = document.createElement("div");
		container.className = "container";
		this._divGeneral = document.createElement("div");
		this._divGeneral.className = "gestion";
		this._divGeneral.setAttribute("id", "gestiongeneral");
		container.appendChild(this._divGeneral);
		document.body.appendChild(container);
	}
}

window.onload = () => {
	let mc = new Main();
	mc.init();
}