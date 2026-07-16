/* ============================================================
   OLIVEIRA — LOJA (motor)
   Lê window.CATALOG (data.js) + i18n.js e constrói a loja,
   o filtro por coleção e a ficha de cada peça.
   Encomenda via window.CONFIG.order (whatsapp / email / stripe).
   ============================================================ */

const money = (n) => Currency.format(n);

/* Pré-visualização de rascunho vinda do editor:
   loja.html?draft=1 usa o catálogo guardado no browser pelo editor. */
(function loadDraftCatalog() {
  const params = new URLSearchParams(location.search);
  if (params.get('draft') !== '1') return;
  try {
    const d = JSON.parse(localStorage.getItem('auronDraftCatalog'));
    if (d && Array.isArray(d.collections)) {
      window.CATALOG = d;
      window.getCollection = (id) => d.collections.find((c) => c.id === id) || null;
    }
  } catch (e) { /* ignora rascunho inválido */ }
})();

// coleção ativa no filtro: id ou 'all'
let ACTIVE_COL = 'all';

// estado da ficha aberta
const MODAL = { piece: null, collection: null, imgIndex: 0, sizeIndex: 0 };

/* ---------- filtro inicial a partir do ?col= no link ---------- */
function initFilterFromURL() {
  const params = new URLSearchParams(location.search);
  const col = params.get('col');
  if (col && window.getCollection(col)) ACTIVE_COL = col;
}

/* ---------- abrir uma peça directamente a partir do link (?col=X&piece=Y) ---------- */
function openPieceFromURL() {
  const params = new URLSearchParams(location.search);
  const pieceId = params.get('piece');
  if (!pieceId) return;
  const col = window.getCollection(params.get('col')) || window.CATALOG.collections.find((c) =>
    c.pieces.some((p) => p.id === pieceId)
  );
  const piece = col && col.pieces.find((p) => p.id === pieceId);
  if (col && piece) openPiece(col, piece);
}

/* ---------- barra de filtro (uma pastilha por coleção) ---------- */
function renderFilter() {
  const el = document.getElementById('shop-filter');
  if (!el) return;
  const cols = window.CATALOG.collections;
  // com uma só coleção, o filtro é dispensável
  if (cols.length < 2) { el.innerHTML = ''; return; }

  const chip = (id, label) =>
    `<button class="filter-chip${ACTIVE_COL === id ? ' on' : ''}" data-col="${id}">${label}</button>`;

  el.innerHTML = chip('all', t('shop.all')) + cols.map((c) => chip(c.id, c.name)).join('');
  el.querySelectorAll('.filter-chip').forEach((b) =>
    b.addEventListener('click', () => { ACTIVE_COL = b.dataset.col; renderShop(); })
  );
}

/* ---------- grelha da loja ---------- */
function renderShop() {
  const root = document.getElementById('shop-root');
  if (!root) return;
  const lang = getLang();
  renderFilter();
  root.innerHTML = '';

  window.CATALOG.collections
    .filter((c) => ACTIVE_COL === 'all' || c.id === ACTIVE_COL)
    .forEach((col) => {
      const section = document.createElement('section');
      section.className = 'collection';
      section.innerHTML = `
        <div class="collection-head" data-reveal>
          <h2>${col.name}</h2>
          <p>${(col.description && col.description[lang]) || ''}</p>
        </div>
        <div class="piece-grid"></div>
      `;
      const grid = section.querySelector('.piece-grid');

      col.pieces.forEach((piece) => {
        const fromPrice = Math.min(...piece.sizes.map((s) => s.price));
        const card = document.createElement('button');
        card.className = 'piece-card';
        card.setAttribute('data-reveal', '');
        card.innerHTML = `
          <div class="card-img">
            <img src="${piece.images[0]}" alt="${piece.name[lang]}" loading="lazy">
            <span class="card-count">${piece.images.length} ◦</span>
          </div>
          <div class="card-body">
            <h3>${piece.name[lang]}</h3>
            <p class="card-from">${t('shop.from')} ${money(fromPrice)}</p>
          </div>
        `;
        card.addEventListener('click', () => openPiece(col, piece));
        grid.appendChild(card);
      });

      root.appendChild(section);
    });

  runReveals();
}

/* ---------- reveal ao scroll ---------- */
function runReveals() {
  const els = document.querySelectorAll('[data-reveal]:not(.in)');
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    els.forEach((el) => {
      ScrollTrigger.create({
        trigger: el, start: 'top 90%',
        onEnter: () => el.classList.add('in'), once: true,
      });
    });
    ScrollTrigger.refresh();
  } else {
    els.forEach((el) => el.classList.add('in'));
  }
}

