#!/usr/bin/env bun

/**
 * seed_ghosts.ts — create 11 ghost users, profiles, ideas, pledges, and comments.
 *
 * usage: bun scripts/seed_ghosts.ts
 *
 * requires env vars: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 * (load via: source .envrc && bun scripts/seed_ghosts.ts)
 */

import { createClient } from "@supabase/supabase-js";
import { GHOSTS, IDEAS, PLEDGES, COMMENTS } from "./seed_ghost_data";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// map slug → user_id (populated during user creation)
const slugToUserId = new Map<string, string>();
// map idea_index → idea_id (populated during idea creation)
const ideaIndexToId = new Map<number, string>();

async function main() {
  console.log("--- seed_ghosts: starting ---\n");

  // 1. get ghost group id
  const { data: ghostGroup, error: groupError } = await supabase
    .from("groups")
    .select("id")
    .eq("name", "ghost")
    .single();

  if (groupError || !ghostGroup) {
    console.error("ghost group not found. run migration 012 first.");
    process.exit(1);
  }

  console.log(`ghost group: ${ghostGroup.id}`);

  // 2. check for existing ghost users
  const { data: existingMembers } = await supabase
    .from("group_members")
    .select("user_id")
    .eq("group_id", ghostGroup.id);

  if (existingMembers && existingMembers.length > 0) {
    console.log(
      `\nfound ${existingMembers.length} existing ghost users. loading them...`
    );

    // load existing users to populate slugToUserId
    const { data: allUsersData } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });
    const allUsers = (
      allUsersData as unknown as { users: { id: string; email: string }[] }
    )?.users ?? [];

    const existingIds = new Set(existingMembers.map((m) => m.user_id));
    for (const u of allUsers) {
      if (existingIds.has(u.id)) {
        const slug = GHOSTS.find((g) => g.email === u.email)?.slug;
        if (slug) {
          slugToUserId.set(slug, u.id);
          console.log(`  loaded: ${slug} → ${u.id}`);
        }
      }
    }
  }

  // 3. create ghost users (skip existing)
  console.log("\n--- creating ghost users ---");
  for (const ghost of GHOSTS) {
    if (slugToUserId.has(ghost.slug)) {
      console.log(`  skip: ${ghost.slug} (already exists)`);
      continue;
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email: ghost.email,
      email_confirm: true,
      // no password — only accessible via sudo impersonation
    });

    if (error) {
      // might already exist from a partial run
      if (error.message?.includes("already been registered")) {
        console.log(`  skip: ${ghost.slug} (already registered)`);
        // find their id
        const { data: allUsersData } = await supabase.auth.admin.listUsers({
          page: 1,
          perPage: 1000,
        });
        const allUsers = (
          allUsersData as unknown as {
            users: { id: string; email: string }[];
          }
        )?.users ?? [];
        const found = allUsers.find((u) => u.email === ghost.email);
        if (found) {
          slugToUserId.set(ghost.slug, found.id);
        }
        continue;
      }
      console.error(`  error creating ${ghost.slug}: ${error.message}`);
      continue;
    }

    if (data?.user) {
      slugToUserId.set(ghost.slug, data.user.id);
      console.log(`  created: ${ghost.slug} → ${data.user.id}`);
    }
  }

  // 4. add to ghost group
  console.log("\n--- adding to ghost group ---");
  for (const [slug, userId] of slugToUserId) {
    const { error } = await supabase.from("group_members").upsert(
      { group_id: ghostGroup.id, user_id: userId },
      { onConflict: "group_id,user_id" }
    );
    if (error) {
      console.error(`  error adding ${slug} to ghost group: ${error.message}`);
    } else {
      console.log(`  ${slug} → ghost group`);
    }
  }

  // 5. create profiles
  console.log("\n--- creating profiles ---");
  for (const ghost of GHOSTS) {
    const userId = slugToUserId.get(ghost.slug);
    if (!userId) continue;

    const { error } = await supabase.from("profiles").upsert(
      {
        id: userId,
        display_name: ghost.display_name,
        bio: ghost.bio,
      },
      { onConflict: "id" }
    );
    if (error) {
      console.error(
        `  error creating profile for ${ghost.slug}: ${error.message}`
      );
    } else {
      console.log(`  ${ghost.slug}: ${ghost.display_name}`);
    }
  }

  // 6. create ideas
  console.log("\n--- creating ideas ---");
  for (let i = 0; i < IDEAS.length; i++) {
    const idea = IDEAS[i];
    const creatorId = slugToUserId.get(idea.creator_slug);
    if (!creatorId) {
      console.error(`  skip idea ${i}: creator ${idea.creator_slug} not found`);
      continue;
    }

    // check if idea already exists (by title match)
    const { data: existing } = await supabase
      .from("ideas")
      .select("id")
      .eq("title", idea.title)
      .limit(1);

    if (existing && existing.length > 0) {
      ideaIndexToId.set(i, existing[0].id);
      console.log(`  skip idea ${i}: "${idea.title.slice(0, 50)}..." (exists)`);
      continue;
    }

    const { data, error } = await supabase
      .from("ideas")
      .insert({
        title: idea.title,
        problem: idea.problem,
        description: idea.description,
        monthly_ask: idea.monthly_ask,
        category: idea.category,
        created_by: creatorId,
      })
      .select("id")
      .single();

    if (error) {
      console.error(`  error creating idea ${i}: ${error.message}`);
      continue;
    }

    ideaIndexToId.set(i, data.id);
    console.log(`  idea ${i}: "${idea.title.slice(0, 50)}..." → ${data.id}`);
  }

  // 7. create pledges
  console.log("\n--- creating pledges ---");
  let pledgeCount = 0;
  for (const pledge of PLEDGES) {
    const pledgerId = slugToUserId.get(pledge.pledger_slug);
    const ideaId = ideaIndexToId.get(pledge.idea_index);

    if (!pledgerId || !ideaId) {
      console.error(
        `  skip pledge: ${pledge.pledger_slug} → idea ${pledge.idea_index} (missing id)`
      );
      continue;
    }

    const { error } = await supabase.from("pledges").upsert(
      {
        idea_id: ideaId,
        user_id: pledgerId,
        amount_monthly: pledge.amount,
      },
      { onConflict: "idea_id,user_id" }
    );

    if (error) {
      console.error(
        `  error: ${pledge.pledger_slug} → idea ${pledge.idea_index}: ${error.message}`
      );
    } else {
      pledgeCount++;
    }
  }
  console.log(`  created ${pledgeCount} pledges`);

  // 8. create comments
  console.log("\n--- creating comments ---");
  let commentCount = 0;
  for (const comment of COMMENTS) {
    const commenterId = slugToUserId.get(comment.commenter_slug);
    const ideaId = ideaIndexToId.get(comment.idea_index);

    if (!commenterId || !ideaId) {
      console.error(
        `  skip comment: ${comment.commenter_slug} → idea ${comment.idea_index} (missing id)`
      );
      continue;
    }

    const commenterGhost = GHOSTS.find(
      (g) => g.slug === comment.commenter_slug
    );
    const displayName = commenterGhost?.display_name ?? comment.commenter_slug;

    // check for duplicate (same user, same idea, same body)
    const { data: existing } = await supabase
      .from("comments")
      .select("id")
      .eq("idea_id", ideaId)
      .eq("user_id", commenterId)
      .eq("body", comment.body)
      .limit(1);

    if (existing && existing.length > 0) {
      console.log(
        `  skip: ${comment.commenter_slug} → idea ${comment.idea_index} (exists)`
      );
      continue;
    }

    const { error } = await supabase.from("comments").insert({
      idea_id: ideaId,
      user_id: commenterId,
      display_name: displayName,
      body: comment.body,
    });

    if (error) {
      console.error(
        `  error: ${comment.commenter_slug} → idea ${comment.idea_index}: ${error.message}`
      );
    } else {
      commentCount++;
    }
  }
  console.log(`  created ${commentCount} comments`);

  // 9. summary
  console.log("\n--- summary ---");
  console.log(`  ghost users: ${slugToUserId.size}`);
  console.log(`  ideas: ${ideaIndexToId.size}`);
  console.log(`  pledges: ${pledgeCount}`);
  console.log(`  comments: ${commentCount}`);

  // verify board totals
  const { data: boardData } = await supabase
    .from("idea_board")
    .select("title, total_pledged, pledge_count, status")
    .order("total_pledged", { ascending: false });

  if (boardData) {
    console.log("\n--- board state ---");
    for (const idea of boardData) {
      console.log(
        `  $${idea.total_pledged} (${idea.pledge_count} pledges) [${idea.status}] ${idea.title.slice(0, 60)}`
      );
    }
  }

  console.log("\n--- done ---");
}

main().catch((err) => {
  console.error("fatal error:", err);
  process.exit(1);
});
