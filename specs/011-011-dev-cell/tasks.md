# Tasks: 011 — Dev Cell Profiles & Applications

## Checklist

- [x] **T1** write `supabase/migrations/004_dev_cells.sql` — table + RLS policies
- [x] **T2** apply migration via Supabase Management API
- [x] **T3** create `app/dev-cells/page.tsx`
- [x] **T4** create `app/dev-cells/apply/page.tsx`
- [x] **T5** create `app/dev-cells/apply/actions.ts`
- [x] **T6** modify `app/admin/page.tsx` — add dev cell applications section
- [x] **T7** modify `app/admin/actions.ts` — approveDevCell + rejectDevCell
- [x] **T8** add "dev cells" link to nav across the app
- [x] **T9** run `./dev/post_flight` — must pass
- [ ] **T10** commit + push + merge to main
- [ ] **T11** deploy: `vercel deploy --prod --yes`
- [ ] **T12** run `./dev/health` — must return ok

## Definition of Done

/dev-cells shows approved cells. /dev-cells/apply works for authenticated users.
Admin can approve/reject from /admin. Duplicate pending apps prevented.
