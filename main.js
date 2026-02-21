// Reveal on scroll — with mobile-safe fallback
const revealEls = document.querySelectorAll('.reveal');

// If IntersectionObserver not supported, show everything immediately
if (!('IntersectionObserver' in window)) {
  revealEls.forEach(el => el.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px 0px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // Immediately reveal anything already in viewport on page load
  window.addEventListener('load', () => {
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  });
}
