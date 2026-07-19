// AURON — scroll feel: smooth scroll (Lenis) + reveals/parallax (GSAP ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- galeria gerada a partir de data.js, agrupada por FORMATO ---
  // Uma composição cheia de ecrã por FORMATO (não por peça) — dentro de
  // cada formato, uma seta lateral troca entre as peças desse formato,
  // sem sair da composição nem alongar o scroll. Adicionar uma peça em
  // data.js entra sozinha no formato certo (campo "shape" da peça).
  // Tem de correr ANTES do registo dos [data-reveal] mais abaixo, senão as
  // cenas novas ficavam sem animação de entrada.
  renderGalleryScenes();

  function renderGalleryScenes() {
    const container = document.getElementById('galeria');
    const col = window.getCollection && getCollection('auron');
    if (!container || !col) return;
    const anchor = container.querySelector('.gallery-cta');
    const lang = () => (typeof getLang === 'function' ? getLang() : 'pt');

    // agrupa as peças pelo campo "shape", respeitando shapeOrder; qualquer
    // peça com um "shape" que não esteja em shapeOrder ainda aparece (no
    // fim, com o próprio valor como rótulo) em vez de desaparecer em
    // silêncio — mais fácil de notar e corrigir do que perder uma peça.
    const byShape = new Map();
    col.pieces.forEach((p) => {
      if (!p.gallery) return;
      const key = p.shape || '?';
      if (!byShape.has(key)) byShape.set(key, []);
      byShape.get(key).push(p);
    });
    const order = (col.shapeOrder || []).filter((k) => byShape.has(k));
    [...byShape.keys()].forEach((k) => { if (!order.includes(k)) order.push(k); });

    const groupUpdaters = [];

    order.forEach((shapeKey) => {
      const pieces = byShape.get(shapeKey);
      const labelMap = (col.shapeLabels && col.shapeLabels[shapeKey]) || null;

      const scene = document.createElement('div');
      scene.className = 'scene';

      const eyebrow = document.createElement('p');
      eyebrow.className = 'scene-eyebrow';

      const prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.className = 'scene-arrow prev';
      prevBtn.setAttribute('aria-label', 'Peça anterior');
      prevBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>';

      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'scene-arrow next';
      nextBtn.setAttribute('aria-label', 'Peça seguinte');
      nextBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';

      const piece = document.createElement('div');
      piece.className = 'scene-piece';

      const artWrap = document.createElement('div');
      artWrap.className = 'scene-art-wrap';
      artWrap.setAttribute('data-reveal', '');
      const artLink = document.createElement('a');
      artLink.className = 'scene-art';
      const img = document.createElement('img');
      artLink.appendChild(img);
      artWrap.appendChild(artLink);

      // as setas vivem dentro de "stage", junto com a imagem — o stage
      // encolhe à largura real da imagem (não da secção inteira), por isso
      // as setas ficam sempre coladas à imagem, seja qual for a largura do
      // ecrã, em vez de presas às margens do ecrã.
      const stage = document.createElement('div');
      stage.className = 'scene-stage';
      stage.append(prevBtn, artWrap, nextBtn);

      const text = document.createElement('div');
      text.className = 'scene-text';
      text.setAttribute('data-reveal', '');
      const h3 = document.createElement('h3');
      const cap = document.createElement('p');
      const from = document.createElement('p');
      from.className = 'scene-from';
      const cta = document.createElement('a');
      cta.className = 'scene-cta';
      text.append(h3, cap, from, cta);

      piece.append(stage, text);

      const dots = document.createElement('div');
      dots.className = 'scene-dots';
      const dotEls = pieces.map((_, i) => {
        const d = document.createElement('button');
        d.type = 'button';
        d.className = 'scene-dot';
        d.setAttribute('aria-label', 'Peça ' + (i + 1));
        dots.appendChild(d);
        return d;
      });

      scene.append(eyebrow, piece, dots);
      container.insertBefore(scene, anchor);

      let idx = 0;
      function render() {
        const p = pieces[idx];
        const g = p.gallery;
        const l = lang();
        const shopHref = 'loja.html?col=auron&piece=' + encodeURIComponent(p.id);
        const name = p.name[l] || p.name.pt;

        // "ar" vem do FORMATO (shapeLabels), não da peça — assim a moldura
        // nunca muda de tamanho ao trocar de peça com a seta dentro do
        // mesmo formato.
        scene.style.setProperty('--ar', (labelMap && labelMap.ar) || '4/5');
        eyebrow.textContent = (labelMap && (labelMap[l] || labelMap.pt)) || shapeKey;
        img.src = g.image;
        img.alt = name;
        artLink.href = shopHref;
        artLink.setAttribute('aria-label', name);
        h3.textContent = name;
        cap.textContent = (g.caption && (g.caption[l] || g.caption.pt)) || '';
        if (window.Currency && Array.isArray(p.sizes) && p.sizes.length) {
          const minEUR = Math.min(...p.sizes.map((s) => s.price));
          from.textContent = (typeof t === 'function' ? t('shop.from') : 'desde') + ' ' + Currency.format(minEUR);
        }
        cta.textContent = typeof t === 'function' ? t('scene.cta') : 'Ver na loja →';
        cta.href = shopHref;

        dotEls.forEach((d, i) => d.setAttribute('aria-current', String(i === idx)));
      }
      function go(newIdx) {
        idx = (newIdx + pieces.length) % pieces.length;
        piece.classList.add('fading');
        window.setTimeout(() => {
          render();
          piece.classList.remove('fading');
        }, prefersReduced ? 0 : 180);
      }

      // com 1 peça só no formato, nem seta nem pontos fazem sentido — fica
      // limpo, tal como o resto da composição.
      if (pieces.length < 2) {
        prevBtn.hidden = true;
        nextBtn.hidden = true;
        dots.hidden = true;
      } else {
        prevBtn.addEventListener('click', () => go(idx - 1));
        nextBtn.addEventListener('click', () => go(idx + 1));
        dotEls.forEach((d, i) => d.addEventListener('click', () => go(i)));
      }

      render();
      groupUpdaters.push(render);
    });

    // textos (nome, legenda, rótulo do formato, CTA) seguem o idioma ativo.
    function applyAllTexts() { groupUpdaters.forEach((r) => r()); }
    document.addEventListener('auron:langchange', applyAllTexts);
    document.addEventListener('auron:currencychange', applyAllTexts);
  }

  // --- garantir autoplay do vídeo do hero em mobile ---
  // Safari/iOS por vezes ignora o atributo autoplay (ex: Modo de Poupança de Dados,
  // Baixa Energia) e mostra o botão de play nativo. Forçamos o play aqui e voltamos
  // a tentar no primeiro toque/scroll e sempre que a página volta a ficar visível.
  const heroVideo = document.querySelector('video.hero-bg');
  if (heroVideo) {
    heroVideo.muted = true;
    const tryPlayHero = () => heroVideo.play().catch(() => {});
    tryPlayHero();
    ['touchstart', 'click', 'scroll'].forEach((evt) =>
      document.addEventListener(evt, tryPlayHero, { once: true, passive: true })
    );
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') tryPlayHero();
    });
  }

  // --- smooth scroll ---
  let lenis;
  if (!prefersReduced && window.Lenis) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
  }

  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  if (lenis) {
    // gsap's ticker is the ONLY driver of lenis.raf — running a second
    // manual requestAnimationFrame loop alongside it desyncs Lenis's
    // internal scroll position (page appears to jump into blank space).
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // --- reveal on scroll ---
  document.querySelectorAll('[data-reveal]').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => el.classList.add('in'),
      once: true,
    });
  });

  // --- hero parallax (background drifts slower than scroll) ---
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && !prefersReduced) {
    gsap.to(heroBg, {
      yPercent: 14,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // --- funde o portal-hero (OLIV YVES) com o hero do vídeo AURON ---
  // Sem isto há um corte direto entre a secção escura de entrada e o vídeo.
  // A placa cobre tudo (vídeo, véu, texto) e desvanece enquanto se desce de
  // uma secção para a outra — dura exatamente 1 ecrã (a altura do portal-hero).
  const heroFadeIn = document.querySelector('.hero-fade-in');
  if (heroFadeIn) {
    gsap.fromTo(heroFadeIn, { opacity: 1 }, {
      opacity: 0,
      ease: 'sine.inOut',
      scrollTrigger: { trigger: '.hero', start: 'top bottom', end: 'top top', scrub: true },
    });
  }

  // As transições escuro↔claro da galeria são gradientes ESTÁTICOS em
  // style.css (.gallery-fade--top/--bottom) — sem animação por scroll.
  // Três iterações de gradientes animados via ScrollTrigger produziram
  // sempre artefactos (linhas duras, zonas mortas); o fundo pintado de
  // forma fixa não tem estados intermédios para falhar.

  // gallery scenes (a sala clara) usam o mesmo fade-up simples de [data-reveal]
  // que o resto do site — o tilt 3D dramático de antes não combinava com o
  // tom mais sereno de "ficha de museu" da versão clara.

  ScrollTrigger.refresh();
});
