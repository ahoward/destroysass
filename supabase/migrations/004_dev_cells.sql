-- migration: 004_dev_cells
-- applied: 2026-02-22

create table if not exists dev_cells (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  description   text not null,
  website       text,
  skills        text[] not null default '{}',
  contact_email text not null,
  status        text not null default 'pending'
                  check (status in ('pending', 'approved', 'rejected')),
  applied_by    uuid references auth.users(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- RLS
alter table dev_cells enable row level security;
create policy "dev_cells_public_read" on dev_cells for select using (status = 'approved');
create policy "dev_cells_auth_insert" on dev_cells for insert with check (auth.uid() = applied_by);
