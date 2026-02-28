# Plan: 010 — Email Notifications via Resend

## Files

| File | Action |
|------|--------|
| `lib/email.ts` | create — Resend wrapper + notification helpers |
| `app/ideas/[id]/actions.ts` | modify — call notifyNewPledge after pledge, detect status change |
| `app/admin/actions.ts` | modify — call notifyCellFormation after trigger |
| `package.json` | modify — add resend dependency |

## Technical Approach

Use the `resend` npm package for sending transactional email. All email functions
are fire-and-forget (async, non-blocking, catch errors gracefully). Missing
RESEND_API_KEY means emails silently skip (console.warn only).

Email templates are inline HTML strings — dark theme, minimal, no external deps.

## Status Change Detection

The DB trigger updates idea status automatically on pledge insert/delete.
In the pledgeIdea action: query the idea status before the pledge, then after.
If the status changed, call notifyStatusChange with the new status.

## Resend Setup

- `RESEND_API_KEY` env var (Vercel + .envrc)
- Sender: `destroysaas <notifications@destroysaas.ai>` (or onboarding domain initially)
- No custom domain needed for MVP — use Resend's default `onboarding@resend.dev`
