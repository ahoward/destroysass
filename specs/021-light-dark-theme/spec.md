# Feature Specification: Light/Dark Theme System

**Feature Branch**: `021-light-dark-theme`
**Created**: 2026-02-22
**Status**: Ready
**Priority**: P0

> **Protocol**: Before working on this spec, run `./dev/pre_flight`. After any code change, run `./dev/test`. Before committing, run `./dev/post_flight`. See `bny/AGENTS.md` and `bny/guardrails.json` for full constraints.

## Summary

Implement a CSS custom properties-based theme system with light mode as default and dark mode as toggle. The current site is hardcoded dark (bg-[#0a0a0a], text-[#f0f0f0], bg-[#111], border-[#333], etc.) across all 14+ pages. This must be refactored to use CSS variables so both themes work consistently.

## Design Direction

**Light mode (default):** Clean, professional, high-contrast. White/light gray backgrounds, dark text. Feels like a legitimate business platform, not a developer tool. Think Stripe's marketing site or Linear's light mode.

**Dark mode:** Current look, preserved as opt-in. Toggle in the nav.

**Brand accent:** Red (#dc2626) stays in both modes.

## User Scenarios & Testing

### User Story 1 - Default Light Experience (Priority: P1)

New visitor lands on the site and sees a clean, light-themed interface by default.

**Acceptance Scenarios**:

1. **Given** a new visitor with no theme preference, **When** they visit any page, **Then** they see light mode (white/light backgrounds, dark text)
2. **Given** any page on the site, **When** viewed in light mode, **Then** all text is readable, all inputs are styled correctly, all borders are visible

### User Story 2 - Theme Toggle (Priority: P1)

User can switch between light and dark mode via a toggle in the navigation.

**Acceptance Scenarios**:

1. **Given** a user on any page, **When** they click the theme toggle, **Then** the page switches to the other theme immediately without page reload
2. **Given** a user who selected dark mode, **When** they navigate to another page, **Then** dark mode persists
3. **Given** a user who selected a theme, **When** they close and reopen the browser, **Then** their preference is remembered (localStorage)

### User Story 3 - System Preference Respect (Priority: P2)

If user hasn't manually toggled, respect their OS dark/light preference.

**Acceptance Scenarios**:

1. **Given** a user with OS dark mode and no manual toggle, **When** they visit, **Then** they see dark mode
2. **Given** a user who manually toggled to light, **When** their OS is dark, **Then** light mode wins (manual override)

## Requirements

### Functional Requirements

- **FR-001**: All hardcoded color values (bg-[#0a0a0a], text-[#f0f0f0], bg-[#111], border-[#333], bg-[#1a1a1a], etc.) MUST be replaced with CSS custom properties or Tailwind semantic classes
- **FR-002**: Theme toggle component in nav bar, visible on all pages
- **FR-003**: Theme preference stored in localStorage, applied before first paint (no flash)
- **FR-004**: CSS custom properties defined in globals.css for both themes
- **FR-005**: All 14+ pages must render correctly in both themes
- **FR-006**: Form inputs, buttons, cards, badges, progress bars — all must respect theme

### Key Approach

- Define CSS custom properties in `:root` (light) and `.dark` (dark mode)
- Use Tailwind's `dark:` variant with class strategy (not media query)
- Add a small client component `ThemeToggle` that reads/writes localStorage and toggles `.dark` on `<html>`
- Script in `<head>` to apply theme before paint (prevents flash)

## Success Criteria

- **SC-001**: All pages render correctly in light mode with no hardcoded dark colors leaking through
- **SC-002**: All pages render correctly in dark mode (current look preserved)
- **SC-003**: No flash of wrong theme on page load
- **SC-004**: Theme toggle visible and functional on all pages
- **SC-005**: `./dev/health` passes
