// VERSION CODIGO CON CARRITO DE COMPRAS 

// Definimos el array con los destinos y precios base
const destinos = [
    { ciudad: "Barcelona", precioBase: 100 },
    { ciudad: "Madrid", precioBase: 90 },
    { ciudad: "Paris", precioBase: 120 }
];

// Variables para almacenar la información del carrito
let carrito = [];
let total = 0;

// Función para calcular el incremento de precio según los días de estancia
function calcularIncrementoDias(dias) {
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

// Función para calcular el precio total de un viaje
function calcularPrecioViaje(destino, pasajeros, dias) {
    const precioBase = destinos.find(element => element.ciudad.toUpperCase() === destino).precioBase;
    const incrementoDias = calcularIncrementoDias(dias);
    const precioTotal = precioBase * pasajeros * (1 + incrementoDias);
    return precioTotal;
}

// Función para validar la edad del usuario
function validarEdad(anioNacimiento) {
    const anioActual = new Date().getFullYear();
    const edad = anioActual - anioNacimiento;
    if (edad < 18) {
        alert(`Lo siento, tienes ${edad} años, debes ser mayor de 18 años para poder cotizar un viaje.`);
        return false;
    } else {
        return true;
    }
}


// Preguntamos al usuario por su información personal y preferencias de viaje
let nombre = prompt("Ingrese su nombre:").toUpperCase();;
while (nombre === "") {
    alert('Debe ingresar su nombre')
    nombre = prompt("Ingrese su nombre:").toUpperCase();;
}
let anioNacimiento = Number(prompt("Ingrese su año de nacimiento:"));
while (anioNacimiento <= 0 || !Number.isInteger(anioNacimiento)) {
    alert('Debe ingresar un año valido')
    anioNacimiento = Number(prompt('Ingrese su año de nacimiento'));
}
const esMayorDeEdad = validarEdad(anioNacimiento);


// Si el usuario es mayor de edad, preguntamos por las preferencias de viaje
if (esMayorDeEdad) {
    let continuarCotizando = true;
    while (continuarCotizando) {
        alert(`Bienvenido ${nombre} !! ud esta a punto de cotizar viajes a 6 destinos de Europa.`);

        let destino = prompt("Ingrese el destino del viaje (Barcelona, Madrid o Paris):").toUpperCase();
        while (destino !== "BARCELONA" && destino !== "MADRID" && destino !== "PARIS") {
            alert('Debe ingresar un destino valido')
            destino = prompt("Ingrese el destino del viaje (Amsterdam, Barcelona, Berlin, Roma, Londres o Paris):").toUpperCase();
        }
        let pasajeros = Number(prompt("Ingrese la cantidad de pasajeros:"));
        while (isNaN(pasajeros) || pasajeros < 1 || !Number.isInteger(pasajeros)) {
            alert('Debe ingresar una cantidad valida')
            pasajeros = Number(prompt("Ingrese la cantidad de pasajeros:"));
        }
        let dias = Number(prompt("Ingrese la cantidad de días de estancia:"));
        while (isNaN(dias) || dias < 1 || !Number.isInteger(dias)) {
            alert('Debe ingresar una cantidad de dias validos')
            dias = Number(prompt("Ingrese la cantidad de días de estancia:"));
        }


        // Calculamos el precio total del viaje
        const precioTotal = calcularPrecioViaje(destino, pasajeros, dias);

        // Mostramos el resultado parcial al usuario
        alert(`Viaje a ${destino} para ${pasajeros} pasajeros por ${dias} días:\nPrecio total: $${precioTotal.toFixed(2)}`);

        // Agregamos el resultado al carrito
        carrito.push({ destino, pasajeros, dias, precioTotal });
        total += precioTotal;

        // Preguntamos al usuario si desea seguir cotizando o finalizar
        const opcion = prompt("¿Deseas seguir cotizando? (S/N)").toLowerCase();
        if (opcion === "n") {
            continuarCotizando = false;
        }
    }

    // Mostramos el resultado final al usuario
    let mensajeFinal = ` Estimado / a ${nombre},Total de cotizaciones realizadas: ${carrito.length}\n`;
    carrito.forEach((viaje, index) => {
        mensajeFinal += `Viaje ${index + 1}: ${viaje.destino} para ${viaje.pasajeros} pasajeros por ${viaje.dias} días\nPrecio total: $${viaje.precioTotal.toFixed(2)}\n`;
    });
    mensajeFinal += `Total a pagar: $${total.toFixed(2)}`;
    alert(mensajeFinal);
    document.write("<h1>" + mensajeFinal + "</h1>");


    // Generacion de tabla para el HTML 
    function generarTabla(cotizaciones) {
        // Seleccionar el elemento HTML donde se mostrará la tabla
        const tablaCotizaciones = document.getElementById("tabla-cotizaciones");

        // Crear la estructura de la tabla
        const tabla = document.createElement("table");

        // Crear la fila de encabezado
        const encabezado = document.createElement("tr");
        const encabezadoDestino = document.createElement("th");
        encabezadoDestino.textContent = "Destino";
        const encabezadoPasajeros = document.createElement("th");
        encabezadoPasajeros.textContent = "Pasajeros";
        const encabezadoDias = document.createElement("th");
        encabezadoDias.textContent = "Días";
        const encabezadoPrecioTotal = document.createElement("th");
        encabezadoPrecioTotal.textContent = "Precio Total";
        encabezado.appendChild(encabezadoDestino);
        encabezado.appendChild(encabezadoPasajeros);
        encabezado.appendChild(encabezadoDias);
        encabezado.appendChild(encabezadoPrecioTotal);
        tabla.appendChild(encabezado);

        // Crear las filas de cotizaciones
        cotizaciones.forEach((cotizacion) => {
            const fila = document.createElement("tr");
            const celdaDestino = document.createElement("td");
            celdaDestino.textContent = cotizacion.destino;
            const celdaPasajeros = document.createElement("td");
            celdaPasajeros.textContent = cotizacion.pasajeros;
            const celdaDias = document.createElement("td");
            celdaDias.textContent = cotizacion.dias;
            const celdaPrecioTotal = document.createElement("td");
            celdaPrecioTotal.textContent = cotizacion.precioTotal;
            fila.appendChild(celdaDestino);
            fila.appendChild(celdaPasajeros);
            fila.appendChild(celdaDias);
            fila.appendChild(celdaPrecioTotal);
            tabla.appendChild(fila);
        });

        // Agregar la tabla al elemento HTML
        tablaCotizaciones.appendChild(tabla);
    }

    // Generar la tabla de cotizaciones
    generarTabla(carrito);

}
