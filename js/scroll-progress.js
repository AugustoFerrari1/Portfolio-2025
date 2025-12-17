// Barra de progreso lateral con indicadores de sección
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Puntos específicos donde se activan los marcadores
const triggerPoints = [
  { id: 'inicio', selector: 'section.inicio h1' },
  { id: 'sobremi', selector: '#sobremi .nombre' },
  { id: 'experiencia', selector: '#espacio' },
  { id: 'atributos', selector: '#atributos .nombre' },
  { id: 'trabajos', selector: '#trabajos .nombre' },
];

let progressFill = null;
let markers = [];

export function inicializarBarraProgreso() {
  progressFill = document.getElementById('progressFill');
  if (!progressFill) return;

  // Obtener todos los marcadores
  markers = Array.from(document.querySelectorAll('.marker'));

  // Configurar ScrollTrigger para actualizar el progreso
  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const progress = self.progress;
      actualizarProgreso(progress);
      actualizarMarcadores();
    },
  });

  // Configurar marcadores para puntos específicos
  triggerPoints.forEach((point) => {
    const element = document.querySelector(point.selector);
    if (!element) return;

    ScrollTrigger.create({
      trigger: element,
      start: 'top 70%',
      onEnter: () => {
        activarMarcador(point.id);
      },
      onEnterBack: () => {
        activarMarcador(point.id);
      },
      onLeave: () => {
        // Mantener activo si ya pasamos
      },
      onLeaveBack: () => {
        // Desactivar si volvemos atrás
        desactivarMarcador(point.id);
      },
    });
  });

  // Detectar cuando llegamos a contacto (último marcador "FIN")
  const contactoElement = document.querySelector('#contacto');
  if (contactoElement) {
    ScrollTrigger.create({
      trigger: contactoElement,
      start: 'top 70%',
      onEnter: () => {
        activarMarcador('end');
      },
      onEnterBack: () => {
        activarMarcador('end');
      },
      onLeave: () => {
        // Mantener activo si ya pasamos
      },
      onLeaveBack: () => {
        desactivarMarcador('end');
      },
    });
  }
}

function actualizarProgreso(progress) {
  if (progressFill) {
    // Actualizar el porcentaje de llenado desde el inicio (0%)
    progressFill.style.height = `${progress * 100}%`;
  }
}

function actualizarMarcadores() {
  // Los marcadores se actualizan mediante ScrollTrigger, no necesitamos esta función
  // pero la mantenemos por si acaso
}

function activarMarcador(sectionId) {
  const marker = document.querySelector(`.marker[data-section="${sectionId}"]`);
  if (marker && !marker.classList.contains('active')) {
    marker.classList.add('active');
  }
}

function desactivarMarcador(sectionId) {
  const marker = document.querySelector(`.marker[data-section="${sectionId}"]`);
  if (marker) {
    marker.classList.remove('active');
  }
}

export function limpiarBarraProgreso() {
  if (progressFill) {
    progressFill.style.height = '0%';
  }
  markers.forEach((marker) => {
    marker.classList.remove('active');
  });
}

