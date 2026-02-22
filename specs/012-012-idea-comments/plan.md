# Plan: 012 — Idea Comments & Discussion

## Files

| File | Action |
|------|--------|
| `supabase/migrations/005_comments.sql` | create — comments table + RLS |
| `app/ideas/[id]/comments.tsx` | create — client component: comment list + form |
| `app/ideas/[id]/actions.ts` | modify — add postComment, deleteComment actions |
| `app/ideas/[id]/page.tsx` | modify — add comments section below pledge panel |

## Notes

- Display name = email prefix (before @) — fetched via service role from auth.users
- Comments fetched server-side, passed to client component
- Comment form is a client component with useTransition for optimistic UX
- Relative time display (e.g., "2 hours ago") — use simple helper, no date-fns
