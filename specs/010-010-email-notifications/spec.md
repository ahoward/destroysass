# Feature Spec: 010 — Email Notifications via Resend

## Summary

Integrate Resend for transactional email. Notify users when meaningful events happen:
new pledges on their ideas, status changes, cell formation triggers.

## Dependencies

- `resend` npm package
- RESEND_API_KEY environment variable (Vercel + .envrc)
- Resend account + verified sending domain (or use onboarding domain)

## Events That Trigger Email

### 1. New Pledge Notification (to idea creator)
- **When**: someone pledges to an idea
- **To**: idea creator's email
- **Subject**: "someone pledged ${amount}/mo to your idea: {title}"
- **Body**: pledge amount, new total, pledger count, link to idea

### 2. Status Change Notification (to all pledgers)
- **When**: idea status changes (gaining_traction, threshold_reached, cell_forming)
- **To**: all users who pledged to this idea
- **Subject**: "your idea '{title}' is now {status_label}"
- **Body**: new status explanation, current total, link to idea

### 3. Cell Formation Trigger (to all pledgers + creator)
- **When**: admin triggers cell formation
- **To**: all pledgers + idea creator
- **Subject**: "cell forming: {title}"
- **Body**: congratulations, what happens next, link to idea

## Implementation

### lib/email.ts
- `sendEmail(to, subject, html)` — wraps Resend API
- `notifyNewPledge(ideaId, pledgerId, amount)` — fetches idea + creator, sends email
- `notifyStatusChange(ideaId, newStatus)` — fetches pledgers, sends batch
- `notifyCellFormation(ideaId)` — fetches all stakeholders, sends batch

### Email Templates
- Inline HTML (no external templates for simplicity)
- Dark theme matching the app (black bg, white text, red-600 accents)
- Unsubscribe link at bottom (placeholder — just links to /dashboard for now)
- Clean, minimal — no images, no heavy formatting

### Integration Points
- `app/ideas/[id]/actions.ts` — after successful pledge, call `notifyNewPledge`
- `supabase/migrations/002_pledge_trigger.sql` — DB trigger handles status changes;
  we'll add a Supabase webhook or check status in the pledge action instead
- `app/admin/actions.ts` — after triggerCellFormation, call `notifyCellFormation`

### Status Change Detection
Since the DB trigger updates status automatically, we need to detect the change.
Approach: in the pledgeIdea action, check the idea status before and after the pledge.
If it changed, fire notifyStatusChange.

## Acceptance Criteria

- [ ] New pledge → creator gets email with pledge details
- [ ] Status change → all pledgers get email
- [ ] Cell formation → all stakeholders get email
- [ ] Emails render correctly (dark theme, minimal)
- [ ] Missing RESEND_API_KEY → graceful no-op (log warning, don't crash)
- [ ] `./dev/health` returns ok
