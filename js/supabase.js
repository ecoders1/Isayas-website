/* ============================================
   SUPABASE CLIENT – supabase.js
   Reads config injected by env-config.js at
   runtime (or falls back to window globals).
   ============================================ */
'use strict';

// ---------------------------------------------------------------------------
// Replace the two constants below with your actual Supabase project values,
// OR keep them as-is and supply them via env-config.js (see instructions).
// ---------------------------------------------------------------------------
const SUPABASE_URL  = window.__ENV?.SUPABASE_URL  || 'https://your-project-id.supabase.co';
const SUPABASE_ANON = window.__ENV?.SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Load Supabase JS v2 from CDN (injected in HTML head)
// https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2
const { createClient } = window.supabase;

const db = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export { db, SUPABASE_URL };
