/* ============================================
   lectures.js – All Lectures page logic
   ============================================ */
'use strict';

/* ─── Theme ─── */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');

function applyTheme(t) {
  html.setAttribute('data-theme', t);
  themeIcon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('theme', t);
}
const saved = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(saved);
themeToggle.addEventListener('click', () =>
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

/* ─── Skill data (inline so no module import needed) ─── */
const SKILLS = {
  HTML:          { icon:'fab fa-html5',      pct:95, color:'#e34c26' },
  CSS:           { icon:'fab fa-css3-alt',   pct:90, color:'#264de4' },
  JavaScript:    { icon:'fab fa-js-square',  pct:85, color:'#f0db4f' },
  PHP:           { icon:'fab fa-php',        pct:80, color:'#8892bf' },
  MySQL:         { icon:'fas fa-database',   pct:78, color:'#00758f' },
  Flutter:       { icon:'fas fa-mobile-alt', pct:75, color:'#54c5f8' },
  Firebase:      { icon:'fas fa-fire',       pct:80, color:'#ffcb2b' },
  Supabase:      { icon:'fas fa-server',     pct:75, color:'#3ecf8e' },
  'Git & GitHub':{ icon:'fab fa-git-alt',    pct:88, color:'#f05032' },
  Vercel:        { icon:'fas fa-rocket',     pct:82, color:'#000' },
};

const LECTURES = {
  HTML: [
    'Introduction to HTML & Document Structure',
    'Semantic HTML5 Elements',
    'Forms, Inputs & Validation',
    'Tables, Lists & Media',
    'Accessibility & ARIA Roles',
    'SEO Best Practices in HTML',
    'HTML5 APIs – Canvas, Drag & Drop',
    'Meta Tags & Open Graph',
  ],
  CSS: [
    'CSS Fundamentals & Box Model',
    'Flexbox – Complete Guide',
    'CSS Grid Layout Mastery',
    'Responsive Design & Media Queries',
    'CSS Custom Properties (Variables)',
    'Animations, Transitions & Keyframes',
    'Glassmorphism & Modern UI Techniques',
    'BEM & CSS Architecture',
  ],
  JavaScript: [
    'JavaScript Fundamentals & Data Types',
    'ES6+ – Arrow Functions, Destructuring, Spread',
    'DOM Manipulation & Events',
    'Promises, Async/Await & Fetch API',
    'JavaScript Modules (ESM)',
    'The Event Loop & Call Stack',
    'Error Handling & Debugging',
    'LocalStorage, SessionStorage & Cookies',
  ],
  PHP: [
    'PHP Basics – Syntax, Variables & Loops',
    'Object-Oriented PHP',
    'Working with MySQL via PDO',
    'Building REST APIs with PHP',
    'Sessions, Cookies & Authentication',
    'File Upload & Handling',
    'PHP Security – SQL Injection, XSS',
    'Composer & Dependency Management',
  ],
  MySQL: [
    'SQL Basics – SELECT, INSERT, UPDATE, DELETE',
    'Joins – INNER, LEFT, RIGHT, FULL',
    'Database Design & Normalization',
    'Indexes & Query Optimization',
    'Stored Procedures & Functions',
    'Transactions & ACID Properties',
    'Views & Virtual Tables',
    'MySQL with PHP (PDO)',
  ],
  Flutter: [
    'Flutter & Dart Fundamentals',
    'Widgets – Stateless & Stateful',
    'Layouts – Column, Row, Stack, Expanded',
    'State Management – Provider & Riverpod',
    'Navigation & Routing',
    'Consuming REST APIs in Flutter',
    'Firebase Integration',
    'Flutter Animations',
  ],
  Firebase: [
    'Firebase Project Setup & Config',
    'Firebase Authentication – Email, Google, Phone',
    'Cloud Firestore – CRUD & Queries',
    'Realtime Database',
    'Cloud Storage – File Upload/Download',
    'Cloud Functions (Serverless)',
    'Firestore Security Rules',
    'Firebase Hosting & Deployment',
  ],
  Supabase: [
    'Supabase Project Setup',
    'PostgreSQL Basics with Supabase',
    'Row Level Security (RLS) Policies',
    'Supabase Auth – Email & OAuth',
    'Supabase Storage – Buckets & Uploads',
    'Realtime Subscriptions',
    'Edge Functions (Serverless)',
    'Supabase JS Client & REST API',
  ],
  'Git & GitHub': [
    'Git Basics – Init, Add, Commit, Push',
    'Branching & Merging Strategies',
    'Pull Requests & Code Review',
    'Git Rebase & Cherry-pick',
    'Resolving Merge Conflicts',
    'Git Flow Workflow',
    'GitHub Actions – CI/CD Basics',
    'Open Source Contribution Guide',
  ],
  Vercel: [
    'Deploying to Vercel from GitHub',
    'Environment Variables & Secrets',
    'Custom Domains & HTTPS',
    'Preview Deployments & Branching',
    'Vercel Edge Functions',
    'Vercel CLI – Deploy from Terminal',
    'Analytics & Web Vitals',
    'Vercel + Supabase Integration',
  ],
};

/* ─── Render ─── */
const grid   = document.getElementById('lecGrid');
const search = document.getElementById('lectureSearch');
const filters = document.querySelectorAll('.lec-filter');

let activeFilter = 'all';
let searchQuery  = '';

function render() {
  const names = Object.keys(SKILLS).filter((name) => {
    const matchFilter = activeFilter === 'all' || name === activeFilter;
    const matchSearch = !searchQuery ||
      name.toLowerCase().includes(searchQuery) ||
      LECTURES[name].some((l) => l.toLowerCase().includes(searchQuery));
    return matchFilter && matchSearch;
  });

  if (!names.length) {
    grid.innerHTML = `<div class="lec-empty"><i class="fas fa-search"></i><p>No lectures found for "<strong>${searchQuery}</strong>"</p></div>`;
    return;
  }

  grid.innerHTML = names.map((name) => {
    const s = SKILLS[name];
    const lectures = LECTURES[name];
    const totalMins = lectures.length * 25;
    return `
      <div class="lec-card glass-card">
        <div class="lec-card-header">
          <div class="lec-card-icon">
            <i class="${s.icon}"></i>
          </div>
          <div>
            <h3 class="lec-card-title">${name}</h3>
            <div class="lec-card-meta">
              <span><i class="fas fa-book-open"></i> ${lectures.length} lectures</span>
              <span><i class="fas fa-clock"></i> ~${totalMins} min</span>
              <span><i class="fas fa-signal"></i> ${s.pct}%</span>
            </div>
          </div>
        </div>
        <ol class="lec-list">
          ${lectures.map((l, i) => `
            <li class="lec-item">
              <span class="lec-num">${i + 1}</span>
              <span class="lec-name">${l}</span>
              <i class="fas fa-play-circle lec-play"></i>
            </li>`).join('')}
        </ol>
      </div>`;
  }).join('');
}

/* ─── Filter buttons ─── */
filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    filters.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    render();
  });
});

/* ─── Search ─── */
search.addEventListener('input', () => {
  searchQuery = search.value.toLowerCase().trim();
  render();
});

render();
