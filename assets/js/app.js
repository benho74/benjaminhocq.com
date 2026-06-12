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
  }

  // ── Données projets ──────────────────────
  var PROJECT_ORDER = ["lacourdesgrands", "stylingcoiffure", "congresannecy", "vulpo", "lakepub-identite", "fablab", "lempire", "lakepub-web"];
  var PROJECTS = {"lacourdesgrands": {"title": "La Cour des Grands", "cat": "Branding", "date": "2025", "tags": ["Branding", "Identité visuelle", "Naming", "Email design"], "intro": "Construire une identité de marque pour les passionnés d'investissement — entre prestige, confiance et modernité.", "meta": [["Client", "La Cour des Grands"], ["Année", "2025"], ["Secteur", "Média / Finance"]], "media": [{"t": "image", "f": "lacourdesgrands-cover.jpg"}, {"t": "video", "f": "lacourdesgrands-video.mp4"}, {"t": "image", "f": "lacourdesgrands-bourse.jpg"}, {"t": "image", "f": "lacourdesgrands-suite.jpg"}, {"t": "image", "f": "lacourdesgrands-mockup.jpg"}, {"t": "image", "f": "lacourdesgrands-mid.jpg"}, {"t": "image", "f": "lacourdesgrands-duo1.jpg"}, {"t": "image", "f": "lacourdesgrands-duo2.jpg"}], "paras": ["La Cour des Grands est un média dédié à l'investissement — finance, bourse, immobilier, crypto-monnaies. L'objectif : délivrer chaque jour du contenu exclusif et fiable directement en boîte mail, dans une ambiance à la fois chaleureuse et exigeante.", "Le naming s'est construit autour de l'idée d'appartenir à un cercle restreint, d'évoluer, de progresser. Le logo intègre une couronne discrète — symbole de respect envers les lecteurs et d'importance accordée à chaque prise de parole. La palette bleu et rouge traduit confiance, prestige et dynamisme.", "De l'identité visuelle complète aux templates d'email, chaque élément a été pensé pour renforcer l'autorité du média et fidéliser une communauté d'investisseurs exigeants."]}, "stylingcoiffure": {"title": "Styling Coiffure", "cat": "Web design", "date": "2024", "tags": ["Web design", "WordPress", "Haute-Savoie"], "intro": "Donner une vitrine digitale à un salon de coiffure ancré dans son territoire, avec modernité et chaleur.", "meta": [["Client", "Styling Coiffure"], ["Année", "2024"], ["Secteur", "Beauté / Coiffure"]], "media": [{"t": "image", "f": "stylingcoiffure-cover.jpg"}, {"t": "image", "f": "stylingcoiffure-mid.jpg"}, {"t": "image", "f": "stylingcoiffure-duo1.jpg"}, {"t": "image", "f": "stylingcoiffure-duo2.jpg"}], "paras": ["Styling Coiffure est un salon de 103 m² installé à Meythet, en Haute-Savoie. Fondé en octobre 1985 par Stéphane et Brigitte, il perpétue aujourd'hui une tradition familiale d'excellence sous la direction du repreneur actuel.", "Le projet consistait à créer un site web qui incarne le caractère professionnel et accueillant du salon — en mettant en valeur son histoire, son équipe, ses services coiffure et onglerie, et en intégrant un module de prise de rendez-vous en ligne.", "Le résultat : une interface moderne et intuitive qui renforce la visibilité digitale du salon et attire de nouveaux clients, tout en fidélisant les habitués."]}, "congresannecy": {"title": "Congrès Annecy", "cat": "Identité visuelle", "date": "2023", "tags": ["Identité visuelle", "Concours", "Les Gobelins"], "intro": "Réinventer l'image d'un lieu de prestige au cœur des Alpes.", "meta": [["Client", "Centre de Congrès d'Annecy"], ["Année", "2023"], ["Contexte", "Concours / Les Gobelins"]], "media": [{"t": "image", "f": "congresannecy-cover.jpg"}, {"t": "image", "f": "congresannecy-presentation.jpg"}, {"t": "image", "f": "congresannecy-mockup.jpg"}, {"t": "image", "f": "congresannecy-mid.jpg"}, {"t": "image", "f": "congresannecy-duo1.jpg"}], "paras": ["En dernière année à l'École des Gobelins à Annecy, j'ai eu l'opportunité de participer à un concours de création d'identité visuelle pour le Centre de Congrès d'Annecy, situé dans l'enceinte du Palais de l'Impérial.", "En binôme avec Léa, nous avons conçu un logo qui intègre les initiales CCA avec des éléments de paysage montagnard, représentant la transition, l'innovation et l'ancrage géographique d'Annecy. Notre proposition a été retenue parmi une vingtaine de participants et a atteint la finale — nous avons décroché la troisième place.", "Au-delà du résultat, ce projet nous a apporté une expérience concrète dans la méthodologie design, le travail en équipe sous contrainte et la présentation face à un jury professionnel."]}, "vulpo": {"title": "Vulpo", "cat": "UX · UI Design", "date": "2023", "tags": ["UX · UI Design", "Application mobile", "Figma"], "intro": "Concevoir une application qui réconcilie technologie et nature.", "meta": [["Client", "Projet académique"], ["Année", "2023"], ["Contexte", "Bachelor / Les Gobelins"]], "media": [{"t": "image", "f": "vulpo-cover.jpg"}, {"t": "video", "f": "vulpo-video-1.mp4"}, {"t": "image", "f": "vulpo-semnoz.jpg"}, {"t": "video", "f": "vulpo-video-2.mp4"}, {"t": "image", "f": "vulpo-mockup.jpg"}, {"t": "image", "f": "vulpo-mid.jpg"}], "paras": ["Vulpo est un projet de fin d'études réalisé en équipe — trois designers et un développeur. L'ambition : créer une application intuitive et immersive pour enrichir les expériences en pleine nature, que ce soit en randonnée, en forêt ou lors d'une simple promenade.", "L'application repose sur un système de balises connectées positionnées dans les espaces naturels, qui transmettent en temps réel des informations sur la faune présente, les sentiers à explorer et les dangers à éviter. L'interface a été conçue pour être ergonomique, fluide et accessible à tous les profils d'utilisateurs.", "Vulpo incarne une vision de la technologie au service du vivant : permettre aux gens de profiter de la nature en toute sérénité, tout en approfondissant leur connaissance des écosystèmes qui les entourent."]}, "lakepub-identite": {"title": "Lake Pub — Identité", "cat": "Branding", "date": "2 ans (alternance)", "tags": ["Branding", "Identité visuelle", "Print", "Alternance"], "intro": "Refondre l'image d'un bar iconique tout en préservant son âme steampunk.", "meta": [["Client", "Lake Pub"], ["Durée", "2 ans (alternance)"], ["Localisation", "Sevrier, Annecy"]], "media": [{"t": "image", "f": "lakepub-id-cover.jpg"}, {"t": "image", "f": "lakepub-id-oktoberfest.jpg"}, {"t": "image", "f": "lakepub-id-labete.jpg"}, {"t": "image", "f": "lakepub-id-venue.jpg"}, {"t": "image", "f": "lakepub-id-billard.jpg"}, {"t": "image", "f": "lakepub-id-mockup.jpg"}, {"t": "image", "f": "lakepub-id-mid.jpg"}, {"t": "image", "f": "lakepub-id-duo1.jpg"}, {"t": "image", "f": "lakepub-id-duo2.jpg"}], "paras": ["Le Lake Pub est un bar de 300 m² installé à Sévrier, en bord de lac d'Annecy. Créé en 2004, racheté en 2018, il est connu pour ses tables de billard, fléchettes, baby-foot et flipper — et pour une atmosphère steampunk affirmée.", "Dans le cadre de mon apprentissage de deux ans, j'ai repris l'intégralité de l'image du bar. Le premier chantier : alléger le logo tout en conservant une identité forte et reconnaissable. Le travail s'est ensuite étendu à la décoration intérieure, aux affiches événementielles, au site web et à tous les supports de communication.", "Chaque support a été pensé pour maintenir la cohérence de l'univers steampunk — entre typographies travaillées, textures métalliques et compositions éditoriales impactantes."]}, "fablab": {"title": "Fab Lab", "cat": "UX · UI Design", "date": "2023", "tags": ["UX · UI Design", "Figma", "Workshop"], "intro": "Concevoir en une semaine l'identité numérique d'un espace de création.", "meta": [["Client", "FabLab / Les Gobelins"], ["Année", "2023"], ["Durée", "1 semaine"]], "media": [{"t": "image", "f": "fablab-cover.jpg"}, {"t": "image", "f": "fablab-web-1.jpg"}, {"t": "image", "f": "fablab-web-2.jpg"}, {"t": "image", "f": "fablab-mockup.jpg"}], "paras": ["Ce projet a été réalisé dans le cadre d'un workshop organisé par l'École des Gobelins, centré sur la maîtrise de Figma comme outil de design. L'objectif : créer des maquettes complètes pour le site web d'un Fab Lab basé à Annecy.", "En une semaine, j'ai livré une identité visuelle cohérente, des maquettes desktop pour la page d'accueil, une page événements et une page équipements, ainsi qu'une version mobile de la homepage — le tout accompagné d'un design system documenté dans Figma.", "Le résultat est un prototype interactif fonctionnel qui pourrait servir de base au déploiement réel du site web du Fab Lab."]}, "lempire": {"title": "L'Empire", "cat": "Branding", "date": "2022", "tags": ["Branding", "Identité visuelle", "Boulangerie"], "intro": "Créer de toutes pièces l'identité d'une boulangerie artisanale parisienne.", "meta": [["Client", "Confidentiel"], ["Année", "2022"], ["Secteur", "Artisanat / Restauration"]], "media": [{"t": "image", "f": "lempire-cover.jpg"}, {"t": "image", "f": "lempire-duo.jpg"}], "paras": ["L'Empire est une boulangerie artisanale en cours d'ouverture à Paris. Le projet consistait à concevoir une charte graphique complète permettant au client de communiquer sur les réseaux sociaux et de l'intégrer à l'identité visuelle physique de son établissement.", "Le travail a débuté par la création de moodboards, une analyse concurrentielle approfondie et le développement de plusieurs pistes créatives pour le logo. L'objectif était de trouver un équilibre entre artisanat, élégance et modernité — des valeurs au cœur du positionnement de la marque."]}, "lakepub-web": {"title": "Lake Pub — Site web", "cat": "Web design", "date": "2023", "tags": ["Web design", "WordPress", "Elementor"], "intro": "Moderniser la présence en ligne d'un établissement emblématique avec sa nouvelle identité.", "meta": [["Client", "Lake Pub"], ["Année", "2023"], ["Site", "lakepub.fr"]], "media": [{"t": "image", "f": "lakepub-web-cover.jpg"}, {"t": "image", "f": "lakepub-web-mid.jpg"}], "paras": ["Dans la continuité du travail d'identité visuelle réalisé pour le Lake Pub, ce projet consistait à remplacer le site web vieillissant par une interface contemporaine intégrant la nouvelle charte graphique de l'établissement.", "La conception a débuté sur Figma pour le prototypage et l'architecture de l'information. Le développement a été réalisé sous WordPress avec Elementor Pro, complété par du CSS personnalisé pour les détails de finition.", "Le site final comporte une dizaine de pages entièrement responsive — mobile, tablette, desktop — reflétant l'univers steampunk du Lake Pub tout en offrant une expérience utilisateur moderne et intuitive."]}};

  var IMG = 'assets/images/projects/';

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
      var p = PROJECTS[id];
      var cover = (p.media[0] || {}).f || '';
      return '<article class="proj-card" data-project="' + id + '">'
        + '<div class="pc-cover"><img loading="lazy" src="' + IMG + cover + '" alt=""></div>'
        + '<div class="pc-body"><h3>' + esc(p.title) + '</h3>'
        + '<p>' + esc(p.intro) + '</p>'
        + '<div class="pc-meta">' + esc(p.cat) + ' — ' + esc(p.date) + '</div></div>'
        + '</article>';
    }).join('');
  }

  // ── Fiche détail ─────────────────────────
  function openProject(id){
    var p = PROJECTS[id];
    if(!p){ showView('projets'); return; }
    var host = document.getElementById('pd-content');
    if(!host) return;
    var tags = p.tags.map(function(t){ return '<span class="pd-tag">' + esc(t) + '</span>'; }).join('');
    var meta = p.meta.map(function(kv){
      return '<div class="pd-mrow"><span class="pd-mk">' + esc(kv[0]) + '</span><span class="pd-mv">' + esc(kv[1]) + '</span></div>';
    }).join('');
    var cover = p.media[0] ? mediaHtml(p.media[0]) : '';
    var rest = p.media.slice(1).map(mediaHtml).join('');
    var paras = p.paras.map(function(t){ return '<p class="dc-body">' + esc(t) + '</p>'; }).join('');

    host.innerHTML =
        '<p class="dc-cat"><span>' + esc(p.cat) + '</span><span>' + esc(p.date) + '</span></p>'
      + '<h1>' + esc(p.title) + '</h1>'
      + '<div class="pd-tags">' + tags + '</div>'
      + '<p class="pd-intro">' + esc(p.intro) + '</p>'
      + (cover ? '<div class="pd-media">' + cover + '</div>' : '')
      + '<div class="pd-meta">' + meta + '</div>'
      + '<div class="pd-paras">' + paras + '</div>'
      + (rest ? '<div class="pd-media">' + rest + '</div>' : '');

    showView('projet', 'projets');
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

  // ── Contact form ─────────────────────────
  var form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var msg = document.getElementById('form-sent');
      msg.classList.add('show');
      form.reset();
      setTimeout(function(){ msg.classList.remove('show'); }, 4000);
    });
  }

  buildProjectList();
  route();
})();
