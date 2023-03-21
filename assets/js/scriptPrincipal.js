// Autenticar contraseña 
const maxIntentos = 3;
let intentos = 0;

const psw = document.getElementById("psw");
const mensaje = document.getElementById("mensaje");

psw.addEventListener("submit", function (event) {
	event.preventDefault(); // Evita el envío del formulario por defecto
	const pswUsuario = psw.password.value;
	const pswAutenticada = sessionStorage.getItem('password') // Uso la psw guardada anteriormente en 'generacionPsw.js'
	if (pswUsuario === pswAutenticada) {
		mensaje.innerHTML = "Su contraseña es correcta, proceda a cotizar viajes";
       // Habiendo validado PSW procedo se aplica el codigo para cotizar viajes
		const tarifas = {
			Amsterdam: 500000,
			Barcelona: 450000,
			Berlin: 600000,
			Roma: 400000,
			Londres: 700000,
			Paris: 600000
		};
		// Condiciones de incrementos por estadia
		const incremEstadia = (dias) => {
			if (dias >= 1 && dias <= 7) {
				return 0.4;
			} else if (dias >= 8 && dias <= 14) {
				return 0.3;
			} else if (dias >= 15 && dias <= 21) {
				return 0.2;
			} else if (dias >= 22 && dias <= 28) {
				return 0.1;
			} else {
				return 0;
			}
		}
		// Agrego al carrito y calculo valores y transformo en JSON y guardo con SetItem
		let carrito = [];
		const agregarCarrito = () => {
			const ciudad = document.getElementById("ciudad").value;
			const pasajeros = document.getElementById("pasajeros").value;
			const dias = document.getElementById("dias").value;
			const precios = tarifas[ciudad] * pasajeros;
			const incrementos = incremEstadia(dias);
			const total = precios * (1 + incrementos);
			const item = { ciudad, pasajeros, dias, precios, incrementos, total };
			carrito.push(item);
			localStorage.setItem("carrito", JSON.stringify(carrito));
			updatecarrito();
		};
        // Actualizo carrito y armo la tabla
		const updatecarrito = () => {
			const carritoDiv = document.getElementById("carrito");
			//Acumulo los ITEMS de la funcion "agregarCarrito" con REDUCE
			const table = carrito.reduce((acumulado, item) => {
				const fila = `<tr><td>${item.ciudad}</td><td>${item.pasajeros}</td><td>${item.dias}</td><td>$${item.precios.toLocaleString('es-AR')}</td><td>${item.incrementos * 100}%</td><td>$${item.total.toLocaleString('es-AR')}</td></tr>`;
				return acumulado + fila;
			}, "<table><tr><th>Ciudad</th><th>Pasajeros</th><th>Días de estancia</th><th>Precio base</th><th>Incremento</th><th>Total</th></tr>");
			//Acumulo el TOTAL GENERAL de los ITEMS de la funcion "agregarCarrito" con REDUCE
			const totalprecios = carrito.reduce((acumulado, item) => acumulado + item.total, 0);
			const tablaConTotal = `${table}<tr><td></td><td></td><td></td><td></td><td></td><td><strong style="font-size:larger;color: blue;">Total general:</strong><span style="color: blue;"> $${totalprecios.toLocaleString('es-AR')}</td></tr></table>`;
			carritoDiv.innerHTML = tablaConTotal;
		};
		// Finalizo la cotizacion y limpio la tabla
		const finalizarCarrito = () => {
			carrito = [];
			localStorage.removeItem("carrito");
			updatecarrito();
		};

		document.getElementById("agregar").addEventListener("click", agregarCarrito);
		document.getElementById("resetear").addEventListener("click", finalizarCarrito);
		// Sin ingreso mal la contraseña voy al ELSE
	} else {
		intentos++;
		if (intentos < maxIntentos) {
			mensaje.innerHTML = `Contraseña incorrecta. Le quedan ${maxIntentos - intentos} intentos.`;
		} else {
			mensaje.innerHTML = "Ha excedido el número máximo de intentos. Acceso bloqueado.";
			psw.password.disabled = true; // Desactivo el ingreso de contraseña después de agotar los intentos
			psw.querySelector("button[type=submit]").disabled = true; // Desactivo el botón de enviar (CSS), después de agotar los intentos.
		}
	}
});

