function crearElementoConUnAtributo(tipo, atributo, valorAtributo){
	var elemento = document.createElement(tipo);
	if(typeof atributo !== 'undefined'){
		elemento.setAttribute(atributo, valorAtributo);
	}	
	
	return elemento;
}


function armarArticuloPrincipal(titulo, detalle, autor,urlImagen){
	var article =  crearElementoConUnAtributo("article", "class", "noticia-principal col-md-8 flow-2x1");
	var seccion = crearElementoConUnAtributo("section", "class", "noticia-principal-detalle");
	var atitulo = crearElementoConUnAtributo("a", "class", "titulo");
	atitulo.innerHTML = titulo;
	seccion.appendChild(atitulo);

	var aDetalle = crearElementoConUnAtributo("a", "class", "detalle");
	aDetalle.innerHTML = detalle;
	seccion.appendChild(aDetalle);

	var pAutor = crearElementoConUnAtributo("p", "class", "autor");
	pAutor.innerHTML = autor;
	seccion.appendChild(pAutor);

	article.appendChild(seccion);

	var figure = crearElementoConUnAtributo("figure");
	var img = crearElementoConUnAtributo("img", "src", urlImagen);
	figure.appendChild(img);
	article.appendChild(figure);

	return article;
}

/*
<section class="noticiasamll mini-flow">
	<div class="row">
		<div class="col-sm-6">
			<p class = "mini-flow-detalle">Ladrón robó dinero a dirigente que daba entrevista a canal de TV</p>
			<p class = "autor">REDACCIÓN EC</p>
		</div>
		<div class="col-sm-6">
			<figure>
				<img src="https://img.elcomercio.pe/files/ec-modulo-mini/uploads/2017/08/09/598aa9394d72a.jpeg">
			</figure>
		</div>									
	</div>
</section>
*/

function armarSeccionMiniFlow(detalle, autor, urlImagen){
	var section = crearElementoConUnAtributo("section", "class", "noticiasamll mini-flow");
	var divrow =  crearElementoConUnAtributo("row");
	var div = crearElementoConUnAtributo("div");

	section.appendChild(divrow);

	return section;
}


function armarUl (cadena, ulclassname, ilclassname){
	var ul = crearElementoConUnAtributo("ul", "class", ulclassname);
	var array = cadena.split(",");
	for (var i = 0; i<array.length; i++){
		var li = crearElementoConUnAtributo("li", "class", ilclassname);
		var a = crearElementoConUnAtributo("a", "href", "#");
		a.innerHTML=array[i];
		li.appendChild(a);
		ul.appendChild(li);
	}
	return ul;
}



