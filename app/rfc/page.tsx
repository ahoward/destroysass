import type { Metadata } from "next";
import Nav from "@/app/components/nav";
import { RO, ROMarkdown, PROSE_CLASSES } from "@/lib/ro";

const ro = RO();

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await ro.page("pages/rfc");
  return {
    title: meta.title as string,
  };
}

export default async function RFCPage() {
  const page = await ro.page("pages/rfc");
  const meta = page.meta as Record<string, unknown>;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/rfc" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-[var(--text-faint)] mb-2">
            {meta.status as string}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-2">
            {meta.heading as string}
          </h1>
          <p className="text-[var(--text-secondary)] text-lg mb-4">
            {meta.subtitle as string}
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            {meta.authors as string} — {meta.date as string}
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
