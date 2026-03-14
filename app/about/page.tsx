import type { Metadata } from "next";
import Nav from "@/app/components/nav";
import { RO, ROMarkdown, PROSE_CLASSES } from "@/lib/ro";

const ro = RO();

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await ro.page("pages/about");
  return { title: meta.title as string };
}

interface CellStep { step: string; description: string }
interface GoDeeper { title: string; href: string; description: string; wide?: boolean }
interface FAQ { q: string; a: string }

export default async function AboutPage() {
  const page = await ro.page("pages/about");
  const meta = page.meta as Record<string, unknown>;
  const steps = (page.data["how-cells-work"] ?? []) as CellStep[];
  const cards = (page.data["go-deeper"] ?? []) as GoDeeper[];
  const faqs = (page.data.faq ?? []) as FAQ[];
  const cta_primary = meta.cta_primary as { text: string; href: string };
  const cta_secondary = meta.cta_secondary as { text: string; href: string };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about" />

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
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">how cells work</h2>
            <div className="space-y-6">
              {steps.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="text-red-600 font-bold text-sm uppercase shrink-0 w-20 pt-0.5">
                    {item.step}
                  </span>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {cards.length > 0 && (
          <section className="my-16">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">go deeper</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.map((card) => (
                <a
                  key={card.href}
                  href={card.href}
                  className={`block border border-[var(--border-primary)] rounded-lg p-6 hover:border-red-600 transition-colors${card.wide ? " sm:col-span-2" : ""}`}
                >
                  <p className="font-semibold mb-1">{card.title}</p>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{card.description}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <section className="my-16">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">faq</h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-l-2 border-[var(--border-primary)] pl-6">
                  <p className="font-medium text-[var(--text-primary)] mb-1">{faq.q}</p>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{faq.a}</p>
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
