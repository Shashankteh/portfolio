# Shishank Goyal — Portfolio Website

A modern, minimal & aesthetic personal portfolio website.

## 📁 Folder Structure

```
portfolio/
├── index.html          ← Main page (sab content yahan hai)
├── css/
│   └── style.css       ← Saari styling
├── js/
│   └── main.js         ← Animations & interactions
├── assets/             ← Apni photo yahan daalo (optional)
├── vercel.json         ← Vercel deployment config
└── README.md           ← Yeh file
```

---

## 🚀 Vercel Pe Live Kaise Karein (Easiest Method)

### Step 1 — GitHub Account Banao
1. https://github.com pe jao
2. Sign up karo (free hai)

### Step 2 — New Repository Banao
1. GitHub pe `+` button → `New repository`
2. Name: `portfolio`
3. Public select karo
4. `Create repository` click karo

### Step 3 — Files Upload Karo
1. `Add file` → `Upload files` click karo
2. **Poora portfolio folder** drag & drop karo
3. Commit karo — `Commit changes` click karo

### Step 4 — Vercel Pe Deploy Karo
1. https://vercel.com pe jao
2. `Continue with GitHub` se login karo
3. `New Project` → apna `portfolio` repo select karo
4. `Deploy` click karo
5. 2 minute mein LIVE ho jayega! 🎉

### Step 5 — Custom Domain (Optional)
Vercel pe `shashank10.vercel.app` milega automatically.
Apna custom domain bhi add kar sakte ho.

---

## ✏️ Content Kaise Edit Karein

### Apna Naam/Email Change Karna:
`index.html` open karo → Ctrl+F se dhundho → replace karo

### Photo Add Karna:
1. Apni professional photo ko `assets/` folder mein daalo
2. `index.html` mein hero section mein add karo

### New Project Add Karna:
`index.html` mein Projects section mein copy-paste karo:
```html
<div class="project-card reveal">
  <div class="project-top">
    <span class="project-num">07</span>
  </div>
  <h3>Project Name</h3>
  <p>Project description here.</p>
  <div class="project-tech">
    <span>Tech1</span><span>Tech2</span>
  </div>
</div>
```

---

## 🎨 Colors Change Karna

`css/style.css` ke top pe CSS variables hain:
```css
--teal: #0D9EA4;     /* Main accent color */
--bg: #080C12;       /* Background */
--white: #F0F4F8;    /* Text color */
```

---

## 📱 Features

- ✅ Fully Responsive (Mobile/Tablet/Desktop)
- ✅ Custom animated cursor
- ✅ Smooth scroll animations
- ✅ Mobile hamburger menu
- ✅ Scroll reveal effects
- ✅ Active nav highlighting
- ✅ Zero dependencies (no npm needed!)
- ✅ Fast loading

---

Built with ❤️ by Shishank Goyal | developershashank10@gmail.com
