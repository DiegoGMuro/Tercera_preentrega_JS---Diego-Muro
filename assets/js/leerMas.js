

let botonLeerMas = document.getElementById('botonLeerMas');
let esconderTexto = document.getElementById('esconderTexto');


botonLeerMas.addEventListener('click', alternarTexto);

function alternarTexto() {
    esconderTexto.classList.toggle('showText');

    if (esconderTexto.classList.contains('showText')) {
        botonLeerMas.innerHTML = 'Leer menos'
    }
    else {
        botonLeerMas.innerHTML = 'Leer mas'
    }

}
