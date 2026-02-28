import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import Nav from "@/app/components/nav";
import { user_groups } from "@/lib/groups";

export const metadata: Metadata = {
  title: "account — destroysaas",
};

export default async function MePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/me");
  }

  const groups = await user_groups(supabase, user.id);
  const displayName = user.email?.split("@")[0] ?? "";
  const verified = !!user.email_confirmed_at;
  const memberSince = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/me" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-2">
          {displayName}
        </h1>
        <p className="text-[var(--text-muted)] text-sm mb-16">
          your account
        </p>

        {/* details */}
        <section className="mb-16 space-y-4">
          <div className="flex justify-between items-baseline border-b border-[var(--border-primary)] pb-3">
            <span className="text-[var(--text-muted)] text-sm">email</span>
            <span className="text-sm">{user.email}</span>
          </div>
          <div className="flex justify-between items-baseline border-b border-[var(--border-primary)] pb-3">
            <span className="text-[var(--text-muted)] text-sm">verified</span>
            <span className={`text-sm ${verified ? "text-green-500" : "text-red-500"}`}>
              {verified ? "yes" : "no"}
            </span>
          </div>
          <div className="flex justify-between items-baseline border-b border-[var(--border-primary)] pb-3">
            <span className="text-[var(--text-muted)] text-sm">member since</span>
            <span className="text-sm">{memberSince}</span>
          </div>
          <div className="flex justify-between items-baseline border-b border-[var(--border-primary)] pb-3">
            <span className="text-[var(--text-muted)] text-sm">groups</span>
            <span className="text-sm">
              {groups.length > 0 ? groups.join(", ") : "none"}
            </span>
          </div>
        </section>

        {/* links */}
        <section className="mb-16 space-y-3">
          <a
            href="/dashboard"
            className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            go to dashboard &rarr;
          </a>
          <a
            href={`/profile/${user.id}`}
            className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            view public profile &rarr;
          </a>
          <a
            href="/dashboard/profile"
            className="block text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            edit profile &rarr;
          </a>
        </section>

        {/* sign out */}
        <section className="border-t border-[var(--border-primary)] pt-8">
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors"
            >
              sign out
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
