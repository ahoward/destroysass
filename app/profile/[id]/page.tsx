import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import Nav from "@/app/components/nav";

const STATUS_LABELS: Record<string, string> = {
  proposed: "proposed",
  gaining_traction: "gaining traction",
  threshold_reached: "threshold reached",
  cell_forming: "cell forming",
  active: "active",
  cancelled: "cancelled",
};

const STATUS_COLORS: Record<string, string> = {
  proposed: "text-gray-500 border-gray-700",
  gaining_traction: "text-yellow-600 border-yellow-800",
  threshold_reached: "text-green-500 border-green-700",
  cell_forming: "text-purple-400 border-purple-600",
  active: "text-green-400 border-green-600",
  cancelled: "text-red-800 border-red-900",
};

type IdeaRow = {
  id: string;
  title: string;
  status: string;
  total_pledged: number;
  pledge_count: number;
  upvote_count: number;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", id)
    .single();

  const name = profile?.display_name || "user";
  return { title: `${name} — destroysaas` };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // validate UUID format
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      id
    )
  ) {
    notFound();
  }

  const supabase = await createClient();

  // fetch profile, ideas, upvote count in parallel
  const [profile_result, ideas_result, upvotes_result] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", id).single(),
    supabase
      .from("idea_board")
      .select("id, title, status, total_pledged, pledge_count, upvote_count")
      .eq("created_by", id)
      .order("total_pledged", { ascending: false }),
    supabase
      .from("upvotes")
      .select("idea_id, ideas!inner(created_by)")
      .eq("ideas.created_by", id),
  ]);

  const profile = profile_result.data as {
    display_name: string | null;
    bio: string | null;
    website: string | null;
    created_at: string;
  } | null;
  const ideas = (ideas_result.data as IdeaRow[]) ?? [];
  const total_upvotes = upvotes_result.data?.length ?? 0;

  // get email prefix as fallback display name (need service role for auth.users)
  let fallback_name = "anonymous";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!profile?.display_name && serviceRoleKey) {
    const adminClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      serviceRoleKey
    );
    const { data } = await adminClient.auth.admin.getUserById(id);
    if (data?.user?.email) {
      fallback_name = data.user.email.split("@")[0];
    }
  }

  // if no profile and no ideas, this user doesn't exist or has no presence
  if (!profile && ideas.length === 0) {
    notFound();
  }

  const display_name = profile?.display_name || fallback_name;
  const member_since = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/profile" />

      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        {/* profile header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-1">
            {display_name}
          </h1>
          <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
            {member_since && <span>member since {member_since}</span>}
            {total_upvotes > 0 && (
              <>
                {member_since && (
                  <span className="text-[var(--text-faint)]">&middot;</span>
                )}
                <span>
                  {total_upvotes} {total_upvotes === 1 ? "upvote" : "upvotes"}{" "}
                  received
                </span>
              </>
            )}
          </div>
          {profile?.bio && (
            <p className="text-[var(--text-secondary)] mt-3">{profile.bio}</p>
          )}
          {profile?.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-red-500 hover:text-red-400 transition-colors mt-2 inline-block"
            >
              {profile.website.replace(/^https?:\/\//, "")}
            </a>
          )}
        </div>

        {/* ideas */}
        <section>
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            ideas by {display_name}
          </h2>

          {ideas.length === 0 ? (
            <p className="text-[var(--text-muted)] text-sm">no ideas submitted yet.</p>
          ) : (
            <div className="space-y-3">
              {ideas.map((idea) => (
                <a
                  key={idea.id}
                  href={`/ideas/${idea.id}`}
                  className="block border border-[var(--border-primary)] rounded-lg p-5 hover:border-[var(--border-secondary)] transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-semibold group-hover:text-red-400 transition-colors truncate">
                        {idea.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2 text-xs text-[var(--text-muted)]">
                        <span>
                          <span className="text-[var(--text-secondary)]">
                            {Number(idea.pledge_count)}
                          </span>{" "}
                          {Number(idea.pledge_count) === 1
                            ? "sponsor"
                            : "sponsors"}
                        </span>
                        <span className="text-[var(--text-faint)]">&middot;</span>
                        <span>
                          <span className="text-[var(--text-secondary)]">
                            {Number(idea.upvote_count)}
                          </span>{" "}
                          {Number(idea.upvote_count) === 1
                            ? "upvote"
                            : "upvotes"}
                        </span>
                        <span className="text-[var(--text-faint)]">&middot;</span>
                        <span
                          className={`border rounded px-1.5 py-0.5 ${STATUS_COLORS[idea.status] ?? "text-gray-500 border-gray-700"}`}
                        >
                          {STATUS_LABELS[idea.status] ?? idea.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-bold text-red-600 tabular-nums">
                        ${Number(idea.total_pledged).toLocaleString()}
                      </div>
                      <div className="text-xs text-[var(--text-muted)]">/mo pledged</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