/* ---------- abrir / fechar ficha ---------- */
function openPiece(collection, piece) {
  MODAL.collection = collection;
  MODAL.piece = piece;
  MODAL.imgIndex = 0;
  MODAL.sizeIndex = 0;
  fillModal();
  document.getElementById('piece-modal').hidden = false;
  document.body.classList.add('modal-open');
}
function closePiece() {
  document.getElementById('piece-modal').hidden = true;
  document.body.classList.remove('modal-open');
}

function fillModal() {
  const lang = getLang();
  const { piece, collection: col } = MODAL;
  if (!piece) return;

  document.getElementById('m-collection').textContent = col.name;
  document.getElementById('m-name').textContent = piece.name[lang];
  document.getElementById('m-desc').textContent = piece.desc[lang];

  // carrossel
  const track = document.getElementById('car-track');
  track.innerHTML = piece.images
    .map((src) => `<div class="car-slide"><img src="${src}" alt="${piece.name[lang]}"></div>`)
    .join('');
  const dots = document.getElementById('car-dots');
  dots.innerHTML = piece.images
    .map((_, i) => `<button class="dot${i === 0 ? ' on' : ''}" data-i="${i}"></button>`)
    .join('');
  dots.querySelectorAll('.dot').forEach((d) =>
    d.addEventListener('click', () => goImg(parseInt(d.dataset.i, 10)))
  );
  const multi = piece.images.length > 1;
  document.getElementById('car-prev').style.display = multi ? '' : 'none';
  document.getElementById('car-next').style.display = multi ? '' : 'none';
  dots.style.display = multi ? '' : 'none';
  goImg(0);

  // tamanhos
  const sizesEl = document.getElementById('m-sizes');
  sizesEl.innerHTML = piece.sizes
    .map((s, i) => `<button class="size-opt${i === 0 ? ' on' : ''}" data-i="${i}">${s.label[lang]}</button>`)
    .join('');
  sizesEl.querySelectorAll('.size-opt').forEach((b) =>
    b.addEventListener('click', () => selectSize(parseInt(b.dataset.i, 10)))
  );

  // incluído / produção / material
  const inc = document.getElementById('m-included');
  inc.innerHTML = ((col.included && col.included[lang]) || []).map((x) => `<li>${x}</li>`).join('');
  document.getElementById('m-production').textContent = (col.productionTime && col.productionTime[lang]) || '—';
  document.getElementById('m-material').textContent = (col.material && col.material[lang]) || '—';

  selectSize(0);
}

function goImg(i) {
  const n = MODAL.piece.images.length;
  MODAL.imgIndex = (i + n) % n;
  document.getElementById('car-track').style.transform = `translateX(-${MODAL.imgIndex * 100}%)`;
  document.querySelectorAll('#car-dots .dot').forEach((d, idx) =>
    d.classList.toggle('on', idx === MODAL.imgIndex)
  );
}

function selectSize(i) {
  const { piece } = MODAL;
  MODAL.sizeIndex = i;
  document.querySelectorAll('#m-sizes .size-opt').forEach((b, idx) =>
    b.classList.toggle('on', idx === i)
  );
  const size = piece.sizes[i];
  document.getElementById('m-price').textContent = money(size.price);
}

/* ---------- adicionar a peça escolhida (tamanho activo) ao carrinho ---------- */
function addModalToCart() {
  const lang = getLang();
  const { piece, collection: col, sizeIndex } = MODAL;
  if (!piece) return;
  const size = piece.sizes[sizeIndex];
  Cart.add({
    colId: col.id,
    colName: col.name,
    pieceId: piece.id,
    pieceName: piece.name[lang],
    sizeId: size.id,
    sizeLabel: size.label[lang],
    price: size.price,
    image: piece.images[0],
  });
  closePiece();
  openCart();
}

/* ---------- ligações ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initFilterFromURL();
  renderShop();
  openPieceFromURL();

  document.getElementById('car-prev').addEventListener('click', () => goImg(MODAL.imgIndex - 1));
  document.getElementById('car-next').addEventListener('click', () => goImg(MODAL.imgIndex + 1));

  document.querySelectorAll('#piece-modal [data-close]').forEach((el) =>
    el.addEventListener('click', closePiece)
  );
  document.getElementById('m-add-cart').addEventListener('click', addModalToCart);
  document.addEventListener('keydown', (e) => {
    if (document.getElementById('piece-modal').hidden) return;
    if (e.key === 'Escape') closePiece();
    if (e.key === 'ArrowLeft') goImg(MODAL.imgIndex - 1);
    if (e.key === 'ArrowRight') goImg(MODAL.imgIndex + 1);
  });

  // swipe no telemóvel
  const track = document.getElementById('car-track');
  let x0 = null;
  track.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) goImg(MODAL.imgIndex + (dx < 0 ? 1 : -1));
    x0 = null;
  });
});

// re-desenhar quando muda o idioma
document.addEventListener('auron:langchange', () => {
  renderShop();
  if (!document.getElementById('piece-modal').hidden) fillModal();
});
