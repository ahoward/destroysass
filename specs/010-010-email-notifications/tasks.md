# Tasks: 010 — Email Notifications via Resend

## Checklist

- [x] **T1** `npm install resend` — add to package.json
- [x] **T2** create `lib/email.ts`:
  - `sendEmail(to, subject, html)` — Resend wrapper, graceful no-op if no API key
  - `emailTemplate(title, bodyHtml)` — dark-themed HTML template wrapper
  - `notifyNewPledge(ideaId, pledgerEmail, amount)` — fetches idea + creator email, sends notification
  - `notifyStatusChange(ideaId, newStatus)` — fetches all pledger emails via service role, sends batch
  - `notifyCellFormation(ideaId)` — fetches creator + all pledger emails, sends batch
  - use `process.env.RESEND_API_KEY` — if missing, console.warn and return early
  - sender: `onboarding@resend.dev` (Resend default, works without domain verification)
  - all functions: async, catch errors, never throw (fire-and-forget)
- [x] **T3** modify `app/ideas/[id]/actions.ts` → `pledgeIdea`:
  - before pledge: fetch idea status
  - after pledge: re-fetch idea status
  - if status changed: call `notifyStatusChange(ideaId, newStatus)`
  - always: call `notifyNewPledge(ideaId, user.email, amount)` on successful pledge
- [x] **T4** modify `app/ideas/[id]/actions.ts` → `unpledgeIdea`:
  - before unpledge: fetch idea status
  - after unpledge: re-fetch idea status
  - if status changed (downgrade): call `notifyStatusChange(ideaId, newStatus)`
- [x] **T5** modify `app/admin/actions.ts` → `triggerCellFormation`:
  - after successful status update: call `notifyCellFormation(ideaId)`
- [x] **T6** run `./dev/post_flight` — must pass
- [ ] **T7** commit + push + merge to main
- [ ] **T8** deploy: `vercel deploy --prod --yes`
- [ ] **T9** run `./dev/health` — must return ok

## Notes

- RESEND_API_KEY must be added to .envrc and Vercel env vars
- For MVP, use Resend's onboarding domain (no DNS setup needed)
- Email is fire-and-forget — pledge/status operations must never fail because of email
- All email functions should be called with `void notifyXxx(...)` (don't await in the action)

## Definition of Done

Pledging an idea sends email to the creator. Status changes send email to all pledgers.
Cell formation sends email to all stakeholders. Missing API key = graceful skip.
