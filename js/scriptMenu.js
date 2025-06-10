document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const submenuParents = document.querySelectorAll(".has-submenu > a");
  const navLinks = document.querySelectorAll(".nav-menu a");

  // Mostrar/ocultar menú hamburguesa
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Mostrar/ocultar submenú al hacer clic
  submenuParents.forEach(link => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault(); // Previene navegación
        const parent = link.parentElement;

        // Cierra si ya está activo
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
        } else {
          // Cierra otros submenús
          document.querySelectorAll(".has-submenu").forEach(item => {
            item.classList.remove("active");
          });
          // Abre el submenú actual
          parent.classList.add("active");
        }
      }
    });
  });

  // Cierra menú general si haces clic en enlaces normales (no padres de submenú)
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        const isSubmenuParent = link.parentElement.classList.contains("has-submenu");
        if (!isSubmenuParent) {
          navMenu.classList.remove("active");
          document.querySelectorAll(".has-submenu").forEach(item => {
            item.classList.remove("active");
          });
        }
      }
    });
  });
});

