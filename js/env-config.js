/* ============================================================
   env-config.js
   Expose environment variables to the browser at runtime.
   ─────────────────────────────────────────────────────────
   Replace the placeholder strings below with your real values.
   This file IS safe to keep in source as long as you only
   put the public anon key here (NOT the service_role key).
   ============================================================ */
window.__ENV = {
  SUPABASE_URL:      'https://your-project-id.supabase.co',
  SUPABASE_ANON_KEY: 'your-supabase-anon-key',
};
