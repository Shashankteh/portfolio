// ==========================================
//  SHISHANK GOYAL v4 — EPIC 3D
//  Three.js + GSAP + Flip + Firebase
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// 🔥 PASTE YOUR FIREBASE CONFIG HERE
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

// ── THREE.JS 3D FLOATING CRYSTALS ─────────
function initThreeJS() {
  const canvas = document.getElementById('threeCanvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // TEAL color
  const tealColor = 0x0DBAAF;
  const tealColorDim = 0x064440;

  // Floating geometric shapes
  const geometries = [
    new THREE.OctahedronGeometry(0.3, 0),
    new THREE.TetrahedronGeometry(0.25, 0),
    new THREE.OctahedronGeometry(0.18, 0),
    new THREE.TetrahedronGeometry(0.35, 0),
    new THREE.OctahedronGeometry(0.22, 0),
    new THREE.TetrahedronGeometry(0.15, 0),
    new THREE.OctahedronGeometry(0.28, 0),
    new THREE.TetrahedronGeometry(0.2, 0),
    new THREE.OctahedronGeometry(0.12, 0),
    new THREE.TetrahedronGeometry(0.32, 0),
    new THREE.OctahedronGeometry(0.16, 0),
    new THREE.TetrahedronGeometry(0.24, 0),
  ];

  const meshes = [];
  geometries.forEach((geo, i) => {
    const mat = new THREE.MeshBasicGeometry ? null : null;
    const material = new THREE.MeshPhongMaterial({
      color: i % 3 === 0 ? tealColor : (i % 3 === 1 ? tealColorDim : 0x0a5550),
      wireframe: i % 2 === 0,
      transparent: true,
      opacity: 0.15 + Math.random() * 0.25,
      shininess: 100,
    });
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.set(
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 4
    );
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    mesh.userData = {
      speedX: (Math.random() - 0.5) * 0.008,
      speedY: (Math.random() - 0.5) * 0.008,
      speedZ: (Math.random() - 0.5) * 0.004,
      floatSpeed: Math.random() * 0.002 + 0.001,
      floatOffset: Math.random() * Math.PI * 2,
    };
    scene.add(mesh);
    meshes.push(mesh);
  });

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0x0DBAAF, 1.5, 20);
  pointLight.position.set(3, 3, 3);
  scene.add(pointLight);
  const pointLight2 = new THREE.PointLight(0x064440, 1, 15);
  pointLight2.position.set(-3, -2, 2);
  scene.add(pointLight2);

  // Mouse parallax
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    meshes.forEach(mesh => {
      mesh.rotation.x += mesh.userData.speedX;
      mesh.rotation.y += mesh.userData.speedY;
      mesh.rotation.z += mesh.userData.speedZ;
      // Floating effect
      mesh.position.y += Math.sin(elapsed * mesh.userData.floatSpeed * 60 + mesh.userData.floatOffset) * 0.0008;
    });

    // Camera subtle parallax
    camera.position.x += (mouseX - camera.position.x) * 0.03;
    camera.position.y += (-mouseY - camera.position.y) * 0.03;

    renderer.render(scene, camera);
  }
  animate();
}
initThreeJS();

// ── GSAP SETUP ────────────────────────────
gsap.registerPlugin(ScrollTrigger);

// ── GSAP HERO ENTRANCE ────────────────────
window.addEventListener('load', () => {
  const tl = gsap.timeline({ delay: 0.2 });

  // Photo rings entrance
  tl.from('.spline-container', { scale: 0, opacity: 0, duration: 1, ease: 'back.out(1.5)' }, 0);
  tl.from('.floating-3d-ring', { scale: 0, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'back.out(1.2)' }, 0.2);

  // Hero tag
  tl.from('.hero-tag', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.1);

  // Split text — letters animate in
  const heroLines = document.querySelectorAll('.split-line');
  heroLines.forEach((line, i) => {
    const text = line.dataset.text || line.textContent;
    // Create letter spans
    const letters = text.split('').map(char => {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.style.overflow = 'hidden';
      if(char === ' ') span.innerHTML = '&nbsp;';
      else span.textContent = char;
      if(line.querySelector('.accent') && i === 1) {
        if(text.indexOf('.') !== -1 && char === '.') {
          span.style.color = 'var(--teal)';
        }
      }
      return span;
    });

    // Clear and rebuild (keep accent)
    if(i === 1) {
      line.innerHTML = '';
      letters.forEach(s => line.appendChild(s));
      // Re-add accent color to last char
      const lastSpan = line.lastElementChild;
      if(lastSpan) lastSpan.style.color = 'var(--teal)';
    } else {
      line.innerHTML = '';
      letters.forEach(s => line.appendChild(s));
    }

    tl.from(line.querySelectorAll('span'), {
      y: '110%', opacity: 0, duration: 0.7,
      stagger: 0.03, ease: 'power4.out'
    }, 0.3 + i * 0.1);
  });

  // Typing, location, cta
  tl.from('.hero-typing', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, 0.7);
  tl.from('.hero-location', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, 0.85);
  tl.from('.hero-cta', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, 1);

  // Photo error
  const img = document.getElementById('profileImg');
  const ini = document.getElementById('profileInitials');
  if(img) {
    img.onerror = () => { img.style.display='none'; ini.style.display='flex'; };
    if(!img.complete || img.naturalWidth === 0) img.onerror();
  }
});

