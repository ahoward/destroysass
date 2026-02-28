import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { is_admin } from "@/lib/groups";
import { approveApplication, denyApplication } from "./actions";

type Application = {
  id: string;
  user_id: string;
  name: string;
  reason: string;
  contribution: string;
  status: string;
  created_at: string;
  email?: string;
};

export default async function ApplicationsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !(await is_admin(supabase, user))) {
    notFound();
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!serviceRoleKey) {
    return (
      <div className="min-h-screen bg-black text-white p-12">
        <p className="text-red-500">SUPABASE_SERVICE_ROLE_KEY not configured.</p>
      </div>
    );
  }

  const adminClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    serviceRoleKey
  );

  // fetch all applications
  const { data: applications } = await adminClient
    .from("cabal_applications")
    .select("id, user_id, name, reason, contribution, status, created_at")
    .order("created_at", { ascending: false });

  // get user emails
  const { data: allUsersData } = await adminClient.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  const allUsers = (
    allUsersData as unknown as { users: { id: string; email: string }[] }
  )?.users ?? [];
  const emailMap = new Map(allUsers.map((u) => [u.id, u.email]));

  const apps: Application[] = (applications ?? []).map((a) => ({
    ...a,
    email: emailMap.get(a.user_id) ?? a.user_id,
  }));

  const pending = apps.filter((a) => a.status === "pending");
  const reviewed = apps.filter((a) => a.status !== "pending");

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <nav className="border-b border-[var(--border-primary)] px-6 py-4 flex items-center justify-between">
        <a
          href="/"
          className="text-red-500 font-bold text-lg tracking-tight"
        >
          destroysaas
        </a>
        <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
          <a
            href="/admin"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            admin
          </a>
          <span className="text-red-500 font-medium">applications</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">cabal applications</h1>
        <p className="text-[var(--text-muted)] text-sm mb-8">
          {pending.length} pending, {reviewed.length} reviewed
        </p>

        {/* pending */}
        {pending.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">
              pending review
            </h2>
            <div className="space-y-4">
              {pending.map((app) => (
                <div
                  key={app.id}
                  className="border border-yellow-800 rounded-lg p-5"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="font-medium">{app.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {app.email} &middot;{" "}
                        {new Date(app.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <form
                        action={async () => {
                          "use server";
                          await approveApplication(app.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="bg-green-800 hover:bg-green-700 text-white text-sm px-3 py-1.5 rounded transition-colors"
                        >
                          approve
                        </button>
                      </form>
                      <form
                        action={async () => {
                          "use server";
                          await denyApplication(app.id);
                        }}
                      >
                        <button
                          type="submit"
                          className="bg-red-900 hover:bg-red-800 text-white text-sm px-3 py-1.5 rounded transition-colors"
                        >
                          deny
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">
                        why they want in
                      </p>
                      <p>{app.reason}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">
                        what they bring
                      </p>
                      <p>{app.contribution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* reviewed */}
        {reviewed.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">
              reviewed
            </h2>
            <div className="space-y-3">
              {reviewed.map((app) => (
                <div
                  key={app.id}
                  className="border border-[var(--border-primary)] rounded-lg p-4 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="font-medium">{app.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {app.email}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      app.status === "approved"
                        ? "bg-green-900 text-green-400"
                        : "bg-red-900 text-red-400"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {apps.length === 0 && (
          <p className="text-[var(--text-faint)] text-sm italic">
            no applications yet.
          </p>
        )}

        <div className="mt-8 text-sm text-[var(--text-muted)]">
          <a
            href="/admin"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            &larr; back to admin
          </a>
        </div>
      </main>
    </div>
  );
}
