# Feature Spec: 012 — Idea Comments & Discussion

## Summary

Add a comment/discussion thread to each idea page. Users can discuss concepts,
ask questions, share refinements, and build consensus before pledging.

## Database

```sql
create table if not exists comments (
  id         uuid primary key default gen_random_uuid(),
  idea_id    uuid not null references ideas(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  body       text not null,
  created_at timestamptz not null default now()
);

alter table comments enable row level security;
create policy "comments_public_read" on comments for select using (true);
create policy "comments_auth_insert" on comments for insert with check (auth.uid() = user_id);
create policy "comments_owner_delete" on comments for delete using (auth.uid() = user_id);
```

Apply via Management API:
```
SUPABASE_ACCESS_TOKEN=sbp_7053248c464aee5969ede7606a8ec1e45fd5339f
curl -X POST https://api.supabase.com/v1/projects/bjaejvgoifgdanwvglnv/database/query \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "<SQL>"}'
```

## Routes

- `app/ideas/[id]/page.tsx` — add comments section below pledge panel
- `app/ideas/[id]/comments.tsx` — client component: comment list + form
- `app/ideas/[id]/actions.ts` — add `postComment` and `deleteComment` server actions

## Comment Display

- Below the pledge panel on /ideas/[id]
- Newest first
- Each comment: display name (email prefix before @), body, relative time
- Delete button on own comments (small "×" icon)
- Comment form: textarea + submit button, auth required
- Non-auth users see "sign in to join the discussion"

## Validation

- body: min 1 char, max 2000 chars, trimmed
- idea must exist
- user must be authenticated

## Acceptance Criteria

- [ ] Comments display on idea detail page
- [ ] Authenticated users can post comments
- [ ] Users can delete their own comments
- [ ] Non-auth users see sign-in prompt
- [ ] `./dev/health` returns ok
