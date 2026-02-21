import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

type IdeaRow = {
  id: string;
  title: string;
  description: string;
  problem: string;
  monthly_ask: number;
  status: string;
  created_at: string;
  total_pledged: number;
  pledge_count: number;
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
  cell_forming: "text-blue-400 border-blue-600",
  active: "text-green-400 border-green-600",
  cancelled: "text-red-800 border-red-900",
};

export default async function IdeasPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: ideas, error } = await supabase
    .from("idea_board")
    .select("*")
    .order("total_pledged", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("idea_board fetch error:", error);
  }

  const rows = (ideas as IdeaRow[]) ?? [];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0] font-sans">

      {/* nav */}
      <nav className="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
        <a href="/" className="text-red-600 font-bold text-lg tracking-tight hover:text-red-500 transition-colors">
          destroysass
        </a>
        <div>
          {user ? (
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
          ) : (
            <a
              href="/auth"
              className="text-sm text-gray-400 border border-[#333] px-3 py-1.5 rounded hover:border-gray-500 hover:text-gray-200 transition-colors"
            >
              sign in
            </a>
          )}
        </div>
      </nav>

      {/* header */}
      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">the board</h1>
          <p className="text-sm text-gray-500">
            ranked by committed monthly dollars. skin in the game is the only
            algorithm.
          </p>
        </div>

        {/* ideas list */}
        {rows.length === 0 ? (
          <div className="border border-[#222] rounded-lg p-12 text-center">
            <p className="text-gray-600 mb-4">no ideas yet. be the first.</p>
            <a
              href="/ideas/new"
              className="text-sm text-red-600 hover:text-red-500 transition-colors"
            >
              submit an idea →
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {rows.map((idea, i) => (
              <a
                key={idea.id}
                href={`/ideas/${idea.id}`}
                className="block border border-[#1e1e1e] rounded-lg p-6 hover:border-[#333] transition-colors group"
              >
                {/* rank + title row */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-baseline gap-3 min-w-0">
                    <span className="text-red-600 font-bold tabular-nums text-sm shrink-0">
                      #{i + 1}
                    </span>
                    <h2 className="font-semibold group-hover:text-red-400 transition-colors truncate">
                      {idea.title}
                    </h2>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-bold text-red-600 tabular-nums">
                      ${idea.total_pledged.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">per month pledged</div>
                  </div>
                </div>

                {/* problem */}
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">
                  {idea.problem}
                </p>

                {/* meta row */}
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span>
                    <span className="text-gray-400">{idea.pledge_count}</span>{" "}
                    {Number(idea.pledge_count) === 1 ? "sponsor" : "sponsors"}
                  </span>
                  <span className="text-gray-700">·</span>
                  <span>
                    submitter asks{" "}
                    <span className="text-gray-400">
                      ${idea.monthly_ask}
                    </span>
                    /mo
                  </span>
                  <span className="text-gray-700">·</span>
                  <span
                    className={`border rounded px-1.5 py-0.5 ${STATUS_COLORS[idea.status] ?? "text-gray-500 border-gray-700"}`}
                  >
                    {STATUS_LABELS[idea.status] ?? idea.status}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* submit cta */}
        <div className="mt-10 pt-8 border-t border-[#1a1a1a] flex items-center justify-between">
          <p className="text-sm text-gray-600">
            have a software problem worth solving together?
          </p>
          <a
            href="/ideas/new"
            className="text-sm text-red-600 hover:text-red-500 transition-colors shrink-0 ml-4"
          >
            submit an idea →
          </a>
        </div>
      </main>
    </div>
  );
}
