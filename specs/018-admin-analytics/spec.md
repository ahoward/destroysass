# Feature Spec: 018 — Admin Analytics Dashboard

## Summary

Enhance the admin panel with platform-wide analytics: growth metrics, top ideas,
pledge trends, user engagement stats. Give the admin a bird's-eye view of platform health.

## Admin Analytics Section (in `/admin`)

### Platform Overview
- Total users (count from auth.users via service role)
- Total ideas submitted
- Total monthly pledged (sum across all ideas)
- Total upvotes
- Total comments
- Dev cells: approved / pending / rejected counts

### Top Ideas
- Top 5 ideas by pledged amount
- Top 5 ideas by upvote count
- Recently active ideas (most recent comments/pledges)

### Growth Indicators
- Ideas submitted this week vs last week
- Pledges this week vs last week
- New users this week (if available from auth.users created_at)

## Files

| File | Action |
|------|--------|
| `app/admin/page.tsx` | modify — add analytics section at top |
| `app/admin/actions.ts` | modify — add getAnalytics server function if needed |

## Notes

- Use service role client for auth.users count
- All other data from public tables/views
- Keep it simple — numbers + simple lists, no charts

## Acceptance Criteria

- [ ] Admin page shows platform overview stats
- [ ] Top ideas by pledges and upvotes shown
- [ ] Growth indicators present
- [ ] `./dev/health` returns ok
