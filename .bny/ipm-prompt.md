# README

# destroysass.ai

**the place where small businesses stop renting software and start owning it.**

---

saas is dead. not because ai made software free — it didn't. because the true cost of software
has always been maintaining it in an ever-changing landscape, and that cost just got a lot
more visible.

while the vcs are busy building "app factories" and enterprise it is quietly internalizing
everything behind walled gardens, the small business is left with a choice: keep renting tools
that extract your wealth and give you zero recourse, or figure out a better way.

this is the better way.

---

## what it is

destroysass.ai is a **business portal** where smbs propose software they want to exist, recruit
peers with the same problem, and collectively form **cells** — legally-backed cooperative
entities (lca + dao) that fund, own, and maintain the software together.

the code is open-source. the hosting is collective. the governance is yours.  
you are not a customer. you are a patron-owner.

```
you have a problem
→ you propose it on the board
→ other businesses with the same problem pledge money
→ when the threshold hits, a cell forms
→ a cooperative dev team builds and maintains it under contract
→ you own it. forever.
```

---

## the cell model

a **cell** is a micro-saas cooperative. it has three parts:

| | who | role |
|--|-----|------|
| **founder** | the smb that proposed the idea | founding equity + roadmap steering |
| **members** | co-sponsor smbs | monthly treasury fee + equity + legal standing |
| **dev cell** | vetted developer cooperative | builds and maintains under sla |

cells are governed via a **wyoming lca** (patron-owned cooperative) and a **dao** for
operational voting. all code is agpl/mit. the ip belongs to the lca — not the devs, not the
platform, not some vc.

if the dev cell walks: the lca votes, fires them, and routes the treasury to a new one.  
the software survives the dev cell. that's the point.

---

## the legal angle

in traditional saas, a vendor outage gets you a $12 service credit. you have no recourse.

in a cell, you are a co-owner of the software you run on. when something breaks, you don't
open a ticket — you enforce a contract. the lca gives you standing to sue. you collectively
negotiate as a legal entity, not as atomized individual customers writing into the void.

> the money is in the network and the control, not the code.

---

## the platform

the portal does three things:

1. **the board** — ranked list of proposed software concepts, sorted by committed monthly dollars
2. **the pledge** — stripe/opencollective hook; put money on concepts you care about, held
   in escrow until a cell triggers
3. **the dev marketplace** — certified developer cooperatives apply and bid on triggered cells

---

## docs

- [philosophy](docs/philosophy.md) — why saas is dead and what comes next
- [business model](docs/business-model.md) — how cells work, inventor equity, the lca structure,
  revenue model
- [product vision](docs/product-vision.md) — what the portal looks like, the cell lifecycle,
  mvp, and what success looks like

---

## the stack

- **next.js** — portal frontend
- **supabase** — auth, database, realtime
- **opencollective** — treasury and fiscal hosting
- **wyoming lca** — legal wrapper for cells
- **dao** — governance and voting

---

## status

