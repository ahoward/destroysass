# Plan: 019 — Legal Pages + Email Verification

## Files

| File | Action |
|------|--------|
| `app/terms/page.tsx` | create — Terms of Service |
| `app/privacy/page.tsx` | create — Privacy Policy |
| `app/components/footer.tsx` | modify — add Terms/Privacy links |
| `app/dashboard/page.tsx` | modify — add email verification banner |

## Notes

- Legal text is placeholder — Ara should review before launch
- Email verification: check user.email_confirmed_at from Supabase auth
- Banner is dismissable but reappears each session
- No new tables or migrations
