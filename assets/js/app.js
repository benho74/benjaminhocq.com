/* ===========================================================
   Benjamin Hocq — app logic : routing, projets, forms
   =========================================================== */
(function(){
  "use strict";

  var views = {
    accueil:  document.getElementById('view-accueil'),
    profil:   document.getElementById('view-profil'),
    projets:  document.getElementById('view-projets'),
    contact:  document.getElementById('view-contact'),
    parametres: document.getElementById('view-parametres'),
    projet:   document.getElementById('view-projet')
  };
  var navLinks = {};
  document.querySelectorAll('.nav a[data-view]').forEach(function(a){
    navLinks[a.dataset.view] = a;
  });

  function scrollTop(){ window.scrollTo(0, 0); }

  function setNav(active){
    Object.keys(navLinks).forEach(function(k){
      navLinks[k].classList.toggle('active', k === active);
    });
  }

  function showView(name, navName){
    Object.keys(views).forEach(function(k){
      views[k].classList.toggle('is-active', k === name);
    });
    setNav(navName || name);
    scrollTop();
    // Réactive le tilt-scroll pour la vue qui vient d'être affichée
    // (l'IO ne re-fire pas automatiquement après display:none → block)
    requestAnimationFrame(function(){
      if (window.tiltActivate) window.tiltActivate(views[name]);
    });
  }

  // ── Données projets ──────────────────────
  var PROJECT_ORDER = ["lacourdesgrands", "stylingcoiffure", "congresannecy", "vulpo", "lakepub-identite", "fablab", "lempire", "lakepub-web"];
  var PROJECTS = {"lacourdesgrands": {"title": "La Cour des Grands", "cat": "Branding", "date": "2025", "tags": ["Branding", "Identité visuelle", "Naming", "Email design"], "intro": "Construire une identité de marque pour les passionnés d'investissement — entre prestige, confiance et modernité.", "meta": [["Client", "La Cour des Grands"], ["Année", "2025"], ["Secteur", "Média / Finance"]], "media": [{"t": "image", "f": "lacourdesgrands-cover.jpg"}, {"t": "video", "f": "lacourdesgrands-video.mp4"}, {"t": "image", "f": "lacourdesgrands-bourse.jpg"}, {"t": "image", "f": "lacourdesgrands-suite.jpg"}, {"t": "image", "f": "lacourdesgrands-mockup.jpg"}, {"t": "image", "f": "lacourdesgrands-mid.jpg"}, {"t": "image", "f": "lacourdesgrands-duo1.jpg"}], "paras": ["La Cour des Grands est un média dédié à l'investissement — finance, bourse, immobilier, crypto-monnaies. L'objectif : délivrer chaque jour du contenu exclusif et fiable directement en boîte mail, dans une ambiance à la fois chaleureuse et exigeante.", "Le naming s'est construit autour de l'idée d'appartenir à un cercle restreint, d'évoluer, de progresser. Le logo intègre une couronne discrète — symbole de respect envers les lecteurs et d'importance accordée à chaque prise de parole. La palette bleu et rouge traduit confiance, prestige et dynamisme.", "De l'identité visuelle complète aux templates d'email, chaque élément a été pensé pour renforcer l'autorité du média et fidéliser une communauté d'investisseurs exigeants."]}, "stylingcoiffure": {"title": "Styling Coiffure", "cat": "Web design", "date": "2024", "tags": ["Web design", "WordPress", "Haute-Savoie"], "intro": "Donner une vitrine digitale à un salon de coiffure ancré dans son territoire, avec modernité et chaleur.", "meta": [["Client", "Styling Coiffure"], ["Année", "2024"], ["Secteur", "Beauté / Coiffure"]], "media": [{"t": "image", "f": "stylingcoiffure-cover.jpg"}, {"t": "image", "f": "stylingcoiffure-mid.jpg"}, {"t": "image", "f": "stylingcoiffure-duo1.jpg"}, {"t": "image", "f": "stylingcoiffure-duo2.jpg"}], "paras": ["Styling Coiffure est un salon de 103 m² installé à Meythet, en Haute-Savoie. Fondé en octobre 1985 par Stéphane et Brigitte, il perpétue aujourd'hui une tradition familiale d'excellence sous la direction du repreneur actuel.", "Le projet consistait à créer un site web qui incarne le caractère professionnel et accueillant du salon — en mettant en valeur son histoire, son équipe, ses services coiffure et onglerie, et en intégrant un module de prise de rendez-vous en ligne.", "Le résultat : une interface moderne et intuitive qui renforce la visibilité digitale du salon et attire de nouveaux clients, tout en fidélisant les habitués."]}, "congresannecy": {"title": "Congrès Annecy", "cat": "Identité visuelle", "date": "2023", "tags": ["Identité visuelle", "Concours", "Les Gobelins"], "intro": "Réinventer l'image d'un lieu de prestige au cœur des Alpes.", "meta": [["Client", "Centre de Congrès d'Annecy"], ["Année", "2023"], ["Contexte", "Concours / Les Gobelins"]], "media": [{"t": "image", "f": "congresannecy-cover.jpg"}, {"t": "image", "f": "congresannecy-presentation.jpg"}, {"t": "image", "f": "congresannecy-mockup.jpg"}, {"t": "image", "f": "congresannecy-mid.jpg"}, {"t": "image", "f": "congresannecy-duo1.jpg"}], "paras": ["En dernière année à l'École des Gobelins à Annecy, j'ai eu l'opportunité de participer à un concours de création d'identité visuelle pour le Centre de Congrès d'Annecy, situé dans l'enceinte du Palais de l'Impérial.", "En binôme avec Léa, nous avons conçu un logo qui intègre les initiales CCA avec des éléments de paysage montagnard, représentant la transition, l'innovation et l'ancrage géographique d'Annecy. Notre proposition a été retenue parmi une vingtaine de participants et a atteint la finale — nous avons décroché la troisième place.", "Au-delà du résultat, ce projet nous a apporté une expérience concrète dans la méthodologie design, le travail en équipe sous contrainte et la présentation face à un jury professionnel."]}, "vulpo": {"title": "Vulpo", "cat": "UX · UI Design", "date": "2023", "tags": ["UX · UI Design", "Application mobile", "Figma"], "intro": "Concevoir une application qui réconcilie technologie et nature.", "meta": [["Client", "Projet académique"], ["Année", "2023"], ["Contexte", "Bachelor / Les Gobelins"]], "media": [{"t": "image", "f": "vulpo-cover.jpg"}, {"t": "video", "f": "vulpo-video-1.mp4"}, {"t": "image", "f": "vulpo-semnoz.jpg"}, {"t": "video", "f": "vulpo-video-2.mp4"}, {"t": "image", "f": "vulpo-mockup.jpg"}, {"t": "image", "f": "vulpo-mid.jpg"}], "paras": ["Vulpo est un projet de fin d'études réalisé en équipe — trois designers et un développeur. L'ambition : créer une application intuitive et immersive pour enrichir les expériences en pleine nature, que ce soit en randonnée, en forêt ou lors d'une simple promenade.", "L'application repose sur un système de balises connectées positionnées dans les espaces naturels, qui transmettent en temps réel des informations sur la faune présente, les sentiers à explorer et les dangers à éviter. L'interface a été conçue pour être ergonomique, fluide et accessible à tous les profils d'utilisateurs.", "Vulpo incarne une vision de la technologie au service du vivant : permettre aux gens de profiter de la nature en toute sérénité, tout en approfondissant leur connaissance des écosystèmes qui les entourent."]}, "lakepub-identite": {"title": "Lake Pub — Identité", "cat": "Branding", "date": "2 ans (alternance)", "tags": ["Branding", "Identité visuelle", "Print", "Alternance"], "intro": "Refondre l'image d'un bar iconique tout en préservant son âme steampunk.", "meta": [["Client", "Lake Pub"], ["Durée", "2 ans (alternance)"], ["Localisation", "Sevrier, Annecy"]], "media": [{"t": "image", "f": "lakepub-id-cover.jpg"}, {"t": "image", "f": "lakepub-id-oktoberfest.jpg"}, {"t": "image", "f": "lakepub-id-labete.jpg"}, {"t": "image", "f": "lakepub-id-venue.jpg"}, {"t": "image", "f": "lakepub-id-billard.jpg"}, {"t": "image", "f": "lakepub-id-mockup.jpg"}, {"t": "image", "f": "lakepub-id-mid.jpg"}, {"t": "image", "f": "lakepub-id-duo1.jpg"}, {"t": "image", "f": "lakepub-id-duo2.jpg"}], "paras": ["Le Lake Pub est un bar de 300 m² installé à Sévrier, en bord de lac d'Annecy. Créé en 2004, racheté en 2018, il est connu pour ses tables de billard, fléchettes, baby-foot et flipper — et pour une atmosphère steampunk affirmée.", "Dans le cadre de mon apprentissage de deux ans, j'ai repris l'intégralité de l'image du bar. Le premier chantier : alléger le logo tout en conservant une identité forte et reconnaissable. Le travail s'est ensuite étendu à la décoration intérieure, aux affiches événementielles, au site web et à tous les supports de communication.", "Chaque support a été pensé pour maintenir la cohérence de l'univers steampunk — entre typographies travaillées, textures métalliques et compositions éditoriales impactantes."]}, "fablab": {"title": "Fab Lab", "cat": "UX · UI Design", "date": "2023", "tags": ["UX · UI Design", "Figma", "Workshop"], "intro": "Concevoir en une semaine l'identité numérique d'un espace de création.", "meta": [["Client", "FabLab / Les Gobelins"], ["Année", "2023"], ["Durée", "1 semaine"]], "media": [{"t": "image", "f": "fablab-cover.jpg"}, {"t": "image", "f": "fablab-web-1.jpg"}, {"t": "image", "f": "fablab-web-2.jpg"}, {"t": "image", "f": "fablab-mockup.jpg"}], "paras": ["Ce projet a été réalisé dans le cadre d'un workshop organisé par l'École des Gobelins, centré sur la maîtrise de Figma comme outil de design. L'objectif : créer des maquettes complètes pour le site web d'un Fab Lab basé à Annecy.", "En une semaine, j'ai livré une identité visuelle cohérente, des maquettes desktop pour la page d'accueil, une page événements et une page équipements, ainsi qu'une version mobile de la homepage — le tout accompagné d'un design system documenté dans Figma.", "Le résultat est un prototype interactif fonctionnel qui pourrait servir de base au déploiement réel du site web du Fab Lab."]}, "lempire": {"title": "L'Empire", "cat": "Branding", "date": "2022", "tags": ["Branding", "Identité visuelle", "Boulangerie"], "intro": "Créer de toutes pièces l'identité d'une boulangerie artisanale parisienne.", "meta": [["Client", "Confidentiel"], ["Année", "2022"], ["Secteur", "Artisanat / Restauration"]], "media": [{"t": "image", "f": "lempire-cover.jpg"}, {"t": "image", "f": "lempire-duo.jpg"}], "paras": ["L'Empire est une boulangerie artisanale en cours d'ouverture à Paris. Le projet consistait à concevoir une charte graphique complète permettant au client de communiquer sur les réseaux sociaux et de l'intégrer à l'identité visuelle physique de son établissement.", "Le travail a débuté par la création de moodboards, une analyse concurrentielle approfondie et le développement de plusieurs pistes créatives pour le logo. L'objectif était de trouver un équilibre entre artisanat, élégance et modernité — des valeurs au cœur du positionnement de la marque."]}, "lakepub-web": {"title": "Lake Pub — Site web", "cat": "Web design", "date": "2023", "tags": ["Web design", "WordPress", "Elementor"], "intro": "Moderniser la présence en ligne d'un établissement emblématique avec sa nouvelle identité.", "meta": [["Client", "Lake Pub"], ["Année", "2023"], ["Site", "lakepub.fr"]], "media": [{"t": "image", "f": "lakepub-web-cover.jpg"}, {"t": "image", "f": "lakepub-web-mid.jpg"}], "paras": ["Dans la continuité du travail d'identité visuelle réalisé pour le Lake Pub, ce projet consistait à remplacer le site web vieillissant par une interface contemporaine intégrant la nouvelle charte graphique de l'établissement.", "La conception a débuté sur Figma pour le prototypage et l'architecture de l'information. Le développement a été réalisé sous WordPress avec Elementor Pro, complété par du CSS personnalisé pour les détails de finition.", "Le site final comporte une dizaine de pages entièrement responsive — mobile, tablette, desktop — reflétant l'univers steampunk du Lake Pub tout en offrant une expérience utilisateur moderne et intuitive."]}};

  var IMG = 'assets/images/projects/';

  // ── Traductions projets (surcouches en anglais) ─────
  var PROJECTS_EN = {
    "lacourdesgrands": {
      title: "La Cour des Grands", cat: "Branding",
      tags: ["Branding", "Visual identity", "Naming", "Email design"],
      intro: "Building a brand identity for investment enthusiasts — between prestige, trust and modernity.",
      paras: [
        "La Cour des Grands is a media outlet dedicated to investing — finance, stocks, real estate, crypto. The goal: deliver daily, exclusive and trustworthy content straight to inboxes, in a warm yet demanding tone.",
        "The naming was built around the idea of belonging to a select circle, growing and progressing. The logo features a subtle crown — a symbol of respect for readers and the importance given to every message. The blue and red palette conveys trust, prestige and momentum.",
        "From the full visual identity to email templates, every element was crafted to strengthen the media's authority and build loyalty within a demanding community of investors."
      ]
    },
    "stylingcoiffure": {
      title: "Styling Coiffure", cat: "Web design",
      tags: ["Web design", "WordPress", "Haute-Savoie"],
      intro: "Giving a digital storefront to a hair salon rooted in its territory, with modernity and warmth.",
      paras: [
        "Styling Coiffure is a 103 m² salon in Meythet, Haute-Savoie. Founded in October 1985 by Stéphane and Brigitte, it upholds a family tradition of excellence under the current owner.",
        "The project involved creating a website reflecting the salon's professional yet welcoming character — showcasing its history, team, hair and nail services, and integrating an online booking module.",
        "The result: a modern and intuitive interface that boosts the salon's digital visibility and attracts new clients, while keeping regulars engaged."
      ]
    },
    "congresannecy": {
      title: "Annecy Convention Center", cat: "Visual identity",
      tags: ["Visual identity", "Competition", "Les Gobelins"],
      intro: "Reinventing the image of a prestigious venue in the heart of the Alps.",
      paras: [
        "In my final year at Les Gobelins in Annecy, I took part in a visual-identity contest for the Annecy Convention Center, housed within the Palais de l'Impérial.",
        "Paired with Léa, we designed a logo weaving the initials CCA together with mountain landscape elements — representing transition, innovation and Annecy's geographic anchoring. Our proposal was selected among about twenty entries and reached the finals — we finished third.",
        "Beyond the result, this project gave us concrete experience in design methodology, teamwork under constraints and presenting to a professional jury."
      ]
    },
    "vulpo": {
      title: "Vulpo", cat: "UX · UI Design",
      tags: ["UX · UI Design", "Mobile app", "Figma"],
      intro: "Designing an app that reconciles technology and nature.",
      paras: [
        "Vulpo is a graduation project done as a team of four — three designers and one developer. The ambition: create an intuitive and immersive app that enriches nature experiences, from hiking to a simple walk in the woods.",
        "The app relies on connected beacons placed across natural areas, transmitting real-time information about local wildlife, trails to explore and hazards to avoid. The interface was designed to feel ergonomic, fluid and accessible to any user.",
        "Vulpo embodies a vision of technology serving the living: helping people enjoy nature with peace of mind while deepening their understanding of the ecosystems around them."
      ]
    },
    "lakepub-identite": {
      title: "Lake Pub — Identity", cat: "Branding",
      tags: ["Branding", "Visual identity", "Print", "Apprenticeship"],
      intro: "Refreshing the image of an iconic pub while preserving its steampunk soul.",
      paras: [
        "Lake Pub is a 300 m² bar in Sévrier, on the shore of Lake Annecy. Founded in 2004 and taken over in 2018, it's known for its pool tables, darts, foosball and pinball — and for its bold steampunk atmosphere.",
        "During my two-year apprenticeship, I took over the entire visual identity. The first task: lighten the logo while keeping a strong, recognizable identity. The work then extended to interior decoration, event posters, the website and every communication material.",
        "Every asset was crafted to keep the steampunk world consistent — refined typography, metal textures and bold editorial layouts."
      ]
    },
    "fablab": {
      title: "Fab Lab", cat: "UX · UI Design",
      tags: ["UX · UI Design", "Figma", "Workshop"],
      intro: "Designing the digital identity of a creation space in one week.",
      paras: [
        "This project was done during a workshop at Les Gobelins, centered on mastering Figma as a design tool. The goal: create full mockups for the website of a Fab Lab in Annecy.",
        "Within a week, I delivered a coherent visual identity, desktop mockups for the home page, an events page and an equipment page, plus a mobile version of the homepage — all documented in a Figma design system.",
        "The result is a functional interactive prototype that could serve as a base for actually deploying the Fab Lab website."
      ]
    },
    "lempire": {
      title: "L'Empire", cat: "Branding",
      tags: ["Branding", "Visual identity", "Bakery"],
      intro: "Building from scratch the identity of an artisan Parisian bakery.",
      paras: [
        "L'Empire is an artisan bakery about to open in Paris. The brief: build a full brand guideline so the client could communicate on social media and integrate the identity into the physical shop.",
        "The work started with moodboards, a competitive analysis and several creative directions for the logo. The goal was to strike a balance between craftsmanship, elegance and modernity — the values at the heart of the brand's positioning."
      ]
    },
    "lakepub-web": {
      title: "Lake Pub — Website", cat: "Web design",
      tags: ["Web design", "WordPress", "Elementor"],
      intro: "Modernizing the online presence of an iconic venue with its refreshed identity.",
      paras: [
        "Following on from the visual identity work done for Lake Pub, this project involved replacing the aging website with a contemporary interface that integrates the venue's new brand guidelines.",
        "The design started on Figma for prototyping and information architecture. Development was done on WordPress with Elementor Pro, complemented with custom CSS for finishing touches.",
        "The final site includes about ten fully responsive pages — mobile, tablet, desktop — reflecting Lake Pub's steampunk world while offering a modern, intuitive user experience."
      ]
    }
  };

  var META_EN = {
    "Client": "Client", "Année": "Year", "Secteur": "Sector",
    "Contexte": "Context", "Durée": "Duration",
    "Localisation": "Location", "Site": "Website"
  };
  function tMeta(k){
    if(window.__lang === 'en' && META_EN[k]) return META_EN[k];
    return k;
  }

  function getP(id){
    var base = PROJECTS[id];
    if(!base) return null;
    if(window.__lang === 'en' && PROJECTS_EN[id]){
      var over = PROJECTS_EN[id];
      return {
        title: over.title || base.title,
        cat: over.cat || base.cat,
        date: base.date,
        tags: over.tags || base.tags,
        intro: over.intro || base.intro,
        meta: base.meta,
        media: base.media,
        paras: over.paras || base.paras
      };
    }
    return base;
  }

  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function mediaHtml(m){
    if(m.t === 'video'){
      return '<video src="' + IMG + m.f + '" autoplay muted loop playsinline preload="metadata"></video>';
    }
    return '<img loading="lazy" src="' + IMG + m.f + '" alt="">';
  }

  // ── Liste des projets ────────────────────
  function buildProjectList(){
    var host = document.getElementById('proj-list');
    if(!host) return;
    host.innerHTML = PROJECT_ORDER.map(function(id){
      var p = getP(id);
      var cover = (p.media[0] || {}).f || '';
      return '<article class="proj-card" data-project="' + id + '">'
        + '<div class="pc-cover"><img loading="lazy" src="' + IMG + cover + '" alt=""></div>'
        + '<div class="pc-body"><h3>' + esc(p.title) + '</h3>'
        + '<p>' + esc(p.intro) + '</p>'
        + '<div class="pc-meta">' + esc(p.cat) + ' — ' + esc(p.date) + '</div></div>'
        + '</article>';
    }).join('');
    // Les cartes sont recréées via innerHTML — on les ré-enregistre dans scroll-tilt
    if (typeof window.applyScrollTilt === 'function') window.applyScrollTilt(host);
  }

  // ── Fiche détail ─────────────────────────
  var currentProjectId = null;
  function openProject(id){
    var p = getP(id);
    if(!p){ showView('projets'); return; }
    currentProjectId = id;
    var host = document.getElementById('pd-content');
    if(!host) return;
    var tags = p.tags.map(function(t){ return '<span class="pd-tag">' + esc(t) + '</span>'; }).join('');
    var meta = p.meta.map(function(kv){
      return '<div class="pd-mrow"><span class="pd-mk">' + esc(tMeta(kv[0])) + '</span><span class="pd-mv">' + esc(kv[1]) + '</span></div>';
    }).join('');
    var cover = p.media[0] ? mediaHtml(p.media[0]) : '';
    if (id === 'lakepub-identite' && cover) cover = cover.replace(/^<(img|video)/, '<$1 class="no-tilt"');
    var rest = p.media.slice(1).map(function(m, i){
      var html = mediaHtml(m);
      if (i === 0 && id === 'congresannecy') html = html.replace(/^<(img|video)/, '<$1 class="no-tilt"');
      return html;
    }).join('');
    var paras = p.paras.map(function(t){ return '<p class="dc-body">' + esc(t) + '</p>'; }).join('');

    var idx = PROJECT_ORDER.indexOf(id);
    var prevId = PROJECT_ORDER[(idx - 1 + PROJECT_ORDER.length) % PROJECT_ORDER.length];
    var nextId = PROJECT_ORDER[(idx + 1) % PROJECT_ORDER.length];
    var prevP = getP(prevId);
    var nextP = getP(nextId);
    var prevTitle = prevP ? prevP.title : '';
    var nextTitle = nextP ? nextP.title : '';
    var isEn = window.__lang === 'en';
    var prevLabel = isEn ? 'Previous' : 'Précédent';
    var nextLabel = isEn ? 'Next' : 'Suivant';
    var navHtml =
        '<nav class="pd-nav">'
      +   '<a class="pd-nav-btn pd-nav-btn--prev" data-project="' + prevId + '" href="#projet/' + prevId + '">'
      +     '<span class="pd-nav-dir"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>' + prevLabel + '</span>'
      +     '<span class="pd-nav-title">' + esc(prevTitle) + '</span>'
      +   '</a>'
      +   '<a class="pd-nav-btn pd-nav-btn--next" data-project="' + nextId + '" href="#projet/' + nextId + '">'
      +     '<span class="pd-nav-dir">' + nextLabel + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg></span>'
      +     '<span class="pd-nav-title">' + esc(nextTitle) + '</span>'
      +   '</a>'
      + '</nav>';

    host.innerHTML =
        '<h1>' + esc(p.title) + '</h1>'
      + '<div class="pd-tags">' + tags + '</div>'
      + '<p class="pd-intro">' + esc(p.intro) + '</p>'
      + (cover ? '<div class="pd-media">' + cover + '</div>' : '')
      + '<div class="pd-meta">' + meta + '</div>'
      + '<div class="pd-paras">' + paras + '</div>'
      + (rest ? '<div class="pd-media">' + rest + '</div>' : '');

    var navHost = document.getElementById('pd-nav-host');
    if (navHost) navHost.innerHTML = navHtml;

    showView('projet', 'projets');
    if (typeof window.applyScrollTilt === 'function') {
      window.applyScrollTilt(host);
      if (navHost) window.applyScrollTilt(navHost);
    }
  }

  // ── Routing ──────────────────────────────
  function route(){
    var h = (location.hash || '#accueil').replace(/^#/, '');
    if(h.indexOf('projet/') === 0){
      openProject(h.split('/')[1]);
      return;
    }
    if(views[h]) showView(h);
    else showView('accueil');
  }

  document.addEventListener('click', function(e){
    var el = e.target.closest('[data-view], [data-project], [data-back]');
    if(!el) return;
    if(el.hasAttribute('data-back')){
      e.preventDefault();
      location.hash = 'projets';
      return;
    }
    if(el.dataset.project){
      e.preventDefault();
      location.hash = 'projet/' + el.dataset.project;
      return;
    }
    if(el.dataset.view){
      e.preventDefault();
      location.hash = el.dataset.view;
    }
  });

  window.addEventListener('hashchange', route);

  // ── Réagir aux changements de langue ─────
  window.onLangChange = function(){
    buildProjectList();
    var projetView = document.getElementById('view-projet');
    if (currentProjectId && projetView && projetView.classList.contains('is-active')) {
      openProject(currentProjectId);
    }
  };

  // ── Contact form ─────────────────────────
  var form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get('name') || '').toString().trim();
      var email = (data.get('email') || '').toString().trim();
      var message = (data.get('message') || '').toString().trim();
      var subject = 'Contact site — ' + (name || 'sans nom');
      var body =
        'Nom : ' + name + '\n' +
        'Email : ' + email + '\n\n' +
        message;
      var href = 'mailto:benjamin.hocq@outlook.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);
      window.location.href = href;
      var msg = document.getElementById('form-sent');
      msg.classList.add('show');
      form.reset();
      setTimeout(function(){ msg.classList.remove('show'); }, 5000);
    });
  }

  buildProjectList();
  route();
})();
