
const botonModo = document.getElementById('modo');

function cambiarModo() {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        botonModo.textContent = 'Ligth mode';
    } else {
        botonModo.textContent = 'Dark mode';
    }
}

botonModo.addEventListener('click', cambiarModo);