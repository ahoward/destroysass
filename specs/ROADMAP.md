# Roadmap

## IPM: destroysass.ai — Launch Iteration

---

## Current State

The app is live at destroysass.vercel.app with a functional MVP covering the idea-to-pledge pipeline. What exists:

**Core loop works:** Users can propose ideas, pledge monthly amounts, upvote, comment, and track everything from a dashboard. Ideas auto-progress through statuses (`proposed` → `gaining_traction` → `threshold_reached`) based on pledge thresholds. Admins can trigger cell formation.

**14 pages implemented** across public (landing, ideas board, idea detail, about, dev cells directory, terms, privacy, public profiles) and authenticated (dashboard, profile edit, idea submission, dev cell application, admin panel).

**8 database migrations** covering ideas, pledges, comments, upvotes, dev_cells, profiles, categories, and auto-status triggers.

**Supporting infra:** Resend email notifications, Supabase auth with password reset, RLS policies on all tables, health check script, Vercel deployment.

**Stack:** Next.js 16, React 19, Supabase, Resend, Tailwind CSS 4, TypeScript.

---

## Gaps (launch-blocking)

1. **No real money moves.** Pledges are numbers in a DB. No Stripe. No credibility.
2. **Empty board problem.** New visitors see a ghost town. Classic two-sided marketplace cold start.
3. **Single theme, wrong default.** Current dark theme feels techy/niche. Light mode (black-on-white, generic product aesthetic) needed as default to feel accessible and legitimate to SMB audience.
4. **No business model clarity doc.** Key questions about fee structure, refund policy, pledge lifecycle, and legal obligations are undocumented — blocks both dev decisions and COO alignment.

---

## Proposed Features (prioritized)

