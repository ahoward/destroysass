import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import PledgePanel from "./pledge_panel";
import EditIdea from "./edit_idea";

type MetaProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: MetaProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: idea } = await supabase
    .from("idea_board")
    .select("title")
    .eq("id", id)
    .single();
  return {
    title: idea ? `${idea.title} — destroysass` : "idea — destroysass",
  };
}

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

type Props = {
  params: Promise<{ id: string }>;
};

export default async function IdeaDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  // fetch idea
  const { data: idea, error: idea_error } = await supabase
    .from("idea_board")
    .select("*")
    .eq("id", id)
    .single();

  if (idea_error || !idea) {
    notFound();
  }

  // fetch auth + existing pledge
  const { data: { user } } = await supabase.auth.getUser();

  let existing_pledge: { amount_monthly: number } | null = null;
  if (user) {
    const { data } = await supabase
      .from("pledges")
      .select("amount_monthly")
      .eq("idea_id", id)
      .eq("user_id", user.id)
      .single();
    existing_pledge = data;
  }

  const total = Number(idea.total_pledged) || 0;
  const count = Number(idea.pledge_count) || 0;
  const pct = Math.min(Math.round((total / THRESHOLD) * 100), 100);
  const is_creator = user?.id === idea.created_by;

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
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <a href="/ideas" className="hover:text-white transition-colors">ideas</a>
          <a href="/about" className="hover:text-white transition-colors">about</a>
          {user ? (
            <>
              <a href="/dashboard" className="hover:text-white transition-colors">dashboard</a>
              <form action={signOut}>
                <button type="submit" className="hover:text-white transition-colors">sign out</button>
              </form>
            </>
          ) : (
            <a href={`/auth?next=/ideas/${id}`} className="hover:text-white transition-colors">sign in</a>
          )}
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-8 pb-32">
        {/* back link */}
        <a
          href="/ideas"
          className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          &larr; the board
        </a>

        {/* idea content */}
        <div className="mt-8 mb-10">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-3xl font-bold tracking-tight">{idea.title}</h1>
            <span
              className={`shrink-0 border rounded px-2 py-0.5 text-xs ${STATUS_COLORS[idea.status] ?? "text-gray-500 border-gray-700"}`}
            >
              {STATUS_LABELS[idea.status] ?? idea.status}
            </span>
          </div>

          <p className="text-gray-300 leading-relaxed mb-6">{idea.description}</p>

          <div className="border-l-2 border-red-900 pl-4 mb-6">
            <p className="text-xs text-gray-600 uppercase tracking-wider mb-1">the problem</p>
            <p className="text-gray-400 leading-relaxed">{idea.problem}</p>
          </div>

          <p className="text-sm text-gray-500">
            submitter asks{" "}
            <span className="text-gray-300 font-semibold">${idea.monthly_ask}/mo</span>{" "}
            to maintain and host this.
          </p>
        </div>

        {/* pledge summary bar */}
        <div className="border border-[#222] rounded-lg p-6 mb-6">
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-sm text-gray-400">
              <span className="text-2xl font-bold text-red-600 mr-1">
                ${total.toLocaleString()}
              </span>
              /mo pledged from{" "}
              <span className="text-gray-300">{count}</span>{" "}
              {count === 1 ? "sponsor" : "sponsors"}
            </p>
            <p className="text-xs text-gray-600">{pct}%</p>
          </div>
          <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {pct}% toward forming a cell (${THRESHOLD.toLocaleString()}/mo threshold)
          </p>
        </div>

        {/* pledge panel */}
        <PledgePanel
          idea_id={id}
          user_id={user?.id ?? null}
          existing_amount={existing_pledge?.amount_monthly ?? null}
          is_creator={is_creator}
        />

        {/* edit (creator only, early-stage only) */}
        {is_creator && ["proposed", "gaining_traction"].includes(idea.status) && (
          <div className="mt-8">
            <EditIdea
              ideaId={id}
              title={idea.title}
              description={idea.description}
              problem={idea.problem}
              monthlyAsk={idea.monthly_ask}
            />
          </div>
        )}
      </main>
    </div>
  );
}
