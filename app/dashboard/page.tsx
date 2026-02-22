import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import WithdrawButton from "./withdraw_button";

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

type IdeaRow = {
  id: string;
  title: string;
  status: string;
  total_pledged: number;
  pledge_count: number;
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

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/dashboard");
  }

  // fetch user's ideas from idea_board view (S5: use view for total_pledged)
  const [ideas_result, pledges_result] = await Promise.all([
    supabase
      .from("idea_board")
      .select("id, title, status, total_pledged, pledge_count, created_at")
      .eq("created_by", user.id)
      .order("created_at", { ascending: false }),
    supabase
      .from("pledges")
      .select("id, idea_id, amount_monthly, ideas(title, status)")
      .eq("user_id", user.id),
  ]);

  const my_ideas = (ideas_result.data as IdeaRow[]) ?? [];

  // join pledge rows with idea data + get totals from idea_board
  // supabase may return the join as object or array depending on schema
  type RawPledge = {
    id: string;
    idea_id: string;
    amount_monthly: number;
    ideas: unknown;
  };
  const raw_pledges = (pledges_result.data ?? []) as RawPledge[];

  function extract_idea(val: unknown): { title: string; status: string } | null {
    if (val && typeof val === "object" && !Array.isArray(val)) {
      return val as { title: string; status: string };
    }
    if (Array.isArray(val) && val.length > 0) {
      return val[0] as { title: string; status: string };
    }
    return null;
  }

  // fetch idea_board rows for pledged ideas to get total_pledged (S5)
  const pledged_idea_ids = raw_pledges.map((p) => p.idea_id);
  let board_map: Record<string, number> = {};
  if (pledged_idea_ids.length > 0) {
    const { data: board_rows } = await supabase
      .from("idea_board")
      .select("id, total_pledged")
      .in("id", pledged_idea_ids);
    if (board_rows) {
      board_map = Object.fromEntries(
        board_rows.map((r: { id: string; total_pledged: number }) => [r.id, Number(r.total_pledged) || 0])
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

  // S3: monthly total excludes cancelled ideas
  const monthly_total = my_pledges
    .filter((p) => p.idea_status !== "cancelled")
    .reduce((sum, p) => sum + p.amount_monthly, 0);

  const active_pledge_count = my_pledges.filter(
    (p) => p.idea_status !== "cancelled"
  ).length;

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
              {my_ideas.map((idea) => (
                <a
                  key={idea.id}
                  href={`/ideas/${idea.id}`}
                  className="block border border-[#1e1e1e] rounded-lg p-5 hover:border-[#333] transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-semibold group-hover:text-red-400 transition-colors truncate">
                        {idea.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                        <span>
                          <span className="text-gray-400">
                            {Number(idea.pledge_count)}
                          </span>{" "}
                          {Number(idea.pledge_count) === 1
                            ? "sponsor"
                            : "sponsors"}
                        </span>
                        <span className="text-gray-700">&middot;</span>
                        <span
                          className={`border rounded px-1.5 py-0.5 ${STATUS_COLORS[idea.status] ?? "text-gray-500 border-gray-700"}`}
                        >
                          {STATUS_LABELS[idea.status] ?? idea.status}
                        </span>
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
              ))}
            </div>
          )}
        </section>

        {/* --- my pledges --- */}
        <section>
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
                      <WithdrawButton idea_id={pledge.idea_id} idea_status={pledge.idea_status} />
                    </div>
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
