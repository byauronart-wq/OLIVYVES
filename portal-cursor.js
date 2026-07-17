/* ============================================================
   OLIV YVES — CURSOR AURA (Home)
   ------------------------------------------------------------
   Substitui o cursor nativo por um rasto de partículas em canvas —
   sem forma fixa, como fumo ou água, que se desfaz devagar atrás
   do rato. A cor mistura-se entre as duas cores da marca consoante
   a posição horizontal do rato.
   Só corre com rato real (pointer:fine); em touch não faz nada.
   ============================================================ */

(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'aura-cursor-canvas';
  document.body.appendChild(canvas);
  document.body.classList.add('aura-cursor-active');
  const ctx = canvas.getContext('2d');

  const COLOR_A = [217, 143, 90];  // --accent
  const COLOR_B = [127, 123, 216]; // --accent-2

  let vw = window.innerWidth;
  let vh = window.innerHeight;

  function resize() {
    vw = window.innerWidth;
    vh = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = vw * dpr;
    canvas.height = vh * dpr;
    canvas.style.width = vw + 'px';
    canvas.style.height = vh + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];

  function spawn(x, y) {
    const t = Math.max(0, Math.min(1, x / vw));
    const r = Math.round(COLOR_A[0] + (COLOR_B[0] - COLOR_A[0]) * t);
    const g = Math.round(COLOR_A[1] + (COLOR_B[1] - COLOR_A[1]) * t);
    const b = Math.round(COLOR_A[2] + (COLOR_B[2] - COLOR_A[2]) * t);
    particles.push({
      x: x + (Math.random() - 0.5) * 26,
      y: y + (Math.random() - 0.5) * 26,
      r: 70 + Math.random() * 90,
      life: 1,
      decay: 0.014 + Math.random() * 0.012,
      color: `${r},${g},${b}`,
    });
    if (particles.length > 160) particles.splice(0, particles.length - 160);
  }

  window.addEventListener('mousemove', (e) => {
    canvas.classList.add('on');
    spawn(e.clientX, e.clientY);
  });
  window.addEventListener('mouseleave', () => canvas.classList.remove('on'));

  function loop() {
    // preenchimento translúcido em vez de limpar — com mix-blend-mode:screen
    // o preto não escurece a página por baixo, só desvanece o próprio rasto
    // do canvas de forma gradual (efeito de fumo a dissipar-se).
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(0,0,0,.07)';
    ctx.fillRect(0, 0, vw, vh);

    ctx.globalCompositeOperation = 'lighter';
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      grad.addColorStop(0, `rgba(${p.color},${0.18 * p.life})`);
      grad.addColorStop(1, `rgba(${p.color},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(loop);
  }
  loop();
})();
