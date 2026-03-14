import type { Metadata } from "next";
import Nav from "@/app/components/nav";
import { RO, ROMarkdown, PROSE_CLASSES } from "@/lib/ro";

const ro = RO();

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await ro.page("pages/about/governance");
  return {
    title: meta.title as string,
    description: meta.description as string,
  };
}

interface FormationDoc {
  title: string;
  href: string;
  status: string;
  description: string;
}

export default async function GovernancePage() {
  const page = await ro.page("pages/about/governance");
  const meta = page.meta as Record<string, unknown>;
  const documents = (page.data.documents ?? []) as FormationDoc[];
  const cta_primary = meta.cta_primary as { text: string; href: string };
  const cta_secondary = meta.cta_secondary as { text: string; href: string };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about/governance" />

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

        {documents.length > 0 && (
          <section className="my-16">
            <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-6">
              formation documents
            </h2>
            <div className="space-y-4">
              {documents.map((doc) => (
                <a
                  key={doc.href}
                  href={doc.href}
                  className="block border border-[var(--border-primary)] rounded-lg p-5 hover:border-red-600 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{doc.title}</p>
                    <span className="text-xs text-red-600 font-medium border border-red-600 rounded px-1.5 py-0.5">
                      {doc.status}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {doc.description}
                  </p>
                </a>
              ))}
            </div>
            <p className="text-[var(--text-secondary)] text-sm mt-6 leading-relaxed">
              these documents are inspired by the open-source governance of{" "}
              <a href="https://www.dojo4.com/resources" className="text-red-500 hover:text-red-400 transition-colors" target="_blank" rel="noopener noreferrer">
                dojo4 LCA
              </a>, a Boulder cooperative that published its bylaws under a Creative Commons license.
              if you have feedback,{" "}
              <a href="mailto:ara@destroysaas.coop" className="text-red-500 hover:text-red-400 transition-colors">
                we want to hear it
              </a>.
            </p>
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
