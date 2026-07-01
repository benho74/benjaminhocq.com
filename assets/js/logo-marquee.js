(() => {
  const marquee = document.querySelector('.logo-marquee');
  const track = marquee && marquee.querySelector('.logo-track');
  if (!marquee || !track) return;

  const SPEED = 40;
  const RESUME_DELAY = 1200;

  let offset = 0;
  let halfWidth = 0;
  let lastTs = 0;
  let paused = false;
  let dragging = false;
  let pointerId = null;
  let startX = 0;
  let startOffset = 0;
  let resumeTimer = 0;

  const measure = () => {
    const gapPx = parseFloat(getComputedStyle(track).gap) || 0;
    halfWidth = (track.scrollWidth + gapPx) / 2;
  };

  const applyTransform = () => {
    if (halfWidth > 0) {
      offset = ((offset % halfWidth) + halfWidth) % halfWidth;
    }
    track.style.transform = `translate3d(${-offset}px, 0, 0)`;
  };

  const loop = (ts) => {
    if (!lastTs) lastTs = ts;
    const dt = (ts - lastTs) / 1000;
    lastTs = ts;
    if (!paused && !dragging) {
      offset += SPEED * dt;
      applyTransform();
    }
    requestAnimationFrame(loop);
  };

  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    dragging = true;
    pointerId = e.pointerId;
    startX = e.clientX;
    startOffset = offset;
    marquee.classList.add('is-dragging');
    marquee.setPointerCapture && marquee.setPointerCapture(pointerId);
    clearTimeout(resumeTimer);
    paused = true;
  };

  const onPointerMove = (e) => {
    if (!dragging || e.pointerId !== pointerId) return;
    offset = startOffset - (e.clientX - startX);
    applyTransform();
  };

  const endDrag = (e) => {
    if (!dragging || (e && e.pointerId !== pointerId)) return;
    dragging = false;
    marquee.classList.remove('is-dragging');
    if (pointerId != null && marquee.releasePointerCapture) {
      try { marquee.releasePointerCapture(pointerId); } catch {}
    }
    pointerId = null;
    resumeTimer = setTimeout(() => { paused = false; }, RESUME_DELAY);
  };

  const onEnter = () => { clearTimeout(resumeTimer); paused = true; };
  const onLeave = () => { if (!dragging) resumeTimer = setTimeout(() => { paused = false; }, RESUME_DELAY); };

  marquee.addEventListener('pointerdown', onPointerDown);
  marquee.addEventListener('pointermove', onPointerMove);
  marquee.addEventListener('pointerup', endDrag);
  marquee.addEventListener('pointercancel', endDrag);
  marquee.addEventListener('mouseenter', onEnter);
  marquee.addEventListener('mouseleave', onLeave);
  marquee.addEventListener('dragstart', (e) => e.preventDefault());

  const imgs = track.querySelectorAll('img');
  let pending = 0;
  imgs.forEach((img) => {
    if (!img.complete) {
      pending++;
      img.addEventListener('load', () => { if (--pending === 0) measure(); }, { once: true });
      img.addEventListener('error', () => { if (--pending === 0) measure(); }, { once: true });
    }
  });
  measure();
  window.addEventListener('resize', measure);
  requestAnimationFrame(loop);
})();
