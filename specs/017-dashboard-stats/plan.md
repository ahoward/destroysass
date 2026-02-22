# Plan: 017 — Enhanced Dashboard

## Files

| File | Action |
|------|--------|
| `app/dashboard/page.tsx` | modify — stats bar, enhanced sections, activity feed |

## Notes

- Fetch stats via aggregates on existing tables
- Activity feed: query recent pledges on user's ideas + recent comments on user's ideas
- No new tables or migrations
- Keep it server-rendered for simplicity
