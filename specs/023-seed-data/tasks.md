# Tasks: Seed Data Strategy

## Database Migration

- [ ] Apply Supabase migration: add `is_seed boolean default false` to tables: ideas, pledges, profiles, comments, upvotes. Use the Supabase Management API SQL endpoint (see bny/decisions.md for pattern). Update RLS policies if needed to allow `is_seed` column in inserts.

## Seed Data Content

- [ ] Create `scripts/seed-data.ts` with exported arrays:
  - `seedUsers`: ~30 users with realistic names, bios, business descriptions. Diverse: restaurant owner, lawyer, contractor, farmer, nonprofit director, real estate agent, etc. Emails: `seed-user-NN@destroysaas.local`
  - `seedIdeas`: 11 ideas across verticals:
    1. Restaurant inventory & menu management
    2. Small law firm case management
    3. Independent contractor invoicing & scheduling
    4. Small farm crop planning & sales tracking
    5. Nonprofit donor management & grant tracking
    6. Local retail POS & inventory
    7. Construction project management & bidding
    8. Small clinic patient scheduling
    9. Real estate listing & lead management
    10. Creative agency project & client portal
    11. Local logistics / delivery route optimization
  - Each idea: title, full description (2-3 paragraphs, written from the SMB owner's perspective), category, monthly_amount range
  - `seedComments`: 50-70 comments, realistic discussions about each idea. Mix of "I need this too", "what about X feature", "my current solution costs $Y/mo", "would this integrate with Z"
  - `seedPledgeDistribution`: mapping of which users pledge to which ideas, at what amounts. Create a realistic spread: 2-3 ideas near threshold ($800-950/mo), 3-4 mid-range ($300-500), 4-5 early ($50-150)

## Seed Script

- [ ] Create `scripts/seed.ts`:
  - Check if seed data already exists (query profiles where is_seed=true, skip if count > 0)
  - Create auth users via `supabase.auth.admin.createUser()` with `email_confirm: true`
  - Insert profiles with `is_seed: true`
  - Insert ideas with `is_seed: true`
  - Insert pledges with `is_seed: true` (use the distribution mapping)
  - Insert comments with `is_seed: true`
  - Insert upvotes with `is_seed: true`
  - Log progress to stdout
  - Use service role key for admin operations

## Rollback Script

- [ ] Create `scripts/seed-rollback.ts`:
  - Query all profiles where is_seed=true, collect user IDs
  - Delete in order: upvotes → comments → pledges → ideas → profiles (all where is_seed=true)
  - Delete auth users via `supabase.auth.admin.deleteUser()`
  - Log progress to stdout

## Integration

- [ ] Add to `package.json`: `"seed": "bun scripts/seed.ts"`, `"seed:rollback": "bun scripts/seed-rollback.ts"`
- [ ] Ensure scripts use env vars: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

## Verification

- [ ] Run `bun run seed` — verify data appears on the live board
- [ ] Run `bun run seed:rollback` — verify all seed data removed, real data untouched
- [ ] Run `./dev/test` — passes
- [ ] Run `./dev/post_flight` — build succeeds
- [ ] Commit: `023 — seed data with realistic SMB ideas, users, pledges, comments, upvotes`
