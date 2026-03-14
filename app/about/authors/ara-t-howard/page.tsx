import type { Metadata } from "next";
import Nav from "@/app/components/nav";
import { RO, ROMarkdown, PROSE_CLASSES } from "@/lib/ro";

const ro = RO();

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await ro.page("pages/about/authors/ara-t-howard");
  return {
    title: meta.title as string,
    description: meta.description as string,
  };
}

interface CredItem { label: string; value: string; description: string }
interface CoopItem { label: string; description: string }
interface Camp { label: string; description: string }
interface Link { label: string; href: string; detail: string }

export default async function AraHowardPage() {
  const page = await ro.page("pages/about/authors/ara-t-howard");
  const meta = page.meta as Record<string, unknown>;
  const techCred = page.data["technical-credibility"] as { intro: string; items: CredItem[] };
  const coopExp = page.data["cooperative-experience"] as { intro: string; items: CoopItem[] };
  const campsData = page.data.camps as unknown as (Camp[] & { highlight: string });
  const camps = Array.isArray(campsData) ? campsData.filter((c): c is Camp => typeof c === 'object' && 'label' in c) : [];
  const campsHighlight = (page.data.camps as Record<string, unknown>)?.highlight as string ?? "";
  const links = (page.data.links ?? []) as Link[];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about/authors" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        <div className="mb-8">
          <a href="/about/authors" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
            &larr; all authors
          </a>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-2">
          {meta.name as string}
        </h1>
        <p className="text-red-600 text-sm uppercase tracking-widest mb-4">
          {meta.role as string}
        </p>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          {meta.tagline as string}
        </p>

        <ROMarkdown
          raw={page.sections.content.raw}
          images={page.images}
          className={PROSE_CLASSES}
        />

        {/* technical credibility */}
        {techCred && (
          <section className="my-16">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">technical credibility</h2>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>{techCred.intro}</p>
            </div>
            <div className="mt-6 space-y-4">
              {techCred.items.map((item) => (
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
        )}

        {/* cooperative experience */}
        {coopExp && (
          <section className="my-16">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">the cooperative experience</h2>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <ROMarkdown raw={coopExp.intro} images={page.images} className="text-[var(--text-secondary)] leading-relaxed" />
            </div>
            <div className="mt-6 space-y-4">
              {coopExp.items.map((item) => (
                <div key={item.label} className="border-l-2 border-[var(--border-primary)] pl-6">
                  <p className="font-semibold text-[var(--text-primary)] mb-1">{item.label}</p>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* why this combination is rare */}
        {camps.length > 0 && (
          <section className="my-16">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">why this combination is rare</h2>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>most people who advocate for cooperative software fall into one of two camps:</p>
            </div>
            <div className="mt-6 space-y-4">
              {camps.map((camp) => (
                <div key={camp.label} className="border-l-2 border-[var(--border-primary)] pl-6">
                  <p className="font-semibold text-[var(--text-primary)] mb-1">{camp.label}</p>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{camp.description}</p>
                </div>
              ))}
            </div>
            {campsHighlight && (
              <div className="mt-6 border-l-2 border-red-600 pl-6">
                <p className="text-[var(--text-primary)] font-medium leading-relaxed">{campsHighlight}</p>
              </div>
            )}
          </section>
        )}

        {/* links */}
        {links.length > 0 && (
          <section className="my-16">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">links</h2>
            <div className="space-y-3 text-sm">
              {links.map((link) => (
                <div key={link.label} className="flex gap-2">
                  <span className="text-red-600 shrink-0">&bull;</span>
                  <div>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-500 transition-colors font-medium"
                    >
                      {link.label}
                    </a>
                    <span className="text-[var(--text-muted)]"> &mdash; {link.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="border-t border-[var(--border-primary)] pt-8 flex justify-between">
          <a href="/about/authors" className="inline-block text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
            &larr; all authors
          </a>
          <a href="/about" className="inline-block text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
            about &rarr;
          </a>
        </div>
      </main>
    </div>
  );
}
