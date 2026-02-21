# Feature Spec: 003 — Idea Submission Form

## Summary

Build `/ideas/new` — a form where authenticated users can submit a new software idea. Anonymous
visitors are redirected to `/auth` with a return URL. On success, redirect to `/ideas`.

## Route

`app/ideas/new/page.tsx` — server component wrapper  
`app/ideas/new/actions.ts` — server action for form submission  
`app/ideas/new/form.tsx` — client component (form with validation state)

## Auth Gate

- Server component checks auth via Supabase server client
- If not authenticated: redirect to `/auth?next=/ideas/new`
- Auth page must support the `next` query param redirect (needs middleware or auth action update)

## Form Fields

| Field | Type | Validation |
|-------|------|------------|
| title | text input | required, 10–120 chars |
| problem | textarea | required, 50–1000 chars — "what's the bleeding-neck problem?" |
| description | textarea | required, 100–2000 chars — "describe the solution you want" |
| monthly_ask | number input | required, min $25, max $500, integer |

## UI / Design

Same dark theme as the rest of the app.

- Page title: "propose an idea"
- Subtitle: "describe the software your business needs. what would you pay per month for a hosted, maintained solution you actually own?"
- Form fields with labels (lowercase, on-brand)
- Submit button: "submit idea →" (red, disabled while submitting)
- Cancel link: "← back to the board" (links to /ideas)
- Inline validation errors below each field (client-side + server-side)
- Loading state while submitting

## Server Action: submitIdea

File: `app/ideas/new/actions.ts`

```typescript
"use server"
// 1. get authenticated user via supabase server client
// 2. if no user: return error (shouldn't happen due to auth gate, but defensive)
// 3. validate all fields server-side
// 4. insert into ideas table with created_by = user.id
// 5. on success: redirect("/ideas")
// 6. on error: return { errors: { field: "message" } }
```

## Validation Rules (server-side)

- title: required, trim, 10 ≤ length ≤ 120
- problem: required, trim, 50 ≤ length ≤ 1000
- description: required, trim, 100 ≤ length ≤ 2000
- monthly_ask: required, integer, 25 ≤ value ≤ 500

## Auth Redirect

Update `app/auth/actions.ts` signIn to redirect to `next` param if present:
```
const next = formData.get("next") as string | null
redirect(next || "/")
```

Update `app/auth/page.tsx` to pass `next` param through the form as a hidden field.

## Acceptance Criteria

- [ ] `/ideas/new` redirects to `/auth?next=/ideas/new` for anonymous users
- [ ] form renders correctly with all 4 fields
- [ ] client-side validation prevents submit with empty/invalid fields
- [ ] server action inserts idea and redirects to `/ideas`
- [ ] new idea appears at bottom of the board (0 pledges = sorts last)
- [ ] form shows inline errors on validation failure
- [ ] after sign-in via /auth?next=/ideas/new, user lands back on the form
- [ ] `./dev/health` returns ok
- [ ] no console errors
