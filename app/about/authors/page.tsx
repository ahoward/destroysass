import type { Metadata } from "next";
import Nav from "@/app/components/nav";
import { RO } from "@/lib/ro";

const ro = RO();

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = await ro.page("pages/about/authors");
  return {
    title: meta.title as string,
    description: meta.description as string,
  };
}

interface Author {
  slug: string;
  name: string;
  role: string;
  summary: string;
}

export default async function AuthorsPage() {
  const page = await ro.page("pages/about/authors");
  const meta = page.meta as Record<string, unknown>;
  const authors = (page.data.authors ?? []) as Author[];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about/authors" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          {meta.heading as string}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          {meta.tagline as string}
        </p>

        <div className="space-y-6">
          {authors.map((author) => (
            <a
              key={author.slug}
              href={`/about/authors/${author.slug}`}
              className="block border border-[var(--border-primary)] rounded-lg p-6 hover:border-red-600 transition-colors"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <p className="font-bold text-lg">{author.name}</p>
                <span className="text-xs uppercase tracking-widest text-red-600">
                  {author.role}
                </span>
              </div>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                {author.summary}
              </p>
            </a>
          ))}
        </div>

        <div className="border-t border-[var(--border-primary)] pt-8 mt-16">
          <a
            href="/about"
            className="inline-block text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            &larr; back to about
          </a>
        </div>
      </main>
    </div>
  );
}
