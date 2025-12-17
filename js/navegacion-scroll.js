// Archivo para manejar la navegación suave y el scroll
import Lenis from 'lenis';

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
export function configurarNavegacionSuave() {
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

export function navegarHaciaSeccion(selector) {
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

export function abrirEnlaceExterno(elemento) {
  const url = elemento.getAttribute('data-url');
  if (url) {
    window.open(url, '_blank');
  }
}

// Función para compatibilidad con onclick del HTML
export function direciones(elemento) {
  abrirEnlaceExterno(elemento);
}

// Inicializar scroll suave
requestAnimationFrame(bucleAnimacionScroll);

// Exponer funciones globalmente para compatibilidad con HTML
window.abrirEnlaceExterno = abrirEnlaceExterno;
window.configurarNavegacionSuave = configurarNavegacionSuave;
window.direciones = direciones;
