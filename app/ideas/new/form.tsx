"use client";

import { useActionState } from "react";
import { submitIdea, type SubmitIdeaResult } from "./actions";

const input_classes =
  "mt-1 block w-full rounded border border-[#333] bg-[#111] px-3 py-2 text-sm text-[#f0f0f0] placeholder-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600";

export default function IdeaForm() {
  const [state, action, pending] = useActionState<SubmitIdeaResult, FormData>(
    submitIdea,
    null
  );

  const prev = state?.previousData;
  const errors = state?.errors;

  return (
    <form action={action} className="space-y-6">
      {errors?.general && (
        <p className="text-sm text-red-500 border border-red-900 rounded px-3 py-2 bg-red-950/30">
          {errors.general}
        </p>
      )}

      {/* title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300">
          title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          minLength={10}
          maxLength={120}
          defaultValue={prev?.title ?? ""}
          placeholder="a slack replacement we actually own"
          className={input_classes}
        />
        {errors?.title && (
          <p className="mt-1 text-xs text-red-500">{errors.title}</p>
        )}
      </div>

      {/* problem */}
      <div>
        <label htmlFor="problem" className="block text-sm font-medium text-gray-300">
          problem
        </label>
        <p className="text-xs text-gray-600 mb-1">
          what&apos;s the bleeding-neck problem this solves?
        </p>
        <textarea
          id="problem"
          name="problem"
          required
          minLength={50}
          maxLength={1000}
          rows={4}
          defaultValue={prev?.problem ?? ""}
          placeholder="slack costs us $15/user/month and raised prices 30% last year..."
          className={input_classes}
        />
        {errors?.problem && (
          <p className="mt-1 text-xs text-red-500">{errors.problem}</p>
        )}
      </div>

      {/* description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300">
          description
        </label>
        <p className="text-xs text-gray-600 mb-1">
          describe the solution you want built.
        </p>
        <textarea
          id="description"
          name="description"
          required
          minLength={100}
          maxLength={2000}
          rows={6}
          defaultValue={prev?.description ?? ""}
          placeholder="a hosted, maintained team messaging tool — channels, dms, threads, file sharing..."
          className={input_classes}
        />
        {errors?.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description}</p>
        )}
      </div>

      {/* monthly_ask */}
      <div>
        <label htmlFor="monthly_ask" className="block text-sm font-medium text-gray-300">
          monthly ask ($)
        </label>
        <p className="text-xs text-gray-600 mb-1">
          what would you pay per month for a maintained, hosted solution you own? ($25–$500)
        </p>
        <input
          id="monthly_ask"
          name="monthly_ask"
          type="number"
          required
          min={25}
          max={500}
          step={1}
          defaultValue={prev?.monthly_ask ?? ""}
          placeholder="50"
          className={input_classes + " max-w-[160px]"}
        />
        {errors?.monthly_ask && (
          <p className="mt-1 text-xs text-red-500">{errors.monthly_ask}</p>
        )}
      </div>

      {/* actions */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded text-sm transition-colors"
        >
          {pending ? "submitting..." : "submit idea \u2192"}
        </button>
        <a
          href="/ideas"
          className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          &larr; back to the board
        </a>
      </div>
    </form>
  );
}
