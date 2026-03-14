import type { Metadata } from "next";
import Nav from "@/app/components/nav";
import Calculator from "./calculator";
import { RO, ROMarkdown, PROSE_CLASSES } from "@/lib/ro";

const ro = RO();

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await ro.page("pages/about/math");
  return {
    title: meta.title as string,
    description: meta.description as string,
  };
}

interface SaasTool {
  tool: string;
  cost: string;
}

interface SaasToolsData {
  tools: SaasTool[];
  typical_total: string;
}

interface Example {
  industry: string;
  tools: string;
  saas: string;
  ds: string;
  note: string;
}

interface ComparisonRow {
  label: string;
  saas: string;
  ds: string;
}

export default async function WhyPage() {
  const page = await ro.page("pages/about/math");
  const meta = page.meta as Record<string, unknown>;
  const saasTools = (page.data["saas-tools"] ?? { tools: [], typical_total: "" }) as SaasToolsData;
  const examples = (page.data.examples ?? []) as Example[];
  const comparison = (page.data.comparison ?? []) as ComparisonRow[];
  const cta_primary = meta.cta_primary as { text: string; href: string };
  const cta_secondary = meta.cta_secondary as { text: string; href: string };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about/math" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        {/* hero */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          {(meta.heading as string).split("\n").map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          {meta.subheading as string}
        </p>

        {/* the saas tax */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            the saas tax
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <ROMarkdown
              raw={page.sections["saas-tax"].raw}
              images={page.images}
              className="text-[var(--text-secondary)] leading-relaxed"
            />
            <div className="border border-[var(--border-primary)] rounded-lg p-5 space-y-2 text-sm">
              {saasTools.tools.map((item) => (
                <div
                  key={item.tool}
                  className="flex justify-between items-center"
                >
                  <span className="text-[var(--text-secondary)]">{item.tool}</span>
                  <span className="text-[var(--text-muted)] tabular-nums">
                    {item.cost}
                  </span>
                </div>
              ))}
              <div className="border-t border-[var(--border-primary)] pt-2 mt-2 flex justify-between items-center font-medium text-[var(--text-primary)]">
                <span>typical monthly total</span>
                <span className="text-red-600 tabular-nums">
                  {saasTools.typical_total}
                </span>
              </div>
            </div>
            <ROMarkdown
              raw={page.sections["saas-tax-after"].raw}
              images={page.images}
              className="text-[var(--text-secondary)] leading-relaxed [&_strong]:text-[var(--text-primary)] [&_strong]:font-medium"
            />
          </div>
        </section>

        {/* the destroysaas math */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            the destroysaas math
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <ROMarkdown
              raw={page.sections["destroysaas-math"].raw}
              images={page.images}
              className="space-y-4 text-[var(--text-secondary)] leading-relaxed [&_strong]:text-[var(--text-primary)] [&_strong]:font-medium"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-[var(--border-primary)] rounded-lg p-5 text-center">
                <p className="text-xs text-[var(--text-faint)] uppercase tracking-widest mb-2">
                  saas (10 years)
                </p>
                <p className="text-3xl font-bold text-red-600 tabular-nums">
                  $60,000
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-2">
                  you own nothing
                </p>
              </div>
              <div className="border border-[var(--border-primary)] rounded-lg p-5 text-center">
                <p className="text-xs text-[var(--text-faint)] uppercase tracking-widest mb-2">
                  destroysaas (10 years)
                </p>
                <p className="text-3xl font-bold text-green-600 tabular-nums">
                  $6,000
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-2">
                  you co-own everything
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* calculator */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            run your own numbers
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mb-6">
            enter the SaaS tools your business pays for. see what you&apos;re
            really spending — and what collective ownership looks like.
          </p>
          <Calculator />
        </section>

        {/* custom software */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            custom software used to be out of reach
          </h2>
          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <ROMarkdown
              raw={page.sections["custom-software"].raw}
              images={page.images}
              className="space-y-4 text-[var(--text-secondary)] leading-relaxed [&_strong]:text-[var(--text-primary)] [&_strong]:font-medium"
            />
          </div>
        </section>

        {/* industry examples */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            real examples
          </h2>
          <div className="space-y-6">
            {examples.map((ex) => (
              <div
                key={ex.industry}
                className="border border-[var(--border-primary)] rounded-lg p-5"
              >
                <p className="font-semibold text-[var(--text-primary)] mb-1">
                  {ex.industry}
                </p>
                <p className="text-xs text-[var(--text-muted)] mb-3">
                  {ex.tools}
                </p>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-faint)]">
                      saas:
                    </span>
                    <span className="text-red-600 font-bold tabular-nums">
                      {ex.saas}
                    </span>
                  </div>
                  <span className="text-[var(--text-faint)]">→</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-faint)]">
                      destroysaas:
                    </span>
                    <span className="text-green-600 font-bold tabular-nums">
                      {ex.ds}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">
                  {ex.note}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* comparison table */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
            side by side
          </h2>
          <div className="border border-[var(--border-primary)] rounded-lg overflow-hidden text-sm">
            {/* header */}
            <div className="grid grid-cols-3 border-b border-[var(--border-primary)] bg-[var(--bg-secondary)]">
              <div className="p-3 text-[var(--text-faint)]" />
              <div className="p-3 font-medium text-center text-red-600">
                saas
              </div>
              <div className="p-3 font-medium text-center text-green-600">
                destroysaas
              </div>
            </div>
            {/* rows */}
            {comparison.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-3 ${
                  i < comparison.length - 1
                    ? "border-b border-[var(--border-primary)]"
                    : ""
                }`}
              >
                <div className="p-3 font-medium text-[var(--text-secondary)]">
                  {row.label}
                </div>
                <div className="p-3 text-[var(--text-muted)] text-center">
                  {row.saas}
                </div>
                <div className="p-3 text-[var(--text-secondary)] text-center">
                  {row.ds}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* bottom line */}
        <section className="mb-16">
          <div className="border-l-2 border-red-600 pl-6">
            <ROMarkdown
              raw={page.sections["bottom-line"].raw}
              images={page.images}
              className="text-[var(--text-primary)] font-medium leading-relaxed [&_p]:m-0"
            />
          </div>
        </section>

        {/* cta */}
        <div className="border-t border-[var(--border-primary)] pt-12 text-center">
          <p className="text-[var(--text-muted)] mb-6">
            {meta.cta_text as string}
          </p>
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
