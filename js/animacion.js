
  document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.fade-up, .staggered-fade').forEach(el => {
      observer.observe(el);
    });
  });
