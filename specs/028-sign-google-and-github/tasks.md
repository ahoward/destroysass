# Tasks: Sign In with Google and GitHub

**Input**: Design documents from `/specs/028-sign-google-and-github/`
**Prerequisites**: plan.md, spec.md

> **Protocol**: Run `./dev/pre_flight` before starting. Run `./dev/test` after every task. Run `./dev/post_flight` before every commit. See `bny/AGENTS.md` and `bny/guardrails.json` for full constraints.

## Phase 1: OAuth Callback Route (Shared Infrastructure)

- [ ] T001 [US3] Create `/auth/callback` route handler in `app/auth/callback/route.ts` — exchanges OAuth code for session, redirects to `next` param or `/`

## Phase 2: Auth Page UI — Google and GitHub Buttons

- [ ] T002 [US1] Add "sign in with google" button to `app/auth/page.tsx` — calls `signInWithOAuth({ provider: 'google' })` via browser Supabase client
- [ ] T003 [P] [US2] Add "sign in with github" button to `app/auth/page.tsx` — calls `signInWithOAuth({ provider: 'github' })` via browser Supabase client
- [ ] T004 [US1] Add visual separator ("or") between OAuth buttons and email/password form

## Phase 3: Validation

- [ ] T005 Run `./dev/test` and verify existing tests still pass
- [ ] T006 Manual: configure Google and GitHub providers in Supabase dashboard

## Dependencies

- T001 must complete before T002/T003 (callback route must exist for OAuth redirect)
- T002 and T003 can run in parallel (different buttons, same file but independent additions)
- T004 depends on T002/T003
- T005 depends on all code tasks
- T006 is manual, independent of code
