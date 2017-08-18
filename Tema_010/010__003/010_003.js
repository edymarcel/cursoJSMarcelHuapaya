/*

Vamos a hacer un Hospital!!

Áreas: Urgencias, Trauma, UCI, Reuma, Rehab (10 medicos en cada area)

Genera las clases, los métodos y las propiedades necesarias para que funcione un hospital.

El hospital deberá realizar las siguientes operaciones (cada segundo):

1) recibir pacientes (cada segundo uno aleatorio):
	salud entre (0-50)
	pasarles al área de urgencias
	asginar un médico

2) los medicos de urgencias deben evaluar al paciente:
	reasignar el area del paciente

3) los médicos de cada área deben curar a los pacientes (+10 salud)
	evaluar si está sano, en tal caso le dan el alta (100 de salud)
	
4) Imprimir 
*/

class FabricaPersonas{
	constructor(){
		this._ultimoId = 0;		
	}

	static getUltimoId(){
		if(typeof this._ultimoId === 'undefined' || this._ultimoId === 'undefined' || this._ultimoId == null){
			this._ultimoId = 0		
		}
		return this._ultimoId;
	}

	static crearPaciente(nombre, dni, sexo, fechaNacimiento, salud, dolencia){
		this._ultimoId = this.getUltimoId() + 1;
		return new Paciente(this._ultimoId, nombre, dni, sexo, fechaNacimiento, salud, dolencia);
	}

	static crearPacienteAleatorio(){		
		let salud = Utiles.generarNumeroAleatorioEntre(0,50);
		let dolencia = Utiles.generarDolenciaAleatorio();
		return this.crearPaciente(undefined, undefined, undefined, undefined, salud, dolencia);
	}

	static crearMedico(nombre, dni, sexo, fechaNacimiento, especialidad){
		this._ultimoId = this.getUltimoId() + 1;
		return new Medico(this._ultimoId, nombre, dni, sexo, fechaNacimiento, especialidad);
	}

	static crearMedicoAleatorio(especialidad){
		return this.crearMedico(undefined, undefined, undefined, undefined, especialidad);
	}	

}

class Utiles{
	static generarNumeroAleatorioEntre(minimo, maximo){
		let anchoFranjaNumerica = (maximo-minimo) + 1;
		let numero = Math.floor((Math.random() * anchoFranjaNumerica) + minimo);

		return numero;
	}

	static verificarProbabilidad(numero){
		let valor = this.generarNumeroAleatorioEntre(1, 100);
		let probabilidad = false;
		if(valor<=numero){
			probabilidad = true;
		}

		return probabilidad;
	}

	static generarNombreAleatorio(){
		let arrNombres = ["Carlos", "Daniel", "Fabian", "Juan", "Bryan", "Saul", "Christian", "Marcel", "Ronal", "David", "Fran"];
		let indice = this.generarNumeroAleatorioEntre(0, arrNombres.length-1);

		return arrNombres[indice];
	}

	static generarDolenciaAleatorio(){
		let arrAreas =["Trauma", "UCI", "Reuma", "Rehab"];
		let indice = this.generarNumeroAleatorioEntre(0, arrAreas.length-1);

		return arrAreas[indice];
	}

	static generarSexoAleatorio(){
		let arrSexo = ["M", "F"];
		let indice = this.generarNumeroAleatorioEntre(0, arrSexo.length-1);

		return arrSexo[indice];
	}

	static generarFechaAleatorioEntre(fechaInicial,fechaFinal){
		//formato de Fechas dd/mm/yyyy
		let resultado = "";
		let inicial = fechaInicial.split("/");
		let final = fechaFinal.split("/");
		let dateStart=new Date(inicial[2],(inicial[1]-1),inicial[0]);
	    let dateEnd=new Date(final[2],(final[1]-1),final[0]);
	    let difMilisegundos = dateEnd-dateStart;
	 	let dias = parseInt(((dateEnd-dateStart)/86400)/1000);
	 	resultado = dateStart.getTime() + (this.generarNumeroAleatorioEntre(0, dias)*86400000);
		return new Date(resultado);
	}
	
}

