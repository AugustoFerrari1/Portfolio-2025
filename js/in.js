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

  // Limpiar TODAS las animaciones ScrollTrigger primero
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  traducirPagina();

  setTimeout(() => {
    reiniciarTodasLasAnimaciones();
  }, 250);
}

// Función principal para reiniciar todas las animaciones
function reiniciarTodasLasAnimaciones() {
  console.log('Reiniciando todas las animaciones...');

  if (window.setup) {
    window.setup();
  }

  setTimeout(() => {
    reiniciarRevealtextAnimaciones();
  }, 100);
}

// Función para reiniciar las animaciones de revealtext
function reiniciarRevealtextAnimaciones() {
  // Volver a ejecutar las animaciones de revealtext
  const splitTypes = document.querySelectorAll('.revelartext');

  splitTypes.forEach((char, i) => {
    const clave = char.getAttribute('data-i18n');
    if (clave && traducciones[idiomaActual] && traducciones[idiomaActual][clave]) {
      char.innerHTML = traducciones[idiomaActual][clave];
    }

    const bg = char.dataset.bgColor || '#353535';
    const fg = '#a89c89';
    const spanColor = '#ec7c26';

    // Revertir cualquier SplitType previo en este elemento
    if (char._splitType) {
      char._splitType.revert();
    }

    const text = new SplitType(char, { types: 'words, chars' });

    // Guardar referencia para poder revertir después
    char._splitType = text;

    // Separa los caracteres según si están dentro de un <span> o no
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

  console.log(`Traduciendo a idioma: ${idiomaActual}`);

  document.querySelectorAll('[data-i18n]').forEach((elem) => {
    const clave = elem.getAttribute('data-i18n');

    if (clave === 'cambiar_idioma') {
      return;
    }

    if (traducciones[idiomaActual][clave]) {
      console.log(`Traduciendo ${clave}: ${traducciones[idiomaActual][clave]}`);

      if (elem._splitType) {
        elem._splitType.revert();
      }

      if (elem.classList.contains('nombre') && elem._splitType) {
        elem._splitType.revert();
        elem._splitType = null;
      }

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
