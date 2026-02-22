# Feature Spec: 019 — Terms of Service, Privacy Policy, Email Verification

## Summary

Add legal pages (ToS, Privacy) and encourage email verification for trust.
These are table-stakes for any platform handling user data and money commitments.

## Routes

- `app/terms/page.tsx` — Terms of Service
- `app/privacy/page.tsx` — Privacy Policy

## Terms of Service

Key sections:
- Platform purpose: collective software funding
- Pledges are non-binding commitments (not charges) until cell formation
- Cell formation creates binding legal obligations
- Fork freedom: users can leave, take code
- User responsibilities: accurate info, no spam
- Admin rights: moderate content, approve/reject applications
- Dispute resolution
- Limitation of liability

## Privacy Policy

Key sections:
- Data collected: email, pledge amounts, ideas, comments
- How data is used: platform operation, notifications
- Third parties: Supabase (hosting), Vercel (CDN), Resend (email)
- Data retention: as long as account is active
- User rights: delete account, export data
- Cookie policy: session cookies only (Supabase auth)

## Email Verification

- Check if Supabase auth already sends verification emails
- If user.email_confirmed_at is null, show a banner on dashboard:
  "please verify your email to unlock all features"
- Optionally gate pledging behind verified email

## Footer Updates

- Add Terms and Privacy links to shared footer

## Acceptance Criteria

- [ ] /terms renders with full ToS
- [ ] /privacy renders with full privacy policy
- [ ] Footer has links to both
- [ ] Email verification banner shows for unverified users
- [ ] `./dev/health` returns ok
