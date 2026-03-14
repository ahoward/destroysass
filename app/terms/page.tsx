import type { Metadata } from "next";
import Nav from "@/app/components/nav";
import { RO, ROMarkdown, PROSE_CLASSES } from "@/lib/ro";

const ro = RO();

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await ro.page("pages/terms");
  return { title: meta.title as string };
}

export default async function TermsPage() {
  const page = await ro.page("pages/terms");

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/terms" />

      <main className="max-w-2xl mx-auto px-6 pt-12 pb-32">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {page.meta.heading as string}
        </h1>
        <p className="text-sm text-[var(--text-muted)] mb-10">
          last updated: {page.meta.last_updated as string}
        </p>

        <ROMarkdown
          raw={page.sections.content.raw}
          images={page.images}
          className={PROSE_CLASSES}
        />
      </main>
    </div>
  );
}
