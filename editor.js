/* ============================================================
   OLIVEIRA — EDITOR DE COLEÇÕES (ferramenta interna)
   Cria/edita coleções e peças por formulário, sem tocar em código.
   Guarda o trabalho no browser; exporta um data.js pronto a publicar.
   ============================================================ */

const DRAFT_KEY = 'auronDraftCatalog';

// tamanhos por defeito para uma coleção nova (podes mudar preços)
const DEFAULT_SIZES = [
  { id: 'a4', label: { pt: 'A4 · 21 × 29,7 cm', en: 'A4 · 21 × 29.7 cm' }, price: 45, stripe: '' },
  { id: 'a3', label: { pt: 'A3 · 29,7 × 42 cm', en: 'A3 · 29.7 × 42 cm' }, price: 69, stripe: '' },
  { id: 'a2', label: { pt: 'A2 · 42 × 59,4 cm', en: 'A2 · 42 × 59.4 cm' }, price: 99, stripe: '' },
];

const clone = (o) => JSON.parse(JSON.stringify(o));

function slugify(s) {
  return (s || '')
    .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'colecao';
}

// estado de trabalho
let EDIT = { collections: [] };

function loadState() {
  const draft = localStorage.getItem(DRAFT_KEY);
  if (draft) {
    try {
      const d = JSON.parse(draft);
      if (d && Array.isArray(d.collections)) { EDIT = d; return; }
    } catch (e) { /* ignora */ }
  }
  EDIT = { collections: clone((window.CATALOG && window.CATALOG.collections) || []) };
}

let _saveT = null;
function scheduleSave() { clearTimeout(_saveT); _saveT = setTimeout(saveDraft, 300); }
function saveDraft() { localStorage.setItem(DRAFT_KEY, JSON.stringify(EDIT)); flashSaved(); }
function flashSaved() {
  const el = document.getElementById('save-state');
  if (!el) return;
  el.textContent = 'Guardado ✓';
  clearTimeout(el._t); el._t = setTimeout(() => (el.textContent = ''), 1400);
}

function setLang(obj, key, lang, val) {
  obj[key] = obj[key] || { pt: '', en: '' };
  obj[key][lang] = val;
}

/* ---------- criar coleção / peça ---------- */
function newCollection() {
  const n = EDIT.collections.length + 1;
  const base = 'colecao-' + n;
  EDIT.collections.push({
    id: uniqueId(base),
    name: 'Nova coleção ' + n,
    mode: 'grelha',
    tagline: { pt: '', en: '' },
    description: { pt: '', en: '' },
    theme: { accent: '#d98f5a' },
    material: { pt: '', en: '' },
    edition: 25,
    productionTime: { pt: '2 a 3 semanas', en: '2 to 3 weeks' },
    included: { pt: [], en: [] },
    sizes: clone(DEFAULT_SIZES),
    pieces: [],
  });
  saveDraft(); render();
}

function uniqueId(base) {
  let id = slugify(base), i = 2;
  const taken = new Set(EDIT.collections.map((c) => c.id));
  while (taken.has(id)) { id = slugify(base) + '-' + i; i++; }
  return id;
}

function newPiece(col) {
  col.pieces.push({
    id: 'peca-' + (col.pieces.length + 1),
    name: { pt: '', en: '' },
    desc: { pt: '', en: '' },
    images: [],
  });
  saveDraft(); render();
}

/* ---------- imagens (comprimir + embeber) ---------- */
function compressImage(file, maxDim = 1400, quality = 0.82) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const cw = Math.round(img.width * scale), ch = Math.round(img.height * scale);
      const c = document.createElement('canvas');
      c.width = cw; c.height = ch;
      c.getContext('2d').drawImage(img, 0, 0, cw, ch);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg', quality));
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });
}

async function addImages(col, piece, files) {
  for (const f of files) {
    const data = await compressImage(f);
    if (data) piece.images.push(data);
  }
  saveDraft(); render();
}

