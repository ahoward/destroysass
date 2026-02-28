# product vision

## what destroysaas.ai is

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

- certified cells are vetted for technical competence, cooperative structure, and financial
  responsibility
- when a cell triggers, certified cells can submit proposals to build and maintain the stack
- the smb cell selects their cell via governed vote
- the selected cell is bound by a standard sla contract (exhibit a of the lca operating
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
certified cells submit proposals
      ↓
smb cell votes → cell selected
      ↓
build begins, funded by treasury
      ↓
launch → ongoing maintenance under sla
      ↓
cell operates indefinitely, self-governed
```

---

## the mvp cell: a knowledge management tool

the first cell destroysaas.ai should form:

**concept:** a hosted, self-owned alternative to notion/confluence — graph-based, fast, no
vendor lock-in.

**why it's the right first cell:**
- smbs are drowning in notion/confluence subscription bloat and terrified of their proprietary
  data living on someone else's servers
- it requires persistent hosting, robust maintenance, and zero downtime — proving the cell
  model immediately
- the problem is universal enough to attract 10–15 sponsors easily, but specific enough to ship
  a focused v1
- as a knowledge base, it accumulates the most sensitive business data — ownership isn't just
  financial, it's existential

**target sponsors:** 10–15 small agencies, consultancies, or tech-adjacent smbs at $100/mo each  
**initial treasury:** ~$1,000–1,500/mo  
**cell scope:** containerized rails/bun app, sqlite backend, hosted on shared infra owned
by the lca

---

## on-brand principles

### the code is free. the network is the value.
all software built through destroysaas.ai is open-source. anyone can fork it. but forking the
code doesn't give you the accumulated shared infrastructure, legal standing, trust network, or
running instances. the moat is the network, not the binary.

### owner, not customer
every member of a cell is a co-owner. they have equity, they have a vote, they have a lawyer.
this is the inversion of the saas relationship. you are not a user of someone else's product —
you are an owner of your own.

### the cell is labor, not governance
developers build and maintain the stack. they don't own the vision. the smb co-owners govern
direction. this separation is intentional and important — it's the same reason you hire a
contractor to build your house and don't let them decide where your kitchen goes.

### everything is replaceable except the network
the cell can be fired. the hosting can be moved. the code can be forked. what cannot be
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
- a handful of certified cells building reputation and recurring income
- the lca boilerplate and onboarding is so smooth that "coop-in-a-box" is a real thing

**year 2:**
- 50+ cells across multiple verticals (knowledge management, team comms, inventory, scheduling)
- cells starting to interoperate — the brane cell talking to the comms cell
- cells competing for quality reputation, not just price
- destroysaas.ai is the place you go when you've decided saas is not the answer

**year 3:**
- a global dao governing shared protocols
- local lcas franchising core protocol with upstream revenue share
- the corporate saas vendors have a new problem: their smb customers are leaving for software
  they own
