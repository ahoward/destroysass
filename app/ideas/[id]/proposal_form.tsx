"use client";

import { useState } from "react";
import { submitProposal, deleteProposal } from "./proposal_actions";

type ExistingProposal = {
  id: string;
  title: string;
  body: string;
};

type Props = {
  ideaId: string;
  cellId: string;
  cellName: string;
  existing: ExistingProposal | null;
};

export default function ProposalForm({ ideaId, cellId, cellName, existing }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(existing?.title ?? "");
  const [body, setBody] = useState(existing?.body ?? "");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setSaving(true);
    setError(null);
    const result = await submitProposal(ideaId, cellId, title, body);
    setSaving(false);

    if (result?.error) {
      setError(result.error);
    } else {
      setOpen(false);
    }
  }

  async function handleDelete() {
    if (!existing) return;
    setDeleting(true);
    setError(null);
    const result = await deleteProposal(existing.id, ideaId);
    setDeleting(false);

    if (result?.error) {
      setError(result.error);
    } else {
      setOpen(false);
      setTitle("");
      setBody("");
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded text-sm transition-colors"
      >
        {existing ? `edit proposal (${cellName})` : `submit proposal as ${cellName}`} &rarr;
      </button>
    );
  }

  return (
    <div className="border border-[var(--border-primary)] rounded-lg p-6 space-y-4">
      <h3 className="font-semibold">
        {existing ? "edit proposal" : "submit proposal"}{" "}
        <span className="text-[var(--text-muted)] font-normal">as {cellName}</span>
      </h3>

      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
          proposal title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          placeholder="a concise title for your approach"
          className="w-full rounded border border-[var(--border-secondary)] bg-[var(--bg-input)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
          proposal body
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          maxLength={10000}
          placeholder="describe your approach — what you'd build, how, timeline, team, and product vision..."
          className="w-full rounded border border-[var(--border-secondary)] bg-[var(--bg-input)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 resize-y"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors disabled:opacity-50"
        >
          {saving ? "submitting..." : existing ? "update proposal" : "submit proposal"}
        </button>
        <button
          onClick={() => {
            setOpen(false);
            setError(null);
          }}
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        >
          cancel
        </button>
        {existing && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="ml-auto text-sm text-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
          >
            {deleting ? "withdrawing..." : "withdraw proposal"}
          </button>
        )}
      </div>
    </div>
  );
}
