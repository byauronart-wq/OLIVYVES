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

    'portal.tagline': 'Peças de autor, em coleções. Cada coleção, um mundo próprio.',
    'portal.view': 'Ver coleção',

    'hero.eyebrow': 'Coleção AURON · acrílico translúcido',
    'hero.title': 'Luz que <span>vive</span><br>na tua parede',
    'hero.sub': 'Cada peça AURON é uma aura de cor, impressa em acrílico translúcido — sem luz própria, ganha vida com a luz da tua divisão.',
    'hero.cta': 'Ver a coleção ↓',

    'statement.body': 'Não formas pintadas.<br><em>Atmosferas</em> capturadas — gradientes que respiram cor e desaparecem em luz, prontos para acordar consoante a divisão onde vivem.',

    'gallery.title': 'A coleção',
    'gallery.cta': 'Ir para a loja →',

    'piece.01.h': 'Profundidade',
    'piece.01.p': 'Azul em degradê. Espaço aberto.',
    'piece.02.h': 'Horizonte',
    'piece.02.p': 'Pôr-do-sol em acrílico. Momento suspenso.',
    'piece.03.h': 'Nascente',
    'piece.03.p': 'Sol oval, quente. Luz que nasce.',
    'piece.04.h': 'Cósmica',
    'piece.04.p': 'Violeta profundo. Halo cósmico.',
    'piece.05.h': 'Órbita',
    'piece.05.p': 'Círculo cósmico. Centro em fuga.',

    'material.eyebrow': 'O material',
    'material.title': 'Acrílico translúcido.<br>Vive da <span>luz da tua casa.</span>',
    'material.copy': 'Cada peça é impressa sobre acrílico translúcido de alta transparência. Não tem retroiluminação própria: vive da luz natural ou artificial da divisão onde é pendurada, mudando subtilmente ao longo do dia.',
    'material.f1.h': 'Translúcido',
    'material.f1.p': 'Deixa passar e filtra a luz da divisão — a peça muda com o dia.',
    'material.f2.h': 'Impressão de precisão',
    'material.f2.p': 'Cor fiel, gradientes suaves, sem faixas — a precisão que esta arte exige.',
    'material.f3.h': 'Feito à medida',
    'material.f3.p': 'Cada aura nasce num estúdio de geração próprio — nunca um padrão repetido.',

    'about.eyebrow': 'A coleção',
    'about.title': 'AURON nasce da luz<br>que já existe na tua casa.',
    'about.copy': 'O nome vem de "aura" — o halo de cor e luz que rodeia algo. É essa a ideia: peças que não impõem uma imagem, mas uma atmosfera. AURON é a primeira coleção OLIV YVES, em acrílico translúcido.',
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
    'shop.intro': 'Cada peça é uma edição limitada. Escolhe o tamanho para veres o preço.',
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
  },

  en: {
    'nav.home': 'Home',
    'nav.gallery': 'Gallery',
    'nav.shop': 'Shop',
    'nav.material': 'Material',
    'nav.about': 'About',

    'portal.tagline': 'Signed pieces, in collections. Each collection, a world of its own.',
    'portal.view': 'View collection',

    'hero.eyebrow': 'AURON collection · translucent acrylic',
    'hero.title': 'Light that <span>lives</span><br>on your wall',
    'hero.sub': 'Every AURON piece is an aura of colour, printed on translucent acrylic — with no light of its own, it comes alive with the light of your room.',
    'hero.cta': 'See the collection ↓',

    'statement.body': 'Not painted shapes.<br><em>Captured atmospheres</em> — gradients that breathe colour and vanish into light, ready to wake with the room they live in.',

    'gallery.title': 'The collection',
    'gallery.cta': 'Go to the shop →',

    'piece.01.h': 'Depth',
    'piece.01.p': 'Blue in gradient. Open space.',
    'piece.02.h': 'Horizon',
    'piece.02.p': 'Sunset in acrylic. Suspended moment.',
    'piece.03.h': 'Rising',
    'piece.03.p': 'Oval sun, warm. Rising light.',
    'piece.04.h': 'Cosmic',
    'piece.04.p': 'Deep violet. Cosmic halo.',
    'piece.05.h': 'Orbit',
    'piece.05.p': 'Cosmic circle. Vanishing core.',

    'material.eyebrow': 'The material',
    'material.title': 'Translucent acrylic.<br>Lives on <span>the light of your home.</span>',
    'material.copy': 'Each piece is printed on high-clarity translucent acrylic. It has no backlight of its own: it lives on the natural or artificial light of the room where it hangs, shifting subtly through the day.',
    'material.f1.h': 'Translucent',
    'material.f1.p': 'Lets the room light through and filters it — the piece changes with the day.',
    'material.f2.h': 'Precision print',
    'material.f2.p': 'True colour, smooth gradients, no banding — the precision this art demands.',
    'material.f3.h': 'Made to measure',
    'material.f3.p': 'Each aura is born in a dedicated generative studio — never a repeated pattern.',

    'about.eyebrow': 'The collection',
    'about.title': 'AURON is born from the light<br>already in your home.',
    'about.copy': 'The name comes from "aura" — the halo of colour and light around something. That is the idea: pieces that impose not an image, but an atmosphere. AURON is the first OLIV YVES collection, in translucent acrylic.',
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
    'shop.intro': 'Each piece is a limited edition. Choose a size to see the price.',
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

function applyLang(lang) {
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

  // estado do botão
  document.querySelectorAll('[data-lang-toggle]').forEach((btn) => {
    btn.querySelectorAll('[data-lang]').forEach((s) => {
      s.classList.toggle('on', s.getAttribute('data-lang') === cur);
    });
  });

  // avisa o resto da página (a loja re-desenha os produtos)
  document.dispatchEvent(new CustomEvent('auron:langchange', { detail: { lang: cur } }));
}

function initLangToggle() {
  document.querySelectorAll('[data-lang-toggle] [data-lang]').forEach((el) => {
    el.addEventListener('click', () => applyLang(el.getAttribute('data-lang')));
  });
  applyLang(getLang());
}

document.addEventListener('DOMContentLoaded', initLangToggle);
