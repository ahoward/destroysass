# Feature Spec: 011 — Dev Cell Profiles & Applications

## Summary

Developer cooperatives ("dev cells") can apply to be listed on destroysass. Once certified
by an admin, they appear on `/dev-cells` with a public profile. When cells form around
funded ideas, certified dev cells can be assigned to build them.

## Routes

- `app/dev-cells/page.tsx` — public listing of certified dev cells
- `app/dev-cells/apply/page.tsx` — application form (requires auth)
- `app/admin/page.tsx` — add dev cell application review section

## Database

### Table: dev_cells

```sql
create table if not exists dev_cells (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  description  text not null,
  website      text,
  skills       text[] not null default '{}',
  contact_email text not null,
  status       text not null default 'pending'
                 check (status in ('pending', 'approved', 'rejected')),
  applied_by   uuid references auth.users(id) on delete set null,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- RLS
alter table dev_cells enable row level security;
create policy "dev_cells_public_read" on dev_cells for select using (status = 'approved');
create policy "dev_cells_auth_insert" on dev_cells for insert with check (auth.uid() = applied_by);
```

## Dev Cells Public Page (`/dev-cells`)

- Lists all approved dev cells with: name, description, skills tags, website link
- Clean card layout, dark theme
- CTA: "apply to become a certified dev cell" → `/dev-cells/apply`

## Application Form (`/dev-cells/apply`)

- Auth required
- Fields: cooperative name, description, website (optional), skills (multi-select or comma-separated), contact email
- On submit: creates dev_cells row with status='pending'
- Success message: "your application is under review"
- Prevent duplicate applications: one pending application per user

## Admin Review (in `/admin`)

- New section: "dev cell applications" — shows all pending dev_cells
- For each: name, description, website, skills, contact email
- Approve button → sets status='approved'
- Reject button → sets status='rejected'
- Use service role client for admin mutations

## Acceptance Criteria

- [ ] `/dev-cells` shows approved dev cells
- [ ] `/dev-cells/apply` lets authenticated users apply
- [ ] Duplicate pending applications prevented
- [ ] Admin can approve/reject from `/admin`
- [ ] Approved cells appear on public page
- [ ] `./dev/health` returns ok
