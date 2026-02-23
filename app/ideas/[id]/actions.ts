"use server";

import { revalidatePath } from "next/cache";
import { getActionContext } from "@/lib/ghost";
import { notify_new_pledge, notify_status_change } from "@/lib/email";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type ActionResult = {
  error?: string;
} | null;

type IdeaUpdate = {
  title: string;
  description: string;
  problem: string;
  monthly_ask: number;
};

export async function updateIdea(ideaId: string, data: IdeaUpdate): Promise<ActionResult> {
  if (!UUID_RE.test(ideaId)) {
    return { error: "invalid idea." };
  }

  const ctx = await getActionContext();
  if (!ctx) {
    return { error: "you must be signed in." };
  }

  const { effectiveUserId, client } = ctx;

  // verify ownership
  const { data: idea } = await client
    .from("ideas")
    .select("id, created_by, status")
    .eq("id", ideaId)
    .single();

  if (!idea || idea.created_by !== effectiveUserId) {
    return { error: "you can only edit your own ideas." };
  }

  // only allow edits on early-stage ideas
  const editable = ["proposed", "gaining_traction"];
  if (!editable.includes(idea.status)) {
    return { error: "this idea can no longer be edited." };
  }

  // validate
  if (!data.title.trim() || data.title.length > 200) {
    return { error: "title is required (max 200 chars)." };
  }
  if (!data.description.trim() || data.description.length > 2000) {
    return { error: "description is required (max 2000 chars)." };
  }
  if (!data.problem.trim() || data.problem.length > 2000) {
    return { error: "problem is required (max 2000 chars)." };
  }
  if (!Number.isInteger(data.monthly_ask) || data.monthly_ask < 25 || data.monthly_ask > 10000) {
    return { error: "monthly ask must be $25–$10,000." };
  }

  const { error: updateError } = await client
    .from("ideas")
    .update({
      title: data.title.trim(),
      description: data.description.trim(),
      problem: data.problem.trim(),
      monthly_ask: data.monthly_ask,
      updated_at: new Date().toISOString(),
    })
    .eq("id", ideaId);

  if (updateError) {
    return { error: "failed to update. please try again." };
  }

  revalidatePath("/ideas");
  revalidatePath(`/ideas/${ideaId}`);
  revalidatePath("/dashboard");

  return null;
}

export async function deleteIdea(ideaId: string): Promise<ActionResult> {
  if (!UUID_RE.test(ideaId)) {
    return { error: "invalid idea." };
  }

  const ctx = await getActionContext();
  if (!ctx) {
    return { error: "you must be signed in." };
  }

  const { effectiveUserId, client } = ctx;

  // verify ownership
  const { data: idea } = await client
    .from("idea_board")
    .select("id, created_by, status, pledge_count")
    .eq("id", ideaId)
    .single();

  if (!idea || idea.created_by !== effectiveUserId) {
    return { error: "you can only delete your own ideas." };
  }

  // only allow deletion if no pledges from others
  if (Number(idea.pledge_count) > 0) {
    return { error: "cannot delete an idea that has pledges. withdraw all pledges first." };
  }

  // don't allow deletion of advanced-stage ideas
  const deletable = ["proposed", "gaining_traction"];
  if (!deletable.includes(idea.status)) {
    return { error: "this idea can no longer be deleted." };
  }

  const { error: deleteError } = await client
    .from("ideas")
    .delete()
    .eq("id", ideaId)
    .eq("created_by", effectiveUserId);

  if (deleteError) {
    return { error: "failed to delete. please try again." };
  }

  revalidatePath("/ideas");
  revalidatePath("/dashboard");

  return null;
}

export async function pledgeIdea(idea_id: string, amount: number): Promise<ActionResult> {
  if (!UUID_RE.test(idea_id)) {
    return { error: "invalid idea." };
  }

  const ctx = await getActionContext();
  if (!ctx) {
    return { error: "you must be signed in to pledge." };
  }

  const { effectiveUserId, client } = ctx;

  // validate amount: integer, 25-500, step of 25
  if (!Number.isInteger(amount) || amount < 25 || amount > 500 || amount % 25 !== 0) {
    return { error: "pledge amount must be a whole number between $25 and $500 in $25 increments." };
  }

  // check idea exists and is in a pledgeable status
  const { data: idea, error: idea_error } = await client
    .from("ideas")
    .select("id, status, created_by")
    .eq("id", idea_id)
    .single();

  if (idea_error || !idea) {
    return { error: "idea not found." };
  }

  const status_before = idea.status;

  const pledgeable = ["proposed", "gaining_traction"];
  if (!pledgeable.includes(idea.status)) {
    return { error: "this idea is no longer accepting pledges." };
  }

  // creator cannot pledge to own idea
  if (idea.created_by === effectiveUserId) {
    return { error: "you cannot pledge to your own idea." };
  }

  try {
    const { error } = await client
      .from("pledges")
      .upsert(
        { idea_id, user_id: effectiveUserId, amount_monthly: amount },
        { onConflict: "idea_id,user_id" }
      );

    if (error) {
      return { error: "failed to save pledge. please try again." };
    }
  } catch {
    return { error: "something went wrong. please try again." };
  }

  // fire-and-forget email notifications
  void notify_new_pledge(idea_id, effectiveUserId, amount);

  // check if status changed (DB trigger may update on pledge)
  const { data: idea_after } = await client
    .from("ideas")
    .select("status")
    .eq("id", idea_id)
    .single();

  if (idea_after && idea_after.status !== status_before) {
    void notify_status_change(idea_id, idea_after.status);
  }

  revalidatePath("/ideas");
  revalidatePath(`/ideas/${idea_id}`);
  return null;
}

