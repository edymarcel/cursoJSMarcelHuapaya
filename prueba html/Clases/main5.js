try{
	var jsonErroneo = "{var:45454, hola: ";

	var json = JSON.parse(jsonErroneo);
	console.log("hemos conseguido terminar el bloque try");

}catch(e){
	console.log("No se ha podido ejecutar el bloque try");
	console.log("Exception");
	console.log(e);
}