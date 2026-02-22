-- Migration 003: Allow idea creators to delete their own ideas
-- Applied: 2026-02-21

create policy "ideas_owner_delete" on ideas for delete using (auth.uid() = created_by);
