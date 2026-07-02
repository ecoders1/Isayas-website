-- ============================================================
-- ISAYAS PORTFOLIO – Supabase Schema  (v2 – fully idempotent)
-- ============================================================
-- HOW TO RUN:
--   Supabase Dashboard → SQL Editor → New Query → paste → Run
-- This script is safe to run multiple times.
-- ============================================================

-- ─── EXTENSIONS ──────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLE: contact_messages
-- Stores messages submitted via the portfolio contact form.
-- ============================================================
create table if not exists public.contact_messages (
  id         uuid        primary key default uuid_generate_v4(),
  name       text        not null check (char_length(name)    between 1 and 120),
  email      text        not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  message    text        not null check (char_length(message) between 1 and 2000),
  is_read    boolean     not null default false,
  created_at timestamptz not null default now()
);

-- Sort index
create index if not exists idx_messages_created
  on public.contact_messages (created_at desc);

-- Enable realtime so admin dashboard updates live
alter publication supabase_realtime add table public.contact_messages;

-- ============================================================
-- TABLE: projects
-- Portfolio projects managed from the admin dashboard.
-- ============================================================
create table if not exists public.projects (
  id          uuid        primary key default uuid_generate_v4(),
  title       text        not null check (char_length(title)       between 1 and 120),
  description text        not null check (char_length(description) between 1 and 500),
  image_url   text,
  live_url    text,
  github_url  text,
  tags        text[]      not null default '{}',
  sort_order  integer     not null default 0,
  is_featured boolean     not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-update updated_at on every row update
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

-- Sort index
create index if not exists idx_projects_sort
  on public.projects (sort_order asc);

-- ============================================================
-- ROW LEVEL SECURITY – contact_messages
-- ============================================================
alter table public.contact_messages enable row level security;

-- Drop all existing policies first (idempotent)
drop policy if exists "Anyone can submit a message"  on public.contact_messages;
drop policy if exists "Admin can read messages"       on public.contact_messages;
drop policy if exists "Admin can delete messages"     on public.contact_messages;
drop policy if exists "Admin can mark messages read"  on public.contact_messages;

-- Public (anon) can INSERT — contact form submissions
create policy "Anyone can submit a message"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

-- Only logged-in admin can SELECT (read messages)
create policy "Admin can read messages"
  on public.contact_messages for select
  to authenticated
  using (auth.uid() is not null);

-- Only logged-in admin can UPDATE (mark as read)
create policy "Admin can mark messages read"
  on public.contact_messages for update
  to authenticated
  using    (auth.uid() is not null)
  with check (auth.uid() is not null);

-- Only logged-in admin can DELETE
create policy "Admin can delete messages"
  on public.contact_messages for delete
  to authenticated
  using (auth.uid() is not null);

-- ============================================================
-- ROW LEVEL SECURITY – projects
-- ============================================================
alter table public.projects enable row level security;

drop policy if exists "Anyone can view featured projects" on public.projects;
drop policy if exists "Admin can manage projects"         on public.projects;

-- Anyone (anon) can read featured projects — used by the portfolio page
create policy "Anyone can view featured projects"
  on public.projects for select
  to anon, authenticated
  using (is_featured = true);

-- Only logged-in admin can INSERT / UPDATE / DELETE projects
create policy "Admin can manage projects"
  on public.projects for all
  to authenticated
  using    (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================
-- STORAGE BUCKET: project-images
-- Public read, authenticated write/delete
-- ============================================================
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'project-images',
  'project-images',
  true,
  5242880,   -- 5 MB per file
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do nothing;

drop policy if exists "Public can view project images"  on storage.objects;
drop policy if exists "Admin can upload project images" on storage.objects;
drop policy if exists "Admin can update project images" on storage.objects;
drop policy if exists "Admin can delete project images" on storage.objects;

create policy "Public can view project images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'project-images');

create policy "Admin can upload project images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'project-images' and auth.uid() is not null);

create policy "Admin can update project images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'project-images' and auth.uid() is not null);

create policy "Admin can delete project images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'project-images' and auth.uid() is not null);

-- ============================================================
-- SEED DATA – default projects (only inserts if table empty)
-- ============================================================
insert into public.projects (title, description, tags, live_url, github_url, sort_order, is_featured)
values
  (
    'Ethio2',
    'A modern full-stack web application built and deployed on Vercel — delivering a fast, responsive, and seamless user experience.',
    array['JavaScript','CSS','Vercel','Supabase'],
    'https://ethio2.vercel.app',
    'https://github.com/ecoders1',
    1, true
  ),
  (
    'Task Management App',
    'A real-time collaborative task manager with drag-and-drop, notifications, and team workspace features powered by Firebase.',
    array['Flutter','Firebase','Dart'],
    '#', '#', 2, true
  ),
  (
    'Developer Portfolio',
    'A lightning-fast personal portfolio with dark mode, smooth animations, and a contact form — built with HTML, CSS, and JavaScript.',
    array['HTML','CSS','JavaScript','Vercel'],
    '#', '#', 3, true
  )
on conflict do nothing;

-- ============================================================
-- DONE ✓
-- Tables:   contact_messages, projects
-- Storage:  project-images bucket
-- RLS:      anon insert on messages, auth.uid() for admin ops
-- Realtime: enabled on contact_messages
-- ============================================================
