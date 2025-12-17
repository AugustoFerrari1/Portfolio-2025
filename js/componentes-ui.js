let temporizadorAlerta = null;
let estaAnimando = false;

export function configurarAtributosAOS() {
  document.querySelectorAll('.progress').forEach((el) => {
    el.setAttribute('data-aos', 'fade-left');
  });

  document.querySelectorAll('.atributos .tipo').forEach((el) => {
    el.setAttribute('data-aos', 'fade-up');
  });
}

// Muestra la alerta de la automotora
export function mostrarAlertaAutomotora() {
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

// Muestra la alerta de AlquilerUY
export function mostrarAlertaAlquilerUY() {
  if (estaAnimando) {
    return;
  }

  const alerta = document.getElementById('alertaAlquilerUY');

  if (alerta && alerta.classList.contains('show')) {
    return;
  }

  if (temporizadorAlerta) {
    clearTimeout(temporizadorAlerta);
    temporizadorAlerta = null;
  }

  estaAnimando = true;

  if (alerta) {
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
      cerrarAlertaAlquilerUY();
    }, 5000);
  }
}

export function cerrarAlertaAutomotora() {
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

export function cerrarAlertaAlquilerUY() {
  if (estaAnimando) {
    return;
  }

  const alerta = document.getElementById('alertaAlquilerUY');

  if (!alerta || !alerta.classList.contains('show')) {
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

function configurarBotonAlquilerUY() {
  const botonAlquilerUY = document.getElementById('btnAlquilerUY');
  if (botonAlquilerUY) {
    botonAlquilerUY.addEventListener('click', function (e) {
      e.preventDefault();
      mostrarAlertaAlquilerUY();
    });
  }
}

function configurarBotonCerrarAlerta() {
  const botonCerrar = document.querySelector('#alertaAutomotora .btn-close');
  if (botonCerrar) {
    botonCerrar.addEventListener('click', function (e) {
      e.preventDefault();
      cerrarAlertaAutomotora();
    });
  }

  const botonCerrarAlquilerUY = document.querySelector('#alertaAlquilerUY .btn-close');
  if (botonCerrarAlquilerUY) {
    botonCerrarAlquilerUY.addEventListener('click', function (e) {
      e.preventDefault();
      cerrarAlertaAlquilerUY();
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

    const alertaAlquilerUY = document.getElementById('alertaAlquilerUY');
    const botonAlquilerUY = document.getElementById('btnAlquilerUY');

    if (
      alertaAlquilerUY &&
      alertaAlquilerUY.classList.contains('show') &&
      !alertaAlquilerUY.contains(e.target) &&
      botonAlquilerUY &&
      !botonAlquilerUY.contains(e.target)
    ) {
      cerrarAlertaAlquilerUY();
    }
  });
}

export function mostrarModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.classList.add('show');
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
  }
}

export function ocultarModal(idModal) {
  const modal = document.getElementById(idModal);
  if (modal) {
    modal.classList.remove('show');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
}

export function configurarEventosUI() {
  configurarAtributosAOS();
  configurarBotonAutomotora();
  configurarBotonAlquilerUY();
  configurarBotonCerrarAlerta();
  configurarCierreFueraAlerta();
}

// Exponer funciones globalmente para compatibilidad con HTML
window.mostrarAlertaAutomotora = mostrarAlertaAutomotora;
window.cerrarAlertaAutomotora = cerrarAlertaAutomotora;
window.mostrarAlertaAlquilerUY = mostrarAlertaAlquilerUY;
window.cerrarAlertaAlquilerUY = cerrarAlertaAlquilerUY;
