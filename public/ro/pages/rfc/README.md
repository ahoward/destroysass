# RFC 001: a cooperative model for post-saas software

**status:** draft
**authors:** ara t. howard
**date:** march 2026

---

## abstract

the saas model is collapsing. ai has driven the cost of building software toward zero, but the cost of maintaining it remains high. the result is a structural crisis: businesses pay increasing rent for software they don't own, built by vendors with misaligned incentives, licensed under terms that strip them of agency.

open source was supposed to be the alternative. it isn't. permissive licenses let large platform companies capture volunteer labor. copyleft licenses protect freedom but don't fund maintenance. neither model produces a community with shared ownership, shared governance, and the collective agency to sustain software over time.

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

**capture.** permissive licenses (MIT, Apache) let anyone take the code — including the companies you're trying to escape. amazon built an $80B cloud business on open-source databases their engineers didn't write. the community built it. the corporations captured it.

**funding.** the volunteer maintenance model is collapsing. ai and vibe coding mean anyone can generate a codebase in an afternoon. nobody has a reason to contribute to yours. the people who maintained the internet's infrastructure for free are burning out, and no economic model exists to replace them.

open source solves access. it doesn't solve ownership. it doesn't solve maintenance. and it actively enables the concentration of power it was designed to prevent.

### 1.4 the walled garden trap

the third path — the one large platform companies are building right now — is the ai walled garden. proprietary systems that generate software on demand, inside platforms you can't leave. you get a compiled binary. they keep the source. the lock-in is tighter than saas ever was, because you can't even inspect what you're running.

---

## 2. the model

### 2.1 a multi-stakeholder cooperative

destroysaas is a limited cooperative association (LCA) organized under colorado law. it has two primary member classes:

- **business members** — companies that fund and use the software. they pay dues, propose ideas, pledge toward projects, and vote on governance.
- **cell members** — small product teams (typically 2–5 people) that design, build, and operate the software. they pay dues, bid on projects, submit public budgets, and vote on governance. cells may use subcontractors, but the cell is responsible for all work product and IP compliance.

both classes are equal members. structural decisions (bylaws, membership terms, new member classes) require approval from a majority of *each* class independently — neither class can outvote the other on matters that define the cooperative itself. day-to-day operational decisions — budget approvals, project launches, cell certifications — are delegated to an elected board composed of members from both classes. no investor class. no platform class. no middleman.

### 2.2 how software gets built

1. a business member proposes a software idea — what it does, what problem it solves, what they'd pay monthly.
2. other business members with the same need pledge monthly commitments.
3. when total pledges reach the board-set minimum viable threshold for that project category, pledges lock and the board approves the project.
4. the cooperative funds a scoping phase — certified cells submit architecture proposals and cost estimates. this is paid work, not spec work. (cell certification is administered by the board against published criteria — portfolio, references, insurance, quality gate compliance. existing cells do not gate new entrants. denied applicants have a formal appeals process.)
5. a product steward (a technical lead with domain expertise, elected or appointed by the board) translates business needs into requirements and evaluates cell bids on behalf of the pledging members. the steward manages scope and priorities — the cell retains full authority over architecture, stack, and implementation. scope changes beyond the original bid require a change order: new budget approval, new timeline. the cell can decline scope changes that exceed their bid without penalty. the steward also makes the first call on bug-vs-feature disputes — with board appeal if contested. daily operational friction gets resolved fast, not through formal arbitration.
6. the winning cell designs, builds, and operates the software under contract.

not every project starts from zero. cells can adopt, wrap, or extend existing open-source tools where appropriate — the cooperative funds the customization, hosting, integration, and ongoing maintenance. the goal is working software, not reinventing wheels.

new members who join after a project launches pay an access fee that amortizes the initial build cost. a portion of this fee is credited back to the original pledging members, reducing their effective monthly cost over time. as more members join, the per-member cost structurally declines — the opposite of saas, where vendor margins stay fixed regardless of scale.

project scope includes migration from existing tools, data import, third-party integrations (payment processors, accounting systems, email providers), and user training. these are funded by project pledges like any other feature — they're not afterthoughts.

### 2.3 how cells get paid

cells never work on spec. the monthly cycle:

