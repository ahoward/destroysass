import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { is_inner } from "@/lib/groups";
import Nav from "@/app/components/nav";
import ApplicationForm from "./form";

export const metadata: Metadata = {
  title: "apply — destroysaas",
};

export default async function ApplyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/lobby/apply");
  }

  if (await is_inner(supabase, user)) {
    redirect("/dashboard");
  }

  // check for existing application
  const { data: application } = await supabase
    .from("cabal_applications")
    .select("id, status, name, reason, contribution, created_at")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/lobby" />

      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        <a
          href="/lobby"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        >
          &larr; back to lobby
        </a>

        <div className="mt-8 mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            apply for the inner cabal
          </h1>
          <p className="text-[var(--text-muted)] text-sm">
            the inner circle shapes what gets built. tell us who you are and why
            you want in.
          </p>
        </div>

        {application?.status === "pending" ? (
          <div className="border border-yellow-800 rounded-lg p-6">
            <p className="text-sm text-yellow-600 font-medium mb-2">
              your application is pending review
            </p>
            <div className="space-y-3 text-sm text-[var(--text-secondary)]">
              <div>
                <p className="text-xs text-[var(--text-muted)]">name</p>
                <p>{application.name}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)]">
                  why you want in
                </p>
                <p>{application.reason}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--text-muted)]">
                  what you bring
                </p>
                <p>{application.contribution}</p>
              </div>
            </div>
            <p className="text-xs text-[var(--text-faint)] mt-4">
              submitted{" "}
              {new Date(application.created_at).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <ApplicationForm />
        )}
      </main>
    </div>
  );
}
