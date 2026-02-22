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
- [x] deployed to vercel (production)
- [x] supabase project configured (bjaejvgoifgdanwvglnv)
- [x] docs/philosophy.md, docs/business-model.md, docs/product-vision.md
- [x] bny dark factory tooling bootstrapped
- [x] 001 — landing page + brand (dark, punchy, 3-step how-it-works, CTAs)
- [x] 002 — idea board (/ideas, idea_board view, ranked by pledges)
- [x] 003 — idea submission (/ideas/new, auth-gated, validation)
- [x] 004 — pledge mechanic (/ideas/[id], pledge/unpledge, status gating)
- [x] 005 — user dashboard (/dashboard, my ideas, my pledges, withdraw)
- [x] 006 — cell formation admin (/admin, auth-gated, auto-status trigger, manual cell formation)
- [x] 007 — about page + FAQ + SEO/OG meta + consistent nav
- [x] 008 — search/sort/filter on ideas board + inline idea editing (creator only)
- [x] 009 — idea deletion by creator (with confirmation, RLS policy)

database:
- ideas table (id, title, description, problem, monthly_ask, created_by, status, timestamps)
- pledges table (id, idea_id, user_id, amount_monthly, created_at)
- idea_board view (ideas + aggregated pledge totals)
- auto-status trigger: proposed→gaining_traction@$300, →threshold_reached@$1000
- RLS: public read on ideas/pledges, auth insert/update/delete with ownership checks

infra:
- vercel production deploy
- supabase (bjaejvgoifgdanwvglnv, us-east-1)
- SUPABASE_SERVICE_ROLE_KEY in vercel env
- SUPABASE_ACCESS_TOKEN available for management API

---

## Next

### 010 — email notifications (resend)

**why next:** users need to know when something happens to their ideas/pledges.
without notifications, the app is silent after submission.

what to build:
- integrate resend (or supabase edge functions) for transactional email
- email on: new pledge to your idea, idea status change, cell formation trigger
- unsubscribe link in every email
- email templates: clean, on-brand, minimal

---

## Backlog (in priority order)

### 011 — dev cell applications

vetted dev cooperatives apply to build triggered cells.

- `/dev-cells` — list of certified dev cells with profiles
- application form for dev groups to apply for certification
- admin review queue for applications
- once certified, dev cells can bid on triggered cells

### 012 — stripe integration (real pledges → real payments)

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
- public api for cell data
- idea comments/discussion thread
- social sharing buttons on ideas

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
