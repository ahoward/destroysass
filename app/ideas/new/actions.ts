"use server";

import { redirect } from "next/navigation";
import { getActionContext } from "@/lib/ghost";
import { createClient } from "@/lib/supabase/server";
import { is_inner } from "@/lib/groups";

const CATEGORIES = [
  "communication",
  "project-management",
  "analytics",
  "devtools",
  "finance",
  "marketing",
  "hr",
  "operations",
  "other",
] as const;

export type Category = (typeof CATEGORIES)[number];
export { CATEGORIES };

type FieldErrors = {
  title?: string;
  problem?: string;
  description?: string;
  monthly_ask?: string;
  category?: string;
  general?: string;
};

export type SubmitIdeaResult = {
  errors?: FieldErrors;
  previousData?: {
    title: string;
    problem: string;
    description: string;
    monthly_ask: string;
    category: string;
  };
} | null;

export async function submitIdea(
  _prev: SubmitIdeaResult,
  formData: FormData
): Promise<SubmitIdeaResult> {
  const ctx = await getActionContext();

  if (!ctx) {
    return { errors: { general: "you must be signed in to submit an idea." } };
  }

  if (!ctx.isActingAs) {
    const supabase = await createClient();
    if (!(await is_inner(supabase, ctx.user))) {
      return { errors: { general: "access restricted to inner circle members." } };
    }
  }

  const { effectiveUserId, client } = ctx;

  const raw_title = (formData.get("title") as string) ?? "";
  const raw_problem = (formData.get("problem") as string) ?? "";
  const raw_description = (formData.get("description") as string) ?? "";
  const raw_monthly_ask = (formData.get("monthly_ask") as string) ?? "";
  const raw_category = (formData.get("category") as string) ?? "other";

  const title = raw_title.trim();
  const problem = raw_problem.trim();
  const description = raw_description.trim();
  const category = raw_category.trim();

  const previousData = {
    title: raw_title,
    problem: raw_problem,
    description: raw_description,
    monthly_ask: raw_monthly_ask,
    category: raw_category,
  };

  const errors: FieldErrors = {};

  // title: 10-120 chars
  if (!title) {
    errors.title = "title is required.";
  } else if (title.length < 10) {
    errors.title = "title must be at least 10 characters.";
  } else if (title.length > 120) {
    errors.title = "title must be 120 characters or fewer.";
  }

  // problem: 50-1000 chars
  if (!problem) {
    errors.problem = "problem is required.";
  } else if (problem.length < 50) {
    errors.problem = "problem must be at least 50 characters.";
  } else if (problem.length > 1000) {
    errors.problem = "problem must be 1000 characters or fewer.";
  }

  // description: 100-2000 chars
  if (!description) {
    errors.description = "description is required.";
  } else if (description.length < 100) {
    errors.description = "description must be at least 100 characters.";
  } else if (description.length > 2000) {
    errors.description = "description must be 2000 characters or fewer.";
  }

  // monthly_ask: integer 25-500
  const monthly_ask_float = Number(raw_monthly_ask);
  const monthly_ask = Math.floor(monthly_ask_float);
  if (!raw_monthly_ask.trim()) {
    errors.monthly_ask = "monthly ask is required.";
  } else if (isNaN(monthly_ask_float) || monthly_ask_float !== monthly_ask) {
    errors.monthly_ask = "monthly ask must be a whole dollar amount.";
  } else if (monthly_ask < 25) {
    errors.monthly_ask = "monthly ask must be at least $25.";
  } else if (monthly_ask > 500) {
    errors.monthly_ask = "monthly ask must be $500 or less.";
  }

  // category: must be valid
  if (!CATEGORIES.includes(category as Category)) {
    errors.category = "please select a valid category.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, previousData };
  }

  try {
    const { error } = await client.from("ideas").insert({
      title,
      problem,
      description,
      monthly_ask,
      category,
      created_by: effectiveUserId,
    });

    if (error) {
      console.error("idea insert error:", error);
      return {
        errors: { general: `failed to submit idea: ${error.message}` },
        previousData,
      };
    }
  } catch (err) {
    console.error("idea submit exception:", err);
    return {
      errors: { general: `something went wrong: ${err instanceof Error ? err.message : String(err)}` },
      previousData,
    };
  }

  redirect("/ideas");
}
