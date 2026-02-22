# Decisions

append-only log of significant decisions and why.

---

2026-02-21 — bootstrapped bny dark factory tooling into destroysass. adapted dev scripts for next.js (tsc --noEmit for post_flight, npm run build for test, curl vercel for health). kept bny scripts as-is since they're runtime-agnostic orchestration. wrote qa-playbook.md as persistent memory for how to verify the live app via browser relay.

2026-02-21 — set roadmap: 001 landing page first (brand before features), then 002 idea board, 003 submission, 004 pledge mechanic. rationale: nothing on the homepage currently communicates the vision — fix that before building any data model.

2026-02-21 — feature 001 (landing page) complete. deployed live at destroysass.vercel.app. dark theme, hero, 3-step section, CTA, footer. implemented directly (skipped bny implement) because claude code oauth token expired. bunny bug filed: implement script should pre-check auth before entering ralph loop and print actionable recovery message instead of 401 loop.

2026-02-21 — feature 002 (idea board) complete. ideas+pledges tables, rls, idea_board view, seed data, /ideas page live. sourced ~/.envrc — ANTHROPIC_API_KEY and GEMINI_API_KEY now available. installed @google/gemini-cli globally. full bny factory (claude+gemini) now operational.

2026-02-21 — feature 003 (idea submission form) complete. /ideas/new with auth gate, server action with full validation (trim, int parse, length checks), useActionState for form state, previousData preservation on error, open redirect protection on next param, Suspense boundary for useSearchParams. all gemini security fixes (S1–S6) addressed.

2026-02-21 — feature 003 (idea submission form) complete. bny --ralph implement succeeded in 1 iteration. all 12 tasks done by claude. security: open redirect protection, data preservation on error, float bypass fix, db error handling, next param in both auth flows. ara's phone: 303-747-3468 (messages.google.com).

2026-02-21 — feature 004 (pledge mechanic + idea detail page) complete. /ideas/[id] with pledge panel (anon/auth/pledged/creator states), progress bar toward $1k threshold, notFound() on bad IDs. server actions: pledgeIdea (upsert) + unpledgeIdea (delete). all gemini security fixes (S1–S6): step validation (amount%25), status check (proposed/gaining_traction only), UUID format check, inline errors, auth redirect, self-pledge block.

2026-02-21 — feature 005 (user dashboard) complete. /dashboard with auth gate, "my ideas" (from idea_board view), "my pledges" with withdraw button + monthly commitment total. security: unpledgeIdea now rejects withdrawal for locked statuses (threshold_reached/cell_forming/active), revalidates /dashboard, monthly total excludes cancelled ideas, withdraw button shows inline errors, pledges joined with idea_board for totals. dashboard nav link added to all authed pages.

2026-02-22 — feature 010 (email notifications via resend) complete. lib/email.ts with fire-and-forget Resend wrapper. three notification types: new pledge (to creator), status change (to all pledgers), cell formation (to all stakeholders). uses service role client to fetch emails from auth.users. graceful no-op when RESEND_API_KEY or SUPABASE_SERVICE_ROLE_KEY missing. dark-themed inline HTML templates. sender: onboarding@resend.dev (no domain verification needed for MVP).

2026-02-22 — feature 011 (dev cell profiles & applications) complete. dev_cells table with RLS (public read approved only, auth insert). /dev-cells public listing with card layout + skills tags. /dev-cells/apply auth-gated form with duplicate pending check via service role. admin panel: pending applications section with approve/reject buttons. "dev cells" nav link added across all public pages.

2026-02-22 — feature 012 (idea comments & discussion) complete. comments table with RLS (public read, auth insert, owner delete). display_name denormalized at insert time (email prefix, Option B). comments.tsx client component with useTransition, relative time display, inline delete. postComment + deleteComment server actions with validation. comments section added below pledge panel on /ideas/[id].
