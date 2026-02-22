# Feature Spec: 013 — Public Stats & Social Sharing

## Summary

Add a public stats section to the landing page showing platform traction
(total ideas, total pledged, total sponsors). Add social sharing buttons
to idea detail pages so users can share ideas on Twitter/LinkedIn.

## Stats Section (landing page)

Add a stats bar above the CTA on the landing page:
- Total ideas submitted
- Total monthly $ pledged across all ideas
- Total unique sponsors (pledgers)

Fetch from idea_board view server-side. Display as 3 big numbers in a row.

## Social Sharing (idea detail page)

Add share buttons to /ideas/[id]:
- "Share on X" — opens Twitter intent with idea title + URL
- "Share on LinkedIn" — opens LinkedIn share with idea URL
- "Copy link" — copies the idea URL to clipboard

Share buttons sit below the idea description, above the pledge bar.

Twitter intent: `https://twitter.com/intent/tweet?text={title}&url={url}`
LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url={url}`

## Files

| File | Action |
|------|--------|
| `app/page.tsx` | modify — add stats section |
| `app/ideas/[id]/share_buttons.tsx` | create — client component for share buttons |
| `app/ideas/[id]/page.tsx` | modify — add ShareButtons component |

## Acceptance Criteria

- [ ] Landing page shows live stats (ideas, pledged, sponsors)
- [ ] Idea detail page has share buttons (Twitter, LinkedIn, copy link)
- [ ] Share links open correct URLs with idea title and link
- [ ] Copy link works and shows confirmation
- [ ] `./dev/health` returns ok
