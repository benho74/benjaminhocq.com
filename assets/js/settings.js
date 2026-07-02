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

      "hero.role": "Designer graphique · Web designer",
      "hero.body1": "Basé entre Genève et Lausanne, je conçois des <b>identités visuelles</b>, des <b>sites web</b> et des <b>contenus digitaux</b> depuis plusieurs années. J'ai travaillé pour des médias, des agences et des structures locales.",
      "hero.body2": "Aujourd'hui employé par un média lausannois, je pilote des projets opérationnels dans leur globalité. En parallèle, je m'investis dans des projets ambitieux qui me passionnent.",
      "hero.cta": "Me contacter",
      "hero.available": "Disponible",

      "bio.kicker": "Bio",
      "bio.p1": "Mon parcours a commencé dans le commerce et la relation client, où j'ai appris à comprendre les besoins des gens et à y répondre avec précision. Mais la création m'a toujours accompagné : depuis l'enfance, je dessine, j'imagine et je donne forme à des idées.",
      "bio.p2": "Après un séjour de trois mois en Irlande, j'ai pris une décision claire : faire de cette passion mon métier. Je me suis reconverti et j'ai repris mes études à l'école des Gobelins, avant de me lancer en freelance pour des clients aux univers variés — bars à jeux, agences, salons de coiffure ou encore immobilier.",
      "bio.p3": "J'ai ensuite rejoint un média lausannois comme graphiste-vidéaste. En quelques années, j'y ai évolué jusqu'au poste de chef de projet opérationnel, où je pilote aujourd'hui des projets dans leur globalité tout en développant mes propres projets en parallèle.",

      "logos.kicker": "Ils m'ont fait confiance",
      "logos.title": "Quelques collaborations.",

      "testi.title": "Ils en parlent",
      "testi.lead": "Quelques retours de personnes avec qui j'ai collaboré.",

      "footer.thanks": "Merci de votre visite.",
      "footer.bye": "Explorez à votre rythme. À très vite.",
      "footer.copy": "© 2026 Benjamin Hocq",

      "profil.role": "Designer graphique",
      "profil.address": "Route de Lausanne 5, 1180 Rolle",
      "profil.license": "Permis B",

      "cv.about": "À propos",
      "cv.about.body": "Designer graphique avec plus de 5 ans d'expérience en création visuelle, digital, print et marketing, aujourd'hui passé chef de projet digital. J'imagine et produis des contenus photo, vidéo et graphiques destinés aux sites web, aux campagnes digitales et aux supports print. Habitué aux environnements exigeants, je combine créativité, sens du détail et rapidité d'exécution pour livrer des contenus performants.",
      "cv.exp": "Expériences",
      "cv.exp1.title": "Graphiste · Vidéaste → Chef de projet digital",
      "cv.exp1.sub": "Promotion interne 2026",
      "cv.exp1.org": "VIVA Santé — Lausanne",
      "cv.exp1.date": "Fév. 2024 – présent",
      "cv.exp1.li1": "Création des visuels marketing pour les campagnes digitales, pages web et supports print.",
      "cv.exp1.li2": "Production vidéo — tournage, montage et livraison J+1 pour YouTube, webinaires et campagnes d'acquisition & fidélisation.",
      "cv.exp1.li3": "Conception et intégration de landing pages WordPress orientées conversion.",
      "cv.exp1.li4": "Déclinaison graphique des campagnes marketing sur l'ensemble des supports (web, email, print).",
      "cv.exp1.li5": "Pilotage opérationnel (2026) : coordination de 5 freelances et 7 experts, planning de 8-9 webinaires/mois, campagnes Salesforce, fulfillment de ~10 produits.",
      "cv.exp2.title": "Graphiste · Web Design",
      "cv.exp2.org": "Indépendant — Annecy, Nyon & Genève",
      "cv.exp2.date": "2023 – 2024",
      "cv.exp2.li1": "~1 mission client/mois gérée en autonomie, du brief à la livraison.",
      "cv.exp2.li2": "Conception de sites web sur mesure (UX/UI, intégration), identités de marque et supports print & digital.",
      "cv.exp2.li3": "Développement de projets digitaux personnels en parallèle.",
      "cv.exp3.title": "Assistant direction artistique",
      "cv.exp3.org": "Lake Pub — Sevrier",
      "cv.exp3.date": "2021 – 2023",
      "cv.exp3.li1": "Création des visuels promo pour ~2 événements/semaine + temps forts festifs.",
      "cv.exp3.li2": "Réalisation et évolution de l'identité visuelle de l'établissement.",
      "cv.exp3.li3": "Conception d'interfaces web & mobile orientées expérience utilisateur (UX/UI).",
      "cv.exp3.li4": "Participation à la stratégie de développement de l'entreprise.",
      "cv.edu": "Formations",
      "cv.edu1.title": "Bachelor design interactif web & mobile",
      "cv.edu2.title": "BTS Négociation et Relation Client",
      "cv.edu2.note": "Bases commerciales, relation client et marketing — socle utile au pilotage des campagnes.",
      "cv.skills": "Compétences",
      "cv.skill1": "Direction artistique", "cv.skill2": "UX/UI Design",
      "cv.skill3": "Design graphique", "cv.skill4": "Outils CRM",
      "cv.skill5": "Création de contenu digital", "cv.skill6": "Montage vidéo",
      "cv.skill7": "Marketing digital", "cv.skill8": "IA générative",
      "cv.tools": "Logiciels",
      "cv.tools.design": "Design", "cv.tools.dev": "Développement",
      "cv.tools.mgmt": "Gestion & marketing",
      "cv.langs": "Langues",
      "cv.lang.fr": "Français", "cv.lang.fr.level": "Maternelle",
      "cv.lang.en": "Anglais", "cv.lang.en.level": "Intermédiaire",
      "cv.hobbies": "Hobbies",
      "cv.hobbies.body": "🐱 Amoureux des animaux · Activités outdoor · Investissement & immobilier · Innovation technologique · Arts visuels",
      "cv.download": "Télécharger le CV",

      "projects.title": "Projets",
      "projects.lead": "Une sélection de projets — branding, identité visuelle, web design et UX/UI — réalisés ces dernières années.",
      "projets.title": "Projets",
      "projet.back": "Retour",

      "contact.title": "Contact",
      "contact.lead": "Un projet, une question, ou juste envie de dire bonjour ? Écrivez-moi.",
      "contact.email": "Email", "contact.phone": "Téléphone", "contact.web": "Site web",
      "contact.name": "Nom", "contact.name.ph": "Votre nom",
      "contact.emailfield": "Email", "contact.emailfield.ph": "vous@email.com",
      "contact.message": "Message", "contact.message.ph": "Parlez-moi de votre projet…",
      "contact.send": "Envoyer", "contact.sent": "Merci ! Votre message a bien été envoyé.",

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

      "hero.role": "Graphic designer · Web designer",
      "hero.body1": "Based between Geneva and Lausanne, I have been designing <b>visual identities</b>, <b>websites</b> and <b>digital content</b> for several years. I've worked with media companies, agencies and local businesses.",
      "hero.body2": "Now working for a Lausanne-based media company, I lead operational projects end-to-end. On the side, I invest myself in ambitious projects I'm passionate about.",
      "hero.cta": "Get in touch",
      "hero.available": "Available",

      "bio.kicker": "Bio",
      "bio.p1": "My journey started in sales and customer relations, where I learned to understand people's needs and respond to them precisely. But creation has always been with me: since childhood, I've been drawing, imagining and shaping ideas.",
      "bio.p2": "After a three-month stay in Ireland, I made a clear decision: turn this passion into my career. I retrained and went back to school at Les Gobelins, before going freelance for clients across many worlds — board-game bars, agencies, hair salons, even real estate.",
      "bio.p3": "I then joined a Lausanne-based media company as a designer-videographer. Over the years, I grew into an operational project manager role — today I run projects end-to-end while developing my own ventures in parallel.",

      "logos.kicker": "They've trusted me",
      "logos.title": "A few collaborations.",

      "testi.title": "Kind words",
      "testi.lead": "Feedback from people I've worked with.",

      "footer.thanks": "Thanks for visiting.",
      "footer.bye": "Take your time. See you soon.",
      "footer.copy": "© 2026 Benjamin Hocq",

      "profil.role": "Graphic designer",
      "profil.address": "Route de Lausanne 5, 1180 Rolle",
      "profil.license": "Driving licence B",

      "cv.about": "About",
      "cv.about.body": "Graphic designer with over 5 years of experience in visual creation, digital, print and marketing — now a digital project manager. I imagine and produce photo, video and graphic content for websites, digital campaigns and print. Used to demanding environments, I combine creativity, attention to detail and speed of execution to deliver performing content.",
      "cv.exp": "Experience",
      "cv.exp1.title": "Designer · Videographer → Digital Project Manager",
      "cv.exp1.sub": "Internal promotion 2026",
      "cv.exp1.org": "VIVA Santé — Lausanne",
      "cv.exp1.date": "Feb 2024 – present",
      "cv.exp1.li1": "Design of marketing visuals for digital campaigns, landing pages and print materials.",
      "cv.exp1.li2": "Video production — shooting, editing and next-day delivery for YouTube, webinars, acquisition & retention campaigns.",
      "cv.exp1.li3": "Design and integration of conversion-focused WordPress landing pages.",
      "cv.exp1.li4": "Graphic adaptation of marketing campaigns across all channels (web, email, print).",
      "cv.exp1.li5": "Operational lead (2026): 5 freelancers and 7 experts coordinated, 8–9 webinars/month planned, Salesforce campaigns, fulfillment of ~10 products.",
      "cv.exp2.title": "Designer · Web Design",
      "cv.exp2.org": "Freelance — Annecy, Nyon & Geneva",
      "cv.exp2.date": "2023 – 2024",
      "cv.exp2.li1": "~1 client mission/month handled end-to-end, from brief to delivery.",
      "cv.exp2.li2": "Custom websites (UX/UI, integration), brand identities and print & digital collateral.",
      "cv.exp2.li3": "Personal digital side-projects developed in parallel.",
      "cv.exp3.title": "Art Direction Assistant",
      "cv.exp3.org": "Lake Pub — Sevrier",
      "cv.exp3.date": "2021 – 2023",
      "cv.exp3.li1": "Promotional visuals for ~2 events/week + seasonal highlights.",
      "cv.exp3.li2": "Creation and evolution of the venue's visual identity.",
      "cv.exp3.li3": "Web & mobile interfaces designed with a focus on user experience (UX/UI).",
      "cv.exp3.li4": "Contribution to the company's development strategy.",
      "cv.edu": "Education",
      "cv.edu1.title": "Bachelor — Interactive Design, Web & Mobile",
      "cv.edu2.title": "BTS Sales & Customer Relations",
      "cv.edu2.note": "Sales, customer relations and marketing fundamentals — a useful base for running marketing campaigns.",
      "cv.skills": "Skills",
      "cv.skill1": "Art direction", "cv.skill2": "UX/UI Design",
      "cv.skill3": "Graphic design", "cv.skill4": "CRM tools",
      "cv.skill5": "Digital content creation", "cv.skill6": "Video editing",
      "cv.skill7": "Digital marketing", "cv.skill8": "Generative AI",
      "cv.tools": "Software",
      "cv.tools.design": "Design", "cv.tools.dev": "Development",
      "cv.tools.mgmt": "Management & marketing",
      "cv.langs": "Languages",
      "cv.lang.fr": "French", "cv.lang.fr.level": "Native",
      "cv.lang.en": "English", "cv.lang.en.level": "Intermediate",
      "cv.hobbies": "Interests",
      "cv.hobbies.body": "🐱 Animal lover · Outdoor activities · Investment & real estate · Tech innovation · Visual arts",
      "cv.download": "Download CV",

      "projects.title": "Projects",
      "projects.lead": "A selection of projects — branding, visual identity, web design and UX/UI — from recent years.",
      "projets.title": "Projects",
      "projet.back": "Back",

      "contact.title": "Contact",
      "contact.lead": "A project, a question, or just want to say hi? Drop me a message.",
      "contact.email": "Email", "contact.phone": "Phone", "contact.web": "Website",
      "contact.name": "Name", "contact.name.ph": "Your name",
      "contact.emailfield": "Email", "contact.emailfield.ph": "you@email.com",
      "contact.message": "Message", "contact.message.ph": "Tell me about your project…",
      "contact.send": "Send", "contact.sent": "Thanks! Your message has been sent.",

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
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html");
      if (dict[k] != null) el.innerHTML = dict[k];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-placeholder");
      if (dict[k] != null) el.setAttribute("placeholder", dict[k]);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-aria");
      if (dict[k] != null) el.setAttribute("aria-label", dict[k]);
    });
    window.__lang = state.lang;
    if (typeof window.onLangChange === "function") {
      try { window.onLangChange(state.lang); } catch (e) {}
    }
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
    { title: "Piste 01", src: "assets/music/PISTE 1.mp3" },
    { title: "Piste 02", src: "assets/music/PISTE 2.mp3" }
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
