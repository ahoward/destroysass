import { SupabaseClient } from "@supabase/supabase-js";
import { User } from "@supabase/supabase-js";

const ROOT_EMAIL = "ara.t.howard@gmail.com";

/**
 * check if a user is a member of a specific group.
 */
export async function is_member(
  supabase: SupabaseClient,
  user_id: string,
  group_name: string
): Promise<boolean> {
  const { data } = await supabase
    .from("group_members")
    .select("id, groups!inner(name)")
    .eq("user_id", user_id)
    .eq("groups.name", group_name)
    .limit(1);

  return (data?.length ?? 0) > 0;
}

/**
 * check if user is in sudo group. root email always returns true as fallback.
 */
export async function is_sudo(
  supabase: SupabaseClient,
  user: User
): Promise<boolean> {
  if (user.email === ROOT_EMAIL) return true;
  return is_member(supabase, user.id, "sudo");
}

/**
 * check if user is admin (in admin or sudo group). root email always returns true.
 */
export async function is_admin(
  supabase: SupabaseClient,
  user: User
): Promise<boolean> {
  if (user.email === ROOT_EMAIL) return true;

  const { data } = await supabase
    .from("group_members")
    .select("id, groups!inner(name)")
    .eq("user_id", user.id)
    .in("groups.name", ["admin", "sudo"])
    .limit(1);

  return (data?.length ?? 0) > 0;
}

/**
 * get all group names for a user.
 */
export async function user_groups(
  supabase: SupabaseClient,
  user_id: string
): Promise<string[]> {
  const { data } = await supabase
    .from("group_members")
    .select("groups!inner(name)")
    .eq("user_id", user_id);

  if (!data) return [];
  return data.map((row: Record<string, unknown>) => {
    const groups = row.groups as { name: string };
    return groups.name;
  });
}

/**
 * ensure the root user is seeded into sudo and admin groups.
 * call this with a service-role client — RLS blocks regular inserts on group_members.
 */
export async function ensure_root_membership(
  adminClient: SupabaseClient,
  user: User
): Promise<void> {
  if (user.email !== ROOT_EMAIL) return;

  const { data: groups } = await adminClient
    .from("groups")
    .select("id, name")
    .in("name", ["sudo", "admin"]);

  if (!groups) return;

  for (const group of groups) {
    await adminClient
      .from("group_members")
      .upsert(
        { group_id: group.id, user_id: user.id },
        { onConflict: "group_id,user_id" }
      );
  }
}
