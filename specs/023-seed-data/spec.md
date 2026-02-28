# Feature Specification: Seed Data Strategy

**Feature Branch**: `023-seed-data`
**Created**: 2026-02-22
**Status**: Ready
**Priority**: P0

> **Protocol**: Before working on this spec, run `./dev/pre_flight`. After any code change, run `./dev/test`. Before committing, run `./dev/post_flight`. See `bny/AGENTS.md` and `bny/guardrails.json` for full constraints.

## Summary

Create realistic seed data to solve the cold start problem. The board needs to look alive on day one with diverse ideas, believable users, pledges at various stages, comments, and upvotes. All seed data is flagged with `is_seed` for clean rollback.

## User Scenarios & Testing

### User Story 1 - Seed Script (Priority: P1)

Developer runs a single command to populate the database with realistic seed data.

**Acceptance Scenarios**:

1. **Given** a fresh or existing database, **When** `bun run seed` is executed, **Then** seed data is created: ~30 user profiles, ~11 ideas across diverse verticals, distributed pledges, comments, and upvotes
2. **Given** seed data already exists, **When** seed script runs again, **Then** it is idempotent (skips if seed data detected)

### User Story 2 - Seed Rollback (Priority: P1)

Developer runs a single command to cleanly remove all seed data.

**Acceptance Scenarios**:

1. **Given** a database with seed data, **When** `bun run seed:rollback` is executed, **Then** all records with `is_seed=true` are removed
2. **Given** a database with real + seed data, **When** rollback runs, **Then** only seed data is removed, real data is untouched

### User Story 3 - Realistic Board (Priority: P1)

The seeded board looks believable to a new visitor.

**Acceptance Scenarios**:

1. **Given** seeded data, **When** viewing the ideas board, **Then** ideas span multiple categories/verticals (not all tech)
2. **Given** seeded data, **When** viewing pledge totals, **Then** some ideas are near threshold (~$800-900/mo), some mid-range (~$300-500), some early (~$50-100) — creating a sense of momentum
3. **Given** seeded data, **When** viewing an idea detail page, **Then** there are realistic comments and upvotes from different seed users

## Requirements

### Functional Requirements

- **FR-001**: `is_seed` boolean column added to: `ideas`, `pledges`, `profiles`, `comments`, `upvotes` tables (default false)
- **FR-002**: Seed script creates ~30 user profiles with realistic display names, bios, and business types
- **FR-003**: Seed script creates ~11 ideas across diverse SMB verticals: restaurants, legal, healthcare, construction, retail, agriculture, logistics, education, real estate, creative agencies, nonprofits
- **FR-004**: Each idea has a realistic title, description, and category
- **FR-005**: Pledges distributed to create varied totals (some near threshold, some early)
- **FR-006**: Each idea has 2-8 comments from different seed users
- **FR-007**: Upvotes distributed realistically (more popular ideas have more)
- **FR-008**: Rollback script deletes all `is_seed=true` records in correct order (upvotes → comments → pledges → ideas → profiles)
- **FR-009**: Seed users use non-functional email addresses (e.g., seed-user-01@destroysaas.local) so password resets don't send real emails

### Database Changes

- Add `is_seed boolean default false` to: ideas, pledges, profiles, comments, upvotes
- Supabase migration via Management API

### Key Files

- `scripts/seed.ts` — seed script
- `scripts/seed-rollback.ts` — rollback script
- `scripts/seed-data.ts` — the actual data (users, ideas, comments)
- package.json scripts: `"seed"` and `"seed:rollback"`

## Success Criteria

- **SC-001**: `bun run seed` populates board with realistic data in under 30 seconds
- **SC-002**: `bun run seed:rollback` cleanly removes all seed data
- **SC-003**: Seeded board looks believable (diverse verticals, varied pledge amounts, real-sounding comments)
- **SC-004**: `./dev/health` passes with seed data present
- **SC-005**: No seed user accounts can receive real emails
