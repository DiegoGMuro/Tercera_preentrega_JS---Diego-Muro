
const botonModo = document.getElementById('modo');

function cambiarModo() {
    document.body.classList.toggle('modoOscuro');

    if (document.body.classList.contains('modoOscuro')) {
        botonModo.textContent = 'Ligth mode';
    } else {
        botonModo.textContent = 'Dark mode';
    }
}

botonModo.addEventListener('click', cambiarModo);