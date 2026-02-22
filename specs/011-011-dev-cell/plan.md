# Plan: 011 — Dev Cell Profiles & Applications

## Files

| File | Action |
|------|--------|
| `supabase/migrations/004_dev_cells.sql` | create — dev_cells table + RLS |
| `app/dev-cells/page.tsx` | create — public listing of certified dev cells |
| `app/dev-cells/apply/page.tsx` | create — application form (auth-gated) |
| `app/dev-cells/apply/actions.ts` | create — submitApplication server action |
| `app/admin/page.tsx` | modify — add pending applications review section |
| `app/admin/actions.ts` | modify — add approveDevCell / rejectDevCell actions |

## DB Migration

Apply via Supabase Management API:
```
SUPABASE_ACCESS_TOKEN=sbp_7053248c464aee5969ede7606a8ec1e45fd5339f
curl -X POST https://api.supabase.com/v1/projects/bjaejvgoifgdanwvglnv/database/query \
  -H "Authorization: Bearer $SUPABASE_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "<SQL>"}'
```

## Notes

- Public read policy only shows approved cells (status = 'approved')
- Insert policy: authenticated user = applied_by
- Admin mutations use service role client to bypass RLS
- Skills stored as text[] (postgres array) — rendered as tags
