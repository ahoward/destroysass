# Implementation Plan: Cell Proposals

**Branch**: `029-cell-proposals` | **Date**: 2026-02-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/029-cell-proposals/spec.md`

> **Protocol**: Before working on this plan, run `./dev/pre_flight`. After any code change, run `./dev/test`. Before committing, run `./dev/post_flight`. See `bny/AGENTS.md` and `bny/guardrails.json` for full constraints.

## Summary

Add a proposal phase to the idea lifecycle: after an idea reaches `cell_forming`, the idea creator can add supporting materials (text + file uploads), and certified cells can submit written proposals. Sponsors can view/compare proposals and signal preferences. This bridges the gap between "idea is funded" and "cells build MVPs."

## Technical Context

**Language/Version**: TypeScript / Next.js 16 (App Router)
**Primary Dependencies**: `@supabase/supabase-js` (v2.97.0), `@supabase/ssr` (v0.8.0)
**Storage**: Supabase PostgreSQL + Supabase Storage (for file uploads)
**Testing**: Playwright (e2e), `./dev/test`
**Target Platform**: Web (Vercel)
**Project Type**: Web (Next.js monolith)

## Implementation Steps

### Step 1: Database migrations

**New migration**: `supabase/migrations/014_proposals.sql`

```sql
-- Supporting materials (text content per idea, editable by creator)
create table if not exists idea_materials (
  id         uuid primary key default gen_random_uuid(),
  idea_id    uuid not null references ideas(id) on delete cascade,
  body       text not null default '',
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(idea_id)  -- one materials entry per idea
);

-- File attachments for materials
create table if not exists idea_attachments (
  id         uuid primary key default gen_random_uuid(),
  idea_id    uuid not null references ideas(id) on delete cascade,
  file_name  text not null,
  file_path  text not null,  -- Supabase Storage path
  file_size  integer not null,
  mime_type  text not null,
  uploaded_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Cell proposals
create table if not exists proposals (
  id         uuid primary key default gen_random_uuid(),
  idea_id    uuid not null references ideas(id) on delete cascade,
  cell_id    uuid not null references cells(id) on delete cascade,
  title      text not null,
  body       text not null,
  submitted_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(idea_id, cell_id)  -- one proposal per cell per idea
);

-- Sponsor preferences
create table if not exists proposal_preferences (
  id          uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references proposals(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  idea_id     uuid not null references ideas(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique(user_id, idea_id)  -- one preference per sponsor per idea
);
```

RLS policies:
- `idea_materials`: public read, creator insert/update (only for ideas they created)
- `idea_attachments`: public read, creator insert/delete
- `proposals`: public read, cell member insert/update/delete
- `proposal_preferences`: public read, sponsors (pledged users) insert/update/delete

**Supabase Storage bucket**: `idea-materials` — public read, authenticated upload, 10MB file size limit

### Step 2: Supporting materials UI on idea detail page

**File**: `app/ideas/[id]/page.tsx` (MODIFY)

Add a "supporting materials" section that appears when idea status is `cell_forming` or later:
- If current user is the idea creator: show editable text area + file upload
- If any other user: show read-only materials + downloadable attachments
- If no materials added yet: show placeholder encouraging creator to add context

**New component**: `app/ideas/[id]/materials.tsx`
- Text editor (simple textarea, not rich text — keep it simple)
- File upload with drag-and-drop or click
- List of uploaded files with download links and delete buttons (creator only)
- Server actions for save/upload/delete

### Step 3: Proposal submission UI

**New component**: `app/ideas/[id]/proposal_form.tsx`
- Appears only for members of approved cells, on ideas in `cell_forming` status
- Fields: title, body (textarea)
- Edit mode if cell already has a proposal
- Delete/withdraw button

**New component**: `app/ideas/[id]/proposals.tsx`
- Lists all proposals for the idea
- Shows cell name, proposal title, body, submission date
- Shows preference count per proposal
- "I prefer this" button for sponsors (pledged users)

**Server actions**: `app/ideas/[id]/proposal_actions.ts`
- `submitProposal(ideaId, cellId, title, body)`
- `updateProposal(proposalId, title, body)`
- `deleteProposal(proposalId)`
- `setPreference(proposalId, ideaId)`

### Step 4: Wire into idea detail page

**File**: `app/ideas/[id]/page.tsx` (MODIFY)

Add materials and proposals sections below the existing pledge panel, visible only when idea is in `cell_forming` or later status. Order:
1. Existing content (description, problem, pledge bar, pledge panel)
2. Supporting materials section
3. Proposals section (with preference buttons for sponsors)

## Files Changed

```text
supabase/migrations/
└── 014_proposals.sql            # NEW — tables + RLS + storage bucket

app/ideas/[id]/
├── page.tsx                     # MODIFIED — add materials + proposals sections
├── materials.tsx                # NEW — supporting materials component
├── proposals.tsx                # NEW — proposal listing + preferences
├── proposal_form.tsx            # NEW — proposal submit/edit form
└── proposal_actions.ts          # NEW — server actions for proposals
```

## Complexity Tracking

No violations. Standard Supabase tables + Next.js components following existing patterns.
