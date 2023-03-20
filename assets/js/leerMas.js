
let botonLeerMas = document.getElementById('botonLeerMas');
let esconderTexto = document.getElementById('esconderTexto');


botonLeerMas.addEventListener('click', alternarTexto);

function alternarTexto() {
    esconderTexto.classList.toggle('mostrarTexto');

    if (esconderTexto.classList.contains('mostrarTexto')) {
        botonLeerMas.innerHTML = 'Leer menos'
    }
    else {
        botonLeerMas.innerHTML = 'Leer mas'
    }

}
