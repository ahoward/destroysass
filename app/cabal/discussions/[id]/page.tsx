import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { is_inner } from "@/lib/groups";
import { getEffectiveUser } from "@/lib/ghost";
import Nav from "@/app/components/nav";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Responses from "./replies";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: disc } = await supabase
    .from("cabal_discussions")
    .select("title")
    .eq("id", id)
    .single();

  return {
    title: disc ? `${disc.title} — cabal — destroysaas` : "not found",
  };
}

export default async function CabalDiscussionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: disc } = await supabase
    .from("cabal_discussions")
    .select("id, title, body, created_by, created_at, updated_at")
    .eq("id", id)
    .single();

  if (!disc) {
    notFound();
  }

  const { user, effectiveUserId } = await getEffectiveUser();
  const canReply = user ? await is_inner(supabase, user) : false;

  // fetch author name
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", disc.created_by)
    .single();

  const author = profile?.display_name || "anonymous";

  // fetch responses
  const { data: responses } = await supabase
    .from("cabal_responses")
    .select("id, user_id, display_name, body, created_at")
    .eq("discussion_id", id)
    .order("created_at", { ascending: true });

  const date = new Date(disc.created_at).toLocaleDateString();
  const edited =
    disc.updated_at !== disc.created_at
      ? new Date(disc.updated_at).toLocaleDateString()
      : null;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/cabal" />
      {/* cabal sub-nav */}
      <div className="max-w-2xl mx-auto px-6 pt-2 flex gap-4 text-sm border-b border-red-600 pb-3">
        <a href="/cabal" className="text-[var(--text-muted)] hover:text-red-600 transition-colors">status</a>
        <a href="/cabal/discussions" className="text-red-600 font-medium">discussions</a>
        <a href="/cabal/bizops" className="text-[var(--text-muted)] hover:text-red-600 transition-colors">bizops</a>
      </div>

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* back link */}
        <a
          href="/cabal/discussions"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        >
          &larr; all discussions
        </a>

        {/* header */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight lowercase mt-4 mb-2">
          {disc.title}
        </h1>
        <div className="flex gap-3 text-xs text-[var(--text-muted)] mb-8">
          <span>{author}</span>
          <span>{date}</span>
          {edited && <span>(edited {edited})</span>}
        </div>

        {/* body */}
        <div className="prose dark:prose-invert max-w-none mb-8 text-[var(--text-secondary)] prose-headings:text-[var(--text-primary)] prose-headings:lowercase prose-headings:tracking-tight prose-strong:text-[var(--text-primary)] prose-a:text-red-500 prose-hr:border-[var(--border-primary)]">
          <Markdown remarkPlugins={[remarkGfm]}>{disc.body}</Markdown>
        </div>

        {/* responses */}
        <Responses
          post_id={disc.id}
          user_id={effectiveUserId ?? null}
          replies={responses ?? []}
          can_reply={canReply}
        />
      </main>
    </div>
  );
}
