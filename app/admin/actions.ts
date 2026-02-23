"use server";

import { revalidatePath } from "next/cache";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { notify_cell_formation } from "@/lib/email";
import { is_admin } from "@/lib/groups";

// NOTE: SUPABASE_SERVICE_ROLE_KEY must be added to .envrc and Vercel env vars manually.
// Without it, triggerCellFormation will fail (RLS blocks service-role-key-less mutations).

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type ActionResult = {
  error?: string;
  success?: boolean;
} | null;

export async function triggerCellFormation(ideaId: string): Promise<ActionResult> {
  if (!UUID_RE.test(ideaId)) {
    return { error: "invalid idea id." };
  }

  // auth check
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !(await is_admin(supabase, user))) {
    return { error: "unauthorized." };
  }

  // verify idea is in threshold_reached
  const { data: idea, error: ideaError } = await supabase
    .from("ideas")
    .select("id, title, status")
    .eq("id", ideaId)
    .single();

  if (ideaError || !idea) {
    return { error: "idea not found." };
  }

  if (idea.status !== "threshold_reached") {
    return { error: `idea is not threshold_reached (current: ${idea.status}).` };
  }

  // use service role client to bypass RLS
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!serviceRoleKey) {
    return { error: "SUPABASE_SERVICE_ROLE_KEY not configured — cannot form cell." };
  }

  const adminClient = createServiceClient(supabaseUrl, serviceRoleKey);

  const { error: updateError } = await adminClient
    .from("ideas")
    .update({ status: "cell_forming" })
    .eq("id", ideaId);

  if (updateError) {
    return { error: `failed to update status: ${updateError.message}` };
  }

  // fire-and-forget email to all stakeholders
  void notify_cell_formation(ideaId);

  revalidatePath("/ideas");
  revalidatePath(`/ideas/${ideaId}`);
  revalidatePath("/admin");

  return { success: true };
}

export async function approveDevCell(id: string): Promise<ActionResult> {
  if (!UUID_RE.test(id)) {
    return { error: "invalid id." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !(await is_admin(supabase, user))) {
    return { error: "unauthorized." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!serviceRoleKey) {
    return { error: "SUPABASE_SERVICE_ROLE_KEY not configured." };
  }

  const adminClient = createServiceClient(supabaseUrl, serviceRoleKey);

  const { error: updateError } = await adminClient
    .from("dev_cells")
    .update({ status: "approved", updated_at: new Date().toISOString() })
    .eq("id", id);

  if (updateError) {
    return { error: `failed to approve: ${updateError.message}` };
  }

  revalidatePath("/dev-cells");
  revalidatePath("/admin");
  return { success: true };
}

export async function rejectDevCell(id: string): Promise<ActionResult> {
  if (!UUID_RE.test(id)) {
    return { error: "invalid id." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !(await is_admin(supabase, user))) {
    return { error: "unauthorized." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!serviceRoleKey) {
    return { error: "SUPABASE_SERVICE_ROLE_KEY not configured." };
  }

  const adminClient = createServiceClient(supabaseUrl, serviceRoleKey);

  const { error: updateError } = await adminClient
    .from("dev_cells")
    .update({ status: "rejected", updated_at: new Date().toISOString() })
    .eq("id", id);

  if (updateError) {
    return { error: `failed to reject: ${updateError.message}` };
  }

  revalidatePath("/dev-cells");
  revalidatePath("/admin");
  return { success: true };
}

export async function addGroupMember(
  email: string,
  groupName: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !(await is_admin(supabase, user))) {
    return { error: "unauthorized." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!serviceRoleKey) {
    return { error: "SUPABASE_SERVICE_ROLE_KEY not configured." };
  }

  const adminClient = createServiceClient(supabaseUrl, serviceRoleKey);

  // find user by email
  const { data: usersData } = await adminClient.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  const targetUser = (
    usersData as unknown as { users: { id: string; email: string }[] }
  )?.users?.find(
    (u: { email: string }) => u.email?.toLowerCase() === email.toLowerCase()
  );

  if (!targetUser) {
    return { error: `no user found with email: ${email}` };
  }

  // find group
  const { data: group, error: groupError } = await adminClient
    .from("groups")
    .select("id")
    .eq("name", groupName)
    .single();

  if (groupError || !group) {
    return { error: `group not found: ${groupName}` };
  }

  const { error: insertError } = await adminClient
    .from("group_members")
    .upsert(
      { group_id: group.id, user_id: targetUser.id },
      { onConflict: "group_id,user_id" }
    );

  if (insertError) {
    return { error: `failed to add member: ${insertError.message}` };
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function removeGroupMember(
  userId: string,
  groupName: string
): Promise<ActionResult> {
  if (!UUID_RE.test(userId)) {
    return { error: "invalid user id." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !(await is_admin(supabase, user))) {
    return { error: "unauthorized." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!serviceRoleKey) {
    return { error: "SUPABASE_SERVICE_ROLE_KEY not configured." };
  }

  const adminClient = createServiceClient(supabaseUrl, serviceRoleKey);

  // find group
  const { data: group, error: groupError } = await adminClient
    .from("groups")
    .select("id")
    .eq("name", groupName)
    .single();

  if (groupError || !group) {
    return { error: `group not found: ${groupName}` };
  }

  const { error: deleteError } = await adminClient
    .from("group_members")
    .delete()
    .eq("group_id", group.id)
    .eq("user_id", userId);

  if (deleteError) {
    return { error: `failed to remove member: ${deleteError.message}` };
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function createGroup(
  name: string,
  description: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !(await is_admin(supabase, user))) {
    return { error: "unauthorized." };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (!serviceRoleKey) {
    return { error: "SUPABASE_SERVICE_ROLE_KEY not configured." };
  }

  const adminClient = createServiceClient(supabaseUrl, serviceRoleKey);

  const cleaned = name.toLowerCase().replace(/[^a-z0-9_-]/g, "");
  if (!cleaned || cleaned.length < 2) {
    return { error: "group name must be at least 2 characters (lowercase, alphanumeric, hyphens, underscores)." };
  }

  const { error: insertError } = await adminClient
    .from("groups")
    .insert({ name: cleaned, description: description.trim() || null });

  if (insertError) {
    if (insertError.message.includes("duplicate")) {
      return { error: `group "${cleaned}" already exists.` };
    }
    return { error: `failed to create group: ${insertError.message}` };
  }

  revalidatePath("/admin");
  return { success: true };
}
