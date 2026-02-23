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

### what's built (23 features shipped)

- [x] next.js 16 + supabase auth scaffolding
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
- [x] 010 — email notifications via resend (pledge, status change, cell formation)
- [x] 011 — dev cell profiles & applications (/dev-cells, apply form, admin review)
- [x] 012 — idea comments & discussion (threaded, owner delete, display names)
- [x] 013 — public stats & social sharing (twitter, linkedin, copy link)
- [x] 014 — polish & UX (custom 404, shared footer, loading skeletons, password reset)
- [x] 015 — idea categories (9 predefined, filter on board, category tags)
- [x] 016 — idea upvotes (toggle, count on cards, "most upvoted" sort)
- [x] 017 — enhanced dashboard (stats bar, progress bars, activity feed)
- [x] 018 — admin analytics dashboard (growth indicators, top ideas, service role stats)
- [x] 019 — legal pages (terms of service, privacy policy, email verification banner)
- [x] 020 — public user profiles (profiles table, /profile/[id], edit form)
- [x] 021 — light/dark theme system (CSS custom properties, toggle, respects system pref)
- [x] 022 — stakeholder sections, /about/legal, /about/money, groups infrastructure (sudo/admin/cabal), /cabal placeholder
- [x] 023 — shared nav component, /me account page, /about/authors (founder profile), /cabal investor update + bizops playbook, invitation system with tracking

### database

- ideas (id, title, description, problem, monthly_ask, created_by, status, category, timestamps)
- pledges (id, idea_id, user_id, amount_monthly, created_at)
- comments (id, idea_id, user_id, display_name, body, created_at)
- upvotes (id, idea_id, user_id, created_at)
- profiles (id→auth.users, display_name, bio, website, created_at)
- dev_cells (id, name, description, website, skills[], contact_email, status, applied_by, timestamps)
- groups (id, name, description, created_at)
- group_members (id, group_id, user_id, created_at)
- invitations (id, token, created_by, recipient_name/email, group_names[], redirect_path, note, view_count, viewed_at, accepted_at/by, expires_at, created_at)
- idea_board view (ideas + aggregated pledge totals + upvote counts)
- auto-status trigger: proposed→gaining_traction@$300, →threshold_reached@$1000
- RLS on all tables with ownership checks; service role for admin ops

### infra

- vercel production deploy
- supabase (bjaejvgoifgdanwvglnv, us-east-1)
- SUPABASE_SERVICE_ROLE_KEY in vercel env
- SUPABASE_ACCESS_TOKEN for management API
- resend integration (lib/email.ts) — RESEND_API_KEY not yet configured (issue #2)
- groups-based RBAC (sudo > admin > cabal, root email fallback)
- 10 migrations applied (001–010)

---

## Next

### 024 — stripe integration (real pledges → real payments)

**blocked by:** business questions in `docs/business-questions.md`

before code:
- decide receiving entity (personal account, LLC, or platform LCA?)
- decide refund policy on unpledge (prorate? no refund? current month only?)
- decide platform fee structure (pre-formation, post-formation, or both?)
- decide minimum pledge floor (stripe fees eat small amounts)
- decide if pledges transfer to cell stripe account at formation

what to build:
- stripe checkout for monthly subscriptions
- stripe connect per cell (connected accounts)
- webhook handling for payment lifecycle
- pledge conversion from intent to real subscription at cell trigger
- subscription management (upgrade/downgrade/cancel)

### 025 — configure resend for real email delivery

- get RESEND_API_KEY, add to .envrc + vercel env vars
- verify custom domain with resend (SPF, DKIM, DMARC)
- update FROM address in lib/email.ts from sandbox to verified domain
- test all email paths: pledge notification, status change, cell formation, invitation
- see github issue #2

---

## Backlog (in priority order)

### customer discovery (non-code)

not a feature — this is manual work:
- talk to 20 SMBs bleeding on SaaS costs
- get them to submit ideas and pledge
- pattern-match the first cell's problem from conversations
- see /cabal/bizops for the full playbook

### dev cell recruitment (non-code)

- find 3–5 dev cooperatives to certify
- vet manually (interview, portfolio, references)
- create certification checklist
- white-glove onboard the first dev cell
- see /cabal/bizops for details

### platform entity formation (non-code)

- form LLC or LCA for destroysass itself
- wyoming filing (~$100), EIN, bank account
- needed before stripe can go live

### dev cell bidding & selection

- mechanism for certified dev cells to bid on triggered cells
- member voting on dev cell selection
- SLA contract template generation

### opencollective integration

- create collectives per cell via API
- connect to stripe connected accounts
- transparent ledger sync
- treasury management dashboard

### dao governance layer

- voting (weighted during genesis, 1-member-1-vote after 18 months)
- proposals and proposal lifecycle
- on-chain transparency with real-world legal enforcement
- share class management (class A / class B)

---

## Icebox (future)

- lca incorporation workflow ("coop-in-a-box" one-click formation)
- inter-cell api routing + protocol fees
- cell health dashboard (uptime, SLA metrics, dev cell activity)
- automated dev cell payments (SLA metrics → auto-approve → auto-pay)
- mobile-optimized views
- public api for cell data

---

## Completed

- [x] project scaffolding (next.js + supabase + vercel)
- [x] auth (/auth — sign in/up/out, email verification, password reset)
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
- [x] 010 — email notifications (resend)
- [x] 011 — dev cell profiles & applications
- [x] 012 — idea comments & discussion
- [x] 013 — public stats & social sharing
- [x] 014 — polish & UX (404, footer, skeletons, password reset)
- [x] 015 — idea categories
- [x] 016 — idea upvotes
- [x] 017 — enhanced dashboard (stats, activity feed)
- [x] 018 — admin analytics dashboard
- [x] 019 — legal pages (terms, privacy, email verification)
- [x] 020 — public user profiles
- [x] 021 — light/dark theme system
- [x] 022 — stakeholder content, legal/money deep-dives, groups infrastructure, cabal
- [x] 023 — shared nav, /me, /about/authors, cabal investor update + bizops, invitation system
