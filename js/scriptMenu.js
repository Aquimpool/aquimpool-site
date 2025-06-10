document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  const submenuLinks = document.querySelectorAll('.has-submenu > a');

  submenuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        const parentLi = link.parentElement;

        // Cerrar otros submenús si es necesario
        document.querySelectorAll('.has-submenu.active').forEach(item => {
          if (item !== parentLi) {
            item.classList.remove('active');
          }
        });

        parentLi.classList.toggle('active');
      }
    });
  });
});