class Hospital {
	constructor(nombre){
		this._nombre = nombre;
		this._areas=[];	
		this.crearAreas();	
	}

	trasladarPacientesDeUrgenciaAOtraArea(){
		//for (let i = 0; i < this._areas[0]._pacientes.length; i++) {
		let pacientesEnUrgencias = this._areas[0]._pacientes;
		for (let j = 0; j < pacientesEnUrgencias.length; j++) {
			let paciente = pacientesEnUrgencias[j];
			this.trasladarPaciente(paciente);
		}			
		//}
	}

	trasladarPaciente(paciente){	
		//console.log("trasladarPaciente: " + paciente);	
		let area = this.obtenerAreaDePaciente(paciente);
		area.insertarPaciente(paciente);
		let medico = area.buscarDoctor(paciente);
		area.asignarDoctor(paciente, medico);	
		let areaUrgencias = this._areas[0];
		areaUrgencias.retirarPaciente(paciente);		
	}	

	obtenerAreaDePaciente(paciente){
		let areaResultado = null;
		for (let i = 0; i < this._areas.length; i++) {
			let area = this._areas[i];
			if(area._especialidad == paciente._dolencia){				
				areaResultado = area;
			}
		}
		//console.log(areaResultado);
		return areaResultado;
	}

	recibirPaciente(paciente){
		let areaUrgencias = this._areas[0];
		areaUrgencias.insertarPaciente(paciente);
		let medico = areaUrgencias.buscarDoctorUrgencias(paciente);
		areaUrgencias.asignarDoctor(paciente, medico);		
	}

	/*curarPaciente(paciente){
		let area = this.obtenerAreaDePaciente(paciente);
		let medico = area.obtenerMedicoPorId(paciente._idMedico);
		medico.curar(paciente);
	}*/

	curarPacientesEnAreas(){
		for (let i = 1; i < this._areas.length; i++) {
			let area = this._areas[i];
			for (let j = 0; j < area._pacientes.length; j++) {
				let paciente = area._pacientes[j];
				let medico = area.obtenerMedicoPorId(paciente._idMedico);
				medico.curar(paciente);

				if(medico.evaluarSaludPaciente(paciente)){
					this.darDeAltaPaciente(paciente);
				}
			}			
		}		
	}

	darDeAltaPaciente(paciente){
		let area = this.obtenerAreaDePaciente(paciente);
		area.retirarPaciente(paciente);
	}

	getNumeroDePacientes(){
		let numero = 0;
		for  (i = 0; i < this._areas.length; i++) {
			numero = numero + this._areas[i]._pacientes.length;
		}

		return numero;
	}

	getCapacidad(){
		let capacidadPorArea = 0;
		for  (i = 0; i < this._areas.length; i++) {
			capacidadPorArea = capacidadPorArea + this._areas[i]._capacidad;
		}

		return capacidadPorArea;	
	}

	crearAreas(){
		let arrAreas =["Urgencias", "Trauma", "UCI", "Reuma", "Rehab"];
		for (let i = 0; i < arrAreas.length; i++) {
			let especialidad = arrAreas[i];
			let capacidad = Utiles.generarNumeroAleatorioEntre(100, 200);
			let area = new Area(especialidad, capacidad);
			for (let j = 0; j < 10; j++) {
				area.agregarMedico(FabricaPersonas.crearMedicoAleatorio(especialidad));
			}			
			this._areas.push(area);
		}

	}

	iniciarCiclo() {
        setInterval(() => this.ejecutarCiclo(), 1000);
    }

    ejecutarCiclo() {
    	//Insertar en urgencias
    	for (let i = 0; i < 10; i++) {
    		let paciente = FabricaPersonas.crearPacienteAleatorio();
        	this.recibirPaciente(paciente);
    	}
    	

        this.trasladarPacientesDeUrgenciaAOtraArea();
        
        this.curarPacientesEnAreas();

        this.imprimir();
    }

