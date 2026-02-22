# Feature Spec: 016 — Idea Upvotes

## Summary

Add a lightweight upvote mechanic to ideas. Unlike pledges (which are monetary
commitments), upvotes are free signals of interest. "I want this to exist."
This helps ideas gain visibility before they attract pledges.

## Database

```sql
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
```

Update idea_board view to include upvote_count:
```sql
create or replace view idea_board as
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
```

## Changes

### Idea Detail (`/ideas/[id]`)
- Upvote button: "▲ {count}" — toggle (click to upvote, click again to remove)
- Show upvote count next to pledge count
- Creator cannot upvote own idea (or maybe they can — keep it simple, allow it)

### Idea Board (`/ideas`)
- Show upvote count on each card (small "▲ {n}" next to sponsors count)
- Add "most upvoted" sort option to IdeasFilter

### Server Actions
- `upvoteIdea(ideaId)` — insert upvote (or remove if already upvoted = toggle)
- Auth required

## Acceptance Criteria

- [ ] Upvote button on idea detail page
- [ ] Upvote count on idea cards
- [ ] Toggle behavior (upvote/un-upvote)
- [ ] "most upvoted" sort option
- [ ] `./dev/health` returns ok