1. **plan** — the cell submits next month's planned budget by category (labor, hosting, tools, admin). drawn against the monthly cap from their bid.
2. **review** — the board reviews and approves against the project's pledge revenue. budgets at or below the original bid cap are auto-approved — the board only intervenes on overages or anomalies.
3. **pay** — the cooperative pays the cell upfront on the 1st. no net-30. no invoicing games.
4. **build** — the cell does the work. code must pass automated quality gates (testing, IP provenance scanning, documentation, maintainability) before each release.
5. **report** — at month's end, the cell reports spend by category. category-level summaries are visible to all members. the board reviews detailed line items.
6. **reconcile** — the cell's margin is the difference between their bid cap and their actual spend. that margin is the cell's money — it's theirs to keep, no questions asked. any unspent project-level funds beyond the cell's contract (e.g., pledge revenue exceeding the bid cap) roll forward as project runway.

cells bid a fixed monthly cap. the difference between what the cooperative pays and what the cell actually spends is the cell's margin — exactly like any fixed-bid contract. this is how agencies make money, and it's how cells make money here.

the build phase includes user acceptance milestones — business members review working software at defined checkpoints before full budget release. if the software passes automated quality gates but doesn't meet the pledging members' actual needs, the product steward and cell work through scope adjustments before the next milestone. escrowed funds protect cells from cancellation, but they don't lock business members into software that doesn't work for them.

projects transition from **build phase** to **maintenance phase** once the core product ships. the cell that built the project has right of first refusal on the maintenance contract. in maintenance phase, the cell operates on a reduced budget funded by ongoing pledges — covering hosting, security patches, bug fixes, on-call support, and incremental improvements. maintenance budgets explicitly include on-call and incident response costs. SLA tiers (response times, uptime targets) are defined per project during the scoping phase.

there is no "completed" state. software is either actively maintained or formally deprecated by member vote. if ongoing pledges drop below the minimum viable maintenance cost (defined during scoping), the board either funds the gap from the treasury or initiates a deprecation vote. cells are never required to maintain software below the funded threshold.

major new features for existing projects don't require a full new project cycle — business members can fund feature rounds through additional pledges on the existing project, and the maintaining cell (or a competing cell) can bid on the work. innovation is incremental and continuous, not gated by bureaucracy.

during the build phase, pledges are escrowed for the contracted duration. if individual pledgers cancel mid-build, the escrowed funds cover the remainder of the contract. cells are never left holding the bag on a half-finished project.

if a cell is replaced mid-project, the cooperative's reserve fund covers the transition costs — onboarding a new cell, knowledge transfer, code review. the outgoing cell's transition-ready documentation (required by cooperative standards) minimizes this cost, but the reserve fund ensures it doesn't fall on the business members.

### 2.4 the economics

**money in:**
- monthly dues from all members (funds operations, the reserve fund, and the core platform)
- project pledges from business members (funds cell budgets, ring-fenced per project)
- access fees from new members joining existing projects (amortizes build costs, credited to original pledgers)

**money out:**
- cell budgets (paid upfront monthly, capped by bid)
- core platform costs (shared infrastructure: authentication, design system, notification services — funded by treasury, not individual projects)
- operating costs (legal, insurance, hosting, platform maintenance)
- reserve fund contributions (building a buffer for disputes, legal defense, transitions, and unexpected costs)

**cell incentives:**
- upfront monthly payment, no net-30
- a recurring share of access fees from new members joining projects the cell built — this share vests over time and persists even if the cell hands off maintenance to another cell. builders retain long-term upside, not just capped labor
- year-end surplus: 50% to a cell pool (pro-rata by dues + paid budgets)

**what business members pay:**
- dues: a fixed monthly amount (set by the board, same for all business members). predictable.
- pledges: voluntary, fixed at the amount you commit. you choose which projects to fund and how much. no surprise increases, no usage-based billing, no per-seat pricing.

**what business members get:**
- access fee credits from later joiners reduce your effective monthly cost over time
- year-end surplus: 50% to a business pool (pro-rata by dues + pledges)
- ownership, governance rights, and fork freedom from day one
- participation is optional — the board handles operations. you *can* vote, review budgets, and propose ideas. you don't *have* to. the software works either way.

