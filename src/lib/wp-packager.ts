import fs from "node:fs/promises";
import path from "node:path";
import JSZip from "jszip";
import sharp from "sharp";

const IMAGE_FILES = [
  "learn-kid-laptop.jpg",
  "learn-kid-tablet.jpg",
  "learn-adult-tajweed.jpg",
  "learn-adult-quran.jpg",
  "sabuur-hero.jpg",
];

function renderStandaloneStyles(): string {
  return `/*
Theme Name: As-Sabuur Sanctuary
Theme URI: https://as-sabuur.com
Author: As-Sabuur
Author URI: https://as-sabuur.com
Description: Luminous online Quran learning sanctuary for kids and adults worldwide — featuring interactive Kids/Adults mode switching, Tajweed soundboard, course pathways, and a built-in Free Trial booking drawer.
Version: 1.0.0
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
License: GNU General Public License v2 or later
Text Domain: as-sabuur
*/

:root {
  --ivory-50: #fcfaf4;
  --ivory-100: #f5efe2;
  --ivory-200: #eadfcb;
  --ivory-300: #dac9ad;
  --sage-50: #f1f6f3;
  --sage-100: #dce9e1;
  --sage-200: #bed6c8;
  --pine-700: #104131;
  --pine-800: #0b3024;
  --pine-900: #072219;
  --pine-950: #041510;
  --gold-100: #f9f0d6;
  --gold-300: #e3c87b;
  --gold-400: #d4b054;
  --gold-500: #be9432;
  --gold-600: #9a7421;
  --stone-600: #57534e;
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-sans: "DM Sans", system-ui, -apple-system, sans-serif;
  --font-arabic: "Amiri", Georgia, serif;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--ivory-50);
  color: #44403c;
  font-family: var(--font-sans);
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4 {
  margin: 0;
  font-family: var(--font-display);
  color: var(--pine-950);
  line-height: 1.06;
  font-weight: 600;
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
button { font-family: inherit; cursor: pointer; }

.wrap { max-width: 1260px; margin: 0 auto; padding: 0 24px; }

.topbar {
  background: var(--pine-950);
  color: rgba(252,250,244,0.82);
  font-size: 12px;
  padding: 9px 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.topbar-inner { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }

.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(252,250,244,0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--ivory-200);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  height: 74px;
}
.brand { display: inline-flex; align-items: center; gap: 12px; }
.brand-name { font-family: var(--font-display); font-size: 24px; font-weight: 600; color: var(--pine-950); line-height: 1; }
.brand-name span { color: var(--gold-500); }
.brand-ar { font-family: var(--font-arabic); font-size: 12px; color: var(--pine-700); display: block; }
.nav { display: flex; align-items: center; gap: 26px; font-size: 14px; font-weight: 500; color: var(--stone-600); }
.nav a:hover { color: var(--pine-900); }
@media (max-width: 820px) { .nav { display: none; } }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 9999px;
  padding: 13px 24px;
  font-size: 14px;
  font-weight: 600;
  border: 0;
  transition: transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease;
}
.btn:hover { transform: translateY(-2px); }
.btn-gold {
  background: linear-gradient(135deg, var(--gold-300), var(--gold-500));
  color: var(--pine-950);
  box-shadow: 0 12px 30px -10px rgba(190,148,50,0.65);
}
.btn-primary {
  background: var(--pine-800);
  color: var(--ivory-50);
  box-shadow: 0 12px 28px -12px rgba(4,21,16,0.35);
}
.btn-outline {
  background: rgba(255,255,255,0.8);
  color: var(--pine-900);
  border: 1px solid var(--ivory-300);
}

.hero {
  position: relative;
  overflow: hidden;
  padding: 64px 0 88px;
  background: linear-gradient(180deg, var(--ivory-50), rgba(241,246,243,0.55), var(--ivory-50));
}
.orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(70px);
  pointer-events: none;
  animation: orbDrift 22s ease-in-out infinite;
}
.orb-1 { width: 460px; height: 460px; left: -120px; top: -40px; background: rgba(239,224,174,0.5); }
.orb-2 { width: 440px; height: 440px; right: -100px; top: 80px; background: rgba(190,214,200,0.55); animation-duration: 28s; }
.motif-spin {
  position: absolute;
  right: -90px;
  top: -80px;
  width: 420px;
  height: 420px;
  color: rgba(16,65,49,0.06);
  pointer-events: none;
  animation: spinSlow 60s linear infinite;
}
@keyframes orbDrift {
  0%, 100% { transform: translate3d(0,0,0) scale(1); }
  50% { transform: translate3d(34px,-26px,0) scale(1.08); }
}
@keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes floatCard { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes wavePulse { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }

.hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 52px;
  align-items: center;
}
@media (max-width: 960px) { .hero-grid { grid-template-columns: 1fr; } }
.pill-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border-radius: 9999px;
  border: 1px solid rgba(212,176,84,0.65);
  background: rgba(255,255,255,0.88);
  padding: 6px 16px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold-600);
}
.hero h1 { font-size: clamp(2.8rem, 5.2vw, 4.45rem); margin-top: 22px; }
.hero h1 em { font-style: italic; font-weight: 500; color: var(--pine-700); }
.hero-copy { font-size: 18px; color: var(--stone-600); max-width: 560px; margin-top: 20px; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }
.hero-meta { display: flex; flex-wrap: wrap; gap: 22px; margin-top: 28px; font-size: 14px; color: var(--stone-600); }

.hero-stage { position: relative; max-width: 470px; margin: 0 auto; width: 100%; }
.arch-card {
  position: relative;
  border-radius: 999px 999px 28px 28px;
  overflow: hidden;
  aspect-ratio: 4 / 4.6;
  box-shadow: 0 32px 70px -24px rgba(4,21,16,0.38);
  border: 1px solid rgba(227,200,123,0.75);
}
.arch-card img { width: 100%; height: 100%; object-fit: cover; }
.arch-overlay {
  position: absolute;
  inset: auto 16px 16px 16px;
  background: rgba(4,21,16,0.82);
  backdrop-filter: blur(10px);
  color: var(--ivory-50);
  border-radius: 18px;
  padding: 16px 18px;
  border: 1px solid rgba(227,200,123,0.28);
}
.float-card {
  background: rgba(255,255,255,0.96);
  border: 1px solid var(--ivory-200);
  border-radius: 18px;
  padding: 12px 14px;
  box-shadow: 0 24px 50px -20px rgba(4,21,16,0.28);
  display: flex;
  align-items: center;
  gap: 12px;
  animation: floatCard 8s ease-in-out infinite;
}
.float-card.left { position: absolute; left: -24px; top: 36px; width: 236px; }
.float-card.right {
  position: absolute;
  right: -18px;
  bottom: 92px;
  width: 246px;
  background: var(--pine-900);
  color: var(--ivory-50);
  border-color: rgba(212,176,84,0.45);
  animation-delay: 1.8s;
}
@media (max-width: 640px) {
  .float-card.left, .float-card.right { position: static; width: 100%; margin-top: 14px; }
}

.section { padding: 84px 0; }
.section-sage { background: rgba(241,246,243,0.65); border-top: 1px solid var(--ivory-200); border-bottom: 1px solid var(--ivory-200); }
.eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-600);
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.eyebrow::before { content: ""; width: 24px; height: 1px; background: currentColor; }
.section-title { font-size: clamp(2.1rem, 3.8vw, 3.25rem); margin-top: 12px; }

.tabs {
  display: inline-flex;
  background: #fff;
  border: 1px solid var(--ivory-300);
  border-radius: 9999px;
  padding: 5px;
  gap: 4px;
}
.tab-btn {
  border: 0;
  background: transparent;
  padding: 10px 20px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 600;
  color: var(--stone-600);
}
.tab-btn.active { background: var(--pine-800); color: var(--ivory-50); }

.exp-card {
  margin-top: 32px;
  background: #fff;
  border: 1px solid var(--ivory-200);
  border-radius: 28px;
  padding: 36px;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 36px;
  align-items: center;
  box-shadow: 0 24px 54px -22px rgba(4,21,16,0.14);
}
@media (max-width: 900px) { .exp-card { grid-template-columns: 1fr; padding: 24px; } }
.milestone {
  background: var(--ivory-50);
  border: 1px solid var(--ivory-200);
  border-radius: 16px;
  padding: 14px 16px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.sound-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 24px;
}
@media (max-width: 960px) { .sound-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .sound-grid { grid-template-columns: 1fr; } }
.sound-card {
  background: #fff;
  border: 1px solid var(--ivory-200);
  border-radius: 20px;
  padding: 20px;
  text-align: left;
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}
.sound-card:hover { transform: translateY(-3px); border-color: var(--pine-700); }
.sound-card.active { background: var(--pine-900); color: var(--ivory-50); border-color: var(--gold-400); }
.wave-row { display: flex; align-items: flex-end; gap: 4px; height: 28px; margin-top: 16px; }
.wave-bar { flex: 1; border-radius: 99px; background: var(--sage-200); transform-origin: bottom; }
.sound-card.active .wave-bar { background: var(--gold-400); }
.sound-card.playing .wave-bar { animation: wavePulse 0.8s ease-in-out infinite; }

.courses-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 22px; margin-top: 40px; }
@media (max-width: 820px) { .courses-grid { grid-template-columns: 1fr; } }
.course-card {
  border-radius: 24px;
  padding: 32px;
  border: 1px solid var(--ivory-200);
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}
.course-card:hover { transform: translateY(-5px); box-shadow: 0 28px 60px -24px rgba(4,21,16,0.22); }
.course-card.dark { background: var(--pine-900); color: var(--ivory-50); border-color: rgba(212,176,84,0.45); }
.course-card.dark h3 { color: var(--ivory-50); }
.course-card.sage { background: var(--sage-50); border-color: var(--sage-200); }

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(4,21,16,0.68);
  backdrop-filter: blur(6px);
  display: none;
  justify-content: flex-end;
}
.modal-backdrop.open { display: flex; }
.drawer {
  width: 100%;
  max-width: 500px;
  height: 100%;
  background: var(--ivory-50);
  overflow-y: auto;
  box-shadow: -12px 0 48px rgba(0,0,0,0.3);
}
.drawer-head { background: var(--pine-900); color: var(--ivory-50); padding: 28px; display: flex; justify-content: space-between; align-items: flex-start; }
.drawer-head h2 { color: var(--ivory-50); font-size: 30px; }
.drawer-body { padding: 28px; }
.field { margin-bottom: 16px; }
.field label { display: block; font-size: 13px; font-weight: 600; color: var(--pine-900); margin-bottom: 6px; }
.field input, .field select, .field textarea {
  width: 100%;
  padding: 11px 14px;
  border-radius: 12px;
  border: 1px solid var(--ivory-300);
  background: #fff;
  font-size: 14px;
}

.footer {
  background: var(--pine-950);
  color: rgba(252,250,244,0.72);
  padding: 56px 0 32px;
  font-size: 14px;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
`;
}

