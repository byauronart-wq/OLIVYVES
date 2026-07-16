/* ============================================================
   OLIV YVES — CURSOR AURA (Home)
   ------------------------------------------------------------
   Substitui o cursor nativo por um brush suave, em degradê,
   que segue o rato com um leve atraso elástico — a mesma
   linguagem visual das auras AURON, aplicada à interação.
   Só corre com rato real (pointer:fine); em touch não faz nada.
   ============================================================ */

(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'aura-cursor';
  document.body.appendChild(cursor);
  document.body.classList.add('aura-cursor-active');

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let x = mx;
  let y = my;
  let active = false;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    if (!active) { x = mx; y = my; }
    active = true;
    cursor.classList.add('on');
  });
  window.addEventListener('mouseleave', () => cursor.classList.remove('on'));

  function loop() {
    x += (mx - x) * 0.14;
    y += (my - y) * 0.14;
    cursor.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(loop);
  }
  loop();
})();
