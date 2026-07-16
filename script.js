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

  // --- scroll-driven snapping das peças na galeria ---
  // CSS scroll-snap não funciona aqui: a Lenis intercepta o scroll nativo e o
  // browser nunca vê os eventos de scroll que o disparariam. Por isso o snap
  // é feito à mão, com a própria API da Lenis (scrollTo), assim que o scroll
  // pára perto de uma peça.
  const galleryEl = document.querySelector('.gallery');
  if (lenis && galleryEl) {
    const scenes = Array.from(galleryEl.querySelectorAll('.scene'));
    let snapTimer = null;
    let snapping = false;

    const inGalleryView = () => {
      const r = galleryEl.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    lenis.on('scroll', () => {
      if (snapping) return;
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        if (snapping || !inGalleryView()) return;
        const mid = window.innerHeight / 2;
        let nearest = null;
        let nearestDist = Infinity;
        scenes.forEach((el) => {
          const r = el.getBoundingClientRect();
          const dist = Math.abs(r.top + r.height / 2 - mid);
          if (dist < nearestDist) { nearestDist = dist; nearest = el; }
        });
        if (nearest && nearestDist > 40) {
          snapping = true;
          lenis.scrollTo(nearest, { duration: 0.9, onComplete: () => { snapping = false; } });
        }
      }, 160);
    });
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

  // gallery scenes (a sala clara) usam o mesmo fade-up simples de [data-reveal]
  // que o resto do site — o tilt 3D dramático de antes não combinava com o
  // tom mais sereno de "ficha de museu" da versão clara.

  ScrollTrigger.refresh();
});
