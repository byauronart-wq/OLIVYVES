/* ============================================================
   OLIV YVES — CURSOR AURA (Home)
   ------------------------------------------------------------
   Substitui o cursor nativo por um traço fluido, sem forma fixa,
   que pinta atrás do rato como tinta/água — sem brilho aditivo,
   cor a misturar-se ao longo de um percurso de 3 tons da marca
   consoante a posição horizontal.
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

  // laranja (--accent) → rosa quente → violeta (--accent-2): mais variação de
  // cor que um simples degradê a dois tons, sem sair da paleta da marca.
  const STOPS = [
    [217, 143, 90],
    [199, 100, 120],
    [127, 123, 216],
  ];

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

  function colorAt(x) {
    const t = Math.max(0, Math.min(1, x / vw)) * (STOPS.length - 1);
    const i = Math.min(STOPS.length - 2, Math.floor(t));
    const f = t - i;
    const a = STOPS[i];
    const b = STOPS[i + 1];
    return [
      Math.round(a[0] + (b[0] - a[0]) * f),
      Math.round(a[1] + (b[1] - a[1]) * f),
      Math.round(a[2] + (b[2] - a[2]) * f),
    ];
  }

  const particles = [];

  function stamp(x, y) {
    const [r, g, b] = colorAt(x);
    particles.push({
      x: x + (Math.random() - 0.5) * 10,
      y: y + (Math.random() - 0.5) * 10,
      r: 34 + Math.random() * 26,
      life: 1,
      decay: 0.03 + Math.random() * 0.02,
      color: `${r},${g},${b}`,
    });
    if (particles.length > 220) particles.splice(0, particles.length - 220);
  }

  let lastX = null;
  let lastY = null;

  window.addEventListener('mousemove', (e) => {
    canvas.classList.add('on');
    const x = e.clientX;
    const y = e.clientY;
    if (lastX === null) {
      stamp(x, y);
    } else {
      // interpola pontos ao longo do movimento — sem isto, um rato rápido
      // deixa "buracos" no traço em vez de uma pincelada contínua e fluida.
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);
      const steps = Math.min(24, Math.max(1, Math.ceil(dist / 7)));
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        stamp(lastX + dx * t, lastY + dy * t);
      }
    }
    lastX = x;
    lastY = y;
  });
  window.addEventListener('mouseleave', () => {
    canvas.classList.remove('on');
    lastX = null;
    lastY = null;
  });

  function loop() {
    // limpa por completo a cada frame — sem mistura aditiva, sem "brilho";
    // o desvanecer vem só do decay de cada partícula, não de um rasto do canvas.
    ctx.clearRect(0, 0, vw, vh);
    ctx.globalCompositeOperation = 'source-over';

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life -= p.decay;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      grad.addColorStop(0, `rgba(${p.color},${0.4 * p.life})`);
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
