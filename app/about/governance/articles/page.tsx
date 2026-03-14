import type { Metadata } from "next";
import Nav from "@/app/components/nav";
import { RO, ROMarkdown, PROSE_CLASSES } from "@/lib/ro";

const ro = RO();

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await ro.page("pages/about/governance-articles");
  return { title: meta.title as string, description: meta.description as string };
}

export default async function ArticlesPage() {
  const page = await ro.page("pages/about/governance-articles");

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about/governance" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        <a
          href="/about/governance"
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        >
          &larr; governance
        </a>

        <div className="mt-4 mb-8 border border-red-600 rounded-lg p-4 bg-red-600/5">
          <p className="text-sm text-red-600 font-medium">
            {page.meta.draft_notice as string}
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {page.meta.draft_detail as string}
          </p>
        </div>

        <ROMarkdown
          raw={page.sections.content.raw}
          images={page.images}
          className={PROSE_CLASSES}
        />
      </main>
    </div>
  );
}
