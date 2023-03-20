// VERSION CON CARRITO DE COMPRAS 

// Definimos el array con los destinos y precios base
const destinos = [
    { ciudad: "Barcelona", precioBase: 450000 },
    { ciudad: "Berlin", precioBase: 600000 },
    { ciudad: "Paris", precioBase: 600000 },
    { ciudad: "Roma", precioBase: 400000 },
    { ciudad: "Amsterdam", precioBase: 500000 },
    { ciudad: "Londres", precioBase: 700000 }
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
/* function calcularPrecioViaje(destino, pasajeros, dias) {
    const precioBase = destinos.find(element => element.ciudad.toUpperCase() === destino).precioBase;
    const incrementoDias = calcularIncrementoDias(dias);
    const precioTotal = precioBase * pasajeros * (1 + incrementoDias);
    return precioTotal;
} */

function calcularPrecioViaje(destino, pasajeros, dias) {
    if (!Number.isInteger(pasajeros) || !Number.isInteger(dias)) {
    return "La cantidad de pasajeros y los días de estancia deben ser números enteros";
    }
    const precioBase = destinos.find(element => element.ciudad.toUpperCase() === destino).precioBase;
    const incrementoDias = calcularIncrementoDias(dias);
    const precioTotal = precioBase * pasajeros * (1 + incrementoDias);
    return precioTotal;
    }




// Función para validar la edad del usuario
function validarEdad(anioNacimiento) {
    const anioActual = new Date().getFullYear();
    if (anioNacimiento > anioActual) {
    alert(`El año de nacimiento ingresado no puede ser posterior al año actual.`);
    return false;
    }
    const edad = anioActual - anioNacimiento;
    if (edad < 18) {
    alert(`Lo siento, tienes ${edad} años, debes ser mayor de 18 años para poder cotizar un viaje.`);
    return false;
    } else {
    return true;
    }
    }

// Recorremos el array de destinos con un bucle FOR OF y lo informamos al usuario al inicio:
let mensaje = 'Ciudades Disponibles:\n\n';
for (const destino of destinos) {
    mensaje += `Destino: ${destino.ciudad} - Precio base: $${destino.precioBase.toLocaleString('es-AR')}\n`;
}
console.log(mensaje); // Chequeo para el programador
alert(mensaje);


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
        alert(`Bienvenido ${nombre} !! Ud esta a punto de cotizar viajes a 6 destinos de Europa.`);

        let destino = prompt("Ingrese el destino del viaje (Barcelona, Berlin, Roma, Amsterdam, Londres o Paris):").toUpperCase();
        while (destino !== "BARCELONA" && destino !== "BERLIN" && destino !== "ROMA" && destino !== "AMSTERDAM" && destino !== "LONDRES" && destino !== "PARIS") {
            alert('Debe ingresar un destino valido')
            destino = prompt("Ingrese el destino del viaje (Barcelona, Berlin, Roma, Amsterdam, Londres o Paris):").toUpperCase();
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
        alert(`Viaje a ${destino} para ${pasajeros} pasajeros por ${dias} días:\nPrecio total: $${precioTotal.toLocaleString('es-AR')}`);

        // Agregamos el resultado al carrito
        carrito.push({ destino, pasajeros, dias, precioTotal });
        total += precioTotal;

        // Preguntamos al usuario si desea seguir cotizando o finalizar
        const opcion = prompt("¿Deseas seguir cotizando? (S/N)").toLowerCase();
        if (opcion === "n") {
            continuarCotizando = false;
        }
    }

    // Mostramos el resultado final al usuario por alert y pantalla
    let mensajeFinal = ` Estimado/a ${nombre},Total de cotizaciones realizadas: ${carrito.length}\n`;
    carrito.forEach((viaje, index) => {
        mensajeFinal += `Viaje ${index + 1}: ${viaje.destino} para ${viaje.pasajeros} pasajeros por ${viaje.dias} días\nPrecio total: $${viaje.precioTotal.toLocaleString('es-AR')}\n`;
    });
    mensajeFinal += `Total a pagar: $${total.toLocaleString('es-AR')}`;
    alert(mensajeFinal);
    console.log(carrito) // Chequeo para el programador
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
            celdaPrecioTotal.textContent = ` $ ${cotizacion.precioTotal.toLocaleString('es-AR')}`;
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

}else{

}
