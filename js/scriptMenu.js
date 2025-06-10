document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const submenuParent = document.querySelector(".has-submenu");
  const submenuLink = submenuParent.querySelector("a");

  // Mostrar/ocultar el menú hamburguesa
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Mostrar/ocultar submenu en dispositivos móviles
  submenuLink.addEventListener("click", function (e) {
    if (window.innerWidth <= 991) {
      e.preventDefault(); // evita redirección
      submenuParent.classList.toggle("active");
    }
  });
});

// submenu-toggle.js

document.addEventListener('DOMContentLoaded', () => {
  const submenuLinks = document.querySelectorAll('.has-submenu > a');

  submenuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        const parentLi = link.parentElement;
        parentLi.classList.toggle('active');
      }
    });
  });
});
