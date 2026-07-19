// AURON — scroll feel: smooth scroll (Lenis) + reveals/parallax (GSAP ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- galeria gerada a partir de data.js ---
  // As cenas das peças não estão no HTML: nascem daqui, da lista
  // CATALOG.collections[].pieces (campo "gallery" de cada peça). Adicionar
  // uma peça em data.js adiciona-a automaticamente à galeria e à loja.
  // Tem de correr ANTES do registo dos [data-reveal] mais abaixo, senão as
  // cenas novas ficavam sem animação de entrada.
  renderGalleryScenes();

  function renderGalleryScenes() {
    const container = document.getElementById('galeria');
    const col = window.getCollection && getCollection('auron');
    if (!container || !col) return;
    const anchor = container.querySelector('.gallery-cta');
    const lang = () => (typeof getLang === 'function' ? getLang() : 'pt');
    const sceneRefs = [];

    col.pieces.forEach((p, i) => {
      const g = p.gallery;
      if (!g) return;
      const num = String(i + 1).padStart(2, '0');
      const shopHref = 'loja.html?col=auron&piece=' + encodeURIComponent(p.id);

      const scene = document.createElement('div');
      scene.className = 'scene';
      scene.style.setProperty('--ar', g.ar || '4/5');

      const artWrap = document.createElement('div');
      artWrap.className = 'scene-art-wrap';
      artWrap.setAttribute('data-reveal', '');
      const artLink = document.createElement('a');
      artLink.className = 'scene-art';
      artLink.href = shopHref;
      const img = document.createElement('img');
      img.src = g.image;
      artLink.appendChild(img);
      artWrap.appendChild(artLink);

      const text = document.createElement('div');
      text.className = 'scene-text';
      text.setAttribute('data-reveal', '');
      const numEl = document.createElement('span');
      numEl.className = 'num';
      numEl.textContent = num;
      const h3 = document.createElement('h3');
      const cap = document.createElement('p');
      const cta = document.createElement('a');
      cta.className = 'scene-cta';
      cta.href = shopHref;
      text.append(numEl, h3, cap, cta);

      scene.append(artWrap, text);
      container.insertBefore(scene, anchor);
      sceneRefs.push({ p, g, img, artLink, h3, cap, cta });
    });

    // textos (nome, legenda, CTA) seguem o idioma ativo — aplicados agora e
    // reaplicados sempre que o idioma muda no dropdown.
    function applyTexts() {
      const l = lang();
      sceneRefs.forEach(({ p, g, img, artLink, h3, cap, cta }) => {
        const name = p.name[l] || p.name.pt;
        h3.textContent = name;
        cap.textContent = (g.caption && (g.caption[l] || g.caption.pt)) || '';
        cta.textContent = typeof t === 'function' ? t('scene.cta') : 'Ver na loja →';
        img.alt = name;
        artLink.setAttribute('aria-label', name);
      });
    }
    applyTexts();
    document.addEventListener('auron:langchange', applyTexts);
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
