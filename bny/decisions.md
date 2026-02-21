# Decisions

append-only log of significant decisions and why.

---

2026-02-21 — bootstrapped bny dark factory tooling into destroysass. adapted dev scripts for next.js (tsc --noEmit for post_flight, npm run build for test, curl vercel for health). kept bny scripts as-is since they're runtime-agnostic orchestration. wrote qa-playbook.md as persistent memory for how to verify the live app via browser relay.

2026-02-21 — set roadmap: 001 landing page first (brand before features), then 002 idea board, 003 submission, 004 pledge mechanic. rationale: nothing on the homepage currently communicates the vision — fix that before building any data model.

2026-02-21 — feature 001 (landing page) complete. deployed live at destroysass.vercel.app. dark theme, hero, 3-step section, CTA, footer. implemented directly (skipped bny implement) because claude code oauth token expired. bunny bug filed: implement script should pre-check auth before entering ralph loop and print actionable recovery message instead of 401 loop.

2026-02-21 — feature 002 (idea board) complete. ideas+pledges tables, rls, idea_board view, seed data, /ideas page live. sourced ~/.envrc — ANTHROPIC_API_KEY and GEMINI_API_KEY now available. installed @google/gemini-cli globally. full bny factory (claude+gemini) now operational.

2026-02-21 — feature 003 (idea submission form) complete. /ideas/new with auth gate, server action with full validation (trim, int parse, length checks), useActionState for form state, previousData preservation on error, open redirect protection on next param, Suspense boundary for useSearchParams. all gemini security fixes (S1–S6) addressed.
