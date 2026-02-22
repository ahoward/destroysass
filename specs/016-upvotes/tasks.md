# Tasks: 016 — Idea Upvotes

## Checklist

- [ ] **T1** write `supabase/migrations/007_upvotes.sql` — table + RLS + updated view
- [ ] **T2** apply migration via Management API
- [ ] **T3** add `toggleUpvote(ideaId)` to `app/ideas/[id]/actions.ts`:
  - auth check
  - check if upvote exists for this user+idea
  - if exists: delete it; if not: insert it
  - revalidatePath
- [ ] **T4** create `app/ideas/[id]/upvote_button.tsx`:
  - receives: ideaId, upvoteCount, userHasUpvoted (boolean)
  - renders: "▲ {count}" button
  - active state when user has upvoted (filled/colored)
  - calls toggleUpvote on click
  - useTransition for non-blocking
- [ ] **T5** modify `app/ideas/[id]/page.tsx`:
  - fetch user's upvote status (if authenticated)
  - fetch upvote_count from idea_board view
  - render UpvoteButton
- [ ] **T6** modify `app/ideas/ideas_filter.tsx`:
  - add `upvote_count` to IdeaRow type
  - add "most upvoted" to SORT_OPTIONS
  - show "▲ {n}" on each idea card in the meta row
- [ ] **T7** run `./dev/post_flight` — must pass
- [ ] **T8** commit + push + merge to main
- [ ] **T9** deploy: `vercel deploy --prod --yes`
- [ ] **T10** run `./dev/health` — must return ok

## Definition of Done

Upvote button works on idea detail. Count shows on cards. Toggle behavior correct.
"Most upvoted" sort option in ideas filter.
