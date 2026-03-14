# RFC 001: a cooperative model for post-saas software

**status:** draft
**authors:** ara t. howard
**date:** march 2026

---

## abstract

the saas model is collapsing. ai has driven the cost of building software toward zero, but the cost of maintaining it remains high. the result is a structural crisis: businesses pay increasing rent for software they don't own, built by vendors with misaligned incentives, licensed under terms that strip them of agency.

open source was supposed to be the alternative. it isn't. permissive licenses let megacorps capture volunteer labor. copyleft licenses protect freedom but don't fund maintenance. neither model produces a community with shared ownership, shared governance, and the collective agency to sustain software over time.

this document proposes a third model: **collectively owned software**, funded through a multi-stakeholder cooperative, maintained by professional product teams (cells) who are co-owners of the same organization, and licensed under terms that keep the source code in the hands of the members who paid for it.

not open source. not closed source. *our source*.

---

## 1. the problem

### 1.1 the saas trap

software-as-a-service is a rental model. you pay monthly for access to software someone else owns, controls, and can take away. you accumulate no equity. you have no vote on the roadmap. your data sits on servers governed by terms of service you didn't negotiate. if the vendor raises prices, gets acquired, or shuts down, you start over.

a typical small business pays $400–$600/month across 5–8 tools — CRM, project management, invoicing, scheduling, email marketing, inventory, support desk. that's $5,000–$7,000/year. over ten years, $50,000–$70,000. with zero ownership.

this is not a technology problem. it's a property rights problem.

### 1.2 the saaspocalypse

in february 2026, the market caught up. $2 trillion in saas market capitalization evaporated as ai agents began replacing entire software categories. atlassian dropped 35%. salesforce dropped 28%. analysts are calling it the saaspocalypse.

the cause is structural: ai agents perform tasks that previously required dedicated software tools. per-seat pricing collapses when one agent replaces multiple human positions. the most vulnerable categories — project management, customer support, CRM data entry — are exactly the commoditized workflows that saas vendors charge the most for.

but ai doesn't eliminate the need for software. it eliminates the justification for renting it. the code is cheaper to write. the maintenance is still expensive. and the question of who owns the result is more urgent than ever.

### 1.3 the open source trap

open source was the internet's answer to proprietary software. it worked — 98% of web servers run on open-source code. but two failures have emerged:

**capture.** permissive licenses (MIT, Apache) let anyone take the code — including the companies you're trying to escape. amazon built a $80B cloud business on open-source databases their engineers didn't write. the community built it. the corporations captured it.

**funding.** the volunteer maintenance model is collapsing. ai and vibe coding mean anyone can generate a codebase in an afternoon. nobody has a reason to contribute to yours. the people who maintained the internet's infrastructure for free are burning out, and no economic model exists to replace them.

open source solves access. it doesn't solve ownership. it doesn't solve maintenance. and it actively enables the concentration of power it was designed to prevent.

### 1.4 the walled garden trap

the third path — the one megacorps are building right now — is the ai walled garden. proprietary systems that generate software on demand, inside platforms you can't leave. you get a compiled binary. they keep the source. the lock-in is tighter than saas ever was, because you can't even inspect what you're running.

---

## 2. the model

### 2.1 a multi-stakeholder cooperative

destroysaas is a limited cooperative association (LCA) organized under colorado law. it has two primary member classes:

- **business members** — companies that fund and use the software. they pay dues, propose ideas, pledge toward projects, and vote on governance.
- **cell members** — small product teams (typically 2–5 people) that design, build, and operate the software. they pay dues, bid on projects, submit public budgets, and vote on governance.

both classes are equal members. one member, one vote. no investor class. no platform class. no middleman.

### 2.2 how software gets built

1. a business member proposes a software idea — what it does, what problem it solves, what they'd pay monthly.
2. other business members with the same need pledge monthly commitments ($25–$500/month).
3. when total pledges reach threshold ($1,000/month), pledges lock and the board approves the project.
4. certified cell members bid on the project. each bid establishes a monthly cap.
5. business members who funded the idea evaluate bids and select a cell.
6. the winning cell designs, builds, and operates the software under contract.

### 2.3 how cells get paid

cells never work on spec. the monthly cycle:

