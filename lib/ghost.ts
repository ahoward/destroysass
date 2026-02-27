"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { is_sudo, is_member } from "@/lib/groups";
import type { SupabaseClient, User } from "@supabase/supabase-js";

const ACTING_AS_COOKIE = "acting_as";

/**
 * check if a user is in the ghost group.
 */
export async function is_ghost(
  supabase: SupabaseClient,
  user_id: string
): Promise<boolean> {
  return is_member(supabase, user_id, "ghost");
}

/**
 * read the acting_as cookie. returns ghost user_id or null.
 */
export async function getActingAs(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(ACTING_AS_COOKIE)?.value ?? null;
}

/**
 * get the effective user for the current request.
 * if a sudo user is acting-as a ghost, returns the ghost's user_id.
 */
export async function getEffectiveUser(): Promise<{
  user: User | null;
  effectiveUserId: string | null;
  isActingAs: boolean;
}> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, effectiveUserId: null, isActingAs: false };
  }

  const actingAsId = await getActingAs();

  if (actingAsId && (await is_sudo(supabase, user))) {
    return { user, effectiveUserId: actingAsId, isActingAs: true };
  }

  return { user, effectiveUserId: user.id, isActingAs: false };
}

/**
 * create a service role supabase client. throws if key not configured.
 */
export async function getServiceClient(): Promise<SupabaseClient> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY not configured");
  return createServiceClient(url, key);
}

/**
 * get the action context for server actions.
 * returns the effective user_id and appropriate supabase client.
 * when acting-as, client is service role (bypasses RLS).
 */
export async function getActionContext(): Promise<{
  user: User;
  effectiveUserId: string;
  client: SupabaseClient;
  isActingAs: boolean;
} | null> {
  const { user, effectiveUserId, isActingAs } = await getEffectiveUser();
  if (!user || !effectiveUserId) return null;

  const client = isActingAs ? await getServiceClient() : await createClient();
  return { user, effectiveUserId, client, isActingAs };
}

/**
 * start acting as a ghost user. sets httpOnly cookie.
 * requires caller to be sudo and target to be in ghost group.
 */
export async function startActingAs(
  ghostUserId: string
): Promise<{ error?: string; success?: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !(await is_sudo(supabase, user))) {
    return { error: "unauthorized" };
  }

  if (!(await is_ghost(supabase, ghostUserId))) {
    return { error: "target user is not a ghost" };
  }

  const cookieStore = await cookies();
  cookieStore.set(ACTING_AS_COOKIE, ghostUserId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 4, // 4 hours
  });

  return { success: true };
}

/**
 * stop acting as a ghost user. clears the cookie.
 */
export async function stopActingAs(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  cookieStore.delete(ACTING_AS_COOKIE);
  return { success: true };
}
