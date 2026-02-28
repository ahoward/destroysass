import type { Metadata } from "next";
import Nav from "@/app/components/nav";

export const metadata: Metadata = {
  title: "authors — destroysaas",
  description:
    "the people behind destroysaas. builders, cooperators, and troublemakers.",
};

const authors = [
  {
    slug: "ara-t-howard",
    name: "ara t. howard",
    role: "founder",
    summary:
      "102 rubygems. 481M+ downloads. ruby hero. founded a worker-owned LCA. open-sourced the bylaws. now productizing everything he learned.",
  },
];

export default async function AuthorsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans">
      <Nav currentPath="/about/authors" />

      <main className="max-w-2xl mx-auto px-6 pt-16 pb-32">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight lowercase mb-4">
          authors
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-16">
          the people building destroysaas and why they give a damn.
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
