import type { Metadata } from "next";
import Nav from "@/app/components/nav";
import { RO, ROMarkdown, PROSE_CLASSES } from "@/lib/ro";

const ro = RO();

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await ro.page("pages/about/money");
  return {
    title: meta.title as string,
    description: meta.description as string,
  };
}

interface MoneyIn { label: string; value: string; description: string }
interface MoneyOut { label: string; description: string }
interface Patronage {
  intro: string;
  outro: string;
  items: { label: string; value: string; description: string }[];
}

export default async function MoneyPage() {
  const page = await ro.page("pages/about/money");
  const meta = page.meta as Record<string, unknown>;
  const moneyIn = (page.data["money-in"] ?? []) as MoneyIn[];
  const moneyOut = (page.data["money-out"] ?? []) as MoneyOut[];
  const patronage = (page.data.patronage ?? { intro: "", outro: "", items: [] }) as Patronage;
  const cta_primary = meta.cta_primary as { text: string; href: string };
  const cta_secondary = meta.cta_secondary as { text: string; href: string };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about/money" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          {meta.heading as string}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          {meta.tagline as string}
        </p>

        {/* money in */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">money in</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>the cooperative has two revenue streams. both are straightforward.</p>
          </div>
          <div className="mt-6 space-y-4">
            {moneyIn.map((item) => (
              <div key={item.label} className="border-l-2 border-[var(--border-primary)] pl-6">
                <div className="flex items-baseline gap-3 mb-1">
                  <p className="font-semibold text-[var(--text-primary)]">{item.label}</p>
                  <p className="text-red-600 font-bold text-sm">{item.value}</p>
                </div>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* money out */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">money out</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              cells submit a <span className="text-[var(--text-primary)] font-semibold">monthly budget</span> for
              the coming month&apos;s work — labor, hosting, tools, everything. the budget is
              submitted ahead of time, not after the fact. here&apos;s how it flows:
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {moneyOut.map((item) => (
              <div key={item.label} className="flex gap-4">
                <span className="text-red-600 font-bold text-sm shrink-0 w-2 pt-1">&bull;</span>
                <div>
                  <p className="font-semibold mb-1">{item.label}</p>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* patronage */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">patronage &amp; surplus</h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <ROMarkdown raw={patronage.intro} images={page.images} className="text-[var(--text-secondary)] leading-relaxed" />
          </div>
          <div className="mt-6 space-y-4">
            {patronage.items.map((item) => (
              <div key={item.label} className="border-l-2 border-[var(--border-primary)] pl-6">
                <div className="flex items-baseline gap-3 mb-1">
                  <p className="font-semibold text-[var(--text-primary)]">{item.label}</p>
                  <p className="text-red-600 font-bold text-sm">{item.value}</p>
                </div>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-[var(--text-secondary)] leading-relaxed">
            <p>{patronage.outro}</p>
          </div>
        </section>

        <ROMarkdown
          raw={page.sections.content.raw}
          images={page.images}
          className={PROSE_CLASSES}
        />

        <div className="border-t border-[var(--border-primary)] pt-12 text-center mt-16">
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
