document.querySelector('#year').textContent = new Date().getFullYear();

// Quiz: transforma as respostas em uma mensagem pronta para o WhatsApp do Lucas.
(() => {
  const form = document.querySelector('#quiz');
  if (!form) return;
  const send = form.querySelector('#quiz-send'), preview = form.querySelector('#quiz-preview'), count = form.querySelector('#quiz-count');
  let message = '';
  const update = () => {
    const d = new FormData(form), nome = (d.get('nome') || '').trim();
    const done = ['obj', 'fmt', 'exp'].filter((k) => d.get(k)).length;
    const parts = [`Olá, Lucas!${nome ? ` Eu sou ${nome}.` : ''}`];
    if (d.get('obj')) parts.push(`Meu objetivo é ${d.get('obj')}.`);
    if (d.get('fmt')) parts.push(`Prefiro treinar ${d.get('fmt') === 'ainda não sei' ? 'de um jeito que você me indicar (ainda não sei qual formato)' : d.get('fmt')}.`);
    if (d.get('exp')) parts.push(`Sobre minha experiência: ${d.get('exp')}.`);
    if (done === 3) parts.push('Quero conhecer os planos.');
    message = parts.join(' ');
    preview.textContent = done ? message : 'Sua mensagem aparece aqui conforme você responde.';
    count.textContent = `${done} de 3 respondidas`;
    send.setAttribute('aria-disabled', String(done < 3));
    send.href = done === 3 ? `https://wa.me/553291843587?text=${encodeURIComponent(message)}` : '#plano';
  };
  form.addEventListener('input', update);
  send.addEventListener('click', (event) => {
    if (send.getAttribute('aria-disabled') === 'true') {
      event.preventDefault();
      const pending = ['obj', 'fmt', 'exp'].find((k) => !form.querySelector(`input[name="${k}"]:checked`));
      form.querySelector(`input[name="${pending}"]`)?.focus();
    }
  });
  form.addEventListener('submit', (event) => event.preventDefault());
  update();
})();
