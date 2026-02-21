"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn, signUp } from "./actions";

function AuthForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "";

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setMessage(null);

    const result = isSignUp ? await signUp(formData) : await signIn(formData);

    if (result?.error) {
      setError(result.error);
    } else if ("success" in (result ?? {})) {
      setMessage((result as { success: string }).success);
    }
  }

  return (
    <div className="w-full max-w-sm space-y-6 px-4">
      <h1 className="text-2xl font-semibold text-center text-white">
        {isSignUp ? "create account" : "sign in"}
      </h1>

      <form action={handleSubmit} className="space-y-4">
        {next && <input type="hidden" name="next" value={next} />}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded border border-[#333] bg-[#111] px-3 py-2 text-sm text-[#f0f0f0] focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            className="mt-1 block w-full rounded border border-[#333] bg-[#111] px-3 py-2 text-sm text-[#f0f0f0] focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {message && (
          <p className="text-sm text-green-500">{message}</p>
        )}

        <button
          type="submit"
          className="w-full rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
        >
          {isSignUp ? "sign up" : "sign in"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500">
        {isSignUp ? "already have an account?" : "don\u2019t have an account?"}{" "}
        <button
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError(null);
            setMessage(null);
          }}
          className="font-medium text-white underline"
        >
          {isSignUp ? "sign in" : "sign up"}
        </button>
      </p>

      <p className="text-center text-sm text-gray-600">
        <a href="/" className="underline hover:text-gray-400 transition-colors">
          back to home
        </a>
      </p>
    </div>
  );
}

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      <Suspense>
        <AuthForm />
      </Suspense>
    </div>
  );
}
