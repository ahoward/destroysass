"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

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

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "you must be signed in." };
  }

  // verify ownership
  const { data: idea } = await supabase
    .from("ideas")
    .select("id, created_by, status")
    .eq("id", ideaId)
    .single();

  if (!idea || idea.created_by !== user.id) {
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

  const { error: updateError } = await supabase
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

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "you must be signed in." };
  }

  // verify ownership
  const { data: idea } = await supabase
    .from("idea_board")
    .select("id, created_by, status, pledge_count")
    .eq("id", ideaId)
    .single();

  if (!idea || idea.created_by !== user.id) {
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

  const { error: deleteError } = await supabase
    .from("ideas")
    .delete()
    .eq("id", ideaId)
    .eq("created_by", user.id);

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

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "you must be signed in to pledge." };
  }

  // validate amount: integer, 25-500, step of 25
  if (!Number.isInteger(amount) || amount < 25 || amount > 500 || amount % 25 !== 0) {
    return { error: "pledge amount must be a whole number between $25 and $500 in $25 increments." };
  }

  // check idea exists and is in a pledgeable status
  const { data: idea, error: idea_error } = await supabase
    .from("ideas")
    .select("id, status, created_by")
    .eq("id", idea_id)
    .single();

  if (idea_error || !idea) {
    return { error: "idea not found." };
  }

  const pledgeable = ["proposed", "gaining_traction"];
  if (!pledgeable.includes(idea.status)) {
    return { error: "this idea is no longer accepting pledges." };
  }

  // creator cannot pledge to own idea
  if (idea.created_by === user.id) {
    return { error: "you cannot pledge to your own idea." };
  }

  try {
    const { error } = await supabase
      .from("pledges")
      .upsert(
        { idea_id, user_id: user.id, amount_monthly: amount },
        { onConflict: "idea_id,user_id" }
      );

    if (error) {
      return { error: "failed to save pledge. please try again." };
    }
  } catch {
    return { error: "something went wrong. please try again." };
  }

  revalidatePath("/ideas");
  revalidatePath(`/ideas/${idea_id}`);
  return null;
}

export async function unpledgeIdea(idea_id: string): Promise<ActionResult> {
  if (!UUID_RE.test(idea_id)) {
    return { error: "invalid idea." };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "you must be signed in." };
  }

  // check idea status — cannot withdraw from locked ideas
  const { data: idea } = await supabase
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

  try {
    const { error } = await supabase
      .from("pledges")
      .delete()
      .eq("idea_id", idea_id)
      .eq("user_id", user.id);

    if (error) {
      return { error: "failed to withdraw pledge. please try again." };
    }
  } catch {
    return { error: "something went wrong. please try again." };
  }

  revalidatePath("/ideas");
  revalidatePath(`/ideas/${idea_id}`);
  revalidatePath("/dashboard");
  return null;
}
