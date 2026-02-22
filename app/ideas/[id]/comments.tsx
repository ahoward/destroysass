"use client";

import { useState, useTransition, useRef } from "react";
import { postComment, deleteComment } from "./actions";

type Comment = {
  id: string;
  user_id: string;
  display_name: string;
  body: string;
  created_at: string;
};

type Props = {
  idea_id: string;
  user_id: string | null;
  comments: Comment[];
};

function relative_time(iso: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diff = Math.max(0, now - then);
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export default function Comments({ idea_id, user_id, comments }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const body = new FormData(form).get("body") as string;
    if (!body?.trim()) return;

    setError(null);
    startTransition(async () => {
      const result = await postComment(idea_id, body);
      if (result?.error) {
        setError(result.error);
      } else {
        formRef.current?.reset();
      }
    });
  }

  function handleDelete(comment_id: string) {
    startTransition(async () => {
      const result = await deleteComment(comment_id, idea_id);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold mb-4">
        discussion
        {comments.length > 0 && (
          <span className="text-gray-600 font-normal text-sm ml-2">
            ({comments.length})
          </span>
        )}
      </h2>

      {/* comment form */}
      {user_id ? (
        <form ref={formRef} onSubmit={handleSubmit} className="mb-6">
          <textarea
            name="body"
            required
            maxLength={2000}
            rows={3}
            placeholder="share your thoughts..."
            className="w-full bg-[#111] border border-gray-800 rounded px-3 py-2 text-sm focus:border-red-600 focus:outline-none resize-none mb-2"
          />
          {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
          <button
            type="submit"
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-1.5 rounded transition-colors disabled:opacity-50"
          >
            {isPending ? "posting..." : "post comment"}
          </button>
        </form>
      ) : (
        <div className="border border-gray-800 rounded p-4 mb-6 text-center">
          <a
            href={`/auth?next=/ideas/${idea_id}`}
            className="text-red-500 hover:text-red-400 text-sm transition-colors"
          >
            sign in to join the discussion &rarr;
          </a>
        </div>
      )}

      {/* comment list */}
      {comments.length === 0 ? (
        <p className="text-gray-600 text-sm italic">no comments yet. be the first.</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="border-l-2 border-gray-800 pl-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-300">
                  {c.display_name}
                </span>
                <span className="text-xs text-gray-600">
                  {relative_time(c.created_at)}
                </span>
                {user_id === c.user_id && (
                  <button
                    onClick={() => handleDelete(c.id)}
                    disabled={isPending}
                    className="text-xs text-gray-700 hover:text-red-500 transition-colors ml-auto disabled:opacity-50"
                    title="delete comment"
                  >
                    &times;
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-400 whitespace-pre-wrap">{c.body}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
