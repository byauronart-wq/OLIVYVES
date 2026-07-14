/* ============================================================
   OLIVEIRA — CHAT / MENSAGENS
   Botão flutuante que abre um painel com formulário DENTRO do site.
   Ao enviar, o dono recebe um email automático (via FormSubmit).
   Se CONFIG.chat.tawkSrc estiver preenchido, usa antes o chat ao vivo Tawk.to.
   ============================================================ */
(function () {
  var cfg = (window.CONFIG && window.CONFIG.chat) || {};
  var order = (window.CONFIG && window.CONFIG.order) || {};

  /* ---- opção A: chat ao vivo Tawk.to ---- */
  if (cfg.tawkSrc) {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    var ts = document.createElement('script');
    ts.async = true;
    ts.src = 'https://' + String(cfg.tawkSrc).replace(/^https?:\/\//, '');
    ts.charset = 'UTF-8';
    ts.setAttribute('crossorigin', '*');
    document.head.appendChild(ts);
    return;
  }

  /* ---- opção B (defeito): formulário de contacto no site ---- */
  var TO = cfg.formTo || order.email || '';

  var STR = {
    pt: {
      open: 'Contacto', title: 'Contacto',
      intro: 'Dúvidas ou pedidos de comissão? Escreve aqui — a resposta chega por email.',
      name: 'Nome', email: 'Email', msg: 'Mensagem', send: 'Enviar',
      sending: 'A enviar…', ok: 'Obrigado! Mensagem recebida — resposta em breve.',
      err: 'Não foi possível enviar. Tenta de novo ou escreve para ' + TO + '.',
      types: ['Dúvida', 'Encomenda', 'Comissão'],
    },
    en: {
      open: 'Contact', title: 'Contact',
      intro: 'Questions or commission requests? Write here — a reply follows by email.',
      name: 'Name', email: 'Email', msg: 'Message', send: 'Send',
      sending: 'Sending…', ok: 'Thank you! Message received — a reply follows soon.',
      err: 'Could not send. Please try again or write to ' + TO + '.',
      types: ['Question', 'Order', 'Commission'],
    },
  };
  function L() { return STR[(typeof getLang === 'function' ? getLang() : 'pt')] || STR.pt; }

  var fab, panel, open = false;

  function iconChat() {
    return '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>';
  }
  var iconClose = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 6L6 18M6 6l12 12"/></svg>';

  function build() {
    var t = L();

    fab = document.createElement('button');
    fab.className = 'chat-fab';
    fab.setAttribute('aria-label', t.open);
    fab.innerHTML = iconChat();
    fab.addEventListener('click', toggle);
    document.body.appendChild(fab);

    panel = document.createElement('div');
    panel.className = 'chat-panel';
    panel.hidden = true;
    panel.innerHTML =
      '<div class="chat-head">' +
        '<strong data-ck="title">' + t.title + '</strong>' +
        '<button class="chat-x" aria-label="Fechar">' + iconClose + '</button>' +
      '</div>' +
      '<div class="chat-body">' +
        '<p class="chat-intro" data-ck="intro">' + t.intro + '</p>' +
        '<form class="chat-form" novalidate>' +
          '<input name="name" required placeholder="' + t.name + '">' +
          '<input name="email" type="email" required placeholder="' + t.email + '">' +
          '<select name="type">' + t.types.map(function (x) { return '<option>' + x + '</option>'; }).join('') + '</select>' +
          '<textarea name="message" required rows="4" placeholder="' + t.msg + '"></textarea>' +
          '<button type="submit" class="chat-send" data-ck="send">' + t.send + '</button>' +
        '</form>' +
        '<div class="chat-success" hidden></div>' +
      '</div>';
    document.body.appendChild(panel);

    panel.querySelector('.chat-x').addEventListener('click', toggle);
    panel.querySelector('.chat-form').addEventListener('submit', onSubmit);
  }

  function toggle() {
    open = !open;
    panel.hidden = !open;
    fab.classList.toggle('open', open);
  }

  function onSubmit(e) {
    e.preventDefault();
    var t = L();
    var form = e.target;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (!TO) { fail(t.err); return; }

    var btn = form.querySelector('.chat-send');
    btn.disabled = true; btn.textContent = t.sending;

    var payload = {
      name: form.name.value,
      email: form.email.value,
      tipo: form.type.value,
      message: form.message.value,
      _subject: 'OLIVEIRA — ' + form.type.value + ' (' + form.name.value + ')',
      _template: 'table',
      _captcha: 'false',
    };

    fetch('https://formsubmit.co/ajax/' + encodeURIComponent(TO), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && (d.success === true || d.success === 'true')) succeed(t.ok);
        else fail(t.err);
      })
      .catch(function () { fail(t.err); })
      .finally(function () { btn.disabled = false; btn.textContent = t.send; });
  }

  function succeed(msg) {
    var form = panel.querySelector('.chat-form');
    var ok = panel.querySelector('.chat-success');
    form.hidden = true;
    ok.hidden = false; ok.className = 'chat-success'; ok.textContent = msg;
  }
  function fail(msg) {
    var ok = panel.querySelector('.chat-success');
    ok.hidden = false; ok.className = 'chat-success is-error'; ok.textContent = msg;
  }

  // atualizar textos quando muda o idioma
  document.addEventListener('auron:langchange', function () {
    if (!panel) return;
    var t = L();
    fab.setAttribute('aria-label', t.open);
    panel.querySelector('[data-ck="title"]').textContent = t.title;
    panel.querySelector('[data-ck="intro"]').textContent = t.intro;
    var form = panel.querySelector('.chat-form');
    if (form && !form.hidden) {
      form.name.placeholder = t.name;
      form.email.placeholder = t.email;
      form.message.placeholder = t.msg;
      form.querySelector('.chat-send').textContent = t.send;
      var sel = form.type;
      t.types.forEach(function (x, i) { if (sel.options[i]) sel.options[i].textContent = x; });
    }
  });

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();
