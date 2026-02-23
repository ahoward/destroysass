import { cookies } from "next/headers";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { stopActingAs } from "@/lib/ghost";

export default async function GhostBanner() {
  const cookieStore = await cookies();
  const actingAs = cookieStore.get("acting_as")?.value;

  if (!actingAs) return null;

  // look up ghost email
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  let ghostEmail = "ghost";

  if (serviceRoleKey) {
    const adminClient = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      serviceRoleKey
    );
    const { data } = await adminClient.auth.admin.getUserById(actingAs);
    if (data?.user?.email) {
      ghostEmail = data.user.email;
    }
  }

  async function stop() {
    "use server";
    await stopActingAs();
    const { revalidatePath } = await import("next/cache");
    revalidatePath("/", "layout");
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-red-700 text-white text-center text-sm py-1.5 px-4 flex items-center justify-center gap-3">
      <span>
        acting as <strong>{ghostEmail}</strong>
      </span>
      <form action={stop}>
        <button
          type="submit"
          className="bg-red-900 hover:bg-red-800 text-white text-xs px-2 py-0.5 rounded transition-colors"
        >
          stop
        </button>
      </form>
    </div>
  );
}
