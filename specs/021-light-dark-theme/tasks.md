# Tasks: Light/Dark Theme System

## Setup

- [ ] Update `app/globals.css` with CSS custom properties for light (`:root`) and dark (`.dark`) themes. Remove the `@media (prefers-color-scheme: dark)` block. Define: `--bg-primary`, `--bg-secondary`, `--bg-tertiary`, `--bg-input`, `--text-primary`, `--text-secondary`, `--text-muted`, `--border-primary`, `--border-secondary`, `--accent`. Light values: whites/grays. Dark values: current hardcoded colors (#0a0a0a, #111, #1a1a1a, #333, #f0f0f0, etc.)
- [ ] Create `app/components/theme_toggle.tsx` — client component with "use client". Sun/moon SVG icon toggle. Reads `localStorage.getItem('theme')`, defaults to `'light'`. On click: toggles `.dark` on `document.documentElement`, saves to localStorage. Use simple inline SVGs, no icon library.
- [ ] Update `app/layout.tsx` — add inline `<script>` in `<head>` (via `dangerouslySetInnerHTML`) that reads localStorage theme and applies `.dark` class before paint. Import and render `ThemeToggle` in a persistent nav/header area visible on all pages. If no shared nav exists, create a minimal `app/components/header.tsx` with the site name/link and ThemeToggle.

## Page Refactoring

Replace ALL hardcoded color classes with CSS variable equivalents. Pattern: `bg-[#0a0a0a]` → `bg-[var(--bg-primary)]`, `text-[#f0f0f0]` → `text-[var(--text-primary)]`, `bg-[#111]` → `bg-[var(--bg-input)]`, `border-[#333]` → `border-[var(--border-primary)]`, `bg-[#1a1a1a]` → `bg-[var(--bg-tertiary)]`, `text-gray-400/500` → `text-[var(--text-secondary)]`, `bg-black` → `bg-[var(--bg-primary)]`, `text-white` → `text-[var(--text-primary)]`.

- [ ] Refactor `app/page.tsx` (landing page)
- [ ] Refactor `app/ideas/page.tsx` (idea board) + `app/ideas/ideas_filter.tsx` + `app/ideas/loading.tsx`
- [ ] Refactor `app/ideas/[id]/page.tsx` + `pledge_panel.tsx` + `comments.tsx` + `upvote_button.tsx`
- [ ] Refactor `app/ideas/new/page.tsx` + `form.tsx`
- [ ] Refactor `app/auth/page.tsx`
- [ ] Refactor `app/dashboard/page.tsx` + `verify_banner.tsx` + `withdraw_button.tsx`
- [ ] Refactor `app/dashboard/profile/page.tsx` + `form.tsx`
- [ ] Refactor `app/admin/page.tsx` + `dev_cell_review_button.tsx` + `cell_form_button.tsx`
- [ ] Refactor `app/about/page.tsx`
- [ ] Refactor `app/dev-cells/page.tsx` + `app/dev-cells/apply/page.tsx` + `form.tsx`
- [ ] Refactor `app/terms/page.tsx` + `app/privacy/page.tsx`
- [ ] Refactor `app/profile/[id]/page.tsx`
- [ ] Refactor `app/components/footer.tsx`

## Verification

- [ ] Run `./dev/test` — all tests pass
- [ ] Run `./dev/post_flight` — build succeeds, type check passes
- [ ] Manually verify: no hardcoded dark color values remain in any .tsx file (grep for `#0a0a0a`, `#111`, `#1a1a1a`, `#333`, `bg-black text-white` patterns that aren't inside CSS variable definitions)
- [ ] Commit all changes with message: `021 — light/dark theme system with toggle and CSS custom properties`
