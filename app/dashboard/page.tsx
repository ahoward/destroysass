import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import WithdrawButton from "./withdraw_button";

export const metadata: Metadata = {
  title: "dashboard — destroysass",
};

const STATUS_LABELS: Record<string, string> = {
  proposed: "proposed",
  gaining_traction: "gaining traction",
  threshold_reached: "threshold reached",
  cell_forming: "cell forming",
  active: "active",
  cancelled: "cancelled",
};

const STATUS_COLORS: Record<string, string> = {
  proposed: "text-gray-500 border-gray-700",
  gaining_traction: "text-yellow-600 border-yellow-800",
  threshold_reached: "text-green-500 border-green-700",
  cell_forming: "text-purple-400 border-purple-600",
  active: "text-green-400 border-green-600",
  cancelled: "text-red-800 border-red-900",
};

const THRESHOLD = 1000;

type IdeaRow = {
  id: string;
  title: string;
  status: string;
  total_pledged: number;
  pledge_count: number;
  upvote_count: number;
  created_at: string;
};

type PledgeRow = {
  id: string;
  idea_id: string;
  amount_monthly: number;
  idea_title: string;
  idea_status: string;
  idea_total_pledged: number;
};

type ActivityItem = {
  kind: "pledge" | "comment";
  created_at: string;
  idea_title: string;
  idea_id: string;
  detail: string;
};

