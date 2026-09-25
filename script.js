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
