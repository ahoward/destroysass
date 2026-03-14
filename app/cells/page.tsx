import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/app/components/nav";
import { RO, ROMarkdown, PROSE_CLASSES } from "@/lib/ro";

const ro = RO();

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await ro.page("pages/cells");
  return {
    title: meta.title as string,
    description: meta.description as string,
  };
}

type Cell = {
  id: string;
  name: string;
  description: string;
  website: string | null;
  skills: string[];
  created_at: string;
};

interface Step { step: string; title: string; description: string }
interface Responsibility { label: string; description: string }

export default async function CellsPage() {
  const supabase = await createClient();
  const { data: cellData } = await supabase
    .from("cells")
    .select("id, name, description, website, skills, created_at")
    .order("name");

  const approved: Cell[] = cellData ?? [];
  const page = await ro.page("pages/cells");
  const meta = page.meta as Record<string, unknown>;
  const steps = (page.data["how-it-works"] ?? []) as Step[];
  const responsibilities = (page.data.responsibilities ?? []) as Responsibility[];
  const criteria = (page.data.criteria ?? []) as string[];
  const cta_primary = meta.cta_primary as { text: string; href: string };
  const cta_secondary = meta.cta_secondary as { text: string; href: string };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/cells" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          {meta.heading as string}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          {meta.tagline as string}
        </p>

        {/* cell listing (dynamic from Supabase) */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            certified cells
          </h2>
          {approved.length === 0 ? (
            <div className="border border-[var(--border-primary)] rounded-lg p-8 text-center">
              <p className="text-[var(--text-muted)] mb-4">no certified cells yet.</p>
              <a
                href="/cells/apply"
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded text-sm transition-colors"
              >
                be the first to apply →
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {approved.map((cell) => (
                <div key={cell.id} className="border border-[var(--border-primary)] rounded-lg p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg font-semibold">{cell.name}</h3>
                    {cell.website && (
                      <a
                        href={cell.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                      >
                        website →
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
        </section>

        {/* how it works */}
        {steps.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">how it works</h2>
            <div className="space-y-6">
              {steps.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="text-red-600 font-bold text-lg tabular-nums shrink-0 w-6">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-semibold mb-1">{item.title}</p>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* what a cell is + responsibilities grid */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">what a cell is</h2>
          <ROMarkdown
            raw={page.sections.content.raw.split("## bids and budgets")[0].replace("## what a cell is\n\n", "")}
            images={page.images}
            className="space-y-4 text-[var(--text-secondary)] leading-relaxed"
          />
          {responsibilities.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-6">
              {responsibilities.map((item) => (
                <div key={item.label} className="border border-[var(--border-primary)] rounded-lg p-4">
                  <p className="font-semibold text-sm mb-1">{item.label}</p>
                  <p className="text-xs text-[var(--text-muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* remaining content sections */}
        <ROMarkdown
          raw={page.sections.content.raw.split("## what a cell is")[1]?.split("## bids and budgets").slice(1).join("## bids and budgets") ? "## bids and budgets" + page.sections.content.raw.split("## bids and budgets").slice(1).join("## bids and budgets") : ""}
          images={page.images}
          className={PROSE_CLASSES}
        />

        {/* criteria */}
        {criteria.length > 0 && (
          <section className="my-16">
            <div className="space-y-3">
              {criteria.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-red-600 font-bold shrink-0 mt-0.5">•</span>
                  <p className="text-sm text-[var(--text-secondary)]">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="border-t border-[var(--border-primary)] pt-12 text-center">
          <p className="text-[var(--text-muted)] mb-6">{meta.cta_text as string}</p>
          <a
            href={cta_primary.href}
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded transition-colors mr-4"
          >
            {cta_primary.text}
          </a>
          <a
            href={cta_secondary.href}
            className="inline-block text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors mt-3 sm:mt-0"
          >
            {cta_secondary.text}
          </a>
        </div>
      </main>
    </div>
  );
}