1. **plan** — the cell submits next month's planned budget with line items (labor, hosting, tools). drawn against the monthly cap from their bid.
2. **review** — the board reviews and approves against the project's pledge revenue.
3. **pay** — the cooperative pays the cell upfront on the 1st. no net-30. no invoicing games.
4. **build** — the cell does the work.
5. **report** — at month's end, the cell submits actuals. planned vs. actual is visible to every member.
6. **reconcile** — surplus rolls forward as runway for the project. surplus from completed projects returns to the cooperative treasury.

every budget is public. every member can see every line item. transparency is the accountability mechanism.

### 2.4 the economics

**money in:**
- monthly dues from all members (funds operations)
- project pledges from business members (funds cell budgets, ring-fenced per project)

**money out:**
- cell budgets (paid upfront monthly, capped by bid)
- operating costs (legal, insurance, hosting, platform maintenance)

**surplus:**
- year-end surplus split 50/50 — half to a business pool (pro-rata by dues + pledges), half to a cell pool (pro-rata by dues + paid budgets)

**take-rate:** zero. the cooperative doesn't skim a percentage. dues cover operations. pledges fund projects. that's it.

---

## 3. the license

### 3.1 why not open source

open source is a gift to the commons. that sounds noble until amazon takes your database, wraps it in a managed service, and charges your users for access to code your community wrote for free.

the destroysaas model requires a different kind of license — one that gives members full source access, modification rights, and fork freedom, but prevents non-members from capturing the value.

### 3.2 collectively owned source

source code produced by destroysaas cells is owned by the cooperative. members have the right to:

- **read** the source code
- **run** it on their own infrastructure
- **modify** it for their own use
- **fork** it if they leave the cooperative

non-members do not have these rights. the source is not public. it is not permissive. it is collectively owned by the people who funded it.

this is not a restriction. it is a protection. the code belongs to the community that paid for it — not the commons, not the corporations, not the next generation of extractors.

### 3.3 fork freedom

any member can leave at any time. when you leave, you take:

- the source code (as of your departure date)
- your data
- the right to run and modify the software independently

you lose access to ongoing maintenance, updates, and the collective infrastructure. but you are never locked in. the exit is real.

---

## 4. the community

### 4.1 hyper community, not open source community

open source communities are loosely organized groups of volunteers. they produce remarkable software, but they lack the structure to sustain it economically or protect it legally.

destroysaas is a **hyper community** — a legally organized cooperative where members have:

- **shared ownership** of the source code and infrastructure
- **shared governance** through one-member-one-vote democratic control
- **shared economics** through patronage-based surplus distribution
- **shared agency** — the collective power to say "this is ours" and enforce it

the distinction matters. a community is a group of people with a shared interest. a hyper community is a group of people with shared *property*, shared *governance*, and the legal standing to defend both.

### 4.2 network effects

every new business member increases the pool of funded projects. every new cell member increases the pool of available builders. every new project increases the switching cost of leaving. and owners don't churn the way customers do — zero churn is the structural default when your members are co-owners with voting rights and surplus distribution.

one cooperative. many programs. the network compounds.

### 4.3 safeguards

- **public budgets** — every budget is visible to every member
- **board review** — elected board reviews and approves budgets monthly
- **the vote** — any member can call a vote to replace an underperforming cell
- **competition** — other cells can bid to take over a project
- **budget-pledge alignment** — money in caps money out, always
- **fork freedom** — the ultimate safeguard. if the cooperative fails you, you leave with everything.

---

## 5. why now

three things are true simultaneously for the first time:

1. **ai collapsed the cost of building software** — the initial build is approaching free. what was $150,000 and six months is now a weekend.
2. **the saas model is collapsing** — $2 trillion in market cap gone. per-seat pricing is dying. the rent-seeking era is ending.
3. **the legal and organizational infrastructure exists** — limited cooperative associations, democratic governance frameworks, smart contracts for treasury management. the tools to build member-owned institutions are mature.

the window is open. the old model is dying. the question is whether what replaces it will be owned by the people who use it — or by the next generation of extractors.

---

## 6. request for comments

this is RFC 001. it is a living document. it is incomplete by design.

we are building this in the open because the model only works if the community shapes it. if you see a flaw, say so. if you see a missing piece, propose it. if you think this is wrong, tell us why.

the internet was built on rough consensus and running code. this is the rough consensus part. the running code is at [destroysaas.coop](https://destroysaas.coop).

comments: [ara.t.howard@gmail.com](mailto:ara.t.howard@gmail.com)
