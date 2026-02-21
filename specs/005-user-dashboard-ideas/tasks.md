# Tasks: 005 — User Dashboard

## Security/Logic Fixes (from Gemini review)

- [x] **S1** update `unpledgeIdea` in app/ideas/[id]/actions.ts: add `revalidatePath("/dashboard")`
- [x] **S2** update `unpledgeIdea`: reject withdrawal if idea status is `threshold_reached`, `cell_forming`, or `active`
- [x] **S3** monthly total: only sum pledges where idea status is NOT `cancelled`
- [x] **S4** withdraw button: show inline error if action returns error (don't fail silently)
- [x] **S5** join pledges with `idea_board` view (not `ideas` table) to get total_pledged per idea

## Checklist

- [x] **T1** create `app/dashboard/page.tsx`:
  - auth gate: redirect to /auth?next=/dashboard if no user
  - fetch user's ideas from idea_board view (where created_by = user.id)
  - fetch user's pledges joined with idea title and total_pledged
  - compute monthly total commitment (sum of user's pledge amounts)
  - render: nav, header (email), "my ideas" section, "my pledges" section
- [x] **T2** "my ideas" section:
  - table/list of submitted ideas with: title (links to /ideas/[id]), status badge, total pledged, pledge count
  - empty state: "haven't submitted any ideas yet. submit one →"
- [x] **T3** "my pledges" section:
  - list of pledged ideas with: title, "you pledged $X/mo", total from all sponsors, withdraw button
  - withdraw button calls unpledgeIdea from app/ideas/[id]/actions.ts
  - monthly commitment total at top
  - empty state: "haven't pledged to anything yet. browse the board →"
- [x] **T4** add "dashboard" nav link when user is authenticated:
  - update nav in app/page.tsx
  - update nav in app/ideas/page.tsx
  - update nav in app/ideas/[id]/page.tsx
  - update nav in app/ideas/new/page.tsx
- [x] **T5** run `./dev/post_flight` — must pass
- [x] **T6** commit + push to 005-user-dashboard-ideas
- [x] **T7** merge to main + push
- [x] **T8** deploy: `vercel deploy --prod --yes`
- [x] **T9** run `./dev/health` — must return ok

## Definition of Done

/dashboard loads for auth users. Shows their ideas and pledges. Withdraw works. Nav link present.
