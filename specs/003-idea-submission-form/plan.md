# Plan: 003 — Idea Submission Form

## Files to create/modify

| File | Action |
|------|--------|
| `app/ideas/new/page.tsx` | create — auth gate + render form |
| `app/ideas/new/actions.ts` | create — submitIdea server action |
| `app/ideas/new/form.tsx` | create — client component with validation |
| `app/auth/page.tsx` | modify — pass `next` param through form |
| `app/auth/actions.ts` | modify — redirect to `next` after sign-in |

## approach

Three-file split for the new page:
- `page.tsx` — server component: auth check, renders form with hidden next param
- `actions.ts` — server action: validate + insert + redirect
- `form.tsx` — `"use client"` component: form UI, state, client validation, calls action

Client validation gives fast feedback; server action validates again before insert (never trust client).

Use `useActionState` (React 19 / Next.js 15 pattern) or `useFormState` for action result handling.

## auth redirect flow

1. anon hits `/ideas/new`
2. server component detects no user → `redirect("/auth?next=/ideas/new")`
3. auth page reads `next` from searchParams, stores in hidden `<input name="next">`
4. signIn action reads `next` from formData, redirects there after success
