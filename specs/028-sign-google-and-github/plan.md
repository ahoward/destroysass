# Implementation Plan: Sign In with Google and GitHub

**Branch**: `028-sign-google-and-github` | **Date**: 2026-02-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/028-sign-google-and-github/spec.md`

> **Protocol**: Before working on this plan, run `./dev/pre_flight`. After any code change, run `./dev/test`. Before committing, run `./dev/post_flight`. See `bny/AGENTS.md` and `bny/guardrails.json` for full constraints.

## Summary

Add Google and GitHub OAuth sign-in to the existing Supabase email/password auth. This requires:
1. An OAuth callback route (`/auth/callback`)
2. Server actions for initiating OAuth flows
3. OAuth buttons on the existing `/auth` page UI
4. Supabase dashboard configuration for Google and GitHub providers (manual step)

The app already uses Supabase Auth with `@supabase/ssr` for cookie-based sessions. OAuth is a first-class Supabase feature — we use `signInWithOAuth()` client-side and `exchangeCodeForSession()` server-side in the callback. No schema changes needed.

## Technical Context

**Language/Version**: TypeScript / Next.js (App Router)
**Primary Dependencies**: `@supabase/supabase-js` (v2.97.0), `@supabase/ssr` (v0.8.0)
**Storage**: Supabase (PostgreSQL) — existing `auth.users` table handles OAuth identities natively
**Testing**: Playwright (e2e), existing test suite via `./dev/test`
**Target Platform**: Web (Vercel deployment)
**Project Type**: Web (Next.js monolith)
**Performance Goals**: OAuth flow completes in <10s (network-dependent)
**Constraints**: No new dependencies needed. All OAuth logic is built into Supabase.
**Scale/Scope**: 3 files changed, 1 new route added

## Constitution Check

No violations. This is a small, additive feature using existing infrastructure.

## Implementation Steps

### Step 1: Create OAuth callback route

**File**: `app/auth/callback/route.ts` (NEW)

Create a Next.js route handler at `/auth/callback` that:
- Reads the `code` query parameter from the URL
- Reads the `next` query parameter (default `/`)
- Creates a Supabase server client
- Calls `supabase.auth.exchangeCodeForSession(code)`
- On success: redirects to `next` (validated with `safeRedirectTarget`)
- On failure: redirects to `/auth`

This is the standard Supabase OAuth callback pattern for Next.js App Router with PKCE flow.

### Step 2: Add OAuth server actions

**File**: `app/auth/actions.ts` (MODIFY)

Add a `signInWithOAuthProvider` server action that:
- Takes a `provider` param (`'google' | 'github'`) and optional `next` path
- Creates a Supabase server client
- Calls `supabase.auth.signInWithOAuth({ provider, options: { redirectTo } })`
  - `redirectTo` = `${SITE_URL}/auth/callback?next=${next}`
- Returns the OAuth URL for client-side redirect

Note: `signInWithOAuth` must be called server-side to get the URL, then the client redirects to it. Alternatively, it can be called client-side directly using the browser Supabase client — this is simpler since `signInWithOAuth` needs to redirect the browser anyway.

**Decision**: Use client-side `signInWithOAuth` directly from the auth page component. This avoids a server roundtrip and is the standard Supabase pattern. The callback route handles the server-side code exchange.

### Step 3: Add OAuth buttons to auth page UI

**File**: `app/auth/page.tsx` (MODIFY)

Add two buttons above the email/password form:
- "sign in with google" button
- "sign in with github" button
- Visual separator ("or") between OAuth buttons and the email form
- Each button calls `supabase.auth.signInWithOAuth({ provider, options: { redirectTo: '/auth/callback?next=...' } })` using the browser Supabase client
- Buttons appear in all modes (sign in, sign up) but NOT in forgot password mode
- Style: outlined buttons matching the existing design system (border, hover states, CSS variables)

### Step 4: Supabase dashboard configuration (MANUAL)

Not code — must be done by the user in the Supabase dashboard:
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google provider: add Google Client ID and Client Secret (from Google Cloud Console)
3. Enable GitHub provider: add GitHub Client ID and Client Secret (from GitHub Developer Settings)
4. Set the callback URL in both provider configs to: `https://bjaejvgoifgdanwvglnv.supabase.co/auth/v1/callback`

## Project Structure

### Files Changed

```text
app/auth/
├── callback/
│   └── route.ts          # NEW — OAuth code exchange
├── actions.ts            # UNCHANGED — OAuth handled client-side
└── page.tsx              # MODIFIED — add OAuth buttons

lib/supabase/
├── client.ts             # EXISTING — used for client-side signInWithOAuth
├── server.ts             # EXISTING — used in callback route
└── middleware.ts          # EXISTING — no changes needed
```

## Complexity Tracking

No violations. This is a 3-file change using built-in Supabase OAuth support.
