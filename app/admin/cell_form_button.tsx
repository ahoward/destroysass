"use client";

import { useState, useTransition } from "react";
import { triggerCellFormation } from "./actions";

type Props = {
  ideaId: string;
};

export default function CellFormButton({ ideaId }: Props) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ error?: string; success?: boolean } | null>(null);

  function handleClick() {
    startTransition(async () => {
      const res = await triggerCellFormation(ideaId);
      setResult(res);
    });
  }

  if (result?.success) {
    return (
      <span className="text-xs text-purple-400 border border-purple-600 rounded px-2 py-1">
        cell forming ✓
      </span>
    );
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleClick}
        disabled={isPending}
        className="text-xs bg-green-900 hover:bg-green-800 border border-green-700 text-green-200 rounded px-3 py-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "forming..." : "trigger cell formation"}
      </button>
      {result?.error && (
        <span className="text-xs text-red-400">{result.error}</span>
      )}
    </div>
  );
}
