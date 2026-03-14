import type { Metadata } from "next";
import Nav from "@/app/components/nav";
import { RO, ROMarkdown, PROSE_CLASSES } from "@/lib/ro";

const ro = RO();

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await ro.page("pages/about/legal");
  return {
    title: meta.title as string,
    description: meta.description as string,
  };
}

interface DisputeStep {
  step: string;
  title: string;
  description: string;
}

export default async function LegalPage() {
  const page = await ro.page("pages/about/legal");
  const meta = page.meta as Record<string, unknown>;
  const steps = (page.data["dispute-resolution"] ?? []) as DisputeStep[];
  const cta_primary = meta.cta_primary as { text: string; href: string };
  const cta_secondary = meta.cta_secondary as { text: string; href: string };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about/legal" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          {meta.heading as string}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          {meta.tagline as string}
        </p>

        <ROMarkdown
          raw={page.sections.content.raw}
          images={page.images}
          className={PROSE_CLASSES}
        />

        {steps.length > 0 && (
          <section className="my-16">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">dispute resolution</h2>
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
