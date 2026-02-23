-- migration: 009_groups
-- applied: 2026-02-22
-- description: groups and group_members tables for role-based access control

-- groups table
create table groups (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz default now()
);

alter table groups enable row level security;

-- anyone can see group names
create policy "public_read" on groups
  for select using (true);

-- group_members junction table
create table group_members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz default now(),
  unique(group_id, user_id)
);

alter table group_members enable row level security;

-- users can read their own memberships
create policy "own_memberships" on group_members
  for select using (auth.uid() = user_id);

-- seed sudo and admin groups
insert into groups (name, description) values
  ('sudo', 'root-level access — can do everything'),
  ('admin', 'platform administration');
