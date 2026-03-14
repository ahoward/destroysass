import type { Metadata } from "next";
import Nav from "@/app/components/nav";
import { RO, ROMarkdown } from "@/lib/ro";

const ro = RO();

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await ro.page("pages/commons");
  return {
    title: meta.title as string,
    description: meta.description as string,
  };
}

interface HowStep { step: string; title: string; body: string }
interface Benefit { title: string; description: string }
interface Comparison {
  columns: string[];
  rows: string[][];
  note: string;
}

export default async function CommonsPage() {
  const page = await ro.page("pages/commons");
  const meta = page.meta as Record<string, unknown>;
  const steps = (page.data["how-it-works"] ?? []) as HowStep[];
  const benefits = (page.data["what-members-get"] ?? []) as Benefit[];
  const comparison = (page.data.comparison ?? { columns: [], rows: [], note: "" }) as Comparison;
  const flywheel = (page.data.flywheel ?? []) as string[];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/commons" />

      <main className="max-w-2xl mx-auto px-6 pt-20 pb-32">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight lowercase mb-6">
          {meta.heading as string}
        </h1>
        <p className="text-xl text-[var(--text-secondary)] mb-2">
          {meta.subtitle as string}
        </p>
        <p className="text-sm text-[var(--text-muted)] mb-16">
          {meta.tagline as string}
        </p>

        {/* how it works */}
        {steps.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">how it works</h2>
            <div className="space-y-6">
              {steps.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="text-red-600 font-bold text-sm shrink-0 pt-0.5">{item.step}</span>
                  <div>
                    <p className="font-semibold text-sm mb-1">{item.title}</p>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* what members get */}
        {benefits.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">what members get</h2>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              {benefits.map((item) => (
                <div key={item.title} className="border border-[var(--border-primary)] rounded-lg p-5">
                  <p className="font-semibold text-[var(--text-primary)] mb-1">{item.title}</p>
                  <p className="text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* comparison table */}
        {comparison.rows.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">community vs business</h2>
            <div className="overflow-x-auto border border-[var(--border-primary)] rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-primary)]">
                    {comparison.columns.map((col, i) => (
                      <th key={i} className={`text-left p-3 font-medium ${i === 1 ? "text-red-600" : "text-[var(--text-muted)]"}`}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  {comparison.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-[var(--border-faint)]">
                      <td className="p-3 font-medium text-[var(--text-primary)]">{row[0]}</td>
                      <td className="p-3">{row[1]}</td>
                      <td className="p-3">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-3">{comparison.note}</p>
          </section>
        )}

        {/* flywheel */}
        {flywheel.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">the flywheel</h2>
            <div className="border border-[var(--border-primary)] rounded-lg p-6 bg-[var(--bg-secondary)] font-mono text-sm space-y-1 text-[var(--text-secondary)]">
              {flywheel.map((line, i) => (
                <p key={i} style={{ paddingLeft: `${i * 1}rem` }}>{line}</p>
              ))}
            </div>
          </section>
        )}

        {/* rei analogy (from content.md) */}
        <section className="mb-16">
          <ROMarkdown
            raw={page.sections.content.raw}
            images={page.images}
            className="border-l-2 border-red-600 pl-6 space-y-4 text-[var(--text-secondary)] leading-relaxed"
          />
        </section>

        {/* CTA */}
        <section className="text-center">
          <p className="text-[var(--text-muted)] text-sm mb-4">{meta.cta_text as string}</p>
          <a
            href={meta.cta_href as string}
            className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-6 py-2.5 rounded transition-colors"
          >
            {meta.cta_button as string}
          </a>
          <p className="text-xs text-[var(--text-faint)] mt-3">{meta.cta_note as string}</p>
        </section>
      </main>
    </div>
  );
}
