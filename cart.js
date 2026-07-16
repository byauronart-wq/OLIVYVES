/* ============================================================
   AURON — CARRINHO + MOEDA
   ------------------------------------------------------------
   Carrinho multi-artigo guardado no browser (localStorage).
   Preços do catálogo estão sempre em EUR; a moeda escolhida
   (EUR/USD) só afeta o que se MOSTRA — o valor cobrado a sério
   é sempre recalculado no servidor no momento do checkout
   (ver checkout-api/), nunca confiado ao browser.
   ============================================================ */

const CART_KEY = 'auronCart';
const CURRENCY_KEY = 'auronCurrency';

/* ---- moeda ---- */
const Currency = {
  get() {
    const saved = localStorage.getItem(CURRENCY_KEY);
    if (saved) return saved;
    return (window.CONFIG.currency && window.CONFIG.currency.base) || 'EUR';
  },
  set(code) {
    localStorage.setItem(CURRENCY_KEY, code);
    document.dispatchEvent(new CustomEvent('auron:currencychange', { detail: { code } }));
  },
  convert(eurAmount) {
    const cfg = window.CONFIG.currency || { rates: { EUR: 1 } };
    const rate = cfg.rates[this.get()] || 1;
    return eurAmount * rate;
  },
  format(eurAmount) {
    const cfg = window.CONFIG.currency || { symbols: { EUR: '€' } };
    const code = this.get();
    const symbol = (cfg.symbols && cfg.symbols[code]) || code;
    const val = Math.round(this.convert(eurAmount) * 100) / 100;
    const str = Number.isInteger(val) ? String(val) : val.toFixed(2);
    return `${symbol}${str}`;
  },
};

/* ---- carrinho ---- */
const Cart = {
  items() {
    try {
      const raw = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(raw) ? raw : [];
    } catch (e) { return []; }
  },
  save(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    document.dispatchEvent(new CustomEvent('auron:cartchange', { detail: { items } }));
  },
  // entry: { colId, colName, pieceId, pieceName, sizeId, sizeLabel, price (EUR), image }
  add(entry) {
    const items = this.items();
    const existing = items.find((i) => i.pieceId === entry.pieceId && i.sizeId === entry.sizeId);
    if (existing) existing.qty += 1;
    else items.push({ ...entry, qty: 1 });
    this.save(items);
  },
  setQty(idx, qty) {
    const items = this.items();
    if (!items[idx]) return;
    if (qty <= 0) items.splice(idx, 1);
    else items[idx].qty = qty;
    this.save(items);
  },
  remove(idx) {
    const items = this.items();
    items.splice(idx, 1);
    this.save(items);
  },
  clear() { this.save([]); },
  count() { return this.items().reduce((n, i) => n + i.qty, 0); },
  totalEUR() { return this.items().reduce((sum, i) => sum + i.price * i.qty, 0); },
};

window.Currency = Currency;
window.Cart = Cart;

/* ---- UI: badge, toggle de moeda, drawer ---- */
function renderCartBadge() {
  document.querySelectorAll('[data-cart-count]').forEach((el) => {
    const n = Cart.count();
    el.textContent = n;
    el.hidden = n === 0;
  });
}

function renderCurrencyToggle() {
  document.querySelectorAll('[data-currency-toggle]').forEach((btn) => {
    btn.querySelectorAll('[data-cur]').forEach((s) => {
      s.classList.toggle('on', s.getAttribute('data-cur') === Currency.get());
    });
  });
}

function renderCartDrawer() {
  const list = document.getElementById('cart-list');
  if (!list) return; // página sem carrinho no header
  const items = Cart.items();

  list.innerHTML = items.length
    ? items.map((it, idx) => `
      <div class="cart-item">
        <img src="${it.image}" alt="${it.pieceName}">
        <div class="cart-item-info">
          <p class="cart-item-name">${it.pieceName}</p>
          <p class="cart-item-size">${it.sizeLabel}</p>
          <div class="cart-item-qty">
            <button data-qty-down="${idx}" aria-label="-">−</button>
            <span>${it.qty}</span>
            <button data-qty-up="${idx}" aria-label="+">+</button>
          </div>
        </div>
        <div class="cart-item-side">
          <span class="cart-item-price">${Currency.format(it.price * it.qty)}</span>
          <button class="cart-item-remove" data-remove="${idx}" aria-label="${t('cart.remove')}">×</button>
        </div>
      </div>
    `).join('')
    : `<p class="cart-empty">${t('cart.empty')}</p>`;

  const totalEUR = Cart.totalEUR();
  const subtotalEl = document.getElementById('cart-subtotal');
  if (subtotalEl) subtotalEl.textContent = Currency.format(totalEUR);

  const checkoutBtn = document.getElementById('cart-checkout');
  if (checkoutBtn) checkoutBtn.disabled = items.length === 0;

  list.querySelectorAll('[data-qty-up]').forEach((b) =>
    b.addEventListener('click', () => { const i = +b.dataset.qtyUp; Cart.setQty(i, Cart.items()[i].qty + 1); })
  );
  list.querySelectorAll('[data-qty-down]').forEach((b) =>
    b.addEventListener('click', () => { const i = +b.dataset.qtyDown; Cart.setQty(i, Cart.items()[i].qty - 1); })
  );
  list.querySelectorAll('[data-remove]').forEach((b) =>
    b.addEventListener('click', () => Cart.remove(+b.dataset.remove))
  );
}

function openCart() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;
  renderCartDrawer();
  drawer.hidden = false;
  document.body.classList.add('cart-open');
}
function closeCart() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;
  drawer.hidden = true;
  document.body.classList.remove('cart-open');
}
window.openCart = openCart;
window.closeCart = closeCart;

document.addEventListener('DOMContentLoaded', () => {
  renderCartBadge();
  renderCurrencyToggle();

  document.querySelectorAll('[data-cart-open]').forEach((b) => b.addEventListener('click', openCart));
  document.querySelectorAll('#cart-drawer [data-close]').forEach((b) => b.addEventListener('click', closeCart));
  document.addEventListener('keydown', (e) => {
    const drawer = document.getElementById('cart-drawer');
    if (drawer && !drawer.hidden && e.key === 'Escape') closeCart();
  });

  document.querySelectorAll('[data-currency-toggle] [data-cur]').forEach((el) => {
    el.addEventListener('click', () => Currency.set(el.getAttribute('data-cur')));
  });

  const checkoutBtn = document.getElementById('cart-checkout');
  if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
    if (window.startCheckout) window.startCheckout();
  });
});

document.addEventListener('auron:cartchange', () => { renderCartBadge(); renderCartDrawer(); });
document.addEventListener('auron:currencychange', () => {
  renderCurrencyToggle();
  renderCartDrawer();
  if (typeof renderShop === 'function') renderShop();
  if (typeof MODAL !== 'undefined' && MODAL.piece && typeof selectSize === 'function') selectSize(MODAL.sizeIndex);
});
document.addEventListener('auron:langchange', () => renderCartDrawer());
