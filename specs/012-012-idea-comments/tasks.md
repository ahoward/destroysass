# Tasks: 012 — Idea Comments & Discussion

## Checklist

- [x] **T1** write `supabase/migrations/005_comments.sql` — comments table + RLS
- [x] **T2** apply migration via Management API
- [x] **T3** add `postComment(ideaId, body)` to `app/ideas/[id]/actions.ts`
- [x] **T4** add `deleteComment(commentId)` to `app/ideas/[id]/actions.ts`
- [x] **T5** create `app/ideas/[id]/comments.tsx` — client component
- [x] **T6** modify `app/ideas/[id]/page.tsx` — fetch + render comments
- [x] **T7** run `./dev/post_flight` — must pass
- [ ] **T8** commit + push + merge to main
- [ ] **T9** deploy: `vercel deploy --prod --yes`
- [ ] **T10** run `./dev/health` — must return ok

## Notes

- For display names: query comments joined with a way to get user emails
  - Option A: use service role client to query auth.users for each user_id
  - Option B: store display_name in comments table at insert time (simpler, denormalized)
  - Prefer Option B: store email prefix as `display_name` column at insert time

## Definition of Done

Comments display on idea pages. Auth users can post and delete their own.
Non-auth users see sign-in prompt. Clean dark-themed display.
