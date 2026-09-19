/* ============================================================
   portfolio — main.js
   Behavior layer: rendering, animations, and interactions.
   Content/data lives in js/config.js (loaded first).
   ============================================================ */

const $ = (s) => document.querySelector(s);

/* ---------- theme ---------- */
const themeBtn = $('#themeBtn');
function setTheme(t) {
  const dark = t === 'dark';
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  themeBtn.textContent = dark ? '☀' : '☾';
  try { localStorage.setItem('pf-theme', dark ? 'dark' : 'light'); } catch (e) {}
}
themeBtn.onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');

/* ---------- icons ---------- */
const ICONS = {
  github: '<svg viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z"/></svg>',
  x: '<svg viewBox="0 0 24 24"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z"/></svg>',
};

/* ---------- hero / about / contact render ---------- */
document.title = CONFIG.name + ' — Portfolio';
$('#logo').innerHTML = CONFIG.initials + '<span>.</span>';
$('#heroName').textContent = CONFIG.name;
$('#avatar').textContent = CONFIG.initials;
$('#bio').innerHTML = CONFIG.bio.map(p => `<p>${p}</p>`).join('');
$('#cvBtn').href = CONFIG.cvUrl;
$('#contactBlurb').textContent = CONFIG.contactBlurb;
$('#contactLines').innerHTML = `
  <div class="contact-line">✉️ <a href="mailto:${CONFIG.email}">${CONFIG.email}</a></div>
  <div class="contact-line">📍 <span>${CONFIG.location}</span></div>`;
$('#copy').textContent = `© ${new Date().getFullYear()} ${CONFIG.name}`;
$('#socials').innerHTML = CONFIG.socials.map(s =>
  `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}" title="${s.label}">${ICONS[s.icon] || ICONS.mail}</a>`
).join('');

/* ---------- typed roles ---------- */
const typedEl = $('#typed');
const roles = CONFIG.roles.length ? CONFIG.roles : [''];
let ri = 0, ci = 0, deleting = false;
function tick() {
  const word = roles[ri];
  typedEl.textContent = word.slice(0, ci);
  let delay = deleting ? 35 : 70;
  if (!deleting && ci === word.length) { delay = 1600; deleting = true; }
  else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 400; }
  ci += deleting ? -1 : 1;
  setTimeout(tick, delay);
}
tick();

/* ---------- stats counters ---------- */
$('#stats').innerHTML = CONFIG.stats.map(s =>
  `<div class="stat"><b data-count="${s.value}" data-suffix="${s.suffix || ''}">0</b><span>${s.label}</span></div>`
).join('');

/* ---------- skills ---------- */
$('#skillGroups').innerHTML = CONFIG.skills.map(g => `
  <div class="skill-card reveal">
    <h4>${g.group}</h4>
    ${g.items.map(s => `
      <div class="skill">
        <div class="lbl"><span>${s.n}</span><span>${s.l}%</span></div>
        <div class="bar"><i data-w="${s.l}"></i></div>
      </div>`).join('')}
  </div>`).join('');

/* ---------- projects + filters ---------- */
const allTags = [...new Set(CONFIG.projects.flatMap(p => p.tags))];
let activeFilter = 'All';
$('#filters').innerHTML = ['All', ...allTags].map(t =>
  `<button class="chip-btn${t === 'All' ? ' on' : ''}" data-f="${t}">${t}</button>`
).join('');
function renderProjects() {
  const list = activeFilter === 'All'
    ? CONFIG.projects
    : CONFIG.projects.filter(p => p.tags.includes(activeFilter));
  $('#projGrid').innerHTML = list.map((p, idx) => `
    <article class="proj" style="animation-delay:${Math.min(idx * 60, 300)}ms">
      <div class="cover" style="background:${p.gradient}">${p.title.charAt(0)}</div>
      <div class="body">
        <h4>${p.title}</h4>
        <p>${p.desc}</p>
        <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="links">
          <a href="${p.live}" target="_blank" rel="noopener">Live Demo →</a>
          <a href="${p.code}" target="_blank" rel="noopener">Source →</a>
        </div>
      </div>
    </article>`).join('');
}
$('#filters').addEventListener('click', (e) => {
  const b = e.target.closest('[data-f]');
  if (!b) return;
  activeFilter = b.dataset.f;
  document.querySelectorAll('#filters .chip-btn').forEach(x => x.classList.toggle('on', x === b));
  renderProjects();
});
renderProjects();

