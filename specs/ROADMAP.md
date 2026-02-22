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
