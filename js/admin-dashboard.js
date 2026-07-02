/* ============================================
   admin-dashboard.js  –  Dashboard Logic
   ============================================ */
'use strict';

import { db, SUPABASE_URL } from './supabase.js';

/* ─── Auth guard: redirect to login if no session ─── */
const { data: { session } } = await db.auth.getSession();
if (!session) { window.location.href = 'index.html'; }

const userEmailEl = document.getElementById('dashUserEmail');
if (userEmailEl) userEmailEl.textContent = session.user.email;

/* ─── Theme ─── */
const html           = document.documentElement;
const themeToggle    = document.getElementById('dashThemeToggle');
const themeIcon      = document.getElementById('dashThemeIcon');

function applyTheme(t) {
  html.setAttribute('data-theme', t);
  themeIcon.className = t === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('theme', t);
}
const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(savedTheme);
themeToggle.addEventListener('click', () =>
  applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

/* ─── Sidebar & Tabs ─── */
const sidebarLinks  = document.querySelectorAll('.sidebar-link');
const tabs          = document.querySelectorAll('.dash-tab');
const pageTitle     = document.getElementById('dashPageTitle');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar       = document.getElementById('sidebar');

sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));

sidebarLinks.forEach((btn) => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    sidebarLinks.forEach((b) => b.classList.remove('active'));
    tabs.forEach((t) => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`tab-${tab}`).classList.add('active');
    pageTitle.textContent = btn.textContent.trim();
    sidebar.classList.remove('open');
  });
});

/* ─── Sign Out ─── */
document.getElementById('logoutBtn').addEventListener('click', async () => {
  await db.auth.signOut();
  window.location.href = 'index.html';
});

/* ══════════════════════════════════════════
   MESSAGES TAB
   ══════════════════════════════════════════ */
async function loadMessages() {
  const tbody = document.getElementById('messagesBody');
  tbody.innerHTML = `<tr><td colspan="6" class="table-loading"><i class="fas fa-circle-notch fa-spin"></i> Loading…</td></tr>`;

  const { data, error } = await db
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    tbody.innerHTML = `<tr><td colspan="6" class="table-error">Error: ${error.message}</td></tr>`;
    return;
  }

  const total  = data.length;
  const unread = data.filter((m) => !m.is_read).length;
  document.getElementById('totalMessages').textContent  = total;
  document.getElementById('unreadMessages').textContent = unread;
  document.getElementById('unreadCount').textContent    = unread || '';

  if (!total) {
    tbody.innerHTML = `<tr><td colspan="6" class="table-empty">No messages yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map((m) => `
    <tr class="${m.is_read ? '' : 'row-unread'}" data-id="${m.id}">
      <td class="td-name">${escHtml(m.name)}</td>
      <td><a href="mailto:${escHtml(m.email)}" class="td-email">${escHtml(m.email)}</a></td>
      <td class="td-msg">${escHtml(m.message)}</td>
      <td class="td-date">${formatDate(m.created_at)}</td>
      <td>
        <span class="status-pill ${m.is_read ? 'pill-read' : 'pill-unread'}">
          ${m.is_read ? 'Read' : 'Unread'}
        </span>
      </td>
      <td class="td-actions">
        ${!m.is_read ? `<button class="action-btn" data-action="read" data-id="${m.id}" title="Mark as read">
          <i class="fas fa-check"></i></button>` : ''}
        <button class="action-btn action-delete" data-action="delete" data-id="${m.id}" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    </tr>`).join('');

  // Delegate events
  document.getElementById('messagesBody').addEventListener('click', handleMessageAction);
}

async function handleMessageAction(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const { action, id } = btn.dataset;

  if (action === 'delete') {
    if (!confirm('Delete this message?')) return;
    const { error } = await db.from('contact_messages').delete().eq('id', id);
    if (!error) loadMessages();
    else alert('Delete failed: ' + error.message);
  }

  if (action === 'read') {
    const { error } = await db.from('contact_messages').update({ is_read: true }).eq('id', id);
    if (!error) loadMessages();
  }
}

document.getElementById('refreshMessages').addEventListener('click', loadMessages);
loadMessages();

/* ══════════════════════════════════════════
   PROJECTS TAB
   ══════════════════════════════════════════ */
const projectModal      = document.getElementById('projectModal');
const projectForm       = document.getElementById('projectForm');
const projectFormStatus = document.getElementById('projectFormStatus');
const modalTitle        = document.getElementById('modalTitle');

async function loadProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = `<div class="table-loading"><i class="fas fa-circle-notch fa-spin"></i> Loading…</div>`;

  const { data, error } = await db
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) { grid.innerHTML = `<div class="table-error">Error: ${error.message}</div>`; return; }
  if (!data.length) { grid.innerHTML = `<div class="table-empty">No projects yet. Add one!</div>`; return; }

  grid.innerHTML = data.map((p) => `
    <div class="project-admin-card glass-card" data-id="${p.id}">
      <div class="pac-img" style="${p.image_url ? `background-image:url('${p.image_url}')` : ''}">
        ${!p.image_url ? '<i class="fas fa-image"></i>' : ''}
        ${p.is_featured ? '<span class="pac-featured">Featured</span>' : ''}
      </div>
      <div class="pac-body">
        <h4>${escHtml(p.title)}</h4>
        <p>${escHtml(p.description)}</p>
        <div class="project-tags">${(p.tags || []).map((t) => `<span class="tag">${escHtml(t)}</span>`).join('')}</div>
      </div>
      <div class="pac-actions">
        <button class="action-btn" data-action="edit" data-id="${p.id}" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn action-delete" data-action="delete-project" data-id="${p.id}" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>`).join('');

  document.getElementById('projectsGrid').addEventListener('click', handleProjectAction);
}

