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
