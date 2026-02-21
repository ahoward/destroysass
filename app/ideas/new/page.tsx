import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";
import IdeaForm from "./form";

export default async function NewIdeaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/ideas/new");
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0f0f0] font-sans">
      {/* nav */}
      <nav className="max-w-2xl mx-auto px-6 py-6 flex justify-between items-center">
        <a
          href="/"
          className="text-red-600 font-bold text-lg tracking-tight hover:text-red-500 transition-colors"
        >
          destroysass
        </a>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user.email}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm text-gray-400 border border-[#333] px-3 py-1.5 rounded hover:border-gray-500 hover:text-gray-200 transition-colors"
            >
              sign out
            </button>
          </form>
        </div>
      </nav>

      {/* form */}
      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            propose an idea
          </h1>
          <p className="text-sm text-gray-500">
            describe the software your business needs. what would you pay per
            month for a hosted, maintained solution you actually own?
          </p>
        </div>

        <IdeaForm />
      </main>
    </div>
  );
}
