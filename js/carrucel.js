
  document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
      const slides = carousel.querySelector('.slides');
      const images = slides.querySelectorAll('img');
      const prevBtn = carousel.querySelector('.prev');
      const nextBtn = carousel.querySelector('.next');

      let index = 0;
      let interval = setInterval(nextSlide, 5000);

      function showSlide(i) {
        index = (i + images.length) % images.length;
        slides.style.transform = `translateX(-${index * 100}%)`;
      }

      function nextSlide() {
        showSlide(index + 1);
      }

      function prevSlide() {
        showSlide(index - 1);
      }

      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
      });

      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
      });

      function resetInterval() {
        clearInterval(interval);
        interval = setInterval(nextSlide, 5000);
      }

      showSlide(index);
    });
  });

