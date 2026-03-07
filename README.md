# Shishank Goyal — Portfolio v5 🚀

> Personal developer portfolio built with modern web technologies, 3D animations, and Firebase backend.

**🔗 Live:** [shashankteh.github.io/portfolio](https://shashankteh.github.io/portfolio)

---

## ✨ Features

- 🌌 **Three.js 3D Background** — Floating geometric crystals with mouse parallax
- 🎬 **GSAP Animations** — Letter-by-letter text splits, scroll-triggered reveals
- 🎨 **Aurora Glassmorphism Theme** — Violet + Rose + Amber color palette
- 🌙 **Dark / Light Mode** — Persisted via localStorage
- 🃏 **3D Flip Cards** — Projects section with hover flip effect
- 🧲 **Magnetic Buttons** — Buttons that follow your cursor
- 📊 **Skill Progress Bars** — Animated on scroll
- 🔢 **Counter Animations** — Stats count up on viewport enter
- 📈 **Live GitHub Stats** — Repos, followers, stars, forks via GitHub API
- 📬 **Firebase Contact Form** — Messages saved to Firestore + mailto fallback
- 📱 **Fully Responsive** — Mobile to 4K

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| 3D / Animation | Three.js (r128), GSAP 3.12 |
| Backend | Firebase Firestore |
| Fonts | Outfit, JetBrains Mono |
| Hosting | GitHub Pages |
| APIs | GitHub REST API |

---

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML
├── css/
│   └── style.css       # All styles — Aurora theme, responsive
├── js/
│   └── main.js         # Three.js, GSAP, Firebase, all interactions
└── assets/
    ├── profile.png           # Profile photo
    └── Shishank_Goyal_Resume.pdf  # Resume
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/Shashankteh/portfolio.git
cd portfolio
```

### 2. Add your assets
Place these files in the `assets/` folder:
- `profile.png` — your profile photo
- `Shishank_Goyal_Resume.pdf` — your resume

### 3. Setup Firebase (for contact form)

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a project → Enable **Firestore Database** (test mode)
3. Register a Web App → Copy your config
4. Paste config in `js/main.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  ...
};
```

### 4. Deploy to GitHub Pages
```
Settings → Pages → Deploy from main branch → Save
```

Live in 2–3 minutes at `https://yourusername.github.io/portfolio`

---

## 🎨 Customization

### Change Colors
Edit CSS variables at the top of `style.css`:
```css
[data-theme="dark"] {
  --v: #7C3AED;     /* Violet — primary */
  --rose: #F43F5E;  /* Rose — accent */
  --amber: #F59E0B; /* Amber — highlight */
}
```

### Update Content
All personal info is in `index.html` — search and replace:
- `Shishank Goyal` — your name
- `developershashank10@gmail.com` — your email
- `Shashankteh` — your GitHub username
- `shashankgoyal10` — your LinkedIn handle

### Update Typing Phrases
In `js/main.js`:
```javascript
const phrases = [
  'Full Stack Developer',
  'Oracle HCM Consultant',
  'Your Custom Role Here'
];
```

---

## 📬 Contact Form — Firebase Setup

After setup, all form submissions appear in:
**Firebase Console → Firestore Database → `messages` collection**

Each document contains:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Job Opportunity",
  "message": "...",
  "timestamp": "2025-xx-xx",
  "read": false
}
```

---

## 📸 Sections

| # | Section | Description |
|---|---|---|
| 01 | Hero | Name, typing animation, photo card, stats |
| 02 | About | Bio, bento grid cards |
| 03 | Skills | Tech cards + animated progress bars |
| 04 | Experience | Timeline with company details |
| 05 | Projects | 3D flip cards with tech stack |
| 06 | Certificates | Pill-style verified badges |
| 07 | GitHub | Live stats + contribution chart |
| 08 | Contact | Firebase form + social links |

---

## 🌐 Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile | ✅ Responsive |

---

## 📄 License

MIT License — feel free to use and modify for your own portfolio.

If you found this helpful, consider giving it a ⭐ on GitHub!

---

<p align="center">
  Built with 💜 by <strong>Shishank Goyal</strong> · Jaipur, India 🇮🇳
  <br/>
  <a href="mailto:developershashank10@gmail.com">developershashank10@gmail.com</a> · 
  <a href="https://linkedin.com/in/shashankgoyal10">LinkedIn</a> · 
  <a href="https://github.com/Shashankteh">GitHub</a>
</p>
