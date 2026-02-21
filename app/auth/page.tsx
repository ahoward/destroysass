"use client";

import { useState } from "react";
import { signIn, signUp } from "./actions";

export default function AuthPage() {
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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-sm space-y-6 px-4">
        <h1 className="text-2xl font-semibold text-center text-black dark:text-white">
          {isSignUp ? "Create Account" : "Sign In"}
        </h1>

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm bg-white dark:bg-zinc-900 dark:border-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-sm bg-white dark:bg-zinc-900 dark:border-zinc-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          {message && (
            <p className="text-sm text-green-600 dark:text-green-400">{message}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setMessage(null);
            }}
            className="font-medium text-black dark:text-white underline"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>

        <p className="text-center text-sm text-zinc-500">
          <a href="/" className="underline">Back to home</a>
        </p>
      </div>
    </div>
  );
}
