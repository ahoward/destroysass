# Tasks: 006 — Cell Formation Admin + Auto Status

## Checklist

- [ ] **T1** write `supabase/migrations/002_pledge_trigger.sql` — the status update function + trigger
- [ ] **T2** write migration to `supabase/migrations/002_pledge_trigger.sql` — NOTE: cannot apply now (no service role key / dashboard JWT). Leave a clear comment in the file that it must be applied manually.
- [ ] **T3** create `app/admin/actions.ts` — `triggerCellFormation(ideaId)`:
  - admin email check (allowlist: ara.t.howard@gmail.com), return error if not admin
  - verify idea status is `threshold_reached`, return error otherwise
  - use createClient from @supabase/supabase-js (not SSR) with SUPABASE_SERVICE_ROLE_KEY env var to bypass RLS — `process.env.SUPABASE_SERVICE_ROLE_KEY || ''`
  - update ideas set status = 'cell_forming' where id = ideaId
  - revalidatePath for /ideas, /admin, /ideas/[ideaId]
  - NOTE: SUPABASE_SERVICE_ROLE_KEY must be added to .envrc and Vercel env vars manually
- [ ] **T4** create `app/admin/page.tsx`:
  - admin email check — notFound() if not admin
  - fetch all ideas from idea_board view ordered by total_pledged desc
  - section 1: "ready to form" — ideas where status = threshold_reached
  - section 2: "all ideas" — full table of every idea with status + pledges
  - "trigger cell formation" button for each threshold_reached idea
- [ ] **T5** update STATUS_COLORS in app/ideas/page.tsx and app/ideas/[id]/page.tsx:
  - gaining_traction: yellow-600 / yellow-800
  - threshold_reached: green-500 / green-700
  - cell_forming: purple-400 / purple-600
- [ ] **T6** run `./dev/post_flight` — must pass
- [ ] **T7** commit + push + merge to main
- [ ] **T8** deploy: `vercel deploy --prod --yes`
- [ ] **T9** run `./dev/health` — must return ok

## Definition of Done

DB trigger live. /admin accessible only to ara.t.howard@gmail.com. Trigger cell button works.
Status badges use correct colors throughout app.
