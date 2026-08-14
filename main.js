/* ============================================
   CERO APORTE MAG — Global JS
   ============================================ */

/* --- Reveal on scroll --- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

/* --- Timeline items reveal --- */
function initTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 120);
      }
    });
  }, { threshold: 0.1 });
  items.forEach(el => obs.observe(el));
}

/* --- Animated stat counter --- */
function animateCount(el, target, suffix = '') {
  const duration = 1800;
  const start = performance.now();
  const isFloat = String(target).includes('.');
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const val = isFloat ? (target * eased).toFixed(1) : Math.round(target * eased);
    el.textContent = val.toLocaleString('es-CL') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = true;
        const target = parseFloat(e.target.dataset.count);
        const suffix = e.target.dataset.suffix || '';
        animateCount(e.target, target, suffix);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => obs.observe(el));
}

/* --- Progress bars --- */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-fill[data-width]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = true;
        setTimeout(() => {
          e.target.style.width = e.target.dataset.width;
        }, 300);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(el => obs.observe(el));
}

/* --- Tabs --- */
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const container = tabGroup.closest('.tabs-container') || document;
        container.querySelectorAll('.tab-panel').forEach(p => {
          p.classList.toggle('active', p.dataset.panel === target);
        });
      });
    });
  });
}

/* --- Flip cards --- */
function initFlipCards() {
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
}

/* --- Word highlight interaction --- */
function initWordHighlight() {
  document.querySelectorAll('[data-highlight]').forEach(el => {
    el.style.cursor = 'pointer';
    el.style.borderBottom = '2px dashed var(--red)';
    el.style.transition = 'background 0.2s';
    el.addEventListener('click', () => {
      const tooltip = document.getElementById(el.dataset.highlight);
      if (tooltip) {
        tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
      }
    });
  });
}

/* --- Nav scroll effect --- */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 40
      ? '0 2px 24px rgba(0,0,0,0.28)'
      : 'none';
  }, { passive: true });
}

/* --- Init all --- */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initTimeline();
  initCounters();
  initProgressBars();
  initTabs();
  initFlipCards();
  initWordHighlight();
  initNavScroll();
});
