
// Defino la clase Viaje y el metodo para calcular el precio final,
class Viaje {
    constructor(destino, precioBase) {
        this.destino = destino;
        this.precioBase = precioBase;
    }
    calcularPrecio(cantidadPasajeros, cantidadDias) {
        let incremento = 0;

        switch (true) {
            case cantidadDias > 28:
                incremento = 0;
                break;
            case cantidadDias >= 22:
                incremento = 0.1;
                break;
            case cantidadDias >= 15:
                incremento = 0.2;
                break;
            case cantidadDias >= 8:
                incremento = 0.3;
                break;
            default:
                incremento = 0.4;
                break;
        }
        const precioFinal = this.precioBase * cantidadPasajeros * (1 + incremento);
        return precioFinal;
    }
}

// Crear un array de objetos Viaje
const viajes = [
    new Viaje("Amsterdam", 500000),
    new Viaje("Barcelona", 450000),
    new Viaje("Berlin", 600000),
    new Viaje("Roma", 400000),
    new Viaje("Londres", 700000),
    new Viaje("Paris", 600000)
];

// Ingreso anio de nacimiento
let anioNacimiento;

do {
    anioNacimiento = Number(prompt("Ingrese su año de nacimiento:"));
} while (anioNacimiento <= 0 || !Number.isInteger(anioNacimiento));

// Valido edad del usuario
let fechaActual = new Date();
let anioActual = fechaActual.getFullYear();
let edad = anioActual - anioNacimiento;

if (edad < 18) {
    alert(`Lo siento, ud tiene ${edad} años no podemos cotizar viajes para menores de 18 años.`);
} else {
    alert(`Bienvenido ud esta a punto de cotizar viajes a 6 destinos de Europa.`);

    let nombre, destino, cantidadPasajeros, cantidadDias;
    do {
        nombre = prompt("Ingrese su nombre:").toUpperCase();
    } while (nombre === "");

    do {
        destino = prompt("Ingrese el destino del viaje (Amsterdam, Barcelona, Berlin, Roma, Londres o Paris):").toUpperCase();
    } while (destino !== "AMSTERDAM" && destino !== "BARCELONA" && destino !== "BERLIN" && destino !== "ROMA" && destino !== "LONDRES" && destino !== "PARIS");

    do {
        cantidadPasajeros = Number(prompt("Ingrese la cantidad de pasajeros:"));
    } while (isNaN(cantidadPasajeros) || cantidadPasajeros < 1 || !Number.isInteger(cantidadPasajeros));

    do {
        cantidadDias = Number(prompt("Ingrese la cantidad de días de estancia:"));
    } while (isNaN(cantidadDias) || cantidadDias < 1 || !Number.isInteger(cantidadDias));

    // Busco el objeto Viaje segun el destino ingresado con find()
    const viajeSeleccionado = viajes.find(viaje => viaje.destino.toUpperCase() === destino);

    // Calculo el precio final y renderizo
    if (viajeSeleccionado) {
        const precioFinal = viajeSeleccionado.calcularPrecio(cantidadPasajeros, cantidadDias);
        alert(` Estimado/a ${nombre}, el precio final de su viaje a ${destino} para ${cantidadPasajeros} pasajeros por ${cantidadDias} día/s de estadia es de ARS $${precioFinal.toLocaleString('es-AR')}.`);

        document.write(` <h1> Estimado/a ${nombre}, el precio final de su viaje a ${destino} para ${cantidadPasajeros} pasajeros por ${cantidadDias} día/s de estadia es de ARS $${precioFinal.toLocaleString('es-AR')}. </h1>`);

    } else {
    }

    // Utilizo un map() para obtener un array con los precios finales de cada viaje para el % aplicable al usuario por los dias seleccionados
    const preciosFinales = viajes.map(viaje => viaje.calcularPrecio(cantidadPasajeros, cantidadDias));

    // Muestro Array con precios finales por Consola
    console.log(preciosFinales);

}