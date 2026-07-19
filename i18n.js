/* ============================================================
   AURON — IDIOMAS (Português / Inglês)
   ------------------------------------------------------------
   Como funciona:
   - No HTML, qualquer elemento com  data-i18n="chave"  recebe
     o texto certo consoante o idioma escolhido.
   - Para atributos (ex: placeholder, alt) usa data-i18n-attr.
   - O botão PT/EN troca o idioma e guarda a escolha no browser.
   Para acrescentar um texto novo: cria uma "chave" aqui em
   baixo (nas duas línguas) e usa-a no HTML com data-i18n.
   ============================================================ */

const I18N = {
  pt: {
    'nav.home': 'Início',
    'nav.gallery': 'Galeria',
    'nav.shop': 'Loja',
    'nav.material': 'Material',
    'nav.about': 'Sobre',

    'portal.tagline': 'Arte de autor, editada em coleções.',
    'portal.view': 'Ver coleção',

    'hero.eyebrow': 'Coleção AURON · Acrílico translúcido',
    'hero.title': 'AURON<br><span>Coleção I</span>',
    'hero.sub': 'Gradientes impressos em acrílico translúcido. Sem retroiluminação: cada peça responde à luz da divisão onde vive.',
    'hero.cta': 'Ver a coleção ↓',

    'statement.body': 'Uma peça AURON não impõe uma imagem.<br>Propõe uma <em>atmosfera</em>.',

    'gallery.title': 'A coleção',
    'gallery.cta': 'Adquirir uma peça →',

    /* Os nomes e legendas das peças vivem em data.js (campo gallery.caption
       de cada peça) — a galeria gera-se de lá, ver script.js. */

    'material.eyebrow': 'O material',
    'material.title': 'Acrílico translúcido.<br><span>Sem luz própria.</span>',
    'material.copy': 'Impressão direta sobre acrílico de alta transparência. A peça não tem retroiluminação: responde à luz — natural ou artificial — da divisão onde está pendurada, e muda com ela ao longo do dia.',
    'material.f1.h': 'Translúcido',
    'material.f1.p': 'A luz da divisão atravessa a peça e é filtrada pela cor.',
    'material.f2.h': 'Impressão de precisão',
    'material.f2.p': 'Cor fiel e gradientes contínuos, sem faixas visíveis.',
    'material.f3.h': 'Sem repetição',
    'material.f3.p': 'Cada aura é gerada em estúdio, uma a uma. Nenhum padrão se repete.',

    'about.eyebrow': 'A coleção',
    'about.title': 'AURON,<br>primeira coleção OLIV YVES.',
    'about.copy': 'De "aura": o halo de cor e luz à volta de um corpo. Gradientes originais, impressos em acrílico translúcido, feitos para viver da luz que já existe numa casa.',
    'about.cta': 'Ver a loja',
    'scene.cta': 'Ver na loja →',

    'footer.terms': 'Termos',
    'footer.privacy': 'Privacidade',
    'footer.returns': 'Devoluções',
    'footer.payments': 'Pagamentos e envios',
    'footer.contact': 'Contacto',
    'footer.rights': '© 2026 OLIV YVES. Todos os direitos reservados.',

    /* --- Loja --- */
    'shop.eyebrow': 'Loja',
    'shop.title': 'Peças por coleção',
    'shop.intro': 'Escolhe o tamanho para ver o preço.',
    'shop.all': 'Todas',
    'shop.view': 'Ver peça',
    'shop.from': 'desde',
    'shop.size': 'Tamanho',
    'shop.price': 'Preço',
    'shop.add_cart': 'Adicionar ao carrinho',
    'shop.included': 'Inclui',
    'shop.production': 'Produção',
    'shop.material': 'Material',
    'shop.close': 'Fechar',
    'shop.of': 'de',
    'shop.faq_link': 'Dúvidas? FAQ — envios, devoluções, montagem',

    /* --- Carrinho / checkout --- */
    'cart.title': 'Carrinho',
    'cart.empty': 'O carrinho está vazio.',
    'cart.remove': 'Remover',
    'cart.subtotal': 'Subtotal',
    'cart.checkout': 'Finalizar encomenda',
    'cart.processing': 'A processar…',
    'cart.error': 'Não foi possível iniciar o pagamento. Tenta de novo ou contacta-nos.',

    'checkout.success_title': 'Encomenda confirmada',
    'checkout.success_body': 'Obrigado! Recebemos o teu pagamento. Vais receber um email de confirmação em breve com os próximos passos da produção.',
    'checkout.cancel_title': 'Pagamento cancelado',
    'checkout.cancel_body': 'A encomenda não foi concluída — o carrinho continua guardado, podes tentar de novo quando quiseres.',
    'checkout.back_shop': 'Voltar à loja',

    'notfound.title': 'Esta página não existe.',
    'notfound.body': 'Ou mudou de sítio, ou o endereço veio com um erro. A coleção continua no mesmo lugar.',
    'notfound.cta': 'Voltar ao início',
  },

  en: {
    'nav.home': 'Home',
    'nav.gallery': 'Gallery',
    'nav.shop': 'Shop',
    'nav.material': 'Material',
    'nav.about': 'About',

    'portal.tagline': 'Original works, edited in collections.',
    'portal.view': 'View collection',

    'hero.eyebrow': 'AURON Collection · Translucent acrylic',
    'hero.title': 'AURON<br><span>Collection I</span>',
    'hero.sub': 'Gradients printed on translucent acrylic. No backlight: each piece responds to the light of the room it lives in.',
    'hero.cta': 'See the collection ↓',

    'statement.body': 'An AURON piece imposes no image.<br>It proposes an <em>atmosphere</em>.',

    'gallery.title': 'The collection',
    'gallery.cta': 'Acquire a piece →',

    /* Piece names and captions live in data.js (each piece's gallery.caption)
       — the gallery renders from there, see script.js. */

    'material.eyebrow': 'The material',
    'material.title': 'Translucent acrylic.<br><span>No light of its own.</span>',
    'material.copy': 'Printed directly on high-clarity acrylic. The piece has no backlight: it responds to the light — natural or artificial — of the room where it hangs, and changes with it through the day.',
    'material.f1.h': 'Translucent',
    'material.f1.p': 'Room light passes through the piece, filtered by its colour.',
    'material.f2.h': 'Precision print',
    'material.f2.p': 'True colour and continuous gradients, with no visible banding.',
    'material.f3.h': 'No repetition',
    'material.f3.p': 'Each aura is generated in the studio, one at a time. No pattern repeats.',

    'about.eyebrow': 'The collection',
    'about.title': 'AURON,<br>the first OLIV YVES collection.',
    'about.copy': 'From "aura": the halo of colour and light around a body. Original gradients, printed on translucent acrylic, made to live on the light already in a home.',
    'about.cta': 'View the shop',
    'scene.cta': 'View in shop →',

    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',
    'footer.returns': 'Returns',
    'footer.payments': 'Payments & shipping',
    'footer.contact': 'Contact',
    'footer.rights': '© 2026 OLIV YVES. All rights reserved.',

    /* --- Shop --- */
    'shop.eyebrow': 'Shop',
    'shop.title': 'Pieces by collection',
    'shop.intro': 'Choose a size to see the price.',
    'shop.all': 'All',
    'shop.view': 'View piece',
    'shop.from': 'from',
    'shop.size': 'Size',
    'shop.price': 'Price',
    'shop.add_cart': 'Add to cart',
    'shop.included': 'Included',
    'shop.production': 'Production',
    'shop.material': 'Material',
    'shop.close': 'Close',
    'shop.of': 'of',
    'shop.faq_link': 'Questions? FAQ — shipping, returns, mounting',

    /* --- Cart / checkout --- */
    'cart.title': 'Cart',
    'cart.empty': 'Your cart is empty.',
    'cart.remove': 'Remove',
    'cart.subtotal': 'Subtotal',
    'cart.checkout': 'Checkout',
    'cart.processing': 'Processing…',
    'cart.error': "Couldn't start checkout. Try again or contact us.",

    'checkout.success_title': 'Order confirmed',
    'checkout.success_body': "Thank you! We've received your payment. You'll get a confirmation email shortly with the next production steps.",
    'checkout.cancel_title': 'Payment cancelled',
    'checkout.cancel_body': "The order wasn't completed — your cart is still saved, so you can try again whenever you like.",
    'checkout.back_shop': 'Back to the shop',

    'notfound.title': 'This page does not exist.',
    'notfound.body': 'It either moved, or the address came with a typo. The collection is right where it was.',
    'notfound.cta': 'Back to the start',
  },
};