// ── GSAP SCROLL ANIMATIONS ────────────────
// Section labels + text reveals
gsap.utils.toArray('.gsap-reveal').forEach(el => {
  gsap.from(el, {
    y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
  });
});

// GSAP Split text for section titles
gsap.utils.toArray('.gsap-split').forEach(el => {
  const text = el.innerHTML;
  const words = text.split(' ').map(word => `<span class="split-word" style="display:inline-block;overflow:hidden"><span style="display:inline-block">${word}</span></span> `);
  el.innerHTML = words.join('');

  gsap.from(el.querySelectorAll('.split-word > span'), {
    y: '100%', opacity: 0, duration: 0.7, stagger: 0.05, ease: 'power4.out',
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
  });
});

// Cards stagger
gsap.utils.toArray('.gsap-card').forEach((card, i) => {
  gsap.from(card, {
    y: 50, opacity: 0, duration: 0.8,
    delay: (i % 3) * 0.12,
    ease: 'power3.out',
    scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
  });
});

// Progress bars
gsap.utils.toArray('.skills-progress').forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top 75%',
    onEnter: () => {
      section.querySelectorAll('.progress-fill').forEach((bar, i) => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, i * 120 + 200);
      });
    }
  });
});

// Timeline items
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
  gsap.from(item, {
    x: -40, opacity: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none none' }
  });
});

// ── CURSOR ────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mx = 0, my = 0, fx = 0, fy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
});
function animF() {
  fx += (mx-fx)*0.12; fy += (my-fy)*0.12;
  follower.style.left = fx+'px'; follower.style.top = fy+'px';
  requestAnimationFrame(animF);
}
animF();
document.querySelectorAll('a,button,.flip-card,.skill-card,.cert-card,input,textarea').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width='14px';cursor.style.height='14px';follower.style.width='50px';follower.style.height='50px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width='8px';cursor.style.height='8px';follower.style.width='30px';follower.style.height='30px'; });
});

// ── DARK/LIGHT MODE ───────────────────────
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlEl = document.documentElement;
const saved = localStorage.getItem('theme') || 'dark';
htmlEl.setAttribute('data-theme', saved);
themeIcon.textContent = saved === 'dark' ? '🌙' : '☀️';
themeToggle.addEventListener('click', () => {
  const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  htmlEl.setAttribute('data-theme', next);
  themeIcon.textContent = next === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', next);
});

// ── TYPING ────────────────────────────────
const typingEl = document.getElementById('typingText');
const words = ['Full Stack Developer.','Oracle HCM Consultant.','Cybersecurity Enthusiast.','MERN Stack Developer.','Problem Solver.','Immediate Joiner! 🚀'];
let wi=0,ci=0,del=false;
function typeEffect(){
  const w=words[wi];
  typingEl.textContent=del?w.substring(0,ci-1):w.substring(0,ci+1);
  del?ci--:ci++;
  if(!del&&ci===w.length)setTimeout(()=>{del=true;},1800);
  else if(del&&ci===0){del=false;wi=(wi+1)%words.length;}
  setTimeout(typeEffect,del?55:95);
}
setTimeout(typeEffect,1500);

// ── MAGNETIC BUTTONS ──────────────────────
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX-r.left-r.width/2)*0.28;
    const y = (e.clientY-r.top-r.height/2)*0.28;
    btn.style.transform = `translate(${x}px,${y}px)`;
    btn.style.transition = 'transform 0.1s ease';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
  });
});

// ── COUNTER ───────────────────────────────
function animCounter(el, target) {
  let s=0; const sfx=el.dataset.suffix||'';
  const t=setInterval(()=>{s+=target/(2000/16);if(s>=target){el.textContent=target.toLocaleString()+sfx;clearInterval(t);}else{el.textContent=Math.floor(s).toLocaleString()+sfx;}},16);
}
const cntObs = new IntersectionObserver(es=>{
  es.forEach(e=>{if(e.isIntersecting&&!e.target.dataset.counted){e.target.dataset.counted='1';animCounter(e.target,parseInt(e.target.dataset.target));}});
},{threshold:0.6});
document.querySelectorAll('.stat-num[data-target]').forEach(el=>cntObs.observe(el));

