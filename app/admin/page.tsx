import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { signOut } from "@/app/auth/actions";
import CellFormButton from "./cell_form_button";
import DevCellReviewButton from "./dev_cell_review_button";

const ADMIN_EMAILS = ["ara.t.howard@gmail.com"];

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
  upvote_count: number;
  monthly_ask: number;
  created_at: string;
};

type DevCellRow = {
  id: string;
  name: string;
  description: string;
  website: string | null;
  skills: string[];
  contact_email: string;
  created_at: string;
};

function growth_indicator(current: number, previous: number): string {
  if (previous === 0 && current === 0) return "—";
  if (previous === 0) return `+${current} (new)`;
  const pct = Math.round(((current - previous) / previous) * 100);
  if (pct > 0) return `+${pct}%`;
  if (pct < 0) return `${pct}%`;
  return "0%";
}

function growth_color(current: number, previous: number): string {
  if (current > previous) return "text-green-400";
  if (current < previous) return "text-red-400";
  return "text-gray-500";
}

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
    notFound();
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const adminClient = serviceRoleKey
    ? createServiceClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        serviceRoleKey
      )
    : null;

  // time boundaries for growth comparison
  const now = new Date();
  const one_week_ago = new Date(
    now.getTime() - 7 * 24 * 60 * 60 * 1000
  ).toISOString();
  const two_weeks_ago = new Date(
    now.getTime() - 14 * 24 * 60 * 60 * 1000
  ).toISOString();

  // parallel fetch: ideas, upvotes, comments, growth
  const [
    ideas_result,
    upvotes_count_result,
    comments_count_result,
    pledges_this_week_result,
    pledges_last_week_result,
    ideas_this_week_result,
    ideas_last_week_result,
  ] = await Promise.all([
    supabase
      .from("idea_board")
      .select(
        "id, title, status, total_pledged, pledge_count, upvote_count, monthly_ask, created_at"
      )
      .order("total_pledged", { ascending: false }),
    supabase.from("upvotes").select("id", { count: "exact", head: true }),
    supabase.from("comments").select("id", { count: "exact", head: true }),
    supabase
      .from("pledges")
      .select("id", { count: "exact", head: true })
      .gte("created_at", one_week_ago),
    supabase
      .from("pledges")
      .select("id", { count: "exact", head: true })
      .gte("created_at", two_weeks_ago)
      .lt("created_at", one_week_ago),
    supabase
      .from("ideas")
      .select("id", { count: "exact", head: true })
      .gte("created_at", one_week_ago),
    supabase
      .from("ideas")
      .select("id", { count: "exact", head: true })
      .gte("created_at", two_weeks_ago)
      .lt("created_at", one_week_ago),
  ]);

  // service-role-only data: user count, dev cell counts
  let user_count = 0;
  let dev_cells_approved = 0;
  let dev_cells_pending = 0;
  let dev_cells_rejected = 0;
  let pendingCells: DevCellRow[] = [];
  let users_this_week = 0;
  let users_last_week = 0;

  if (adminClient) {
    const [
      users_result,
      cells_approved_result,
      cells_pending_result,
      cells_rejected_result,
      pending_cells_result,
      all_users_result,
    ] = await Promise.all([
      adminClient.auth.admin.listUsers({ page: 1, perPage: 1 }),
      adminClient
        .from("dev_cells")
        .select("id", { count: "exact", head: true })
        .eq("status", "approved"),
      adminClient
        .from("dev_cells")
        .select("id", { count: "exact", head: true })
        .eq("status", "pending"),
      adminClient
        .from("dev_cells")
        .select("id", { count: "exact", head: true })
        .eq("status", "rejected"),
      adminClient
        .from("dev_cells")
        .select(
          "id, name, description, website, skills, contact_email, created_at"
        )
        .eq("status", "pending")
        .order("created_at", { ascending: true }),
      adminClient.auth.admin.listUsers({ page: 1, perPage: 1000 }),
    ]);

    // total user count from API metadata
    const api_total = (
      users_result.data as unknown as { total?: number } | null
    )?.total;
    if (api_total) {
      user_count = api_total;
    } else {
      user_count =
        (users_result.data as unknown as { users: unknown[] } | null)?.users
          ?.length ?? 0;
    }

    dev_cells_approved = cells_approved_result.count ?? 0;
    dev_cells_pending = cells_pending_result.count ?? 0;
    dev_cells_rejected = cells_rejected_result.count ?? 0;
    pendingCells = pending_cells_result.data ?? [];

    // user growth from full user list
    const all_users =
      (all_users_result.data as unknown as { users: { created_at: string }[] })
        ?.users ?? [];
    const one_week_ts = new Date(one_week_ago).getTime();
    const two_weeks_ts = new Date(two_weeks_ago).getTime();
    users_this_week = all_users.filter(
      (u) => new Date(u.created_at).getTime() >= one_week_ts
    ).length;
    users_last_week = all_users.filter(
      (u) =>
        new Date(u.created_at).getTime() >= two_weeks_ts &&
        new Date(u.created_at).getTime() < one_week_ts
    ).length;
  }

  const allIdeas: IdeaRow[] = ideas_result.data ?? [];
  const readyToForm = allIdeas.filter(
    (i) => i.status === "threshold_reached"
  );
  const total_pledged = allIdeas.reduce(
    (s, i) => s + Number(i.total_pledged),
    0
  );
  const total_upvotes = upvotes_count_result.count ?? 0;
  const total_comments = comments_count_result.count ?? 0;

  const top_by_pledges = allIdeas.slice(0, 5);
  const top_by_upvotes = [...allIdeas]
    .sort((a, b) => Number(b.upvote_count) - Number(a.upvote_count))
    .slice(0, 5);

  const pledges_this_week = pledges_this_week_result.count ?? 0;
  const pledges_last_week = pledges_last_week_result.count ?? 0;
  const ideas_this_week = ideas_this_week_result.count ?? 0;
  const ideas_last_week = ideas_last_week_result.count ?? 0;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* nav */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <a
          href="/"
          className="text-red-500 font-bold text-lg tracking-tight"
        >
          destroysass.ai
        </a>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <a href="/ideas" className="hover:text-white transition-colors">
            ideas
          </a>
          <a href="/dev-cells" className="hover:text-white transition-colors">
            dev cells
          </a>
          <a href="/dashboard" className="hover:text-white transition-colors">
            dashboard
          </a>
          <span className="text-red-500 font-medium">admin</span>
          <form action={signOut}>
            <button
              type="submit"
              className="hover:text-white transition-colors"
            >
              sign out
            </button>
          </form>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">admin panel</h1>
        <p className="text-gray-500 text-sm mb-10">
          logged in as <span className="text-gray-300">{user.email}</span>
        </p>

        {/* --- analytics: platform overview --- */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-red-400">
            platform overview
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            <div className="border border-gray-800 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold tabular-nums">
                {user_count}
              </div>
              <div className="text-xs text-gray-500 mt-1">users</div>
            </div>
            <div className="border border-gray-800 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold tabular-nums">
                {allIdeas.length}
              </div>
              <div className="text-xs text-gray-500 mt-1">ideas</div>
            </div>
            <div className="border border-gray-800 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-500 tabular-nums">
                ${total_pledged.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">/mo pledged</div>
            </div>
            <div className="border border-gray-800 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold tabular-nums">
                {total_upvotes}
              </div>
              <div className="text-xs text-gray-500 mt-1">upvotes</div>
            </div>
            <div className="border border-gray-800 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold tabular-nums">
                {total_comments}
              </div>
              <div className="text-xs text-gray-500 mt-1">comments</div>
            </div>
            <div className="border border-gray-800 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold tabular-nums">
                <span className="text-green-400">{dev_cells_approved}</span>
                <span className="text-gray-600 text-lg"> / </span>
                <span className="text-yellow-500">{dev_cells_pending}</span>
                <span className="text-gray-600 text-lg"> / </span>
                <span className="text-red-800">{dev_cells_rejected}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">cells a/p/r</div>
            </div>
          </div>

          {/* growth indicators */}
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
            this week vs last week
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div className="border border-gray-800 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">new ideas</div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold tabular-nums">
                  {ideas_this_week}
                </span>
                <span
                  className={`text-xs font-medium ${growth_color(ideas_this_week, ideas_last_week)}`}
                >
                  {growth_indicator(ideas_this_week, ideas_last_week)}
                </span>
              </div>
            </div>
            <div className="border border-gray-800 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">new pledges</div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold tabular-nums">
                  {pledges_this_week}
                </span>
                <span
                  className={`text-xs font-medium ${growth_color(pledges_this_week, pledges_last_week)}`}
                >
                  {growth_indicator(pledges_this_week, pledges_last_week)}
                </span>
              </div>
            </div>
            <div className="border border-gray-800 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">new users</div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold tabular-nums">
                  {users_this_week}
                </span>
                <span
                  className={`text-xs font-medium ${growth_color(users_this_week, users_last_week)}`}
                >
                  {growth_indicator(users_this_week, users_last_week)}
                </span>
              </div>
            </div>
            <div className="border border-gray-800 rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-1">
                total /mo pledged
              </div>
              <div className="text-lg font-bold text-red-500 tabular-nums">
                ${total_pledged.toLocaleString()}
              </div>
            </div>
          </div>

          {/* top ideas */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
                top 5 by pledges
              </h3>
              <div className="space-y-1">
                {top_by_pledges.map((idea, i) => (
                  <div
                    key={idea.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="text-gray-600 w-4 text-right">
                      {i + 1}.
                    </span>
                    <a
                      href={`/ideas/${idea.id}`}
                      className="truncate hover:text-red-400 transition-colors flex-1"
                    >
                      {idea.title}
                    </a>
                    <span className="text-red-500 font-medium tabular-nums shrink-0">
                      ${Number(idea.total_pledged).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
                top 5 by upvotes
              </h3>
              <div className="space-y-1">
                {top_by_upvotes.map((idea, i) => (
                  <div
                    key={idea.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="text-gray-600 w-4 text-right">
                      {i + 1}.
                    </span>
                    <a
                      href={`/ideas/${idea.id}`}
                      className="truncate hover:text-red-400 transition-colors flex-1"
                    >
                      {idea.title}
                    </a>
                    <span className="text-gray-400 font-medium tabular-nums shrink-0">
                      {Number(idea.upvote_count)} upvotes
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- ready to form --- */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-1 text-green-400">
            ready to form
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            ideas that have crossed the $1,000 threshold — manually trigger
            cell formation below.
          </p>

          {readyToForm.length === 0 ? (
            <p className="text-gray-600 text-sm italic">
              no ideas ready to form right now.
            </p>
          ) : (
            <div className="space-y-3">
              {readyToForm.map((idea) => (
                <div
                  key={idea.id}
                  className="border border-green-800 rounded-lg p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <a
                      href={`/ideas/${idea.id}`}
                      className="font-medium hover:text-green-400 transition-colors truncate block"
                    >
                      {idea.title}
                    </a>
                    <div className="text-sm text-gray-400 mt-0.5">
                      ${idea.total_pledged.toLocaleString()} pledged ·{" "}
                      {idea.pledge_count} pledger
                      {idea.pledge_count !== 1 ? "s" : ""} · ask $
                      {idea.monthly_ask}/mo
                    </div>
                  </div>
                  <CellFormButton ideaId={idea.id} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* --- dev cell applications --- */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-1 text-purple-400">
            dev cell applications
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            pending cooperative applications — approve to list on /dev-cells.
          </p>

          {pendingCells.length === 0 ? (
            <p className="text-gray-600 text-sm italic">
              no pending applications.
            </p>
          ) : (
            <div className="space-y-3">
              {pendingCells.map((cell) => (
                <div
                  key={cell.id}
                  className="border border-purple-900 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{cell.name}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {cell.description}
                      </p>
                    </div>
                    <DevCellReviewButton cellId={cell.id} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500">
                    <span>{cell.contact_email}</span>
                    {cell.website && (
                      <>
                        <span>·</span>
                        <a
                          href={cell.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors"
                        >
                          {cell.website}
                        </a>
                      </>
                    )}
                  </div>
                  {cell.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {cell.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs border border-gray-700 text-gray-400 rounded px-1.5 py-0.5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* --- all ideas --- */}
        <section>
          <h2 className="text-xl font-semibold mb-4">all ideas</h2>
          {allIdeas.length === 0 ? (
            <p className="text-gray-600 text-sm italic">no ideas yet.</p>
          ) : (
            <div className="space-y-2">
              {allIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className="border border-gray-800 rounded-lg px-4 py-3 flex items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <a
                      href={`/ideas/${idea.id}`}
                      className="text-sm font-medium hover:text-white transition-colors truncate block"
                    >
                      {idea.title}
                    </a>
                  </div>
                  <div className="text-xs text-gray-500 shrink-0">
                    ${idea.total_pledged.toLocaleString()} ·{" "}
                    {idea.pledge_count} pledger
                    {idea.pledge_count !== 1 ? "s" : ""}
                  </div>
                  <span
                    className={`text-xs border rounded px-1.5 py-0.5 shrink-0 ${
                      STATUS_COLORS[idea.status] ??
                      "text-gray-500 border-gray-700"
                    }`}
                  >
                    {STATUS_LABELS[idea.status] ?? idea.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
