# Feature Specification

# Feature Spec: 001 — Landing Page + Brand

## Summary

Replace the default Next.js + Supabase boilerplate homepage with a branded landing page that
communicates the destroysaas.ai vision clearly and compellingly. The page must work for both
anonymous and authenticated visitors.

## Context

The app currently shows a generic "Welcome. You can use this app without signing in..." page.
This communicates nothing about what destroysaas.ai is. The brand voice is: lowercase, direct,
no corporate bullshit, manifesto-style. See docs/philosophy.md and docs/product-vision.md.

## Goals

1. Communicate the core value proposition above the fold
2. Explain the "cell model" simply in 3 steps
3. Show a call-to-action ("submit an idea" — placeholder link for now)
4. Show correct auth state (Sign In for anon, email + Sign Out for authenticated)
5. Be visually on-brand: dark, minimal, punchy

## Design

### Color palette
- Background: `#0a0a0a` (near-black)
- Text primary: `#f0f0f0` (near-white)
- Text secondary: `#888888` (muted gray)
- Accent: `#dc2626` (red-600) — destruction theme
- Border: `#222222`

### Typography
- Font: system font stack (no google fonts — fast)
- Hero headline: large, bold, lowercase
- Body: small, readable, generous line-height

### Layout
- Single column, max-width 680px, centered
- No sidebar. No grid. Just content.

## Page Structure

### Nav (top)
- Left: `destroysaas` in red
- Right: if anon → "sign in" link; if auth → user email + "sign out" button

### Hero section
```
the place where small businesses
stop renting software
and start owning it.
```
- Large headline, lowercase, near-white
- Subtitle: "saas is dead. we're building what comes next."

### Problem statement (1 paragraph)
Brief, punchy version of the manifesto:
"ai didn't drive software costs to zero. it shifted the bottleneck.
the true cost of software has always been maintaining it — 80% of total cost of ownership
is maintenance, not the initial build. traditional saas extracts that maintenance cost
from you forever, gives you no ownership, and cuts off your legal recourse when things break."

### The solution (3 steps)
Simple numbered list, each with a short title + 1-sentence description:

1. **propose** — submit a software concept your business needs. describe the problem, what
   you'd pay per month for a maintained, hosted solution you actually own.

2. **pledge** — other businesses with the same problem back the concept with monthly
   commitments. when the threshold is reached, a cell forms.

3. **own** — a vetted developer cooperative builds it under contract to your collective.
   the code is open-source. the hosting is yours. you have legal standing.

### CTA
Big red button: "submit an idea →" — links to `/ideas/new` (placeholder, 404 is fine for now)
Under it in small text: "or browse existing ideas →" — links to `/ideas` (placeholder)

