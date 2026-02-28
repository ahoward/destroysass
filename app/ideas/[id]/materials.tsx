"use client";

import { useState } from "react";
import { saveMaterials } from "./proposal_actions";

type Props = {
  ideaId: string;
  isCreator: boolean;
  initialBody: string;
};

export default function Materials({ ideaId, isCreator, initialBody }: Props) {
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState(initialBody);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    const result = await saveMaterials(ideaId, body);
    setSaving(false);

    if (result?.error) {
      setError(result.error);
    } else {
      setEditing(false);
    }
  }

  return (
    <div className="border border-[var(--border-primary)] rounded-lg p-6">
      <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">
        supporting materials
      </h2>

      {!editing && !initialBody && isCreator && (
        <div className="text-center py-4">
          <p className="text-[var(--text-muted)] text-sm mb-3">
            add context for cells — business plans, workflows, screenshots, domain knowledge.
          </p>
          <button
            onClick={() => setEditing(true)}
            className="text-red-500 hover:text-red-400 text-sm transition-colors"
          >
            add supporting materials &rarr;
          </button>
        </div>
      )}

      {!editing && !initialBody && !isCreator && (
        <p className="text-[var(--text-muted)] text-sm">
          the idea creator hasn&apos;t added supporting materials yet.
        </p>
      )}

      {!editing && initialBody && (
        <>
          <div className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
            {initialBody}
          </div>
          {isCreator && (
            <button
              onClick={() => setEditing(true)}
              className="mt-4 text-red-500 hover:text-red-400 text-sm transition-colors"
            >
              edit materials
            </button>
          )}
        </>
      )}

      {editing && (
        <div className="space-y-3">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            maxLength={10000}
            placeholder="describe your business context, workflows, pain points, existing tools, ideal solution..."
            className="w-full rounded border border-[var(--border-secondary)] bg-[var(--bg-input)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 resize-y"
          />
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {saving ? "saving..." : "save materials"}
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setBody(initialBody);
                setError(null);
              }}
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
            >
              cancel
            </button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
}
