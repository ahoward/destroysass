# Business Model Questions — Open for COO Review

These questions need answers before or during development of the corresponding features. Each is tagged with what it blocks.

---

## Payment & Billing (blocks: Stripe integration)

- [ ] **Refund policy on unpledge.** When a user has been charged for their monthly pledge and then unpledges mid-cycle, do we refund the current month? Prorate? No refund?
- [ ] **Failed payment handling.** If Stripe can't collect a monthly pledge, how many retries before we cancel the pledge? Do we notify the user? Does the idea lose that pledge amount from its total?
- [ ] **Pledge amount changes.** Can a user increase/decrease their pledge on an existing idea? If so, does the change take effect immediately or next billing cycle?
- [ ] **Minimum pledge amount.** Stripe fees are ~$0.30 + 2.9%. A $5 pledge nets ~$4.56. A $25 pledge nets ~$23.97. What's the floor?
- [ ] **Subscription lifecycle.** Pledges start as recurring subscriptions. When a cell triggers and forms an LCA, do subscriptions transfer to the LCA's Stripe account? Or does the platform continue to collect and distribute?
- [ ] **Payment terms page.** Do we need a separate payment terms/billing FAQ page before Stripe goes live, or is the existing ToS sufficient?

## Platform Economics (blocks: Stripe integration, cell formation)

- [ ] **Platform fee timing.** Does destroysass take a cut on pledges immediately (e.g., 5% of every pledge), or only after cell formation?
- [ ] **Platform fee amount.** What percentage? Fixed + percentage? Different rates for pre-formation vs. post-formation?
- [ ] **Receiving entity.** What entity receives Stripe payments? Personal account, an LLC, or a platform LCA? This determines Stripe account type and legal obligations.
- [ ] **Treasury activation.** When a cell triggers, does it get its own OpenCollective collective? Its own Stripe Connect account? Or does the platform hold funds in a single account with internal ledger?

## Cell Formation (blocks: cell formation workflow)

- [ ] **Trigger criteria.** Currently auto-triggers at $1000/mo in pledges. Is this the right threshold? Should it be configurable per idea? Should there be a minimum sponsor count (e.g., at least 5 businesses)?
- [ ] **Formation timeline.** When threshold is reached, what happens? Immediate LCA formation? Cooling-off period? Manual COO approval step?
- [ ] **LCA formation process.** Who files the Wyoming LCA? Platform handles it? Third-party service? What's the cost and who bears it?
- [ ] **Idea cancellation.** What happens to active subscriptions if an idea is cancelled before cell formation? Auto-refund current month? Cancel subscriptions immediately?

## Seed Data & Launch (blocks: seed data strategy)

- [ ] **Disclosure policy.** Are seed/fake pledges disclosed to real users (e.g., "includes demonstration data"), or presented as genuine social proof?
- [ ] **Seed removal timeline.** When do we remove seed data? At N real users? At first real pledge? Never (gradually replace)?
- [ ] **Seed user accounts.** Do seed users have functional email addresses? Can someone accidentally "reset password" on a seed account?

## Legal & Compliance (blocks: Stripe, launch)

- [ ] **Tax implications.** Monthly pledge collections are revenue. What tax entity handles this? Do we need to issue 1099s to dev cells?
- [ ] **International pledgers.** Do we accept pledges from outside the US? VAT implications?
- [ ] **PCI compliance.** Stripe handles card data, but do we need any additional compliance documentation?

---

## How to Use This Doc

Answer questions by replacing `[ ]` with `[x]` and adding your answer below each question. Tag questions with `DECIDED:` when finalized.

Priority: answer the **Payment & Billing** and **Platform Economics** sections first — these block Stripe integration.
