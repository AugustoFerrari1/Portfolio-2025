// Archivo para manejar la navegación suave y el scroll
const lenis = new Lenis({
  duration: 1.2,
  smooth: true,
  direction: 'vertical',
  gestureDirection: 'vertical',
  smoothTouch: false,
  touchMultiplier: 1.5,
  wheelMultiplier: 1.0,
});

// Función para el loop de animación de Lenis
function bucleAnimacionScroll(tiempo) {
  lenis.raf(tiempo);
  requestAnimationFrame(bucleAnimacionScroll);
}

// Configura la navegación suave hacia secciones específicas
function configurarNavegacionSuave() {
  const enlacesNavegacion = {
    sobremibtn: '#sobremi',
    atributosbtn: '#atributos',
    trabajosbtn: '#trabajos',
    contactobtn: '#contacto',
  };

  Object.keys(enlacesNavegacion).forEach((id) => {
    const boton = document.getElementById(id);
    if (boton) {
      boton.addEventListener('click', function () {
        const objetivo = document.querySelector(enlacesNavegacion[id]);
        if (objetivo) {
          objetivo.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });
}

function navegarHaciaSeccion(selector) {
  const elemento = document.querySelector(selector);
  if (elemento) {
    elemento.scrollIntoView({ behavior: 'smooth' });
  }
}

function configurarEventosNavegacion() {
  const eventos = [
    { id: 'sobremibtn', seccion: '#sobremi' },
    { id: 'atributosbtn', seccion: '#atributos' },
    { id: 'trabajosbtn', seccion: '#trabajos' },
    { id: 'contactobtn', seccion: '#contacto' },
  ];

  eventos.forEach(({ id, seccion }) => {
    const elemento = document.getElementById(id);
    if (elemento) {
      elemento.addEventListener('click', function () {
        navegarHaciaSeccion(seccion);
      });
    }
  });
}

function abrirEnlaceExterno(elemento) {
  const url = elemento.getAttribute('data-url');
  if (url) {
    window.open(url, '_blank');
  }
}

// Inicializar scroll suave
requestAnimationFrame(bucleAnimacionScroll);

// Configurar navegación al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  configurarNavegacionSuave();
  configurarEventosNavegacion();
});

// Exponer funciones globalmente
window.navegarHaciaSeccion = navegarHaciaSeccion;
window.abrirEnlaceExterno = abrirEnlaceExterno;
window.configurarNavegacionSuave = configurarNavegacionSuave;
