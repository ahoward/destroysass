# Tasks: 003 — Idea Submission Form

## Security Fixes (from Gemini antagonist review)

- [x] **S1** open redirect: validate `next` param is relative path only before redirect
  (`next.startsWith('/') && !next.startsWith('//')`)
- [x] **S2** data preservation on error: server action must return `{ errors, previousData }`
  so form can re-populate fields after failed submission
- [x] **S3** float bypass: add `step="1"` on monthly_ask input; parse strictly as int server-side
- [x] **S4** trim before validate: all string fields trimmed before length checks
- [x] **S5** db error handling: wrap supabase insert in try/catch, return friendly error
- [x] **S6** signup context: pass `next` param through BOTH signIn AND signUp flows

## Implementation Checklist

- [x] **T1** read app/auth/page.tsx and app/auth/actions.ts — understand current auth flow
- [x] **T2** create `app/ideas/new/actions.ts` — submitIdea server action:
  - validate all fields (trim first, then length checks)
  - monthly_ask: parse as int, reject floats
  - db insert wrapped in try/catch
  - return { errors, previousData } on failure
  - redirect("/ideas") on success
- [x] **T3** create `app/ideas/new/form.tsx` — client component:
  - useActionState for action result
  - pre-populate fields from previousData on error
  - show inline errors per field
  - step="1" on monthly_ask
  - all text rendered as plain text (no dangerouslySetInnerHTML)
- [x] **T4** create `app/ideas/new/page.tsx` — server component:
  - auth gate: redirect("/auth?next=/ideas/new") if no user
  - render form
- [x] **T5** update `app/auth/actions.ts` signIn:
  - read `next` from formData
  - validate: relative path only (`startsWith('/') && !startsWith('//')`)
  - redirect to next or "/" after success
- [x] **T6** update `app/auth/actions.ts` signUp:
  - same next param handling as signIn
- [x] **T7** update `app/auth/page.tsx`:
  - read `next` from searchParams
  - pass as hidden `<input name="next">` in form
  - wrapped in Suspense boundary for useSearchParams
- [x] **T8** run `./dev/post_flight` — must pass
- [ ] **T9** commit to branch 003-idea-submission-form
- [ ] **T10** push: `git push`
- [ ] **T11** deploy: `vercel deploy --prod --yes`
- [ ] **T12** run `./dev/health` — must return ok

## Definition of Done

All tasks checked. Anonymous → /auth?next=/ideas/new → sign in → /ideas/new → submit → /ideas.
New idea visible on board. All security issues from Gemini review addressed.
