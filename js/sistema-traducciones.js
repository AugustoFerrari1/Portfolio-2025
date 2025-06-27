// Sistema de traducciones e internacionalización
let idiomaActual = 'es';

// Cambia el idioma de la página
function cambiarIdioma() {
  idiomaActual = idiomaActual === 'es' ? 'en' : 'es';

  const botonIdioma = document.getElementById('lenguajebtn');
  if (botonIdioma) {
    botonIdioma.textContent = idiomaActual === 'es' ? 'EN' : 'ES';
  }

  // Evitar parpadeo ocultando elementos animados
  const elementosAnimados = document.querySelectorAll('.revelartext, .nombre');
  elementosAnimados.forEach((elem) => {
    elem.style.opacity = '0';
  });

  // Limpiar TODAS las animaciones ScrollTrigger
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  requestAnimationFrame(() => {
    aplicarTraducciones();

    setTimeout(() => {
      setTimeout(() => {
        actualizarAnimacionExperiencia();
      }, 100);
      if (window.reiniciarTodasLasAnimacionesTexto) {
        window.reiniciarTodasLasAnimacionesTexto();
      }

      setTimeout(() => {
        elementosAnimados.forEach((elem) => {
          elem.style.opacity = '';
        });
      }, 100);
    }, 50);
  });
}

// Aplica las traducciones
function aplicarTraducciones() {
  if (typeof traducciones === 'undefined') {
    return;
  }

  if (!traducciones[idiomaActual]) {
    return;
  }

  // Limpiar SplitTypes antes de cambiar el contenido
  document.querySelectorAll('[data-i18n]').forEach((elem) => {
    if (elem._splitType) {
      elem._splitType.revert();
      elem._splitType = null;
    }
  });

  // Aplicar las traducciones
  document.querySelectorAll('[data-i18n]').forEach((elem) => {
    const clave = elem.getAttribute('data-i18n');

    if (clave === 'cambiar_idioma') {
      return;
    }

    if (traducciones[idiomaActual][clave]) {
      elem.innerHTML = traducciones[idiomaActual][clave];
    }
  });
}

// Inicializa las traducciones en el idioma por defecto
function inicializarTraducciones() {
  if (typeof traducciones === 'undefined') {
    return;
  }

  if (!traducciones[idiomaActual]) {
    return;
  }

  document.querySelectorAll('[data-i18n]').forEach((elem) => {
    const clave = elem.getAttribute('data-i18n');

    if (clave === 'cambiar_idioma') {
      return;
    }

    if (traducciones[idiomaActual][clave]) {
      elem.innerHTML = traducciones[idiomaActual][clave];
    }
  });
}

function obtenerIdiomaActual() {
  return idiomaActual;
}

function establecerIdioma(nuevoIdioma) {
  if (nuevoIdioma !== 'es' && nuevoIdioma !== 'en') {
    return;
  }

  idiomaActual = nuevoIdioma;
  aplicarTraducciones();
}

// Inicializar traducciones al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    if (typeof traducciones !== 'undefined') {
      inicializarTraducciones();

      setTimeout(() => {
        actualizarAnimacionExperiencia();
      }, 100);
    }
  }, 100);
});

// Exponer funciones globalmente
window.cambiarIdioma = cambiarIdioma;
window.aplicarTraducciones = aplicarTraducciones;
window.inicializarTraducciones = inicializarTraducciones;
window.obtenerIdiomaActual = obtenerIdiomaActual;
window.establecerIdioma = establecerIdioma;
window.idiomaActual = idiomaActual;
