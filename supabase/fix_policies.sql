-- ============================================================
-- fix_policies.sql
-- Run this ONLY if messages are not visible in the admin.
-- Fixes RLS policies without touching tables or data.
-- ============================================================

-- contact_messages
drop policy if exists "Anyone can submit a message"  on public.contact_messages;
drop policy if exists "Admin can read messages"       on public.contact_messages;
drop policy if exists "Admin can delete messages"     on public.contact_messages;
drop policy if exists "Admin can mark messages read"  on public.contact_messages;

create policy "Anyone can submit a message"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

create policy "Admin can read messages"
  on public.contact_messages for select
  to authenticated
  using (auth.uid() is not null);

create policy "Admin can mark messages read"
  on public.contact_messages for update
  to authenticated
  using    (auth.uid() is not null)
  with check (auth.uid() is not null);

create policy "Admin can delete messages"
  on public.contact_messages for delete
  to authenticated
  using (auth.uid() is not null);

-- projects
drop policy if exists "Anyone can view featured projects" on public.projects;
drop policy if exists "Admin can manage projects"         on public.projects;

create policy "Anyone can view featured projects"
  on public.projects for select
  to anon, authenticated
  using (is_featured = true);

create policy "Admin can manage projects"
  on public.projects for all
  to authenticated
  using    (auth.uid() is not null)
  with check (auth.uid() is not null);

-- Done ✓
