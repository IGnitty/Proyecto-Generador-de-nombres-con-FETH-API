const generarNombres = document.querySelector('#generar-nombre');
generarNombres.addEventListener('submit', cargarNombres);

//llamado ajax para imprimir resultados
function cargarNombres(event) {
	event.preventDefault();
	//leer las variables

	//origen del nombre
	const origen = document.querySelector('#origen');
	const origenSeleccionado = origen.options[origen.selectedIndex].value;
	console.log(origenSeleccionado);

	//genero del nombre
	const genero = document.querySelector('#genero');
	const generoSeleccionado = genero.options[genero.selectedIndex].value;
	console.log(generoSeleccionado);

	const cantidad = document.querySelector('#numero').value;
	console.log(cantidad);

	let url = '';

	url += 'https://randomuser.me/api/?inc=name,gender,nat&noinfo&';

	// agregar origen y agregarlo a la url

	if (origenSeleccionado !== '') {
		url += `nat=${origenSeleccionado}&`;
		console.log(url);
	}

	if (origenSeleccionado !== '') {
		url += `gender=${generoSeleccionado}&`;
		console.log(url);
	}

	if (cantidad !== '') {
		url += `results=${cantidad}&`;
		console.log(url);
	}

	//conectar con ajax

	const xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onload = function () {
		if (this.status === 200) {
			const nombres = JSON.parse(this.responseText);
			let htmlNombres = '<h2> Nombres Generados</h2>';
			htmlNombres += '<ul class="lista">';

			for (let i = 0; i < cantidad; i++) {
				htmlNombres += `
                ${nombres.results[i].name.first}
                <br>
                `;
				// nombres.results[i].name.first para tommar solo el nombre
			}

			htmlNombres += '</ul>';

			document.querySelector('#resultado').innerHTML = htmlNombres;
		}
	};
	xhr.send();

	setTimeout(function () {
		generarNombres.reset();
	}, 2000);
}