function renderBodyMarkup(assetPrefix: string, wpAjaxUrl: string | null): string {
  const kidLaptop = `${assetPrefix}learn-kid-laptop.jpg`;
  const kidTablet = `${assetPrefix}learn-kid-tablet.jpg`;
  const adultTajweed = `${assetPrefix}learn-adult-tajweed.jpg`;
  const adultQuran = `${assetPrefix}learn-adult-quran.jpg`;

  return `
  <div class="topbar">
    <div class="wrap topbar-inner">
      <div><span style="font-family:var(--font-arabic);color:var(--gold-300);font-size:15px;" lang="ar" dir="rtl">ٱلصَّبُور</span> · Global 1-on-1 Online Quran Learning for Kids &amp; Adults Worldwide</div>
      <div>Free 30-Min Trial · Male &amp; Female Certified Tutors</div>
    </div>
  </div>

  <header class="header">
    <div class="wrap header-inner">
      <a href="#top" class="brand">
        <svg width="38" height="38" viewBox="0 0 44 44" aria-hidden="true">
          <rect x="10" y="10" width="24" height="24" fill="none" stroke="#d4b054" stroke-width="1.4" transform="rotate(45 22 22)"/>
          <rect x="10" y="10" width="24" height="24" fill="#0b3024" stroke="#e3c87b" stroke-width="1.4"/>
          <circle cx="22" cy="22" r="2.6" fill="#e3c87b"/>
        </svg>
        <div>
          <span class="brand-name">As-Sabuur<span>.com</span></span>
          <span class="brand-ar" lang="ar" dir="rtl">تَعَلُّمُ الْقُرْآنِ بِسَكِينَة</span>
        </div>
      </a>
      <nav class="nav">
        <a href="#experience">Experience</a>
        <a href="#courses">Courses</a>
        <a href="#trust">Global Trust</a>
      </nav>
      <button type="button" class="btn btn-primary" onclick="openTrialModal()">Book Free Trial</button>
    </div>
  </header>

  <main id="top">
    <section class="hero">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <svg viewBox="0 0 400 400" class="motif-spin" aria-hidden="true">
        <g fill="none" stroke="currentColor" stroke-width="1.4">
          <rect x="85" y="85" width="230" height="230"/>
          <rect x="85" y="85" width="230" height="230" transform="rotate(45 200 200)"/>
          <circle cx="200" cy="200" r="165" stroke-dasharray="6 8"/>
        </g>
      </svg>
      <div class="wrap hero-grid">
        <div>
          <span class="pill-badge"><span style="font-family:var(--font-arabic);font-size:16px;" lang="ar" dir="rtl">ٱلصَّبُورُ</span> Global 1-on-1 Online Quran Sanctuary</span>
          <h1>Learn the Qur’an with <em>patient</em> hearts, from anywhere on earth.</h1>
          <p class="hero-copy">Named after <strong>As-Sabuur</strong> — <em>The Most Patient &amp; Steadfast</em> — our sanctuary pairs children and adults worldwide with certified, deeply caring 1-on-1 teachers in Qaida, Tajweed, Hifz, and Quranic Arabic.</p>
          <div class="hero-actions">
            <button type="button" class="btn btn-gold" onclick="openTrialModal()">Book a Free Trial Class →</button>
            <a href="#experience" class="btn btn-outline">Feel the Learning Experience</a>
          </div>
          <div class="hero-meta">
            <span>✓ Free 30-min trial · No card needed</span>
            <span>✓ Male &amp; female certified tutors</span>
            <span>✓ 35+ countries · All time zones</span>
          </div>
        </div>

        <div class="hero-stage">
          <div class="arch-card">
            <img src="${kidLaptop}" alt="Child smiling during a 1-on-1 online Quran session"/>
            <div class="arch-overlay">
              <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold-300);">● 1-on-1 Kids Session · London 16:30</div>
              <div style="font-family:var(--font-display);font-size:21px;margin-top:4px;">“Look Mama, I read the whole line myself!”</div>
            </div>
          </div>
          <div class="float-card left">
            <img src="${adultTajweed}" alt="Adult practicing Tajweed peacefully" style="width:58px;height:58px;border-radius:12px;object-fit:cover;"/>
            <div>
              <div style="font-size:10px;font-weight:700;color:var(--pine-700);text-transform:uppercase;">Adults · Calm Pace</div>
              <div style="font-size:13px;font-weight:700;color:var(--pine-950);">Tajweed &amp; Tarteel</div>
              <div style="font-size:11px;color:var(--stone-600);">Toronto · Private 1-on-1</div>
            </div>
          </div>
          <div class="float-card right" style="display:block;">
            <div style="font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold-300);">Live Time-Zone Harmony</div>
            <div id="tz-city" style="font-family:var(--font-display);font-size:24px;margin-top:4px;">London · 16:30 GMT</div>
            <div id="tz-note" style="font-size:12px;opacity:0.78;">After-School Qaida · Age 7</div>
          </div>
        </div>
      </div>
    </section>

    <section id="experience" class="section section-sage">
      <div class="wrap">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;">
          <div>
            <span class="eyebrow">Feel the Learning Experience</span>
            <h2 class="section-title">Designed around how <em>you</em> feel inside the lesson</h2>
          </div>
          <div class="tabs" role="tablist">
            <button type="button" class="tab-btn active" id="tab-kids" onclick="switchMode('kids')">Kids (5–14)</button>
            <button type="button" class="tab-btn" id="tab-adults" onclick="switchMode('adults')">Adults &amp; Reverts</button>
          </div>
        </div>

        <div class="exp-card">
          <div>
            <span id="exp-badge" style="display:inline-block;background:var(--gold-100);color:var(--gold-600);padding:4px 12px;border-radius:999px;font-size:12px;font-weight:700;">Playful · Visual · Confidence-First</span>
            <h3 id="exp-title" style="font-size:34px;margin-top:16px;">Lessons children genuinely ask for when the clock hits 5pm.</h3>
            <p id="exp-copy" style="margin-top:12px;color:var(--stone-600);">Warm, patient teachers turn Arabic letters and short surahs into joyful 30-minute milestones — with visual stars and gentle encouragement.</p>
            <div id="exp-milestones" style="margin-top:20px;"></div>
            <button type="button" class="btn btn-primary" style="margin-top:22px;" onclick="openTrialModal()">Try a Free Class →</button>
          </div>
          <div>
            <img id="exp-img" src="${kidTablet}" alt="Learning experience" style="width:100%;aspect-ratio:16/11;object-fit:cover;border-radius:20px;"/>
          </div>
        </div>

        <div style="margin-top:54px;">
          <span class="eyebrow">Interactive Tajweed Soundboard</span>
          <h3 style="font-size:32px;margin-top:10px;">Click a rule to hear cadence &amp; see phonetics</h3>
          <div class="sound-grid" id="sound-grid"></div>
          <div id="sound-detail" style="margin-top:16px;background:#fff;border:1px solid var(--ivory-200);border-radius:18px;padding:20px;"></div>
        </div>
      </div>
    </section>

    <section id="courses" class="section">
      <div class="wrap">
        <span class="eyebrow">Structured Pathways</span>
        <h2 class="section-title">Four courses crafted for lasting connection</h2>
        <div class="courses-grid">
          <article class="course-card">
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--pine-700);text-transform:uppercase;">Kids 5+ &amp; Adult Beginners · 2–4 Months</div>
              <h3 style="font-size:30px;margin-top:12px;">Noorani Qaida &amp; Foundational Reading</h3>
              <p style="margin-top:10px;font-size:14px;color:var(--stone-600);">From recognizing your very first Arabic letter to reading short surahs fluently from the Mushaf.</p>
            </div>
            <button type="button" class="btn btn-primary" style="margin-top:24px;align-self:flex-start;" onclick="openTrialModal('Noorani Qaida & Foundational Reading')">Try This Course →</button>
          </article>
          <article class="course-card dark">
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--gold-300);text-transform:uppercase;">Kids 8+ &amp; Adults · 4–9 Months</div>
              <h3 style="font-size:30px;margin-top:12px;">Tajweed &amp; Fluent Recitation</h3>
              <p style="margin-top:10px;font-size:14px;color:rgba(252,250,244,0.78);">Recite with beauty, precision, and unhurried Tarteel under Ijazah-certified teachers.</p>
            </div>
            <button type="button" class="btn btn-gold" style="margin-top:24px;align-self:flex-start;" onclick="openTrialModal('Tajweed & Fluent Recitation')">Try This Course →</button>
          </article>
          <article class="course-card sage">
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--pine-700);text-transform:uppercase;">Selected Surahs to Full Qur’an · Flexible</div>
              <h3 style="font-size:30px;margin-top:12px;">Hifz / Memorization</h3>
              <p style="margin-top:10px;font-size:14px;color:var(--stone-600);">Retention-first memorization combining Sabaq, Sabqi, and Manzil so what you learn stays for life.</p>
            </div>
            <button type="button" class="btn btn-primary" style="margin-top:24px;align-self:flex-start;" onclick="openTrialModal('Hifz / Memorization')">Try This Course →</button>
          </article>
          <article class="course-card">
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--pine-700);text-transform:uppercase;">Teens &amp; Adults · 6–9 Months</div>
              <h3 style="font-size:30px;margin-top:12px;">Quranic Arabic &amp; Meaning</h3>
              <p style="margin-top:10px;font-size:14px;color:var(--stone-600);">Unlock the 500 highest-frequency Qur’anic words and root patterns so your salah feels personal.</p>
            </div>
            <button type="button" class="btn btn-primary" style="margin-top:24px;align-self:flex-start;" onclick="openTrialModal('Quranic Arabic & Meaning')">Try This Course →</button>
          </article>
        </div>
      </div>
    </section>

    <section id="trust" class="section section-sage">
      <div class="wrap" style="text-align:center;">
        <span class="eyebrow">Global Trust &amp; Human Warmth</span>
        <h2 class="section-title">Patient certified teachers across every time zone</h2>
        <p style="max-width:620px;margin:14px auto 0;color:var(--stone-600);">1-on-1 live classrooms, monthly parent progress summaries, and zero-pressure learning for families in London, Toronto, Houston, Dubai &amp; Sydney.</p>
        <div style="margin-top:30px;">
          <button type="button" class="btn btn-gold" onclick="openTrialModal()">Book Your Free 30-Min Trial Class →</button>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="wrap" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
      <div><strong style="color:var(--ivory-50);font-family:var(--font-display);font-size:22px;">As-Sabuur.com</strong> · Online Quran Learning Sanctuary</div>
      <div>salam@as-sabuur.com · © ${new Date().getFullYear()} As-Sabuur</div>
    </div>
  </footer>

  <!-- Free Trial Drawer -->
  <div class="modal-backdrop" id="trial-modal" onclick="if(event.target===this) closeTrialModal()">
    <div class="drawer" role="dialog" aria-modal="true" aria-label="Book a Free Trial Class">
      <div class="drawer-head">
        <div>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold-300);">Free 1-on-1 Trial Class</div>
          <h2 style="margin-top:8px;">Begin with a gentle conversation</h2>
          <p style="margin:6px 0 0;font-size:13px;opacity:0.78;">30-minute live session · No card required</p>
        </div>
        <button type="button" onclick="closeTrialModal()" style="background:rgba(255,255,255,0.12);color:#fff;border:0;width:36px;height:36px;border-radius:99px;font-size:18px;" aria-label="Close">×</button>
      </div>
      <div class="drawer-body">
        <form id="trial-form" onsubmit="return submitTrialForm(event)">
          <div class="field">
            <label for="f-name">Name *</label>
            <input id="f-name" name="fullName" required placeholder="Parent or student's full name"/>
          </div>
          <div class="field">
            <label for="f-age">Age Group *</label>
            <select id="f-age" name="ageGroup">
              <option value="Kid">Kid (Ages 5–14)</option>
              <option value="Adult">Adult / Revert (15+)</option>
            </select>
          </div>
          <div class="field">
            <label for="f-goal">Preferred Learning Goal *</label>
            <select id="f-goal" name="learningGoal">
              <option value="Noorani Qaida & Foundational Reading">Noorani Qaida &amp; Foundational Reading</option>
              <option value="Tajweed & Fluent Recitation">Tajweed &amp; Fluent Recitation</option>
              <option value="Hifz / Memorization">Hifz / Memorization</option>
              <option value="Quranic Arabic & Meaning">Quranic Arabic &amp; Meaning</option>
            </select>
          </div>
          <div class="field">
            <label for="f-tz">Time Zone *</label>
            <input id="f-tz" name="timezone" required placeholder="e.g. London GMT, New York EST"/>
          </div>
          <div class="field">
            <label for="f-contact">WhatsApp or Email *</label>
            <input id="f-contact" name="contact" required placeholder="+44 7700… or you@email.com"/>
          </div>
          <button type="submit" class="btn btn-gold" style="width:100%;padding:15px;">Confirm Free Trial Class</button>
        </form>
        <div id="trial-success" style="display:none;text-align:center;padding:24px 0;">
          <h3 style="font-size:28px;">JazakAllahu Khayran!</h3>
          <p id="trial-success-msg" style="font-size:14px;color:var(--stone-600);margin-top:10px;"></p>
          <button type="button" class="btn btn-primary" style="margin-top:18px;" onclick="closeTrialModal()">Done</button>
        </div>
      </div>
    </div>
  </div>

  <script>
    const zones = [
      { city: "London · 16:30 GMT", note: "After-School Qaida · Age 7" },
      { city: "New York · 11:30 EST", note: "Adult Tajweed Break" },
      { city: "Dubai · 20:30 GST", note: "Evening Hifz Revision" },
      { city: "Sydney · 05:30 AET", note: "Dawn Recitation & Meaning" }
    ];
    let zi = 0;
    setInterval(() => {
      zi = (zi + 1) % zones.length;
      document.getElementById("tz-city").textContent = zones[zi].city;
      document.getElementById("tz-note").textContent = zones[zi].note;
    }, 3400);

    const modes = {
      kids: {
        badge: "Playful · Visual · Confidence-First",
        title: "Lessons children genuinely ask for when the clock hits 5pm.",
        copy: "Warm, patient teachers turn Arabic letters and short surahs into joyful 30-minute milestones — with visual stars and gentle encouragement.",
        img: "${kidTablet}",
        milestones: [
          ["Step 1 · Letter Friends", "Week 1–4"],
          ["Step 2 · Joining & Vowels", "Month 2"],
          ["Step 3 · First Surahs", "Month 3–4"]
        ]
      },
      adults: {
        badge: "Calm · Structured · Judgment-Free",
        title: "Start from letter one or refine every Tajweed rule — with quiet dignity.",
        copy: "Whether returning after years or learning as a revert, certified scholars adapt calmly to your work and family rhythm.",
        img: "${adultQuran}",
        milestones: [
          ["Phase 1 · Private Diagnostic", "Trial Day 1"],
          ["Phase 2 · Makharij & Rules", "Months 1–3"],
          ["Phase 3 · Fluent Tarteel", "Ongoing"]
        ]
      }
    };

    function switchMode(m) {
      document.getElementById("tab-kids").classList.toggle("active", m === "kids");
      document.getElementById("tab-adults").classList.toggle("active", m === "adults");
      const d = modes[m];
      document.getElementById("exp-badge").textContent = d.badge;
      document.getElementById("exp-title").textContent = d.title;
      document.getElementById("exp-copy").textContent = d.copy;
      document.getElementById("exp-img").src = d.img;
      document.getElementById("exp-milestones").innerHTML = d.milestones.map(x =>
        '<div class="milestone"><strong>' + x[0] + '</strong><span style="font-size:12px;color:var(--pine-700);font-weight:600;">' + x[1] + '</span></div>'
      ).join("");
    }
    switchMode("kids");

    const rules = [
      { id: "qalqalah", ref: "Al-Ikhlas 112:1", ar: "قُلْ هُوَ اللَّهُ أَحَدٌ", title: "Qalqalah (Echo)", tip: "Release final Dal cleanly with a gentle echoing bounce — never add an extra vowel.", freqs: [293.66, 329.63, 392, 440] },
      { id: "ghunnah", ref: "Ash-Sharh 94:6", ar: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", title: "Ghunnah (Nasal 2-Beat)", tip: "Hold the doubled Noon warmly through the nasal passage for two calm heartbeats.", freqs: [261.63, 329.63, 392, 349.23] },
      { id: "madd", ref: "At-Tariq 86:1", ar: "وَالسَّمَاءِ وَالطَّارِقِ", title: "Madd Waajib (4–5 Beats)", tip: "Keep breath steady across the elongated Alif before meeting the Hamzah.", freqs: [293.66, 349.23, 440, 523.25] },
      { id: "tafkheem", ref: "Al-Ma‘arij 70:5", ar: "وَاصْبِرْ صَبْرًا جَمِيلًا", title: "Tafkheem (Full-Mouth)", tip: "Elevate the back tongue gently on Saad for warm, resonant gravity.", freqs: [246.94, 293.66, 369.99, 440] }
    ];
    let activeRule = "qalqalah";
    let playingRule = null;
    function renderSoundboard() {
      const grid = document.getElementById("sound-grid");
      grid.innerHTML = rules.map(r => {
        const cls = ["sound-card", r.id === activeRule ? "active" : "", r.id === playingRule ? "playing" : ""].join(" ");
        const bars = [40,85,60,100,50,90,45,80,55,75].map((h,i) =>
          '<span class="wave-bar" style="height:'+h+'%;animation-delay:'+(i*65)+'ms"></span>'
        ).join("");
        return '<button type="button" class="'+cls+'" onclick="playRule(\\''+r.id+'\\')">'
          + '<div style="font-size:11px;font-weight:700;opacity:0.75;">'+r.ref+'</div>'
          + '<div lang="ar" dir="rtl" style="font-family:var(--font-arabic);font-size:24px;margin-top:10px;">'+r.ar+'</div>'
          + '<div style="font-weight:700;font-size:15px;margin-top:6px;">'+r.title+'</div>'
          + '<div class="wave-row">'+bars+'</div></button>';
      }).join("");
      const cur = rules.find(r => r.id === activeRule);
      document.getElementById("sound-detail").innerHTML = '<strong>'+cur.title+':</strong> <span style="color:var(--stone-600);">'+cur.tip+'</span>';
    }
    function playRule(id) {
      activeRule = id;
      playingRule = id;
      renderSoundboard();
      const cur = rules.find(r => r.id === id);
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC && cur) {
          const ctx = new AC();
          const now = ctx.currentTime;
          cur.freqs.forEach((f, idx) => {
            const o = ctx.createOscillator(), g = ctx.createGain();
            o.frequency.setValueAtTime(f, now + idx * 0.35);
            g.gain.setValueAtTime(0.001, now + idx * 0.35);
            g.gain.exponentialRampToValueAtTime(0.05, now + idx * 0.35 + 0.08);
            g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.35 + 0.32);
            o.connect(g); g.connect(ctx.destination);
            o.start(now + idx * 0.35); o.stop(now + idx * 0.35 + 0.34);
          });
        }
      } catch(e) {}
      setTimeout(() => { playingRule = null; renderSoundboard(); }, 1800);
    }
    renderSoundboard();

    function openTrialModal(goal) {
      if (goal) document.getElementById("f-goal").value = goal;
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz && !document.getElementById("f-tz").value) document.getElementById("f-tz").value = tz;
      } catch(e) {}
      document.getElementById("trial-form").style.display = "block";
      document.getElementById("trial-success").style.display = "none";
      document.getElementById("trial-modal").classList.add("open");
    }
    function closeTrialModal() {
      document.getElementById("trial-modal").classList.remove("open");
    }
    async function submitTrialForm(e) {
      e.preventDefault();
      const fd = new FormData(e.target);
      ${
        wpAjaxUrl
          ? `fd.append("action", "as_sabuur_book_trial");
      try { await fetch(${wpAjaxUrl}, { method: "POST", body: fd }); } catch(err) {}`
          : ""
      }
      document.getElementById("trial-form").style.display = "none";
      document.getElementById("trial-success").style.display = "block";
      document.getElementById("trial-success-msg").textContent =
        "Thank you, " + fd.get("fullName") + ". We have received your trial request for " + fd.get("learningGoal") + " and will contact " + fd.get("contact") + " shortly.";
      return false;
    }
  </script>`;
}

