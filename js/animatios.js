gsap.registerPlugin(ScrollTrigger);

let splits = [];
let animations = [];

function setup() {
  // Revertir splits y animaciones anteriores
  splits.forEach(split => split.revert());
  animations.forEach(anim => anim.revert());

  splits = [];
  animations = [];

  const elements = document.querySelectorAll(".nombre");

  elements.forEach(el => {
    const split = new SplitType(el, { types: "words, chars" });
    splits.push(split);

    const animation = gsap.from(split.chars, {
      y: 60,
      opacity: 0,
      stagger: 0.04,
      ease: "power4.out",
      duration: 0.7,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });

    animations.push(animation);
  });
}

function reiniciarAnimaciones() {
  // Revertir splits y animaciones anteriores
  if (window.splits) {
    window.splits.forEach(split => split.revert());
    window.splits = [];
  }

  if (window.animations) {
    window.animations.forEach(anim => anim.revert());
    window.animations = [];
  }

  // Limpiar ScrollTrigger
  if (ScrollTrigger) {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  // Ejecutar setup otra vez
  setup();
}

// Exponer globalmente
window.setup = setup;
window.reiniciarAnimaciones = reiniciarAnimaciones;

// Setup inicial
setup();


// Reaplicar SplitType en resize
window.addEventListener("resize", setup);

const splitTypes = document.querySelectorAll('.revelartext')

splitTypes.forEach((char, i) => {
    const bg = char.dataset.bgColor || "#353535"
    const fg = "#a89c89"         // color para texto general
    const spanColor = "#ec7c26"  // color para los <span>

    const text = new SplitType(char, { types: 'words, chars' })


    // Separa los caracteres según si están dentro de un <span> o no
    const spanChars = text.chars.filter(c => c.closest('span'))
    const normalChars = text.chars.filter(c => !c.closest('span'))

    // Aplica color inicial a todos (el del fondo)
    gsap.set(text.chars, { color: bg })

    // Animación para texto general
    gsap.fromTo(normalChars, 
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
                markers: false
            }
        }
    )

    // Animación para los <span>
    gsap.fromTo(spanChars, 
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
                markers: false
            }
        }
    )
})


const lenis = new Lenis({
  duration: 1.2,      // controla la velocidad del scroll (ajustalo según tu preferencia)
  smooth: true,
  direction: 'vertical',
  gestureDirection: 'vertical',
  smoothTouch: false, // true en móviles si querés suavidad también ahí
  touchMultiplier: 1.5,
  wheelMultiplier: 1.0,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.addEventListener("DOMContentLoaded", function () {
  const scrollLinks = {
    sobremibtn: "#sobremi",
    atributosbtn: "#atributos",
    trabajosbtn: "#trabajos",
    contactobtn: "#contacto"
  };

  Object.keys(scrollLinks).forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", function () {
        const target = document.querySelector(scrollLinks[id]);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  });
});
