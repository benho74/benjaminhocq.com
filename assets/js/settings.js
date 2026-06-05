/* ===========================================================
   Benjamin Hocq — Réglages globaux
   Thème · Langue · Largeur · Curseur · Musique
   Persistance via localStorage ("bh-settings").
   =========================================================== */
(function () {
  "use strict";

  var KEY = "bh-settings";
  var DEFAULTS = {
    theme: "dark",
    lang: "fr",
    width: 680,
    cursor: "default",
    volume: 50
  };

  // ── Persistance ───────────────────────────
  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || "{}");
      return Object.assign({}, DEFAULTS, s);
    } catch (e) { return Object.assign({}, DEFAULTS); }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }
  var state = load();

  // ── Traductions ───────────────────────────
  var I18N = {
    fr: {
      "nav.home": "Accueil", "nav.profile": "Profil · CV", "nav.projects": "Projets",
      "nav.contact": "Contact", "nav.settings": "Réglages",
      "settings.title": "Réglages",
      "settings.lead": "Personnalisez votre expérience. Vos réglages sont enregistrés automatiquement.",
      "settings.appearance": "Apparence",
      "settings.theme": "Thème", "settings.theme.desc": "Basculer entre le mode sombre et le mode clair.",
      "settings.light": "Clair", "settings.dark": "Sombre",
      "settings.lang": "Langue", "settings.lang.desc": "Langue d'affichage du site.",
      "settings.width": "Largeur de la page", "settings.width.desc": "Ajuster la largeur du contenu.",
      "settings.cursor": "Curseur", "settings.cursor.desc": "Choisir l'icône du curseur sur tout le site.",
      "settings.music": "Musique d'ambiance", "settings.music.none": "Aucune piste pour le moment",
      "settings.reset": "Réinitialiser les réglages"
    },
    en: {
      "nav.home": "Home", "nav.profile": "Profile · CV", "nav.projects": "Projects",
      "nav.contact": "Contact", "nav.settings": "Settings",
      "settings.title": "Settings",
      "settings.lead": "Customize your experience. Your settings are saved automatically.",
      "settings.appearance": "Appearance",
      "settings.theme": "Theme", "settings.theme.desc": "Switch between dark and light mode.",
      "settings.light": "Light", "settings.dark": "Dark",
      "settings.lang": "Language", "settings.lang.desc": "Display language of the site.",
      "settings.width": "Page width", "settings.width.desc": "Adjust the content width.",
      "settings.cursor": "Cursor", "settings.cursor.desc": "Choose the cursor icon across the site.",
      "settings.music": "Ambient music", "settings.music.none": "No track yet",
      "settings.reset": "Reset settings"
    }
  };

  function applyLang() {
    var dict = I18N[state.lang] || I18N.fr;
    document.documentElement.setAttribute("lang", state.lang);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.textContent = dict[k];
    });
  }

  // ── Applicateurs ──────────────────────────
  function applyTheme() { document.documentElement.setAttribute("data-theme", state.theme); }
  function applyWidth() { document.documentElement.style.setProperty("--col", state.width + "px"); }
  function applyVolume() { if (audio) audio.volume = state.volume / 100; }

  // ── Curseur main 3D (élément DOM animé qui suit la souris) ──
  var cur = { el: null, on: false, raf: null, mx: 0, my: 0, x: 0, y: 0 };
  var CLICKABLE = "a,button,[data-view],[data-project],[data-back],.seg-btn,label,summary,input,textarea,.list-row,.proj-card,.soc-btn";

  function curMove(e) {
    cur.mx = e.clientX; cur.my = e.clientY;
    if (cur.el) cur.el.style.opacity = "1";
    var t = e.target;
    var clickable = t && t.closest && t.closest(CLICKABLE);
    if (cur.el) cur.el.classList.toggle("is-click", !!clickable);
  }
  function curOut(e) { if (!e.relatedTarget && cur.el) cur.el.style.opacity = "0"; }
  function curLoop() {
    cur.x += (cur.mx - cur.x) * 0.28;
    cur.y += (cur.my - cur.y) * 0.28;
    if (cur.el) cur.el.style.transform = "translate(" + cur.x + "px," + cur.y + "px)";
    cur.raf = requestAnimationFrame(curLoop);
  }
  function enableCursor() {
    if (cur.on) return;
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
    cur.on = true;
    var el = document.createElement("div");
    el.className = "cursor3d"; el.setAttribute("aria-hidden", "true");
    el.innerHTML = '<span class="cursor3d-emo"></span>';
    document.body.appendChild(el);
    cur.el = el;
    window.addEventListener("mousemove", curMove);
    window.addEventListener("mouseout", curOut);
    cur.raf = requestAnimationFrame(curLoop);
  }
  function disableCursor() {
    if (!cur.on) return;
    cur.on = false;
    window.removeEventListener("mousemove", curMove);
    window.removeEventListener("mouseout", curOut);
    if (cur.raf) cancelAnimationFrame(cur.raf);
    if (cur.el) { cur.el.remove(); cur.el = null; }
  }
  function applyCursor() {
    document.documentElement.setAttribute("data-cursor", state.cursor);
    if (state.cursor === "threed") enableCursor(); else disableCursor();
  }

  function applyAll() { applyTheme(); applyWidth(); applyCursor(); applyLang(); applyVolume(); }

  // ── Musique ───────────────────────────────
  // Liste de pistes : { title, src }
  var TRACKS = [
    { title: "Piste 01", src: "assets/music/a-good-man-with-a-broken-heart.mp3" },
    { title: "Piste 02", src: "assets/music/let-u-go.mp3" }
  ];
  var trackIdx = 0;
  var audio = null;

  function loadTrack(i) {
    if (!audio || !TRACKS.length) return;
    trackIdx = (i + TRACKS.length) % TRACKS.length;
    audio.src = TRACKS[trackIdx].src;
    var t = document.getElementById("music-title");
    if (t) {
      t.removeAttribute("data-i18n"); // ne plus laisser la trad écraser le titre
      t.textContent = TRACKS[trackIdx].title;
    }
  }

  function setPlayIcon(playing) {
    var p = document.querySelector("#music-toggle .ic-play");
    var q = document.querySelector("#music-toggle .ic-pause");
    if (p) p.style.display = playing ? "none" : "";
    if (q) q.style.display = playing ? "" : "none";
  }

  // ── Mise à jour des contrôles (état visuel) ──
  function syncControls() {
    document.querySelectorAll("#seg-theme .seg-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-theme-val") === state.theme);
    });
    document.querySelectorAll("#seg-lang .seg-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang-val") === state.lang);
    });
    document.querySelectorAll("#seg-cursor .seg-btn").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-cursor-val") === state.cursor);
    });
    var wr = document.getElementById("width-range");
    var wv = document.getElementById("width-val");
    if (wr) wr.value = state.width;
    if (wv) wv.textContent = state.width + "px";
    var mv = document.getElementById("music-vol");
    if (mv) mv.value = state.volume;
  }

  // ── Câblage des contrôles ─────────────────
  function wire() {
    audio = document.getElementById("music-audio");
    applyVolume();
    if (TRACKS.length) loadTrack(0); // affiche la 1re piste sans la lancer

    document.querySelectorAll("#seg-theme .seg-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        state.theme = b.getAttribute("data-theme-val"); applyTheme(); syncControls(); save();
      });
    });
    document.querySelectorAll("#seg-lang .seg-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        state.lang = b.getAttribute("data-lang-val"); applyLang(); syncControls(); save();
      });
    });
    document.querySelectorAll("#seg-cursor .seg-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        state.cursor = b.getAttribute("data-cursor-val"); applyCursor(); syncControls(); save();
      });
    });

    var wr = document.getElementById("width-range");
    if (wr) {
      // En direct : on ne met à jour que l'étiquette (pas de reflow continu).
      wr.addEventListener("input", function () {
        var wv = document.getElementById("width-val");
        if (wv) wv.textContent = wr.value + "px";
      });
      // À la fin (relâchement) : on applique la largeur après un court délai.
      wr.addEventListener("change", function () {
        state.width = parseInt(wr.value, 10);
        setTimeout(function () { applyWidth(); save(); }, 200);
      });
    }

    var mv = document.getElementById("music-vol");
    if (mv) mv.addEventListener("input", function () {
      state.volume = parseInt(mv.value, 10); applyVolume(); save();
    });

    var toggle = document.getElementById("music-toggle");
    if (toggle) toggle.addEventListener("click", function () {
      if (!audio) return;
      if (!TRACKS.length) { /* pas encore de piste */ return; }
      if (!audio.src) loadTrack(0);
      if (audio.paused) { audio.play().then(function(){ setPlayIcon(true); }).catch(function(){}); }
      else { audio.pause(); setPlayIcon(false); }
    });
    function skip(delta) {
      if (!TRACKS.length) return;
      var wasPlaying = audio && !audio.paused;
      loadTrack(trackIdx + delta);
      if (wasPlaying) audio.play().then(function(){ setPlayIcon(true); }).catch(function(){});
    }
    var next = document.getElementById("music-next");
    if (next) next.addEventListener("click", function () { skip(1); });
    var prev = document.getElementById("music-prev");
    if (prev) prev.addEventListener("click", function () {
      // Si on est à plus de 3s dans la piste, revenir à son début ; sinon piste précédente.
      if (audio && audio.src && audio.currentTime > 3) { audio.currentTime = 0; return; }
      skip(-1);
    });
    if (audio) {
      audio.addEventListener("play", function () { setPlayIcon(true); });
      audio.addEventListener("pause", function () { setPlayIcon(false); });
    }

    var reset = document.getElementById("settings-reset");
    if (reset) reset.addEventListener("click", function () {
      state = Object.assign({}, DEFAULTS); save(); applyAll(); syncControls();
    });

    syncControls();
  }

  // Expose pour usage éventuel ailleurs
  window.BHSettings = { get: function(){ return state; }, applyLang: applyLang };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { applyAll(); wire(); });
  } else { applyAll(); wire(); }
})();
