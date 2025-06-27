//Inicializa todos los sistemas de la aplicación
function inicializarAplicacion() {
  console.log('Iniciando aplicación...');

  const modulosNecesarios = [
    'configurarAnimacionesNombre',
    'configurarNavegacionSuave',
    'inicializarTraducciones',
    'configurarEventosUI',
  ];

  const modulosFaltantes = modulosNecesarios.filter((modulo) => !window[modulo]);

  if (modulosFaltantes.length > 0) {
    console.error('Módulos faltantes:', modulosFaltantes);
    return;
  }

  console.log('Todos los módulos cargados correctamente');
}

//Reinicia toda la aplicación para cambio de idioma
function reiniciarAplicacionCompleta() {
  console.log('Reiniciando aplicación completa...');

  // Reiniciar animaciones
  if (window.reiniciarTodasLasAnimacionesTexto) {
    window.reiniciarTodasLasAnimacionesTexto();
  }

  // Reconfigurar navegación
  if (window.configurarNavegacionSuave) {
    window.configurarNavegacionSuave();
  }

  // Reconfigurar UI
  if (window.configurarEventosUI) {
    window.configurarEventosUI();
  }
}

//Limpia todos los recursos de la aplicación
function limpiarRecursosAplicacion() {
  console.log('Limpiando recursos...');

  // Limpiar animaciones
  if (window.limpiarTodosSplitTypes) {
    window.limpiarTodosSplitTypes();
  }

  // Limpiar ScrollTriggers
  if (window.ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    inicializarAplicacion();
  }, 50);
});

// Exponer funciones globalmente para compatibilidad
window.inicializarAplicacion = inicializarAplicacion;
window.reiniciarAplicacionCompleta = reiniciarAplicacionCompleta;
window.limpiarRecursosAplicacion = limpiarRecursosAplicacion;

// Mantener funciones legacy para compatibilidad
window.direciones =
  window.abrirEnlaceExterno ||
  function (element) {
    const url = element.getAttribute('data-url');
    if (url) {
      window.open(url, '_blank');
    }
  };

window.addEventListener('resize', () => {
  setTimeout(() => {
    configurarAnimacionesNombre();
  }, 100);

  setTimeout(() => {
    actualizarAnimacionExperiencia();
  }, 100);
});

window.cambiarLenguaje = window.cambiarIdioma;
window.reiniciarAnimaciones = window.reiniciarAnimacionesNombre;
window.setup = window.configurarAnimacionesNombre;
window.reiniciarTodasLasAnimaciones = window.reiniciarTodasLasAnimacionesTexto;
