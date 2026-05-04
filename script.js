const MONTHS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

const events = {
  '2026-05-03': 'ev-sortie',
  '2026-05-04': 'ev-atelier',
  '2026-05-08': 'ev-conf',
  '2026-05-09': 'ev-valmares',
  '2026-05-10': 'ev-reserve',
  '2026-05-11': 'ev-pesticide',
  '2026-05-12': 'ev-atelier',
  '2026-05-30': 'ev-valmares',
  '2026-05-31': 'ev-conf',
};

const multiEvents = {
  '2026-05-09': true,
  '2026-05-31': true,
};

let year = 2026, month = 4;

function pad(n) { return String(n).padStart(2, '0'); }

function render() {
  document.getElementById('month-label').textContent = MONTHS[month] + ' ' + year;
  const grid = document.getElementById('cal-grid');
  grid.querySelectorAll('.day').forEach(e => e.remove());

  const firstDow = new Date(year, month, 1).getDay();
  const offset = firstDow === 0 ? 6 : firstDow - 1;
  const days = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isNow = today.getFullYear() === year && today.getMonth() === month;

  for (let i = 0; i < offset; i++) {
    const el = document.createElement('div');
    el.className = 'day empty';
    grid.appendChild(el);
  }

  for (let d = 1; d <= days; d++) {
    const key = `${year}-${pad(month + 1)}-${pad(d)}`;
    const ev = events[key] || '';
    const el = document.createElement('div');

    let cls = 'day';
    if (isNow && today.getDate() === d) cls += ' today';
    else if (ev) cls += ' ' + ev;
    else cls += ' plain';
    el.className = cls;
    el.textContent = d;

    if (multiEvents[key]) {
      const plus = document.createElement('span');
      plus.className = 'plus';
      plus.textContent = '+';
      el.appendChild(plus);
    }

    grid.appendChild(el);
  }
}

document.getElementById('prev').onclick = () => { month--; if (month < 0) { month = 11; year--; } render(); };
document.getElementById('next').onclick = () => { month++; if (month > 11) { month = 0; year++; } render(); };

render();

document.querySelectorAll('.nav-links > li').forEach(li => {
  let timer;
  li.addEventListener('mouseenter', () => {
    clearTimeout(timer);
    li.querySelector('.dropdown')?.classList.add('open');
  });
  li.addEventListener('mouseleave', () => {
    timer = setTimeout(() => {
      li.querySelector('.dropdown')?.classList.remove('open');
    }, 150);
  });
});
// ===== HERO SLIDER — ÉCO-RESPONSABLE =====
// - Chargement différé des images (slides 2 & 3 via data-src)
// - Auto-play désactivé si prefers-reduced-motion
// - Bouton pause : l'utilisateur contrôle
// - clearInterval systématique avant tout nouveau setInterval
(function () {
  const slides   = document.querySelectorAll('.hero-slide');
  const dots     = document.querySelectorAll('.hero-dot');
  const prevBtn  = document.querySelector('.hero-arrow--prev');
  const nextBtn  = document.querySelector('.hero-arrow--next');
  const pauseBtn = document.getElementById('hero-pause');
  if (!slides.length) return;

  let current = 0;
  let timer   = null;
  let paused  = false;

  // Chargement différé : on applique background-image seulement à la demande
  function lazyLoad(idx) {
    const slide = slides[idx];
    if (slide && slide.dataset.src && !slide.style.backgroundImage) {
      slide.style.backgroundImage = "url('" + slide.dataset.src + "')";
    }
  }

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');
    current = (idx + slides.length) % slides.length;
    lazyLoad(current);
    lazyLoad((current + 1) % slides.length); // précharge la suivante discrètement
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function startAuto() {
    clearInterval(timer);
    if (!paused) timer = setInterval(() => goTo(current + 1), 6000);
  }

  function togglePause() {
    paused = !paused;
    pauseBtn.setAttribute('aria-pressed', String(paused));
    pauseBtn.querySelector('.pause-icon').textContent = paused ? '▶' : '⏸';
    pauseBtn.setAttribute('aria-label', paused ? 'Lancer le diaporama' : 'Mettre en pause le diaporama');
    if (paused) clearInterval(timer);
    else startAuto();
  }

  // Respecter prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    paused = true;
    if (pauseBtn) {
      pauseBtn.querySelector('.pause-icon').textContent = '▶';
      pauseBtn.setAttribute('aria-pressed', 'true');
      pauseBtn.setAttribute('aria-label', 'Lancer le diaporama');
    }
  }

  if (prevBtn)  prevBtn.addEventListener('click',  () => { goTo(current - 1); startAuto(); });
  if (nextBtn)  nextBtn.addEventListener('click',  () => { goTo(current + 1); startAuto(); });
  if (pauseBtn) pauseBtn.addEventListener('click', togglePause);

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.slide, 10));
      startAuto();
    });
  });

  lazyLoad(0);
  startAuto();
})();

const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

if (burger && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  };

  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  // Fermer le menu si on clique en dehors
  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 920) closeMenu();
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 920) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Sur mobile, les spans avec dropdown s'ouvrent au clic
  document.querySelectorAll('.nav-links > li > span').forEach(span => {
    span.addEventListener('click', (e) => {
      if (window.innerWidth <= 920) {
        e.stopPropagation();
        const dropdown = span.nextElementSibling;
        if (dropdown) dropdown.classList.toggle('open');
      }
    });
  });
}
