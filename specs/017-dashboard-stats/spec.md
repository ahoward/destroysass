# Feature Spec: 017 — Enhanced Dashboard with Stats

## Summary

Upgrade the user dashboard with personal stats, idea performance metrics,
and activity feed. Make it the command center for engaged users.

## Dashboard Sections

### 1. Personal Stats Bar
- Total monthly pledges you've made
- Number of ideas you've submitted
- Number of ideas you've pledged to
- Total upvotes received across your ideas

### 2. Your Ideas (enhanced)
- Show each idea with: title, status, total pledged, pledge count, upvote count, comment count
- Progress bar toward threshold
- Sort by most pledged

### 3. Your Pledges (enhanced)
- Show each pledge with: idea title, your monthly amount, idea status, idea total
- Total monthly commitment at top

### 4. Activity Feed
- Recent activity on your ideas: new pledges, new comments, status changes
- Simple reverse-chronological list
- "3 hours ago: someone pledged $50/mo to your idea 'slack replacement'"

## Files

| File | Action |
|------|--------|
| `app/dashboard/page.tsx` | modify — add stats bar, enhance idea/pledge sections |
| `app/dashboard/activity.tsx` | create — activity feed component |

## Notes

- Activity feed: query recent pledges + comments on user's ideas
- No new tables needed — join existing data
- All server-side fetched

## Acceptance Criteria

- [ ] Stats bar shows personal metrics
- [ ] Ideas section shows rich data with progress bars
- [ ] Pledges section shows totals
- [ ] Activity feed shows recent events
- [ ] `./dev/health` returns ok
