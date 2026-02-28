# Feature Spec: 007 — About Page, FAQ, and SEO/OG Meta

## Summary

Add an `/about` page explaining the destroysaas model, a FAQ section answering common questions,
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
- title: "destroysaas — own the software you use"
- description: "Small businesses collectively fund, own, and control the software they depend on. No more SaaS rent."
- og:image: generate a simple OG image or use a static one
- og:type: website
- twitter:card: summary_large_image

Per-page titles:
- /ideas: "ideas — destroysaas"
- /ideas/[id]: "{idea.title} — destroysaas"
- /about: "about — destroysaas"
- /dashboard: "dashboard — destroysaas"
- /admin: "admin — destroysaas"

## Acceptance Criteria

- [ ] `/about` renders with all sections and FAQ
- [ ] Layout metadata includes OG tags
- [ ] Each page has a unique title
- [ ] `./dev/health` returns ok
