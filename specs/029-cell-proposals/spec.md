# Feature Specification: Cell Proposals

**Feature Branch**: `029-cell-proposals`
**Created**: 2026-02-28
**Status**: Draft
**Input**: User description: "cells propose solutions as docs after reviewing supporting materials from idea submitters"

> **Protocol**: Before working on this spec, run `./dev/pre_flight`. After any code change, run `./dev/test`. Before committing, run `./dev/post_flight`. See `bny/AGENTS.md` and `bny/guardrails.json` for full constraints.

## Context

The current idea lifecycle has a gap: once an idea hits threshold and admin triggers cell formation, there's no structured way for:
1. The idea submitter to share supporting materials (business plans, workflow docs, drawings, domain context) that cells need to build the right thing
2. Cells to submit written proposals explaining their approach before committing to building an MVP

Jumping straight to MVPs is expensive for cells. A proposal phase lets the collective evaluate thinking before committing to builds, and it gives cells the domain context they need to propose intelligently.

### Current lifecycle
```
proposed → gaining_traction → threshold_reached → [admin] cell_forming → active
```

### Proposed lifecycle
```
proposed → gaining_traction → threshold_reached → [admin] cell_forming → active
                                                       ↓
                                              idea submitter adds
                                              supporting materials
                                                       ↓
                                              cells review materials
                                              and submit proposals
                                                       ↓
                                              collective reviews proposals
                                              and selects finalist(s)
```

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Idea submitter adds supporting materials (Priority: P1)

When an idea reaches `cell_forming` status, the idea submitter can upload supporting materials — business plans, workflow descriptions, screenshots, drawings, domain documentation — that give cells the context they need to propose a solution.

**Why this priority**: Without supporting materials, cells are proposing blind. The quality of proposals depends entirely on the quality of context provided.

**Independent Test**: Idea submitter can upload files and add text to the materials section of their funded idea. Other users (and cells) can view the materials.

**Acceptance Scenarios**:

1. **Given** an idea in `cell_forming` status, **When** the idea creator visits the idea detail page, **Then** they see a "supporting materials" section where they can add content
2. **Given** materials have been added, **When** any authenticated user visits the idea, **Then** they can view the supporting materials
3. **Given** an idea NOT in `cell_forming` or later status, **When** the creator visits the idea, **Then** the materials section is not shown

---

### User Story 2 - Cell submits a proposal (Priority: P1)

A certified (approved) cell can submit a written proposal for a funded idea. The proposal explains their approach — how they'd solve the problem, what they'd build, timeline, team, and product vision.

**Why this priority**: This is the core feature — cells competing on ideas rather than product vision alone.

**Independent Test**: An approved cell member can submit a proposal document for a `cell_forming` idea. The proposal appears on the idea detail page.

**Acceptance Scenarios**:

1. **Given** an approved cell and an idea in `cell_forming` status, **When** a cell member visits the idea, **Then** they see a "submit proposal" option
2. **Given** a cell submits a proposal, **When** other users view the idea, **Then** they can read the proposal
3. **Given** a cell has already submitted a proposal for an idea, **When** they visit the idea, **Then** they can edit their existing proposal (but not submit a second one)
4. **Given** a cell that is NOT approved, **When** they visit a `cell_forming` idea, **Then** they do NOT see the submit proposal option

---

### User Story 3 - Collective reviews proposals (Priority: P2)

Idea sponsors (users who have pledged) can view all proposals for a funded idea and signal which proposal they prefer. This is advisory — the admin makes the final call or the collective votes.

**Why this priority**: Builds on P1 stories. The viewing is the core value; formal voting can come later.

**Independent Test**: A pledged user can view all proposals side-by-side on the idea detail page and see which proposals others prefer.

**Acceptance Scenarios**:

1. **Given** an idea with multiple proposals, **When** a sponsor visits the idea, **Then** they see all proposals listed
2. **Given** a sponsor viewing proposals, **When** they indicate a preference, **Then** their preference is recorded and visible to others

---

### Edge Cases

- What happens if no cells submit proposals? The idea stays in `cell_forming` — no timeout, no automatic cancellation.
- What happens if the idea submitter never adds materials? Cells can still submit proposals — materials are helpful but not required.
- Can non-sponsor users view proposals? Yes — proposals are public once submitted (transparency).
- Can a cell withdraw their proposal? Yes, they can delete it before a winner is selected.
- File upload limits? Reasonable limits on file size (10MB per file, 50MB total per idea) and file types (PDF, images, markdown, plain text).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST allow idea creators to add supporting materials (text + file uploads) to ideas in `cell_forming` status or later
- **FR-002**: System MUST allow approved cell members to submit one proposal per idea per cell
- **FR-003**: System MUST display proposals on the idea detail page for all authenticated users
- **FR-004**: System MUST allow cell members to edit or withdraw their proposal before a winner is selected
- **FR-005**: System MUST allow sponsors (pledged users) to indicate a preference for a proposal
- **FR-006**: Supporting materials MUST support file uploads (PDF, images, text) stored in Supabase Storage
- **FR-007**: Proposals MUST be text-based documents (rich text or markdown)

### Key Entities

- **Supporting Materials**: Text content + file attachments linked to an idea. Only editable by the idea creator.
- **Proposal**: A document submitted by a cell for a specific idea. One per cell per idea. Contains approach, timeline, team info, and product vision.
- **Proposal Preference**: A signal from a sponsor indicating which proposal they prefer. One per sponsor per idea.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Idea creators can add supporting materials within 5 minutes of the idea reaching `cell_forming`
- **SC-002**: Cells can submit proposals that reference the supporting materials
- **SC-003**: Sponsors can view and compare all proposals for a funded idea
- **SC-004**: The proposal with the most sponsor preferences is visually indicated
