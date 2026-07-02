/* ============================================
   SUPABASE CLIENT – supabase.js
   ============================================ */
'use strict';

const SUPABASE_URL  = 'https://tdnyfsuesbmgisfdzryz.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkbnlmc3Vlc2JtZ2lzZmR6cnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5NDkwNTIsImV4cCI6MjA5ODUyNTA1Mn0.GCr-ma4W4uzCVbLMhY35DHU-jCiK53sCKR8J0xlWL6I';

const { createClient } = window.supabase;

const db = createClient(SUPABASE_URL, SUPABASE_ANON, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export { db, SUPABASE_URL };
