import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import CellFormButton from "./cell_form_button";

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
  monthly_ask: number;
  created_at: string;
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
    notFound();
  }

  const { data: ideas } = await supabase
    .from("idea_board")
    .select("id, title, status, total_pledged, pledge_count, monthly_ask, created_at")
    .order("total_pledged", { ascending: false });

  const allIdeas: IdeaRow[] = ideas ?? [];
  const readyToForm = allIdeas.filter((i) => i.status === "threshold_reached");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* nav */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-red-500 font-bold text-lg tracking-tight">
          destroysass.ai
        </a>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <a href="/ideas" className="hover:text-white transition-colors">ideas</a>
          <a href="/dashboard" className="hover:text-white transition-colors">dashboard</a>
          <span className="text-red-500 font-medium">admin</span>
          <form action={signOut}>
            <button type="submit" className="hover:text-white transition-colors">
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

        {/* section 1: ready to form */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-1 text-green-400">ready to form</h2>
          <p className="text-gray-500 text-sm mb-4">
            ideas that have crossed the $1,000 threshold — manually trigger cell formation below.
          </p>

          {readyToForm.length === 0 ? (
            <p className="text-gray-600 text-sm italic">no ideas ready to form right now.</p>
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
                      ${idea.total_pledged.toLocaleString()} pledged · {idea.pledge_count} pledger
                      {idea.pledge_count !== 1 ? "s" : ""} · ask ${idea.monthly_ask}/mo
                    </div>
                  </div>
                  <CellFormButton ideaId={idea.id} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* section 2: all ideas */}
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
                    ${idea.total_pledged.toLocaleString()} · {idea.pledge_count} pledger
                    {idea.pledge_count !== 1 ? "s" : ""}
                  </div>
                  <span
                    className={`text-xs border rounded px-1.5 py-0.5 shrink-0 ${
                      STATUS_COLORS[idea.status] ?? "text-gray-500 border-gray-700"
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
