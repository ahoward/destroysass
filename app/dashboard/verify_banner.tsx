"use client";

import { useState, useTransition } from "react";
import { resendVerification } from "@/app/auth/actions";

export default function VerifyBanner() {
  const [pending, start] = useTransition();
  const [message, set_message] = useState<string | null>(null);

  function handle_resend() {
    start(async () => {
      const result = await resendVerification();
      if (result.error) {
        set_message(result.error);
      } else if (result.success) {
        set_message(result.success);
      }
    });
  }

  return (
    <div className="border border-yellow-800 bg-yellow-950/30 rounded-lg p-4 mb-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-yellow-300">
          please verify your email — check your inbox for a confirmation link
        </p>
        <button
          onClick={handle_resend}
          disabled={pending}
          className="text-xs text-yellow-400 border border-yellow-700 px-3 py-1.5 rounded hover:border-yellow-500 hover:text-yellow-200 transition-colors shrink-0 disabled:opacity-50"
        >
          {pending ? "sending..." : "resend"}
        </button>
      </div>
      {message && (
        <p className="text-xs text-gray-400 mt-2">{message}</p>
      )}
    </div>
  );
}
