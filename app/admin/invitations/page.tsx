import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/app/components/nav";
import { is_admin } from "@/lib/groups";
import InvitationForm from "./invitation_form";
import InvitationList from "./invitation_list";

export const metadata: Metadata = {
  title: "invitations — admin — destroysaas",
};

export default async function InvitationsAdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) notFound();
  if (!(await is_admin(supabase, user))) notFound();

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!serviceRoleKey) notFound();

  const adminClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    serviceRoleKey
  );

  const { data: invitations } = await adminClient
    .from("invitations")
    .select("*")
    .order("created_at", { ascending: false });

  // resolve accepted_by user IDs to emails
  const acceptedEmails: Record<string, string> = {};
  const acceptedUserIds = (invitations ?? [])
    .filter((i) => i.accepted_by)
    .map((i) => i.accepted_by as string);

  for (const uid of [...new Set(acceptedUserIds)]) {
    const { data } = await adminClient.auth.admin.getUserById(uid);
    if (data?.user?.email) {
      acceptedEmails[uid] = data.user.email;
    }
  }

  // summary stats
  const total = (invitations ?? []).length;
  const viewed = (invitations ?? []).filter((i) => i.viewed_at).length;
  const accepted = (invitations ?? []).filter((i) => i.accepted_at).length;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/admin" />

      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        <div className="mb-8">
          <a
            href="/admin"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            &larr; back to admin
          </a>
        </div>

        <h1 className="text-3xl font-bold tracking-tight lowercase mb-2">
          invitations
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-8">
          create personalized invite links. track views and acceptance.
        </p>

        {/* stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { value: total, label: "sent" },
            { value: viewed, label: "viewed" },
            { value: accepted, label: "accepted" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-[var(--border-primary)] rounded-lg p-3 text-center"
            >
              <div className="text-2xl font-bold tabular-nums text-red-600">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--text-muted)] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* create form */}
        <section className="mb-12">
          <InvitationForm />
        </section>

        {/* list */}
        <section>
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">
            all invitations
          </h2>
          <InvitationList
            invitations={invitations ?? []}
            acceptedEmails={acceptedEmails}
          />
        </section>
      </main>
    </div>
  );
}
