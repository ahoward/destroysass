"use server";

import { revalidatePath } from "next/cache";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { is_admin } from "@/lib/groups";
import { send_email, email_template } from "@/lib/email";

type ActionResult = {
  error?: string;
  success?: boolean;
  token?: string;
  redirect_path?: string;
} | null;

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !key) return null;
  return createServiceClient(url, key);
}

export async function createInvitation(formData: FormData): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !(await is_admin(supabase, user))) {
    return { error: "unauthorized." };
  }

  const adminClient = getAdminClient();
  if (!adminClient) {
    return { error: "service role key not configured." };
  }

  const recipient_name =
    (formData.get("recipient_name") as string)?.trim() || null;
  const recipient_email =
    (formData.get("recipient_email") as string)?.trim() || null;
  const group_names_raw =
    (formData.get("group_names") as string)?.trim() || "";
  const redirect_path =
    (formData.get("redirect_path") as string)?.trim() || "/";
  const note = (formData.get("note") as string)?.trim() || null;
  const expires_days =
    parseInt(formData.get("expires_days") as string) || null;

  const group_names = group_names_raw
    .split(",")
    .map((g) => g.trim().toLowerCase())
    .filter(Boolean);

  if (group_names.length === 0) {
    return { error: "at least one group is required." };
  }

  // validate groups exist
  const { data: groups } = await adminClient
    .from("groups")
    .select("name")
    .in("name", group_names);

  const found = new Set((groups ?? []).map((g) => g.name));
  const missing = group_names.filter((n) => !found.has(n));
  if (missing.length > 0) {
    return { error: `groups not found: ${missing.join(", ")}` };
  }

  // validate redirect path
  if (!redirect_path.startsWith("/") || redirect_path.startsWith("//")) {
    return { error: "redirect path must start with /" };
  }

  const expires_at = expires_days
    ? new Date(Date.now() + expires_days * 86400000).toISOString()
    : null;

  const { data: invitation, error: insertError } = await adminClient
    .from("invitations")
    .insert({
      created_by: user.id,
      recipient_name,
      recipient_email,
      group_names,
      redirect_path,
      note,
      expires_at,
    })
    .select("token")
    .single();

  if (insertError) {
    return { error: `failed to create invitation: ${insertError.message}` };
  }

  // fire-and-forget email if recipient provided
  if (recipient_email) {
    void sendInvitationEmail(
      recipient_email,
      recipient_name,
      invitation.token,
      note
    );
  }

  revalidatePath("/admin/invitations");
  return { success: true, token: invitation.token };
}

export async function acceptInvitation(
  token: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "not authenticated." };
  }

  const adminClient = getAdminClient();
  if (!adminClient) {
    return { error: "service role key not configured." };
  }

  const { data: invitation } = await adminClient
    .from("invitations")
    .select("*")
    .eq("token", token)
    .single();

  if (!invitation) {
    return { error: "invitation not found." };
  }

  if (
    invitation.expires_at &&
    !invitation.accepted_at &&
    new Date(invitation.expires_at) < new Date()
  ) {
    return { error: "invitation has expired." };
  }

  // soft email mismatch check
  if (
    invitation.recipient_email &&
    user.email?.toLowerCase() !== invitation.recipient_email.toLowerCase()
  ) {
    console.warn(
      `[invitations] email mismatch: invitation for ${invitation.recipient_email}, accepted by ${user.email}`
    );
  }

  // add user to all groups (idempotent via upsert)
  for (const group_name of invitation.group_names) {
    const { data: group } = await adminClient
      .from("groups")
      .select("id")
      .eq("name", group_name)
      .single();

    if (group) {
      await adminClient
        .from("group_members")
        .upsert(
          { group_id: group.id, user_id: user.id },
          { onConflict: "group_id,user_id" }
        );
    }
  }

  // mark accepted (only on first accept)
  if (!invitation.accepted_at) {
    await adminClient
      .from("invitations")
      .update({
        accepted_at: new Date().toISOString(),
        accepted_by: user.id,
      })
      .eq("id", invitation.id);
  }

  revalidatePath("/admin/invitations");
  return { success: true, redirect_path: invitation.redirect_path };
}

export async function deleteInvitation(
  invitationId: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !(await is_admin(supabase, user))) {
    return { error: "unauthorized." };
  }

  const adminClient = getAdminClient();
  if (!adminClient) {
    return { error: "service role key not configured." };
  }

  await adminClient.from("invitations").delete().eq("id", invitationId);

  revalidatePath("/admin/invitations");
  return { success: true };
}

async function sendInvitationEmail(
  to: string,
  name: string | null,
  token: string,
  note: string | null
): Promise<void> {
  const inviteUrl = `https://destroysaas.coop/invite/${token}`;
  const greeting = name ? `hi ${name},` : "hi,";

  const html = email_template(
    "you're invited to destroysaas",
    `<p>${greeting}</p>
     ${note ? `<p style="margin-top:12px;">${note}</p>` : ""}
     <p style="margin-top:12px;">
       you've been invited to join an inner circle at destroysaas &mdash;
       the platform where small businesses stop renting software and start owning it.
     </p>
     <p style="margin-top:16px;">
       <a href="${inviteUrl}" style="display:inline-block;background:#dc2626;color:#fff;padding:10px 24px;border-radius:4px;text-decoration:none;font-weight:600;">
         view invitation &rarr;
       </a>
     </p>
     <p style="margin-top:16px;font-size:12px;color:#737373;">
       or copy this link: ${inviteUrl}
     </p>`
  );

  await send_email(to, "you're invited to destroysaas", html);
}
