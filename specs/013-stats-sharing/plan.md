# Plan: 013 — Public Stats & Social Sharing

## Files

| File | Action |
|------|--------|
| `app/page.tsx` | modify — fetch idea_board aggregate stats, display 3-number bar |
| `app/ideas/[id]/share_buttons.tsx` | create — client component: Twitter, LinkedIn, copy link |
| `app/ideas/[id]/page.tsx` | modify — add ShareButtons below idea description |

## Notes

- Stats: use supabase aggregate query on idea_board view
- No new tables or migrations needed
- Share buttons are pure client-side (no server actions)
- Copy link uses navigator.clipboard.writeText with fallback
