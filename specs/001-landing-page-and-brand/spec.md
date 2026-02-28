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
