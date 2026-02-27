import { createClient } from "@/lib/supabase/server";
import Nav from "@/app/components/nav";

type Cell = {
  id: string;
  name: string;
  description: string;
  website: string | null;
  skills: string[];
  created_at: string;
};

export default async function CellsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: cellData } = await supabase
    .from("cells")
    .select("id, name, description, website, skills, created_at")
    .order("name");

  const approved: Cell[] = cellData ?? [];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/cells" />

      <main className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">cells</h1>
        <p className="text-[var(--text-muted)] text-sm mb-8">
          full-service product cooperatives that design, build, and operate software for the collective.
        </p>

        {approved.length === 0 ? (
          <div className="border border-[var(--border-primary)] rounded-lg p-8 text-center">
            <p className="text-[var(--text-muted)] mb-4">no certified cells yet.</p>
            <a
              href="/cells/apply"
              className="text-red-500 hover:text-red-400 text-sm transition-colors"
            >
              be the first to apply &rarr;
            </a>
          </div>
        ) : (
          <div className="space-y-4 mb-10">
            {approved.map((cell) => (
              <div key={cell.id} className="border border-[var(--border-primary)] rounded-lg p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 className="text-lg font-semibold">{cell.name}</h2>
                  {cell.website && (
                    <a
                      href={cell.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                    >
                      website &rarr;
                    </a>
                  )}
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-3">{cell.description}</p>
                {cell.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {cell.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs border border-[var(--border-secondary)] text-[var(--text-secondary)] rounded px-2 py-0.5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* what is a cell? */}
        <div className="border border-[var(--border-primary)] rounded-lg p-6 mb-10">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">what is a cell?</h2>
          <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
            <p>
              a cell is not a dev shop. it&apos;s a{" "}
              <span className="text-[var(--text-primary)] font-medium">micro product company</span> that
              operates under contract to its collective.
            </p>
            <p>
              cells own the full stack &mdash;{" "}
              <span className="text-[var(--text-primary)] font-medium">product, design, engineering, and operations</span>.
              they take a problem from a business owner, figure out what to build, build it, ship it,
              and keep it running. there is no separate &ldquo;product manager&rdquo; role &mdash;
              the cell <em>is</em> the product team.
            </p>
            <p>
              the business owners bring the problem and fund the work. the cell brings the solution &mdash;
              from user research to production uptime. when cells compete by shipping MVPs,
              they&apos;re not just showing code. they&apos;re showing{" "}
              <span className="text-[var(--text-primary)] font-medium">product vision + execution</span>.
              the collective picks the best <em>product</em>, not just the best code.
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--border-primary)] pt-8">
          <p className="text-[var(--text-muted)] text-sm mb-3">
            cells compete by shipping working MVPs &mdash; product thinking, design, and code.
            the collective picks the winner. no spec decks. no pitch decks. running product.
          </p>
          <a
            href="/cells/apply"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded text-sm transition-colors"
          >
            apply to become a cell &rarr;
          </a>
        </div>
      </main>
    </div>
  );
}
