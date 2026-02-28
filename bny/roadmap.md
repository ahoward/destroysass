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

the app is live at https://destroysaas.coop

### what's built (31 features shipped)

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
- [x] 011 — cell profiles & applications (/cells, apply form, admin review)
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
- [x] 024 — rename "dev cells" to "cells" (database, routes, code, docs — broadened concept)
- [x] 025 — ghost users, sudo impersonation, seed data bootstrap (11 personas, 15 ideas, 59 pledges, 10 comments from N5 research)
- [x] 026 — content & messaging (SaaS definition, credit union analogy, FSF/Stallman philosophy page, "code is free, maintenance is not" framing, MVP competition model for cells)
- [x] 027 — soft gate: lobby dashboard + cabal application (is_inner() gate, /lobby with stats+roadmap+activity, /lobby/apply cabal application form, /admin/applications review queue, non-inner users redirected from /dashboard and /ideas/new)
- [x] 028 — redefine cells as full-service product cooperatives (product+design+eng+ops, "what is a cell?" section, updated all cell language across site)
- [x] 029 — lowercase legibility CSS (letter-spacing, word-spacing, line-height 1.75 on body text, ::first-letter weight anchoring, tightened headings)
- [x] 030 — /why page: SMB economics + interactive SaaS cost calculator (the SaaS tax, destroysaas math, industry examples, comparison table, "run your own numbers" calculator)
- [x] 031 — production hardening: security headers (HSTS, X-Frame-Options, nosniff, XSS, referrer, permissions), robots.txt, dynamic sitemap, Vercel Analytics + Speed Insights

### database

- ideas (id, title, description, problem, monthly_ask, created_by, status, category, timestamps)
- pledges (id, idea_id, user_id, amount_monthly, created_at)
- comments (id, idea_id, user_id, display_name, body, created_at)
- upvotes (id, idea_id, user_id, created_at)
- profiles (id→auth.users, display_name, bio, website, created_at)
- cells (id, name, description, website, skills[], contact_email, status, applied_by, timestamps)
- groups (id, name, description, created_at) — sudo, admin, cabal, ghost
- group_members (id, group_id, user_id, created_at)
- invitations (id, token, created_by, recipient_name/email, group_names[], redirect_path, note, view_count, viewed_at, accepted_at/by, expires_at, created_at)
- cabal_applications (id, user_id, name, reason, contribution, status, reviewed_by, reviewed_at, created_at) — unique per user
- idea_board view (ideas + aggregated pledge totals + upvote counts)
- auto-status trigger: proposed→gaining_traction@$300, →threshold_reached@$1000
- RLS on all tables with ownership checks; service role for admin ops
- 11 ghost users (ghost+{slug}@destroysaas.coop) in ghost group — no passwords, sudo-only access

### infra

- vercel production deploy (destroysaas.coop)
- supabase (bjaejvgoifgdanwvglnv, us-east-1)
- SUPABASE_SERVICE_ROLE_KEY in vercel env
- SUPABASE_ACCESS_TOKEN for management API
- resend integration (lib/email.ts) — RESEND_API_KEY configured, FROM: ara@destroysaas.coop, domain verified
- proton mail for inbound email (ara@destroysaas.coop)
- vercel analytics + speed insights enabled
- security headers: HSTS, X-Frame-Options, nosniff, XSS, referrer, permissions
- robots.txt + dynamic sitemap (static pages + all idea pages from supabase)
- vercel CLI linked (project: destroysaas, org: ahowards-projects)
- groups-based RBAC (sudo > admin > cabal > ghost, root email fallback)
- 13 migrations applied (001–013)
- ghost acting-as: cookie-based sudo impersonation (lib/ghost.ts, /admin/ghosts)
- seed script: scripts/seed_ghosts.ts (idempotent, bun)

### board state (post-seed)

- 18 ideas on the board
- $4,400+ pledged monthly
- 6 ideas at "gaining traction" status
- 11 ghost sponsors + original 3 seed ideas

---

## Next

### 032 — stripe integration (real pledges → real payments)

**blocked by:** business questions in `docs/business-questions.md`

before code:
- decide receiving entity (personal account, LLC, or platform LCA?)
- decide refund policy on unpledge (prorate? no refund? current month only?)
- decide platform fee structure (pre-formation, post-formation, or both?)
- decide minimum pledge floor (stripe fees eat small amounts)
- decide if pledges transfer to cell stripe account at formation
- decide: ghost user pledges skip payment collection (flag check on ghost group membership)

what to build:
- stripe checkout for monthly subscriptions
- stripe connect per cell (connected accounts)
- webhook handling for payment lifecycle
- pledge conversion from intent to real subscription at cell trigger
- subscription management (upgrade/downgrade/cancel)

---

## Backlog (in priority order)

### customer discovery (non-code)

not a feature — this is manual work:
- talk to 20 SMBs bleeding on SaaS costs
- get them to submit ideas and pledge
- pattern-match the first cell's problem from conversations
- see /cabal/bizops for the full playbook
- ghost ideas provide conversation starters — "would you pledge to any of these?"

### cell recruitment (non-code)

- find 3–5 product cooperatives to certify (product+design+eng+ops)
- vet manually (interview, portfolio, references)
- create certification checklist
- white-glove onboard the first cell
- see /cabal/bizops for details

### platform entity formation (non-code)

- form LLC or LCA for destroysaas itself
- wyoming filing (~$100), EIN, bank account
- needed before stripe can go live

### cell bidding & selection

- certified cells compete by building working MVPs (not spec decks)
- collective reviews and votes on best MVP
- winning cell earns ongoing maintenance contract + SLA
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
- cell health dashboard (uptime, SLA metrics, cell activity)
- automated cell payments (SLA metrics → auto-approve → auto-pay)
- mobile-optimized views
- public api for cell data
- ghost graduation: sunset ghost pledges as real users replace them

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
- [x] 011 — cell profiles & applications
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
- [x] 024 — rename "dev cells" to "cells" (database + routes + all references)
- [x] 025 — ghost users + sudo impersonation + seed data bootstrap
- [x] 026 — content & messaging (SaaS definition, credit union analogy, /about/philosophy, MVP competition model)
- [x] 027 — soft gate: lobby dashboard + cabal application system
- [x] 028 — redefine cells as full-service product cooperatives
- [x] 029 — lowercase legibility CSS + first-letter anchoring
- [x] 030 — /why page (SMB economics, SaaS cost calculator, industry examples)
- [x] 031 — production hardening (security headers, robots.txt, sitemap, analytics, Resend config)
