let alertTimeout = null;
let isAnimating = false;
let idiomaActual = 'es';

document.querySelectorAll('.progress').forEach((el) => {
  el.setAttribute('data-aos', 'fade-left');
});

document.querySelectorAll('.atributos .tipo').forEach((el) => {
  el.setAttribute('data-aos', 'fade-up');
});

// eslint-disable-next-line no-unused-vars
function direciones(element) {
  const url = element.getAttribute('data-url');
  window.open(url, '_blank');
}

// Navegación suave
document.getElementById('sobremibtn').addEventListener('click', function () {
  document.getElementById('sobremi').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('atributosbtn').addEventListener('click', function () {
  document.getElementById('atributos').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('trabajosbtn').addEventListener('click', function () {
  document.getElementById('trabajos').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('contactobtn').addEventListener('click', function () {
  document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
});

// eslint-disable-next-line no-unused-vars
function cambiarLenguaje() {
  idiomaActual = idiomaActual === 'es' ? 'en' : 'es';

  const botonIdioma = document.getElementById('lenguajebtn');
  if (botonIdioma) {
    botonIdioma.textContent = idiomaActual === 'es' ? 'EN' : 'ES';
  }

  // Evita parpadeo
  const elementosAnimados = document.querySelectorAll('.revelartext, .nombre');
  elementosAnimados.forEach((elem) => {
    elem.style.opacity = '0';
  });

  // Limpiar TODAS las animaciones ScrollTrigger
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  requestAnimationFrame(() => {
    traducirPaginaOptimizada();

    setTimeout(() => {
      reiniciarTodasLasAnimaciones();

      setTimeout(() => {
        elementosAnimados.forEach((elem) => {
          elem.style.opacity = '';
        });
      }, 100);
    }, 50);
  });
}

// Función para traducir demora
function traducirPaginaOptimizada() {
  if (typeof traducciones === 'undefined') {
    console.error(
      'El objeto traducciones no está definido. Verifica que lang.js se haya cargado correctamente.'
    );
    return;
  }

  if (!traducciones[idiomaActual]) {
    console.error(`No se encontraron traducciones para el idioma: ${idiomaActual}`);
    return;
  }

  // Limpiar SplitTypes antes de cambiar el contenido
  document.querySelectorAll('[data-i18n]').forEach((elem) => {
    if (elem._splitType) {
      elem._splitType.revert();
      elem._splitType = null;
    }
  });

  // Ahora aplicar las traducciones
  document.querySelectorAll('[data-i18n]').forEach((elem) => {
    const clave = elem.getAttribute('data-i18n');

    if (clave === 'cambiar_idioma') {
      return;
    }

    if (traducciones[idiomaActual][clave]) {
      elem.innerHTML = traducciones[idiomaActual][clave];
    } else {
      console.warn(`No se encontró traducción para: ${clave} en idioma ${idiomaActual}`);
    }
  });
}

// Función principal para reiniciar todas las animaciones
function reiniciarTodasLasAnimaciones() {
  // Reiniciar animaciones de .nombre
  if (window.setup) {
    window.setup();
  }

  // Reiniciar animaciones de .revelartext
  setTimeout(() => {
    reiniciarRevealtextAnimaciones();
  }, 50);
}

// Función para reiniciar las animaciones de revealtext
function reiniciarRevealtextAnimaciones() {
  const splitTypes = document.querySelectorAll('.revelartext');

  splitTypes.forEach((char, i) => {
    const bg = char.dataset.bgColor || '#353535';
    const fg = '#a89c89';
    const spanColor = '#ec7c26';

    // El contenido ya fue actualizado en traducirPaginaOptimizada
    const text = new SplitType(char, { types: 'words, chars' });

    // Guardar referencia para poder revertir después
    char._splitType = text;

    // Separa los caracteres
    const spanChars = text.chars.filter((c) => c.closest('span'));
    const normalChars = text.chars.filter((c) => !c.closest('span'));

    gsap.set(text.chars, { color: bg });

    gsap.fromTo(
      normalChars,
      { color: bg },
      {
        color: fg,
        duration: 0.3,
        stagger: 0.02,
        scrollTrigger: {
          trigger: char,
          start: 'top 85%',
          end: 'top 40%',
          scrub: true,
          toggleActions: 'play play reverse reverse',
          markers: false,
        },
      }
    );

    gsap.fromTo(
      spanChars,
      { color: bg },
      {
        color: spanColor,
        duration: 0.3,
        stagger: 0.02,
        scrollTrigger: {
          trigger: char,
          start: 'top 85%',
          end: 'top 40%',
          scrub: true,
          toggleActions: 'play play reverse reverse',
          markers: false,
        },
      }
    );
  });
}

// Función original para la carga inicial
function traducirPagina() {
  if (typeof traducciones === 'undefined') {
    console.error(
      'El objeto traducciones no está definido. Verifica que lang.js se haya cargado correctamente.'
    );
    return;
  }

  if (!traducciones[idiomaActual]) {
    console.error(`No se encontraron traducciones para el idioma: ${idiomaActual}`);
    return;
  }

  document.querySelectorAll('[data-i18n]').forEach((elem) => {
    const clave = elem.getAttribute('data-i18n');

    if (clave === 'cambiar_idioma') {
      return;
    }

    if (traducciones[idiomaActual][clave]) {
      elem.innerHTML = traducciones[idiomaActual][clave];
    } else {
      console.warn(`No se encontró traducción para: ${clave} en idioma ${idiomaActual}`);
    }
  });
}

// Función para limpiar SplitType de todos los elementos con animaciones
// eslint-disable-next-line no-unused-vars
function limpiarSplitTypes() {
  document.querySelectorAll('.revelartext').forEach((elem) => {
    if (elem._splitType) {
      elem._splitType.revert();
      elem._splitType = null;
    }
  });

  document.querySelectorAll('.nombre').forEach((elem) => {
    if (elem._splitType) {
      elem._splitType.revert();
      elem._splitType = null;
    }
  });
}

// Inicializar traducciones al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    if (typeof traducciones !== 'undefined') {
      traducirPagina();
    } else {
      console.error('Las traducciones no están disponibles al cargar la página');
    }
  }, 100);
});

document.getElementById('btnAutomotora').addEventListener('click', function (e) {
  e.preventDefault();

  if (isAnimating) {
    return;
  }

  const alerta = document.getElementById('alertaAutomotora');

  if (alerta.classList.contains('show')) {
    return;
  }

  if (alertTimeout) {
    clearTimeout(alertTimeout);
    alertTimeout = null;
  }
  isAnimating = true;

  alerta.classList.remove('d-none');

  alerta.classList.remove('hiding', 'show');

  alerta.offsetHeight;

  alerta.classList.add('show');

  setTimeout(() => {
    isAnimating = false;
  }, 500);

  alertTimeout = setTimeout(() => {
    cerrarAlerta();
  }, 5000);
});

function cerrarAlerta() {
  if (isAnimating) {
    return;
  }

  const alerta = document.getElementById('alertaAutomotora');

  if (!alerta.classList.contains('show')) {
    return;
  }

  if (alertTimeout) {
    clearTimeout(alertTimeout);
    alertTimeout = null;
  }

  isAnimating = true;

  alerta.classList.add('hiding');
  alerta.classList.remove('show');

  setTimeout(() => {
    alerta.classList.remove('hiding', 'show');
    alerta.classList.add('d-none');
    isAnimating = false;
  }, 500);
}

// cierra con el boton
document.addEventListener('DOMContentLoaded', function () {
  const closeButton = document.querySelector('#alertaAutomotora .close');
  if (closeButton) {
    closeButton.addEventListener('click', function (e) {
      e.preventDefault();
      cerrarAlerta();
    });
  }
});

// cierra apretando afuera
document.addEventListener('click', function (e) {
  const alerta = document.getElementById('alertaAutomotora');
  const btnAutomotora = document.getElementById('btnAutomotora');

  if (
    alerta &&
    alerta.classList.contains('show') &&
    !alerta.contains(e.target) &&
    !btnAutomotora.contains(e.target)
  ) {
    cerrarAlerta();
  }
});
