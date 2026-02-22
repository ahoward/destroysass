"use client";

import { useState, useTransition } from "react";
import { deleteIdea } from "./actions";

type Props = {
  ideaId: string;
};

export default function DeleteIdea({ ideaId }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    setError(null);
    startTransition(async () => {
      const res = await deleteIdea(ideaId);
      if (res?.error) {
        setError(res.error);
        setConfirming(false);
      } else {
        // redirect to ideas page
        window.location.href = "/ideas";
      }
    });
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="text-xs text-gray-700 hover:text-red-500 transition-colors"
      >
        delete idea
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-red-400">are you sure?</span>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="text-xs text-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
      >
        {isPending ? "deleting..." : "yes, delete"}
      </button>
      <button
        onClick={() => setConfirming(false)}
        className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
      >
        cancel
      </button>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
