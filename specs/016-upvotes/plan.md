# Plan: 016 — Idea Upvotes

## Files

| File | Action |
|------|--------|
| `supabase/migrations/007_upvotes.sql` | create — upvotes table + RLS + updated view |
| `app/ideas/[id]/upvote_button.tsx` | create — client component: toggle upvote |
| `app/ideas/[id]/actions.ts` | modify — add toggleUpvote action |
| `app/ideas/[id]/page.tsx` | modify — add upvote button + count |
| `app/ideas/ideas_filter.tsx` | modify — add upvote_count to type, add "most upvoted" sort |

## Migration

Apply via Management API with SUPABASE_ACCESS_TOKEN=sbp_7053248c464aee5969ede7606a8ec1e45fd5339f

## Notes

- Toggle: if upvote exists, delete it; if not, insert it
- idea_board view must be replaced (CREATE OR REPLACE) to include upvote_count
- Upvote button is a client component with useTransition
