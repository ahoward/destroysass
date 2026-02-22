# Tasks: 013 — Public Stats & Social Sharing

## Checklist

- [ ] **T1** modify `app/page.tsx`:
  - fetch from idea_board: count of ideas, sum of total_pledged, count of distinct pledgers
  - for pledger count: query pledges table `select count(distinct user_id)`
  - display 3 stats in a row above the CTA section
  - style: big numbers, red-600, with labels below
- [ ] **T2** create `app/ideas/[id]/share_buttons.tsx` — client component:
  - "Share on X" button → window.open Twitter intent
  - "Share on LinkedIn" button → window.open LinkedIn share
  - "Copy link" button → navigator.clipboard.writeText, show "copied!" for 2s
  - small, inline buttons with subtle styling
- [ ] **T3** modify `app/ideas/[id]/page.tsx`:
  - import ShareButtons
  - add below idea description, above pledge summary bar
  - pass idea title and full URL (construct from env or hardcode destroysass.vercel.app)
- [ ] **T4** run `./dev/post_flight` — must pass
- [ ] **T5** commit + push + merge to main
- [ ] **T6** deploy: `vercel deploy --prod --yes`
- [ ] **T7** run `./dev/health` — must return ok

## Definition of Done

Landing page shows live platform stats. Idea pages have working share buttons.
