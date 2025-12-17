// Sistema de traducciones e internacionalización
import { traducciones } from './lang.js';

let idiomaActual = 'es';

// Cambia el idioma de la página
export function cambiarIdioma() {
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
  if (window.ScrollTrigger) {
    window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  requestAnimationFrame(() => {
    aplicarTraducciones();

    // Actualizar animación de experiencia primero (antes de reiniciar animaciones)
    setTimeout(() => {
      if (window.actualizarAnimacionExperiencia) {
        window.actualizarAnimacionExperiencia();
      }
    }, 100);

    // Reiniciar animaciones de texto
    setTimeout(() => {
      if (window.reiniciarTodasLasAnimacionesTexto) {
        window.reiniciarTodasLasAnimacionesTexto();
      }

      setTimeout(() => {
        elementosAnimados.forEach((elem) => {
          elem.style.opacity = '';
        });
      }, 100);
    }, 150);
  });
}

// Aplica las traducciones
export function aplicarTraducciones() {
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
export function inicializarTraducciones() {
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

export function obtenerIdiomaActual() {
  return idiomaActual;
}

export function establecerIdioma(nuevoIdioma) {
  if (nuevoIdioma !== 'es' && nuevoIdioma !== 'en') {
    return;
  }

  idiomaActual = nuevoIdioma;
  aplicarTraducciones();
}
