document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const submenuToggle = document.querySelector('.has-submenu > a');

  hamburger.addEventListener('click', () => {
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
  });

  submenuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    submenuToggle.parentElement.classList.toggle('active');
  });
});
