class HomePage extends InnerPage{
	constructor(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, customPanelController, userservice, bebidaApiClient, comidaApiClient){
		super(id, label, espartemenu, titulo, url, autenticado, html, navigation, contenedor, customPanelController, userservice);
		this._bebidaApiClient = bebidaApiClient;
		this._comidaApiClient = comidaApiClient;
	}	

	init(data){
		let otherPromise = this.paint();		

		otherPromise.then(() => {
			this._contenido = "home.html";
			this.paintContent();		
		})
	}

	paintContent(){
		let promise = this.leerTemplate(this._contenido);
		promise.then(content => {
				//console.log(content);
				let titulo = this._titulo;
				let templateString = eval('`' + content + '`');

				let contenido = this._contenedor.querySelector("#contenido");
				if(contenido!=null){
					contenido.innerHTML = templateString;
					this.pintarGraficoBarras(contenido);
					this.pintarGraficoPie(contenido);				
				}             
            });         
	}

	pintarGraficoBarras(contenido){
		this._comidaApiClient.getAllComidas().then((data) => {
			let datosExistencias = [];
			let datosPrecio = [];
			let labelsData = [];			
			let totalEntrante = 0;
			let totalPrincipal = 0;
			let totalPostre = 0;

			for (let i = 0; i < data.length; i++) {		
				let comida = data[i];		
				labelsData.push(comida._nombre.substring(0,12));

				datosExistencias.push(comida._existencias);

				datosPrecio.push(comida._precio);
				if(comida._tipo == "Entrante"){
					totalEntrante = totalEntrante + 1;	
				}else if(comida._tipo == "Principal"){
					totalPrincipal = totalPrincipal + 1;	
				}else if(comida._tipo == "Postre"){
					totalPostre = totalPostre + 1;	
				}
			}

			let divTotalEntrante = contenido.querySelector("#totalEntrante");
			divTotalEntrante.innerHTML = totalEntrante;

			let divTotalPrincipal = contenido.querySelector("#totalPrincipal");
			divTotalPrincipal.innerHTML = totalPrincipal;

			let divTotalPostre = contenido.querySelector("#totalPostre");
			divTotalPostre.innerHTML = totalPostre;

			let ctx = contenido.querySelector("#canvasbar").getContext("2d");
	        let myChart = new Chart(ctx, {
			    type: 'bar',
			    data: {
			        labels: labelsData,
			        datasets: [{
			            label: 'Existencias',
			            data: datosExistencias,
			            backgroundColor: 'rgba(255, 99, 132, 0.8)',
			            borderColor: 'rgba(255,99,132,1)',
			            borderWidth: 1
			        },
			        {
			            label: 'Precio',
			            data: datosPrecio,
			            backgroundColor: 'rgba(255, 206, 86, 0.8)',
			            borderColor: 'rgba(255, 206, 86, 1)',
			            borderWidth: 1
			        }
			        ]
			    },

			    options: {
			    	title: {
			            display: true,
			            text: 'Comidas'
			        },
			        scales: {
			            yAxes: [{
			                ticks: {
			                    beginAtZero:true			                    
			                }
			            }]
			        },
			        legend: {
			            display: true,
			            labels: {
			                fontColor: 'rgb(255, 99, 132)'
			            }
			        }
			    }
			});		
		}).catch((reason)=> {
			console.log(reason);
			let mensaje = contenido.querySelector("#mensajebarra");
			mensaje.innerHTML = `<div class="alert alert-danger fade in">
				    <a href="#" class="close" data-dismiss="alert" id="close-modal-button">&times;</a>
				    <strong>Error!</strong><span id="contenidomodal"> Ocurrió un error interno<span>
				</div>`;
			let cuerpo = contenido.querySelector("#cuerpo");
			cuerpo.setAttribute("style", "display:none");
		});		
	}	

	pintarGraficoPie(contenido){
		this._bebidaApiClient.getAllBebidas().then((data) => {			
			let datosExistencias = [];
			let datosPrecio = [];
			let labelsData = [];
			let backgroundColor = [];
			
			for (let i = 0; i < data.length; i++) {		
				let bebida = data[i];		
				labelsData.push(bebida._nombre);

				datosExistencias.push(bebida._existencias);

				datosPrecio.push(bebida._precio);

				let r = Utiles.generarNumeroAleatorioEntre(0,255);
				let g = Utiles.generarNumeroAleatorioEntre(0,255);
				let b = Utiles.generarNumeroAleatorioEntre(0,255);
				let colorBg = 'rgba('+ r +', '+ g +', '+ b +', 0.8)'; 
				backgroundColor.push(colorBg);
			}

			let ctx = contenido.querySelector("#canvaspie").getContext("2d");
	        let myChart = new Chart(ctx, {
			    type: 'pie',
			    data: {
			        labels: labelsData,
			        datasets: [{
			            data: datosExistencias,
			            backgroundColor: backgroundColor,
			            label: 'Bebidas'
			        }
			        ]
			    },

			    options: {
			    	title: {
			            display: true,
			            text: 'Cantidad de Bebidas'
			        },
			        responsive: true
			    }
			});		
		}).catch((reason)=> {
			console.log(reason);
			let mensaje = contenido.querySelector("#mensajepie");
			mensaje.innerHTML = `<div class="alert alert-danger fade in">
				    <a href="#" class="close" data-dismiss="alert" id="close-modal-button">&times;</a>
				    <strong>Error!</strong><span id="contenidomodal"> Ocurrió un error interno<span>
				</div>`;
			let cuerpo = contenido.querySelector("#cuerpo");
			cuerpo.setAttribute("style", "display:none");
		});
	}	

}