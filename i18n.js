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
    'nav.collections': 'Coleções',
    'nav.auron': 'AURON',

    'portal.eyebrow': 'Ivo de Oliveira',
    'portal.tagline': 'Peças de autor, em coleções. Cada coleção, um mundo próprio.',
    'portal.enter': 'Coleções ↓',
    'portal.collections': 'Coleções',
    'portal.view': 'Ver coleção',

    'hero.eyebrow': 'Coleção AURON · acrílico translúcido',
    'hero.title': 'Luz que <span>vive</span><br>na tua parede',
    'hero.sub': 'Cada peça AURON é uma aura de cor, impressa em acrílico translúcido — sem luz própria, ganha vida com a luz da tua divisão.',
    'hero.cta': 'Ver a coleção ↓',

    'statement.body': 'Não pintamos formas.<br>Capturamos <em>atmosferas</em> — gradientes que respiram cor e desaparecem em luz, prontos para acordar consoante a divisão onde vivem.',

    'gallery.title': 'A coleção',
    'gallery.cta': 'Ir para a loja →',

    'piece.01.h': 'Profundidade',
    'piece.01.p': 'Azul em degradê. Espaço aberto.',
    'piece.02.h': 'Horizonte',
    'piece.02.p': 'Pôr-do-sol em acrílico. Momento suspenso.',
    'piece.03.h': 'Penumbra',
    'piece.03.p': 'Violeta e azul. Entardecer quieto.',
    'piece.04.h': 'Claridade',
    'piece.04.p': 'Cor sobre branco. Presença clara.',
    'piece.05.h': 'Carácter',
    'piece.05.p': 'Laranja e roxo. Espessura visual.',

    'material.eyebrow': 'O material',
    'material.title': 'Acrílico translúcido.<br>Sem luz própria — <span>por agora.</span>',
    'material.copy': 'Cada peça é impressa sobre acrílico translúcido de alta transparência. Não tem retroiluminação própria: vive da luz natural ou artificial da divisão onde é pendurada, mudando subtilmente ao longo do dia. É o primeiro passo de um percurso — a seguir vêm as versões com luz própria (lightbox), e depois, a possibilidade de cada cliente desenhar a sua própria aura.',
    'material.f1.h': 'Translúcido',
    'material.f1.p': 'Deixa passar e filtra a luz da divisão — a peça muda com o dia.',
    'material.f2.h': 'Impressão de precisão',
    'material.f2.p': 'Cor fiel, gradientes suaves, sem faixas — pensado para a arte que fazemos.',
    'material.f3.h': 'Feito à medida',
    'material.f3.p': 'Cada aura nasce num estúdio de geração próprio — nunca um padrão repetido.',

    'about.eyebrow': 'A coleção',
    'about.title': 'AURON nasce da luz<br>que já existe na tua casa.',
    'about.copy': 'O nome vem de "aura" — o halo de cor e luz que rodeia algo. É essa a ideia: peças que não impõem uma imagem, mas uma atmosfera. AURON é a primeira coleção OLIV YVES — hoje, peças em acrílico translúcido; a seguir, lightboxes com luz própria; depois, uma loja onde cada cliente gera a sua aura e a vê, em tempo real, pendurada na sua própria divisão.',
    'about.cta': 'Ver a loja',

    'footer.tag': 'byauron.art · © 2026',
    'footer.terms': 'Termos',
    'footer.privacy': 'Privacidade',
    'footer.returns': 'Devoluções',
    'footer.payments': 'Pagamentos e envios',
    'footer.contact': 'Contacto',
    'footer.rights': '© 2026 OLIV YVES · Ivo de Oliveira. Todos os direitos reservados.',

    /* --- Loja --- */
    'shop.eyebrow': 'Loja',
    'shop.title': 'Peças por coleção',
    'shop.intro': 'Cada peça é uma edição limitada, feita por encomenda. Escolhe o tamanho para veres o preço.',
    'shop.all': 'Todas',
    'shop.view': 'Ver peça',
    'shop.from': 'desde',
    'shop.size': 'Tamanho',
    'shop.price': 'Preço',
    'shop.order': 'Encomendar',
    'shop.order_note': 'Feito por encomenda · sinal de 50% para arrancar a produção',
    'shop.edition_of': 'Edição de {n}',
    'shop.deposit_hint': 'sinal {pct}% · {val}',
    'shop.included': 'Inclui',
    'shop.production': 'Produção',
    'shop.material': 'Material',
    'shop.close': 'Fechar',
    'shop.of': 'de',
  },

  en: {
    'nav.home': 'Home',
    'nav.gallery': 'Gallery',
    'nav.shop': 'Shop',
    'nav.material': 'Material',
    'nav.about': 'About',
    'nav.collections': 'Collections',
    'nav.auron': 'AURON',

    'portal.eyebrow': 'Ivo de Oliveira',
    'portal.tagline': 'Signed pieces, in collections. Each collection, a world of its own.',
    'portal.enter': 'Collections ↓',
    'portal.collections': 'Collections',
    'portal.view': 'View collection',

    'hero.eyebrow': 'AURON collection · translucent acrylic',
    'hero.title': 'Light that <span>lives</span><br>on your wall',
    'hero.sub': 'Every AURON piece is an aura of colour, printed on translucent acrylic — with no light of its own, it comes alive with the light of your room.',
    'hero.cta': 'See the collection ↓',

    'statement.body': "We don't paint shapes.<br>We capture <em>atmospheres</em> — gradients that breathe colour and vanish into light, ready to wake with the room they live in.",

    'gallery.title': 'The collection',
    'gallery.cta': 'Go to the shop →',

    'piece.01.h': 'Depth',
    'piece.01.p': 'Blue in gradient. Open space.',
    'piece.02.h': 'Horizon',
    'piece.02.p': 'Sunset in acrylic. Suspended moment.',
    'piece.03.h': 'Penumbra',
    'piece.03.p': 'Violet and blue. Quiet dusk.',
    'piece.04.h': 'Clarity',
    'piece.04.p': 'Colour on white. Clear presence.',
    'piece.05.h': 'Character',
    'piece.05.p': 'Orange and violet. Visual weight.',

    'material.eyebrow': 'The material',
    'material.title': 'Translucent acrylic.<br>No light of its own — <span>for now.</span>',
    'material.copy': 'Each piece is printed on high-clarity translucent acrylic. It has no backlight of its own: it lives on the natural or artificial light of the room where it hangs, shifting subtly through the day. It is the first step of a journey — next come the self-lit versions (lightbox), and then the possibility for each customer to design their own aura.',
    'material.f1.h': 'Translucent',
    'material.f1.p': 'Lets the room light through and filters it — the piece changes with the day.',
    'material.f2.h': 'Precision print',
    'material.f2.p': 'True colour, smooth gradients, no banding — built for the art we make.',
    'material.f3.h': 'Made to measure',
    'material.f3.p': 'Each aura is born in our own generative studio — never a repeated pattern.',

    'about.eyebrow': 'The collection',
    'about.title': 'AURON is born from the light<br>already in your home.',
    'about.copy': 'The name comes from "aura" — the halo of colour and light around something. That is the idea: pieces that impose not an image, but an atmosphere. AURON is the first OLIV YVES collection — today, translucent acrylic pieces; next, self-lit lightboxes; then, a shop where each customer generates their aura and sees it, in real time, hanging in their own room.',
    'about.cta': 'View the shop',

    'footer.tag': 'byauron.art · © 2026',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',
    'footer.returns': 'Returns',
    'footer.payments': 'Payments & shipping',
    'footer.contact': 'Contact',
    'footer.rights': '© 2026 OLIV YVES · Ivo de Oliveira. All rights reserved.',

    /* --- Shop --- */
    'shop.eyebrow': 'Shop',
    'shop.title': 'Pieces by collection',
    'shop.intro': 'Each piece is a limited edition, made to order. Choose a size to see the price.',
    'shop.all': 'All',
    'shop.view': 'View piece',
    'shop.from': 'from',
    'shop.size': 'Size',
    'shop.price': 'Price',
    'shop.order': 'Order',
    'shop.order_note': 'Made to order · 50% deposit to start production',
    'shop.edition_of': 'Edition of {n}',
    'shop.deposit_hint': 'deposit {pct}% · {val}',
    'shop.included': 'Included',
    'shop.production': 'Production',
    'shop.material': 'Material',
    'shop.close': 'Close',
    'shop.of': 'of',
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
