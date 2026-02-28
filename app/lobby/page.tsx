import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { is_inner } from "@/lib/groups";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "lobby — destroysaas",
};

export default async function LobbyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/lobby");
  }

  if (await is_inner(supabase, user)) {
    redirect("/dashboard");
  }

  // fetch platform stats
  const { count: idea_count } = await supabase
    .from("idea_board")
    .select("*", { count: "exact", head: true });

  const { data: pledge_stats } = await supabase
    .from("pledges")
    .select("amount_monthly, user_id");

  const total_pledged = (pledge_stats ?? []).reduce(
    (sum, p) => sum + Number(p.amount_monthly),
    0
  );
  const total_sponsors = new Set(
    (pledge_stats ?? []).map((p) => p.user_id)
  ).size;

  // fetch recent ideas (last 10)
  const { data: recent_ideas } = await supabase
    .from("idea_board")
    .select("id, title, status, total_pledged, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  // check if user has an existing application
  const { data: application } = await supabase
    .from("cabal_applications")
    .select("id, status, created_at")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/lobby" />

      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        <h1 className="text-3xl font-bold tracking-tight mb-2">the lobby</h1>
        <p className="text-[var(--text-muted)] text-sm mb-10">
          you&apos;re in. here&apos;s what the inner circle is building.
        </p>

        {/* stats bar */}
        <section className="grid grid-cols-3 gap-4 mb-12">
          <div className="border border-[var(--border-primary)] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600 tabular-nums">
              {idea_count ?? 0}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1">ideas</div>
          </div>
          <div className="border border-[var(--border-primary)] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600 tabular-nums">
              ${total_pledged.toLocaleString()}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1">
              pledged/mo
            </div>
          </div>
          <div className="border border-[var(--border-primary)] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600 tabular-nums">
              {total_sponsors}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1">
              sponsors
            </div>
          </div>
        </section>

        {/* what's been built */}
        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            what we&apos;ve shipped
          </h2>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            {[
              "idea board with search, sort, filter, categories",
              "pledge mechanics ($25\u2013$500/mo, auto-status triggers)",
              "cell applications and certification pipeline",
              "comments, upvoting, and social sharing",
              "stakeholder-targeted content (business, dev, investor)",
              "groups infrastructure + invitation system",
              "ghost users for market simulation",
              "light/dark theme system",
              "philosophy page (FSF lineage, credit union model)",
            ].map((item) => (
              <div key={item} className="flex gap-2">
                <span className="text-red-600 shrink-0">&bull;</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* what's next */}
        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            what&apos;s next
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "stripe integration",
                desc: "turn pledge commitments into real monthly subscriptions.",
              },
              {
                title: "customer discovery",
                desc: "talking to 20 SMBs bleeding on SaaS costs. finding the first cell\u2019s problem.",
              },
              {
                title: "cell recruitment",
                desc: "vetting 3\u20135 product cooperatives to certify \u2014 teams that own product, design, eng, and ops.",
              },
              {
                title: "platform entity formation",
                desc: "filing the LLC/LCA for destroysaas itself. EIN, bank account, legal rails.",
              },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-[var(--border-primary)] pl-4">
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-[var(--text-muted)] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* recent ideas */}
        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            recent ideas on the board
          </h2>
          {(recent_ideas ?? []).length === 0 ? (
            <p className="text-sm text-[var(--text-faint)] italic">
              no ideas yet.
            </p>
          ) : (
            <div className="space-y-2">
              {(recent_ideas ?? []).map((idea) => (
                <a
                  key={idea.id}
                  href={`/ideas/${idea.id}`}
                  className="block border border-[var(--border-primary)] rounded-lg px-4 py-3 hover:border-[var(--border-secondary)] transition-colors"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium truncate">{idea.title}</p>
                    <span className="text-sm text-red-600 font-bold tabular-nums shrink-0">
                      ${Number(idea.total_pledged).toLocaleString()}/mo
                    </span>
                  </div>
                </a>
              ))}
              <a
                href="/ideas"
                className="block text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors mt-2"
              >
                browse all ideas &rarr;
              </a>
            </div>
          )}
        </section>

        {/* apply CTA */}
        <section className="border-t border-[var(--border-primary)] pt-10">
          {application?.status === "pending" ? (
            <div className="border border-yellow-800 rounded-lg p-6 text-center">
              <p className="text-sm text-yellow-600 font-medium mb-1">
                your application is pending review
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                submitted{" "}
                {new Date(application.created_at).toLocaleDateString()}. we&apos;ll
                be in touch.
              </p>
            </div>
          ) : application?.status === "denied" ? (
            <div className="text-center">
              <p className="text-sm text-[var(--text-muted)] mb-4">
                your previous application was not approved. you can re-apply if
                your circumstances have changed.
              </p>
              <a
                href="/lobby/apply"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded text-sm transition-colors"
              >
                re-apply for the inner cabal &rarr;
              </a>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">want in?</h2>
              <p className="text-[var(--text-muted)] text-sm mb-6">
                the inner cabal shapes what gets built. apply to join.
              </p>
              <a
                href="/lobby/apply"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded text-sm transition-colors"
              >
                apply for the inner cabal &rarr;
              </a>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
