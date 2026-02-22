"use client";

import { useActionState } from "react";
import { submitApplication } from "./actions";

export default function ApplicationForm() {
  const [state, formAction, isPending] = useActionState(submitApplication, null);

  if (state?.success) {
    return (
      <div className="border border-green-800 rounded-lg p-6 text-center">
        <p className="text-green-400 font-medium mb-2">application submitted!</p>
        <p className="text-gray-500 text-sm">
          your application is under review. we&apos;ll be in touch.
        </p>
        <a
          href="/dev-cells"
          className="text-red-500 hover:text-red-400 text-sm mt-4 inline-block transition-colors"
        >
          &larr; back to dev cells
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state?.errors?._form && (
        <div className="text-red-400 text-sm border border-red-800 rounded p-3">
          {state.errors._form}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          cooperative name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={120}
          className="w-full bg-[#111] border border-gray-800 rounded px-3 py-2 text-sm focus:border-red-600 focus:outline-none"
          placeholder="e.g. pixelforge collective"
        />
        {state?.errors?.name && (
          <p className="text-red-400 text-xs mt-1">{state.errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          maxLength={1000}
          className="w-full bg-[#111] border border-gray-800 rounded px-3 py-2 text-sm focus:border-red-600 focus:outline-none resize-none"
          placeholder="what does your cooperative do? what's your experience?"
        />
        {state?.errors?.description && (
          <p className="text-red-400 text-xs mt-1">{state.errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium mb-1">
          website <span className="text-gray-600">(optional)</span>
        </label>
        <input
          id="website"
          name="website"
          type="url"
          className="w-full bg-[#111] border border-gray-800 rounded px-3 py-2 text-sm focus:border-red-600 focus:outline-none"
          placeholder="https://yourcooperative.dev"
        />
        {state?.errors?.website && (
          <p className="text-red-400 text-xs mt-1">{state.errors.website}</p>
        )}
      </div>

      <div>
        <label htmlFor="skills" className="block text-sm font-medium mb-1">
          skills
        </label>
        <input
          id="skills"
          name="skills"
          type="text"
          required
          className="w-full bg-[#111] border border-gray-800 rounded px-3 py-2 text-sm focus:border-red-600 focus:outline-none"
          placeholder="react, node, postgres, devops (comma-separated)"
        />
        {state?.errors?.skills && (
          <p className="text-red-400 text-xs mt-1">{state.errors.skills}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact_email" className="block text-sm font-medium mb-1">
          contact email
        </label>
        <input
          id="contact_email"
          name="contact_email"
          type="email"
          required
          className="w-full bg-[#111] border border-gray-800 rounded px-3 py-2 text-sm focus:border-red-600 focus:outline-none"
          placeholder="hello@yourcooperative.dev"
        />
        {state?.errors?.contact_email && (
          <p className="text-red-400 text-xs mt-1">{state.errors.contact_email}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "submitting..." : "submit application"}
      </button>
    </form>
  );
}
