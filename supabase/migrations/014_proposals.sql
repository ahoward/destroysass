-- migration: 014_proposals
-- description: supporting materials, cell proposals, and sponsor preferences

-- Supporting materials (text content per idea, editable by creator)
create table if not exists idea_materials (
  id         uuid primary key default gen_random_uuid(),
  idea_id    uuid not null references ideas(id) on delete cascade,
  body       text not null default '',
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(idea_id)
);

alter table idea_materials enable row level security;
create policy "idea_materials_public_read" on idea_materials for select using (true);
create policy "idea_materials_creator_insert" on idea_materials for insert
  with check (created_by = auth.uid());
create policy "idea_materials_creator_update" on idea_materials for update
  using (created_by = auth.uid());

-- File attachments for materials
create table if not exists idea_attachments (
  id          uuid primary key default gen_random_uuid(),
  idea_id     uuid not null references ideas(id) on delete cascade,
  file_name   text not null,
  file_path   text not null,
  file_size   integer not null,
  mime_type   text not null,
  uploaded_by uuid not null references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now()
);

alter table idea_attachments enable row level security;
create policy "idea_attachments_public_read" on idea_attachments for select using (true);
create policy "idea_attachments_creator_insert" on idea_attachments for insert
  with check (uploaded_by = auth.uid());
create policy "idea_attachments_creator_delete" on idea_attachments for delete
  using (uploaded_by = auth.uid());

-- Cell proposals
create table if not exists proposals (
  id           uuid primary key default gen_random_uuid(),
  idea_id      uuid not null references ideas(id) on delete cascade,
  cell_id      uuid not null references cells(id) on delete cascade,
  title        text not null,
  body         text not null,
  submitted_by uuid not null references auth.users(id) on delete cascade,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique(idea_id, cell_id)
);

alter table proposals enable row level security;
create policy "proposals_public_read" on proposals for select using (true);
create policy "proposals_cell_member_insert" on proposals for insert
  with check (submitted_by = auth.uid());
create policy "proposals_cell_member_update" on proposals for update
  using (submitted_by = auth.uid());
create policy "proposals_cell_member_delete" on proposals for delete
  using (submitted_by = auth.uid());

-- Sponsor preferences (one per user per idea)
create table if not exists proposal_preferences (
  id          uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references proposals(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  idea_id     uuid not null references ideas(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique(user_id, idea_id)
);

alter table proposal_preferences enable row level security;
create policy "proposal_preferences_public_read" on proposal_preferences for select using (true);
create policy "proposal_preferences_sponsor_insert" on proposal_preferences for insert
  with check (user_id = auth.uid());
create policy "proposal_preferences_sponsor_delete" on proposal_preferences for delete
  using (user_id = auth.uid());
