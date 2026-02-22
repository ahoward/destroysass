# Plan: 006 — Cell Formation (Admin + Auto Status)

## Files

| File | Action |
|------|--------|
| `app/admin/page.tsx` | create — admin dashboard with auth check |
| `app/admin/actions.ts` | create — triggerCellFormation server action |
| `supabase/migrations/002_pledge_trigger.sql` | create — DB function + trigger for auto status |

## DB Migration

Apply via Supabase Management API (same pattern as 001). The trigger fires on pledge INSERT/DELETE
and auto-updates idea status based on total pledge sum. Uses `security definer` so it has access
to run across RLS.

## Admin Auth

Hardcoded allowlist in env or constant: `['ara.t.howard@gmail.com']`. No new tables.
Return `notFound()` immediately if user email not in list.

## Status Color Map Update

`gaining_traction` → yellow, `threshold_reached` → green, `cell_forming` → purple.
Update the STATUS_COLORS map in `app/ideas/page.tsx` and `app/ideas/[id]/page.tsx`.
