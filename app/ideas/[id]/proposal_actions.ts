"use server";

import { revalidatePath } from "next/cache";
import { getActionContext } from "@/lib/ghost";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type ActionResult = {
  error?: string;
} | null;

// ── Supporting Materials ──────────────────────────────────────────────

export async function saveMaterials(
  ideaId: string,
  body: string
): Promise<ActionResult> {
  if (!UUID_RE.test(ideaId)) return { error: "invalid idea." };

  const ctx = await getActionContext();
  if (!ctx) return { error: "you must be signed in." };

  const { effectiveUserId, client } = ctx;

  // verify the user is the idea creator and idea is in cell_forming+
  const { data: idea } = await client
    .from("ideas")
    .select("id, created_by, status")
    .eq("id", ideaId)
    .single();

  if (!idea || idea.created_by !== effectiveUserId) {
    return { error: "only the idea creator can add supporting materials." };
  }

  const allowedStatuses = ["cell_forming", "active"];
  if (!allowedStatuses.includes(idea.status)) {
    return { error: "materials can only be added after cell formation begins." };
  }

  const trimmed = body.trim();
  if (trimmed.length > 10000) {
    return { error: "materials must be under 10,000 characters." };
  }

  const { error } = await client.from("idea_materials").upsert(
    {
      idea_id: ideaId,
      body: trimmed,
      created_by: effectiveUserId,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "idea_id" }
  );

  if (error) {
    return { error: "failed to save materials. please try again." };
  }

  revalidatePath(`/ideas/${ideaId}`);
  return null;
}

// ── Proposals ─────────────────────────────────────────────────────────

export async function submitProposal(
  ideaId: string,
  cellId: string,
  title: string,
  body: string
): Promise<ActionResult> {
  if (!UUID_RE.test(ideaId) || !UUID_RE.test(cellId)) {
    return { error: "invalid id." };
  }

  const ctx = await getActionContext();
  if (!ctx) return { error: "you must be signed in." };

  const { effectiveUserId, client } = ctx;

  // verify idea is in cell_forming status
  const { data: idea } = await client
    .from("ideas")
    .select("status")
    .eq("id", ideaId)
    .single();

  if (!idea || idea.status !== "cell_forming") {
    return { error: "proposals can only be submitted for ideas in cell formation." };
  }

  // verify cell is approved and user is the cell applicant
  const { data: cell } = await client
    .from("cells")
    .select("id, status, applied_by")
    .eq("id", cellId)
    .single();

  if (!cell || cell.status !== "approved") {
    return { error: "only approved cells can submit proposals." };
  }

  if (cell.applied_by !== effectiveUserId) {
    return { error: "only the cell owner can submit proposals." };
  }

  // validate content
  const trimmedTitle = title.trim();
  const trimmedBody = body.trim();

  if (!trimmedTitle || trimmedTitle.length > 200) {
    return { error: "proposal title is required (max 200 characters)." };
  }

  if (!trimmedBody || trimmedBody.length > 10000) {
    return { error: "proposal body is required (max 10,000 characters)." };
  }

  const { error } = await client.from("proposals").upsert(
    {
      idea_id: ideaId,
      cell_id: cellId,
      title: trimmedTitle,
      body: trimmedBody,
      submitted_by: effectiveUserId,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "idea_id,cell_id" }
  );

  if (error) {
    return { error: "failed to submit proposal. please try again." };
  }

  revalidatePath(`/ideas/${ideaId}`);
  return null;
}

export async function deleteProposal(
  proposalId: string,
  ideaId: string
): Promise<ActionResult> {
  if (!UUID_RE.test(proposalId) || !UUID_RE.test(ideaId)) {
    return { error: "invalid id." };
  }

  const ctx = await getActionContext();
  if (!ctx) return { error: "you must be signed in." };

  const { effectiveUserId, client } = ctx;

  const { error } = await client
    .from("proposals")
    .delete()
    .eq("id", proposalId)
    .eq("submitted_by", effectiveUserId);

  if (error) {
    return { error: "failed to withdraw proposal." };
  }

  revalidatePath(`/ideas/${ideaId}`);
  return null;
}

// ── Preferences ───────────────────────────────────────────────────────

export async function setPreference(
  proposalId: string,
  ideaId: string
): Promise<ActionResult> {
  if (!UUID_RE.test(proposalId) || !UUID_RE.test(ideaId)) {
    return { error: "invalid id." };
  }

  const ctx = await getActionContext();
  if (!ctx) return { error: "you must be signed in." };

  const { effectiveUserId, client } = ctx;

  // verify user has a pledge on this idea (sponsors only)
  const { data: pledge } = await client
    .from("pledges")
    .select("id")
    .eq("idea_id", ideaId)
    .eq("user_id", effectiveUserId)
    .single();

  if (!pledge) {
    return { error: "only sponsors (pledged users) can set a preference." };
  }

  // check if user already has a preference for this idea
  const { data: existing } = await client
    .from("proposal_preferences")
    .select("id, proposal_id")
    .eq("idea_id", ideaId)
    .eq("user_id", effectiveUserId)
    .single();

  if (existing) {
    if (existing.proposal_id === proposalId) {
      // toggle off — remove preference
      const { error } = await client
        .from("proposal_preferences")
        .delete()
        .eq("id", existing.id);

      if (error) return { error: "failed to remove preference." };
    } else {
      // switch preference to different proposal
      const { error } = await client
        .from("proposal_preferences")
        .delete()
        .eq("id", existing.id);

      if (error) return { error: "failed to update preference." };

      const { error: insertError } = await client
        .from("proposal_preferences")
        .insert({
          proposal_id: proposalId,
          user_id: effectiveUserId,
          idea_id: ideaId,
        });

      if (insertError) return { error: "failed to update preference." };
    }
  } else {
    // new preference
    const { error } = await client
      .from("proposal_preferences")
      .insert({
        proposal_id: proposalId,
        user_id: effectiveUserId,
        idea_id: ideaId,
      });

    if (error) return { error: "failed to set preference." };
  }

  revalidatePath(`/ideas/${ideaId}`);
  return null;
}
