# Roadmap

## Workflow

```
roadmap → bny specify "description"   # creates specs/<branch>/spec.md
        → bny plan                    # creates specs/<branch>/plan.md
        → bny tasks                   # creates specs/<branch>/tasks.md
        → bny review                  # gemini antagonist punches holes
        → bny --ralph --max-iter 10 implement   # claude builds until tests pass
        → ./dev/health                # verify live on vercel (see bny/qa-playbook.md)
        → update roadmap + decisions.md
```

after every implement cycle: QA the live app per `bny/qa-playbook.md`.

---

## Current State

the app is live at https://destroysass.vercel.app

what exists:
- [x] next.js 16 + supabase auth scaffolding
- [x] sign in / sign up at /auth
- [x] shows email + sign out when authenticated
- [x] deployed to vercel (production)
- [x] supabase project configured (bjaejvgoifgdanwvglnv)
- [x] docs/philosophy.md, docs/business-model.md, docs/product-vision.md
- [x] bny dark factory tooling bootstrapped

what does NOT yet exist:
- the board (ranked idea list)
- pledge/escrow mechanic
- cell formation flow
- any database schema beyond auth users

---

## Next

### 001 — landing page + brand

**why first:** before building any features, the homepage needs to communicate the vision.
a blank next.js page tells nobody anything.

what to build:
- hero: "the place where small businesses stop renting software and start owning it"
- one-liner explanation of the cell model
- "how it works" section (3 steps: propose → pledge → own)
- call to action: "submit an idea" (placeholder, links to /ideas)
- minimal nav: logo + sign in/out
- dark, punchy design — on brand with the manifesto

---

## Backlog (in priority order)

### 002 — idea board

the core of the portal. smbs browse and pledge to software concepts.

- `/ideas` — paginated list of ideas, sorted by total pledged $/mo
- each idea card: title, description, total pledged, sponsor count, status badge
- supabase table: `ideas` (id, title, description, created_by, created_at, status)
- supabase table: `pledges` (id, idea_id, user_id, amount_monthly, created_at)
- anon users can browse; must sign in to pledge
- total pledged per idea is a computed aggregate

### 003 — idea submission

smbs propose software they want to exist.

- `/ideas/new` — submit form (title, description, problem statement, what you'd pay/mo)
- requires auth
- submitted ideas appear on the board immediately in "proposed" status
- validation: title (min 10 chars), description (min 100 chars), monthly_amount (min $25)
- success: redirects to the idea page with share link

### 004 — pledge mechanic

smbs put money on the line for concepts they care about.

- pledge button on each idea card (requires auth)
- pledge form: monthly amount ($25 min)
- pledges are tracked but NOT charged yet (escrow concept, no stripe yet)
- idea page shows: "N businesses pledged $X/mo total — threshold is $Y/mo to trigger"
- trigger threshold: configurable per idea (default: $1,000/mo from 8+ sponsors)
- status changes: proposed → gaining_traction → threshold_reached

### 005 — user profiles + my ideas/pledges dashboard

- `/dashboard` — authenticated users see:
  - ideas they've submitted
  - ideas they've pledged to
  - total monthly pledges outstanding
- edit/withdraw pledges (before cell triggers)

### 006 — cell formation (phase 1, manual)

when a threshold is reached, a cell can form. MVP is manual/admin-triggered.

- admin view: list of ideas at/above threshold
- "trigger cell" button: changes status to `cell_forming`
- sends email to all pledgers: "your idea has reached threshold — cell forming"
- cell page: shows members, total treasury, status timeline

### 007 — dev cell applications

vetted dev cooperatives apply to build triggered cells.

- `/dev-cells` — list of certified dev cells with profiles
- application form for dev groups to apply for certification
- admin review queue for applications
- once certified, dev cells can bid on triggered cells

### 008 — stripe integration (real pledges → real payments)

turn pledges into actual recurring payments when a cell triggers.

- stripe checkout for monthly subscriptions
- pledge held as stripe "future payment" until cell triggers
- on trigger: convert pledges to live subscriptions
- opencollective integration for treasury management

---

## Icebox (future)

- dao governance layer (voting, weighted shares, proposals)
- lca incorporation workflow ("coop-in-a-box" button)
- inter-cell api routing + protocol fees
- cell health dashboard (uptime, sla metrics, dev cell activity)
- mobile-optimized views
- email notifications system
- public api for cell data

---

## Completed

- [x] project scaffolding (next.js + supabase + vercel)
- [x] auth (/auth — sign in/up/out)
- [x] bny dark factory bootstrapped
- [x] product docs (philosophy, business model, product vision)
