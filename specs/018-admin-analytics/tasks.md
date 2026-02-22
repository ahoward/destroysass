# Tasks: 018 — Admin Analytics

## Checklist

- [x] **T1** modify `app/admin/page.tsx`:
  - add analytics section at the TOP (before "ready to form" section)
  - platform overview: user count (service role → auth.users), idea count, total pledged, upvote count, comment count, dev cell counts by status
  - top 5 ideas by pledged amount (from idea_board)
  - top 5 ideas by upvote count (from idea_board)
  - growth: ideas + pledges this week vs last week (simple count comparison)
- [x] **T2** run `./dev/post_flight` — must pass
- [ ] **T3** commit + push + merge to main
- [ ] **T4** deploy: `vercel deploy --prod --yes`
- [ ] **T5** run `./dev/health` — must return ok

## Definition of Done

Admin page shows platform analytics at the top. Overview stats, top ideas, growth indicators.
