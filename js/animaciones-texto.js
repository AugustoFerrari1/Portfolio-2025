// Archivo para manejar animaciones de texto con SplitType
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

let divisoresTexto = [];
let animacionesTexto = [];

// Configura las animaciones para elementos con clase .nombre
export function configurarAnimacionesNombre() {
  // Revertir splits y animaciones anteriores
  divisoresTexto.forEach((split) => {
    if (split && split.revert) {
      split.revert();
    }
  });

  animacionesTexto.forEach((anim) => {
    if (anim && anim.kill) {
      anim.kill();
    }
  });

  divisoresTexto = [];
  animacionesTexto = [];

  const elementos = document.querySelectorAll('.nombre');

  elementos.forEach((elem, index) => {
    // Limpiar cualquier SplitType previo
    if (elem._splitType) {
      elem._splitType.revert();
      elem._splitType = null;
    }

    const split = new SplitType(elem, { types: 'words, chars' });
    divisoresTexto.push(split);

    // Guardar referencia en el elemento para poder limpiarla después
    elem._splitType = split;

    const animacion = gsap.from(split.chars, {
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

    animacionesTexto.push(animacion);
  });
}

// Reinicia todas las animaciones de los elementos .nombre
export function reiniciarAnimacionesNombre() {
  // Revertir splits y animaciones anteriores
  divisoresTexto.forEach((split) => {
    if (split && split.revert) {
      split.revert();
    }
  });
  divisoresTexto = [];

  animacionesTexto.forEach((anim) => {
    if (anim && anim.kill) {
      anim.kill();
    }
  });
  animacionesTexto = [];

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

  // Ejecutar configuración otra vez
  setTimeout(() => {
    configurarAnimacionesNombre();
  }, 100);
}

// Inicializa las animaciones de texto revelado (.revelartext)
export function inicializarAnimacionesRevealText() {
  const elementosRevealText = document.querySelectorAll('.revelartext');

  elementosRevealText.forEach((elemento, i) => {
    const colorFondo = elemento.dataset.bgColor || '#353535';
    const colorTexto = '#a89c89';
    const colorSpan = '#ec7c26';

    const textoSeparado = new SplitType(elemento, { types: 'words, chars' });

    // Guardar referencia para poder revertir después
    elemento._splitType = textoSeparado;

    // Separar los caracteres que están dentro de span
    const caracteresSpan = textoSeparado.chars.filter((c) => c.closest('span'));
    const caracteresNormales = textoSeparado.chars.filter((c) => !c.closest('span'));

    // Aplicar color inicial
    gsap.set(textoSeparado.chars, { color: colorFondo });

    // Animación para texto general
    gsap.fromTo(
      caracteresNormales,
      { color: colorFondo },
      {
        color: colorTexto,
        duration: 0.8,
        stagger: 0.05,
        scrollTrigger: {
          trigger: elemento,
          start: 'top 85%',
          end: 'top 10%',
          scrub: true,
          toggleActions: 'play play reverse reverse',
          markers: false,
        },
      }
    );

    // Animación para los elementos <span>
    gsap.fromTo(
      caracteresSpan,
      { color: colorFondo },
      {
        color: colorSpan,
        duration: 0.8,
        stagger: 0.05,
        scrollTrigger: {
          trigger: elemento,
          start: 'top 85%',
          end: 'top 10%',
          scrub: true,
          toggleActions: 'play play reverse reverse',
          markers: false,
        },
      }
    );
  });
}

// Reinicia las animaciones de reveal text
export function reiniciarAnimacionesRevealText() {
  const elementosRevealText = document.querySelectorAll('.revelartext');

  elementosRevealText.forEach((elemento, i) => {
    const colorFondo = elemento.dataset.bgColor || '#353535';
    const colorTexto = '#a89c89';
    const colorSpan = '#ec7c26';

    // El contenido ya fue actualizado en traducirPaginaOptimizada
    const textoSeparado = new SplitType(elemento, { types: 'words, chars' });

    // Guardar referencia para poder revertir después
    elemento._splitType = textoSeparado;

    // Separar los caracteres
    const caracteresSpan = textoSeparado.chars.filter((c) => c.closest('span'));
    const caracteresNormales = textoSeparado.chars.filter((c) => !c.closest('span'));

    gsap.set(textoSeparado.chars, { color: colorFondo });

    gsap.fromTo(
      caracteresNormales,
      { color: colorFondo },
      {
        color: colorTexto,
        duration: 0.8,
        stagger: 0.05,
        scrollTrigger: {
          trigger: elemento,
          start: 'top 85%',
          end: 'top 10%',
          scrub: true,
          toggleActions: 'play play reverse reverse',
          markers: false,
        },
      }
    );

    gsap.fromTo(
      caracteresSpan,
      { color: colorFondo },
      {
        color: colorSpan,
        duration: 0.8,
        stagger: 0.05,
        scrollTrigger: {
          trigger: elemento,
          start: 'top 85%',
          end: 'top 10%',
          scrub: true,
          toggleActions: 'play play reverse reverse',
          markers: false,
        },
      }
    );
  });
}

// Adapta largo de animacion expriencia
export function actualizarAnimacionExperiencia() {
  const experienceItems = document.querySelectorAll('.experiencia-item');

  experienceItems.forEach((item) => {
    const tempElement = document.createElement('div');
    tempElement.style.position = 'absolute';
    tempElement.style.visibility = 'hidden';
    tempElement.style.whiteSpace = 'nowrap';
    tempElement.style.fontSize = getComputedStyle(item).fontSize;
    tempElement.style.fontFamily = getComputedStyle(item).fontFamily;
    tempElement.style.fontWeight = getComputedStyle(item).fontWeight;
    tempElement.innerHTML = item.innerHTML;

    document.body.appendChild(tempElement);
    const textWidth = tempElement.offsetWidth;
    document.body.removeChild(tempElement);
    item.style.setProperty('--text-width', `${textWidth}px`);
  });
}

// Limpia todos los SplitTypes aplicados a elementos con animaciones
export function limpiarTodosSplitTypes() {
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

// Reinicia todas las animaciones de texto
export function reiniciarTodasLasAnimacionesTexto() {
  // Limpiar todos los ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Reiniciar animaciones de los nombres (.nombre)
  setTimeout(() => {
    configurarAnimacionesNombre();
  }, 50);

  // Reiniciar animaciones de .revelartext
  setTimeout(() => {
    reiniciarAnimacionesRevealText();
  }, 100);
}