### 1. Light/Dark Theme System
- **Priority:** P0
- **Description:** Implement a light mode (black on white, high-contrast, generic-product aesthetic) as the default, with dark mode toggle (current look) for night/preference. Keep red (#dc2626) as accent in both modes. Use CSS custom properties + Tailwind dark mode class strategy. Add theme toggle to nav.
- **Rationale:** First impression for SMB visitors. Current dark-only theme screams 'developer tool.' The generic-product black-on-white feel says 'this is a real business platform.' Launch-blocking because it's the brand.

### 2. Stripe Integration (Simple Pledges)
- **Priority:** P0
- **Description:** Connect Stripe Checkout for pledge payments. When a user pledges, they go through Stripe to set up a real monthly subscription at their pledge amount. No escrow, no hold-until-trigger — live recurring charges. Stripe customer + subscription IDs stored on pledges table. Cancel subscription on unpledge/withdraw. Webhook endpoint for payment events.
- **Rationale:** Without real money, the board is a wishlist. Simple subscription model gets money flowing now. Escrow/hold complexity deferred — can be layered on later. Unblocks revenue and credibility.

### 3. Seed Data Strategy (Cold Start)
- **Priority:** P0
- **Description:** Create 11 realistic idea concepts across diverse SMB verticals. Generate ~30-50 fake user accounts with believable display names. Distribute pledges across ideas to create a board that looks alive (varied pledge totals, some near threshold, some early). Add `is_seed` boolean flag to `ideas`, `pledges`, `profiles`, and track seed user IDs. Build a one-command seed script and a one-command rollback script to cleanly remove all seed data before or at launch. Seed comments and upvotes too for social proof.
- **Rationale:** Two-sided marketplace cold start is a business killer. The board needs to look alive on day one. Marking with `is_seed` gives a clean separation — launch with them, back them off gradually as real users arrive, or nuke them all at once.

### 4. Business Model Questions Doc
- **Priority:** P0
- **Description:** Create `docs/business-questions.md` — a structured document of open business model questions that affect development. Sections: Payment & Billing (refund policy, failed payments, pledge changes, subscription lifecycle), Cell Formation (what triggers real formation vs. status change, minimum viable sponsor count, timeline expectations), Legal & Compliance (ToS updates needed for real payments, tax implications, LCA formation triggers), Platform Economics (destroysass take-rate on pledges, when does platform fee kick in, dev cell payment flow). Each question flagged as blocking or non-blocking for current dev work.
- **Rationale:** COO needs this to make decisions. Dev team needs answers before building Stripe webhooks, refund flows, and cell formation triggers. Shipping this doc is a forcing function for business alignment.

### 5. Launch Polish Pass
- **Priority:** P1
- **Description:** Fix rough edges for launch: ensure all pages respect light/dark theme, consistent typography and spacing, working mobile experience on all 14 pages, empty states are helpful not broken, nav is clean and consistent, loading states work. Audit every page for launch readiness.
- **Rationale:** MVP doesn't mean ugly. First impressions matter for SMB audience. This is the difference between 'interesting prototype' and 'I'd put my credit card in here.'

### 6. Guided Onboarding Flow
- **Priority:** P1
- **Description:** After first sign-up, show a 3-step onboarding: (1) explain the model in 30 seconds, (2) browse the board or submit an idea, (3) complete your profile. Track onboarding completion. Lightweight — modal or inline, not a separate page flow.
- **Rationale:** Current new-user experience is cold. With Stripe live, the path from sign-up to first pledge needs to be frictionless. Low effort, high conversion impact.

### 7. Notification Preferences (CAN-SPAM Compliance)
- **Priority:** P1
- **Description:** Replace placeholder unsubscribe link with real notification preferences page. Users toggle email types on/off. Store in `notification_preferences` table. Respect before sending.
- **Rationale:** Legal requirement before scaling email with real paying users. Current placeholder unsubscribe link is a liability. Must ship before or alongside Stripe.

### 8. Data Export
- **Priority:** P2
- **Description:** 'Export my data' button on dashboard — JSON/CSV of user's ideas, pledges, comments, profile. Cheap to build, high trust signal.
- **Rationale:** Fork freedom is a core philosophical promise. With real money involved, users will ask 'can I get my data out?' Answer needs to be yes, demonstrably.

---

## Iteration Plan

**Week 1:** Theme system (#1) + Business questions doc (#4) — in parallel
**Week 2:** Stripe integration (#2) + Seed data script (#3) — in parallel
**Week 3:** Launch polish (#5) + Onboarding (#6) + Notification prefs (#7)
**Week 4:** Buffer / QA / seed data tuning / launch prep

---

## Open Questions for COO

See `docs/business-questions.md` (to be created in feature #4) for the full list. Preview:

- What's the refund policy when a user unpledges after being charged?
- Does destroysass take a platform fee on pledges now, or only after cell formation?
- What happens to active subscriptions if an idea gets cancelled?
- Is there a minimum pledge amount with Stripe fees considered? ($25 pledge minus Stripe's ~$1.03 fee = $23.97 net — acceptable?)
- Do we need a payment terms page before Stripe goes live?
- What entity receives Stripe payments — personal account, LLC, or the platform LCA?
- Are seed/fake pledges disclosed to real users, or treated as genuine social proof?

---

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

After every implement cycle: QA the live app per `bny/qa-playbook.md`.

---

## Completed

- [x] project scaffolding (next.js + supabase + vercel)
- [x] auth (/auth — sign in/up/out)
- [x] bny dark factory bootstrapped
- [x] product docs (philosophy, business model, product vision)
- [x] 001 — landing page + brand
- [x] 002 — idea board
- [x] 003 — idea submission
- [x] 004 — pledge mechanic
- [x] 005 — user dashboard
- [x] 006 — cell formation admin + auto-status trigger
- [x] 007 — about page, FAQ, SEO/OG meta
- [x] 008 — search/sort/filter + idea editing
- [x] 009 — idea deletion + RLS policy
- [x] 010 — email notifications (Resend)
- [x] 011 — dev cell profiles & applications
- [x] 012 — idea comments & discussion
- [x] 013 — public stats & social sharing
- [x] 014 — polish & UX improvements
- [x] 015 — idea categories
- [x] 016 — idea upvotes
- [x] 017 — enhanced dashboard with stats
- [x] 018 — admin analytics dashboard
- [x] 019 — terms of service, privacy policy, email verification
- [x] 020 — public user profiles
