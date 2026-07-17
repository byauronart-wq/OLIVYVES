// AURON — scroll feel: smooth scroll (Lenis) + reveals/parallax (GSAP ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  // --- scroll-driven snapping das peças na galeria (só rato/trackpad) ---
  // CSS scroll-snap não funciona aqui: a Lenis intercepta o scroll nativo.
  // O snap é feito à mão com a API da própria Lenis (scrollTo). Importante:
  // escutamos os eventos brutos de wheel/touchmove (a INTENÇÃO do utilizador),
  // não o 'scroll' da Lenis — esse continua a disparar durante a inércia dela
  // própria, o que atrasava a deteção de "parou de fazer scroll" em segundos.
  // Ouvindo o input diretamente, o snap arranca assim que a mão larga o rato.
  //
  // Só corre em pointer:fine (rato/trackpad). Em touch, o "touchmove" para de
  // disparar assim que o dedo levanta mas a Lenis continua a inércia do
  // gesto — o snap disparava antes de essa inércia percorrer o suficiente e
  // devolvia sempre à peça atual, travando o scroll para cima no mobile.
  const galleryEl = document.querySelector('.gallery');
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (lenis && galleryEl && finePointer) {
    const scenes = Array.from(galleryEl.querySelectorAll('.scene'));
    let snapTimer = null;

    // direção do scroll (1 = a descer, -1 = a subir), da própria Lenis.
    let lastDirection = 0;
    lenis.on('scroll', (e) => { lastDirection = e.direction || lastDirection; });

    const inGalleryView = () => {
      const r = galleryEl.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    // Guardamos qual é a peça "atual" como estado — em vez de recalcular do
    // zero "qual é a mais próxima" a cada snap. Comparar só por distância
    // bruta falhava: se o utilizador tivesse acabado de sair da peça atual
    // (ainda perto dela em px) mas a ir claramente para a seguinte, a peça
    // atual continuava "mais próxima" e o snap puxava para trás — exatamente
    // o "faço scroll para baixo e ele salta para cima" reportado. Agora só
    // avançamos quando o afastamento na direção do movimento passa de facto
    // uma fração da altura da peça (intenção clara), nunca "à distância".
    let currentIndex = 0;
    const nearestIndex = () => {
      const mid = window.innerHeight / 2;
      let idx = 0;
      let best = Infinity;
      scenes.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < best) { best = d; idx = i; }
      });
      return idx;
    };
    currentIndex = nearestIndex();

    const scheduleSnap = () => {
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        if (!inGalleryView()) return;
        const mid = window.innerHeight / 2;
        const curRect = scenes[currentIndex].getBoundingClientRect();
        const offset = curRect.top + curRect.height / 2 - mid; // + ainda não chegámos ao centro, - já passámos

        let targetIndex = currentIndex;
        const threshold = curRect.height * 0.2;
        if (lastDirection > 0 && offset < -threshold && currentIndex < scenes.length - 1) {
          targetIndex = currentIndex + 1;
        } else if (lastDirection < 0 && offset > threshold && currentIndex > 0) {
          targetIndex = currentIndex - 1;
        }
        // rede de segurança: se algo (link, salto grande) nos afastou muito
        // da peça "atual" que tínhamos guardada, recalibra para a mais próxima
        if (Math.abs(offset) > curRect.height * 0.85) targetIndex = nearestIndex();

        currentIndex = targetIndex;
        const target = scenes[targetIndex];
        const r = target.getBoundingClientRect();
        const targetY = window.scrollY + r.top + r.height / 2 - window.innerHeight / 2;
        // lenis.scrollTo(elemento) alinha o TOPO do elemento ao topo do ecrã por
        // defeito — não centra. Como a peça costuma ser mais alta que o ecrã,
        // isso empurrava a legenda/título para fora da vista. Passamos o Y já
        // calculado para centrar, em vez do elemento.
        if (Math.abs(targetY - window.scrollY) > 20) {
          lenis.scrollTo(targetY, { duration: 0.6 });
        }
      }, 80);
    };

    ['wheel', 'touchmove'].forEach((evt) =>
      window.addEventListener(evt, scheduleSnap, { passive: true })
    );
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

  // --- transição escuro↔claro da galeria, animada pelo próprio scroll ---
  // Em vez de um gradiente CSS fixo, a opacidade destas duas placas sólidas
  // é recalculada pelo GSAP a cada frame, ligada exatamente à distância
  // percorrida (a mesma altura de --fade em style.css) — fica sincronizada
  // com o scroll real, não uma imagem estática por cima.
  const fadeTop = document.querySelector('.gallery-fade--top');
  const fadeBottom = document.querySelector('.gallery-fade--bottom');
  if (fadeTop) {
    gsap.fromTo(fadeTop, { opacity: 1 }, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: fadeTop, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }
  if (fadeBottom) {
    gsap.fromTo(fadeBottom, { opacity: 0 }, {
      opacity: 1,
      ease: 'none',
      scrollTrigger: { trigger: fadeBottom, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  }

  // gallery scenes (a sala clara) usam o mesmo fade-up simples de [data-reveal]
  // que o resto do site — o tilt 3D dramático de antes não combinava com o
  // tom mais sereno de "ficha de museu" da versão clara.

  ScrollTrigger.refresh();
});
