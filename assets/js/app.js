/* ===========================================================
   Benjamin Hocq — app logic : routing, carousel, forms
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

  // show a top-level view
  function showView(name, navName){
    Object.keys(views).forEach(function(k){
      views[k].classList.toggle('is-active', k === name);
    });
    setNav(navName || name);
    scrollTop();
  }

  // ── Project detail data ──────────────────
  var projects = {
    sublizme: {
      cat: 'Projet', date: '2025',
      title: 'Sublizme',
      lead: 'Une courte phrase d’accroche sur Sublizme — le contexte et l’objectif.',
      tags: ['Identité', 'UI']
    },
    'ma-dose-crea': {
      cat: 'Projet', date: '2024',
      title: 'Ma dose créa',
      lead: 'Une courte phrase d’accroche sur Ma dose créa — le contexte et l’objectif.',
      tags: ['Direction artistique', 'Web']
    },
    elevet: {
      cat: 'Projet', date: '2024',
      title: 'ELEVET',
      lead: 'Une courte phrase d’accroche sur ELEVET — le contexte et l’objectif.',
      tags: ['Produit', 'Prototype']
    }
  };

  function openProject(id){
    var p = projects[id];
    if(!p) return;
    document.getElementById('pd-cat').textContent = p.cat;
    document.getElementById('pd-date').textContent = p.date;
    document.getElementById('pd-title').textContent = p.title;
    document.getElementById('pd-lead').innerHTML = p.lead;
    var holder = document.getElementById('pd-image-holder');
    holder.innerHTML = '<image-slot id="pd-img-' + id + '" placeholder="Visuel — ' + p.title + '"></image-slot>';
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

  // intercept nav + any [data-link]
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

  // ── Carousel (Parcours) ──────────────────
  function initCarousel(root){
    var slides = root.querySelectorAll('.slide');
    var idx = 0;
    function go(n){
      idx = (n + slides.length) % slides.length;
      slides.forEach(function(s,i){ s.classList.toggle('is-active', i === idx); });
    }
    root.querySelectorAll('[data-car="prev"]').forEach(function(b){ b.addEventListener('click', function(){ go(idx-1); }); });
    root.querySelectorAll('[data-car="next"]').forEach(function(b){ b.addEventListener('click', function(){ go(idx+1); }); });
    go(0);
  }
  document.querySelectorAll('.carousel').forEach(initCarousel);

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

  route();
})();
