# Tasks: Cell Proposals

**Input**: Design documents from `/specs/029-cell-proposals/`
**Prerequisites**: plan.md, spec.md

> **Protocol**: Run `./dev/pre_flight` before starting. Run `./dev/test` after every task. Run `./dev/post_flight` before every commit. See `bny/AGENTS.md` and `bny/guardrails.json` for full constraints.

## Phase 1: Database (Shared Infrastructure)

- [ ] T001 Create migration `supabase/migrations/014_proposals.sql` — tables for `idea_materials`, `idea_attachments`, `proposals`, `proposal_preferences` with RLS policies
- [ ] T002 Create Supabase Storage bucket `idea-materials` for file uploads
- [ ] T003 Apply migration to Supabase (via dashboard or CLI)

## Phase 2: US1 — Supporting Materials

**Goal**: Idea creators can add text + files to funded ideas. All users can view them.

- [ ] T004 [US1] Create `app/ideas/[id]/materials.tsx` — supporting materials component (text editor + file upload for creator, read-only for others)
- [ ] T005 [US1] Create server actions for materials: save text, upload file, delete file in `app/ideas/[id]/proposal_actions.ts`
- [ ] T006 [US1] Wire materials component into `app/ideas/[id]/page.tsx` — show when status is `cell_forming` or later

**Checkpoint**: Idea creators can add/edit materials. All users can view them.

## Phase 3: US2 — Cell Proposals

**Goal**: Approved cell members can submit/edit/withdraw proposals for funded ideas.

- [ ] T007 [US2] Create `app/ideas/[id]/proposal_form.tsx` — form for submitting/editing a proposal (title + body)
- [ ] T008 [US2] Add server actions: `submitProposal`, `updateProposal`, `deleteProposal` in `app/ideas/[id]/proposal_actions.ts`
- [ ] T009 [US2] Create `app/ideas/[id]/proposals.tsx` — lists all proposals for the idea with cell name, title, body, date
- [ ] T010 [US2] Wire proposal form + listing into `app/ideas/[id]/page.tsx` — show when status is `cell_forming` or later, form only for approved cell members

**Checkpoint**: Cells can submit proposals. All users can view them.

## Phase 4: US3 — Sponsor Preferences

**Goal**: Pledged users can signal which proposal they prefer.

- [ ] T011 [US3] Add preference button to each proposal in `app/ideas/[id]/proposals.tsx`
- [ ] T012 [US3] Add server action `setPreference(proposalId, ideaId)` in `app/ideas/[id]/proposal_actions.ts`
- [ ] T013 [US3] Show preference count per proposal and highlight the leading proposal

**Checkpoint**: Full proposal lifecycle works end-to-end.

## Phase 5: Validation

- [ ] T014 Run `./dev/test` — build + TypeScript + Playwright pass
- [ ] T015 Manual test: create idea, pledge to threshold, trigger formation, add materials, submit proposal, set preference

## Dependencies

- T001-T003 must complete before any US work
- T004-T006 (US1) can run in parallel with T007-T010 (US2) since they're different components
- T011-T013 (US3) depends on T009 (proposals listing must exist for preference buttons)
