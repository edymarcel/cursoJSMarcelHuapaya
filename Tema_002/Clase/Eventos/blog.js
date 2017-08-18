//Propaacion de eventos y prevent dafault

window.onload = function(){
	//eventstoppropagation
	
	var h1 = document.querySelector('h1');
	h1.addEventListener('click', function(e){
		console.log('Soy H1');
		console.log(' Has clickado en ' + e.target.nodeName);
		e.stopPropagation();
	});

	var h2 = document.querySelector('h2');
	h2.addEventListener('click', function(e){
		console.log('Soy H2');
		console.log(' Has clickado en ' + e.target.nodeName);
	});

	var header = document.querySelector('header');
	header.addEventListener('click', function(e){
		console.log('Soy header');
		console.log(' Has clickado en ' + e.target.nodeName);
	});

	var body = document.querySelector('body');
	body.addEventListener('click', function(e){
		console.log('Soy body');
		console.log(' Has clickado en ' + e.target.nodeName);
	});

	var a = document.querySelector('a');
	a.addEventListener('click', function(e){
		e.preventDefault();
		console.log('Soy a');
		console.log(' Has clickado en ' + e.target.nodeName);
	});
}

//Pubsub