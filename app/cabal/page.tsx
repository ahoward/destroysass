import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import Nav from "@/app/components/nav";
import { is_member, is_sudo } from "@/lib/groups";

export const metadata: Metadata = {
  title: "cabal — destroysaas",
};

export default async function CabalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const authorized =
    (await is_sudo(supabase, user)) ||
    (await is_member(supabase, user.id, "cabal"));

  if (!authorized) {
    notFound();
  }

  // fetch key metrics
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

  const { count: comment_count } = await supabase
    .from("comments")
    .select("id", { count: "exact", head: true });

  const { count: upvote_count } = await supabase
    .from("upvotes")
    .select("id", { count: "exact", head: true });

  // service role for user count + cell counts
  let user_count = 0;
  let cells_pending = 0;
  let cells_approved = 0;

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (serviceRoleKey) {
    const adminClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      serviceRoleKey
    );
    const { data: usersData } = await adminClient.auth.admin.listUsers({
      page: 1,
      perPage: 1,
    });
    const api_total = (
      usersData as unknown as { total?: number } | null
    )?.total;
    user_count = api_total ?? 0;

    const { count: pending } = await adminClient
      .from("cells")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending");
    cells_pending = pending ?? 0;

    const { count: approved } = await adminClient
      .from("cells")
      .select("id", { count: "exact", head: true })
      .eq("status", "approved");
    cells_approved = approved ?? 0;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/cabal" />
      {/* cabal sub-nav */}
      <div className="max-w-2xl mx-auto px-6 pt-2 flex gap-4 text-sm border-b border-red-600 pb-3">
        <a href="/cabal" className="text-red-600 font-medium">status</a>
        <a href="/cabal/bizops" className="text-[var(--text-muted)] hover:text-red-600 transition-colors">bizops</a>
      </div>

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-2">
          state of the union
        </h1>
        <p className="text-[var(--text-muted)] text-sm mb-16">
          february 2026 &mdash; logged in as {user.email}
        </p>

        {/* key numbers */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-red-600 mb-6">key numbers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { value: user_count, label: "users" },
              { value: idea_count ?? 0, label: "ideas" },
              { value: `$${total_pledged.toLocaleString()}`, label: "pledged/mo" },
              { value: total_sponsors, label: "sponsors" },
              { value: upvote_count ?? 0, label: "upvotes" },
              { value: comment_count ?? 0, label: "comments" },
              { value: cells_approved, label: "cells approved" },
              { value: cells_pending, label: "cells pending" },
            ].map((stat) => (
              <div key={stat.label} className="border border-[var(--border-primary)] rounded-lg p-3 text-center">
                <div className="text-2xl font-bold tabular-nums text-red-600">{stat.value}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* the state of things */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-red-600 mb-6">the state of things</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              we&apos;re pre-revenue, pre-first-cell. the platform is live at{" "}
              <a href="https://destroysaas.vercel.app" className="text-red-600 hover:text-red-500">
                destroysaas.vercel.app
              </a>{" "}
              with 22 shipped features. the product works end-to-end from idea submission through
              pledge mechanics to admin-triggered cell formation. what&apos;s missing is the real-money
              plumbing (stripe) and the legal/financial infrastructure to actually form the first cell.
            </p>
            <p>
              the thesis is intact: ai collapsed the cost of building software but not the cost of
              maintaining it. smbs need collective ownership, not more subscriptions.
              the question is whether we can find 10&ndash;15 businesses willing to pay $50&ndash;200/mo
              for the first cell.
            </p>
          </div>
        </section>

        {/* what's built */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-red-600 mb-6">what&apos;s built</h2>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            {[
              "next.js 16 + supabase + vercel — live in production",
              "auth (sign in/up, email verification, password reset)",
              "idea board with search, sort, filter, categories",
              "idea submission with validation + inline editing",
              "pledge mechanics ($25–$500/mo, progress bars, auto-status triggers)",
              "user dashboard with stats, activity feed, profile editing",
              "admin panel with analytics, cell formation triggers, cell approval",
              "cell applications and public profiles",
              "comments and upvoting",
              "email notifications via resend (pledge, status change, cell formation)",
              "public stats and social sharing (twitter, linkedin, copy link)",
              "legal pages (terms, privacy)",
              "public user profiles",
              "light/dark theme system",
              "groups infrastructure (sudo, admin, cabal) with RLS",
              "stakeholder-targeted landing page (business, dev, investor pitches)",
              "/about/legal and /about/money deep-dive pages",
            ].map((item) => (
              <div key={item} className="flex gap-2">
                <span className="text-red-600 shrink-0">&bull;</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* what's working */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-red-600 mb-6">what&apos;s working</h2>
          <div className="border-l-2 border-red-600 pl-6 space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              the core loop works: someone submits an idea, others pledge money, the system
              tracks progress toward threshold, admin can trigger formation. the product tells a
              coherent story from landing page through about pages to the idea board.
            </p>
            <p>
              the bny dark factory (claude + gemini autonomous dev loop) is producing features at
              high velocity. 22 features shipped in 2 days. the tech is not the bottleneck.
            </p>
          </div>
        </section>

        {/* what's not built yet */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-red-600 mb-6">what&apos;s not built yet</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            {[
              {
                title: "stripe integration",
                desc: "pledges are intent, not money. need stripe checkout, subscription management, and webhook handling. blocked by open business questions (refund policy, platform fee structure, receiving entity).",
              },
              {
                title: "lca formation workflow",
                desc: "currently \"cell formation\" is a status change. the actual legal incorporation — filing in wyoming, operating agreement, registered agent — is entirely manual and undocumented.",
              },
              {
                title: "opencollective integration",
                desc: "treasury management doesn't exist yet. need to create collectives per cell, connect to stripe, set up transparent ledger.",
              },
              {
                title: "cell bidding",
                desc: "cells can apply and get approved, but there's no mechanism for them to bid on triggered cells or for members to vote on cell selection.",
              },
              {
                title: "dao governance layer",
                desc: "voting, proposals, weighted shares — all described in the model but none implemented. this is phase 2+ work.",
              },
            ].map((item) => (
              <div key={item.title} className="border-l-2 border-[var(--border-primary)] pl-6">
                <p className="font-semibold text-[var(--text-primary)] mb-1">{item.title}</p>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* open questions */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-red-600 mb-6">open questions</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              these need answers before stripe goes live or the first cell forms.
              full detail is in <span className="text-[var(--text-primary)] font-medium">docs/business-questions.md</span>.
            </p>
            <div className="space-y-3 mt-4">
              {[
                "what entity receives stripe payments? personal account, LLC, or platform LCA?",
                "refund policy on unpledge — prorate? no refund? current month only?",
                "platform fee timing and amount — pre-formation, post-formation, or both?",
                "LCA formation process — who files? what's the cost? who bears it?",
                "minimum pledge amount floor (stripe fees eat small amounts)",
                "do pledges transfer to the cell's stripe account at formation, or does the platform hold?",
                "trigger criteria — $1k/mo threshold only? minimum sponsor count?",
                "tax implications — 1099s for cells? international pledgers? VAT?",
              ].map((q) => (
                <div key={q} className="flex gap-2 text-sm">
                  <span className="text-red-600 shrink-0">?</span>
                  <span className="text-[var(--text-muted)]">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* next moves */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-red-600 mb-6">next moves</h2>
          <div className="space-y-4">
            {[
              {
                num: "1",
                title: "answer the business questions",
                desc: "can't build stripe or form cells without decisions on receiving entity, fee structure, and refund policy. this is a conversation, not code.",
              },
              {
                num: "2",
                title: "form the platform entity",
                desc: "destroysaas needs its own LLC or LCA to receive stripe payments. file in wyoming. open a bank account. get an EIN.",
              },
              {
                num: "3",
                title: "customer discovery — talk to 20 smbs",
                desc: "find businesses bleeding on saas costs. get them to submit ideas and pledge. no automation. conversations and emails.",
              },
              {
                num: "4",
                title: "recruit 3–5 dev cooperatives",
                desc: "vet manually. interview, portfolio review, references. the first certified cells are the supply side of the marketplace.",
              },
              {
                num: "5",
                title: "stripe integration",
                desc: "once business questions are answered: connect stripe, turn pledges into real subscriptions, handle webhooks for payment lifecycle.",
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-4">
                <span className="text-red-600 font-bold text-lg tabular-nums shrink-0 w-6">
                  {item.num}
                </span>
                <div>
                  <p className="font-semibold mb-1">{item.title}</p>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* cta */}
        <div className="border-t border-[var(--border-primary)] pt-8">
          <a
            href="/cabal/bizops"
            className="inline-block text-sm text-red-600 hover:text-red-500 transition-colors"
          >
            read the bizops playbook &rarr;
          </a>
        </div>
      </main>
    </div>
  );
}