export async function buildWordPressThemeZip(): Promise<Buffer> {
  const zip = new JSZip();
  const folder = zip.folder("as-sabuur-theme")!;

  folder.file("style.css", renderStandaloneStyles());

  folder.file(
    "functions.php",
    `<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }

function as_sabuur_setup() {
  add_theme_support( 'title-tag' );
  add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'as_sabuur_setup' );

function as_sabuur_scripts() {
  wp_enqueue_style( 'as-sabuur-fonts', 'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@400;500;600;700&display=swap', array(), null );
  wp_enqueue_style( 'as-sabuur-style', get_stylesheet_uri(), array( 'as-sabuur-fonts' ), '1.0.0' );
}
add_action( 'wp_enqueue_scripts', 'as_sabuur_scripts' );

function as_sabuur_handle_trial() {
  $booking = array(
    'name'     => sanitize_text_field( $_POST['fullName'] ?? '' ),
    'ageGroup' => sanitize_text_field( $_POST['ageGroup'] ?? '' ),
    'goal'     => sanitize_text_field( $_POST['learningGoal'] ?? '' ),
    'timezone' => sanitize_text_field( $_POST['timezone'] ?? '' ),
    'contact'  => sanitize_text_field( $_POST['contact'] ?? '' ),
    'created'  => current_time( 'mysql' ),
  );
  $trials = get_option( 'as_sabuur_trials', array() );
  array_unshift( $trials, $booking );
  update_option( 'as_sabuur_trials', array_slice( $trials, 0, 200 ) );
  wp_mail( get_option( 'admin_email' ), 'New Free Trial Request — As-Sabuur', print_r( $booking, true ) );
  wp_send_json_success( array( 'saved' => true ) );
}
add_action( 'wp_ajax_as_sabuur_book_trial', 'as_sabuur_handle_trial' );
add_action( 'wp_ajax_nopriv_as_sabuur_book_trial', 'as_sabuur_handle_trial' );
`,
  );

  folder.file(
    "index.php",
    `<?php
/**
 * Main template file for As-Sabuur Sanctuary Theme.
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
${renderBodyMarkup("<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/", "<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>")}
<?php wp_footer(); ?>
</body>
</html>
`,
  );

  // Convert sabuur-hero.jpg to 1200x900 screenshot.png for WordPress theme thumbnail
  const heroPath = path.join(process.cwd(), "public/images/sabuur-hero.jpg");
  const screenshotBuf = await sharp(heroPath).resize(1200, 900, { fit: "cover" }).png().toBuffer();
  folder.file("screenshot.png", screenshotBuf);

  const imgDir = folder.folder("assets/images")!;
  for (const file of IMAGE_FILES) {
    const buf = await fs.readFile(path.join(process.cwd(), "public/images", file));
    imgDir.file(file, buf);
  }

  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}

