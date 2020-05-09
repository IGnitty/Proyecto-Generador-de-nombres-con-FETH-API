const generarNombres = document.querySelector('#generar-nombre');
generarNombres.addEventListener('submit', cargarNombres);

//llamado ajax para imprimir resultados
function cargarNombres(event) {
	event.preventDefault();

	//leer las variables
	//origen del nombre
	const origen = document.querySelector('#origen');
	const origenSeleccionado = origen.options[origen.selectedIndex].value;

	//genero del nombre
	const genero = document.querySelector('#genero');
	const generoSeleccionado = genero.options[genero.selectedIndex].value;
	const cantidad = document.querySelector('#numero').value;
	let url = '';
	url += 'https://randomuser.me/api/?inc=name,gender,nat&ninfo&';

	// agregar origen y agregarlo a la url

	if (origenSeleccionado !== '') {
		url += `nat=${origenSeleccionado}&`;
	}

	if (origenSeleccionado !== '') {
		url += `gender=${generoSeleccionado}&`;
	}

	if (cantidad !== '') {
		url += `results=${cantidad}&`;
	}

	//conectar con fetch api
	fetch(url)
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
			let htmlNombres = '<h2>Nombres Generados</h2>';
			htmlNombres += '<ul class="lista">';
			for (let i = 0; i < cantidad; i++) {
				htmlNombres += `
				${data.results[i].name.first}
				<br>
				`;
			}
			htmlNombres += '</ul>';
			document.querySelector('#resultado').innerHTML = htmlNombres;
		})
		.catch(function (error) {
			document.querySelector(
				'#resultado'
			).innerHTML = `</h6 style="color: red">${error}</h6>`;
		});

	setTimeout(() => {
		generarNombres.reset();
	}, 3000);
}