**an illustrative example:** 20 businesses each pledge $250/month to fund a shared CRM. that's $5,000/month — enough to retain a cell, cover hosting, and build real software. each business pays $250/month instead of $500/month for Salesforce. over 3 years, as 30 more businesses join and pay access fees, the original pledgers' effective cost drops further. after 5 years, those 20 founding businesses have paid roughly half what they would have paid in saas rent — and they own the result.

**why cells join:** the cooperative replaces your sales pipeline. no more pitching, no more proposals that go nowhere, no more chasing invoices. projects arrive pre-funded with committed business members. you get paid upfront on the 1st. you keep your margin. you own your tools. you earn recurring revenue from access fees. and you're a co-owner with a vote — not a vendor begging for the next contract. the governance overhead is real, but it's lighter than running a sales department.

**take-rate:** zero on project pledges. the cooperative doesn't skim a percentage of cell budgets. dues and access fees fund operations, reserves, and the core platform. pledges fund projects. that's it.

### 2.5 the core platform

shared infrastructure — authentication, authorization, design systems, notification services, billing integration — is funded by the cooperative treasury (dues), not by individual project pledges. this ensures interoperability across projects and prevents governance gridlock over shared dependencies. the core platform defines APIs and interfaces; individual project cells choose their own stack and implementation. the core platform is maintained by a dedicated cell or rotating cells under the same budget and quality standards as any project.

SLA responsibility follows the code: if a core platform failure causes a project-level outage, liability and SLA accountability rest with the core platform cell, not the project cell. cross-cell disputes are resolved through the board with independent technical audit when needed, not through the affected business members.

### 2.6 infrastructure ownership

the cooperative owns all production infrastructure — cloud accounts, domains, databases, secrets. cells are granted deploy and operate access to the projects they maintain. if a cell is replaced, the cooperative revokes access and grants it to the incoming cell. no cell ever controls the keys to a member's data.

### 2.7 liability and risk

cells carry professional liability (E&O) insurance as a condition of certification, with the cooperative named as additionally insured. liability for software defects flows through the cooperative to the cell that wrote the code, capped at the total fees paid to the cell under that project contract — the same liability cap standard in agency work. the cooperative's own liability is limited to negligence in governance — failure to enforce quality gates, failure to act on known security issues, failure to maintain the reserve fund.

the cooperative carries general liability insurance and maintains a reserve fund. the reserve fund is not a guarantee against all losses — it is a buffer that makes the cooperative financially resilient enough to survive disputes, transitions, and the unexpected.

the cooperative publishes a security and data access baseline that all projects must meet. cell access to production data is role-scoped and audited. business member data is isolated per tenant. compliance requirements (SOC 2, HIPAA, PCI) are defined per project during scoping and funded by project pledges.

---

## 3. the license

### 3.1 why not open source

open source is a gift to the commons. that sounds noble until amazon takes your database, wraps it in a managed service, and charges your users for access to code your community wrote for free.

the destroysaas model requires a different kind of license — one that gives members full source access, modification rights, and fork freedom, but prevents non-members from capturing the value.

### 3.2 collectively owned source

source code produced under destroysaas contracts is owned by the cooperative. cells retain rights to any code, libraries, or tools they created *before* the engagement or develop independently outside of it. internal tooling, build scripts, testing frameworks, and processes that a cell develops to do their work more efficiently remain the cell's property — the cooperative owns the deliverable product, not the means of production. members have the right to:

- **read** the source code
- **run** it on their own infrastructure
- **modify** it for their own use
- **fork** it if they leave the cooperative (for internal business use — not for commercial resale or redistribution)

non-members do not have these rights. the source is not public. it is not permissive. it is collectively owned by the people who funded it.

this is not a restriction. it is a protection. the code belongs to the community that paid for it — not the commons, not the corporations, not the next platform that wants to extract rent from it.

the legal mechanism builds on established source-available frameworks (such as the Business Source License and Functional Source License), adapted for cooperative ownership. all membership agreements include binding arbitration clauses to keep dispute resolution fast and affordable.

### 3.3 fork freedom

any member can leave at any time. when you leave, you take:

- the source code (as of your departure date)
- your data (via self-serve export — every project must ship automated data export as a launch requirement)
- the right to run and modify the software for your own business — including hiring any developer or agency outside the cooperative to host, maintain, or modify it for you

