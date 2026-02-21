-- migration: 001_initial_schema
-- applied: 2026-02-21

-- ideas table
create table if not exists ideas (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  problem     text not null,
  monthly_ask integer not null default 50,
  created_by  uuid references auth.users(id) on delete set null,
  status      text not null default 'proposed'
                check (status in ('proposed','gaining_traction','threshold_reached','cell_forming','active','cancelled')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- pledges table
create table if not exists pledges (
  id             uuid primary key default gen_random_uuid(),
  idea_id        uuid not null references ideas(id) on delete cascade,
  user_id        uuid not null references auth.users(id) on delete cascade,
  amount_monthly integer not null default 50,
  created_at     timestamptz not null default now(),
  unique (idea_id, user_id)
);

-- rls: ideas
alter table ideas enable row level security;
create policy "ideas_public_read"   on ideas for select using (true);
create policy "ideas_auth_insert"   on ideas for insert with check (auth.uid() = created_by);
create policy "ideas_owner_update"  on ideas for update using (auth.uid() = created_by);

-- rls: pledges
alter table pledges enable row level security;
create policy "pledges_public_read"   on pledges for select using (true);
create policy "pledges_auth_insert"   on pledges for insert with check (auth.uid() = user_id);
create policy "pledges_owner_delete"  on pledges for delete using (auth.uid() = user_id);

-- ranked board view
create or replace view idea_board as
select
  i.*,
  coalesce(sum(p.amount_monthly), 0) as total_pledged,
  count(p.id) as pledge_count
from ideas i
left join pledges p on p.idea_id = i.id
group by i.id
order by total_pledged desc, i.created_at desc;

-- seed data
insert into ideas (title, description, problem, monthly_ask, status) values
(
  'a slack replacement we actually own',
  'a hosted, maintained team messaging tool — channels, dms, threads, file sharing — that a cooperative of businesses collectively owns and controls. no vendor lock-in. no price increases. no tos changes we can''t fight.',
  'slack costs us $15/user/month and raised prices 30% last year. we have zero recourse when they change terms, break features, or go down for 6 hours.',
  150,
  'proposed'
),
(
  'a notion/confluence alternative with no vendor lock-in',
  'a self-hosted, collectively-maintained knowledge base and wiki tool. graph-based navigation, clean editor, full-text search, shared workspaces. all data is ours. always.',
  'notion has our entire company knowledge base and raised prices again. if they get acquired or go under, we lose everything.',
  100,
  'proposed'
),
(
  'a shared calendar + scheduling tool for small teams',
  'a simple, hosted team calendar with scheduling links, availability polling, and basic integrations. collectively owned and maintained by the businesses that use it.',
  'calendly costs us $20/seat/month for basically a form and a calendar. we want something clean we own.',
  75,
  'proposed'
)
on conflict do nothing;
