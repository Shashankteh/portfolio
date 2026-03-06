// SHISHANK GOYAL PORTFOLIO v3 — main.js
// Firebase + Particles + 3D Tilt + All Features

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// PASTE YOUR FIREBASE CONFIG HERE (see FIREBASE_SETUP.md)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
let db = null;
try { const app = initializeApp(firebaseConfig); db = getFirestore(app); } catch(e) {}

// CURSOR
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX=0,mouseY=0,followerX=0,followerY=0;
document.addEventListener('mousemove',(e)=>{mouseX=e.clientX;mouseY=e.clientY;cursor.style.left=mouseX+'px';cursor.style.top=mouseY+'px';});
function animateFollower(){followerX+=(mouseX-followerX)*0.12;followerY+=(mouseY-followerY)*0.12;follower.style.left=followerX+'px';follower.style.top=followerY+'px';requestAnimationFrame(animateFollower);}
animateFollower();
document.querySelectorAll('a,button,.skill-card,.project-card,.cert-card,input,textarea').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cursor.style.width='16px';cursor.style.height='16px';follower.style.width='52px';follower.style.height='52px';follower.style.borderColor='rgba(13,158,164,0.9)';});
  el.addEventListener('mouseleave',()=>{cursor.style.width='8px';cursor.style.height='8px';follower.style.width='32px';follower.style.height='32px';follower.style.borderColor='rgba(13,158,164,0.5)';});
});

// DARK/LIGHT MODE
const themeToggle=document.getElementById('themeToggle');
const themeIcon=document.getElementById('themeIcon');
const html=document.documentElement;
const saved=localStorage.getItem('theme')||'dark';
html.setAttribute('data-theme',saved);
themeIcon.textContent=saved==='dark'?'🌙':'☀️';
themeToggle.addEventListener('click',()=>{const next=html.getAttribute('data-theme')==='dark'?'light':'dark';html.setAttribute('data-theme',next);themeIcon.textContent=next==='dark'?'🌙':'☀️';localStorage.setItem('theme',next);});

// TYPING
const typingEl=document.getElementById('typingText');
const words=['Full Stack Developer.','Oracle HCM Consultant.','Cybersecurity Enthusiast.','MERN Stack Developer.','Problem Solver.','Immediate Joiner! 🚀'];
let wi=0,ci=0,del=false;
function typeEffect(){const w=words[wi];typingEl.textContent=del?w.substring(0,ci-1):w.substring(0,ci+1);del?ci--:ci++;if(!del&&ci===w.length)setTimeout(()=>{del=true;},1800);else if(del&&ci===0){del=false;wi=(wi+1)%words.length;}setTimeout(typeEffect,del?55:95);}
setTimeout(typeEffect,1200);

// PARTICLES
const canvas=document.getElementById('particlesCanvas');
const ctx=canvas.getContext('2d');
function resizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
resizeCanvas();window.addEventListener('resize',resizeCanvas);
class Particle{constructor(){this.reset();}reset(){this.x=Math.random()*canvas.width;this.y=Math.random()*canvas.height;this.size=Math.random()*1.8+0.4;this.sx=(Math.random()-0.5)*0.35;this.sy=(Math.random()-0.5)*0.35;this.op=Math.random()*0.35+0.08;this.color=Math.random()>0.5?'13,158,164':'240,244,248';}update(){this.x+=this.sx;this.y+=this.sy;if(this.x<0||this.x>canvas.width||this.y<0||this.y>canvas.height)this.reset();}draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fillStyle=`rgba(${this.color},${this.op})`;ctx.fill();}}
const parts=[];for(let i=0;i<55;i++)parts.push(new Particle());
function drawLines(){for(let i=0;i<parts.length;i++)for(let j=i+1;j<parts.length;j++){const dx=parts[i].x-parts[j].x,dy=parts[i].y-parts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<110){ctx.beginPath();ctx.strokeStyle=`rgba(13,158,164,${0.07*(1-d/110)})`;ctx.lineWidth=0.5;ctx.moveTo(parts[i].x,parts[i].y);ctx.lineTo(parts[j].x,parts[j].y);ctx.stroke();}}}
function animP(){ctx.clearRect(0,0,canvas.width,canvas.height);parts.forEach(p=>{p.update();p.draw();});drawLines();requestAnimationFrame(animP);}
animP();