export async function unpledgeIdea(idea_id: string): Promise<ActionResult> {
  if (!UUID_RE.test(idea_id)) {
    return { error: "invalid idea." };
  }

  const ctx = await getActionContext();
  if (!ctx) {
    return { error: "you must be signed in." };
  }

  const { effectiveUserId, client } = ctx;

  // check idea status — cannot withdraw from locked ideas
  const { data: idea } = await client
    .from("ideas")
    .select("status")
    .eq("id", idea_id)
    .single();

  if (idea) {
    const locked = ["threshold_reached", "cell_forming", "active"];
    if (locked.includes(idea.status)) {
      return { error: "this idea has progressed too far to withdraw your pledge." };
    }
  }

  const status_before = idea?.status;

  try {
    const { error } = await client
      .from("pledges")
      .delete()
      .eq("idea_id", idea_id)
      .eq("user_id", effectiveUserId);

    if (error) {
      return { error: "failed to withdraw pledge. please try again." };
    }
  } catch {
    return { error: "something went wrong. please try again." };
  }

  // check if status changed (DB trigger may downgrade on unpledge)
  if (status_before) {
    const { data: idea_after } = await client
      .from("ideas")
      .select("status")
      .eq("id", idea_id)
      .single();

    if (idea_after && idea_after.status !== status_before) {
      void notify_status_change(idea_id, idea_after.status);
    }
  }

  revalidatePath("/ideas");
  revalidatePath(`/ideas/${idea_id}`);
  revalidatePath("/dashboard");
  return null;
}

export async function toggleUpvote(idea_id: string): Promise<ActionResult> {
  if (!UUID_RE.test(idea_id)) {
    return { error: "invalid idea." };
  }

  const ctx = await getActionContext();
  if (!ctx) {
    return { error: "you must be signed in to upvote." };
  }

  const { effectiveUserId, client } = ctx;

  // check if already upvoted
  const { data: existing } = await client
    .from("upvotes")
    .select("id")
    .eq("idea_id", idea_id)
    .eq("user_id", effectiveUserId)
    .single();

  if (existing) {
    const { error } = await client
      .from("upvotes")
      .delete()
      .eq("idea_id", idea_id)
      .eq("user_id", effectiveUserId);

    if (error) {
      return { error: "failed to remove upvote." };
    }
  } else {
    const { error } = await client
      .from("upvotes")
      .insert({ idea_id, user_id: effectiveUserId });

    if (error) {
      return { error: "failed to upvote." };
    }
  }

  revalidatePath("/ideas");
  revalidatePath(`/ideas/${idea_id}`);
  return null;
}

export async function postComment(idea_id: string, body: string): Promise<ActionResult> {
  if (!UUID_RE.test(idea_id)) {
    return { error: "invalid idea." };
  }

  const ctx = await getActionContext();
  if (!ctx) {
    return { error: "you must be signed in to comment." };
  }

  const { effectiveUserId, client, isActingAs } = ctx;

  const trimmed = body.trim();
  if (!trimmed || trimmed.length > 2000) {
    return { error: "comment must be 1–2,000 characters." };
  }

  // verify idea exists
  const { data: idea } = await client
    .from("ideas")
    .select("id")
    .eq("id", idea_id)
    .single();

  if (!idea) {
    return { error: "idea not found." };
  }

  // when acting-as a ghost, use their profile display_name or email prefix
  let display_name = (ctx.user.email ?? "").split("@")[0] || "anonymous";
  if (isActingAs) {
    const { data: profile } = await client
      .from("profiles")
      .select("display_name")
      .eq("id", effectiveUserId)
      .single();
    if (profile?.display_name) {
      display_name = profile.display_name;
    } else {
      // fall back to ghost email prefix
      const { getServiceClient } = await import("@/lib/ghost");
      const adminClient = getServiceClient();
      const { data: userData } = await adminClient.auth.admin.getUserById(effectiveUserId);
      if (userData?.user?.email) {
        display_name = userData.user.email.split("@")[0] || "ghost";
      }
    }
  }

  const { error: insert_error } = await client.from("comments").insert({
    idea_id,
    user_id: effectiveUserId,
    display_name,
    body: trimmed,
  });

  if (insert_error) {
    return { error: "failed to post comment. please try again." };
  }

  revalidatePath(`/ideas/${idea_id}`);
  return null;
}

export async function deleteComment(comment_id: string, idea_id: string): Promise<ActionResult> {
  if (!UUID_RE.test(comment_id) || !UUID_RE.test(idea_id)) {
    return { error: "invalid id." };
  }

  const ctx = await getActionContext();
  if (!ctx) {
    return { error: "you must be signed in." };
  }

  const { effectiveUserId, client } = ctx;

  const { error } = await client
    .from("comments")
    .delete()
    .eq("id", comment_id)
    .eq("user_id", effectiveUserId);

  if (error) {
    return { error: "failed to delete comment." };
  }

  revalidatePath(`/ideas/${idea_id}`);
  return null;
}