window.onload = function (){

	//<div class="container-fluid">
	var body = document.body;
	
	var divContainerFluid = crearElementoConUnAtributo("div", "class", "container-fluid");
	body.appendChild(divContainerFluid);

	//<div class="row">
	var divRowPrincipal = crearElementoConUnAtributo("div", "class", "row");	

	divContainerFluid.appendChild(divRowPrincipal);

	var divAnuncioIzq = crearElementoConUnAtributo("div", "class", "hidden-xs hidden-sm col-md-2 anuncioizq");
	
	var aAnuncioIzq =  crearElementoConUnAtributo("a", "class", "fijoanuncioizq");

	var imgAnuncio =  crearElementoConUnAtributo("img", "src", "https://s1.2mdn.net/4888949/2-160x600-Amabilis-Abr5.jpg");

	aAnuncioIzq.appendChild(imgAnuncio);	
	divAnuncioIzq.appendChild(aAnuncioIzq);	
	divRowPrincipal.appendChild(divAnuncioIzq);


	var divCentro = crearElementoConUnAtributo("div", "class", "col-md-8");
	var header = crearElementoConUnAtributo("header");
	divCentro.appendChild(header);
	divRowPrincipal.appendChild(divCentro);

	var divAnunciosup = crearElementoConUnAtributo("div", "class", "anunciosup hidden-xs");
	var aLink =  crearElementoConUnAtributo("a", "href", "#");
	var imgAnuncioSup = crearElementoConUnAtributo("img", "src", "https://tpc.googlesyndication.com/simgad/9064517820979576384");
	aLink.appendChild(imgAnuncioSup);
	divAnunciosup.appendChild(aLink);
	header.appendChild(divAnunciosup);	


	var menuSup = crearElementoConUnAtributo("nav", "class", "menu-sup");
	var ulTendencia =  crearElementoConUnAtributo("ul", "class", "tendencia");
	var li =  crearElementoConUnAtributo("li", "class", "tendencia-titulo");
	li.innerHTML="HOY";
	var li2 =  crearElementoConUnAtributo("li", "class", "tendencia-contenido");
	var divTendenciaCarrusel = crearElementoConUnAtributo("div", "class", "tendencia-carrusel");
	var cadena = "VENEZUELA,HUMALA,PPK";
	var ul = armarUl (cadena, "", "tendecia-item");
	divTendenciaCarrusel.appendChild(ul);
	li2.appendChild(divTendenciaCarrusel);
	ulTendencia.appendChild(li);
	ulTendencia.appendChild(li2);
	menuSup.appendChild(ulTendencia);
	header.appendChild(menuSup);	

	var ulOpciones =  crearElementoConUnAtributo("ul", "class", "opciones");
	
	var liOpcionItem =  crearElementoConUnAtributo("li", "class", "opciones-item");
	var aOpcionesItem=   crearElementoConUnAtributo("a", "href", "#");
	aOpcionesItem.innerHTML = "INGRESA"
	liOpcionItem.appendChild(aOpcionesItem);
	ulOpciones.appendChild(liOpcionItem);
	

	var liOpcionItem =  crearElementoConUnAtributo("li", "class", "opciones-item");
	var aOpcionesItem=   crearElementoConUnAtributo("a", "href", "#");
	aOpcionesItem.innerHTML = "REGÍSTRATE"
	liOpcionItem.appendChild(aOpcionesItem);
	ulOpciones.appendChild(liOpcionItem);

	var liOpcionItem =  crearElementoConUnAtributo("li", "class", "opciones-item");
	liOpcionItem.innerHTML = '<a href="" class="redes-item"><i class="icon-fb"></i></a>'+
									'<a href="" class="redes-item"><i class="icon-tw"></i></a>'+
									'<a href="" class="redes-item-f"><i class="icon-gp"></i></a>'
	ulOpciones.appendChild(liOpcionItem);

	var liOpcionItem =  crearElementoConUnAtributo("li", "class", "opciones-buscador");
	liOpcionItem.innerHTML = '<span class="glyphicon glyphicon-search"></span>'
	ulOpciones.appendChild(liOpcionItem);

	menuSup.appendChild(ulOpciones);
	
	var divlogosite = crearElementoConUnAtributo("div", "class", "logosite");
	divlogosite.innerHTML = '<img src="https://img.elcomercio.pe/bundles/appcms/images/elcomercio/logo_ec.png?1501791418">';
	header.appendChild(divlogosite);

	var navMenuSitio = crearElementoConUnAtributo("nav", "class", "menu-sitio");
	cadena = 'Lo último,Opinión,Política,Perú,Lima,Mundo,Economía,Luces,DT,TV+,Ver Más,<img src="https://img.elcomercio.pe/bundles/appcms/images/elcomercio/logo_clubec_menu.jpg?1501791553" alt="Club El Comercio"></a>'
	var ul = armarUl (cadena, "menu-principal", "link-menu");
	navMenuSitio.appendChild(ul);
	header.appendChild(navMenuSitio);

	/*<div class="flows-grid">*/
	var divflowsGrid = crearElementoConUnAtributo("div", "class", "flows-grid");
	var divRowContenedor = crearElementoConUnAtributo("div", "class", "row contenedor");
	divflowsGrid.appendChild(divRowContenedor);


	var titulo = "<h6>RECURSO DE CASACIÓN</h6>";
	var detalle = "Gastañaduí espera que Corte Suprema revierta prisión a Humala y Heredia";
	var autor = "REDACCIÓN EC";
	var urlImagen = "http://elcomercio.pe/files/listing_ec_home_principal2x1/uploads/2017/08/04/5984ff264371a.jpeg";
	var articulo =  armarArticuloPrincipal(titulo, detalle, autor,urlImagen);

	divRowContenedor.appendChild(articulo);
	divCentro.appendChild(divflowsGrid);

	////////
	/*
	<article class="col-md-4 flow-1x1">
	*/
	var articulosMiniFlow = crearElementoConUnAtributo("article", "class", "col-md-4 flow-1x1");

	////////

	var divAnuncioDer = crearElementoConUnAtributo("div", "class", "hidden-xs hidden-sm col-md-2 anuncioder");
	
	var aAnuncioDer =  crearElementoConUnAtributo("a", "class", "fijoanuncioder");

	var imgAnuncio =  crearElementoConUnAtributo("img", "src", "https://tpc.googlesyndication.com/simgad/2540904171597576848");

	aAnuncioDer.appendChild(imgAnuncio);	
	divAnuncioDer.appendChild(aAnuncioDer);	
	divRowPrincipal.appendChild(divAnuncioDer);

}