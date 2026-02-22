-- upvotes table
create table if not exists upvotes (
  id         uuid primary key default gen_random_uuid(),
  idea_id    uuid not null references ideas(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (idea_id, user_id)
);

alter table upvotes enable row level security;
create policy "upvotes_public_read" on upvotes for select using (true);
create policy "upvotes_auth_insert" on upvotes for insert with check (auth.uid() = user_id);
create policy "upvotes_owner_delete" on upvotes for delete using (auth.uid() = user_id);

-- recreate idea_board view to include upvote_count
-- (drop required because column list changed since original creation)
drop view if exists idea_board;
create view idea_board as
select
  i.*,
  coalesce(sum(p.amount_monthly), 0) as total_pledged,
  count(distinct p.id) as pledge_count,
  count(distinct u.id) as upvote_count
from ideas i
left join pledges p on p.idea_id = i.id
left join upvotes u on u.idea_id = i.id
group by i.id
order by total_pledged desc, i.created_at desc;