    imprimir(){
    	console.log("============================Clinica============================");
    	console.log("AREAS:");

    	for (let i = 0; i < this._areas.length; i++) {
    		let area = this._areas[i];
    		console.log("Especialidad: " + area._especialidad);    		
    		console.log("Capacidad: " + area._capacidad);
    		console.log("Cantidad de Pacientes: " + area._pacientes.length);
    	}
    }
}


class Area{
	constructor(especialidad, capacidad){
		this._especialidad = especialidad;
		this._medicos = [];
		this._pacientes = [];
		this._capacidad = capacidad;
	}

	agregarMedico(medico){
		this._medicos.push(medico);
	}

	retirarPaciente(paciente){
		let indice = this._pacientes.indexOf(paciente);
		if(indice>0){
			this._pacientes.splice(indice, 1);
		}
	}

	buscarDoctor(paciente){
		let loop = true;
		let resultado = null
		for (let i = 0; (i < this._medicos.length) && loop; i++) {
			let medico = this._medicos[i];
			if(medico._especialidad === paciente._dolencia){
				resultado = medico;
				loop = false;
			}
		}

		return resultado;
	}

	buscarDoctorUrgencias(paciente){
		let loop = true;
		let resultado = null
		for (let i = 0; (i < this._medicos.length) && loop; i++) {
			let medico = this._medicos[i];
			resultado = medico;
			loop = false;			
		}

		return resultado;
	}


	asignarDoctor(paciente, medico){
		paciente.setIdMedico(medico._id);
	}

	insertarPaciente(paciente){
		let indice = this._pacientes.indexOf(paciente);
		if(indice<0){ 
			this._pacientes.push(paciente);
		}
	}

	obtenerMedicoPorId(id){
		let loop = true;
		let resultado = null;
		for (let i = 0; (i < this._medicos.length) && loop; i++) {
			let medico = this._medicos[i];
			if(medico._id === id){
				resultado = medico;
				loop = false;
			}
		}

		return resultado;
	}
}

class Persona{
	constructor(id, nombre, dni, sexo, fechaNacimiento){
		this._id = id;
		this._nombre = nombre;
		this._dni =dni;
		this._sexo = sexo;
		this._fechaNacimiento = fechaNacimiento;
		
		//si no se envia valor para nombre se crea con datos aleatorios
		if (typeof nombre === 'undefined' || nombre === 'undefined' || nombre == null){
			this.setPersonaAleatoria();
		}
	}

	setPersonaAleatoria(){
		this._nombre = Utiles.generarNombreAleatorio();
		this._dni = "dni" + this._ultimoId;
		this._sexo = Utiles.generarSexoAleatorio();
		this._fechaNacimiento = Utiles.generarFechaAleatorioEntre("08/08/1917","14/08/2017");
	}
}

class Empleado extends Persona{
	constructor(id, nombre, dni, sexo, fechaNacimiento){
		super(id, nombre, dni, sexo, fechaNacimiento);		
	}
}

class Paciente extends Persona{
	constructor(id, nombre, dni, sexo, fechaNacimiento, salud, dolencia){
		super(id, nombre, dni, sexo, fechaNacimiento);
		this._idMedico = 0;
		this._salud = salud;
		this._dolencia = dolencia;
	}

	set salud(salud){
		if(salud>100){
			this._salud = 100;
			console.log("salud enviada mayor a cien");
		}
	}

	get salud(){
		return this._salud;
	}

	setIdMedico(idMedico){
		this._idMedico = idMedico;
	}	
}

class Medico extends Empleado{
	constructor(id, nombre, dni, sexo, fechaNacimiento, especialidad){
		super(id, nombre, dni, sexo, fechaNacimiento);
		this._especialidad = especialidad;
	}

	curar(paciente){
		paciente.salud = paciente.salud + 10;		
	}

	evaluarSaludPaciente(paciente){
		let alta = false;
		if (paciente.salud>=100){
			alta = true;
		}
		return alta;
	}
}

var hospital = new Hospital("Mi Hospital");
hospital.iniciarCiclo();
//hospital.ejecutarCiclo();