import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import IdeasFilter from "./ideas_filter";

export const metadata: Metadata = {
  title: "ideas — destroysass",
};

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
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span className="text-white">ideas</span>
          <a href="/dev-cells" className="hover:text-white transition-colors">dev cells</a>
          <a href="/about" className="hover:text-white transition-colors">about</a>
          {user ? (
            <>
              <a href="/dashboard" className="hover:text-white transition-colors">dashboard</a>
              <form action={signOut}>
                <button type="submit" className="hover:text-white transition-colors">sign out</button>
              </form>
            </>
          ) : (
            <a href="/auth" className="hover:text-white transition-colors">sign in</a>
          )}
        </div>
      </nav>

      {/* header */}
      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">the board</h1>
          <p className="text-sm text-gray-500">
            ranked by committed monthly dollars. skin in the game is the only algorithm.
          </p>
        </div>

        <IdeasFilter ideas={rows} />

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
