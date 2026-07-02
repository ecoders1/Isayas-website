/* ============================================
   skills.js – Skill card click → lecture modal
   ============================================ */
'use strict';

const SKILLS = {
  HTML: {
    icon: '<i class="fab fa-html5"></i>',
    level: '95% – Expert',
    color: '#e34c26',
    desc: 'HTML (HyperText Markup Language) is the backbone of every web page. It defines the structure and meaning of web content using a system of elements and attributes.',
    topics: ['Semantic Elements','Forms & Validation','Accessibility (ARIA)','SEO Meta Tags','Canvas & SVG','HTML5 APIs','Media Elements','Data Attributes'],
    lectures: [
      { title: 'Introduction to HTML & Document Structure', dur: '18 min' },
      { title: 'Semantic HTML5 Elements', dur: '22 min' },
      { title: 'Forms, Inputs & Validation', dur: '30 min' },
      { title: 'Tables, Lists & Media', dur: '20 min' },
      { title: 'Accessibility & ARIA Roles', dur: '25 min' },
      { title: 'SEO Best Practices in HTML', dur: '18 min' },
      { title: 'HTML5 APIs – Canvas, Drag & Drop', dur: '28 min' },
      { title: 'Meta Tags & Open Graph', dur: '15 min' },
    ],
    resources: [
      { title: 'MDN HTML Reference', type: 'Documentation', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', icon: 'fas fa-book' },
      { title: 'HTML5 Specification – W3C', type: 'Specification', url: 'https://www.w3.org/TR/html52/', icon: 'fas fa-file-alt' },
      { title: 'freeCodeCamp – Responsive Web Design', type: 'Course', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/', icon: 'fas fa-graduation-cap' },
      { title: 'HTML Validator', type: 'Tool', url: 'https://validator.w3.org/', icon: 'fas fa-tools' },
    ],
  },
  CSS: {
    icon: '<i class="fab fa-css3-alt"></i>',
    level: '90% – Expert',
    color: '#264de4',
    desc: 'CSS (Cascading Style Sheets) controls the visual presentation of web pages — layout, colors, typography, animations, and responsive design.',
    topics: ['Flexbox','CSS Grid','Animations & Transitions','Custom Properties','Media Queries','Pseudo-elements','BEM Methodology','CSS Architecture'],
    lectures: [
      { title: 'CSS Fundamentals & Box Model', dur: '20 min' },
      { title: 'Flexbox – Complete Guide', dur: '35 min' },
      { title: 'CSS Grid Layout Mastery', dur: '40 min' },
      { title: 'Responsive Design & Media Queries', dur: '28 min' },
      { title: 'CSS Custom Properties (Variables)', dur: '18 min' },
      { title: 'Animations, Transitions & Keyframes', dur: '32 min' },
      { title: 'Glassmorphism & Modern UI Techniques', dur: '25 min' },
      { title: 'BEM & CSS Architecture', dur: '22 min' },
    ],
    resources: [
      { title: 'MDN CSS Reference', type: 'Documentation', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', icon: 'fas fa-book' },
      { title: 'CSS-Tricks – Flexbox Guide', type: 'Guide', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', icon: 'fas fa-link' },
      { title: 'CSS-Tricks – Grid Guide', type: 'Guide', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', icon: 'fas fa-link' },
      { title: 'Animista – CSS Animations', type: 'Tool', url: 'https://animista.net/', icon: 'fas fa-tools' },
    ],
  },
  JavaScript: {
    icon: '<i class="fab fa-js-square"></i>',
    level: '85% – Advanced',
    color: '#f0db4f',
    desc: 'JavaScript is the programming language of the web. It adds interactivity, handles data, communicates with APIs, and powers modern frameworks.',
    topics: ['ES6+ Syntax','DOM Manipulation','Async/Await & Promises','Fetch API','Modules','Event Loop','LocalStorage','Error Handling'],
    lectures: [
      { title: 'JavaScript Fundamentals & Data Types', dur: '25 min' },
      { title: 'ES6+ – Arrow Functions, Destructuring, Spread', dur: '30 min' },
      { title: 'DOM Manipulation & Events', dur: '35 min' },
      { title: 'Promises, Async/Await & Fetch API', dur: '40 min' },
      { title: 'JavaScript Modules (ESM)', dur: '22 min' },
      { title: 'The Event Loop & Call Stack', dur: '28 min' },
      { title: 'Error Handling & Debugging', dur: '20 min' },
      { title: 'LocalStorage, SessionStorage & Cookies', dur: '18 min' },
    ],
    resources: [
      { title: 'MDN JavaScript Guide', type: 'Documentation', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', icon: 'fas fa-book' },
      { title: 'JavaScript.info – The Modern JS Tutorial', type: 'Tutorial', url: 'https://javascript.info/', icon: 'fas fa-graduation-cap' },
      { title: 'Eloquent JavaScript (free book)', type: 'Book', url: 'https://eloquentjavascript.net/', icon: 'fas fa-book-open' },
      { title: 'JS Visualizer – Event Loop', type: 'Tool', url: 'https://www.jsv9000.app/', icon: 'fas fa-tools' },
    ],
  },
  PHP: {
    icon: '<i class="fab fa-php"></i>',
    level: '80% – Advanced',
    color: '#8892bf',
    desc: 'PHP is a server-side scripting language widely used for web development. It powers dynamic websites, handles form submissions, connects to databases, and builds REST APIs.',
    topics: ['OOP in PHP','PDO & MySQLi','REST APIs','Sessions & Cookies','File Handling','Composer','MVC Pattern','Security'],
    lectures: [
      { title: 'PHP Basics – Syntax, Variables & Loops', dur: '22 min' },
      { title: 'Object-Oriented PHP', dur: '38 min' },
      { title: 'Working with MySQL via PDO', dur: '35 min' },
      { title: 'Building REST APIs with PHP', dur: '42 min' },
      { title: 'Sessions, Cookies & Authentication', dur: '30 min' },
      { title: 'File Upload & Handling', dur: '20 min' },
      { title: 'PHP Security – SQL Injection, XSS', dur: '28 min' },
      { title: 'Composer & Dependency Management', dur: '18 min' },
    ],
    resources: [
      { title: 'PHP.net Official Docs', type: 'Documentation', url: 'https://www.php.net/manual/en/', icon: 'fas fa-book' },
      { title: 'Laracasts – PHP for Beginners', type: 'Course', url: 'https://laracasts.com/series/php-for-beginners-2023-edition', icon: 'fas fa-graduation-cap' },
      { title: 'PHP: The Right Way', type: 'Guide', url: 'https://phptherightway.com/', icon: 'fas fa-link' },
      { title: 'Composer Package Manager', type: 'Tool', url: 'https://getcomposer.org/', icon: 'fas fa-tools' },
    ],
  },
  MySQL: {
    icon: '<i class="fas fa-database"></i>',
    level: '78% – Advanced',
    color: '#00758f',
    desc: 'MySQL is the world\'s most popular open-source relational database. It stores and retrieves structured data using SQL queries.',
    topics: ['SQL Queries','Joins','Indexes','Stored Procedures','Transactions','Normalization','Views','Database Design'],
    lectures: [
      { title: 'SQL Basics – SELECT, INSERT, UPDATE, DELETE', dur: '25 min' },
      { title: 'Joins – INNER, LEFT, RIGHT, FULL', dur: '30 min' },
      { title: 'Database Design & Normalization', dur: '35 min' },
      { title: 'Indexes & Query Optimization', dur: '28 min' },
      { title: 'Stored Procedures & Functions', dur: '30 min' },
      { title: 'Transactions & ACID Properties', dur: '22 min' },
      { title: 'Views & Virtual Tables', dur: '18 min' },
      { title: 'MySQL with PHP (PDO)', dur: '35 min' },
    ],
    resources: [
      { title: 'MySQL Official Documentation', type: 'Documentation', url: 'https://dev.mysql.com/doc/', icon: 'fas fa-book' },
      { title: 'SQLZoo – Interactive SQL Tutorial', type: 'Tutorial', url: 'https://sqlzoo.net/', icon: 'fas fa-graduation-cap' },
      { title: 'DB Fiddle – Online SQL Sandbox', type: 'Tool', url: 'https://www.db-fiddle.com/', icon: 'fas fa-tools' },
      { title: 'MySQL Workbench', type: 'Tool', url: 'https://www.mysql.com/products/workbench/', icon: 'fas fa-tools' },
    ],
  },
  Flutter: {
    icon: '<i class="fas fa-mobile-alt"></i>',
    level: '75% – Intermediate',
    color: '#54c5f8',
    desc: 'Flutter is Google\'s UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase using Dart.',
    topics: ['Widgets','State Management','Navigation','Animations','Firebase Integration','REST API','Platform Channels','Testing'],
    lectures: [
      { title: 'Flutter & Dart Fundamentals', dur: '30 min' },
      { title: 'Widgets – Stateless & Stateful', dur: '35 min' },
      { title: 'Layouts – Column, Row, Stack, Expanded', dur: '28 min' },
      { title: 'State Management – Provider & Riverpod', dur: '40 min' },
      { title: 'Navigation & Routing', dur: '25 min' },
      { title: 'Consuming REST APIs in Flutter', dur: '35 min' },
      { title: 'Firebase Integration', dur: '38 min' },
      { title: 'Flutter Animations', dur: '32 min' },
    ],
    resources: [
      { title: 'Flutter Official Docs', type: 'Documentation', url: 'https://docs.flutter.dev/', icon: 'fas fa-book' },
      { title: 'Dart Language Tour', type: 'Guide', url: 'https://dart.dev/guides/language/language-tour', icon: 'fas fa-link' },
      { title: 'Flutter YouTube Channel', type: 'Video', url: 'https://www.youtube.com/@flutterdev', icon: 'fas fa-video' },
      { title: 'pub.dev – Flutter Packages', type: 'Tool', url: 'https://pub.dev/', icon: 'fas fa-tools' },
    ],
  },
  Firebase: {
    icon: '<i class="fas fa-fire"></i>',
    level: '80% – Advanced',
    color: '#ffcb2b',
    desc: 'Firebase is Google\'s platform for building web and mobile apps. It provides authentication, real-time database, cloud storage, hosting, and more.',
    topics: ['Authentication','Firestore','Realtime DB','Cloud Storage','Cloud Functions','Hosting','Security Rules','Analytics'],
    lectures: [
      { title: 'Firebase Project Setup & Config', dur: '15 min' },
      { title: 'Firebase Authentication – Email, Google, Phone', dur: '35 min' },
      { title: 'Cloud Firestore – CRUD & Queries', dur: '40 min' },
      { title: 'Realtime Database', dur: '28 min' },
      { title: 'Cloud Storage – File Upload/Download', dur: '25 min' },
      { title: 'Cloud Functions (Serverless)', dur: '38 min' },
      { title: 'Firestore Security Rules', dur: '30 min' },
      { title: 'Firebase Hosting & Deployment', dur: '18 min' },
    ],
    resources: [
      { title: 'Firebase Documentation', type: 'Documentation', url: 'https://firebase.google.com/docs', icon: 'fas fa-book' },
      { title: 'Fireship.io – Firebase Tutorials', type: 'Tutorial', url: 'https://fireship.io/', icon: 'fas fa-graduation-cap' },
      { title: 'Firebase Console', type: 'Tool', url: 'https://console.firebase.google.com/', icon: 'fas fa-tools' },
      { title: 'FlutterFire Docs', type: 'Documentation', url: 'https://firebase.flutter.dev/', icon: 'fas fa-book' },
    ],
  },
  Supabase: {
    icon: '<i class="fas fa-server"></i>',
    level: '75% – Intermediate',
    color: '#3ecf8e',
    desc: 'Supabase is an open-source Firebase alternative built on PostgreSQL. It provides authentication, a real-time database, storage, and edge functions.',
    topics: ['PostgreSQL','Row Level Security','Auth','Storage','Edge Functions','Realtime','REST API','SQL Editor'],
    lectures: [
      { title: 'Supabase Project Setup', dur: '15 min' },
      { title: 'PostgreSQL Basics with Supabase', dur: '30 min' },
      { title: 'Row Level Security (RLS) Policies', dur: '35 min' },
      { title: 'Supabase Auth – Email & OAuth', dur: '30 min' },
      { title: 'Supabase Storage – Buckets & Uploads', dur: '25 min' },
      { title: 'Realtime Subscriptions', dur: '22 min' },
      { title: 'Edge Functions (Serverless)', dur: '28 min' },
      { title: 'Supabase JS Client & REST API', dur: '25 min' },
    ],
    resources: [
      { title: 'Supabase Documentation', type: 'Documentation', url: 'https://supabase.com/docs', icon: 'fas fa-book' },
      { title: 'Supabase YouTube Channel', type: 'Video', url: 'https://www.youtube.com/@Supabase', icon: 'fas fa-video' },
      { title: 'PostgreSQL Tutorial', type: 'Tutorial', url: 'https://www.postgresqltutorial.com/', icon: 'fas fa-graduation-cap' },
      { title: 'Supabase Dashboard', type: 'Tool', url: 'https://supabase.com/dashboard', icon: 'fas fa-tools' },
    ],
  },
  'Git & GitHub': {
    icon: '<i class="fab fa-git-alt"></i>',
    level: '88% – Expert',
    color: '#f05032',
    desc: 'Git is the industry-standard version control system. GitHub is the platform for hosting code, collaboration, pull requests, CI/CD, and open source.',
    topics: ['Branching','Merging','Pull Requests','Git Flow','Rebasing','Tags & Releases','GitHub Actions','Open Source'],
    lectures: [
      { title: 'Git Basics – Init, Add, Commit, Push', dur: '20 min' },
      { title: 'Branching & Merging Strategies', dur: '30 min' },
      { title: 'Pull Requests & Code Review', dur: '25 min' },
      { title: 'Git Rebase & Cherry-pick', dur: '28 min' },
      { title: 'Resolving Merge Conflicts', dur: '22 min' },
      { title: 'Git Flow Workflow', dur: '25 min' },
      { title: 'GitHub Actions – CI/CD Basics', dur: '35 min' },
      { title: 'Open Source Contribution Guide', dur: '20 min' },
    ],
    resources: [
      { title: 'Pro Git Book (free)', type: 'Book', url: 'https://git-scm.com/book/en/v2', icon: 'fas fa-book-open' },
      { title: 'GitHub Docs', type: 'Documentation', url: 'https://docs.github.com/', icon: 'fas fa-book' },
      { title: 'Learn Git Branching (interactive)', type: 'Tutorial', url: 'https://learngitbranching.js.org/', icon: 'fas fa-graduation-cap' },
      { title: 'GitHub Skills', type: 'Course', url: 'https://skills.github.com/', icon: 'fas fa-graduation-cap' },
    ],
  },
  Vercel: {
    icon: '<i class="fas fa-rocket"></i>',
    level: '82% – Advanced',
    color: '#000000',
    desc: 'Vercel is a cloud platform for frontend developers, offering instant deployments, automatic HTTPS, edge functions, and seamless GitHub integration.',
    topics: ['Deployments','Environment Variables','Edge Functions','Preview URLs','Custom Domains','Analytics','Vercel CLI','CI/CD'],
    lectures: [
      { title: 'Deploying to Vercel from GitHub', dur: '15 min' },
      { title: 'Environment Variables & Secrets', dur: '18 min' },
      { title: 'Custom Domains & HTTPS', dur: '15 min' },
      { title: 'Preview Deployments & Branching', dur: '20 min' },
      { title: 'Vercel Edge Functions', dur: '28 min' },
      { title: 'Vercel CLI – Deploy from Terminal', dur: '18 min' },
      { title: 'Analytics & Web Vitals', dur: '18 min' },
      { title: 'Vercel + Supabase Integration', dur: '25 min' },
    ],
    resources: [
      { title: 'Vercel Documentation', type: 'Documentation', url: 'https://vercel.com/docs', icon: 'fas fa-book' },
      { title: 'Vercel CLI Reference', type: 'Tool', url: 'https://vercel.com/docs/cli', icon: 'fas fa-tools' },
      { title: 'Vercel Templates', type: 'Templates', url: 'https://vercel.com/templates', icon: 'fas fa-th-large' },
      { title: 'Vercel Blog', type: 'Blog', url: 'https://vercel.com/blog', icon: 'fas fa-rss' },
    ],
  },
};

/* ─── Modal logic ─── */
const overlay    = document.getElementById('skillModal');
const modalIcon  = document.getElementById('skillModalIcon');
const modalTitle = document.getElementById('skillModalTitle');
const modalLevel = document.getElementById('skillModalLevel');
const modalBody  = document.getElementById('skillModalBody');
const closeBtn   = document.getElementById('skillModalClose');
const closeBtn2  = document.getElementById('skillModalClose2');
const tabBtns    = document.querySelectorAll('.smt');

let currentSkill = null;
let currentTab   = 'overview';

/* Attach click to each skill card */
document.querySelectorAll('.skill-card').forEach((card) => {
  card.addEventListener('click', () => {
    const name = card.querySelector('.skill-card-name').textContent.trim();
    openModal(name);
  });
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `View ${card.querySelector('.skill-card-name').textContent.trim()} lectures`);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

function openModal(skillName) {
  const skill = SKILLS[skillName];
  if (!skill) return;
  currentSkill = skill;

  modalIcon.innerHTML  = skill.icon;
  modalTitle.textContent = skillName;
  modalLevel.textContent = skill.level;

  // Reset to overview tab
  setTab('overview');
  tabBtns.forEach((b) => b.classList.toggle('active', b.dataset.tab === 'overview'));

  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  closeBtn.focus();
}

function closeModal() {
  overlay.hidden = true;
  document.body.style.overflow = '';
}

closeBtn.addEventListener('click', closeModal);
closeBtn2.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* Tabs */
tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabBtns.forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected','true');
    setTab(btn.dataset.tab);
  });
});

function setTab(tab) {
  currentTab = tab;
  if (!currentSkill) return;

  if (tab === 'overview') {
    modalBody.innerHTML = `
      <p class="sm-overview-desc">${currentSkill.desc}</p>
      <div class="sm-topics">
        ${currentSkill.topics.map((t) => `<span class="sm-topic-tag">${t}</span>`).join('')}
      </div>
      <div class="sm-meta">
        <span class="sm-meta-item"><i class="fas fa-book-open"></i> ${currentSkill.lectures.length} Lectures</span>
        <span class="sm-meta-item"><i class="fas fa-link"></i> ${currentSkill.resources.length} Resources</span>
        <span class="sm-meta-item"><i class="fas fa-tag"></i> ${currentSkill.topics.length} Topics</span>
      </div>`;
  }

  if (tab === 'lectures') {
    modalBody.innerHTML = `
      <div class="sm-lecture-list">
        ${currentSkill.lectures.map((l, i) => `
          <div class="sm-lecture">
            <span class="sm-lecture-num">${i + 1}</span>
            <div class="sm-lecture-info">
              <div class="sm-lecture-title">${l.title}</div>
              <div class="sm-lecture-dur"><i class="fas fa-clock"></i> ${l.dur}</div>
            </div>
            <i class="fas fa-play-circle sm-lecture-play"></i>
          </div>`).join('')}
      </div>`;
  }

  if (tab === 'resources') {
    modalBody.innerHTML = `
      <div class="sm-resources">
        ${currentSkill.resources.map((r) => `
          <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="sm-resource">
            <span class="sm-resource-icon"><i class="${r.icon}"></i></span>
            <div>
              <div class="sm-resource-title">${r.title}</div>
              <div class="sm-resource-type">${r.type}</div>
            </div>
            <i class="fas fa-external-link-alt"></i>
          </a>`).join('')}
      </div>`;
  }
}