🔴 early. the portal scaffolding is live at [destroysass.vercel.app](https://destroysass.vercel.app).  
the first cell is being planned. if you're an smb with a software problem you wish a collective
of peers would solve with you — [get in touch](mailto:ara.t.howard@gmail.com).

---

*built by [ara.t.howard](https://github.com/ahoward) and friends.*  
*the code is free. the network is the value.*

---

# Product Vision

# product vision

## what destroysass.ai is

a business portal where smbs propose software they want to exist, recruit peers with the same
problem, form legally-backed cooperative cells to fund it, and collectively own and maintain it
forever.

it is not an app factory. it is not a saas marketplace. it is not a kickstarter for software.

it is the infrastructure for **owning your stack** — with the legal, financial, and operational
rails to make that actually work.

---

## the portal

the minimum viable product is ruthlessly simple: three things, one screen.

### 1. the board

a ranked list of software concepts proposed by real smbs, sorted by **committed monthly dollars**.

- anyone with a verified business account can submit a concept
- concepts are described in plain language: what problem does it solve, who needs it, what would
  you pay monthly to have it maintained and hosted
- the board is public — ranked by how much money is already pledged, not by votes or likes
- "skin in the game" is the only ranking algorithm that matters

### 2. the pledge

a stripe/opencollective hook that lets businesses put money on the line.

- pledge a monthly amount to a concept you care about
- funds are held in escrow until the cell triggers (minimum viable sponsor threshold)
- if the cell never forms, you get your money back
- when the cell triggers: your pledge converts to a monthly treasury contribution and you receive
  your class b shares in the newly-formed lca

### 3. the dev application

a simple form for developer cooperatives to apply for platform certification.

- certified dev cells are vetted for technical competence, cooperative structure, and financial
  responsibility
- when a cell triggers, certified dev cells can submit proposals to build and maintain the stack
- the smb cell selects their dev cell via governed vote
- the selected dev cell is bound by a standard sla contract (exhibit a of the lca operating
  agreement)

---

## the cell lifecycle

```
smb submits idea
      ↓
idea appears on the board
      ↓
other smbs pledge monthly amounts
      ↓
[threshold reached] → cell triggers
      ↓
lca is formed (wyoming) + dao initialized + opencollective treasury activated
      ↓
certified dev cells submit proposals
      ↓
smb cell votes → dev cell selected
      ↓
build begins, funded by treasury
      ↓
launch → ongoing maintenance under sla
      ↓
cell operates indefinitely, self-governed
```

---

## the mvp cell: a knowledge management tool

the first cell destroysass.ai should form:

**concept:** a hosted, self-owned alternative to notion/confluence — graph-based, fast, no
vendor lock-in.

**why it's the right first cell:**
- smbs are drowning in notion/confluence subscription bloat and terrified of their proprietary
  data living on someone else's servers
- it requires persistent hosting, robust maintenance, and zero downtime — proving the dev cell
  model immediately
- the problem is universal enough to attract 10–15 sponsors easily, but specific enough to ship
  a focused v1
- as a knowledge base, it accumulates the most sensitive business data — ownership isn't just
  financial, it's existential

**target sponsors:** 10–15 small agencies, consultancies, or tech-adjacent smbs at $100/mo each  
**initial treasury:** ~$1,000–1,500/mo  
**dev cell scope:** containerized rails/bun app, sqlite backend, hosted on shared infra owned
by the lca

---

## on-brand principles

### the code is free. the network is the value.
all software built through destroysass.ai is open-source. anyone can fork it. but forking the
code doesn't give you the accumulated shared infrastructure, legal standing, trust network, or
running instances. the moat is the network, not the binary.

### owner, not customer
every member of a cell is a co-owner. they have equity, they have a vote, they have a lawyer.
this is the inversion of the saas relationship. you are not a user of someone else's product —
you are an owner of your own.

### the dev cell is labor, not governance
developers build and maintain the stack. they don't own the vision. the smb co-owners govern
direction. this separation is intentional and important — it's the same reason you hire a
contractor to build your house and don't let them decide where your kitchen goes.

### everything is replaceable except the network
the dev cell can be fired. the hosting can be moved. the code can be forked. what cannot be
replaced is the trust network, the shared legal history, and the accumulated maintenance of the
lca. that's the durable value — and it lives with the community, not the vendor.

### small is a feature, not a bug
cells are designed for dozens-to-hundreds of users, not millions. this is a strength. hyper-local
problems get hyper-local solutions. the software for managing green chile supply chains in
albuquerque should be different from the software managing halal meat distribution in dearborn.
one-size-fits-all is the saas disease. custom-fit-for-us is the cure.

---

## what success looks like

**year 1:**
- 5–10 active cells, each with 8–15 smb members
- ~$50–100k annual platform revenue
- a handful of certified dev cells building reputation and recurring income
- the lca boilerplate and onboarding is so smooth that "coop-in-a-box" is a real thing

**year 2:**
- 50+ cells across multiple verticals (knowledge management, team comms, inventory, scheduling)
- cells starting to interoperate — the brane cell talking to the comms cell
- dev cells competing for quality reputation, not just price
- destroysass.ai is the place you go when you've decided saas is not the answer

**year 3:**
- a global dao governing shared protocols
- local lcas franchising core protocol with upstream revenue share
- the corporate saas vendors have a new problem: their smb customers are leaving for software
  they own

---

# Business Model

# business model

## the premise

the era of rent-seeking saas is over. gen-ai didn't drive software to zero; it just shifted the
bottleneck from writing code to untangling a nightmare of api costs, yaml files, and integration
entropy. for smbs, the true cost of software is now 80% maintenance. you aren't paying for the
tool — you're paying to keep the lights on.

destroysass.ai is the commercial portal that capitalizes on this collapse. it is the middle path
for businesses that can't afford enterprise internal dev teams, but refuse to rely on fragile
consumer-grade vibe-code. it sits on top of the **collective software (cs) model** —
opencollective + lca + dao — packaging open-source, dao governance, and legal entity frameworks
into a scalable marketplace.

**the money isn't in the code. it's in the network and the control.**

---

## the cs model (the foundation)

destroysass.ai is a commercial layer built on top of three existing primitives:

- **opencollective** — transparent fundraising, treasury management, and fiscal hosting
- **lca (limited cooperative association)** — legal entity for patron-owners; can sue, sign
  contracts, enforce slas
- **dao (decentralized autonomous organization)** — operational governance, voting, treasury
  smart contracts

together these form the **collective software (cs) model**: a legal and financial structure that
enables groups of businesses to collectively own, fund, and govern shared software.

---

## how it works: the cell

a **cell** is a micro-saas cooperative formed around one specific software need.

example: 10 smbs that all want a hosted, maintained slack alternative they collectively own.

| role | who | what |
|------|-----|------|
| **cell founder** | the smb that proposed the concept | receives founding equity; steers initial roadmap |
| **cell members** | co-sponsor smbs | pay monthly treasury fee; get equity and legal standing |
| **cell developers** | vetted dev cooperative | builds, runs, and maintains the stack under sla |
| **cell governance** | lca + dao | legal entity with teeth; votes on roadmap, funding, and firing |

### the mechanics

1. **the signal** — an smb submits a software concept they desperately need
2. **the syndicate** — other smbs with the same problem vote with their wallets
3. **the trigger** — when enough sponsors align, the cell forms and an lca is incorporated
4. **the build** — vetted developer cooperatives bid to build, run, and maintain the stack
5. **the ownership** — all code is oss. all hosting is collective. governance is lca/dao.

---

## inventor equity

this is the key incentive structure. the smb that proposes a concept doesn't just get the
software — they get **founding equity** that compounds as the network grows.

### the formula (wyoming lca)

- **founding grant:** inventor receives `200,000` class a shares at formation — sweat equity for
  solving the cold-start problem
- **co-sponsor buy-in:** every member joining at the standard monthly fee receives `10,000`
  class b shares
- **recruitment bounty:** inventor earns `+2,000` class a bonus per recruit (first 10 recruits)
- **dilution:** equity is purely percentage-based — the denominator grows as the network grows

### voting

- **months 0–18 (genesis phase):** weighted by share count — inventor steers the ship, prevents
  design-by-committee while mvp stabilizes
- **month 19+ (maintenance phase):** permanently flips to one-member, one-vote

### exit

- lca treasury has **right of first refusal** at 24× monthly recurring treasury
- if declined: shares transfer only to another active patron member within destroysass.ai
- **no external sales** — class b shares freeze and surrender after 60-day grace if a member
  stops paying

---

## the legal angle (the sharpest insight)

in traditional saas, a vendor outage gets you a canned apology and a $12 service credit. you
have no standing.

in the cell model, smbs are **co-owners**. the lca gives them teeth.

- they have **real legal standing** — not just a ticket in a support queue
- they can **enforce slas** against their dev cell via contract
- they can **sue** for violation of terms — the services they're hosting are theirs
- they collectively negotiate as a **legal syndicate**, not as atomized individual customers

> traditional saas: you're a customer. you have no recourse beyond the tos.  
> cell model: you're a co-owner. you have a contract. you have a lawyer. you have standing.

---

## the dev cell layer

the dev cell is **capital vs. labor** — kept deliberately separate from governance.

- dev cooperatives are **independent contractors**, not owners of the lca
- they are bound by a strict **sla** with uptime and bug-resolution metrics
- they access the opencollective treasury monthly, contingent on hitting those metrics
- all code is **agpl/mit** — ip belongs to the lca, not the devs
- if a dev cell abandons the project, the lca votes (simple majority) to sever the contract and
  route the treasury to a new certified dev cell
- the software survives the dev cell. that's the point.

---

## destroysass.ai revenue

destroysass.ai is the marketplace layer. it charges for trust, legal scaffolding, and network access — not code.

| revenue stream | phase | description |
|----------------|-------|-------------|
| **cell formation fee** | 1 | one-time fee for lca incorporation, dao setup, opencollective onboarding ("coop-in-a-box") |
| **premium listing** | 1 | smbs pay to boost idea visibility on the portal board |
| **platform take-rate** | 2 | 5–10% of each cell's monthly treasury |
| **dev cell certification** | 2 | vetting and credentialing developer cooperatives |
| **inter-cell routing** | 3 | micro-transaction fees on cross-cell api calls and data liquidity |

---

## roadmap: phase 1 → 2 → 3

### phase 1: the local syndicate (months 1–6)

goal: prove that local businesses will pay for maintained interconnectivity they own.

- bootstrap with opencollective as fiscal host
- launch first cell around a high-pain, low-complexity problem
- smbs pay monthly sponsorship; devs draw bounties from treasury
- destroysass.ai revenue: formation fees + premium listings

### phase 2: the great decoupling (months 6–12)

goal: scale by separating core protocol from local messy integrations.

- smbs start migrating away from traditional saas into mature cells
- core architectural logic is extracted into isolated, forkable repositories
- local cells become implementations of shared core protocols
- destroysass.ai revenue: platform take-rate clips the ticket on every cell's mrr

### phase 3: dao genesis (year 2+)

goal: autonomous, interoperable cell ecosystem.

- core protocols governed by global dao
- local lcas pay upstream franchise fee to core dao
- cells interoperate via standard protocols — software talking to software
- new cells can form in any geography or vertical, owning local infra
- destroysass.ai revenue: inter-cell economic routing and protocol fees

---

## who this is for

destroysass.ai is explicitly **not** for:

- enterprise (they build internally and hoard it)
- individual consumers (the soup — too chaotic, no maintenance budget)

it is for **smbs** — real small businesses with real shared needs, who:

- are drowning in saas subscription bloat or api cost spirals
- have peers with the same bleeding-neck problem
- would pool $50–200/month each for something solid, owned, and maintained
- want legal recourse, not a service credit

> "saas is dead. went from $480/month on tools to $1,245/month on api costs and 15 hours a week
> fixing yaml files."

that gap is where destroysass.ai lives.

---

# Current Roadmap

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

---

# Current ROADMAP

## IPM: destroysass.ai

---

## Current State

The app is live at destroysass.vercel.app with a functional MVP covering the idea-to-pledge pipeline. What exists:

**Core loop works:** Users can propose ideas, pledge monthly amounts, upvote, comment, and track everything from a dashboard. Ideas auto-progress through statuses (`proposed` → `gaining_traction` → `threshold_reached`) based on pledge thresholds. Admins can trigger cell formation.

**14 pages implemented** across public (landing, ideas board, idea detail, about, dev cells directory, terms, privacy, public profiles) and authenticated (dashboard, profile edit, idea submission, dev cell application, admin panel).

**8 database migrations** covering ideas, pledges, comments, upvotes, dev_cells, profiles, categories, and auto-status triggers.

**Supporting infra:** Resend email notifications, Supabase auth with password reset, RLS policies on all tables, health check script, Vercel deployment.

**Stack:** Next.js 16, React 19, Supabase, Resend, Tailwind CSS 4, TypeScript.

---

## Gaps

Comparing the product vision and business model docs against what's built:

1. **No money moves.** Pledges are tracked numbers in a database. No Stripe integration, no escrow, no real financial commitment. The entire business model depends on "skin in the game" — without real payments, the board is a wishlist, not a syndicate.

2. **Cell formation is a button, not a workflow.** Admin clicks "trigger" and the status changes. There's no LCA incorporation, no DAO initialization, no OpenCollective treasury activation, no dev cell bidding process. The cell lifecycle diagram from the product vision is 90% unbuilt.

3. **No governance.** Zero voting mechanics. The business model specifies weighted voting in genesis phase, one-member-one-vote in maintenance phase, equity classes (A/B shares), and DAO governance. None of this exists.

4. **Dev cells can list but can't do anything.** They apply, get approved, appear on a page. But there's no mechanism for them to bid on triggered cells, no SLA contract structure, no treasury access, no assignment workflow.

5. **No inter-cell anything.** The phase 3 vision of cells talking to cells, protocol fees, and cross-cell API routing has no foundation.

6. **Business identity is unverified.** The platform is "for SMBs" but there's no business verification. Anyone with an email can propose and pledge. There's no distinction between a real small business and a random person.

7. **No data export or fork freedom.** The philosophy promises "you can always take your code and leave" but there's no export mechanism for ideas, pledges, or cell data.

8. **Notification preferences don't exist.** Emails fire on events with no way to opt out beyond a placeholder unsubscribe link that goes to /dashboard.

9. **No real onboarding.** New users land on the homepage but there's no guided flow explaining how to participate, what pledging means, or what happens next.

10. **Search is page-level only.** The ideas board has filters but there's no global search across ideas, dev cells, or profiles.

---

## Proposed Features (prioritized)

### 1. Stripe Integration — Real Pledges
- **Priority:** P0
- **Description:** Connect Stripe to convert pledges from tracked commitments to real payment intents held until cell formation. On trigger, convert to live subscriptions. Refund if cell never forms.
- **Rationale:** Without real money, the platform has no credibility and no revenue path. This is the single biggest gap between "demo" and "viable product." Unblocks cell formation fee revenue (phase 1 business model) and makes the board meaningful.

### 2. Cell Formation Workflow
- **Priority:** P0
- **Description:** When admin triggers cell formation, execute a multi-step workflow: create an OpenCollective collective for the cell, generate LCA formation documents (template-based), notify all stakeholders with next steps, open the cell for dev cell bids, and track the cell as a first-class entity with its own page (`/cells/[id]`).
- **Rationale:** This is the product. Everything before cell formation is lead generation; everything after is the actual value proposition. Without this, the platform is just an idea board with a payment form.

### 3. Dev Cell Bidding on Triggered Cells
- **Priority:** P1
- **Description:** When a cell triggers, certified dev cells can submit proposals (scope, timeline, monthly maintenance cost) visible to cell members. Cell members vote to select a dev cell. Selected dev cell is bound to the cell with SLA terms displayed on the cell page.
- **Rationale:** Directly follows cell formation. The dev marketplace is a core revenue stream (certification fees) and the mechanism that turns funded ideas into running software. Without bidding, certified dev cells have no purpose.

### 4. Cell Member Voting
- **Priority:** P1
- **Description:** Implement basic governance: cell members can vote on proposals (starting with dev cell selection). Genesis phase uses pledge-weighted voting. Display vote tallies, quorum requirements, and outcomes on the cell page.
- **Rationale:** Voting is the governance primitive that makes cells cooperatives rather than crowdfunding campaigns. Required for dev cell selection, roadmap decisions, and eventually firing underperforming dev cells — all core to the business model.

### 5. Business Verification
- **Priority:** P1
- **Description:** Add a business profile layer: business name, EIN/registration number, website, industry. Use a lightweight verification flow (manual admin review initially). Verified businesses get a badge. Gate cell membership (not pledging) behind verification.
- **Rationale:** The platform is explicitly for SMBs, not individuals. Without verification, there's no trust layer and no basis for forming legal cooperatives. LCA membership requires identified business entities.

### 6. Cell Dashboard & Pages
- **Priority:** P1
- **Description:** Create `/cells` listing active/forming cells and `/cells/[id]` showing cell details: members, treasury status, dev cell assignment, SLA metrics, governance history, and code repository link. This is the post-formation command center.
- **Rationale:** Once cells form, members need a place to manage them. Currently there's nowhere to go after cell formation — the idea page just says "cell_forming" with no next step.

### 7. Notification Preferences
- **Priority:** P2
- **Description:** Add a `/dashboard/notifications` page where users can toggle email notifications per event type (new pledge, status change, comments, cell formation). Store preferences in a `notification_preferences` table. Respect preferences in `lib/email.ts` before sending.
- **Rationale:** Legal compliance (CAN-SPAM requires real unsubscribe) and user trust. The current placeholder unsubscribe link is a liability. Blocking requirement before scaling email volume.

### 8. Data Export
- **Priority:** P2
- **Description:** Add "export my data" button on dashboard that generates a JSON/CSV download of user's ideas, pledges, comments, and profile. For cells: export cell membership roster, treasury history, and codebase link.
- **Rationale:** Fork freedom is a core philosophical promise. GDPR compliance requires data portability. This is cheap to build and high-signal for trust.

### 9. Guided Onboarding Flow
- **Priority:** P2
- **Description:** After first sign-up, show a 3-step onboarding modal: (1) explain the model in 30 seconds, (2) prompt to browse the board or submit an idea, (3) prompt to complete their profile. Track onboarding completion in profiles table.
- **Rationale:** Current new-user experience is cold — sign up, land on homepage, figure it out. Conversion from sign-up to first pledge/idea will be low without guidance. Low effort, high impact on activation.

### 10. Idea Milestones & Progress Transparency
- **Priority:** P2
- **Description:** Add configurable milestones to ideas beyond the current $300/$1000 thresholds. Show a timeline on the idea detail page: created → first pledge → 25% → 50% → threshold → cell forming → dev selected → launched. Auto-post milestone events as system comments.
- **Rationale:** Pledgers need to see momentum. A static progress bar isn't enough — people want to see the story of an idea gaining traction. This drives sharing ("we just hit 50%!") and re-engagement from dormant pledgers.

---

# Shipped: 001-landing-page-and-brand

# Feature Spec: 001 — Landing Page + Brand

## Summary

Replace the default Next.js + Supabase boilerplate homepage with a branded landing page that
communicates the destroysass.ai vision clearly and compellingly. The page must work for both
anonymous and authenticated visitors.

## Context

The app currently shows a generic "Welcome. You can use this app without signing in..." page.
This communicates nothing about what destroysass.ai is. The brand voice is: lowercase, direct,
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
- Left: `destroysass` in red
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
- Links: GitHub (https://github.com/ahoward/destroysass) | Docs (links to docs/ directory on github)

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

- [ ] `https://destroysass.vercel.app/` loads with 200 (no 500)
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

# Shipped: 002-idea-board-list

# Feature Spec: 002 — Idea Board (List Page + Database Schema)

## Summary

Create the `ideas` database table in Supabase and a public `/ideas` page that displays
submitted software concepts ranked by total pledged amount.

## Database Schema

### ideas table

```sql
create table ideas (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  problem     text not null,
  monthly_ask integer not null default 50,  -- what submitter would pay/mo (USD)
  created_by  uuid references auth.users(id) on delete set null,
  status      text not null default 'proposed'
                check (status in ('proposed', 'gaining_traction', 'threshold_reached', 'cell_forming', 'active', 'cancelled')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
```

### pledges table

```sql
create table pledges (
  id             uuid primary key default gen_random_uuid(),
  idea_id        uuid not null references ideas(id) on delete cascade,
  user_id        uuid not null references auth.users(id) on delete cascade,
  amount_monthly integer not null default 50,  -- USD per month
  created_at     timestamptz not null default now(),
  unique (idea_id, user_id)  -- one pledge per user per idea
);
```

### RLS policies

```sql
-- ideas: public read, auth write
alter table ideas enable row level security;
create policy "ideas are publicly readable"
  on ideas for select using (true);
create policy "authenticated users can insert ideas"
  on ideas for insert with check (auth.uid() = created_by);
create policy "idea owners can update their own ideas"
  on ideas for update using (auth.uid() = created_by);

-- pledges: public read (counts), auth write
alter table pledges enable row level security;
create policy "pledges are publicly readable"
  on pledges for select using (true);
create policy "authenticated users can pledge"
  on pledges for insert with check (auth.uid() = user_id);
create policy "users can delete their own pledges"
  on pledges for delete using (auth.uid() = user_id);
```

### View for sorted board

```sql
create or replace view idea_board as
select
  i.*,
  coalesce(sum(p.amount_monthly), 0) as total_pledged,
  count(p.id) as pledge_count
from ideas i
left join pledges p on p.idea_id = i.id
group by i.id
order by total_pledged desc, i.created_at desc;
```

## Seed Data

Insert 3 seed ideas so the board isn't empty on first load:

1. "a slack replacement we actually own" — $150/mo ask
2. "a notion/confluence alternative with no vendor lock-in" — $100/mo ask
3. "a shared calendar + scheduling tool for small teams" — $75/mo ask

## `/ideas` Page

### Route: `app/ideas/page.tsx`

Server component. Fetches from `idea_board` view via Supabase server client.

### Layout

- Same nav as homepage (reuse the nav pattern — auth state)
- Page title: "the board"
- Subtitle: "ranked by committed monthly dollars. skin in the game is the only algorithm."
- List of idea cards (see below)
- Empty state if no ideas

### Idea Card

Each card shows:
- Title (large, bold)
- Problem statement (truncated to 2 lines)
- Monthly ask badge: "submitter pays $X/mo"
- Total pledged: large number, red accent — "$Y/mo pledged"
- Pledge count: "N sponsors"
- Status badge (proposed / gaining_traction / threshold_reached / etc.)
- "pledge →" link (links to `/ideas/[id]` — placeholder for now)

### Sort

Default: `total_pledged DESC`, then `created_at DESC`

### Empty State

If no ideas: show "no ideas yet. be the first." with a link to `/ideas/new`.

## Nav on `/ideas`

Same pattern as homepage: reuse the nav component logic. Since we can't extract to a shared
component without adding complexity, just duplicate the nav markup from `app/page.tsx` for now.

## Technical Requirements

- New file: `app/ideas/page.tsx`
- No new npm dependencies
- Supabase queries use server client (`lib/supabase/server.ts`)
- SQL migration needs to be applied to Supabase project `bjaejvgoifgdanwvglnv` manually
  (see migration file at `supabase/migrations/001_initial_schema.sql`)
- Landing page "browse existing ideas" link (`/ideas`) should now work
- Mobile responsive

## Out of Scope

- Idea detail page (`/ideas/[id]`)
- Actual pledge form
- Idea submission form

## Acceptance Criteria

- [ ] `ideas` and `pledges` tables exist in Supabase with correct schema
- [ ] RLS policies applied (public read, auth write)
- [ ] `idea_board` view exists and returns correct ranked data
- [ ] Seed data inserted (3 ideas)
- [ ] `/ideas` page loads with 200
- [ ] Page shows idea cards sorted by total_pledged
- [ ] Empty state works if no ideas
- [ ] Nav shows correct auth state
- [ ] Landing page "browse existing ideas" link navigates to `/ideas` correctly
- [ ] `./dev/health` returns ok

---

# Shipped: 003-idea-submission-form

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

---

# Shipped: 004-pledge-mechanic-and

# Feature Spec: 004 — Pledge Mechanic + Idea Detail Page

## Summary

Build the idea detail page (`/ideas/[id]`) and the pledge mechanic. Authenticated users can
pledge a monthly amount to an idea. Pledges are tracked (not charged — no Stripe yet). The
board updates to reflect new pledge totals in real time.

## Routes

- `app/ideas/[id]/page.tsx` — server component, idea detail + pledge form
- `app/ideas/[id]/actions.ts` — server actions: pledgeIdea, unpledgeIdea

## Idea Detail Page (`/ideas/[id]`)

### Header
- Back link: `← the board` (links to /ideas)
- Nav: same pattern (auth state)

### Idea content
- Title (large, bold)
- Status badge
- Full description
- "the problem:" section with problem text
- "submitter asks $X/mo to maintain and host this"

### Pledge panel (right side or below on mobile)

**If not authenticated:**
- "sign in to pledge →" button → `/auth?next=/ideas/[id]`

**If authenticated + not yet pledged:**
- Number input: "pledge $[amount]/mo" (default $50, min $25, max $500, step $25)
- Submit button: "pledge →"
- Helper text: "no charges yet — this is a commitment, not a payment"

**If authenticated + already pledged:**
- Shows: "you're pledged at $X/mo"
- "withdraw pledge" button (danger/muted styling)
- Helper text: "withdrawing removes your commitment"

### Pledge summary bar
Always visible:
- "$Y/mo pledged total from N sponsors"
- Progress bar toward threshold ($1,000/mo default)
- "X% of the way to forming a cell"

## Server Actions

### pledgeIdea(ideaId, amount)
1. auth check — return error if no user
2. validate amount: integer, 25 ≤ amount ≤ 500
3. upsert into pledges (unique constraint = update if exists)
4. revalidatePath("/ideas") + revalidatePath(`/ideas/${ideaId}`)
5. return success

### unpledgeIdea(ideaId)
1. auth check
2. delete from pledges where idea_id = ideaId and user_id = user.id
3. revalidatePath both paths
4. return success

## Security

- All mutations require auth (server-side check, not just UI gate)
- pledge amount validated server-side: integer, 25–500
- user can only pledge once per idea (upsert handles this)
- user can only withdraw their own pledge (user_id check)

## Acceptance Criteria

- [ ] `/ideas/[id]` loads for all ideas
- [ ] `/ideas/bogus-id` returns 404 (not 500)
- [ ] anon user sees "sign in to pledge" button
- [ ] authenticated user sees pledge form
- [ ] submitting pledge updates total on board and detail page
- [ ] already-pledged user sees current pledge amount + withdraw button
- [ ] withdraw removes pledge and updates total
- [ ] progress bar shows % toward $1,000 threshold
- [ ] idea cards on `/ideas` now link to `/ideas/[id]` (they already do from 002)
- [ ] `./dev/health` returns ok

---

# Shipped: 005-user-dashboard-ideas

# Feature Spec: 005 — User Dashboard

## Summary

Build `/dashboard` — an authenticated view showing a user's submitted ideas and active pledges.
Gives users a single place to track what they've proposed and what they've committed money to.

## Auth Gate

Unauthenticated users are redirected to `/auth?next=/dashboard`.

## Route

`app/dashboard/page.tsx` — server component

## Sections

### Header
- Nav (same pattern)
- Title: "your dashboard"
- Subtitle: user's email

### My Ideas

Fetches `ideas` where `created_by = user.id`, ordered by `created_at DESC`.

Each row shows:
- Title (links to `/ideas/[id]`)
- Status badge
- Total pledged (from `idea_board` view)
- Pledge count
- "view →" link

Empty state: "you haven't submitted any ideas yet. [submit one →](/ideas/new)"

### My Pledges

Fetches all pledges for the current user, joined with idea title and total_pledged.

Each row shows:
- Idea title (links to `/ideas/[id]`)
- "you pledged $X/mo"
- Total pledged across all sponsors
- Status badge
- "withdraw" button → calls `unpledgeIdea` server action (reuse from 004)

Empty state: "you haven't pledged to any ideas yet. [browse the board →](/ideas)"

### Monthly Commitment Summary

At top of pledges section:
- "you're committed to $Y/mo total across N ideas"
- This is the sum of all active pledges

## Acceptance Criteria

- [ ] `/dashboard` redirects anon to `/auth?next=/dashboard`
- [ ] shows my submitted ideas with stats
- [ ] shows my active pledges with totals
- [ ] withdraw button works (reuses 004 action)
- [ ] monthly total is correct
- [ ] empty states render correctly
- [ ] nav link to /dashboard added to nav bar (when logged in)
- [ ] `./dev/health` returns ok

---

# Shipped: 006-cell-formation-admin

# Feature Spec: 006 — Cell Formation (Admin Trigger + Status Transitions)

## Summary

Build a simple admin panel at `/admin` that shows ideas at or above the pledge threshold
($1,000/mo by default) and allows an admin to trigger cell formation. This advances the idea
status to `cell_forming` and marks it as "closed for new pledges."

Also: automatic status progression — when total_pledged hits $1,000, idea status auto-upgrades
from `proposed` → `gaining_traction` → `threshold_reached` via a database function.

## Admin Auth

Simple: check if `user.email` is in a hardcoded admin list (just `ara.t.howard@gmail.com` for now).
If not admin: return 404 (don't even reveal the page exists).

## Routes

- `app/admin/page.tsx` — admin dashboard
- `app/admin/actions.ts` — triggerCellFormation server action

## Database: Auto Status Progression

Add a Postgres function + trigger that automatically updates idea status based on total_pledged:

```sql
-- function to update idea status based on pledge total
create or replace function update_idea_status()
returns trigger as $$
declare
  total integer;
begin
  select coalesce(sum(amount_monthly), 0) into total
  from pledges where idea_id = NEW.idea_id;

  update ideas set
    status = case
      when total >= 1000 then 'threshold_reached'
      when total >= 300  then 'gaining_traction'
      else 'proposed'
    end,
    updated_at = now()
  where id = NEW.idea_id
    and status not in ('cell_forming', 'active', 'cancelled');

  return NEW;
end;
$$ language plpgsql security definer;

-- trigger fires after every pledge insert or delete
create trigger pledge_status_trigger
after insert or delete on pledges
for each row execute function update_idea_status();
```

## Admin Page (`/admin`)

Shows two sections:

### 1. Ready to Form (threshold_reached)
Ideas with status = `threshold_reached`. For each:
- Title, total pledged, pledge count, created date
- "Trigger Cell Formation →" button

### 2. All Ideas (status overview)
Quick table of all ideas: title, status, total_pledged, pledge_count.
Useful for monitoring.

## Server Action: triggerCellFormation(ideaId)

1. Admin auth check (email in allowlist)
2. Fetch idea — verify status is `threshold_reached`
3. Update status to `cell_forming`
4. Update `updated_at`
5. revalidatePath("/ideas"), revalidatePath("/admin"), revalidatePath(`/ideas/${ideaId}`)
6. Return success

## Status Badge Updates

Update all status badge color maps across the app to include `cell_forming` with a distinct color
(blue/purple — "something exciting is happening").

## Acceptance Criteria

- [ ] Pledge trigger: adding a pledge that pushes total ≥ $300 changes status to `gaining_traction`
- [ ] Pledge trigger: adding a pledge that pushes total ≥ $1,000 changes status to `threshold_reached`
- [ ] `/admin` returns 404 for non-admin users
- [ ] `/admin` shows ideas at threshold with "Trigger" button
- [ ] triggerCellFormation changes status to `cell_forming`
- [ ] Idea board and detail page reflect new status immediately
- [ ] `./dev/health` returns ok

---

# Shipped: 007-about-faq-seo

# Feature Spec: 007 — About Page, FAQ, and SEO/OG Meta

## Summary

Add an `/about` page explaining the destroysass model, a FAQ section answering common questions,
and proper OpenGraph + SEO meta tags across all pages for social sharing.

## Routes

- `app/about/page.tsx` — about + FAQ page

## About Page Sections

### 1. The Problem
- SaaS vendors raise prices, change terms, get acquired, shut down
- SMBs have zero legal recourse and no ownership
- AI made building cheaper but maintenance is still 80% of TCO

### 2. The Model
- Businesses collectively fund software they need
- A vetted developer cooperative builds and maintains it
- Code is open-source, data belongs to the collective
- Legal structure: LCA/DAO hybrid — real legal standing
- Original idea submitter gets revenue share if the cell scales

### 3. How Cells Work
- Idea → pledges → threshold ($1,000/mo) → cell formation
- Cell = a funded development + maintenance contract
- Members have voting rights proportional to their pledge
- Fork freedom: you can always take the code and leave

### 4. FAQ
- "What if I want to leave?" — fork freedom, take your data
- "Who builds it?" — vetted developer cooperatives
- "What's the legal structure?" — LCA/DAO, enforceable contracts
- "Can I increase/decrease my pledge?" — yes, until cell forms
- "What happens after cell formation?" — dev begins, regular updates, member votes
- "Is the code really open source?" — yes, always, that's the point
- "What if no one pledges my idea?" — it stays visible, you can share it

## SEO / OpenGraph

Add to `app/layout.tsx` metadata export:
- title: "destroysass — own the software you use"
- description: "Small businesses collectively fund, own, and control the software they depend on. No more SaaS rent."
- og:image: generate a simple OG image or use a static one
- og:type: website
- twitter:card: summary_large_image

Per-page titles:
- /ideas: "ideas — destroysass"
- /ideas/[id]: "{idea.title} — destroysass"
- /about: "about — destroysass"
- /dashboard: "dashboard — destroysass"
- /admin: "admin — destroysass"

## Acceptance Criteria

- [ ] `/about` renders with all sections and FAQ
- [ ] Layout metadata includes OG tags
- [ ] Each page has a unique title
- [ ] `./dev/health` returns ok

---

# Shipped: 010-010-email-notifications

# Feature Spec: 010 — Email Notifications via Resend

## Summary

Integrate Resend for transactional email. Notify users when meaningful events happen:
new pledges on their ideas, status changes, cell formation triggers.

## Dependencies

- `resend` npm package
- RESEND_API_KEY environment variable (Vercel + .envrc)
- Resend account + verified sending domain (or use onboarding domain)

## Events That Trigger Email

### 1. New Pledge Notification (to idea creator)
- **When**: someone pledges to an idea
- **To**: idea creator's email
- **Subject**: "someone pledged ${amount}/mo to your idea: {title}"
- **Body**: pledge amount, new total, pledger count, link to idea

### 2. Status Change Notification (to all pledgers)
- **When**: idea status changes (gaining_traction, threshold_reached, cell_forming)
- **To**: all users who pledged to this idea
- **Subject**: "your idea '{title}' is now {status_label}"
- **Body**: new status explanation, current total, link to idea

### 3. Cell Formation Trigger (to all pledgers + creator)
- **When**: admin triggers cell formation
- **To**: all pledgers + idea creator
- **Subject**: "cell forming: {title}"
- **Body**: congratulations, what happens next, link to idea

## Implementation

### lib/email.ts
- `sendEmail(to, subject, html)` — wraps Resend API
- `notifyNewPledge(ideaId, pledgerId, amount)` — fetches idea + creator, sends email
- `notifyStatusChange(ideaId, newStatus)` — fetches pledgers, sends batch
- `notifyCellFormation(ideaId)` — fetches all stakeholders, sends batch

### Email Templates
- Inline HTML (no external templates for simplicity)
- Dark theme matching the app (black bg, white text, red-600 accents)
- Unsubscribe link at bottom (placeholder — just links to /dashboard for now)
- Clean, minimal — no images, no heavy formatting

### Integration Points
- `app/ideas/[id]/actions.ts` — after successful pledge, call `notifyNewPledge`
- `supabase/migrations/002_pledge_trigger.sql` — DB trigger handles status changes;
  we'll add a Supabase webhook or check status in the pledge action instead
- `app/admin/actions.ts` — after triggerCellFormation, call `notifyCellFormation`

### Status Change Detection
Since the DB trigger updates status automatically, we need to detect the change.
Approach: in the pledgeIdea action, check the idea status before and after the pledge.
If it changed, fire notifyStatusChange.

## Acceptance Criteria

- [ ] New pledge → creator gets email with pledge details
- [ ] Status change → all pledgers get email
- [ ] Cell formation → all stakeholders get email
- [ ] Emails render correctly (dark theme, minimal)
- [ ] Missing RESEND_API_KEY → graceful no-op (log warning, don't crash)
- [ ] `./dev/health` returns ok

---

# Shipped: 011-011-dev-cell

# Feature Spec: 011 — Dev Cell Profiles & Applications

## Summary

Developer cooperatives ("dev cells") can apply to be listed on destroysass. Once certified
by an admin, they appear on `/dev-cells` with a public profile. When cells form around
funded ideas, certified dev cells can be assigned to build them.

## Routes

- `app/dev-cells/page.tsx` — public listing of certified dev cells
- `app/dev-cells/apply/page.tsx` — application form (requires auth)
- `app/admin/page.tsx` — add dev cell application review section

## Database

### Table: dev_cells

```sql
create table if not exists dev_cells (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  description  text not null,
  website      text,
  skills       text[] not null default '{}',
  contact_email text not null,
  status       text not null default 'pending'
                 check (status in ('pending', 'approved', 'rejected')),
  applied_by   uuid references auth.users(id) on delete set null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- RLS
alter table dev_cells enable row level security;
create policy "dev_cells_public_read" on dev_cells for select using (status = 'approved');
create policy "dev_cells_auth_insert" on dev_cells for insert with check (auth.uid() = applied_by);
```

## Dev Cells Public Page (`/dev-cells`)

- Lists all approved dev cells with: name, description, skills tags, website link
- Clean card layout, dark theme
- CTA: "apply to become a certified dev cell" → `/dev-cells/apply`

## Application Form (`/dev-cells/apply`)

- Auth required
- Fields: cooperative name, description, website (optional), skills (multi-select or comma-separated), contact email
- On submit: creates dev_cells row with status='pending'
- Success message: "your application is under review"
- Prevent duplicate applications: one pending application per user

## Admin Review (in `/admin`)

- New section: "dev cell applications" — shows all pending dev_cells
- For each: name, description, website, skills, contact email
- Approve button → sets status='approved'
- Reject button → sets status='rejected'
- Use service role client for admin mutations

## Acceptance Criteria

- [ ] `/dev-cells` shows approved dev cells
- [ ] `/dev-cells/apply` lets authenticated users apply
- [ ] Duplicate pending applications prevented
- [ ] Admin can approve/reject from `/admin`
- [ ] Approved cells appear on public page
- [ ] `./dev/health` returns ok

---

# Shipped: 012-012-idea-comments

# Feature Spec: 012 — Idea Comments & Discussion

## Summary

Add a comment/discussion thread to each idea page. Users can discuss concepts,
ask questions, share refinements, and build consensus before pledging.

## Database

```sql
create table if not exists comments (
  id         uuid primary key default gen_random_uuid(),
  idea_id    uuid not null references ideas(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  body       text not null,
  created_at timestamptz not null default now()
);

alter table comments enable row level security;
create policy "comments_public_read" on comments for select using (true);
create policy "comments_auth_insert" on comments for insert with check (auth.uid() = user_id);
create policy "comments_owner_delete" on comments for delete using (auth.uid() = user_id);
```

Apply via Management API:
```
SUPABASE_ACCESS_TOKEN=sbp_7053248c464aee5969ede7606a8ec1e45fd5339f
curl -X POST https://api.supabase.com/v1/projects/bjaejvgoifgdanwvglnv/database/query \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "<SQL>"}'
```

## Routes

- `app/ideas/[id]/page.tsx` — add comments section below pledge panel
- `app/ideas/[id]/comments.tsx` — client component: comment list + form
- `app/ideas/[id]/actions.ts` — add `postComment` and `deleteComment` server actions

## Comment Display

- Below the pledge panel on /ideas/[id]
- Newest first
- Each comment: display name (email prefix before @), body, relative time
- Delete button on own comments (small "×" icon)
- Comment form: textarea + submit button, auth required
- Non-auth users see "sign in to join the discussion"

## Validation

- body: min 1 char, max 2000 chars, trimmed
- idea must exist
- user must be authenticated

## Acceptance Criteria

- [ ] Comments display on idea detail page
- [ ] Authenticated users can post comments
- [ ] Users can delete their own comments
- [ ] Non-auth users see sign-in prompt
- [ ] `./dev/health` returns ok

---

# Shipped: 013-stats-sharing

# Feature Spec: 013 — Public Stats & Social Sharing

## Summary

Add a public stats section to the landing page showing platform traction
(total ideas, total pledged, total sponsors). Add social sharing buttons
to idea detail pages so users can share ideas on Twitter/LinkedIn.

## Stats Section (landing page)

Add a stats bar above the CTA on the landing page:
- Total ideas submitted
- Total monthly $ pledged across all ideas
- Total unique sponsors (pledgers)

Fetch from idea_board view server-side. Display as 3 big numbers in a row.

## Social Sharing (idea detail page)

Add share buttons to /ideas/[id]:
- "Share on X" — opens Twitter intent with idea title + URL
- "Share on LinkedIn" — opens LinkedIn share with idea URL
- "Copy link" — copies the idea URL to clipboard

Share buttons sit below the idea description, above the pledge bar.

Twitter intent: `https://twitter.com/intent/tweet?text={title}&url={url}`
LinkedIn: `https://www.linkedin.com/sharing/share-offsite/?url={url}`

## Files

| File | Action |
|------|--------|
| `app/page.tsx` | modify — add stats section |
| `app/ideas/[id]/share_buttons.tsx` | create — client component for share buttons |
| `app/ideas/[id]/page.tsx` | modify — add ShareButtons component |

## Acceptance Criteria

- [ ] Landing page shows live stats (ideas, pledged, sponsors)
- [ ] Idea detail page has share buttons (Twitter, LinkedIn, copy link)
- [ ] Share links open correct URLs with idea title and link
- [ ] Copy link works and shows confirmation
- [ ] `./dev/health` returns ok

---

# Shipped: 014-polish

# Feature Spec: 014 — Polish & UX Improvements

## Summary

Quality-of-life improvements: custom 404 page, loading skeletons, password reset
flow, and a footer component shared across all pages.

## Custom 404 Page

- `app/not-found.tsx` — branded 404 with link back to home and ideas
- Dark theme, minimal, "this page doesn't exist" messaging

## Shared Footer

- Create `app/components/footer.tsx` — shared footer component
- Links: home, ideas, about, dev cells, github
- "the code is free. the network is the value." tagline
- Add to all pages (or layout.tsx)

## Password Reset

- Check if Supabase auth already handles /auth?mode=forgot
- If not: add "forgot password?" link on /auth page
- Use `supabase.auth.resetPasswordForEmail(email)` 
- Confirmation message: "check your email for a reset link"

## Loading States

- `app/ideas/loading.tsx` — skeleton loading for ideas board
- `app/ideas/[id]/loading.tsx` — skeleton for idea detail
- Simple gray pulsing boxes matching the layout

## Acceptance Criteria

- [ ] 404 page renders with branding
- [ ] Footer appears on all pages
- [ ] Password reset flow works
- [ ] Loading skeletons show during navigation
- [ ] `./dev/health` returns ok

---

# Shipped: 015-categories

# Feature Spec: 015 — Idea Categories

## Summary

Add categories to ideas so users can browse by type (e.g., "communication",
"project management", "analytics", "devtools", "finance"). Categories are
predefined (not user-created) to keep things clean.

## Database

Add `category` column to ideas table:

```sql
alter table ideas add column if not exists category text not null default 'other'
  check (category in ('communication','project-management','analytics','devtools','finance','marketing','hr','operations','other'));
```

Apply via Management API.

## Changes

### Idea Submission Form (`/ideas/new`)
- Add category dropdown (required, default "other")
- Options: communication, project management, analytics, devtools, finance, marketing, hr, operations, other

### Idea Board (`/ideas`)
- Add category filter to IdeasFilter component
- Show category tag on each idea card

### Idea Detail (`/ideas/[id]`)
- Show category tag next to status badge

### idea_board View
The view includes `i.*` so the new column will be included automatically.

## Acceptance Criteria

- [ ] New ideas require a category
- [ ] Ideas board can be filtered by category
- [ ] Category shows on idea cards and detail page
- [ ] Existing ideas default to "other"
- [ ] `./dev/health` returns ok

---

# Shipped: 016-upvotes

# Feature Spec: 016 — Idea Upvotes

## Summary

Add a lightweight upvote mechanic to ideas. Unlike pledges (which are monetary
commitments), upvotes are free signals of interest. "I want this to exist."
This helps ideas gain visibility before they attract pledges.

## Database

```sql
create table if not exists upvotes (
  id         uuid primary key default gen_random_uuid(),
  idea_id    uuid not null references ideas(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (idea_id, user_id)
);

alter table upvotes enable row level security;
create policy "upvotes_public_read" on upvotes for select using (true);
create policy "upvotes_auth_insert" on upvotes for insert with check (auth.uid() = user_id);
create policy "upvotes_owner_delete" on upvotes for delete using (auth.uid() = user_id);
```

Update idea_board view to include upvote_count:
```sql
create or replace view idea_board as
select
  i.*,
  coalesce(sum(p.amount_monthly), 0) as total_pledged,
  count(distinct p.id) as pledge_count,
  count(distinct u.id) as upvote_count
from ideas i
left join pledges p on p.idea_id = i.id
left join upvotes u on u.idea_id = i.id
group by i.id
order by total_pledged desc, i.created_at desc;
```

## Changes

### Idea Detail (`/ideas/[id]`)
- Upvote button: "▲ {count}" — toggle (click to upvote, click again to remove)
- Show upvote count next to pledge count
- Creator cannot upvote own idea (or maybe they can — keep it simple, allow it)

### Idea Board (`/ideas`)
- Show upvote count on each card (small "▲ {n}" next to sponsors count)
- Add "most upvoted" sort option to IdeasFilter

### Server Actions
- `upvoteIdea(ideaId)` — insert upvote (or remove if already upvoted = toggle)
- Auth required

## Acceptance Criteria

- [ ] Upvote button on idea detail page
- [ ] Upvote count on idea cards
- [ ] Toggle behavior (upvote/un-upvote)
- [ ] "most upvoted" sort option
- [ ] `./dev/health` returns ok

---

# Shipped: 017-dashboard-stats

# Feature Spec: 017 — Enhanced Dashboard with Stats

## Summary

Upgrade the user dashboard with personal stats, idea performance metrics,
and activity feed. Make it the command center for engaged users.

## Dashboard Sections

### 1. Personal Stats Bar
- Total monthly pledges you've made
- Number of ideas you've submitted
- Number of ideas you've pledged to
- Total upvotes received across your ideas

### 2. Your Ideas (enhanced)
- Show each idea with: title, status, total pledged, pledge count, upvote count, comment count
- Progress bar toward threshold
- Sort by most pledged

### 3. Your Pledges (enhanced)
- Show each pledge with: idea title, your monthly amount, idea status, idea total
- Total monthly commitment at top

### 4. Activity Feed
- Recent activity on your ideas: new pledges, new comments, status changes
- Simple reverse-chronological list
- "3 hours ago: someone pledged $50/mo to your idea 'slack replacement'"

## Files

| File | Action |
|------|--------|
| `app/dashboard/page.tsx` | modify — add stats bar, enhance idea/pledge sections |
| `app/dashboard/activity.tsx` | create — activity feed component |

## Notes

- Activity feed: query recent pledges + comments on user's ideas
- No new tables needed — join existing data
- All server-side fetched

## Acceptance Criteria

- [ ] Stats bar shows personal metrics
- [ ] Ideas section shows rich data with progress bars
- [ ] Pledges section shows totals
- [ ] Activity feed shows recent events
- [ ] `./dev/health` returns ok

---

# Shipped: 018-admin-analytics

# Feature Spec: 018 — Admin Analytics Dashboard

## Summary

Enhance the admin panel with platform-wide analytics: growth metrics, top ideas,
pledge trends, user engagement stats. Give the admin a bird's-eye view of platform health.

## Admin Analytics Section (in `/admin`)

### Platform Overview
- Total users (count from auth.users via service role)
- Total ideas submitted
- Total monthly pledged (sum across all ideas)
- Total upvotes
- Total comments
- Dev cells: approved / pending / rejected counts

### Top Ideas
- Top 5 ideas by pledged amount
- Top 5 ideas by upvote count
- Recently active ideas (most recent comments/pledges)

### Growth Indicators
- Ideas submitted this week vs last week
- Pledges this week vs last week
- New users this week (if available from auth.users created_at)

## Files

| File | Action |
|------|--------|
| `app/admin/page.tsx` | modify — add analytics section at top |
| `app/admin/actions.ts` | modify — add getAnalytics server function if needed |

## Notes

- Use service role client for auth.users count
- All other data from public tables/views
- Keep it simple — numbers + simple lists, no charts

## Acceptance Criteria

- [ ] Admin page shows platform overview stats
- [ ] Top ideas by pledges and upvotes shown
- [ ] Growth indicators present
- [ ] `./dev/health` returns ok

---

# Shipped: 019-legal-email-verify

# Feature Spec: 019 — Terms of Service, Privacy Policy, Email Verification

## Summary

Add legal pages (ToS, Privacy) and encourage email verification for trust.
These are table-stakes for any platform handling user data and money commitments.

## Routes

- `app/terms/page.tsx` — Terms of Service
- `app/privacy/page.tsx` — Privacy Policy

## Terms of Service

Key sections:
- Platform purpose: collective software funding
- Pledges are non-binding commitments (not charges) until cell formation
- Cell formation creates binding legal obligations
- Fork freedom: users can leave, take code
- User responsibilities: accurate info, no spam
- Admin rights: moderate content, approve/reject applications
- Dispute resolution
- Limitation of liability

## Privacy Policy

Key sections:
- Data collected: email, pledge amounts, ideas, comments
- How data is used: platform operation, notifications
- Third parties: Supabase (hosting), Vercel (CDN), Resend (email)
- Data retention: as long as account is active
- User rights: delete account, export data
- Cookie policy: session cookies only (Supabase auth)

## Email Verification

- Check if Supabase auth already sends verification emails
- If user.email_confirmed_at is null, show a banner on dashboard:
  "please verify your email to unlock all features"
- Optionally gate pledging behind verified email

## Footer Updates

- Add Terms and Privacy links to shared footer

## Acceptance Criteria

- [ ] /terms renders with full ToS
- [ ] /privacy renders with full privacy policy
- [ ] Footer has links to both
- [ ] Email verification banner shows for unverified users
- [ ] `./dev/health` returns ok

---

# Shipped: 020-user-profiles

# Feature Spec: 020 — Public User Profiles

## Summary

Public profile pages showing a user's ideas, pledges, and activity.
Builds community trust and accountability.

## Database

```sql
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  bio         text,
  website     text,
  created_at  timestamptz not null default now()
);

alter table profiles enable row level security;
create policy "profiles_public_read" on profiles for select using (true);
create policy "profiles_owner_upsert" on profiles for insert with check (auth.uid() = id);
create policy "profiles_owner_update" on profiles for update using (auth.uid() = id);
```

## Routes

- `app/profile/[id]/page.tsx` — public profile page
- `app/dashboard/profile/page.tsx` — edit your profile (name, bio, website)

## Profile Page

- Display name (or email prefix as fallback)
- Bio (optional)
- Website link (optional)
- Ideas submitted (list with status + pledges)
- Member since date
- Total upvotes received

## Edit Profile

- Form on dashboard: display name, bio, website
- Save updates to profiles table
- Upsert on first save

## Acceptance Criteria

- [ ] /profile/[id] shows public profile
- [ ] Dashboard has "edit profile" section
- [ ] Profiles table created with RLS
- [ ] `./dev/health` returns ok

---

# Instructions

You are conducting an Iteration Planning Meeting (IPM) for this project.
You have full context on what's been built (shipped specs) and the product vision.

Start by presenting:
1. Brief current state summary
2. Key gaps between current state and vision
3. Your proposed next 5-10 features, prioritized

Then have a conversation with the human. They may:
- Reprioritize features
- Add/remove items
- Ask questions about dependencies or scope
- Challenge your reasoning

When the human says they're done (or says 'write it' / 'ship it' / 'save'),
write the final agreed roadmap to specs/ROADMAP.md with this format:

## Current State
## Gaps
## Proposed Features (prioritized)
Each feature: Title, Priority (P0/P1/P2), Description, Rationale

Prioritize by: unblocking other work > user-facing value > technical debt.
Be specific and actionable. No vague suggestions.