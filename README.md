# Amrinder Pal Singh — Personal Portfolio & Interactive Resume

An interactive, high-performance personal portfolio website for **Amrinder Pal Singh** (Associate Consultant • Endpoint Management & Enterprise Mobility Engineer).

---

## 🛠️ Technology Stack & Architecture

- **HTML5 & Modern CSS3**: Custom design tokens, glassmorphism UI, 3D perspective hover tilt, dark/light theme switching, and print-ready stylesheet (`@media print`).
- **Vanilla JavaScript**: Zero external npm dependencies. Features particle background canvas, `IntersectionObserver` scroll-driven reveals, typewriter rotation, count-up stats, and project filtering.
- **Centralized Data (`js/data.js`)**: All content (bio, experience, skills, certifications, awards, personal interests) is structured in `js/data.js`.

---

## 📁 File Map

- **[`index.html`](file:///e:/SelfResume/index.html)** — Semantic layout, SEO metadata, section containers, project detail modal.
- **[`js/data.js`](file:///e:/SelfResume/js/data.js)** — Single source of truth for all portfolio data & text.
- **[`js/animations.js`](file:///e:/SelfResume/js/animations.js)** — Canvas engine, scroll reveals, 3D tilt FX, typewriter, stat count-ups.
- **[`js/app.js`](file:///e:/SelfResume/js/app.js)** — Data renderer, project filters, modal dialog controller, theme switcher.
- **[`css/styles.css`](file:///e:/SelfResume/css/styles.css)** — Complete styling system, dark/light themes, animations, print rules.

---

## 💻 How to View & Customize

### 1. View Locally
Double-click `index.html` or open terminal in `e:\SelfResume` and run:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

### 2. Update Content
Edit `js/data.js` to modify bio details, add new certifications, update skills, or customize links.
