(() => {
  const root = document.querySelector('.app');
  if (!root) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const SELECTORS = [
    // Accueil — hero
    '.hero .hero-head',
    '.hero > .body',
    '.hero > .btn',
    // Accueil — sections
    '.block .sec-kicker',
    '.block .sec-title',
    '.block .sec-title-lg',
    '.block .sec-lead',
    '.block .bio-text',
    '.mood-tile',
    '.quote-left',
    '.logo-marquee',
    '.testi',
    // Footer (partagé accueil + contact)
    '.footer .socials',
    '.footer .signature',
    '.footer .thanks',
    '.footer .bye',
    '.footer .copy',
    // Profil / CV
    '#view-profil .ph-avatar-frame',
    '#view-profil .ph-info h1',
    '#view-profil .ph-info .role',
    '#view-profil .contact-grid > *',
    '.cv-label',
    '.about',
    '.entry .e-title',
    '.entry .e-sub',
    '.entry .e-org',
    '.entry .e-date',
    '.entry .e-desc',
    '.chip',
    '.tool-group',
    '.toolchip',
    '.kv',
    '.block > .btn',
    // Projets
    '.proj-card',
    // Projet — détail (éléments internes uniquement, pas la carte elle-même)
    '#view-projet .detail-card > h1',
    '#view-projet .pd-tag',
    '#view-projet .pd-intro',
    '#view-projet .pd-mrow',
    '#view-projet .pd-paras .dc-body',
    '#view-projet .pd-media img',
    '#view-projet .pd-media video',
    '#view-projet .pd-nav-btn',
    // Contact
    '.link-row',
    '.form .row2',
    '.form > .field',
    '.form .btn',
    // Paramètres
    '.set-row',
  ].join(',');

  const seen = new WeakSet();

  const bezier = (p1x, p1y, p2x, p2y) => {
    const cx = 3 * p1x;
    const bx = 3 * (p2x - p1x) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * p1y;
    const by = 3 * (p2y - p1y) - cy;
    const ay = 1 - cy - by;
    const sX = (t) => ((ax * t + bx) * t + cx) * t;
    const sY = (t) => ((ay * t + by) * t + cy) * t;
    const dX = (t) => (3 * ax * t + 2 * bx) * t + cx;
    return (x) => {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      let t = x;
      for (let i = 0; i < 8; i++) {
        const err = sX(t) - x;
        if (Math.abs(err) < 1e-6) return sY(t);
        const d = dX(t);
        if (Math.abs(d) < 1e-6) break;
        t -= err / d;
      }
      let lo = 0, hi = 1;
      while (hi - lo > 1e-4) {
        const m = (lo + hi) / 2;
        if (sX(m) < x) lo = m; else hi = m;
      }
      return sY((lo + hi) / 2);
    };
  };

  const easeIn = bezier(0.22, 1, 0.36, 1);
  const easeOut = bezier(0.55, 0.08, 0.75, 0.5);

  const PERSPECTIVE = 700;

  const ENTRY_TILT = 18;
  const ENTRY_TY = 30;
  const ENTRY_SCALE = 0.94;
  const ENTRY_OPACITY = 0.15;

  const EXIT_TILT = 75;
  const EXIT_TY = 40;
  const EXIT_TZ = 120;
  const EXIT_OPACITY_MIN = 0.35;
  const EXIT_BLUR = 1.5;

  const state = [];
  let rafId = 0;
  const schedule = () => {
    if (!rafId) rafId = requestAnimationFrame(update);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const s = state.find((st) => st.el === e.target);
        if (s) s.visible = e.isIntersecting;
      });
      schedule();
    },
    { rootMargin: '40% 0px 40% 0px' }
  );

  const projetView = document.getElementById('view-projet');
  const addTargets = (scope) => {
    const found = Array.from((scope || root).querySelectorAll(SELECTORS));
    let added = 0;
    for (const el of found) {
      if (seen.has(el)) continue;
      if (el.classList.contains('no-tilt')) continue;
      seen.add(el);
      el.classList.add('tilt-scroll');
      const slow = projetView ? projetView.contains(el) : false;
      const s = { el, visible: true, slow };
      state.push(s);
      io.observe(el);
      added++;
    }
    if (added) schedule();
  };

  const update = () => {
    rafId = 0;
    const vh = window.innerHeight;
    const halfVh = vh * 0.5;
    const slowEnd = vh * 0.18;

    for (const s of state) {
      if (!s.visible) continue;
      const rect = s.el.getBoundingClientRect();
      const h = rect.height;
      const top = rect.top;

      const entryEnd = s.slow ? slowEnd : halfVh;
      const entryRange = vh - entryEnd;

      let entry;
      let exit;
      if (top >= vh) {
        entry = 0; exit = 0;
      } else if (top >= entryEnd) {
        entry = 1 - (top - entryEnd) / entryRange;
        exit = 0;
      } else if (top >= 0) {
        entry = 1; exit = 0;
      } else if (top >= -h) {
        entry = 1; exit = -top / h;
      } else {
        entry = 1; exit = 1;
      }

      const eIn = easeIn(entry);
      const eOut = easeOut(exit);

      const ty = (1 - eIn) * ENTRY_TY + eOut * -EXIT_TY;
      const rx = (1 - eIn) * ENTRY_TILT + eOut * -EXIT_TILT;
      const tz = eOut * -EXIT_TZ;
      const sc = ENTRY_SCALE + (1 - ENTRY_SCALE) * eIn;

      const opIn = ENTRY_OPACITY + (1 - ENTRY_OPACITY) * eIn;
      const opOut = 1 - (1 - EXIT_OPACITY_MIN) * eOut;
      const op = Math.min(opIn, opOut);

      const bl = eOut * EXIT_BLUR;

      // Sur mobile : pas de perspective/rotateX pour éviter l'overflow horizontal
      if (window.innerWidth <= 760) {
        s.el.style.transform = `translateY(${ty.toFixed(2)}px) scale(${sc.toFixed(3)})`;
      } else {
        s.el.style.transform =
          `perspective(${PERSPECTIVE}px)` +
          ` translate3d(0, ${ty.toFixed(2)}px, ${tz.toFixed(1)}px)` +
          ` rotateX(${rx.toFixed(2)}deg)` +
          ` scale(${sc.toFixed(3)})`;
      }
      s.el.style.opacity = op.toFixed(3);
      s.el.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : '';
    }
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);

  addTargets(root);
  window.applyScrollTilt = addTargets;

  // Appelé lors du changement de vue : réactive les éléments du container
  // et force un recalcul (l'IO ne re-fire pas toujours sur display:none→block).
  window.tiltActivate = (container) => {
    for (const s of state) {
      if (!container || container.contains(s.el)) s.visible = true;
    }
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    update();
  };

  update();
})();
