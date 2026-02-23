import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import { is_member, is_sudo } from "@/lib/groups";

export const metadata: Metadata = {
  title: "cabal — destroysass",
};

export default async function CabalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  // sudo can access everything; otherwise must be in cabal group
  const authorized =
    (await is_sudo(supabase, user)) || (await is_member(supabase, user.id, "cabal"));

  if (!authorized) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      {/* nav */}
      <nav className="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
        <a href="/" className="text-red-600 font-bold text-lg tracking-tight">
          destroysass
        </a>
        <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
          <a href="/ideas" className="hover:text-[var(--text-primary)] transition-colors">ideas</a>
          <a href="/dev-cells" className="hover:text-[var(--text-primary)] transition-colors">dev cells</a>
          <a href="/about" className="hover:text-[var(--text-primary)] transition-colors">about</a>
          <a href="/dashboard" className="hover:text-[var(--text-primary)] transition-colors">dashboard</a>
          <form action={signOut}>
            <button type="submit" className="hover:text-[var(--text-primary)] transition-colors">sign out</button>
          </form>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          the cabal
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          you&apos;re in. this is the inner circle.
        </p>

        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6 space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              this space is reserved for cabal members. content, discussions, and plans
              that aren&apos;t ready for the public live here.
            </p>
            <p className="text-[var(--text-muted)] text-sm">
              logged in as <span className="text-[var(--text-primary)]">{user.email}</span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
