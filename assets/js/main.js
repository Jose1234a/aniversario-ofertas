/**
* Template Name: BizLand
* Template URL: https://bootstrapmade.com/bizland-bootstrap-business-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()




/***MODAL INCIO */
var modalClosed = false; // Variable global para controlar si el modal ha sido cerrado manualmente

function fadeInModal(element) {
  var opacity = 0;
  element.style.opacity = opacity;
  element.style.display = 'block';

  function fade() {
    opacity += 0.05;
    element.style.opacity = opacity;
    if (opacity < 1) {
      requestAnimationFrame(fade);
    }
  }

  fade();
}

function closeModal() {
  var modal = document.getElementById("modal2");
  modal.style.opacity = 1;
  var opacity = 1;

  function fade() {
    opacity -= 0.1;
    modal.style.opacity = opacity;
    if (opacity <= 0) {
      modal.style.display = 'none';
      modalClosed = true; // Establece el estado de modalClosed como true cuando el modal se cierra manualmente
    } else {
      requestAnimationFrame(fade);
    }
  }

  fade();
}

document.addEventListener("DOMContentLoaded", function() {
  var modal = document.getElementById("modal2");
  var closeButton = document.getElementById("close");

  // Mostrar el modal después de 2 segundos solo si modalClosed es false
  if (!modalClosed) {
    setTimeout(function() {
      fadeInModal(modal);
    }, 2000);
  }

  closeButton.onclick = closeModal;

  window.onclick = function(event) {
    if (event.target == modal) {
      closeModal();
    }
  };

  // Configurar el temporizador para volver a mostrar el modal después de 2 minutos solo si modalClosed es false
  if (!modalClosed) {
    setTimeout(function() {
      fadeInModal(modal);
    }, 120000); // 2 minutos en milisegundos
  }
});



//pregutnas frecuentes//

$(document).ready(function(){
  var index = 4; // Empezamos con el cuarto acordeón, ya que tenemos 3 inicialmente
  var maxIndex = 8; // Límite de acordeones

  $(document).on('click', '.accordion-item:last-child .accordion-button', function() {
    if (index <= maxIndex) {
      $('#accordionExample').append('<div class="accordion-item"><h2 class="accordion-header" id="heading' + index + '"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse' + index + '" aria-expanded="false" aria-controls="collapse' + index + '">Accordion Item #' + index + '</button></h2><div id="collapse' + index + '" class="accordion-collapse collapse" aria-labelledby="heading' + index + '" data-bs-parent="#accordionExample"><div class="accordion-body"><strong>This is the ' + index + ' item\'s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It\'s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.</div></div></div>');
      index++;
    }
  });

  $('.accordion-item .accordion-button').each(function(i) {
    var collapseId = 'collapse' + (i + 1);
    $(this).attr('data-bs-target', '#' + collapseId);
    $(this).parent().next('.accordion-collapse').attr('id', collapseId);
  });
});







//VISTA CUADRICULA Y LISTA//
// Función para cambiar al modo lista
        function verLista() {
            const container = document.querySelector('#custom-container');
            container.classList.add('lista');
        }

        // Función para cambiar al modo cuadrícula
        function verCuadricula() {
            const container = document.querySelector('#custom-container');
            container.classList.remove('lista');
        }

        // Función para verificar el ancho de la pantalla y establecer el modo cuadrícula si es necesario
        function verificarAnchoPantalla() {
            const anchoPantalla = window.innerWidth;
            const container = document.querySelector('#custom-container');

            // Establece el modo cuadrícula si la pantalla es más estrecha que un umbral (por ejemplo, 768px)
            if (anchoPantalla <= 768) {
                container.classList.remove('lista');
            }
        }

        // Agregar evento de redimensionamiento de la ventana
        window.addEventListener('resize', verificarAnchoPantalla);

        // Inicializar el modo cuadrícula al cargar la página
        verificarAnchoPantalla();