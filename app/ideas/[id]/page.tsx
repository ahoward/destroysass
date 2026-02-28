import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getEffectiveUser } from "@/lib/ghost";
import { is_inner } from "@/lib/groups";
import Nav from "@/app/components/nav";
import PledgePanel from "./pledge_panel";
import EditIdea from "./edit_idea";
import DeleteIdea from "./delete_idea";
import Comments from "./comments";
import ShareButtons from "./share_buttons";
import UpvoteButton from "./upvote_button";
import Materials from "./materials";
import Proposals from "./proposals";
import ProposalForm from "./proposal_form";

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
    title: idea ? `${idea.title} — destroysaas` : "idea — destroysaas",
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
  proposed: "text-gray-500 border-gray-400",
  gaining_traction: "text-yellow-600 border-yellow-600",
  threshold_reached: "text-green-600 border-green-600",
  cell_forming: "text-purple-600 border-purple-600",
  active: "text-green-600 border-green-600",
  cancelled: "text-red-700 border-red-700",
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

  // fetch auth + existing pledge (use effective user for acting-as support)
  const { user, effectiveUserId } = await getEffectiveUser();

  let existing_pledge: { amount_monthly: number } | null = null;
  let user_has_upvoted = false;
  if (user && effectiveUserId) {
    const { data } = await supabase
      .from("pledges")
      .select("amount_monthly")
      .eq("idea_id", id)
      .eq("user_id", effectiveUserId)
      .single();
    existing_pledge = data;

    const { data: upvote } = await supabase
      .from("upvotes")
      .select("id")
      .eq("idea_id", id)
      .eq("user_id", effectiveUserId)
      .single();
    user_has_upvoted = !!upvote;
  }

  // fetch comments
  const { data: raw_comments } = await supabase
    .from("comments")
    .select("id, user_id, display_name, body, created_at")
    .eq("idea_id", id)
    .order("created_at", { ascending: false });

  const comments = raw_comments ?? [];

  const inner = user ? await is_inner(supabase, user) : false;

  // fetch materials + proposals for cell_forming+ ideas
  const showProposals = ["cell_forming", "active"].includes(idea.status);

  let materialsBody = "";
  let proposalsList: {
    id: string;
    title: string;
    body: string;
    cell_name: string;
    submitted_by: string;
    created_at: string;
    preference_count: number;
  }[] = [];
  let userPreferenceId: string | null = null;
  let userCell: { id: string; name: string } | null = null;
  let userExistingProposal: { id: string; title: string; body: string } | null = null;
  let isSponsor = false;

  if (showProposals) {
    // materials
    const { data: mat } = await supabase
      .from("idea_materials")
      .select("body")
      .eq("idea_id", id)
      .single();
    if (mat) materialsBody = mat.body;

    // proposals with cell name and preference count
    const { data: rawProposals } = await supabase
      .from("proposals")
      .select("id, title, body, cell_id, submitted_by, created_at, cells(name)")
      .eq("idea_id", id)
      .order("created_at");

    if (rawProposals) {
      // get preference counts
      const { data: allPrefs } = await supabase
        .from("proposal_preferences")
        .select("proposal_id")
        .eq("idea_id", id);

      const prefCounts: Record<string, number> = {};
      for (const p of allPrefs ?? []) {
        prefCounts[p.proposal_id] = (prefCounts[p.proposal_id] || 0) + 1;
      }

      proposalsList = rawProposals.map((p) => ({
        id: p.id,
        title: p.title,
        body: p.body,
        cell_name: (p.cells as unknown as { name: string })?.name ?? "unknown cell",
        submitted_by: p.submitted_by,
        created_at: p.created_at,
        preference_count: prefCounts[p.id] || 0,
      }));
    }

    if (effectiveUserId) {
      // check if user is a sponsor
      isSponsor = !!existing_pledge;

      // check user's preference
      const { data: pref } = await supabase
        .from("proposal_preferences")
        .select("proposal_id")
        .eq("idea_id", id)
        .eq("user_id", effectiveUserId)
        .single();
      if (pref) userPreferenceId = pref.proposal_id;

      // check if user owns an approved cell
      const { data: cell } = await supabase
        .from("cells")
        .select("id, name")
        .eq("applied_by", effectiveUserId)
        .eq("status", "approved")
        .single();
      if (cell) {
        userCell = cell;
        // check for existing proposal from this cell
        const existing = proposalsList.find(
          (p) => p.submitted_by === effectiveUserId
        );
        if (existing) {
          userExistingProposal = {
            id: existing.id,
            title: existing.title,
            body: existing.body,
          };
        }
      }
    }
  }

  const total = Number(idea.total_pledged) || 0;
  const count = Number(idea.pledge_count) || 0;
  const pct = Math.min(Math.round((total / THRESHOLD) * 100), 100);
  const is_creator = effectiveUserId === idea.created_by;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/ideas" />

      <main className="max-w-2xl mx-auto px-6 pt-8 pb-32">
        {/* back link */}
        <a
          href="/ideas"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        >
          &larr; the board
        </a>

        {/* idea content */}
        <div className="mt-8 mb-10">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-3xl font-bold tracking-tight">{idea.title}</h1>
            <div className="flex items-center gap-2 shrink-0">
              <span className="border border-blue-600 text-blue-600 rounded px-2 py-0.5 text-xs">
                {(idea.category ?? "other").replace("-", " ")}
              </span>
              <span
                className={`border rounded px-2 py-0.5 text-xs ${STATUS_COLORS[idea.status] ?? "text-gray-500 border-gray-400"}`}
              >
                {STATUS_LABELS[idea.status] ?? idea.status}
              </span>
            </div>
          </div>

          <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{idea.description}</p>

          <div className="border-l-2 border-red-900 pl-4 mb-6">
            <p className="text-xs text-[var(--text-faint)] uppercase tracking-wider mb-1">the problem</p>
            <p className="text-[var(--text-secondary)] leading-relaxed">{idea.problem}</p>
          </div>

          <p className="text-sm text-[var(--text-muted)]">
            submitter asks{" "}
            <span className="text-[var(--text-secondary)] font-semibold">${idea.monthly_ask}/mo</span>{" "}
            to maintain and host this.
          </p>

          <div className="mt-4 flex items-center gap-4">
            <UpvoteButton
              idea_id={id}
              upvote_count={Number(idea.upvote_count) || 0}
              user_has_upvoted={user_has_upvoted}
            />
            <ShareButtons
              title={idea.title}
              url={`https://destroysaas.coop/ideas/${id}`}
            />
          </div>
        </div>

        {/* pledge summary bar */}
        <div className="border border-[var(--border-primary)] rounded-lg p-6 mb-6">
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-sm text-[var(--text-secondary)]">
              <span className="text-2xl font-bold text-red-600 mr-1">
                ${total.toLocaleString()}
              </span>
              /mo pledged from{" "}
              <span className="text-[var(--text-primary)]">{count}</span>{" "}
              {count === 1 ? "sponsor" : "sponsors"}
            </p>
            <p className="text-xs text-[var(--text-faint)]">{pct}%</p>
          </div>
          <div className="w-full h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-[var(--text-faint)] mt-2">
            {pct}% toward forming a cell (${THRESHOLD.toLocaleString()}/mo threshold)
          </p>
        </div>

        {/* pledge panel */}
        <PledgePanel
          idea_id={id}
          user_id={effectiveUserId ?? null}
          existing_amount={existing_pledge?.amount_monthly ?? null}
          is_creator={is_creator}
          is_inner={inner}
        />

        {/* edit + delete (creator only, early-stage only) */}
        {is_creator && ["proposed", "gaining_traction"].includes(idea.status) && (
          <div className="mt-8 flex items-center gap-4">
            <EditIdea
              ideaId={id}
              title={idea.title}
              description={idea.description}
              problem={idea.problem}
              monthlyAsk={idea.monthly_ask}
            />
            {Number(idea.pledge_count) === 0 && <DeleteIdea ideaId={id} />}
          </div>
        )}

        {/* supporting materials + proposals (cell_forming+) */}
        {showProposals && (
          <div className="mt-10 space-y-6">
            <Materials
              ideaId={id}
              isCreator={is_creator}
              initialBody={materialsBody}
            />

            <div>
              <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">
                proposals
              </h2>
              <Proposals
                ideaId={id}
                proposals={proposalsList}
                userPreferenceId={userPreferenceId}
                isSponsor={isSponsor}
              />
            </div>

            {userCell && idea.status === "cell_forming" && (
              <div className="mt-4">
                <ProposalForm
                  ideaId={id}
                  cellId={userCell.id}
                  cellName={userCell.name}
                  existing={userExistingProposal}
                />
              </div>
            )}
          </div>
        )}

        {/* comments */}
        <Comments
          idea_id={id}
          user_id={effectiveUserId ?? null}
          comments={comments}
          is_inner={inner}
        />
      </main>
    </div>
  );
}
