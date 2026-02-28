# Feature Specification: Sign In with Google and GitHub

**Feature Branch**: `028-sign-google-and-github`
**Created**: 2026-02-28
**Status**: Draft
**Input**: User description: "sign-in with google and sign-in with github"

> **Protocol**: Before working on this spec, run `./dev/pre_flight`. After any code change, run `./dev/test`. Before committing, run `./dev/post_flight`. See `bny/AGENTS.md` and `bny/guardrails.json` for full constraints.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sign in with Google (Priority: P1)

A visitor clicks "sign in with google" on the auth page, is redirected to Google's OAuth consent screen, authorizes the app, and is redirected back to the app as an authenticated user.

**Why this priority**: Google is the most widely-used OAuth provider. Most users have a Google account and expect this option.

**Independent Test**: Can be fully tested by clicking the Google sign-in button, completing the Google OAuth flow, and verifying the user lands on the dashboard authenticated.

**Acceptance Scenarios**:

1. **Given** an unauthenticated user on `/auth`, **When** they click "sign in with google", **Then** they are redirected to Google's OAuth consent screen
2. **Given** the user authorizes the app on Google, **When** Google redirects back, **Then** the user is authenticated and redirected to `/` (or the `?next=` path if present)
3. **Given** a user who previously signed up with email and now signs in with Google using the same email, **When** the OAuth flow completes, **Then** the accounts are linked (Supabase default behavior) and the user is signed in

---

### User Story 2 - Sign in with GitHub (Priority: P2)

A visitor clicks "sign in with github" on the auth page, is redirected to GitHub's OAuth consent screen, authorizes the app, and is redirected back as an authenticated user.

**Why this priority**: GitHub is the natural second provider for a developer/cooperative-focused platform like destroysaas.

**Independent Test**: Can be fully tested by clicking the GitHub sign-in button, completing the GitHub OAuth flow, and verifying the user lands on the dashboard authenticated.

**Acceptance Scenarios**:

1. **Given** an unauthenticated user on `/auth`, **When** they click "sign in with github", **Then** they are redirected to GitHub's OAuth authorization screen
2. **Given** the user authorizes the app on GitHub, **When** GitHub redirects back, **Then** the user is authenticated and redirected to `/` (or the `?next=` path)
3. **Given** a user who previously signed up with email and now signs in with GitHub using the same email, **When** the OAuth flow completes, **Then** the accounts are linked and the user is signed in

---

### User Story 3 - OAuth callback route (Priority: P1)

The app needs a server-side callback route at `/auth/callback` that exchanges the OAuth code for a session and redirects the user.

**Why this priority**: Without the callback route, neither Google nor GitHub OAuth can complete. This is infrastructure for both P1 and P2.

**Independent Test**: Can be tested by initiating an OAuth flow and verifying the callback correctly exchanges the code and sets the session cookie.

**Acceptance Scenarios**:

1. **Given** an OAuth provider redirects to `/auth/callback?code=XYZ`, **When** the route handler runs, **Then** it exchanges the code for a Supabase session via `exchangeCodeForSession`
2. **Given** a successful code exchange, **When** the session is set, **Then** the user is redirected to the `next` param or `/`
3. **Given** an invalid or expired code, **When** the exchange fails, **Then** the user is redirected to `/auth` with an error indication

---

### Edge Cases

- What happens when the user denies OAuth consent? They should return to `/auth` gracefully, no error crash.
- What happens when a user signs in with OAuth but their email matches an existing email/password account? Supabase links them by default — this is the desired behavior.
- What happens when the Supabase OAuth provider is not configured in the dashboard? The button click will fail — env vars and Supabase dashboard config are prerequisites.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST support Google OAuth sign-in via Supabase `signInWithOAuth({ provider: 'google' })`
- **FR-002**: System MUST support GitHub OAuth sign-in via Supabase `signInWithOAuth({ provider: 'github' })`
- **FR-003**: System MUST have a `/auth/callback` route that exchanges OAuth codes for sessions using `exchangeCodeForSession`
- **FR-004**: OAuth sign-in buttons MUST appear on the `/auth` page above or below the existing email/password form
- **FR-005**: The `?next=` redirect parameter MUST be preserved through the OAuth flow
- **FR-006**: System MUST handle OAuth errors gracefully (denied consent, expired codes) by redirecting to `/auth`

### Key Entities

- **Supabase Auth User**: Existing entity — OAuth adds `identities` array with provider data. No schema changes needed.
- **OAuth Providers**: Configured in Supabase dashboard (not in code). Google and GitHub client IDs/secrets are set there.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can sign in via Google OAuth and land authenticated in under 10 seconds
- **SC-002**: Users can sign in via GitHub OAuth and land authenticated in under 10 seconds
- **SC-003**: Existing email/password auth continues to work unchanged
- **SC-004**: OAuth callback handles all error cases without 500 errors
