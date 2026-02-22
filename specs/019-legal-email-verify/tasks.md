# Tasks: 019 — Legal Pages + Email Verification

## Checklist

- [x] **T1** create `app/terms/page.tsx` — full Terms of Service page
- [x] **T2** create `app/privacy/page.tsx` — full Privacy Policy page
- [x] **T3** modify `app/components/footer.tsx` — add "terms" and "privacy" links
- [x] **T4** modify `app/dashboard/page.tsx`:
  - check user.email_confirmed_at
  - if null: show yellow banner "please verify your email — check your inbox"
  - banner has a "resend verification" button (calls supabase.auth.resend)
- [x] **T5** run `./dev/post_flight` — must pass
- [ ] **T6** commit + push + merge to main
- [ ] **T7** deploy: `vercel deploy --prod --yes`
- [ ] **T8** run `./dev/health` — must return ok

## Definition of Done

/terms and /privacy render. Footer links to both. Unverified users see banner on dashboard.