export async function buildStaticSiteZip(): Promise<Buffer> {
  const zip = new JSZip();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>As-Sabuur.com — Global Online Quran Learning Sanctuary</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
${renderBodyMarkup("./assets/images/", null)}
</body>
</html>`;

  zip.file("index.html", html);
  zip.file("style.css", renderStandaloneStyles());
  zip.file(
    "README.txt",
    `AS-SABUUR.COM — DIRECT STATIC HOSTING PACKAGE
1. Upload every file and folder inside this zip directly to your web root (e.g. public_html/ on cPanel/Hostinger, or drag-and-drop into Netlify Drop / Cloudflare Pages).
2. Your domain as-sabuur.com will immediately serve index.html and all local assets.
`,
  );

  const imgDir = zip.folder("assets/images")!;
  for (const file of IMAGE_FILES) {
    const buf = await fs.readFile(path.join(process.cwd(), "public/images", file));
    imgDir.file(file, buf);
  }

  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}

export type WrapResult =
  | { ok: true; zipBuffer: Buffer; filename: string; wrappedCount: number }
  | { ok: false; reason: "nextjs_source" | "no_index_html"; details: string };

export async function wrapUploadedZipAsWpTheme(inputBuffer: Buffer, rawName: string): Promise<WrapResult> {
  const inputZip = await JSZip.loadAsync(inputBuffer);
  const paths = Object.keys(inputZip.files).filter((p) => !inputZip.files[p].dir);

  const hasPackageJson = paths.some((p) => p === "package.json" || p.endsWith("/package.json"));
  const hasNextApp = paths.some((p) => p.includes("next.config") || p.includes("src/app/"));
  if (hasPackageJson && hasNextApp) {
    return {
      ok: false,
      reason: "nextjs_source",
      details:
        "This ZIP is a Next.js + PostgreSQL Node.js source archive (package.json + src/app/), not a WordPress PHP theme or compiled static HTML bundle. WordPress cannot execute Next.js server components directly.",
    };
  }

  // Locate index.html (root or single top-level directory)
  const indexEntryPath = paths
    .slice()
    .sort((a, b) => a.length - b.length)
    .find((p) => p.toLowerCase().endsWith("index.html"));

  if (!indexEntryPath) {
    return {
      ok: false,
      reason: "no_index_html",
      details:
        "Could not find an index.html inside this ZIP archive. Upload a static HTML/CSS/JS ZIP (with index.html), or download our ready-made As-Sabuur WordPress Theme below.",
    };
  }

  const baseDir = indexEntryPath.includes("/")
    ? indexEntryPath.slice(0, indexEntryPath.lastIndexOf("/") + 1)
    : "";

  const slug =
    rawName
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "as-sabuur-custom-theme";

  const outZip = new JSZip();
  const themeFolder = outZip.folder(slug)!;

  let wrappedCount = 0;
  for (const fullPath of paths) {
    if (!fullPath.startsWith(baseDir)) continue;
    const relPath = fullPath.slice(baseDir.length);
    if (!relPath || relPath === "index.html") continue;
    const content = await inputZip.files[fullPath].async("nodebuffer");
    themeFolder.file(relPath, content);
    wrappedCount++;
  }

  const indexHtml = await inputZip.files[indexEntryPath].async("string");
  const headMatch = indexHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = indexHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

  const rewriteAssets = (fragment: string) =>
    fragment.replace(
      /(src|href)=["'](?!https?:|mailto:|tel:|#|data:|\/\/)(\.?\/)?([^"']+)["']/gi,
      (_m, attr, _dot, target) =>
        `${attr}="<?php echo esc_url( get_template_directory_uri() . '/${target.replace(/^\/+/, "")}' ); ?>"`,
    );

  const innerHead = rewriteAssets(headMatch ? headMatch[1] : "");
  const innerBody = rewriteAssets(bodyMatch ? bodyMatch[1] : indexHtml);

  const existingStyle = paths.find((p) => p === `${baseDir}style.css`);
  const existingCssText = existingStyle ? await inputZip.files[existingStyle].async("string") : "";

  themeFolder.file(
    "style.css",
    `/*
Theme Name: ${rawName.trim() || "As-Sabuur Custom Theme"}
Theme URI: https://as-sabuur.com
Description: Wrapped custom site packaged as a valid WordPress theme.
Version: 1.0.0
*/

${existingCssText}`,
  );

  themeFolder.file(
    "functions.php",
    `<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }
add_action( 'after_setup_theme', function() { add_theme_support( 'title-tag' ); } );
add_action( 'wp_enqueue_scripts', function() {
  wp_enqueue_style( '${slug}-style', get_stylesheet_uri(), array(), '1.0.0' );
} );
`,
  );

  themeFolder.file(
    "index.php",
    `<?php
/**
 * WordPress theme wrapper generated for ${slug}.
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${innerHead}
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
${innerBody}
<?php wp_footer(); ?>
</body>
</html>
`,
  );

  const zipBuffer = await outZip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
  return { ok: true, zipBuffer, filename: `${slug}.zip`, wrappedCount: wrappedCount + 3 };
}
