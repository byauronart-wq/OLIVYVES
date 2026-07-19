/* ============================================================
   AURON — CHECKOUT
   ------------------------------------------------------------
   Envia o carrinho para a função serverless (checkout-api/) que
   cria uma sessão Stripe Checkout e devolve o URL de pagamento.

   Enquanto CONFIG.order.checkoutApi estiver vazio (antes do deploy
   do backend), cai num email de recurso com o carrinho completo —
   já suporta vários artigos, ao contrário do fluxo antigo.
   ============================================================ */

async function startCheckout() {
  const items = Cart.items();
  if (!items.length) return;

  const cfg = window.CONFIG.order;
  const lang = getLang();

  if (!cfg.checkoutApi) {
    fallbackOrderByEmail(items, cfg, lang);
    return;
  }

  const btn = document.getElementById('cart-checkout');
  const originalLabel = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = t('cart.processing'); }

  try {
    const res = await fetch(cfg.checkoutApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currency: Currency.get(),
        lang,
        items: items.map((i) => ({
          pieceId: i.pieceId,
          pieceName: i.pieceName,
          sizeId: i.sizeId,
          sizeLabel: i.sizeLabel,
          price: i.price,
          qty: i.qty,
          image: i.image,
        })),
      }),
    });
    if (!res.ok) throw new Error('checkout request failed');
    const data = await res.json();
    if (!data.url) throw new Error('missing checkout url');
    window.location.href = data.url;
  } catch (err) {
    console.error('[checkout]', err);
    alert(t('cart.error'));
    if (btn) { btn.disabled = false; btn.textContent = originalLabel; }
  }
}

function fallbackOrderByEmail(items, cfg, lang) {
  const totalEUR = Cart.totalEUR();
  const lines = items
    .map((i) => `• ${i.pieceName} — ${i.sizeLabel} × ${i.qty} — ${Currency.format(i.price * i.qty)}`)
    .join('\n');
  const intro = lang === 'pt' ? 'Olá! Gostava de encomendar:\n\n' : "Hi! I'd like to order:\n\n";
  const totalLine = `\n\n${lang === 'pt' ? 'Total' : 'Total'}: ${Currency.format(totalEUR)}`;
  const body = intro + lines + totalLine;
  const subject = lang === 'pt' ? 'OLIV YVES — Encomenda' : 'OLIV YVES — Order';
  window.location.href = `mailto:${cfg.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

window.startCheckout = startCheckout;
