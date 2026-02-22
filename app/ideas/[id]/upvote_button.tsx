"use client";

import { useTransition } from "react";
import { toggleUpvote } from "./actions";

type Props = {
  idea_id: string;
  upvote_count: number;
  user_has_upvoted: boolean;
};

export default function UpvoteButton({ idea_id, upvote_count, user_has_upvoted }: Props) {
  const [pending, startTransition] = useTransition();

  function handle_click() {
    startTransition(() => {
      toggleUpvote(idea_id);
    });
  }

  return (
    <button
      onClick={handle_click}
      disabled={pending}
      className={`flex items-center gap-1.5 border rounded px-3 py-1.5 text-sm transition-colors disabled:opacity-50 ${
        user_has_upvoted
          ? "border-red-700 text-red-500 bg-red-950/30"
          : "border-[#333] text-gray-500 hover:border-gray-500 hover:text-gray-300"
      }`}
    >
      <span className={user_has_upvoted ? "text-red-500" : ""}>&#9650;</span>
      <span className="tabular-nums font-medium">{upvote_count}</span>
    </button>
  );
}
