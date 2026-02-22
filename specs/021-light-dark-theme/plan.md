# Implementation Plan: Light/Dark Theme System

## Approach

1. Set up CSS custom properties and Tailwind dark mode class strategy
2. Create ThemeToggle component and anti-flash script
3. Refactor all pages to use theme variables instead of hardcoded colors
4. Test both themes on every page

## Architecture

### CSS Custom Properties (globals.css)

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --bg-tertiary: #e5e5e5;
  --bg-input: #ffffff;
  --text-primary: #171717;
  --text-secondary: #525252;
  --text-muted: #737373;
  --border-primary: #e5e5e5;
  --border-secondary: #d4d4d4;
  --accent: #dc2626;
}

.dark {
  --bg-primary: #0a0a0a;
  --bg-secondary: #111111;
  --bg-tertiary: #1a1a1a;
  --bg-input: #111111;
  --text-primary: #f0f0f0;
  --text-secondary: #a3a3a3;
  --text-muted: #737373;
  --border-primary: #333333;
  --border-secondary: #262626;
  --accent: #dc2626;
}
```

### ThemeToggle Component

Client component with sun/moon icon. Reads localStorage('theme'), defaults to 'light'. Toggles `.dark` class on `document.documentElement`.

### Anti-Flash Script

Inline `<script>` in `<head>` of layout.tsx that reads localStorage and applies `.dark` class before body renders.

## File Changes

- `app/globals.css` — CSS custom properties
- `app/layout.tsx` — anti-flash script, ThemeToggle in nav area
- `app/components/theme_toggle.tsx` — new client component
- All page files — replace hardcoded colors with theme variables
- `app/components/footer.tsx` — replace hardcoded colors
- `app/components/nav.tsx` — add ThemeToggle (create nav if doesn't exist)

## Pages to Refactor (all of them)

1. app/page.tsx (landing)
2. app/ideas/page.tsx (board)
3. app/ideas/[id]/page.tsx (detail)
4. app/ideas/new/page.tsx + form.tsx
5. app/auth/page.tsx
6. app/dashboard/page.tsx
7. app/dashboard/profile/page.tsx + form.tsx
8. app/admin/page.tsx
9. app/about/page.tsx
10. app/dev-cells/page.tsx
11. app/dev-cells/apply/page.tsx + form.tsx
12. app/terms/page.tsx
13. app/privacy/page.tsx
14. app/profile/[id]/page.tsx
15. app/components/footer.tsx
16. app/ideas/ideas_filter.tsx
17. app/ideas/[id]/pledge_panel.tsx
18. app/ideas/[id]/comments.tsx
19. app/ideas/[id]/upvote_button.tsx
20. app/ideas/loading.tsx
21. app/dashboard/verify_banner.tsx
22. app/dashboard/withdraw_button.tsx