// 3D TILT
document.querySelectorAll('.project-card,.cert-card,.skill-card').forEach(card=>{
  card.addEventListener('mousemove',(e)=>{const r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,rx=((y-r.height/2)/r.height)*-9,ry=((x-r.width/2)/r.width)*9;card.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px) scale(1.02)`;card.style.transition='transform 0.08s ease';card.style.background=`radial-gradient(circle at ${(x/r.width)*100}% ${(y/r.height)*100}%, rgba(13,158,164,0.07), var(--bg-card) 55%)`;});
  card.addEventListener('mouseleave',()=>{card.style.transform='';card.style.transition='transform 0.5s cubic-bezier(0.16,1,0.3,1)';card.style.background='';});
});

// MAGNETIC BUTTONS
document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('mousemove',(e)=>{const r=btn.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*0.3,y=(e.clientY-r.top-r.height/2)*0.3;btn.style.transform=`translate(${x}px,${y}px)`;btn.style.transition='transform 0.1s ease';});
  btn.addEventListener('mouseleave',()=>{btn.style.transform='';btn.style.transition='transform 0.5s cubic-bezier(0.16,1,0.3,1)';});
});

// COUNTER
function animCounter(el,target){let s=0;const sfx=el.dataset.suffix||'';const t=setInterval(()=>{s+=target/(2200/16);if(s>=target){el.textContent=target.toLocaleString()+sfx;clearInterval(t);}else{el.textContent=Math.floor(s).toLocaleString()+sfx;}},16);}
const cntObs=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting&&!e.target.dataset.counted){e.target.dataset.counted='1';animCounter(e.target,parseInt(e.target.dataset.target));}});},{threshold:0.6});
document.querySelectorAll('.stat-num[data-target]').forEach(el=>cntObs.observe(el));

// PROGRESS BARS
const prgObs=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.progress-fill').forEach((b,i)=>{setTimeout(()=>{b.style.width=b.dataset.width+'%';},i*120+200);});prgObs.unobserve(e.target);}});},{threshold:0.25});
document.querySelectorAll('.skills-progress').forEach(el=>prgObs.observe(el));

// GITHUB STATS
async function loadGithub(){
  const c=document.getElementById('githubStats');if(!c)return;
  try{
    const[ur,rr]=await Promise.all([fetch('https://api.github.com/users/Shashankteh'),fetch('https://api.github.com/users/Shashankteh/repos?per_page=100')]);
    const u=await ur.json(),repos=await rr.json();
    const stars=Array.isArray(repos)?repos.reduce((s,r)=>s+r.stargazers_count,0):0;
    const forks=Array.isArray(repos)?repos.reduce((s,r)=>s+r.forks_count,0):0;
    c.innerHTML=`<div class="github-stat"><span class="gs-num">${u.public_repos||0}</span><span class="gs-label">Repositories</span></div><div class="github-stat"><span class="gs-num">${u.followers||0}</span><span class="gs-label">Followers</span></div><div class="github-stat"><span class="gs-num">${stars}</span><span class="gs-label">Stars</span></div><div class="github-stat"><span class="gs-num">${forks}</span><span class="gs-label">Forks</span></div>`;
  }catch(e){c.innerHTML='<div class="github-stat"><span class="gs-num">—</span><span class="gs-label">Repos</span></div><div class="github-stat"><span class="gs-num">—</span><span class="gs-label">Followers</span></div><div class="github-stat"><span class="gs-num">—</span><span class="gs-label">Stars</span></div><div class="github-stat"><span class="gs-num">—</span><span class="gs-label">Forks</span></div>';}
}
loadGithub();

// NAV
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>60));

// MOBILE MENU
const navMenu=document.getElementById('navMenu'),mobileMenu=document.getElementById('mobileMenu');
let mOpen=false;
navMenu.addEventListener('click',()=>{mOpen=!mOpen;mobileMenu.classList.toggle('open',mOpen);const s=navMenu.querySelectorAll('span');if(mOpen){s[0].style.transform='translateY(6.5px) rotate(45deg)';s[1].style.opacity='0';s[2].style.transform='translateY(-6.5px) rotate(-45deg)';}else{s.forEach(x=>{x.style.transform='';x.style.opacity='';}); }});
document.querySelectorAll('.mobile-link').forEach(l=>l.addEventListener('click',()=>{mOpen=false;mobileMenu.classList.remove('open');navMenu.querySelectorAll('span').forEach(x=>{x.style.transform='';x.style.opacity='';}); }));

// REVEAL
const rvObs=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');rvObs.unobserve(e.target);}});},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>rvObs.observe(el));
['skill-card','project-card','cert-card'].forEach(cls=>{
  const o=new IntersectionObserver((es)=>{let i=0;es.forEach(e=>{if(e.isIntersecting){setTimeout(()=>{e.target.style.opacity='1';e.target.style.transform='translateY(0)';},i*90);i++;o.unobserve(e.target);}});},{threshold:0.1});
  document.querySelectorAll('.'+cls).forEach(c=>{c.style.opacity='0';c.style.transform='translateY(28px)';c.style.transition='opacity 0.7s cubic-bezier(0.16,1,0.3,1),transform 0.7s cubic-bezier(0.16,1,0.3,1),background 0.3s,box-shadow 0.3s';o.observe(c);});
});

// ACTIVE NAV
const secs=document.querySelectorAll('section[id]'),nls=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{let cur='';secs.forEach(s=>{if(window.scrollY>=s.offsetTop-100)cur=s.getAttribute('id');});nls.forEach(l=>{l.style.color=l.getAttribute('href')==='#'+cur?'var(--teal)':'';});});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}});});

// CONTACT FORM
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

// HERO LOAD
window.addEventListener('load',()=>{
  document.querySelectorAll('.hero-name .line').forEach((l,i)=>{l.style.cssText=`opacity:0;transform:translateY(40px);transition:opacity 1s cubic-bezier(0.16,1,0.3,1) ${i*0.15}s,transform 1s cubic-bezier(0.16,1,0.3,1) ${i*0.15}s`;setTimeout(()=>{l.style.opacity='1';l.style.transform='translateY(0)';},100+i*150);});
  document.querySelectorAll('.hero .reveal').forEach((el,i)=>{setTimeout(()=>el.classList.add('visible'),200+i*120);});
  const img=document.getElementById('profileImg'),ini=document.getElementById('profileInitials');
  if(img){img.onerror=()=>{img.style.display='none';ini.style.display='flex';};if(!img.complete||img.naturalWidth===0)img.onerror();}
});

console.log('%c⚡ Shishank Goyal v3','color:#0D9EA4;font-size:16px;font-weight:bold;');
