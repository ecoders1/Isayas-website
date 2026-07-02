/* ============================================
   admin-login.js  –  Admin Login Page Logic
   ============================================ */
'use strict';

import { db, SUPABASE_URL } from './supabase.js';

const html        = document.documentElement;
const loginForm   = document.getElementById('loginForm');
const loginBtn    = document.getElementById('loginBtn');
const loginStatus = document.getElementById('loginStatus');
const togglePw    = document.getElementById('togglePw');
const pwIcon      = document.getElementById('pwIcon');
const pwInput     = document.getElementById('loginPassword');

/* ─── Theme (inherit from localStorage) ─── */
const saved = localStorage.getItem('theme');
if (saved) html.setAttribute('data-theme', saved);
else if (window.matchMedia('(prefers-color-scheme: dark)').matches)
  html.setAttribute('data-theme', 'dark');

/* ─── Toggle password visibility ─── */
togglePw.addEventListener('click', () => {
  const isText = pwInput.type === 'text';
  pwInput.type = isText ? 'password' : 'text';
  pwIcon.className = isText ? 'fas fa-eye' : 'fas fa-eye-slash';
});

/* ─── Redirect if already logged in ─── */
db.auth.getSession().then(({ data }) => {
  if (data.session) window.location.href = 'dashboard.html';
}).catch(() => {
  // Supabase not configured yet — silently ignore on login page
});

/* ─── Login form submit ─── */
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email    = loginForm.email.value.trim();
  const password = loginForm.password.value;

  if (!email || !password) {
    setStatus('Please enter your email and password.', 'error');
    return;
  }

  // Guard: keys not configured
  if (SUPABASE_URL.includes('your-project-id')) {
    setStatus('⚠ Supabase is not configured. Add your URL and anon key to js/supabase.js', 'error');
    return;
  }

  setBusy(true);
  setStatus('', '');

  try {
    const { error } = await db.auth.signInWithPassword({ email, password });

    if (error) {
      setBusy(false);
      setStatus(error.message || 'Sign-in failed. Please try again.', 'error');
      return;
    }

    setStatus('✓ Signed in! Redirecting…', 'success');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 600);

  } catch (err) {
    setBusy(false);
    if (err.message === 'Failed to fetch') {
      setStatus('Cannot reach Supabase. Check your URL and anon key in js/env-config.js', 'error');
    } else {
      setStatus(err.message || 'Unexpected error. Please try again.', 'error');
    }
  }
});

function setBusy(busy) {
  loginBtn.disabled = busy;
  loginBtn.querySelector('span').textContent = busy ? 'Signing in…' : 'Sign In';
  loginBtn.querySelector('i').className = busy
    ? 'fas fa-circle-notch fa-spin'
    : 'fas fa-sign-in-alt';
}

function setStatus(msg, type) {
  loginStatus.textContent = msg;
  loginStatus.className = `form-status ${type}`;
}
