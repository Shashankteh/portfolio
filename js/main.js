// ══════════════════════════════════════════
//  SHISHANK GOYAL v5 — AURORA REDESIGN
//  Violet + Rose + Amber Theme
// ══════════════════════════════════════════

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBa3yaHGHCNqMPsPd1h1ZhSP_kmzcAF6t8",
  authDomain: "shishank-portfolio.firebaseapp.com",
  projectId: "shishank-portfolio",
  storageBucket: "shishank-portfolio.firebasestorage.app",
  messagingSenderId: "388813101989",
  appId: "1:388813101989:web:d4afa02c96ed29bcc5e64c"
};
let db = null;
try { const app = initializeApp(firebaseConfig); db = getFirestore(app); } catch(e) {}

// ── THREE.JS FLOATING PARTICLES ────────────
function initThree() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 6;

  // Floating shapes — violet/rose/amber palette
  const colors = [0x7C3AED, 0xF43F5E, 0xF59E0B, 0xa855f7, 0xe11d48];
  const meshes = [];

  for (let i = 0; i < 14; i++) {
    const size = Math.random() * 0.22 + 0.08;
    const geo = i % 3 === 0
      ? new THREE.OctahedronGeometry(size, 0)
      : i % 3 === 1
        ? new THREE.TetrahedronGeometry(size, 0)
        : new THREE.BoxGeometry(size, size, size);

    const mat = new THREE.MeshPhongMaterial({
      color: colors[i % colors.length],
      wireframe: i % 2 === 0,
      transparent: true,
      opacity: .08 + Math.random() * .15,
      shininess: 80
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - .5) * 14,
      (Math.random() - .5) * 10,
      (Math.random() - .5) * 5
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    mesh.userData = {
      rx: (Math.random() - .5) * .007,
      ry: (Math.random() - .5) * .007,
      fy: Math.random() * .002 + .001,
      fo: Math.random() * Math.PI * 2
    };
    scene.add(mesh);
    meshes.push(mesh);
  }

  scene.add(new THREE.AmbientLight(0xffffff, .2));
  const pl = new THREE.PointLight(0x7C3AED, 2, 20);
  pl.position.set(4, 4, 4);
  scene.add(pl);
  const pl2 = new THREE.PointLight(0xF43F5E, 1.5, 15);
  pl2.position.set(-4, -3, 3);
  scene.add(pl2);

  let threeMx = 0, threeMy = 0;
  document.addEventListener('mousemove', e => {
    threeMx = (e.clientX / window.innerWidth - .5) * .6;
    threeMy = (e.clientY / window.innerHeight - .5) * .6;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();
  (function tick() {
    requestAnimationFrame(tick);
    const t = clock.getElapsedTime();
    meshes.forEach(m => {
      m.rotation.x += m.userData.rx;
      m.rotation.y += m.userData.ry;
      m.position.y += Math.sin(t * m.userData.fy * 60 + m.userData.fo) * .0006;
    });
    camera.position.x += (threeMx - camera.position.x) * .025;
    camera.position.y += (-threeMy - camera.position.y) * .025;
    renderer.render(scene, camera);
  })();
}
initThree();

// ── CURSOR ─────────────────────────────────
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
if (dot && ring) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function rf() {
    rx += (mx - rx) * .12; ry += (my - ry) * .12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(rf);
  })();
  document.querySelectorAll('a,button,.proj-card,.sk-card,.bento-card,.cert-pill,input,textarea').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.style.width = '12px'; dot.style.height = '12px'; ring.style.width = '44px'; ring.style.height = '44px'; ring.style.borderColor = 'rgba(124,58,237,.9)'; });
    el.addEventListener('mouseleave', () => { dot.style.width = '6px'; dot.style.height = '6px'; ring.style.width = '28px'; ring.style.height = '28px'; ring.style.borderColor = 'rgba(124,58,237,.6)'; });
  });
}

// ── THEME ──────────────────────────────────
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;
const saved = localStorage.getItem('sg-theme') || 'dark';
html.setAttribute('data-theme', saved);
themeIcon.textContent = saved === 'dark' ? '◐' : '○';
themeBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeIcon.textContent = next === 'dark' ? '◐' : '○';
  localStorage.setItem('sg-theme', next);
});

// ── TYPING ─────────────────────────────────
const typeEl = document.getElementById('typeText');
const phrases = ['Full Stack Developer','Oracle HCM Consultant','Cybersecurity Enthusiast','Problem Solver','Immediate Joiner 🚀','MERN Stack Dev'];
let pi = 0, ci = 0, del = false;
function typeLoop() {
  const p = phrases[pi];
  typeEl.textContent = del ? p.slice(0, ci - 1) : p.slice(0, ci + 1);
  del ? ci-- : ci++;
  if (!del && ci === p.length) setTimeout(() => { del = true; }, 2000);
  else if (del && ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
  setTimeout(typeLoop, del ? 50 : 90);
}
setTimeout(typeLoop, 1400);

// ── MAGNETIC BUTTONS ───────────────────────
document.querySelectorAll('.mag').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * .25;
    const y = (e.clientY - r.top - r.height / 2) * .25;
    el.style.transform = `translate(${x}px,${y}px)`;
    el.style.transition = 'transform .1s ease';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
    el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
  });
});

