"use server";

import { revalidatePath } from "next/cache";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { notify_cell_formation } from "@/lib/email";

// NOTE: SUPABASE_SERVICE_ROLE_KEY must be added to .envrc and Vercel env vars manually.
// Without it, triggerCellFormation will fail (RLS blocks service-role-key-less mutations).

const ADMIN_EMAILS = ["ara.t.howard@gmail.com"];

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

  if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
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
