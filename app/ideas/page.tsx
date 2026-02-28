import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/app/components/nav";
import IdeasFilter from "./ideas_filter";

export const metadata: Metadata = {
  title: "ideas — destroysaas",
};

type IdeaRow = {
  id: string;
  title: string;
  description: string;
  problem: string;
  monthly_ask: number;
  status: string;
  category: string;
  created_at: string;
  total_pledged: number;
  pledge_count: number;
  upvote_count: number;
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
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/ideas" />

      {/* header */}
      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">the board</h1>
          <p className="text-sm text-[var(--text-muted)]">
            ranked by committed monthly dollars. skin in the game is the only algorithm.
          </p>
        </div>

        <IdeasFilter ideas={rows} />

        {/* submit cta */}
        <div className="mt-10 pt-8 border-t border-[var(--border-faint)] flex items-center justify-between">
          <p className="text-sm text-[var(--text-faint)]">
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
