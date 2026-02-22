# Tasks: 017 — Enhanced Dashboard

## Checklist

- [x] **T1** modify `app/dashboard/page.tsx`:
  - add stats bar: total monthly pledges, ideas submitted, ideas pledged to, upvotes received
  - enhance "my ideas" section: add upvote_count, comment count, progress bar
  - enhance "my pledges" section: show total monthly commitment
  - fetch upvote counts from idea_board view (upvote_count column)
  - fetch comment counts: `select idea_id, count(*) from comments group by idea_id`
- [x] **T2** add activity feed section:
  - query recent pledges on user's ideas (last 20)
  - query recent comments on user's ideas (last 20)
  - merge and sort by created_at desc
  - display: relative time + description ("someone pledged $50/mo to 'title'")
  - use service role client to get commenter display names if needed
- [x] **T3** run `./dev/post_flight` — must pass
- [x] **T4** commit + push + merge to main
- [x] **T5** deploy: `vercel deploy --prod --yes`
- [x] **T6** run `./dev/health` — must return ok

## Definition of Done

Dashboard shows personal stats, enhanced idea/pledge sections with progress bars,
and an activity feed of recent events on user's ideas.
