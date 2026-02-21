# Feature Spec: 002 — Idea Board (List Page + Database Schema)

## Summary

Create the `ideas` database table in Supabase and a public `/ideas` page that displays
submitted software concepts ranked by total pledged amount.

## Database Schema

### ideas table

```sql
create table ideas (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  problem     text not null,
  monthly_ask integer not null default 50,  -- what submitter would pay/mo (USD)
  created_by  uuid references auth.users(id) on delete set null,
  status      text not null default 'proposed'
                check (status in ('proposed', 'gaining_traction', 'threshold_reached', 'cell_forming', 'active', 'cancelled')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
```

### pledges table

```sql
create table pledges (
  id             uuid primary key default gen_random_uuid(),
  idea_id        uuid not null references ideas(id) on delete cascade,
  user_id        uuid not null references auth.users(id) on delete cascade,
  amount_monthly integer not null default 50,  -- USD per month
  created_at     timestamptz not null default now(),
  unique (idea_id, user_id)  -- one pledge per user per idea
);
```

### RLS policies

```sql
-- ideas: public read, auth write
alter table ideas enable row level security;
create policy "ideas are publicly readable"
  on ideas for select using (true);
create policy "authenticated users can insert ideas"
  on ideas for insert with check (auth.uid() = created_by);
create policy "idea owners can update their own ideas"
  on ideas for update using (auth.uid() = created_by);

-- pledges: public read (counts), auth write
alter table pledges enable row level security;
create policy "pledges are publicly readable"
  on pledges for select using (true);
create policy "authenticated users can pledge"
  on pledges for insert with check (auth.uid() = user_id);
create policy "users can delete their own pledges"
  on pledges for delete using (auth.uid() = user_id);
```

### View for sorted board

```sql
create or replace view idea_board as
select
  i.*,
  coalesce(sum(p.amount_monthly), 0) as total_pledged,
  count(p.id) as pledge_count
from ideas i
left join pledges p on p.idea_id = i.id
group by i.id
order by total_pledged desc, i.created_at desc;
```

## Seed Data

Insert 3 seed ideas so the board isn't empty on first load:

1. "a slack replacement we actually own" — $150/mo ask
2. "a notion/confluence alternative with no vendor lock-in" — $100/mo ask
3. "a shared calendar + scheduling tool for small teams" — $75/mo ask

## `/ideas` Page

### Route: `app/ideas/page.tsx`

Server component. Fetches from `idea_board` view via Supabase server client.

### Layout

- Same nav as homepage (reuse the nav pattern — auth state)
- Page title: "the board"
- Subtitle: "ranked by committed monthly dollars. skin in the game is the only algorithm."
- List of idea cards (see below)
- Empty state if no ideas

### Idea Card

Each card shows:
- Title (large, bold)
- Problem statement (truncated to 2 lines)
- Monthly ask badge: "submitter pays $X/mo"
- Total pledged: large number, red accent — "$Y/mo pledged"
- Pledge count: "N sponsors"
- Status badge (proposed / gaining_traction / threshold_reached / etc.)
- "pledge →" link (links to `/ideas/[id]` — placeholder for now)

### Sort

Default: `total_pledged DESC`, then `created_at DESC`

### Empty State

If no ideas: show "no ideas yet. be the first." with a link to `/ideas/new`.

## Nav on `/ideas`

Same pattern as homepage: reuse the nav component logic. Since we can't extract to a shared
component without adding complexity, just duplicate the nav markup from `app/page.tsx` for now.

## Technical Requirements

- New file: `app/ideas/page.tsx`
- No new npm dependencies
- Supabase queries use server client (`lib/supabase/server.ts`)
- SQL migration needs to be applied to Supabase project `bjaejvgoifgdanwvglnv` manually
  (see migration file at `supabase/migrations/001_initial_schema.sql`)
- Landing page "browse existing ideas" link (`/ideas`) should now work
- Mobile responsive

## Out of Scope

- Idea detail page (`/ideas/[id]`)
- Actual pledge form
- Idea submission form

## Acceptance Criteria

- [ ] `ideas` and `pledges` tables exist in Supabase with correct schema
- [ ] RLS policies applied (public read, auth write)
- [ ] `idea_board` view exists and returns correct ranked data
- [ ] Seed data inserted (3 ideas)
- [ ] `/ideas` page loads with 200
- [ ] Page shows idea cards sorted by total_pledged
- [ ] Empty state works if no ideas
- [ ] Nav shows correct auth state
- [ ] Landing page "browse existing ideas" link navigates to `/ideas` correctly
- [ ] `./dev/health` returns ok
