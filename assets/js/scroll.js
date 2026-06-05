/* ===========================================================
   Benjamin Hocq — Smooth scroll + apparitions au scroll
   Inspiré du rendu de saumyachaturvedi.com (Framer).
   =========================================================== */
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── Apparitions au scroll ─────────────────
  function setupReveal() {
    var els = document.querySelectorAll("#view-accueil .feed > *");
    if (!els.length) return;

    if (!("IntersectionObserver" in window) || reduce) {
      els.forEach(function (e) { e.classList.add("is-in"); });
      return;
    }

    els.forEach(function (e, i) {
      e.classList.add("reveal");
      // léger décalage en cascade
      e.style.transitionDelay = Math.min(i * 60, 240) + "ms";
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });

    els.forEach(function (e) { io.observe(e); });
  }

  // ── Smooth scroll (lerp à la molette) ─────
  function setupSmooth() {
    if (reduce) return;
    // Sur tactile, on garde le scroll natif (déjà fluide, et l'inertie iOS).
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;

    var target = window.scrollY;
    var current = window.scrollY;
    var running = false;

    function maxScroll() {
      return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }
    function clamp(v) { return Math.max(0, Math.min(v, maxScroll())); }

    function loop() {
      var diff = target - current;
      current += diff * 0.12;
      if (Math.abs(diff) < 0.5) {
        current = target;
        window.scrollTo(0, current);
        running = false;
        return;
      }
      window.scrollTo(0, current);
      requestAnimationFrame(loop);
    }

    window.addEventListener("wheel", function (e) {
      if (e.ctrlKey) return;            // pincement / zoom
      if (e.defaultPrevented) return;
      var delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16;       // lignes → pixels
      else if (e.deltaMode === 2) delta *= window.innerHeight; // pages
      e.preventDefault();
      target = clamp(target + delta);
      if (!running) {
        running = true;
        current = window.scrollY;
        requestAnimationFrame(loop);
      }
    }, { passive: false });

    // Resync si le scroll change autrement (clic nav, clavier, ancres)
    window.addEventListener("scroll", function () {
      if (!running) { target = window.scrollY; current = window.scrollY; }
    }, { passive: true });

    window.addEventListener("resize", function () { target = clamp(target); });
  }

  function init() { setupReveal(); setupSmooth(); }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
