"use client";

import { useState } from "react";
import { setPreference } from "./proposal_actions";

type Proposal = {
  id: string;
  title: string;
  body: string;
  cell_name: string;
  submitted_by: string;
  created_at: string;
  preference_count: number;
};

type Props = {
  ideaId: string;
  proposals: Proposal[];
  userPreferenceId: string | null;
  isSponsor: boolean;
};

export default function Proposals({
  ideaId,
  proposals,
  userPreferenceId,
  isSponsor,
}: Props) {
  if (proposals.length === 0) {
    return (
      <div className="border border-[var(--border-primary)] rounded-lg p-6 text-center">
        <p className="text-[var(--text-muted)] text-sm">
          no proposals submitted yet. certified cells can submit proposals for this idea.
        </p>
      </div>
    );
  }

  const maxPrefs = Math.max(...proposals.map((p) => p.preference_count));

  return (
    <div className="space-y-4">
      {proposals.map((proposal) => (
        <ProposalCard
          key={proposal.id}
          proposal={proposal}
          ideaId={ideaId}
          isPreferred={userPreferenceId === proposal.id}
          isSponsor={isSponsor}
          isLeading={proposal.preference_count > 0 && proposal.preference_count === maxPrefs}
        />
      ))}
    </div>
  );
}

function ProposalCard({
  proposal,
  ideaId,
  isPreferred,
  isSponsor,
  isLeading,
}: {
  proposal: Proposal;
  ideaId: string;
  isPreferred: boolean;
  isSponsor: boolean;
  isLeading: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePreference() {
    setLoading(true);
    setError(null);
    const result = await setPreference(proposal.id, ideaId);
    setLoading(false);
    if (result?.error) setError(result.error);
  }

  return (
    <div
      className={`border rounded-lg p-6 ${
        isLeading
          ? "border-red-600"
          : "border-[var(--border-primary)]"
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3 className="font-semibold text-lg">{proposal.title}</h3>
          <p className="text-xs text-[var(--text-muted)]">
            by <span className="text-[var(--text-secondary)]">{proposal.cell_name}</span>
            {" "}&middot;{" "}
            {new Date(proposal.created_at).toLocaleDateString()}
          </p>
        </div>
        {isLeading && (
          <span className="text-xs border border-red-600 text-red-600 rounded px-2 py-0.5 shrink-0">
            leading
          </span>
        )}
      </div>

      <div className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap mb-4">
        {proposal.body}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--text-muted)]">
          {proposal.preference_count}{" "}
          {proposal.preference_count === 1 ? "sponsor prefers" : "sponsors prefer"} this
        </p>

        {isSponsor && (
          <button
            onClick={handlePreference}
            disabled={loading}
            className={`text-sm px-3 py-1 rounded transition-colors disabled:opacity-50 ${
              isPreferred
                ? "bg-red-600 text-white hover:bg-red-700"
                : "border border-[var(--border-secondary)] text-[var(--text-secondary)] hover:border-red-600 hover:text-red-600"
            }`}
          >
            {loading
              ? "..."
              : isPreferred
                ? "preferred"
                : "I prefer this"}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
    </div>
  );
}