async function handleProjectAction(e) {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const { action, id } = btn.dataset;

  if (action === 'delete-project') {
    if (!confirm('Delete this project?')) return;
    const { error } = await db.from('projects').delete().eq('id', id);
    if (!error) loadProjects();
    else alert('Delete failed: ' + error.message);
  }

  if (action === 'edit') {
    const { data } = await db.from('projects').select('*').eq('id', id).single();
    if (data) openProjectModal(data);
  }
}

function openProjectModal(project = null) {
  projectForm.reset();
  projectFormStatus.textContent = '';
  document.getElementById('projectId').value    = project?.id ?? '';
  document.getElementById('pTitle').value        = project?.title ?? '';
  document.getElementById('pDesc').value         = project?.description ?? '';
  document.getElementById('pTags').value         = (project?.tags ?? []).join(', ');
  document.getElementById('pLive').value         = project?.live_url ?? '';
  document.getElementById('pGithub').value       = project?.github_url ?? '';
  document.getElementById('pImage').value        = project?.image_url ?? '';
  document.getElementById('pOrder').value        = project?.sort_order ?? 0;
  document.getElementById('pFeatured').checked   = project?.is_featured ?? true;
  modalTitle.textContent = project ? 'Edit Project' : 'Add Project';
  projectModal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  projectModal.hidden = true;
  document.body.style.overflow = '';
}

document.getElementById('openAddProject').addEventListener('click', () => openProjectModal());
document.getElementById('closeModal').addEventListener('click', closeProjectModal);
document.getElementById('cancelModal').addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (e) => { if (e.target === projectModal) closeProjectModal(); });

projectForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const saveBtn = document.getElementById('saveProjectBtn');
  saveBtn.disabled = true;
  saveBtn.querySelector('span').textContent = 'Saving…';

  const id = document.getElementById('projectId').value;
  const payload = {
    title:       document.getElementById('pTitle').value.trim(),
    description: document.getElementById('pDesc').value.trim(),
    tags:        document.getElementById('pTags').value.split(',').map((t) => t.trim()).filter(Boolean),
    live_url:    document.getElementById('pLive').value.trim() || null,
    github_url:  document.getElementById('pGithub').value.trim() || null,
    image_url:   document.getElementById('pImage').value.trim() || null,
    sort_order:  parseInt(document.getElementById('pOrder').value, 10) || 0,
    is_featured: document.getElementById('pFeatured').checked,
  };

  const { error } = id
    ? await db.from('projects').update(payload).eq('id', id)
    : await db.from('projects').insert(payload);

  saveBtn.disabled = false;
  saveBtn.querySelector('span').textContent = 'Save Project';

  if (error) {
    projectFormStatus.textContent = 'Error: ' + error.message;
    projectFormStatus.className = 'form-status error';
    return;
  }

  closeProjectModal();
  loadProjects();
});

loadProjects();

/* ══════════════════════════════════════════
   UPLOAD TAB (Supabase Storage)
   ══════════════════════════════════════════ */
const imageFileInput = document.getElementById('imageFile');
const uploadArea     = document.getElementById('uploadArea');
const uploadPreview  = document.getElementById('uploadPreview');
const uploadStatus   = document.getElementById('uploadStatus');
const doUploadBtn    = document.getElementById('doUpload');
const uploadResult   = document.getElementById('uploadResult');
const uploadedUrlEl  = document.getElementById('uploadedUrl');
const copyUrlBtn     = document.getElementById('copyUrl');

let selectedFile = null;

imageFileInput.addEventListener('change', () => {
  selectedFile = imageFileInput.files[0];
  previewFile(selectedFile);
});

// Drag & drop
uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    selectedFile = file;
    previewFile(file);
  }
});

function previewFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadPreview.innerHTML = `<img src="${e.target.result}" alt="Preview" />`;
    uploadPreview.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
  doUploadBtn.disabled = false;
  uploadResult.classList.add('hidden');
  setUploadStatus('', '');
}

doUploadBtn.addEventListener('click', async () => {
  if (!selectedFile) return;

  const maxBytes = 5 * 1024 * 1024;
  if (selectedFile.size > maxBytes) {
    setUploadStatus('File exceeds 5 MB limit.', 'error');
    return;
  }

  doUploadBtn.disabled = true;
  doUploadBtn.querySelector('span').textContent = 'Uploading…';
  doUploadBtn.querySelector('i').className = 'fas fa-circle-notch fa-spin';
  setUploadStatus('', '');

  const ext      = selectedFile.name.split('.').pop();
  const fileName = `project-${Date.now()}.${ext}`;

  const { error } = await db.storage
    .from('project-images')
    .upload(fileName, selectedFile, { cacheControl: '3600', upsert: false });

  doUploadBtn.disabled = false;
  doUploadBtn.querySelector('span').textContent = 'Upload to Supabase Storage';
  doUploadBtn.querySelector('i').className = 'fas fa-upload';

  if (error) {
    setUploadStatus('Upload failed: ' + error.message, 'error');
    return;
  }

  const { data: { publicUrl } } = db.storage.from('project-images').getPublicUrl(fileName);
  uploadedUrlEl.value = publicUrl;
  uploadResult.classList.remove('hidden');
  setUploadStatus('✓ Uploaded successfully!', 'success');
});

copyUrlBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(uploadedUrlEl.value).then(() => {
    copyUrlBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => { copyUrlBtn.innerHTML = '<i class="fas fa-copy"></i> Copy'; }, 2000);
  });
});

function setUploadStatus(msg, type) {
  uploadStatus.textContent = msg;
  uploadStatus.className = `form-status ${type}`;
}

/* ──────────────────────────────────────────
   HELPERS
   ────────────────────────────────────────── */
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}