function relative_time(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/dashboard");
  }

  // parallel fetch: ideas, pledges, upvotes received, comment counts, activity
  const [ideas_result, pledges_result, upvotes_result, comment_counts_result] =
    await Promise.all([
      supabase
        .from("idea_board")
        .select(
          "id, title, status, total_pledged, pledge_count, upvote_count, created_at"
        )
        .eq("created_by", user.id)
        .order("total_pledged", { ascending: false }),
      supabase
        .from("pledges")
        .select("id, idea_id, amount_monthly, ideas(title, status)")
        .eq("user_id", user.id),
      // total upvotes across all user's ideas
      supabase
        .from("upvotes")
        .select("idea_id, ideas!inner(created_by)")
        .eq("ideas.created_by", user.id),
      // comment counts per idea for user's ideas
      supabase
        .from("comments")
        .select("idea_id, ideas!inner(created_by)")
        .eq("ideas.created_by", user.id),
    ]);

  const my_ideas = (ideas_result.data as IdeaRow[]) ?? [];
  const total_upvotes_received = upvotes_result.data?.length ?? 0;

  // build comment count map per idea
  const comment_count_map: Record<string, number> = {};
  for (const row of comment_counts_result.data ?? []) {
    const id = (row as { idea_id: string }).idea_id;
    comment_count_map[id] = (comment_count_map[id] ?? 0) + 1;
  }

  // join pledge rows with idea data
  type RawPledge = {
    id: string;
    idea_id: string;
    amount_monthly: number;
    ideas: unknown;
  };
  const raw_pledges = (pledges_result.data ?? []) as RawPledge[];

  function extract_idea(
    val: unknown
  ): { title: string; status: string } | null {
    if (val && typeof val === "object" && !Array.isArray(val)) {
      return val as { title: string; status: string };
    }
    if (Array.isArray(val) && val.length > 0) {
      return val[0] as { title: string; status: string };
    }
    return null;
  }

  // fetch idea_board rows for pledged ideas to get total_pledged
  const pledged_idea_ids = raw_pledges.map((p) => p.idea_id);
  let board_map: Record<string, number> = {};
  if (pledged_idea_ids.length > 0) {
    const { data: board_rows } = await supabase
      .from("idea_board")
      .select("id, total_pledged")
      .in("id", pledged_idea_ids);
    if (board_rows) {
      board_map = Object.fromEntries(
        board_rows.map((r: { id: string; total_pledged: number }) => [
          r.id,
          Number(r.total_pledged) || 0,
        ])
      );
    }
  }

  const my_pledges: PledgeRow[] = raw_pledges.map((p) => {
    const idea = extract_idea(p.ideas);
    return {
      id: p.id,
      idea_id: p.idea_id,
      amount_monthly: p.amount_monthly,
      idea_title: idea?.title ?? "unknown idea",
      idea_status: idea?.status ?? "unknown",
      idea_total_pledged: board_map[p.idea_id] ?? 0,
    };
  });

  // monthly total excludes cancelled ideas
  const monthly_total = my_pledges
    .filter((p) => p.idea_status !== "cancelled")
    .reduce((sum, p) => sum + p.amount_monthly, 0);

  const active_pledge_count = my_pledges.filter(
    (p) => p.idea_status !== "cancelled"
  ).length;

  // --- activity feed: recent pledges + comments on user's ideas ---
  const my_idea_ids = my_ideas.map((i) => i.id);
  let activity: ActivityItem[] = [];

  if (my_idea_ids.length > 0) {
    const [recent_pledges, recent_comments] = await Promise.all([
      supabase
        .from("pledges")
        .select("idea_id, amount_monthly, created_at, ideas(title)")
        .in("idea_id", my_idea_ids)
        .neq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20),
      supabase
        .from("comments")
        .select("idea_id, display_name, created_at, ideas(title)")
        .in("idea_id", my_idea_ids)
        .neq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

    for (const p of recent_pledges.data ?? []) {
      const idea = extract_idea((p as { ideas: unknown }).ideas);
      activity.push({
        kind: "pledge",
        created_at: (p as { created_at: string }).created_at,
        idea_title: idea?.title ?? "an idea",
        idea_id: (p as { idea_id: string }).idea_id,
        detail: `someone pledged $${(p as { amount_monthly: number }).amount_monthly}/mo`,
      });
    }

    for (const c of recent_comments.data ?? []) {
      const idea = extract_idea((c as { ideas: unknown }).ideas);
      const name =
        (c as { display_name: string }).display_name || "someone";
      activity.push({
        kind: "comment",
        created_at: (c as { created_at: string }).created_at,
        idea_title: idea?.title ?? "an idea",
        idea_id: (c as { idea_id: string }).idea_id,
        detail: `${name} commented`,
      });
    }

    activity.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    activity = activity.slice(0, 20);
  }

  // --- stats ---
  const stats = {
    monthly_committed: monthly_total,
    ideas_submitted: my_ideas.length,
    ideas_pledged_to: active_pledge_count,
    upvotes_received: total_upvotes_received,
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0] font-sans">
      {/* nav */}
      <nav className="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
        <a
          href="/"
          className="text-red-600 font-bold text-lg tracking-tight hover:text-red-500 transition-colors"
        >
          destroysass
        </a>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user.email}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm text-gray-400 border border-[#333] px-3 py-1.5 rounded hover:border-gray-500 hover:text-gray-200 transition-colors"
            >
              sign out
            </button>
          </form>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            your dashboard
          </h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* --- stats bar --- */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          <div className="border border-[#1e1e1e] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600 tabular-nums">
              ${stats.monthly_committed.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 mt-1">/mo committed</div>
          </div>
          <div className="border border-[#1e1e1e] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-200 tabular-nums">
              {stats.ideas_submitted}
            </div>
            <div className="text-xs text-gray-600 mt-1">ideas submitted</div>
          </div>
          <div className="border border-[#1e1e1e] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-200 tabular-nums">
              {stats.ideas_pledged_to}
            </div>
            <div className="text-xs text-gray-600 mt-1">ideas backed</div>
          </div>
          <div className="border border-[#1e1e1e] rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-200 tabular-nums">
              {stats.upvotes_received}
            </div>
            <div className="text-xs text-gray-600 mt-1">upvotes received</div>
          </div>
        </section>

        {/* --- my ideas --- */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-gray-600 mb-6">
            my ideas
          </h2>

          {my_ideas.length === 0 ? (
            <div className="border border-[#222] rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-3">
                you haven&apos;t submitted any ideas yet.
              </p>
              <a
                href="/ideas/new"
                className="text-sm text-red-600 hover:text-red-500 transition-colors"
              >
                submit one &rarr;
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {my_ideas.map((idea) => {
                const pct = Math.min(
                  (Number(idea.total_pledged) / THRESHOLD) * 100,
                  100
                );
                const comments = comment_count_map[idea.id] ?? 0;
                return (
                  <a
                    key={idea.id}
                    href={`/ideas/${idea.id}`}
                    className="block border border-[#1e1e1e] rounded-lg p-5 hover:border-[#333] transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold group-hover:text-red-400 transition-colors truncate">
                          {idea.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-600 flex-wrap">
                          <span>
                            <span className="text-gray-400">
                              {Number(idea.pledge_count)}
                            </span>{" "}
                            {Number(idea.pledge_count) === 1
                              ? "sponsor"
                              : "sponsors"}
                          </span>
                          <span className="text-gray-700">&middot;</span>
                          <span>
                            <span className="text-gray-400">
                              {Number(idea.upvote_count)}
                            </span>{" "}
                            {Number(idea.upvote_count) === 1
                              ? "upvote"
                              : "upvotes"}
                          </span>
                          <span className="text-gray-700">&middot;</span>
                          <span>
                            <span className="text-gray-400">{comments}</span>{" "}
                            {comments === 1 ? "comment" : "comments"}
                          </span>
                          <span className="text-gray-700">&middot;</span>
                          <span
                            className={`border rounded px-1.5 py-0.5 ${STATUS_COLORS[idea.status] ?? "text-gray-500 border-gray-700"}`}
                          >
                            {STATUS_LABELS[idea.status] ?? idea.status}
                          </span>
                        </div>
                        {/* progress bar */}
                        <div className="mt-3">
                          <div className="w-full bg-[#1a1a1a] rounded-full h-1.5">
                            <div
                              className="bg-red-600 h-1.5 rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            ${Number(idea.total_pledged).toLocaleString()} / $
                            {THRESHOLD.toLocaleString()} threshold
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xl font-bold text-red-600 tabular-nums">
                          ${Number(idea.total_pledged).toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">/mo pledged</div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </section>

        {/* --- my pledges --- */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-gray-600 mb-4">
            my pledges
          </h2>

          {my_pledges.length > 0 && (
            <div className="border border-[#222] rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-400">
                you&apos;re committed to{" "}
                <span className="text-red-600 font-bold">
                  ${monthly_total.toLocaleString()}/mo
                </span>{" "}
                across{" "}
                <span className="text-gray-300">{active_pledge_count}</span>{" "}
                {active_pledge_count === 1 ? "idea" : "ideas"}
              </p>
            </div>
          )}

          {my_pledges.length === 0 ? (
            <div className="border border-[#222] rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-3">
                you haven&apos;t pledged to any ideas yet.
              </p>
              <a
                href="/ideas"
                className="text-sm text-red-600 hover:text-red-500 transition-colors"
              >
                browse the board &rarr;
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {my_pledges.map((pledge) => (
                <div
                  key={pledge.id}
                  className="border border-[#1e1e1e] rounded-lg p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <a
                        href={`/ideas/${pledge.idea_id}`}
                        className="font-semibold hover:text-red-400 transition-colors truncate block"
                      >
                        {pledge.idea_title}
                      </a>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                        <span>
                          you pledged{" "}
                          <span className="text-gray-300">
                            ${pledge.amount_monthly}/mo
                          </span>
                        </span>
                        <span className="text-gray-700">&middot;</span>
                        <span>
                          total{" "}
                          <span className="text-gray-400">
                            ${pledge.idea_total_pledged.toLocaleString()}
                          </span>
                          /mo
                        </span>
                        <span className="text-gray-700">&middot;</span>
                        <span
                          className={`border rounded px-1.5 py-0.5 ${STATUS_COLORS[pledge.idea_status] ?? "text-gray-500 border-gray-700"}`}
                        >
                          {STATUS_LABELS[pledge.idea_status] ??
                            pledge.idea_status}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <WithdrawButton
                        idea_id={pledge.idea_id}
                        idea_status={pledge.idea_status}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* --- activity feed --- */}
        <section>
          <h2 className="text-xs uppercase tracking-widest text-gray-600 mb-6">
            recent activity
          </h2>

          {activity.length === 0 ? (
            <div className="border border-[#222] rounded-lg p-8 text-center">
              <p className="text-gray-600">
                no activity on your ideas yet.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {activity.map((item, i) => (
                <div
                  key={`${item.kind}-${item.created_at}-${i}`}
                  className="flex items-start gap-3 border border-[#1a1a1a] rounded-lg px-4 py-3"
                >
                  <span className="text-sm mt-0.5">
                    {item.kind === "pledge" ? "💰" : "💬"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-300">
                      {item.detail} on{" "}
                      <a
                        href={`/ideas/${item.idea_id}`}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        &lsquo;{item.idea_title}&rsquo;
                      </a>
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {relative_time(item.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
