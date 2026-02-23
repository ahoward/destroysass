"use server";

import { revalidatePath } from "next/cache";
import { startActingAs, stopActingAs } from "@/lib/ghost";

export async function actAsGhost(
  ghostUserId: string
): Promise<{ error?: string; success?: boolean }> {
  const result = await startActingAs(ghostUserId);

  if (result.success) {
    revalidatePath("/", "layout");
  }

  return result;
}

export async function stopActing(): Promise<{ success: boolean }> {
  const result = await stopActingAs();
  revalidatePath("/", "layout");
  return result;
}
