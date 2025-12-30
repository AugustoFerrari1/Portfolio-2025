// Animaciones de texto con SplitType
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

let divisoresTexto = [];
let animacionesTexto = [];

// Anima los textos con clase .nombre
export function configurarAnimacionesNombre() {
  // Limpiar animaciones anteriores primero
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

    // Guardamos la referencia para poder limpiarla después
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

// Reinicia las animaciones de .nombre
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

  // Volver a configurar
  setTimeout(() => {
    configurarAnimacionesNombre();
  }, 100);
}

// Función para dividir palabras dentro de spans
function dividirPalabrasEnSpans(elemento) {
  // Buscar todos los spans que contienen múltiples palabras
  const spans = Array.from(elemento.querySelectorAll('span'));
  
  spans.forEach((span) => {
    if (span.classList.contains('word') || span.classList.contains('char')) {
      return;
    }
    
    const texto = span.textContent.trim();
    const palabras = texto.split(/\s+/).filter(p => p.length > 0);
    
    // Si hay múltiples palabras, dividirlas en spans separados
    if (palabras.length > 1) {
      const claseOriginal = span.className;
      const atributos = {};
      Array.from(span.attributes).forEach((attr) => {
        if (attr.name !== 'class' && attr.name !== 'style') {
          atributos[attr.name] = attr.value;
        }
      });
      
      // Crear fragmento con spans individuales para cada palabra
      const fragmento = document.createDocumentFragment();
      palabras.forEach((palabra, idx) => {
        const nuevoSpan = document.createElement('span');
        if (claseOriginal) {
          nuevoSpan.className = claseOriginal;
        }
        nuevoSpan.textContent = palabra;
        
        // Copiar atributos
        Object.keys(atributos).forEach((key) => {
          nuevoSpan.setAttribute(key, atributos[key]);
        });
        
        fragmento.appendChild(nuevoSpan);
        
        // Agregar espacio después de cada palabra excepto la última
        if (idx < palabras.length - 1) {
          fragmento.appendChild(document.createTextNode(' '));
        }
      });
      
      // Reemplazar el span original con el fragmento
      if (span.parentNode) {
        span.parentNode.replaceChild(fragmento, span);
      }
    }
  });
}

// Anima los textos revelados (.revelartext)
export function inicializarAnimacionesRevealText() {
  const elementosRevealText = document.querySelectorAll('.revelartext');

  elementosRevealText.forEach((elemento, i) => {
    const colorFondo = elemento.dataset.bgColor || '#353535';
    const colorTexto = '#a89c89';
    const colorSpan = '#ec7c26';

    // Primero, dividir palabras dentro de spans para que se ajusten correctamente
    dividirPalabrasEnSpans(elemento);

    // Ahora aplicar SplitType
    const textoSeparado = new SplitType(elemento, { types: 'words, chars' });

    // Guardar referencia para poder revertir después
    elemento._splitType = textoSeparado;

    // Separamos los caracteres que están dentro de span
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
          start: 'top 90%',
          end: 'top -30%',
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
          start: 'top 90%',
          end: 'top -30%',
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

    // Primero, dividir palabras dentro de spans para que se ajusten correctamente
    dividirPalabrasEnSpans(elemento);

    // El contenido ya está traducido
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
          start: 'top 90%',
          end: 'top -30%',
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
          start: 'top 90%',
          end: 'top -30%',
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
    // Crear un elemento temporal para calcular el ancho real del texto
    const tempElement = document.createElement('div');
    tempElement.style.position = 'absolute';
    tempElement.style.visibility = 'hidden';
    tempElement.style.whiteSpace = 'nowrap';
    tempElement.style.height = 'auto';
    tempElement.style.width = 'auto';
    
    // Copiar estilos de texto del elemento original
    const computedStyle = getComputedStyle(item);
    tempElement.style.fontSize = computedStyle.fontSize;
    tempElement.style.fontFamily = computedStyle.fontFamily;
    tempElement.style.fontWeight = computedStyle.fontWeight;
    tempElement.style.fontStyle = computedStyle.fontStyle;
    tempElement.style.letterSpacing = computedStyle.letterSpacing;
    
    // Clonar el contenido, incluyendo el SVG
    const clone = item.cloneNode(true);
    clone.style.padding = '0';
    clone.style.margin = '0';
    clone.style.width = 'auto';
    clone.style.maxWidth = 'none';
    tempElement.appendChild(clone);
    
    document.body.appendChild(tempElement);
    const textWidth = tempElement.offsetWidth;
    document.body.removeChild(tempElement);
    
    item.style.setProperty('--text-width', `${textWidth}px`);
  });
}

// Limpia todos los SplitTypes de las animaciones
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

// Anima las estrellas SVG cuando entran en pantalla
export function inicializarAnimacionesEstrellasSVG() {
  const experienciaItems = document.querySelectorAll('.experiencia-item');
  
  experienciaItems.forEach((item) => {
    // Buscamos el SVG en el primer span
    const firstSpan = item.querySelector('span:first-child');
    if (!firstSpan) return;
    
    const svgContainer = firstSpan.querySelector('.star-svg');
    if (!svgContainer) return;
    
    const path = svgContainer.querySelector('path');
    if (!path) return;
    
    // Asegurar que stroke-dasharray esté configurado
    if (!path.getAttribute('stroke-dasharray')) {
      path.setAttribute('stroke-dasharray', '64');
    }
    
    // Configurar el estado inicial en oculto
    gsap.set(path, {
      strokeDashoffset: 64
    });
    
    // Crear animación al scroll 
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 0.50,
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top 95%',
        end: 'top 2%',
        toggleActions: 'play reverse play reverse',
        markers: false,
      }
    });
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
  
  // Reiniciar animaciones de estrellas SVG
  setTimeout(() => {
    inicializarAnimacionesEstrellasSVG();
  }, 150);
}
