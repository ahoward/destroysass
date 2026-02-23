import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { is_admin } from "@/lib/groups";
import { actAsGhost, stopActing } from "./actions";

type GhostUser = {
  id: string;
  email: string;
  display_name: string | null;
  bio: string | null;
  idea_count: number;
  pledge_count: number;
};

export default async function GhostRosterPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !(await is_admin(supabase, user))) {
    notFound();
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!serviceRoleKey) {
    return (
      <div className="min-h-screen bg-black text-white p-12">
        <p className="text-red-500">SUPABASE_SERVICE_ROLE_KEY not configured.</p>
      </div>
    );
  }

  const adminClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    serviceRoleKey
  );

  // get ghost group members
  const { data: ghostGroup } = await adminClient
    .from("groups")
    .select("id")
    .eq("name", "ghost")
    .single();

  if (!ghostGroup) {
    return (
      <div className="min-h-screen bg-black text-white p-12">
        <p className="text-gray-500">no ghost group found. run migration 012 first.</p>
      </div>
    );
  }

  const { data: members } = await adminClient
    .from("group_members")
    .select("user_id")
    .eq("group_id", ghostGroup.id);

  const ghostUserIds = (members ?? []).map((m) => m.user_id);

  // get user emails
  const { data: allUsersData } = await adminClient.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  const allUsers = (
    allUsersData as unknown as { users: { id: string; email: string }[] }
  )?.users ?? [];
  const userMap = new Map(allUsers.map((u) => [u.id, u.email]));

  // get profiles
  const { data: profiles } = ghostUserIds.length > 0
    ? await adminClient
        .from("profiles")
        .select("id, display_name, bio")
        .in("id", ghostUserIds)
    : { data: [] };

  const profileMap = new Map(
    (profiles ?? []).map((p) => [p.id, { display_name: p.display_name, bio: p.bio }])
  );

  // get idea counts per ghost
  const { data: ideas } = ghostUserIds.length > 0
    ? await adminClient
        .from("ideas")
        .select("id, created_by")
        .in("created_by", ghostUserIds)
    : { data: [] };

  const ideaCounts = new Map<string, number>();
  for (const idea of ideas ?? []) {
    ideaCounts.set(idea.created_by, (ideaCounts.get(idea.created_by) ?? 0) + 1);
  }

  // get pledge counts per ghost
  const { data: pledges } = ghostUserIds.length > 0
    ? await adminClient
        .from("pledges")
        .select("id, user_id")
        .in("user_id", ghostUserIds)
    : { data: [] };

  const pledgeCounts = new Map<string, number>();
  for (const pledge of pledges ?? []) {
    pledgeCounts.set(pledge.user_id, (pledgeCounts.get(pledge.user_id) ?? 0) + 1);
  }

  // assemble ghost list
  const ghosts: GhostUser[] = ghostUserIds
    .map((id) => ({
      id,
      email: userMap.get(id) ?? id,
      display_name: profileMap.get(id)?.display_name ?? null,
      bio: profileMap.get(id)?.bio ?? null,
      idea_count: ideaCounts.get(id) ?? 0,
      pledge_count: pledgeCounts.get(id) ?? 0,
    }))
    .sort((a, b) => a.email.localeCompare(b.email));

  // current acting-as state
  const cookieStore = await cookies();
  const actingAsId = cookieStore.get("acting_as")?.value ?? null;

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-red-500 font-bold text-lg tracking-tight">
          destroysass
        </a>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <a href="/admin" className="hover:text-white transition-colors">
            admin
          </a>
          <span className="text-red-500 font-medium">ghosts</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">ghost roster</h1>
        <p className="text-gray-500 text-sm mb-8">
          {ghosts.length} ghost users. click &ldquo;act as&rdquo; to impersonate — submit ideas,
          pledge, comment as that persona.
        </p>

        {actingAsId && (
          <div className="border border-red-800 rounded-lg p-4 mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-red-400">
                currently acting as{" "}
                <strong className="text-white">
                  {userMap.get(actingAsId) ?? actingAsId}
                </strong>
              </p>
            </div>
            <form
              action={async () => {
                "use server";
                await stopActing();
              }}
            >
              <button
                type="submit"
                className="bg-red-900 hover:bg-red-800 text-white text-sm px-3 py-1.5 rounded transition-colors"
              >
                stop
              </button>
            </form>
          </div>
        )}

        {ghosts.length === 0 ? (
          <p className="text-gray-600 text-sm italic">
            no ghost users yet. run the seed script to create them.
          </p>
        ) : (
          <div className="space-y-3">
            {ghosts.map((ghost) => {
              const isActive = actingAsId === ghost.id;
              return (
                <div
                  key={ghost.id}
                  className={`border rounded-lg p-4 flex items-center gap-4 ${
                    isActive
                      ? "border-red-700 bg-red-950/30"
                      : "border-gray-800"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">
                      {ghost.display_name ?? ghost.email.split("@")[0]}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{ghost.email}</p>
                    {ghost.bio && (
                      <p className="text-sm text-gray-400 mt-1 truncate">
                        {ghost.bio}
                      </p>
                    )}
                    <div className="flex gap-3 mt-2 text-xs text-gray-500">
                      <span>{ghost.idea_count} ideas</span>
                      <span>{ghost.pledge_count} pledges</span>
                    </div>
                  </div>
                  {isActive ? (
                    <form
                      action={async () => {
                        "use server";
                        await stopActing();
                      }}
                    >
                      <button
                        type="submit"
                        className="bg-red-900 hover:bg-red-800 text-white text-sm px-3 py-1.5 rounded transition-colors shrink-0"
                      >
                        stop
                      </button>
                    </form>
                  ) : (
                    <form
                      action={async () => {
                        "use server";
                        await actAsGhost(ghost.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="border border-gray-700 hover:border-red-700 hover:text-red-400 text-gray-400 text-sm px-3 py-1.5 rounded transition-colors shrink-0"
                      >
                        act as
                      </button>
                    </form>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-sm text-gray-600">
          <a href="/admin" className="hover:text-white transition-colors">
            &larr; back to admin
          </a>
        </div>
      </main>
    </div>
  );
}
