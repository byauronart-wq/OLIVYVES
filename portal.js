/* ============================================================
   OLIVEIRA — PORTAL
   Desenha um cartão por coleção (a partir de window.CATALOG).
   Coleção em modo 'imersivo' → abre a sua página própria.
   Coleção em modo 'grelha'  → abre direto a loja filtrada.
   ============================================================ */

/* Pré-visualização de rascunho vinda do editor (index.html?draft=1) */
(function loadDraftCatalog() {
  const params = new URLSearchParams(location.search);
  if (params.get('draft') !== '1') return;
  try {
    const d = JSON.parse(localStorage.getItem('auronDraftCatalog'));
    if (d && Array.isArray(d.collections)) window.CATALOG = d;
  } catch (e) { /* ignora rascunho inválido */ }
})();

function collectionCover(col) {
  // usa a 1ª imagem da 1ª peça como capa da coleção
  const p = col.pieces && col.pieces[0];
  return (p && p.images && p.images[0]) || '';
}

function renderCollections() {
  const root = document.getElementById('collections-root');
  if (!root || !window.CATALOG) return;
  const lang = getLang();
  root.innerHTML = '';

  window.CATALOG.collections.forEach((col) => {
    const href = col.mode === 'imersivo' && col.page
      ? col.page
      : 'loja.html?col=' + col.id;

    const a = document.createElement('a');
    a.className = 'collection-card';
    a.href = href;
    a.innerHTML = `
      <div class="cc-img"><img src="${collectionCover(col)}" alt="${col.name}" loading="lazy"></div>
      <div class="cc-body">
        <h2>${col.name}</h2>
        <p>${(col.tagline && col.tagline[lang]) || ''}</p>
        <span class="cc-enter">${t('portal.view')} →</span>
      </div>
    `;
    root.appendChild(a);
  });
}

document.addEventListener('DOMContentLoaded', renderCollections);
document.addEventListener('auron:langchange', renderCollections);
