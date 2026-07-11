// AURON — scroll feel: smooth scroll (Lenis) + reveals/parallax (GSAP ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  // --- gallery scenes: 3D angle shift + background drift on scroll ---
  document.querySelectorAll('.scene').forEach((scene, i) => {
    const art = scene.querySelector('.scene-art');
    const bg = scene.querySelector('.scene-bg');
    const dir = i % 2 === 0 ? 1 : -1; // alternate the turn direction per scene

    if (art && !prefersReduced) {
      // the artwork turns through the viewer as it passes the centre of the screen
      gsap.fromTo(art,
        { rotateY: 18 * dir, rotateX: 7, y: 70, scale: 0.9 },
        {
          rotateY: -18 * dir, rotateX: -5, y: -70, scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    }

    if (bg) {
      // the colour wash drifts slower + breathes, so the background feels alive
      gsap.fromTo(bg,
        { scale: 1.16, yPercent: prefersReduced ? 0 : -5 },
        {
          scale: 1, yPercent: prefersReduced ? 0 : 5,
          ease: 'none',
          scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    }
  });

  ScrollTrigger.refresh();
});
