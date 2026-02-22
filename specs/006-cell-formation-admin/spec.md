# Feature Spec: 006 — Cell Formation (Admin Trigger + Status Transitions)

## Summary

Build a simple admin panel at `/admin` that shows ideas at or above the pledge threshold
($1,000/mo by default) and allows an admin to trigger cell formation. This advances the idea
status to `cell_forming` and marks it as "closed for new pledges."

Also: automatic status progression — when total_pledged hits $1,000, idea status auto-upgrades
from `proposed` → `gaining_traction` → `threshold_reached` via a database function.

## Admin Auth

Simple: check if `user.email` is in a hardcoded admin list (just `ara.t.howard@gmail.com` for now).
If not admin: return 404 (don't even reveal the page exists).

## Routes

- `app/admin/page.tsx` — admin dashboard
- `app/admin/actions.ts` — triggerCellFormation server action

## Database: Auto Status Progression

Add a Postgres function + trigger that automatically updates idea status based on total_pledged:

```sql
-- function to update idea status based on pledge total
create or replace function update_idea_status()
returns trigger as $$
declare
  total integer;
begin
  select coalesce(sum(amount_monthly), 0) into total
  from pledges where idea_id = NEW.idea_id;

  update ideas set
    status = case
      when total >= 1000 then 'threshold_reached'
      when total >= 300  then 'gaining_traction'
      else 'proposed'
    end,
    updated_at = now()
  where id = NEW.idea_id
    and status not in ('cell_forming', 'active', 'cancelled');

  return NEW;
end;
$$ language plpgsql security definer;

-- trigger fires after every pledge insert or delete
create trigger pledge_status_trigger
after insert or delete on pledges
for each row execute function update_idea_status();
```

## Admin Page (`/admin`)

Shows two sections:

### 1. Ready to Form (threshold_reached)
Ideas with status = `threshold_reached`. For each:
- Title, total pledged, pledge count, created date
- "Trigger Cell Formation →" button

### 2. All Ideas (status overview)
Quick table of all ideas: title, status, total_pledged, pledge_count.
Useful for monitoring.

## Server Action: triggerCellFormation(ideaId)

1. Admin auth check (email in allowlist)
2. Fetch idea — verify status is `threshold_reached`
3. Update status to `cell_forming`
4. Update `updated_at`
5. revalidatePath("/ideas"), revalidatePath("/admin"), revalidatePath(`/ideas/${ideaId}`)
6. Return success

## Status Badge Updates

Update all status badge color maps across the app to include `cell_forming` with a distinct color
(blue/purple — "something exciting is happening").

## Acceptance Criteria

- [ ] Pledge trigger: adding a pledge that pushes total ≥ $300 changes status to `gaining_traction`
- [ ] Pledge trigger: adding a pledge that pushes total ≥ $1,000 changes status to `threshold_reached`
- [ ] `/admin` returns 404 for non-admin users
- [ ] `/admin` shows ideas at threshold with "Trigger" button
- [ ] triggerCellFormation changes status to `cell_forming`
- [ ] Idea board and detail page reflect new status immediately
- [ ] `./dev/health` returns ok