/* ---------- render ---------- */
function h(html) { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild; }
const esc = (s) => String(s == null ? '' : s).replace(/"/g, '&quot;');

function render() {
  const root = document.getElementById('editor-root');
  root.innerHTML = '';

  EDIT.collections.forEach((col, ci) => {
    const card = document.createElement('section');
    card.className = 'ed-col';
    card.innerHTML = `
      <div class="ed-col-head">
        <input class="ed-title" data-c="${ci}" data-field="cname" value="${esc(col.name)}" placeholder="Nome da coleção">
        <span class="ed-id">id: ${col.id}</span>
        <button class="ed-btn danger" data-action="del-col" data-c="${ci}">Remover coleção</button>
      </div>

      <div class="ed-grid">
        <label>Frase curta (PT)<input data-c="${ci}" data-field="tagline" data-lang="pt" value="${esc(col.tagline?.pt)}"></label>
        <label>Frase curta (EN, opcional)<input data-c="${ci}" data-field="tagline" data-lang="en" value="${esc(col.tagline?.en)}"></label>
        <label class="wide">Descrição (PT)<textarea data-c="${ci}" data-field="cdesc" data-lang="pt" rows="2">${esc(col.description?.pt)}</textarea></label>
        <label class="wide">Descrição (EN, opcional)<textarea data-c="${ci}" data-field="cdesc" data-lang="en" rows="2">${esc(col.description?.en)}</textarea></label>
        <label>Modo<select data-c="${ci}" data-field="mode">
          <option value="grelha"${col.mode === 'grelha' ? ' selected' : ''}>Grelha (loja simples)</option>
          <option value="imersivo"${col.mode === 'imersivo' ? ' selected' : ''}>Imersivo (página própria)</option>
        </select></label>
        <label>Cor de destaque<input type="color" data-c="${ci}" data-field="accent" value="${esc(col.theme?.accent || '#d98f5a')}"></label>
      </div>

      <div class="ed-sizes">
        <span class="ed-sub">Tamanhos e preços</span>
        ${col.sizes.map((s, si) => `
          <div class="ed-size-row">
            <input data-c="${ci}" data-field="sizeLabel" data-si="${si}" value="${esc(s.label?.pt)}" placeholder="Ex: A3 · 29,7 × 42 cm">
            <div class="ed-price">€<input type="number" min="0" data-c="${ci}" data-field="sizePrice" data-si="${si}" value="${esc(s.price)}"></div>
          </div>`).join('')}
      </div>

      <div class="ed-pieces"></div>
      <button class="ed-btn" data-action="add-piece" data-c="${ci}">+ Adicionar peça</button>
    `;

    const piecesEl = card.querySelector('.ed-pieces');
    col.pieces.forEach((p, pi) => {
      const pc = document.createElement('div');
      pc.className = 'ed-piece';
      pc.innerHTML = `
        <div class="ed-piece-head">
          <strong>Peça ${pi + 1}</strong>
          <button class="ed-btn danger small" data-action="del-piece" data-c="${ci}" data-p="${pi}">Remover</button>
        </div>
        <div class="ed-grid">
          <label>Nome (PT)<input data-c="${ci}" data-p="${pi}" data-field="pname" data-lang="pt" value="${esc(p.name?.pt)}"></label>
          <label>Nome (EN, opcional)<input data-c="${ci}" data-p="${pi}" data-field="pname" data-lang="en" value="${esc(p.name?.en)}"></label>
          <label class="wide">Descrição (PT)<textarea data-c="${ci}" data-p="${pi}" data-field="pdesc" data-lang="pt" rows="2">${esc(p.desc?.pt)}</textarea></label>
          <label class="wide">Descrição (EN, opcional)<textarea data-c="${ci}" data-p="${pi}" data-field="pdesc" data-lang="en" rows="2">${esc(p.desc?.en)}</textarea></label>
        </div>
        <div class="ed-imgs">
          ${p.images.map((src, idx) => `
            <div class="ed-thumb"><img src="${src}" alt=""><button data-action="del-img" data-c="${ci}" data-p="${pi}" data-idx="${idx}" title="Remover">✕</button></div>`).join('')}
          <label class="ed-add-img">+ imagens
            <input type="file" accept="image/*" multiple data-action="add-img" data-c="${ci}" data-p="${pi}" hidden>
          </label>
        </div>
      `;
      piecesEl.appendChild(pc);
    });

    root.appendChild(card);
  });

  updateCount();
}

function updateCount() {
  const nc = EDIT.collections.length;
  const np = EDIT.collections.reduce((a, c) => a + c.pieces.length, 0);
  const el = document.getElementById('ed-count');
  if (el) el.textContent = `${nc} coleção(ões) · ${np} peça(s)`;
}

/* ---------- exportar data.js ---------- */
function normalizeForExport() {
  const out = clone(EDIT);
  out.collections.forEach((col) => {
    col.id = col.id || slugify(col.name);
    ['tagline', 'description', 'material', 'productionTime'].forEach((k) => {
      if (col[k]) { col[k].pt = col[k].pt || ''; col[k].en = col[k].en || col[k].pt; }
    });
    (col.sizes || []).forEach((s) => {
      s.label = s.label || { pt: '', en: '' };
      s.label.en = s.label.en || s.label.pt;
      s.price = Number(s.price) || 0;
    });
    (col.pieces || []).forEach((p, i) => {
      p.id = p.id || 'peca-' + (i + 1);
      p.name = p.name || { pt: '', en: '' }; p.name.en = p.name.en || p.name.pt;
      p.desc = p.desc || { pt: '', en: '' }; p.desc.en = p.desc.en || p.desc.pt;
    });
  });
  return out;
}

function buildDataJs() {
  const cfg = window.CONFIG || { order: {}, chat: {} };
  const o = cfg.order || {}, ch = cfg.chat || {};
  const data = normalizeForExport();

  const header =
`/* ============================================================
   OLIVEIRA — DADOS DO SITE
   Gerado pelo Editor de Coleções. Substitui o data.js do site
   por este ficheiro e faz commit/push para publicar.
   ============================================================ */

`;
  const config =
`window.CONFIG = {
  brand: ${JSON.stringify(cfg.brand || 'OLIVEIRA')},
  domain: ${JSON.stringify(cfg.domain || 'byauron.art')},
  order: {
    mode: ${JSON.stringify(o.mode || 'whatsapp')},            // 'whatsapp' | 'email' | 'stripe'
    whatsapp: ${JSON.stringify(o.whatsapp || '')},        // nº internacional só dígitos; vazio = usa email
    email: ${JSON.stringify(o.email || '')},
    depositPct: ${Number(o.depositPct) || 0},             // sinal %
    stripeLink: ${JSON.stringify(o.stripeLink || '')},
  },
  chat: {
    tawkSrc: ${JSON.stringify(ch.tawkSrc || '')},         // embed.tawk.to/xxx/yyy p/ chat ao vivo; vazio = botão flutuante
  },
};

`;
  const catalog = `window.CATALOG = ${JSON.stringify({ collections: data.collections }, null, 2)};\n\n`;
  const helper =
`window.getCollection = function (id) {
  return window.CATALOG.collections.find(function (c) { return c.id === id; }) || null;
};
`;
  return header + config + catalog + helper;
}

function exportDataJs() {
  const text = buildDataJs();
  const blob = new Blob([text], { type: 'text/javascript' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'data.js';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/* ---------- eventos ---------- */
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  render();

  const root = document.getElementById('editor-root');

  // edição de texto (sem re-render, para não perder o foco)
  function onEdit(e) {
    const t = e.target;
    if (t.dataset.c == null) return;
    const col = EDIT.collections[+t.dataset.c];
    if (!col) return;
    const f = t.dataset.field, lang = t.dataset.lang;
    const pi = t.dataset.p != null ? +t.dataset.p : null;
    const si = t.dataset.si != null ? +t.dataset.si : null;

    if (pi != null) {
      const piece = col.pieces[pi];
      if (f === 'pname') setLang(piece, 'name', lang, t.value);
      else if (f === 'pdesc') setLang(piece, 'desc', lang, t.value);
    } else if (f === 'cname') { col.name = t.value; }
    else if (f === 'tagline') setLang(col, 'tagline', lang, t.value);
    else if (f === 'cdesc') setLang(col, 'description', lang, t.value);
    else if (f === 'mode') col.mode = t.value;
    else if (f === 'accent') { col.theme = col.theme || {}; col.theme.accent = t.value; }
    else if (f === 'sizeLabel') { col.sizes[si].label = { pt: t.value, en: t.value }; }
    else if (f === 'sizePrice') { col.sizes[si].price = Number(t.value) || 0; }
    scheduleSave();
    if (f === 'cname') { const idEl = t.closest('.ed-col-head').querySelector('.ed-id'); /* id fica estável */ }
  }
  root.addEventListener('input', onEdit);
  root.addEventListener('change', (e) => {
    if (e.target.dataset.action === 'add-img') {
      const col = EDIT.collections[+e.target.dataset.c];
      addImages(col, col.pieces[+e.target.dataset.p], Array.from(e.target.files || []));
    } else onEdit(e);
  });

  // botões
  root.addEventListener('click', (e) => {
    const a = e.target.closest('[data-action]');
    if (!a) return;
    const act = a.dataset.action;
    const col = a.dataset.c != null ? EDIT.collections[+a.dataset.c] : null;
    if (act === 'del-col') { if (confirm('Remover esta coleção?')) { EDIT.collections.splice(+a.dataset.c, 1); saveDraft(); render(); } }
    else if (act === 'add-piece') { newPiece(col); }
    else if (act === 'del-piece') { col.pieces.splice(+a.dataset.p, 1); saveDraft(); render(); }
    else if (act === 'del-img') { col.pieces[+a.dataset.p].images.splice(+a.dataset.idx, 1); saveDraft(); render(); }
  });

  document.getElementById('btn-add-col').addEventListener('click', newCollection);
  document.getElementById('btn-preview').addEventListener('click', () => {
    saveDraft();
    window.open('loja.html?draft=1', '_blank');
  });
  document.getElementById('btn-preview-portal').addEventListener('click', () => {
    saveDraft();
    window.open('index.html?draft=1', '_blank');
  });
  document.getElementById('btn-export').addEventListener('click', exportDataJs);
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (confirm('Descartar o rascunho e recomeçar a partir do site atual?')) {
      localStorage.removeItem(DRAFT_KEY);
      location.reload();
    }
  });
});
