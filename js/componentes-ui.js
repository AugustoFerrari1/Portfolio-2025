let temporizadorAlerta = null;
let estaAnimando = false;

function configurarAtributosAOS() {
  document.querySelectorAll('.progress').forEach((el) => {
    el.setAttribute('data-aos', 'fade-left');
  });

  document.querySelectorAll('.atributos .tipo').forEach((el) => {
    el.setAttribute('data-aos', 'fade-up');
  });
}

// Muestra la alerta de la automotora
function mostrarAlertaAutomotora() {
  if (estaAnimando) {
    return;
  }

  const alerta = document.getElementById('alertaAutomotora');

  if (alerta.classList.contains('show')) {
    return;
  }

  if (temporizadorAlerta) {
    clearTimeout(temporizadorAlerta);
    temporizadorAlerta = null;
  }

  estaAnimando = true;

  alerta.classList.remove('d-none');
  alerta.classList.remove('hiding', 'show');

  // Forzar reflow
  alerta.offsetHeight;

  alerta.classList.add('show');

  setTimeout(() => {
    estaAnimando = false;
  }, 500);

  // Auto-cerrar después de 5 segundos
  temporizadorAlerta = setTimeout(() => {
    cerrarAlertaAutomotora();
  }, 5000);
}

function cerrarAlertaAutomotora() {
  if (estaAnimando) {
    return;
  }

  const alerta = document.getElementById('alertaAutomotora');

  if (!alerta.classList.contains('show')) {
    return;
  }

  if (temporizadorAlerta) {
    clearTimeout(temporizadorAlerta);
    temporizadorAlerta = null;
  }

  estaAnimando = true;

  alerta.classList.add('hiding');
  alerta.classList.remove('show');

  setTimeout(() => {
    alerta.classList.remove('hiding', 'show');
    alerta.classList.add('d-none');
    estaAnimando = false;
  }, 500);
}

function configurarBotonAutomotora() {
  const botonAutomotora = document.getElementById('btnAutomotora');
  if (botonAutomotora) {
    botonAutomotora.addEventListener('click', function (e) {
      e.preventDefault();
      mostrarAlertaAutomotora();
    });
  }
}

function configurarBotonCerrarAlerta() {
  const botonCerrar = document.querySelector('#alertaAutomotora .close');
  if (botonCerrar) {
    botonCerrar.addEventListener('click', function (e) {
      e.preventDefault();
      cerrarAlertaAutomotora();
    });
  }
}

function configurarCierreFueraAlerta() {
  document.addEventListener('click', function (e) {
    const alerta = document.getElementById('alertaAutomotora');
    const botonAutomotora = document.getElementById('btnAutomotora');

    if (
      alerta &&
      alerta.classList.contains('show') &&
      !alerta.contains(e.target) &&
      !botonAutomotora.contains(e.target)
    ) {
      cerrarAlertaAutomotora();
    }
  });
}

function mostrarModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
  }
}

function ocultarModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
}

function configurarEventosUI() {
  configurarAtributosAOS();
  configurarBotonAutomotora();
  configurarBotonCerrarAlerta();
  configurarCierreFueraAlerta();
}

// Inicializar componentes UI al cargar la página
document.addEventListener('DOMContentLoaded', function () {
  configurarEventosUI();

  AOS.init({
    duration: 1500,
    easing: 'ease-in-out',
    once: true,
  });
});

// Exponer funciones globalmente
window.mostrarAlertaAutomotora = mostrarAlertaAutomotora;
window.cerrarAlertaAutomotora = cerrarAlertaAutomotora;
window.mostrarModal = mostrarModal;
window.ocultarModal = ocultarModal;
window.configurarEventosUI = configurarEventosUI;
