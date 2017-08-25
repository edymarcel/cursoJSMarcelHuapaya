class UserService {
	constructor(apiClient){
		this._user = null;
		this._apiClient = apiClient;
		this._xApiClient = null;	
	}

	validaLogin(username, password){
		this._user = new Usuario(username, password);
		return this.getXApiClient().validateLogin(this._user);
	}

	registrarUsuario(username, password, email, apellidos, nombre){
		let user = new Usuario(username, password, email, apellidos, nombre);
		return this.getXApiClient().registrarUsuario(user);
	}

	obtenerUsuario(){
		let id = this._user._id;
		return this.getXApiClient().obtenerUsuario(id);
	}

	editarUsuario(username, password, email, apellidos, nombre, id){
		let user = new Usuario(username, password, email, apellidos, nombre, id);
		return this.getXApiClient().editarUsuario(user);
	}

	eliminarUsuario(username, password, email, apellidos, nombre, id){
		let user = new Usuario(username, password, email, apellidos, nombre, id);
		return this.getXApiClient().eliminarUsuario(user);
	}

	getXApiClient(){
		if(this._xApiClient == null){
			this._xApiClient = new UserApiClient(this._apiClient);
		}
		return this._xApiClient;
	}

	getUserFromLocalStorage(){
		let result = null;
		if(this.getItemFromLocalStorage("user")!=null){
			this._user = this.getItemFromLocalStorage("user");
			result = this._user;
		}
		//console.log(result);
		return result;
	}

	getRecordarFromLocalStorage(){
		let result = null;
		if(this.getItemFromLocalStorage("recordar")!=null){
			result = this.getItemFromLocalStorage("recordar");
		}
		//console.log(result);
		return result;
	}

	setUserIntoLocalStorage(){
		this.setItemIntoLocalStorage("user",this._user);
	}

	setRecordarIntoLocalStorage(){
		this.setItemIntoLocalStorage("recordar", true);
	}

	getItemFromLocalStorage(item){
		let result = null;
		if(!localStorage.getItem(item)){
			result = null;
		}else{
			if((localStorage.getItem(item)=='undefined') || (typeof localStorage.getItem(item)=='undefined')){
				this.removeItemInLocalStorage(item);
			}else{
				result = JSON.parse(localStorage.getItem(item));
			}		
		}
		return result;
	}

	setItemIntoLocalStorage(item, value){
		//localStorage.setItem("user",this._user);
		localStorage.setItem(item, JSON.stringify(value));
	}

	removeItemInLocalStorage(item){
		localStorage.removeItem(item);
	}

	removeUserAndRecordarInLocalStorage(){
		this.removeItemInLocalStorage('user');
		this.removeItemInLocalStorage('recordar');
	}

	get user(){
		return this._user;
	}

	set user(user){
		this._user = user;
	}
}

class Usuario{
	constructor(username, password, email, apellidos, nombre, id){
		this._email = email;
		this._apellidos = apellidos;
		this._nombre = nombre;
		this._username = username;
		this._password = password;
		this._id = id;
	}

	get username(){
		return this._username;
	}

	get password(){
		return this._password;
	}

	set password(password){
		this._password = password;
	}
	set user(user){
		this._user = user;
	}

	createObjectFromUser(){
        let objeto = {
            "email": this._email,
            "apellidos": this._apellidos,
            "nombre": this._nombre,
            "username": this._username,
            "password": this._password
        }
        return objeto;
    }

    createUserFromObject(objeto){
        this._username = objeto.username;
        this._password = objeto.password;
        this._email = objeto.email;
        this._apellidos = objeto.apellidos;
        this._nombre = objeto.nombre;
        this._id = objeto._id;        
    }
}