/* ---- lógica ---- */
function getLang() {
  return localStorage.getItem('auronLang') || 'pt';
}

function t(key) {
  const lang = getLang();
  return (I18N[lang] && I18N[lang][key]) || (I18N.pt[key] || key);
}

function applyLang(lang, isUserAction) {
  if (lang) localStorage.setItem('auronLang', lang);
  const cur = getLang();
  document.documentElement.lang = cur;

  // textos
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const val = (I18N[cur] && I18N[cur][key]);
    if (val != null) el.innerHTML = val;
  });

  // atributos (ex: data-i18n-attr="alt:piece.01.h")
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    el.getAttribute('data-i18n-attr').split(';').forEach((pair) => {
      const [attr, key] = pair.split(':');
      const val = (I18N[cur] && I18N[cur][key]);
      if (attr && val != null) el.setAttribute(attr.trim(), val);
    });
  });

  // estado do dropdown
  document.querySelectorAll('[data-lang-select]').forEach((sel) => { sel.value = cur; });

  // a moeda segue o idioma por defeito (PT→EUR, EN→USD) — mas só quando o
  // idioma é escolhido ativamente no dropdown, nunca ao simplesmente carregar
  // a página (isUserAction=false nesse caso), para não sobrepor uma moeda
  // que a pessoa já tinha escolhido à mão numa visita anterior.
  if (isUserAction && window.Currency) {
    Currency.set(cur === 'en' ? 'USD' : 'EUR');
  }

  // avisa o resto da página (a loja re-desenha os produtos)
  document.dispatchEvent(new CustomEvent('auron:langchange', { detail: { lang: cur } }));
}

function initLangToggle() {
  document.querySelectorAll('[data-lang-select]').forEach((sel) => {
    sel.addEventListener('change', () => applyLang(sel.value, true));
  });
  applyLang(getLang(), false);
}

document.addEventListener('DOMContentLoaded', initLangToggle);
