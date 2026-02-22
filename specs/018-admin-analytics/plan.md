# Plan: 018 — Admin Analytics

## Files

| File | Action |
|------|--------|
| `app/admin/page.tsx` | modify — add analytics section |

## Notes

- Service role client for user count from auth.users
- Aggregate queries on ideas, pledges, upvotes, comments, dev_cells
- No new tables or migrations
- Week comparison: filter by created_at >= now() - interval '7 days' vs previous 7 days
