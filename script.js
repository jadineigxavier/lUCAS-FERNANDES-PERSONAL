const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

const revealTargets = document.querySelectorAll(
  '.intro-grid, .principles article, .statement-image, .statement-copy, .service-card, .gallery-head, .gallery-item, .results-head, .result-card, .testimonials-head, .testimonial-card, .about-image, .about-copy, .contact-grid > *'
);
revealTargets.forEach((element) => element.setAttribute('data-reveal', ''));
if ('IntersectionObserver' in window) {
  document.body.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.setAttribute('data-visible', '');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealTargets.forEach((element) => revealObserver.observe(element));
} else {
  revealTargets.forEach((element) => element.setAttribute('data-visible', ''));
}

// Indica no menu qual seção está ocupando a área principal da tela.
const sectionLinks = [...nav.querySelectorAll('a[href^="#"]')];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const current = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!current) return;
    sectionLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${current.target.id}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.2, 0.5] });
  observedSections.forEach((section) => sectionObserver.observe(section));
}

// Abre cada foto da galeria em um modal grande e acessível.
const gallery = document.querySelector('.gallery-grid');
if (gallery) {
  const lightbox = document.createElement('dialog');
  lightbox.className = 'gallery-lightbox';
  lightbox.setAttribute('aria-label', 'Foto ampliada da galeria');
  lightbox.innerHTML = '<button class="gallery-lightbox-close" type="button" aria-label="Fechar foto">×</button><figure><img alt=""><figcaption></figcaption></figure>';
  document.body.append(lightbox);

  const lightboxImage = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('figcaption');
  const closeLightbox = lightbox.querySelector('.gallery-lightbox-close');
  const openLightbox = (item) => {
    const image = item.querySelector('img');
    if (!image) return;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = item.querySelector('figcaption b')?.textContent || image.alt;
    lightbox.showModal();
    closeLightbox.focus();
  };

  gallery.querySelectorAll('.gallery-item').forEach((item) => {
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `Ampliar foto: ${item.querySelector('img')?.alt || 'foto da galeria'}`);
    item.addEventListener('click', () => openLightbox(item));
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(item);
      }
    });
  });

  closeLightbox.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
}