// ── SCROLL ANIMATIONS ──────────────────────
gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll('.reveal').forEach(el => {
  ScrollTrigger.create({
    trigger: el, start: 'top 87%',
    onEnter: () => el.classList.add('vis')
  });
});

// Skill bars on scroll
ScrollTrigger.create({
  trigger: '.skills-bento', start: 'top 70%',
  onEnter: () => {
    document.querySelectorAll('.sk-fill').forEach((b, i) => {
      setTimeout(() => { b.style.width = b.dataset.w + '%'; }, i * 100 + 200);
    });
  }
});

// ── COUNTER ────────────────────────────────
function runCounter(el, target) {
  let n = 0; const suf = el.dataset.suf || '';
  const t = setInterval(() => {
    n += target / (2000 / 16);
    if (n >= target) { el.textContent = target.toLocaleString() + suf; clearInterval(t); }
    else el.textContent = Math.floor(n).toLocaleString() + suf;
  }, 16);
}
const cObs = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.done) {
      e.target.dataset.done = '1';
      runCounter(e.target, parseInt(e.target.dataset.target));
    }
  });
}, { threshold: .6 });
document.querySelectorAll('.hstat-n[data-target]').forEach(el => cObs.observe(el));

// ── GITHUB ─────────────────────────────────
async function loadGH() {
  const c = document.getElementById('ghStats'); if (!c) return;
  try {
    const [ur, rr] = await Promise.all([
      fetch('https://api.github.com/users/Shashankteh'),
      fetch('https://api.github.com/users/Shashankteh/repos?per_page=100')
    ]);
    const u = await ur.json(), repos = await rr.json();
    const stars = Array.isArray(repos) ? repos.reduce((s, r) => s + r.stargazers_count, 0) : 0;
    const forks = Array.isArray(repos) ? repos.reduce((s, r) => s + r.forks_count, 0) : 0;
    c.innerHTML = `
      <div class="gh-stat"><span class="gs-n">${u.public_repos||0}</span><span class="gs-l">Repos</span></div>
      <div class="gh-stat"><span class="gs-n">${u.followers||0}</span><span class="gs-l">Followers</span></div>
      <div class="gh-stat"><span class="gs-n">${stars}</span><span class="gs-l">Stars</span></div>
      <div class="gh-stat"><span class="gs-n">${forks}</span><span class="gs-l">Forks</span></div>`;
  } catch {
    c.innerHTML = ['Repos','Followers','Stars','Forks'].map(l => `<div class="gh-stat"><span class="gs-n">—</span><span class="gs-l">${l}</span></div>`).join('');
  }
}
loadGH();

// ── NAV ────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('stuck', scrollY > 60));

// Hamburger
const hamburger = document.getElementById('hamburger');
const overlay = document.getElementById('mobileOverlay');
let open = false;
hamburger.addEventListener('click', () => {
  open = !open;
  overlay.classList.toggle('open', open);
  const s = hamburger.querySelectorAll('span');
  if (open) {
    s[0].style.cssText = 'transform:translateY(6.5px) rotate(45deg)';
    s[1].style.cssText = 'transform:translateY(-6.5px) rotate(-45deg)';
  } else {
    s.forEach(x => x.style.cssText = '');
  }
});
document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => {
  open = false; overlay.classList.remove('open');
  hamburger.querySelectorAll('span').forEach(x => x.style.cssText = '');
}));

// Active nav
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (scrollY >= s.offsetTop - 110) cur = s.id; });
  navLinks.forEach(l => {
    const active = l.getAttribute('href') === '#' + cur;
    l.style.color = active ? 'var(--v2)' : '';
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── CONTACT FORM ───────────────────────────
document.getElementById('contactForm').addEventListener('submit', async e => {
  e.preventDefault();
  const d = {
    name: document.getElementById('fname').value.trim(),
    email: document.getElementById('femail').value.trim(),
    subject: document.getElementById('fsubject').value.trim(),
    message: document.getElementById('fmessage').value.trim()
  };
  const btn = document.getElementById('submitBtn');
  const ok = document.getElementById('formOk');
  const err = document.getElementById('formErr');
  btn.querySelector('span').textContent = 'Sending...';
  btn.disabled = true;
  try {
    if (db) await addDoc(collection(db, 'messages'), { ...d, timestamp: serverTimestamp(), read: false });
    window.location.href = `mailto:developershashank10@gmail.com?subject=${encodeURIComponent(d.subject + ' — ' + d.name)}&body=${encodeURIComponent('Name: ' + d.name + '\nEmail: ' + d.email + '\n\n' + d.message)}`;
    e.target.reset(); ok.classList.add('show'); setTimeout(() => ok.classList.remove('show'), 5000);
  } catch { err.classList.add('show'); setTimeout(() => err.classList.remove('show'), 4000); }
  finally { btn.querySelector('span').textContent = 'Send Message'; btn.disabled = false; }
});

console.log('%c✨ Shishank Goyal v5 — Aurora', 'color:#7C3AED;font-size:16px;font-weight:bold;');
console.log('%c Made with 💜 in Jaipur', 'color:#F43F5E;font-size:12px;');