// ── GITHUB STATS ──────────────────────────
async function loadGithub(){
  const c=document.getElementById('githubStats');if(!c)return;
  try{
    const[ur,rr]=await Promise.all([fetch('https://api.github.com/users/Shashankteh'),fetch('https://api.github.com/users/Shashankteh/repos?per_page=100')]);
    const u=await ur.json(),repos=await rr.json();
    const stars=Array.isArray(repos)?repos.reduce((s,r)=>s+r.stargazers_count,0):0;
    const forks=Array.isArray(repos)?repos.reduce((s,r)=>s+r.forks_count,0):0;
    c.innerHTML=`<div class="github-stat"><span class="gs-num">${u.public_repos||0}</span><span class="gs-label">Repos</span></div><div class="github-stat"><span class="gs-num">${u.followers||0}</span><span class="gs-label">Followers</span></div><div class="github-stat"><span class="gs-num">${stars}</span><span class="gs-label">Stars</span></div><div class="github-stat"><span class="gs-num">${forks}</span><span class="gs-label">Forks</span></div>`;
    // Animate stats in
    gsap.from(c.querySelectorAll('.gs-num'),{textContent:0,duration:1.5,ease:'power2.out',snap:{textContent:1},stagger:0.1});
  }catch(e){c.innerHTML='<div class="github-stat"><span class="gs-num">—</span><span class="gs-label">Repos</span></div><div class="github-stat"><span class="gs-num">—</span><span class="gs-label">Followers</span></div><div class="github-stat"><span class="gs-num">—</span><span class="gs-label">Stars</span></div><div class="github-stat"><span class="gs-num">—</span><span class="gs-label">Forks</span></div>';}
}
loadGithub();

// ── NAV ───────────────────────────────────
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>60));

// Mobile menu
const navMenu=document.getElementById('navMenu'),mobileMenu=document.getElementById('mobileMenu');
let mOpen=false;
navMenu.addEventListener('click',()=>{mOpen=!mOpen;mobileMenu.classList.toggle('open',mOpen);const s=navMenu.querySelectorAll('span');if(mOpen){s[0].style.transform='translateY(6.5px) rotate(45deg)';s[1].style.opacity='0';s[2].style.transform='translateY(-6.5px) rotate(-45deg)';}else{s.forEach(x=>{x.style.transform='';x.style.opacity='';}); }});
document.querySelectorAll('.mobile-link').forEach(l=>l.addEventListener('click',()=>{mOpen=false;mobileMenu.classList.remove('open');navMenu.querySelectorAll('span').forEach(x=>{x.style.transform='';x.style.opacity='';}); }));

// Active nav
const secs=document.querySelectorAll('section[id]'),nls=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{let cur='';secs.forEach(s=>{if(window.scrollY>=s.offsetTop-100)cur=s.getAttribute('id');});nls.forEach(l=>{l.style.color=l.getAttribute('href')==='#'+cur?'var(--teal)':'';});});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}});});

// ── FIREBASE CONTACT FORM ─────────────────
const cf=document.getElementById('contactForm'),fs=document.getElementById('formSuccess'),fe=document.getElementById('formError'),sb=document.getElementById('submitBtn');
cf.addEventListener('submit',async(e)=>{
  e.preventDefault();
  const d={name:document.getElementById('fname').value.trim(),email:document.getElementById('femail').value.trim(),subject:document.getElementById('fsubject').value.trim(),message:document.getElementById('fmessage').value.trim()};
  sb.textContent='Sending... ⏳';sb.disabled=true;
  try{
    if(db)await addDoc(collection(db,'messages'),{...d,timestamp:serverTimestamp(),read:false});
    window.location.href=`mailto:developershashank10@gmail.com?subject=${encodeURIComponent(d.subject+' — '+d.name)}&body=${encodeURIComponent('Name: '+d.name+'\nEmail: '+d.email+'\n\n'+d.message)}`;
    cf.reset();fs.classList.add('show');setTimeout(()=>fs.classList.remove('show'),5000);
  }catch(err){fe.classList.add('show');setTimeout(()=>fe.classList.remove('show'),4000);}
  finally{sb.textContent='Send Message ✉';sb.disabled=false;}
});

console.log('%c🚀 Shishank Goyal v4 — Epic 3D','color:#0DBAAF;font-size:16px;font-weight:bold;');
