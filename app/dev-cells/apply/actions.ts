"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

type ActionState = {
  errors?: Record<string, string>;
  success?: boolean;
} | null;

export async function submitApplication(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { errors: { _form: "you must be signed in to apply." } };
  }

  // check for existing pending application
  // use service role to read pending rows (RLS only exposes approved)
  const { createClient: createServiceClient } = await import("@supabase/supabase-js");
  const service_url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const service_key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  if (service_key) {
    const admin = createServiceClient(service_url, service_key);
    const { data: existing } = await admin
      .from("dev_cells")
      .select("id, status")
      .eq("applied_by", user.id)
      .eq("status", "pending")
      .limit(1);

    if (existing && existing.length > 0) {
      return { errors: { _form: "you already have a pending application." } };
    }
  }

  const name = (formData.get("name") as string || "").trim();
  const description = (formData.get("description") as string || "").trim();
  const website = (formData.get("website") as string || "").trim();
  const skills_raw = (formData.get("skills") as string || "").trim();
  const contact_email = (formData.get("contact_email") as string || "").trim();

  const errors: Record<string, string> = {};

  if (!name || name.length < 3 || name.length > 120) {
    errors.name = "name is required (3–120 characters).";
  }
  if (!description || description.length < 20 || description.length > 1000) {
    errors.description = "description is required (20–1,000 characters).";
  }
  if (website && !/^https?:\/\/.+/.test(website)) {
    errors.website = "website must start with http:// or https://";
  }
  if (!skills_raw) {
    errors.skills = "list at least one skill (comma-separated).";
  }
  if (!contact_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email)) {
    errors.contact_email = "a valid contact email is required.";
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const skills = skills_raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const { error: insert_error } = await supabase.from("dev_cells").insert({
    name,
    description,
    website: website || null,
    skills,
    contact_email,
    applied_by: user.id,
  });

  if (insert_error) {
    return { errors: { _form: "failed to submit application. please try again." } };
  }

  revalidatePath("/dev-cells");
  revalidatePath("/admin");

  return { success: true };
}
