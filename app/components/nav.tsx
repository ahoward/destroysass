import { createClient } from "@/lib/supabase/server";
import { is_member, is_sudo, is_inner } from "@/lib/groups";

type NavProps = {
  currentPath: string;
};

const PUBLIC_LINKS = [
  { href: "/math", label: "math" },
  { href: "/ideas", label: "ideas" },
  { href: "/cells", label: "cells" },
  { href: "/about", label: "about" },
];

function isActive(currentPath: string, href: string): boolean {
  if (href === "/") return currentPath === "/";
  return currentPath === href || currentPath.startsWith(href + "/");
}

export default async function Nav({ currentPath }: NavProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // check access levels
  let showCabal = false;
  let userIsInner = false;
  if (user) {
    showCabal =
      (await is_sudo(supabase, user)) ||
      (await is_member(supabase, user.id, "cabal"));
    userIsInner = await is_inner(supabase, user);
  }

  // derive display name from email
  const displayName = user?.email?.split("@")[0] ?? "";

  return (
    <nav className="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
      <a href="/" className="text-red-600 font-bold text-lg tracking-tight hover:text-red-500 transition-colors">
        destroysaas
      </a>
      <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
        {/* cabal — first, only if member */}
        {showCabal && (
          <a
            href="/cabal"
            className={
              isActive(currentPath, "/cabal")
                ? "text-red-600 font-medium"
                : "hover:text-[var(--text-primary)] transition-colors"
            }
          >
            cabal
          </a>
        )}

        {/* public links */}
        {PUBLIC_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={
              isActive(currentPath, link.href)
                ? "text-[var(--text-primary)] font-medium"
                : "hover:text-[var(--text-primary)] transition-colors"
            }
          >
            {link.label}
          </a>
        ))}

        {/* lobby link for non-inner authenticated users */}
        {user && !userIsInner && (
          <a
            href="/lobby"
            className={
              isActive(currentPath, "/lobby")
                ? "text-[var(--text-primary)] font-medium"
                : "hover:text-[var(--text-primary)] transition-colors"
            }
          >
            lobby
          </a>
        )}

        {/* auth */}
        {user ? (
          <a
            href="/me"
            className={
              isActive(currentPath, "/me")
                ? "text-[var(--text-primary)] font-medium"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            }
          >
            {displayName}
          </a>
        ) : (
          <a href="/auth" className="hover:text-[var(--text-primary)] transition-colors">
            sign in
          </a>
        )}
      </div>
    </nav>
  );
}
