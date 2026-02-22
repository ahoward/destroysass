-- migration: 005_comments
-- applied: 2026-02-22

create table if not exists comments (
  id           uuid primary key default gen_random_uuid(),
  idea_id      uuid not null references ideas(id) on delete cascade,
  user_id      uuid not null references auth.users(id) on delete cascade,
  display_name text not null default '',
  body         text not null,
  created_at   timestamptz not null default now()
);

alter table comments enable row level security;
create policy "comments_public_read" on comments for select using (true);
create policy "comments_auth_insert" on comments for insert with check (auth.uid() = user_id);
create policy "comments_owner_delete" on comments for delete using (auth.uid() = user_id);
