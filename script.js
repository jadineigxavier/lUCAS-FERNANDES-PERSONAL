// Referências do menu móvel, controlado pelo botão no cabeçalho.
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Abre e fecha a navegação, mantendo os atributos acessíveis sincronizados.
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

// Fecha o menu após selecionar uma seção para não cobrir o conteúdo no celular.
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));

// Atualiza automaticamente o ano exibido no rodapé.
document.querySelector('#year').textContent = new Date().getFullYear();

// Elementos que entram suavemente na tela quando aparecem durante a rolagem.
const revealTargets = document.querySelectorAll(
  '.quick-facts-intro, .quick-fact, .intro-grid, .principles article, .statement-image, .statement-copy, .service-card, .gallery-head, .gallery-item, .results-head, .result-card, .testimonials-head, .testimonial-card, .about-image, .about-copy, .contact-grid > *, .service-card img, .gallery-item img, .about-image img'
);

// Marca imagens e blocos para que o CSS aplique os efeitos de entrada.
revealTargets.forEach((element) => {
  element.setAttribute('data-reveal', '');
  if (element.matches('img')) element.setAttribute('data-photo', '');
});

// IntersectionObserver evita animar todos os elementos fora da tela de uma vez.
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
  // Alternativa para navegadores sem IntersectionObserver: mostra tudo sem atraso.
  revealTargets.forEach((element) => element.setAttribute('data-visible', ''));
}

// Galeria: abre cada foto em tamanho original dentro de um diálogo acessível.
const imageModal = document.querySelector('.image-modal');
const modalPhoto = imageModal.querySelector('.image-modal-photo');
const modalCaption = imageModal.querySelector('.image-modal-caption');
const closeImageModal = imageModal.querySelector('.image-modal-close');

document.querySelectorAll('.gallery-item img').forEach((photo) => {
  photo.tabIndex = 0;
  photo.setAttribute('role', 'button');
  photo.setAttribute('aria-label', `Ampliar foto: ${photo.alt}`);

  const openPhoto = () => {
    modalPhoto.src = photo.currentSrc || photo.src;
    modalPhoto.alt = photo.alt;
    modalCaption.textContent = photo.closest('.gallery-item').querySelector('figcaption b')?.textContent || photo.alt;
    imageModal.showModal();
  };

  photo.addEventListener('click', openPhoto);
  photo.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPhoto();
    }
  });
});

closeImageModal.addEventListener('click', () => imageModal.close());
imageModal.addEventListener('click', (event) => {
  if (event.target === imageModal) imageModal.close();
});