### Footer
- One line: "the code is free. the network is the value."
- Links: GitHub (https://github.com/ahoward/destroysaas) | Docs (links to docs/ directory on github)

## Auth State Behavior

- Page renders for anonymous users (no redirect)
- Nav shows "sign in" for anon, email + "sign out" for authenticated
- No protected content — entire page is public
- Auth state fetched server-side (use Supabase server client)

## Technical Requirements

- File: `app/page.tsx` — rewrite completely
- Use Tailwind CSS classes (already configured in the project)
- No new dependencies
- Server component by default; use existing Supabase server client at `lib/supabase/server.ts`
- Sign Out must be a form action (POST, not GET) — already handled in the existing auth pattern
- Mobile responsive (single column naturally is)
- No images, no external fonts, no JS-heavy animations

## Existing Code to Reuse

- `lib/supabase/server.ts` — for server-side auth check
- `app/auth/` — existing auth pages (sign in/up/out) — don't touch
- Auth pattern from existing `app/page.tsx` (currently shows sign-in logic)

## Out of Scope

- Any database reads
- The idea board or pledge mechanic
- Any forms that actually submit data
- Email collection

## Acceptance Criteria

- [ ] `https://destroysaas.vercel.app/` loads with 200 (no 500)
- [ ] Anonymous visitor sees the full landing page with "sign in" in nav
- [ ] Authenticated user sees their email and "sign out" in nav
- [ ] Hero headline is visible above the fold
- [ ] 3-step "propose / pledge / own" section is present
- [ ] CTA button "submit an idea" is present (links to /ideas/new)
- [ ] Footer with tagline is present
- [ ] `./dev/health` returns `{"status":"ok"}`
- [ ] No console errors in browser
- [ ] Page looks correct on mobile (320px width minimum)

---

# Implementation Plan

# Implementation Plan: 001 — Landing Page + Brand

## Approach

Single file change: rewrite `app/page.tsx` completely. The existing file has the generic
Next.js + Supabase boilerplate. Replace with a branded landing page using Tailwind classes.
Reuse the existing Supabase server client for auth state. No new files needed.

## Files Changed

| File | Action | Notes |
|------|--------|-------|
| `app/page.tsx` | Rewrite | Main landing page — full replacement |
| `app/globals.css` | Maybe update | Only if custom CSS variables needed for bg color |

## Component Structure

`app/page.tsx` is a server component that:
1. Calls `createClient()` from `lib/supabase/server.ts` to get the Supabase client
2. Calls `supabase.auth.getUser()` to determine auth state
3. Returns full page HTML using Tailwind classes

No client components needed. The "sign out" action already exists in the auth pattern
and is handled via a server action or form post.

## Implementation Steps

1. Check what the current `app/page.tsx` and `app/layout.tsx` look like
2. Check `app/auth/` for the existing sign-out pattern to reuse
3. Rewrite `app/page.tsx` with:
   - Nav: destroysaas (red) + auth state (sign in or email + sign out)
   - Hero: large headline + subtitle
   - Problem statement paragraph
   - 3-step section (propose / pledge / own)
   - CTA button + secondary link
   - Footer with tagline + links
4. Apply dark color scheme via Tailwind bg/text classes
5. Test locally if possible, else rely on Vercel build

## Tailwind Class Strategy

Use Tailwind's built-in dark classes directly:
- Container: `bg-[#0a0a0a] min-h-screen text-[#f0f0f0]`
- Accent: `text-red-600`
- Muted text: `text-gray-500`
- Max width: `max-w-2xl mx-auto px-6`

## Risk

Low. Single file. No database. No new dependencies. The only risk is breaking the existing
auth flow — mitigated by reusing the exact same Supabase client pattern as the current file.

---

# Task List

# Tasks: 001 — Landing Page + Brand

## Checklist

- [ ] **T1** read current `app/page.tsx` and understand existing auth pattern
- [ ] **T2** read current `app/layout.tsx` to understand global styles/fonts
- [ ] **T3** read `app/auth/` to understand sign-out pattern (need to reuse it in nav)
- [ ] **T4** read `lib/supabase/server.ts` to confirm server client import path
- [ ] **T5** rewrite `app/page.tsx` — nav section (logo + auth state)
- [ ] **T6** rewrite `app/page.tsx` — hero section (headline + subtitle)
- [ ] **T7** rewrite `app/page.tsx` — problem statement paragraph
- [ ] **T8** rewrite `app/page.tsx` — 3-step section (propose/pledge/own)
- [ ] **T9** rewrite `app/page.tsx` — CTA section (submit an idea + browse)
- [ ] **T10** rewrite `app/page.tsx` — footer (tagline + github/docs links)
- [ ] **T11** run `./dev/test` (tsc + next build) — must pass clean
- [ ] **T12** commit and push to branch `001-landing-page-and-brand`
- [ ] **T13** deploy to vercel: `vercel deploy --prod --yes`
- [ ] **T14** run `./dev/health` — must return `{"status":"ok"}`
- [ ] **T15** verify in browser: anonymous view shows "sign in" in nav
- [ ] **T16** verify in browser: no console errors

## Definition of Done

All tasks checked. `./dev/health` returns ok. Browser screenshot confirms landing page
renders with hero, 3 steps, CTA, and correct auth state in nav.

---

# Instructions

You are the ANTAGONIST reviewer. Your job is to find problems the implementer will miss.

Review the above specification and plan for:
1. Missing edge cases and boundary conditions
2. Security vulnerabilities and attack vectors
3. Error handling gaps (what happens when things fail?)
4. Missing test scenarios
5. Ambiguous or contradictory requirements
6. Performance concerns at scale
7. Assumptions that should be made explicit
8. Data validation gaps

For each issue found, state:
- **Problem**: What is wrong or missing
- **Impact**: Why it matters (severity: critical/high/medium/low)
- **Fix**: A concrete, actionable suggestion

Do NOT rubber-stamp. If you find nothing wrong, look harder.
A review that finds zero issues is a failed review.