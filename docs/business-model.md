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
