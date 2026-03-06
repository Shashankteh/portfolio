// ==========================================
//  SHISHANK GOYAL PORTFOLIO v2 — main.js
//  Features: Cursor, Dark/Light, Typing,
//  Form, Nav, Reveal Animations
// ==========================================

// ── CURSOR ────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-card, .project-card, .cert-card, input, textarea').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '16px'; cursor.style.height = '16px';
    follower.style.width = '48px'; follower.style.height = '48px';
    follower.style.borderColor = 'rgba(13,158,164,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '8px'; cursor.style.height = '8px';
    follower.style.width = '32px'; follower.style.height = '32px';
    follower.style.borderColor = 'rgba(13,158,164,0.5)';
  });
});

// ── DARK / LIGHT MODE ─────────────────────
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  themeIcon.textContent = next === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', next);
});

// ── TYPING ANIMATION ──────────────────────
const typingEl = document.getElementById('typingText');
const words = [
  'Full Stack Developer.',
  'Oracle HCM Consultant.',
  'Cybersecurity Enthusiast.',
  'MERN Stack Developer.',
  'Problem Solver.',
  'Immediate Joiner! 🚀'
];
let wordIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const current = words[wordIndex];
  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    setTimeout(() => { isDeleting = true; }, 1800);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(typeEffect, speed);
}
setTimeout(typeEffect, 1200);

// ── NAV SCROLL ────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── MOBILE MENU ───────────────────────────
const navMenu = document.getElementById('navMenu');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

navMenu.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = navMenu.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    const spans = navMenu.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ── REVEAL ON SCROLL ──────────────────────
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => revealObserver.observe(el));

// ── STAGGER CARDS ─────────────────────────
function staggerObserver(selector) {
  const cards = document.querySelectorAll(selector);
  const obs = new IntersectionObserver((entries) => {
    let i = 0;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        i++;
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    obs.observe(card);
  });
}
staggerObserver('.skill-card');
staggerObserver('.project-card');
staggerObserver('.cert-card');

// ── ACTIVE NAV ────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) link.style.color = 'var(--teal)';
  });
});

// ── SMOOTH SCROLL ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── CONTACT FORM ──────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Open mail client with prefilled content
  const mailtoLink = `mailto:developershashank10@gmail.com?subject=${encodeURIComponent(subject + ' - From ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;

  submitBtn.textContent = 'Sending... ⏳';
  submitBtn.disabled = true;

  setTimeout(() => {
    window.location.href = mailtoLink;
    contactForm.reset();
    submitBtn.textContent = 'Send Message ✉';
    submitBtn.disabled = false;
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 800);
});

// ── HERO ENTRANCE ─────────────────────────
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-name .line').forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(40px)';
    line.style.transition = `opacity 1s cubic-bezier(0.16,1,0.3,1) ${i*0.15}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${i*0.15}s`;
    setTimeout(() => { line.style.opacity = '1'; line.style.transform = 'translateY(0)'; }, 100 + i * 150);
  });
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 120);
  });
});

console.log('%c Shishank Goyal Portfolio v2', 'color:#0D9EA4;font-size:16px;font-weight:bold;');
