/* ============================================
   ISAYAS PORTFOLIO – main.js
   ============================================ */
'use strict';

/* ─── THEME ─── */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }
}

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Listen for OS-level changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light');
});

initTheme();

/* ─── NAVBAR SCROLL & SHRINK ─── */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

/* ─── ACTIVE NAV LINK ON SCROLL ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let currentId = '';
  sections.forEach((sec) => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) currentId = sec.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink();

/* ─── HAMBURGER MENU ─── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

mobileLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));

/* Close on outside click */
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMobileMenu();
  }
});

/* ─── SCROLL ANIMATIONS (IntersectionObserver) ─── */
const animatedEls = document.querySelectorAll('.animate-on-scroll');

const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Animate skill bars when the skills section enters view
        if (entry.target.classList.contains('skills-grid')) {
          animateSkills();
        }

        scrollObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

animatedEls.forEach((el) => scrollObserver.observe(el));

/* ─── SKILL RINGS (SVG circles) ─── */
function animateSkills() {
  const rings = document.querySelectorAll('.ring-fill');
  rings.forEach((ring) => {
    // Small delay so CSS transition fires after 'visible' class
    requestAnimationFrame(() => ring.classList.add('animated'));
  });
}

/* ─── BACK TO TOP ─── */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── CONTACT FORM (Supabase) ─── */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formStatus  = document.getElementById('formStatus');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setStatus(msg, type) {
  formStatus.textContent = msg;
  formStatus.className = `form-status ${type}`;
}

// Lazy-load Supabase client only when the form is submitted
async function getSupabaseClient() {
  const { createClient } = window.supabase;
  const url  = window.__ENV?.SUPABASE_URL      || '';
  const anon = window.__ENV?.SUPABASE_ANON_KEY || '';
  if (!url || url.includes('your-project')) return null;
  return createClient(url, anon);
}

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = contactForm.name.value.trim();
  const email   = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  // Clear previous errors
  contactForm.querySelectorAll('.form-input').forEach((el) => el.classList.remove('error'));
  setStatus('', '');

  // Validate
  let hasError = false;
  if (!name)                { contactForm.name.classList.add('error');    hasError = true; }
  if (!validateEmail(email)){ contactForm.email.classList.add('error');   hasError = true; }
  if (!message)             { contactForm.message.classList.add('error'); hasError = true; }

  if (hasError) {
    setStatus('Please fill in all fields correctly.', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.querySelector('span').textContent = 'Sending…';
  submitBtn.querySelector('i').className = 'fas fa-circle-notch fa-spin';

  try {
    const client = await getSupabaseClient();

    if (client) {
      // Save to Supabase contact_messages table
      const { error } = await client
        .from('contact_messages')
        .insert({ name, email, message });

      if (error) throw new Error(error.message);
    } else {
      // Supabase not configured yet — simulate for dev
      await new Promise((r) => setTimeout(r, 1000));
    }

    setStatus("✓ Message sent! I'll get back to you soon.", 'success');
    contactForm.reset();
    setTimeout(() => setStatus('', ''), 6000);

  } catch (err) {
    setStatus('Failed to send: ' + err.message, 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.querySelector('span').textContent = 'Send Message';
    submitBtn.querySelector('i').className = 'fas fa-paper-plane';
  }
});

/* ─── SMOOTH SCROLL for anchor links ─── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(html).getPropertyValue('--navbar-h') || '72', 10);
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
