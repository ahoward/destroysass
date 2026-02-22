import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import ApplicationForm from "./form";

export default async function ApplyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/dev-cells/apply");
  }

  // check for existing pending application via service role
  let has_pending = false;
  const { createClient: createServiceClient } = await import("@supabase/supabase-js");
  const service_key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (service_key) {
    const admin = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      service_key
    );
    const { data: existing } = await admin
      .from("dev_cells")
      .select("id")
      .eq("applied_by", user.id)
      .eq("status", "pending")
      .limit(1);
    has_pending = !!(existing && existing.length > 0);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0] font-sans">
      {/* nav */}
      <nav className="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
        <a href="/" className="text-red-600 font-bold text-lg tracking-tight">
          destroysass
        </a>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <a href="/ideas" className="hover:text-white transition-colors">ideas</a>
          <a href="/dev-cells" className="hover:text-white transition-colors">dev cells</a>
          <a href="/about" className="hover:text-white transition-colors">about</a>
          <a href="/dashboard" className="hover:text-white transition-colors">dashboard</a>
          <form action={signOut}>
            <button type="submit" className="hover:text-white transition-colors">sign out</button>
          </form>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">apply to become a dev cell</h1>
        <p className="text-gray-500 text-sm mb-8">
          tell us about your cooperative. approved cells appear on the public listing
          and can be assigned to build funded ideas.
        </p>

        {has_pending ? (
          <div className="border border-yellow-800 rounded-lg p-6 text-center">
            <p className="text-yellow-500 font-medium mb-2">application pending</p>
            <p className="text-gray-500 text-sm">
              you already have an application under review. we&apos;ll be in touch.
            </p>
            <a
              href="/dev-cells"
              className="text-red-500 hover:text-red-400 text-sm mt-4 inline-block transition-colors"
            >
              &larr; back to dev cells
            </a>
          </div>
        ) : (
          <ApplicationForm />
        )}
      </main>
    </div>
  );
}
