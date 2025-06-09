document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const submenuParent = document.querySelector('.has-submenu');
  const submenuToggle = submenuParent.querySelector('a');

  // Toggle menú principal (móvil)
  toggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Cierra submenú si estaba abierto
    if (submenuParent.classList.contains('active')) {
      submenuParent.classList.remove('active');
    }
  });

  // Toggle submenu (Servicios) solo en móvil
  submenuToggle.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault(); // Evita salto de página
      submenuParent.classList.toggle('active');
    }
  });
});

