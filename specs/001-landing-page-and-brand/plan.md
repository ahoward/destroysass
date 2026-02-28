# Implementation Plan: 001 — Landing Page + Brand

## Approach

Single file change: rewrite `app/page.tsx` completely. The existing file has the generic
Next.js + Supabase boilerplate. Replace with a branded landing page using Tailwind classes.
Reuse the existing Supabase server client for auth state. No new files needed.

## Files Changed

| File | Action | Notes |
|------|--------|-------|
| `app/page.tsx` | Rewrite | Main landing page — full replacement |
| `app/globals.css` | Maybe update | Only if custom CSS variables needed for bg color |

## Component Structure

`app/page.tsx` is a server component that:
1. Calls `createClient()` from `lib/supabase/server.ts` to get the Supabase client
2. Calls `supabase.auth.getUser()` to determine auth state
3. Returns full page HTML using Tailwind classes

No client components needed. The "sign out" action already exists in the auth pattern
and is handled via a server action or form post.

## Implementation Steps

1. Check what the current `app/page.tsx` and `app/layout.tsx` look like
2. Check `app/auth/` for the existing sign-out pattern to reuse
3. Rewrite `app/page.tsx` with:
   - Nav: destroysaas (red) + auth state (sign in or email + sign out)
   - Hero: large headline + subtitle
   - Problem statement paragraph
   - 3-step section (propose / pledge / own)
   - CTA button + secondary link
   - Footer with tagline + links
4. Apply dark color scheme via Tailwind bg/text classes
5. Test locally if possible, else rely on Vercel build

## Tailwind Class Strategy

Use Tailwind's built-in dark classes directly:
- Container: `bg-[#0a0a0a] min-h-screen text-[#f0f0f0]`
- Accent: `text-red-600`
- Muted text: `text-gray-500`
- Max width: `max-w-2xl mx-auto px-6`

## Risk

Low. Single file. No database. No new dependencies. The only risk is breaking the existing
auth flow — mitigated by reusing the exact same Supabase client pattern as the current file.