you cannot resell, sublicense, or offer the forked code as a hosted service to others. this prevents the "join, copy, compete" attack that has gutted open-source projects.

you lose access to ongoing maintenance, updates, and the collective infrastructure. but you are never locked in. the exit is real — and it's practical, not just theoretical. you don't need to be technical to exercise it.

### 3.4 hosting and operations

cells host and operate software on behalf of business members as part of their monthly budget, on cooperative-owned infrastructure. business members always retain the *right* to self-host, but the default is a cooperative-managed deployment — because most businesses want working software, not devops.

---

## 4. the community

### 4.1 hyper community, not open source community

open source communities are loosely organized groups of volunteers. they produce remarkable software, but they lack the structure to sustain it economically or protect it legally.

destroysaas is a **hyper community** — a legally organized cooperative where members have:

- **shared ownership** of the source code and infrastructure
- **shared governance** through bicameral democratic control on structural decisions, board delegation on operations
- **shared economics** through patronage-based surplus distribution
- **shared agency** — the collective power to say "this is ours" and enforce it

the distinction matters. a community is a group of people with a shared interest. a hyper community is a group of people with shared *property*, shared *governance*, and the legal standing to defend both.

### 4.2 network effects

every new business member increases the pool of funded projects. every new cell member increases the pool of available builders. every new project increases the value of membership. and owners don't churn the way customers do — structural retention is the default when your members are co-owners with voting rights and surplus distribution.

as membership grows, access fees from new joiners reduce costs for existing members. the economics improve with scale — not because margins widen (there are no margins), but because the fixed costs of building software are amortized across more owners.

one cooperative. many programs. the network compounds.

### 4.3 safeguards

- **public budgets** — every budget is visible to every member
- **product stewards** — technical leads with domain expertise in the project's vertical, who translate business needs, evaluate bids, and manage projects on behalf of non-technical members
- **board review** — elected mixed-class board reviews and approves budgets monthly
- **code quality gates** — automated testing, IP provenance scanning, documentation, and maintainability standards enforced before every release
- **transition readiness** — cells must maintain architecture docs, runbooks, and standardized deployments sufficient for another cell to assume operations
- **the vote** — cell replacement requires a supermajority of the project's pledging members and board approval, triggered only by measurable performance failures (SLA breaches, quality gate failures, budget overruns) — not by competing bids or popularity contests
- **competition** — other cells can bid to take over a project, but only after a replacement vote succeeds. the incumbent cell has right of first refusal to match any competing bid
- **infrastructure ownership** — the cooperative holds the keys, not the cell
- **budget-pledge alignment** — money in caps money out, always
- **reserve fund** — a financial buffer for disputes, legal defense, and transitions
- **data portability** — every project ships self-serve data export from day one
- **binding arbitration** — disputes resolved quickly and affordably, not in court
- **fork freedom** — the ultimate safeguard. if the cooperative fails you, you leave with everything.

---

## 5. why now

three things are true simultaneously for the first time:

1. **ai collapsed the cost of building software** — the initial build is approaching commodity. what was $150,000 and six months is now weeks.
2. **the saas model is collapsing** — $2 trillion in market cap gone. per-seat pricing is dying. businesses are looking for alternatives.
3. **the legal and organizational infrastructure exists** — limited cooperative associations, democratic governance frameworks, modern treasury management. the tools to build member-owned institutions are mature.

the window is open. the old model is dying. the question is whether what replaces it will be owned by the people who use it — or by the next platform that wants to rent it back.

---

## 6. request for comments

this is RFC 001. it is a living document. it is incomplete by design.

we are building this in the open because the model only works if the community shapes it. if you see a flaw, say so. if you see a missing piece, propose it. if you think this is wrong, tell us why.

**what founding members get:** the first wave of projects will be seeded by the founding team — not waiting for consensus from an empty room. founding business members shape the initial project roadmap, get the best access-fee terms as the cooperative grows, and have a permanent seat at the table of an organization designed to compound in their favor. founding cell members get first pick of projects and the strongest vesting position on access fees.

the internet was built on rough consensus and running code. this is the rough consensus part. the running code is at [destroysaas.coop](https://destroysaas.coop).

comments: [ara.t.howard@gmail.com](mailto:ara.t.howard@gmail.com)
