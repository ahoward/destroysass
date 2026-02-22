"use client";

import { useState, useTransition } from "react";
import { updateIdea } from "./actions";

type Props = {
  ideaId: string;
  title: string;
  description: string;
  problem: string;
  monthlyAsk: number;
};

export default function EditIdea({ ideaId, title, description, problem, monthlyAsk }: Props) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [formTitle, setFormTitle] = useState(title);
  const [formDesc, setFormDesc] = useState(description);
  const [formProblem, setFormProblem] = useState(problem);
  const [formAsk, setFormAsk] = useState(monthlyAsk);

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="text-xs text-gray-600 hover:text-gray-400 transition-colors border border-[#222] rounded px-2 py-1"
      >
        edit idea
      </button>
    );
  }

  function handleSubmit() {
    setError(null);
    startTransition(async () => {
      const res = await updateIdea(ideaId, {
        title: formTitle,
        description: formDesc,
        problem: formProblem,
        monthly_ask: formAsk,
      });
      if (res?.error) {
        setError(res.error);
      } else {
        setEditing(false);
      }
    });
  }

  const inputClass =
    "w-full bg-[#111] border border-[#222] rounded px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-gray-500 focus:outline-none transition-colors";

  return (
    <div className="border border-[#222] rounded-lg p-6 mt-6">
      <h3 className="text-sm font-semibold mb-4">edit your idea</h3>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-500 block mb-1">title</label>
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">description</label>
          <textarea
            value={formDesc}
            onChange={(e) => setFormDesc(e.target.value)}
            rows={4}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">the problem</label>
          <textarea
            value={formProblem}
            onChange={(e) => setFormProblem(e.target.value)}
            rows={3}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 block mb-1">monthly ask ($)</label>
          <input
            type="number"
            value={formAsk}
            onChange={(e) => setFormAsk(Number(e.target.value))}
            min={25}
            max={10000}
            step={25}
            className={inputClass}
          />
        </div>
      </div>

      {error && <p className="text-xs text-red-400 mt-3">{error}</p>}

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors disabled:opacity-50"
        >
          {isPending ? "saving..." : "save changes"}
        </button>
        <button
          onClick={() => {
            setEditing(false);
            setFormTitle(title);
            setFormDesc(description);
            setFormProblem(problem);
            setFormAsk(monthlyAsk);
          }}
          className="text-sm text-gray-500 hover:text-gray-300 px-4 py-2 transition-colors"
        >
          cancel
        </button>
      </div>
    </div>
  );
}
