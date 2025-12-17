//Inicializa todos los sistemas de la aplicación
import { inicializarTraducciones, cambiarIdioma } from './sistema-traducciones.js';
import { configurarNavegacionSuave } from './navegacion-scroll.js';
import { configurarEventosUI } from './componentes-ui.js';
import {
  configurarAnimacionesNombre,
  reiniciarTodasLasAnimacionesTexto,
  actualizarAnimacionExperiencia,
  limpiarTodosSplitTypes,
  inicializarAnimacionesRevealText,
} from './animaciones-texto.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { inicializarBarraProgreso } from './scroll-progress.js';
import AOS from 'aos';
import 'aos/dist/aos.css';

function inicializarAplicacion() {
  console.log('Iniciando aplicación...');

  // Configurar traducciones
  inicializarTraducciones();

  // Actualizar animación de experiencia después de las traducciones
  setTimeout(() => {
    actualizarAnimacionExperiencia();
  }, 100);

  // Configurar navegación
  configurarNavegacionSuave();

  // Configurar UI
  configurarEventosUI();

  // Inicializar AOS
  AOS.init({
    duration: 1500,
    easing: 'ease-in-out',
    once: true,
  });

  // Configurar experiencia desplegable
  configurarExperienciaDesplegable();

  // Configurar barra de progreso lateral
  inicializarBarraProgreso();

  // Configurar animaciones
  setTimeout(() => {
    configurarAnimacionesNombre();
  }, 200);

  setTimeout(() => {
    inicializarAnimacionesRevealText();
  }, 400);

  console.log('Todos los módulos cargados correctamente');
}

// Manejo de descripciones desplegables en experiencia
function configurarExperienciaDesplegable() {
  const experienciaItems = document.querySelectorAll('.experiencia-item');

  experienciaItems.forEach((item) => {
    item.addEventListener('click', function () {
      // Encuentra la descripción siguiente
      const descripcion = item.nextElementSibling;

      // Verifica que sea una descripción
      if (descripcion && descripcion.classList.contains('experiencia-descripcion')) {
        const estaActiva = descripcion.classList.contains('activa');

        // Cierra todas las descripciones abiertas
        document.querySelectorAll('.experiencia-descripcion.activa').forEach((desc) => {
          desc.classList.remove('activa');
        });
        document.querySelectorAll('.experiencia-item.activo').forEach((itemActivo) => {
          itemActivo.classList.remove('activo');
        });

        // Si no estaba activa, la activa
        if (!estaActiva) {
          descripcion.classList.add('activa');
          item.classList.add('activo');
        }
      }
    });
  });
}

//Reinicia toda la aplicación para cambio de idioma
export function reiniciarAplicacionCompleta() {
  console.log('Reiniciando aplicación completa...');

  // Reiniciar animaciones
  if (window.reiniciarTodasLasAnimacionesTexto) {
    window.reiniciarTodasLasAnimacionesTexto();
  }

  // Reconfigurar navegación
  configurarNavegacionSuave();

  // Reconfigurar UI
  configurarEventosUI();
}

//Limpia todos los recursos de la aplicación
function limpiarRecursosAplicacion() {
  console.log('Limpiando recursos...');

  // Limpiar animaciones
  if (window.limpiarTodosSplitTypes) {
    window.limpiarTodosSplitTypes();
  }

  // Limpiar ScrollTriggers
  if (ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}

// Exponer funciones globalmente para compatibilidad con HTML
window.cambiarIdioma = cambiarIdioma;
// Alias para compatibilidad con HTML (cambiarLenguaje)
window.cambiarLenguaje = cambiarIdioma;
window.reiniciarAplicacionCompleta = reiniciarAplicacionCompleta;
window.configurarAnimacionesNombre = configurarAnimacionesNombre;
window.actualizarAnimacionExperiencia = actualizarAnimacionExperiencia;
window.reiniciarTodasLasAnimacionesTexto = reiniciarTodasLasAnimacionesTexto;
window.limpiarTodosSplitTypes = limpiarTodosSplitTypes;
window.inicializarAnimacionesRevealText = inicializarAnimacionesRevealText;

// Las funciones globales ya están expuestas desde navegacion-scroll.js

window.addEventListener('resize', () => {
  setTimeout(() => {
    configurarAnimacionesNombre();
  }, 100);

  setTimeout(() => {
    actualizarAnimacionExperiencia();
  }, 100);
});


// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    inicializarAplicacion();
  }, 50);
});
