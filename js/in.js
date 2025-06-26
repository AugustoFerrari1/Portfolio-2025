document.querySelectorAll('.progress').forEach(el => {
    el.setAttribute('data-aos', 'fade-left');
});

document.querySelectorAll('.atributos .tipo').forEach(el => {
    el.setAttribute('data-aos', 'fade-up');
});


function direciones(element) {
    
    const url = element.getAttribute('data-url');
    
    window.open(url, '_blank');
}

let idiomaActual = 'es';

function cambiarLenguaje() {
    idiomaActual = idiomaActual === 'es' ? 'en' : 'es';
    traducirPagina();
}

function traducirPagina() {
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const clave = elem.getAttribute('data-i18n');
        if (traducciones[idiomaActual][clave]) {
            elem.innerHTML = traducciones[idiomaActual][clave];
        }
    });
}


document.getElementById("btnAutomotora").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("alertaAutomotora").classList.remove("d-none");
});

function cerrarAlerta() {
    document.getElementById("alertaAutomotora").classList.add("d-none");
}
