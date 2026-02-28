import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/app/components/nav";
import ProfileForm from "./form";

export const metadata: Metadata = {
  title: "edit profile — destroysaas",
};

export default async function EditProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/dashboard/profile");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, bio, website")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/dashboard" />

      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        <div className="mb-8">
          <a
            href="/dashboard"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            &larr; back to dashboard
          </a>
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-2">
          edit profile
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-8">
          this info is shown on your{" "}
          <a
            href={`/profile/${user.id}`}
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            public profile
          </a>
        </p>

        <ProfileForm
          initial_display_name={profile?.display_name ?? ""}
          initial_bio={profile?.bio ?? ""}
          initial_website={profile?.website ?? ""}
        />
      </main>
    </div>
  );
}
