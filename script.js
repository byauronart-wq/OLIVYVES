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

  // --- transição escuro→claro da galeria: efeito "aura" ---
  // Uma faixa horizontal larga e muito desfocada (--aura-ry em style.css)
  // abre-se a partir do centro, revelando o creme por baixo — sem núcleo
  // sólido em lado nenhum, a mesma qualidade das próprias peças AURON.
  // A curva é aplicada à mão (equivalente a sine.inOut: derivada zero nos
  // dois extremos, funde sem costura no sólido de cada lado).
  const fadeTop = document.querySelector('.gallery-fade--top');
  const fadeBottom = document.querySelector('.gallery-fade--bottom');
  if (fadeTop) {
    ScrollTrigger.create({
      trigger: fadeTop,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const eased = (1 - Math.cos(self.progress * Math.PI)) / 2;
        fadeTop.style.setProperty('--aura-ry', (2 + eased * 66) + '%');
      },
    });
  }
  if (fadeBottom) {
    // o mesmo efeito "aura", mas ao contrário: começa aberto (a galeria
    // ainda em creme) e fecha à medida que se sai da galeria para a secção
    // escura seguinte.
    ScrollTrigger.create({
      trigger: fadeBottom,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const eased = (1 - Math.cos(self.progress * Math.PI)) / 2;
        fadeBottom.style.setProperty('--aura-ry-b', (68 - eased * 66) + '%');
      },
    });
  }

  // gallery scenes (a sala clara) usam o mesmo fade-up simples de [data-reveal]
  // que o resto do site — o tilt 3D dramático de antes não combinava com o
  // tom mais sereno de "ficha de museu" da versão clara.

  ScrollTrigger.refresh();
});
