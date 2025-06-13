let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
const topHeader = document.querySelector('.top-header');
const mainNav = document.querySelector('.main-nav');

window.addEventListener('scroll', function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scroll hacia abajo
    topHeader.classList.add('hide-top-header');
    mainNav.classList.add('fixed-nav');
  } else {
    // Scroll hacia arriba
    topHeader.classList.remove('hide-top-header');
    mainNav.classList.remove('fixed-nav');
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

  window.addEventListener('scroll', function () {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 10) {
      nav.classList.add('shadow');
    } else {
      nav.classList.remove('shadow');
    }
  });

  document.getElementById('menu-toggle').addEventListener('click', function () {
    document.getElementById('nav-menu').classList.toggle('active');
  });

   //JavaScript del menú 
 
    const toggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

//JavaScript de la Galeria
  function abrirModal(img) {
  const modal = document.getElementById("modal");
  const imagenGrande = document.getElementById("imagenGrande");
  imagenGrande.src = img.src;
  modal.style.display = "flex";
}

function cerrarModal(event) {
  event.stopPropagation();
  document.getElementById("modal").style.display = "none";
}

//PREGUNTAS FRECUENTES

document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach(q => {
    q.addEventListener('click', () => {
      const isActive = q.classList.contains('active');
      
      // Cierra todos
      questions.forEach(btn => {
        btn.classList.remove('active');
        btn.nextElementSibling.style.display = 'none';
      });

      // Abre el actual si no estaba activo
      if (!isActive) {
        q.classList.add('active');
        q.nextElementSibling.style.display = 'block';
      }
    });
  });
});