/* ---------- experience ---------- */
$('#timeline').innerHTML = CONFIG.experience.map(x => `
  <li class="reveal">
    <div class="period">${x.period}</div>
    <h4>${x.role}</h4>
    <div class="org">${x.org}</div>
    <p>${x.text}</p>
  </li>`).join('');

/* ---------- scroll reveal + counters + skill bars ---------- */
const io = new IntersectionObserver((entries) => {
  for (const en of entries) {
    if (!en.isIntersecting) continue;
    en.target.classList.add('visible');
    en.target.querySelectorAll('.bar i').forEach(i => { i.style.width = i.dataset.w + '%'; });
    en.target.querySelectorAll('[data-count]').forEach(el => {
      if (el.dataset.done) return;
      el.dataset.done = '1';
      const target = Number(el.dataset.count), suf = el.dataset.suffix;
      const t0 = performance.now();
      (function step(t) {
        const k = Math.min(1, (t - t0) / 1200);
        el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + suf;
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    });
    io.unobserve(en.target);
  }
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .skill-card').forEach(el => io.observe(el));

/* ---------- nav: mobile menu, active link, to-top ---------- */
const navLinks = $('#navLinks');
$('#burger').onclick = () => navLinks.classList.toggle('open');
navLinks.addEventListener('click', (e) => { if (e.target.tagName === 'A') navLinks.classList.remove('open'); });
const secIds = ['about', 'skills', 'projects', 'experience', 'contact'];
const navMap = {};
document.querySelectorAll('#navLinks a').forEach(a => { navMap[a.getAttribute('href').slice(1)] = a; });
const secIo = new IntersectionObserver((entries) => {
  for (const en of entries) {
    if (en.isIntersecting) {
      Object.values(navMap).forEach(a => a.classList.remove('active'));
      const a = navMap[en.target.id];
      if (a) a.classList.add('active');
    }
  }
}, { rootMargin: '-40% 0px -55% 0px' });
secIds.forEach(id => secIo.observe(document.getElementById(id)));
const toTop = $('#toTop');
const navEl = document.querySelector('nav');
let lastScrollY = 0;
addEventListener('scroll', () => {
  const y = scrollY;
  toTop.classList.toggle('show', y > 600);
  if (y > 100 && y > lastScrollY) navEl.classList.add('hidden');
  else if (y < lastScrollY || y <= 100) navEl.classList.remove('hidden');
  lastScrollY = y;
}, { passive: true });
toTop.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });

/* ---------- sections show while on screen, hide when scrolled off ---------- */
const secObs = new IntersectionObserver((entries) => {
  for (const en of entries) en.target.classList.toggle('away', !en.isIntersecting);
}, { rootMargin: '-40px 0px -40px 0px' });
document.querySelectorAll('#top > section').forEach(s => secObs.observe(s));

/* ---------- contact form (demo: validates + toast; wire to a backend later) ---------- */
function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  $('#toasts').append(t);
  setTimeout(() => t.remove(), 3200);
}
$('#contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const n = $('#cName').value.trim();
  const m = $('#cEmail').value.trim();
  const b = $('#cMsg').value.trim();
  if (!n || !/.+@.+\..+/.test(m) || !b) { toast('Please fill name, a valid email, and a message.'); return; }
  e.target.reset();
  toast(`Thanks ${n.split(' ')[0]}! Your message was noted — connect it to a backend to actually send.`);
});