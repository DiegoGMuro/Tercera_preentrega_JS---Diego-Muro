// Selecciono el ID "modo" del HTML y lo guardo en variable
const botonModo = document.getElementById('modo');

// Valido si la CLASE "modoOscuro" esta activada
function cambiarModo() {
    document.body.classList.toggle('modoOscuro');

    if (document.body.classList.contains('modoOscuro')) {
        botonModo.textContent = 'Ligth mode';
    } else {
        botonModo.textContent = 'Dark mode';
    }
}
// Escucho el "click" y ejecuto la funcion cambiarModo
botonModo.addEventListener('click', cambiarModo);