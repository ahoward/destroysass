import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/app/components/nav";
import ApplicationForm from "./form";

export default async function ApplyPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/cells/apply");
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
      .from("cells")
      .select("id")
      .eq("applied_by", user.id)
      .eq("status", "pending")
      .limit(1);
    has_pending = !!(existing && existing.length > 0);
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/cells" />

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">apply to become a cell</h1>
        <p className="text-[var(--text-muted)] text-sm mb-8">
          tell us about your team. approved cells appear on the public listing
          and compete to design, build, and operate funded ideas.
        </p>

        {has_pending ? (
          <div className="border border-yellow-800 rounded-lg p-6 text-center">
            <p className="text-yellow-500 font-medium mb-2">application pending</p>
            <p className="text-[var(--text-muted)] text-sm">
              you already have an application under review. we&apos;ll be in touch.
            </p>
            <a
              href="/cells"
              className="text-red-500 hover:text-red-400 text-sm mt-4 inline-block transition-colors"
            >
              &larr; back to cells
            </a>
          </div>
        ) : (
          <ApplicationForm />
        )}
      </main>
    </div>
  );
}
