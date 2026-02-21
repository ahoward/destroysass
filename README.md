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
