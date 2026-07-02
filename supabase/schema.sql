-- ============================================================
-- ISAYAS PORTFOLIO – Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ─── EXTENSIONS ──────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── TABLE: contact_messages ─────────────────────────────
create table if not exists public.contact_messages (
  id          uuid primary key default uuid_generate_v4(),
  name        text        not null check (char_length(name) <= 120),
  email       text        not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  message     text        not null check (char_length(message) <= 2000),
  is_read     boolean     not null default false,
  created_at  timestamptz not null default now()
);

-- Index for dashboard sorting
create index if not exists idx_messages_created
  on public.contact_messages (created_at desc);

-- ─── TABLE: projects ─────────────────────────────────────
create table if not exists public.projects (
  id           uuid primary key default uuid_generate_v4(),
  title        text        not null check (char_length(title) <= 120),
  description  text        not null check (char_length(description) <= 500),
  image_url    text,
  live_url     text,
  github_url   text,
  tags         text[]      not null default '{}',
  sort_order   integer     not null default 0,
  is_featured  boolean     not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_projects_updated_at on public.projects;

create trigger trg_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- ─── ROW LEVEL SECURITY ──────────────────────────────────

-- contact_messages: public can INSERT only; only authed admin can SELECT/DELETE
alter table public.contact_messages enable row level security;

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
  using (auth.role() = 'authenticated');

create policy "Admin can delete messages"
  on public.contact_messages for delete
  to authenticated
  using (auth.role() = 'authenticated');

create policy "Admin can mark messages read"
  on public.contact_messages for update
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- projects: public can SELECT featured; only authed admin can INSERT/UPDATE/DELETE
alter table public.projects enable row level security;

drop policy if exists "Anyone can view featured projects" on public.projects;
drop policy if exists "Admin can manage projects"         on public.projects;

create policy "Anyone can view featured projects"
  on public.projects for select
  to anon, authenticated
  using (is_featured = true);

create policy "Admin can manage projects"
  on public.projects for all
  to authenticated
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ─── STORAGE BUCKET: project-images ─────────────────────
-- Run this AFTER enabling Storage in your Supabase project.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-images',
  'project-images',
  true,
  5242880,  -- 5 MB
  array['image/jpeg','image/png','image/webp','image/gif']
)
on conflict (id) do nothing;

-- Storage policies
drop policy if exists "Public can view project images"  on storage.objects;
drop policy if exists "Admin can upload project images" on storage.objects;
drop policy if exists "Admin can delete project images" on storage.objects;

create policy "Public can view project images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'project-images');

create policy "Admin can upload project images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-images');

create policy "Admin can delete project images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-images');

-- ─── SEED: default projects ──────────────────────────────
insert into public.projects (title, description, tags, live_url, github_url, sort_order)
values
  (
    'E-Commerce Platform',
    'A fully functional online store with cart, authentication, and payment integration built for seamless shopping experiences.',
    array['PHP','MySQL','JavaScript','CSS'],
    '#', '#', 1
  ),
  (
    'Task Management App',
    'A real-time collaborative task manager with drag-and-drop, notifications, and team workspace features powered by Firebase.',
    array['Flutter','Firebase','Dart'],
    '#', '#', 2
  ),
  (
    'Developer Portfolio',
    'A lightning-fast personal portfolio with dark mode, smooth animations, and a contact form — built with HTML, CSS, and JavaScript.',
    array['HTML','CSS','JavaScript','Vercel'],
    '#', '#', 3
  )
on conflict do nothing;
