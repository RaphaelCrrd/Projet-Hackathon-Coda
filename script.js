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
// ===== MENU BURGER MOBILE =====
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });

  // Fermer le menu si on clique en dehors
  document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
    }
  });

  // Sur mobile, les spans avec dropdown s'ouvrent au clic
  document.querySelectorAll('.nav-links > li > span').forEach(span => {
    span.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.stopPropagation();
        const dropdown = span.nextElementSibling;
        if (dropdown) dropdown.classList.toggle('open');
      }
    });
  });
}
