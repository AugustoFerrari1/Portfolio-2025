gsap.registerPlugin(ScrollTrigger);

let splits = [];
let animations = [];

function setup() {
  // Revertir splits y animaciones anteriores
  splits.forEach((split) => {
    if (split && split.revert) {
      split.revert();
    }
  });

  animations.forEach((anim) => {
    if (anim && anim.kill) {
      anim.kill();
    }
  });

  splits = [];
  animations = [];

  const elements = document.querySelectorAll('.nombre');

  elements.forEach((elem, index) => {
    // Limpiar cualquier SplitType previo
    if (elem._splitType) {
      elem._splitType.revert();
      elem._splitType = null;
    }

    const split = new SplitType(elem, { types: 'words, chars' });
    splits.push(split);

    // Guardar referencia en elem elemento para poder limpiarla después
    elem._splitType = split;

    const animation = gsap.from(split.chars, {
      y: 60,
      opacity: 0,
      stagger: 0.04,
      ease: 'power4.out',
      duration: 0.7,
      scrollTrigger: {
        trigger: elem,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
        markers: false,
      },
    });

    animations.push(animation);
  });
}

function reiniciarAnimaciones() {
  // Revertir splits y animaciones anteriores
  if (window.splits) {
    window.splits.forEach((split) => {
      if (split && split.revert) {
        split.revert();
      }
    });
    window.splits = [];
  }

  if (window.animations) {
    window.animations.forEach((anim) => {
      if (anim && anim.kill) {
        anim.kill();
      }
    });
    window.animations = [];
  }

  // Limpiar todos los ScrollTriggers de .nombre
  ScrollTrigger.getAll().forEach((trigger) => {
    if (
      trigger.trigger &&
      trigger.trigger.classList &&
      trigger.trigger.classList.contains('nombre')
    ) {
      trigger.kill();
    }
  });

  // Ejecutar setup otra vez
  setTimeout(() => {
    setup();
  }, 100);
}

// Exponer globalmente
window.setup = setup;
window.reiniciarAnimaciones = reiniciarAnimaciones;
window.splits = splits;
window.animations = animations;

// Setup inicial
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    setup();
  }, 200);
});

// Reaplicar SplitType en resize
window.addEventListener('resize', () => {
  setTimeout(() => {
    setup();
  }, 100);
});

// Solo se ejecuta al cargar pagina
function inicializarRevealtextAnimaciones() {
  const splitTypes = document.querySelectorAll('.revelartext');

  splitTypes.forEach((char, i) => {
    const bg = char.dataset.bgColor || '#353535';
    const fg = '#a89c89';
    const spanColor = '#ec7c26';

    const text = new SplitType(char, { types: 'words, chars' });

    // Guardar referencia para poder revertir después
    char._splitType = text;

    // Separa los caracteres
    const spanChars = text.chars.filter((c) => c.closest('span'));
    const normalChars = text.chars.filter((c) => !c.closest('span'));

    // Aplica color
    gsap.set(text.chars, { color: bg });

    // Animación para texto general
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

    // Animación para los <span>
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

// Inicia al cargar página
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    inicializarRevealtextAnimaciones();
  }, 400); // Dar tiempo para que se carguen las traducciones y se ejecute setup
});

const lenis = new Lenis({
  duration: 1.2,
  smooth: true,
  direction: 'vertical',
  gestureDirection: 'vertical',
  smoothTouch: false,
  touchMultiplier: 1.5,
  wheelMultiplier: 1.0,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.addEventListener('DOMContentLoaded', function () {
  const scrollLinks = {
    sobremibtn: '#sobremi',
    atributosbtn: '#atributos',
    trabajosbtn: '#trabajos',
    contactobtn: '#contacto',
  };

  Object.keys(scrollLinks).forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', function () {
        const target = document.querySelector(scrollLinks[id]);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });
});

window.reiniciarTodasLasAnimaciones = function () {
  console.log('Reiniciando TODAS las animaciones...');

  // Limpiar todos los ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Reiniciar animaciones de los nombres (.nombre)
  setTimeout(() => {
    if (window.setup) {
      window.setup();
    }
  }, 50);
};
